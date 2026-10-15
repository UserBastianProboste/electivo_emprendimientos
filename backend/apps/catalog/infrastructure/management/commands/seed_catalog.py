# Module: SeedCatalogCommand
# Description: Django management command populating multi-industry polymorphic products in MongoDB
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v0.1.0]: Initial seeder implementation with fashion, tech, gourmet, and craft industries.

from typing import Any
from django.core.management.base import BaseCommand
from apps.catalog.infrastructure.repositories import MongoProductRepository
from apps.catalog.domain.entities import Product


class Command(BaseCommand):
    help = "Seed polymorphic products across multiple industries into MongoDB"

    def add_arguments(self, parser: Any) -> None:
        parser.add_argument(
            '--force',
            action='store_true',
            help='Drop existing catalog collection and reseed from scratch',
        )

    def handle(self, *args: Any, **options: Any) -> None:
        repo = MongoProductRepository()
        collection = repo.collection

        if options.get('force'):
            self.stdout.write("Dropping existing catalog collection...")
            collection.delete_many({})

        existing_count = collection.count_documents({})
        if existing_count > 0 and not options.get('force'):
            self.stdout.write(
                self.style.WARNING(
                    f"Catalog already contains {existing_count} items. Use --force to recreate."
                )
            )
            return

        sample_products = [
            # 1. Fashion / Vestuario Sostenible
            {
                "name": "Polera Básica de Algodón Orgánico",
                "slug": "polera-basica-algodon-organico",
                "description": "Polera confeccionada con 100% algodón orgánico certificado GOTS, teñido con tintes naturales de bajo impacto ambiental.",
                "price": 18990.0,
                "original_price": 22990.0,
                "category": "Vestuario",
                "brand": "EcoTejidos Austral",
                "stock": 25,
                "images": [
                    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
                ],
                "dynamic_attributes": {
                    "talla": "M",
                    "color": "Verde Musgo",
                    "material": "Algodón Orgánico 100%",
                    "genero": "Unisex"
                }
            },
            {
                "name": "Chaqueta Cortavientos Softshell Reciclada",
                "slug": "chaqueta-cortavientos-softshell-reciclada",
                "description": "Chaqueta impermeable y cortaviento fabricada a partir de botellas PET recicladas. Diseño ergonómico de alta resistencia térmica.",
                "price": 54990.0,
                "original_price": 64990.0,
                "category": "Vestuario",
                "brand": "EcoTejidos Austral",
                "stock": 12,
                "images": [
                    "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"
                ],
                "dynamic_attributes": {
                    "talla": "L",
                    "color": "Negro Grafito",
                    "material": "Poliéster Reciclado",
                    "genero": "Hombre"
                }
            },
            {
                "name": "Gorro Artesanal de Lana Chilota",
                "slug": "gorro-artesanal-lana-chilota",
                "description": "Tejido a palillo con lana virgen hilada a mano por artesanas de Chiloé. Máxima calidez para climas extremos.",
                "price": 14990.0,
                "original_price": None,
                "category": "Vestuario",
                "brand": "Hilanderas del Sur",
                "stock": 18,
                "images": [
                    "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80"
                ],
                "dynamic_attributes": {
                    "talla": "Única",
                    "color": "Terracota",
                    "material": "Lana de Oveja 100%",
                    "genero": "Unisex"
                }
            },
            # 2. Electrónica & Tecnología Comunitaria
            {
                "name": "Lámpara Solar LED Inteligente con Sensor",
                "slug": "lampara-solar-led-inteligente",
                "description": "Luminaria solar autónoma para exteriores con sensor de movimiento crepuscular y batería de litio LiFePO4 de larga vida útil.",
                "price": 29990.0,
                "original_price": 35990.0,
                "category": "Tecnología",
                "brand": "Solaria Tech",
                "stock": 30,
                "images": [
                    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
                ],
                "dynamic_attributes": {
                    "voltaje": "12V",
                    "potencia": "25W",
                    "conectividad": "Infrarrojo",
                    "autonomia": "14 horas"
                }
            },
            {
                "name": "Parlante Bluetooth de Bambú Sustentable",
                "slug": "parlante-bluetooth-bambu-sustentable",
                "description": "Caja acústica artesanal de bambú natural con sonido de alta definición, micrófono integrado y conectividad Bluetooth 5.3.",
                "price": 38990.0,
                "original_price": 44990.0,
                "category": "Tecnología",
                "brand": "EcoSound Labs",
                "stock": 15,
                "images": [
                    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80"
                ],
                "dynamic_attributes": {
                    "voltaje": "5V USB-C",
                    "potencia": "20W RMS",
                    "conectividad": "Bluetooth 5.3",
                    "autonomia": "10 horas"
                }
            },
            # 3. Gourmet & Alimentos Saludables
            {
                "name": "Miel Cruda de Bosque Nativo (Ulmo)",
                "slug": "miel-cruda-bosque-nativo-ulmo",
                "description": "Miel monofloral de flor de Ulmo recolectada en los bosques prístinos de la Región de Los Lagos. Sin pasteurizar y con propiedades antibacteriales naturales.",
                "price": 8990.0,
                "original_price": 10990.0,
                "category": "Gourmet",
                "brand": "Colmenas del Ranco",
                "stock": 40,
                "images": [
                    "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80"
                ],
                "dynamic_attributes": {
                    "origen": "Lago Ranco",
                    "peso": "500g",
                    "certificacion": "Orgánico SAG",
                    "conservacion": "Lugar fresco y seco"
                }
            },
            {
                "name": "Café de Especialidad Tostado en Origen",
                "slug": "cafe-especialidad-tostado-origen",
                "description": "Grano arábica seleccionado a mano con notas a chocolate amargo y frutos secos. Tostado artesanalmente en pequeños lotes.",
                "price": 12500.0,
                "original_price": None,
                "category": "Gourmet",
                "brand": "Café Valparaíso",
                "stock": 35,
                "images": [
                    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80"
                ],
                "dynamic_attributes": {
                    "origen": "Valparaíso",
                    "peso": "250g",
                    "certificacion": "Comercio Justo",
                    "tipo_molienda": "Grano Entero"
                }
            },
            # 4. Artesanía & Decoración
            {
                "name": "Juego de Tazas de Gres Hecho a Mano (Set x2)",
                "slug": "juego-tazas-gres-hecho-a-mano",
                "description": "Piezas únicas torneadas a mano en gres y quemadas a 1250°C. Esmaltes cerámicos libres de plomo y aptas para lavavajillas.",
                "price": 24990.0,
                "original_price": 28990.0,
                "category": "Artesanía",
                "brand": "Taller Barro Vivo",
                "stock": 8,
                "images": [
                    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
                ],
                "dynamic_attributes": {
                    "tecnica": "Torneado Manual",
                    "acabado": "Esmalte Mate",
                    "capacidad": "320ml",
                    "origen": "Pomaire"
                }
            },
            {
                "name": "Macetero Autorriego de Arcilla Terracota",
                "slug": "macetero-autorriego-arcilla-terracota",
                "description": "Maceta ecológica que aprovecha la porosidad de la arcilla natural para hidratar raíces por capilaridad.",
                "price": 16990.0,
                "original_price": None,
                "category": "Artesanía",
                "brand": "Taller Barro Vivo",
                "stock": 20,
                "images": [
                    "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80"
                ],
                "dynamic_attributes": {
                    "tecnica": "Modelado en Arcilla",
                    "acabado": "Terracota Natural",
                    "capacidad": "1.5L",
                    "origen": "Pomaire"
                }
            }
        ]

        count = 0
        for item in sample_products:
            prod = Product(
                id=None,
                name=item["name"],
                slug=item["slug"],
                description=item["description"],
                price=item["price"],
                original_price=item.get("original_price"),
                category=item["category"],
                brand=item["brand"],
                stock=item["stock"],
                images=item["images"],
                dynamic_attributes=item["dynamic_attributes"],
            )
            repo.create_product(prod)
            count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully seeded {count} polymorphic products across 4 industries into MongoDB."
            )
        )
