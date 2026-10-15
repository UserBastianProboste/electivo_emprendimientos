# Module: MongoProductRepository
# Description: MongoDB NoSQL repository implementation for polymorphic catalog products
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial repository adapter with dynamic facet aggregation.

from datetime import datetime, timezone
from typing import Any, Dict, List, Optional, Tuple
from bson import ObjectId
from pymongo.collection import Collection

from apps.catalog.domain.entities import Product
from apps.catalog.domain.ports import ProductRepositoryPort
from core.mongo import get_mongo_collection


class MongoProductRepository(ProductRepositoryPort):
    """Outbound adapter persisting and querying products in MongoDB."""

    def __init__(self, collection: Optional[Collection] = None) -> None:
        self._collection = collection

    @property
    def collection(self) -> Collection:
        """Lazy load or return configured collection."""
        if self._collection is None:
            self._collection = get_mongo_collection("products")
        return self._collection

    def list_products(
        self,
        search: Optional[str] = None,
        category: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        dynamic_filters: Optional[Dict[str, Any]] = None,
        sort_by: Optional[str] = None,
        page: int = 1,
        page_size: int = 12,
    ) -> Tuple[List[Product], int]:
        """Query MongoDB with dynamic criteria and return entity list with total."""
        query_doc: Dict[str, Any] = {"is_active": True}

        if search and search.strip():
            term = search.strip()
            query_doc["$or"] = [
                {"name": {"$regex": term, "$options": "i"}},
                {"description": {"$regex": term, "$options": "i"}},
                {"brand": {"$regex": term, "$options": "i"}},
            ]

        if category and category.strip():
            query_doc["category"] = category.strip()

        price_query: Dict[str, float] = {}
        if min_price is not None:
            price_query["$gte"] = float(min_price)
        if max_price is not None:
            price_query["$lte"] = float(max_price)
        if price_query:
            query_doc["price"] = price_query

        if dynamic_filters:
            for key, val in dynamic_filters.items():
                if val is not None and val != "":
                    query_doc[f"dynamic_attributes.{key}"] = val

        sort_criteria = [("_id", -1)]
        if sort_by == "price_asc":
            sort_criteria = [("price", 1)]
        elif sort_by == "price_desc":
            sort_criteria = [("price", -1)]
        elif sort_by == "name_asc":
            sort_criteria = [("name", 1)]

        skip_count = max(0, (page - 1) * page_size)
        cursor = (
            self.collection.find(query_doc)
            .sort(sort_criteria)
            .skip(skip_count)
            .limit(page_size)
        )
        total = self.collection.count_documents(query_doc)

        products = [self._to_domain(doc) for doc in cursor]
        return products, total

    def get_available_filters(self) -> Dict[str, Any]:
        """Aggregate available categories, price bounds, and distinct dynamic attributes."""
        categories = sorted(self.collection.distinct("category", {"is_active": True}))

        # Compute price min and max
        price_pipeline = [
            {"$match": {"is_active": True}},
            {
                "$group": {
                    "_id": None,
                    "min_price": {"$min": "$price"},
                    "max_price": {"$max": "$price"},
                }
            },
        ]
        price_res = list(self.collection.aggregate(price_pipeline))
        price_range = {"min": 0.0, "max": 0.0}
        if price_res:
            price_range["min"] = float(price_res[0].get("min_price", 0.0))
            price_range["max"] = float(price_res[0].get("max_price", 0.0))

        # Dynamically extract all dynamic_attributes keys and distinct values
        dynamic_attributes: Dict[str, List[Any]] = {}
        docs = list(self.collection.find({"is_active": True}, {"dynamic_attributes": 1}))
        for doc in docs:
            attrs = doc.get("dynamic_attributes", {})
            if isinstance(attrs, dict):
                for k, v in attrs.items():
                    if k not in dynamic_attributes:
                        dynamic_attributes[k] = []
                    if v is not None and v not in dynamic_attributes[k]:
                        dynamic_attributes[k].append(v)

        for k in dynamic_attributes:
            dynamic_attributes[k].sort(key=lambda x: str(x))

        return {
            "categories": categories,
            "price_range": price_range,
            "dynamic_attributes": dynamic_attributes,
        }

    def create_product(self, product: Product) -> Product:
        """Insert product entity into MongoDB."""
        now_iso = datetime.now(timezone.utc).isoformat()
        doc = {
            "name": product.name,
            "slug": product.slug,
            "description": product.description,
            "price": product.price,
            "original_price": product.original_price,
            "category": product.category,
            "brand": product.brand,
            "stock": product.stock,
            "images": product.images,
            "dynamic_attributes": product.dynamic_attributes,
            "is_active": product.is_active,
            "created_at": now_iso,
            "updated_at": now_iso,
        }
        res = self.collection.insert_one(doc)
        product.id = str(res.inserted_id)
        product.created_at = now_iso
        product.updated_at = now_iso
        return product

    def get_by_id(self, product_id: str) -> Optional[Product]:
        """Fetch single document by ID."""
        try:
            query = {"_id": ObjectId(product_id)}
        except Exception:
            query = {"_id": product_id}

        doc = self.collection.find_one(query)
        if doc is None:
            return None
        return self._to_domain(doc)

    def count(self) -> int:
        """Return total active products."""
        return self.collection.count_documents({"is_active": True})

    @staticmethod
    def _to_domain(doc: Dict[str, Any]) -> Product:
        """Translate Mongo document to domain Product entity."""
        return Product(
            id=str(doc.get("_id")),
            name=doc.get("name", ""),
            slug=doc.get("slug", ""),
            description=doc.get("description", ""),
            price=float(doc.get("price", 0.0)),
            original_price=(
                float(doc["original_price"])
                if doc.get("original_price") is not None
                else None
            ),
            category=doc.get("category", ""),
            brand=doc.get("brand", ""),
            stock=int(doc.get("stock", 0)),
            images=doc.get("images", []),
            dynamic_attributes=doc.get("dynamic_attributes", {}),
            is_active=bool(doc.get("is_active", True)),
            created_at=doc.get("created_at"),
            updated_at=doc.get("updated_at"),
        )
