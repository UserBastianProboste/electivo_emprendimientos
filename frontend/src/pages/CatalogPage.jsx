/*
 * Module: CatalogPage
 * Description: Public catalog view supporting dynamic attribute filtering and configurable layouts (RF-01.3, RF-01.4)
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of CatalogPage with grid-3, grid-4, and list view structures.
 * - 2026-10-15 [v0.2.0]: Updated with Material Design 3 surfaces, segmented controls, and refined typography.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useStoreConfig } from '../context/StoreConfigContext';
import { getCatalogProducts, getCatalogFilters } from '../services/api';
import { ProductCard } from '../components/catalog/ProductCard';
import { DynamicFilterPanel } from '../components/catalog/DynamicFilterPanel';
import { LayoutGrid, Grid3X3, List, ArrowUpDown, Loader2, PackageOpen } from 'lucide-react';

export function CatalogPage({ initialCategory = '' }) {
  const { config } = useStoreConfig();

  // Active layout defaults to store configuration (RF-01.4)
  const [activeLayout, setActiveLayout] = useState(config.catalog_layout || 'grid-3');

  useEffect(() => {
    if (config.catalog_layout) {
      setActiveLayout(config.catalog_layout);
    }
  }, [config.catalog_layout]);

  // Query state
  const [filters, setFilters] = useState({
    search: '',
    category: initialCategory,
    min_price: '',
    max_price: '',
    sort_by: 'newest',
    dynamic_attributes: {},
    page: 1,
    page_size: 24,
  });

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [facetData, setFacetData] = useState({
    categories: [],
    price_range: { min: 0, max: 0 },
    dynamic_attributes: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load facets
  useEffect(() => {
    async function loadFacets() {
      try {
        const facets = await getCatalogFilters();
        setFacetData(facets);
      } catch (err) {
        console.warn('Could not load catalog filters:', err.message);
      }
    }
    loadFacets();
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        search: filters.search,
        category: filters.category,
        min_price: filters.min_price,
        max_price: filters.max_price,
        sort_by: filters.sort_by,
        page: filters.page,
        page_size: filters.page_size,
      };

      if (filters.dynamic_attributes) {
        Object.entries(filters.dynamic_attributes).forEach(([k, v]) => {
          if (v) params[`attr_${k}`] = v;
        });
      }

      const data = await getCatalogProducts(params);
      setProducts(data.products || []);
      setTotalProducts(data.total || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (partial) => {
    setFilters((prev) => ({
      ...prev,
      ...partial,
      page: 1,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: '',
      min_price: '',
      max_price: '',
      sort_by: 'newest',
      dynamic_attributes: {},
      page: 1,
      page_size: 24,
    });
  };

  return (
    <div className="catalog-page container animate-fade-in" style={{ paddingTop: '2.5rem' }}>
      {/* Top Header & Layout Switcher Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid var(--md-sys-color-outline-variant)',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)', letterSpacing: '-0.02em' }}>
            Catálogo
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--md-sys-color-on-surface-variant)' }}>
            Explora los productos con atributos dinámicos y filtros especializados.
          </p>
        </div>

        {/* Layout Switcher & Sort Toolbar (RF-01.4) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowUpDown size={15} color="var(--md-sys-color-outline)" />
            <select
              value={filters.sort_by}
              onChange={(e) => handleFilterChange({ sort_by: e.target.value })}
              style={{
                backgroundColor: 'var(--md-sys-color-surface-container)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                borderRadius: 'var(--md-shape-sm)',
                color: 'var(--md-sys-color-on-surface)',
                fontSize: '0.85rem',
                padding: '0.45rem 0.75rem',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="newest">Más recientes</option>
              <option value="price_asc">Precio: menor a mayor</option>
              <option value="price_desc">Precio: mayor a menor</option>
              <option value="name_asc">Nombre: A - Z</option>
            </select>
          </div>

          {/* M3 Segmented Layout Switcher (RF-01.4: grid-3, grid-4, list) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--md-sys-color-surface-container)',
              border: '1px solid var(--md-sys-color-outline-variant)',
              borderRadius: 'var(--md-shape-full)',
              padding: '0.2rem',
              gap: '0.15rem',
            }}
          >
            <button
              onClick={() => setActiveLayout('grid-3')}
              title="Cuadrícula 3 Columnas"
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--md-shape-full)',
                border: 'none',
                backgroundColor: activeLayout === 'grid-3' ? 'var(--md-sys-color-primary-container)' : 'transparent',
                color: activeLayout === 'grid-3' ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface-variant)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'all var(--md-transition)',
              }}
            >
              <Grid3X3 size={15} />
            </button>

            <button
              onClick={() => setActiveLayout('grid-4')}
              title="Cuadrícula 4 Columnas"
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--md-shape-full)',
                border: 'none',
                backgroundColor: activeLayout === 'grid-4' ? 'var(--md-sys-color-primary-container)' : 'transparent',
                color: activeLayout === 'grid-4' ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface-variant)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'all var(--md-transition)',
              }}
            >
              <LayoutGrid size={15} />
            </button>

            <button
              onClick={() => setActiveLayout('list')}
              title="Vista de Lista con descripción extendida"
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--md-shape-full)',
                border: 'none',
                backgroundColor: activeLayout === 'list' ? 'var(--md-sys-color-primary-container)' : 'transparent',
                color: activeLayout === 'list' ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface-variant)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'all var(--md-transition)',
              }}
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Filter Sidebar + Products Stream */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '270px 1fr',
          gap: '2rem',
          alignItems: 'start',
        }}
        className="catalog-layout-grid"
      >
        <DynamicFilterPanel
          filters={filters}
          facetData={facetData}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalResults={totalProducts}
        />

        <section>
          {loading ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '340px',
                gap: '1rem',
                color: 'var(--md-sys-color-on-surface-variant)',
              }}
            >
              <Loader2 size={30} className="spin-animation" color="var(--md-sys-color-primary)" />
              <p style={{ fontSize: '0.875rem' }}>Cargando catálogo...</p>
            </div>
          ) : error ? (
            <div
              style={{
                backgroundColor: 'var(--md-sys-color-error-container)',
                border: '1px solid var(--md-sys-color-error)',
                borderRadius: 'var(--md-shape-md)',
                padding: '2rem',
                textAlign: 'center',
                color: 'var(--md-sys-color-on-error-container)',
              }}
            >
              <p style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Error al cargar catálogo: {error}</p>
              <button
                onClick={fetchProducts}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  color: 'var(--md-sys-color-on-surface)',
                  borderRadius: 'var(--md-shape-sm)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                Reintentar
              </button>
            </div>
          ) : products.length === 0 ? (
            <div
              style={{
                backgroundColor: 'var(--md-sys-color-surface-container-low)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                borderRadius: 'var(--md-shape-lg)',
                padding: '4rem 2rem',
                textAlign: 'center',
              }}
            >
              <PackageOpen size={44} color="var(--md-sys-color-outline)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--md-sys-color-on-surface)' }}>
                No se encontraron productos
              </h3>
              <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Prueba ajustando los términos de búsqueda o limpiando los filtros seleccionados.
              </p>
              <button
                onClick={handleResetFilters}
                style={{
                  padding: '0.6rem 1.4rem',
                  backgroundColor: 'var(--md-sys-color-primary)',
                  color: 'var(--md-sys-color-on-primary)',
                  border: 'none',
                  borderRadius: 'var(--md-shape-full)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div
              className={
                activeLayout === 'grid-4'
                  ? 'catalog-grid-4'
                  : activeLayout === 'list'
                  ? 'catalog-list'
                  : 'catalog-grid-3'
              }
            >
              {products.map((item) => (
                <ProductCard key={item.id || item.slug} product={item} layout={activeLayout} />
              ))}
            </div>
          )}
        </section>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .catalog-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-animation {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
