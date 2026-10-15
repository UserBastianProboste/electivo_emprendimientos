# Module: MongoDatabaseManager
# Description: MongoDB client and database connection lifecycle manager
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial implementation supporting connection pooling and mocks.

import os
from typing import Any, Optional
from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection


class MongoDatabaseManager:
    """Singleton connection manager for MongoDB."""

    _instance: Optional["MongoDatabaseManager"] = None
    _client: Optional[Any] = None
    _db: Optional[Any] = None

    def __new__(cls) -> "MongoDatabaseManager":
        if cls._instance is None:
            cls._instance = super(MongoDatabaseManager, cls).__new__(cls)
        return cls._instance

    def initialize(
        self,
        uri: Optional[str] = None,
        db_name: Optional[str] = None,
        use_mock: bool = False,
    ) -> Database:
        """Initialize and cache the database instance."""
        if use_mock:
            try:
                import mongomock  # type: ignore

                self._client = mongomock.MongoClient()
                target_db_name = db_name or "catalog_db"
                self._db = self._client[target_db_name]
                return self._db
            except ImportError as err:
                raise RuntimeError(
                    "mongomock is required for mock database initialization"
                ) from err

        target_uri = uri or os.getenv("MONGO_URI", "mongodb://localhost:27017/catalog_db")
        target_db_name = db_name or os.getenv("MONGO_DB_NAME", "catalog_db")

        if self._client is None:
            self._client = MongoClient(
                target_uri,
                serverSelectionTimeoutMS=5000,
                connectTimeoutMS=5000,
                maxPoolSize=50,
            )
            self._db = self._client[target_db_name]

        return self._db

    def get_database(self) -> Database:
        """Retrieve the active MongoDB database instance."""
        if self._db is None:
            return self.initialize()
        return self._db

    def get_collection(self, collection_name: str) -> Collection:
        """Retrieve a specific collection from the active MongoDB database."""
        db = self.get_database()
        return db[collection_name]

    def close(self) -> None:
        """Close the MongoDB client connection."""
        if self._client is not None:
            self._client.close()
            self._client = None
            self._db = None


_mongo_manager = MongoDatabaseManager()


def get_mongo_db() -> Database:
    """Helper function to fetch the configured MongoDB database."""
    return _mongo_manager.get_database()


def get_mongo_collection(collection_name: str) -> Collection:
    """Helper function to fetch a MongoDB collection."""
    return _mongo_manager.get_collection(collection_name)
