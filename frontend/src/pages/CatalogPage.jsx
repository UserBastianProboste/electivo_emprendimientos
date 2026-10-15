/*
 * Module: CatalogPage
 * Description: Public catalog view supporting dynamic attribute filtering and configurable layouts (RF-01.3, RF-01.4)
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of CatalogPage with grid-3, grid-4, and list view structures.
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

  // Synchronize when store config loads
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

  // Load facets once
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

  // Fetch products whenever filters change
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query params including dynamic attributes prefixed with 'attr_'
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
      page: 1, // Reset to page 1 on filter mutation
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
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Catálogo de Productos
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Explora la oferta comunitaria con atributos específicos por rubro (MongoDB Polimórfico).
          </p>
        </div>

        {/* Layout Switcher & Sort Toolbar (RF-01.4) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowUpDown size={15} color="var(--text-subtle)" />
            <select
              value={filters.sort_by}
              onChange={(e) => handleFilterChange({ sort_by: e.target.value })}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-main)',
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

          {/* Layout Switcher Controls (RF-01.4: grid-3, grid-4, list) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '0.2rem',
              gap: '0.2rem',
            }}
          >
            <button
              onClick={() => setActiveLayout('grid-3')}
              title="Cuadrícula 3 Columnas"
              style={{
                padding: '0.35rem 0.55rem',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: activeLayout === 'grid-3' ? 'var(--primary)' : 'transparent',
                color: activeLayout === 'grid-3' ? '#ffffff' : 'var(--text-subtle)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'all var(--transition-fast)',
              }}
            >
              <Grid3X3 size={16} />
            </button>

            <button
              onClick={() => setActiveLayout('grid-4')}
              title="Cuadrícula 4 Columnas"
              style={{
                padding: '0.35rem 0.55rem',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: activeLayout === 'grid-4' ? 'var(--primary)' : 'transparent',
                color: activeLayout === 'grid-4' ? '#ffffff' : 'var(--text-subtle)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'all var(--transition-fast)',
              }}
            >
              <LayoutGrid size={16} />
            </button>

            <button
              onClick={() => setActiveLayout('list')}
              title="Vista de Lista con descripción extendida"
              style={{
                padding: '0.35rem 0.55rem',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: activeLayout === 'list' ? 'var(--primary)' : 'transparent',
                color: activeLayout === 'list' ? '#ffffff' : 'var(--text-subtle)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'all var(--transition-fast)',
              }}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Filter Sidebar + Products Stream */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '2rem',
          alignItems: 'start',
        }}
        className="catalog-layout-grid"
      >
        {/* Dynamic Facet Filter Sidebar */}
        <DynamicFilterPanel
          filters={filters}
          facetData={facetData}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalResults={totalProducts}
        />

        {/* Product Items Region */}
        <section>
          {loading ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '360px',
                gap: '1rem',
                color: 'var(--text-muted)',
              }}
            >
              <Loader2 size={32} className="spin-animation" color="var(--primary)" />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                Cargando catálogo flexible desde MongoDB...
              </p>
            </div>
          ) : error ? (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              <p style={{ color: 'var(--danger)', fontWeight: 600, marginBottom: '0.5rem' }}>
                Error al cargar productos: {error}
              </p>
              <button
                onClick={fetchProducts}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  borderRadius: 'var(--radius-md)',
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
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '4rem 2rem',
                textAlign: 'center',
              }}
            >
              <PackageOpen size={48} color="var(--text-subtle)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                No se encontraron productos
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Intenta ajustar los filtros de búsqueda o seleccionar otros atributos dinámicos.
              </p>
              <button
                onClick={handleResetFilters}
                style={{
                  padding: '0.6rem 1.25rem',
                  backgroundColor: 'var(--primary)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                Restablecer todos los filtros
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

      {/* Responsive layout styles */}
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
