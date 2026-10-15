/*
 * Module: DynamicFilterPanel
 * Description: Material Design 3 (M3) faceted search panel with dynamic industry attributes (RF-01.3)
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of dynamic polymorphic filter panel.
 * - 2026-10-15 [v0.2.0]: Updated to Google M3 chip styles, surface containers, and typography.
 */

import React, { useState } from 'react';
import { Search, Filter, RotateCcw, ChevronDown, ChevronUp, Tag } from 'lucide-react';

export function DynamicFilterPanel({
  filters,
  facetData,
  onFilterChange,
  onResetFilters,
  totalResults = 0,
}) {
  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleSection = (sectionKey) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const handleCategoryClick = (categoryName) => {
    if (filters.category === categoryName) {
      onFilterChange({ category: '' });
    } else {
      onFilterChange({ category: categoryName });
    }
  };

  const handleDynamicAttributeClick = (attrKey, attrVal) => {
    const currentVal = filters.dynamic_attributes?.[attrKey];
    const newDyn = { ...(filters.dynamic_attributes || {}) };

    if (currentVal === attrVal) {
      delete newDyn[attrKey];
    } else {
      newDyn[attrKey] = attrVal;
    }
    onFilterChange({ dynamic_attributes: newDyn });
  };

  const activeFiltersCount =
    (filters.search ? 1 : 0) +
    (filters.category ? 1 : 0) +
    (filters.min_price ? 1 : 0) +
    (filters.max_price ? 1 : 0) +
    Object.keys(filters.dynamic_attributes || {}).length;

  return (
    <aside
      style={{
        backgroundColor: 'var(--md-sys-color-surface-container-low)',
        border: '1px solid var(--md-sys-color-outline-variant)',
        borderRadius: 'var(--md-shape-lg)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        boxShadow: 'var(--md-elevation-1)',
      }}
    >
      {/* Panel Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--md-sys-color-outline-variant)',
          paddingBottom: '0.85rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} color="var(--md-sys-color-primary)" />
          <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>
            Filtros
          </h2>
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={onResetFilters}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--md-sys-color-primary)',
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={12} />
            <span>Limpiar ({activeFiltersCount})</span>
          </button>
        )}
      </div>

      {/* 1. Keyword Search */}
      <div>
        <label
          htmlFor="catalog-search"
          style={{
            display: 'block',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: 'var(--md-sys-color-on-surface-variant)',
            marginBottom: '0.45rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          Búsqueda
        </label>
        <div style={{ position: 'relative' }}>
          <input
            id="catalog-search"
            type="text"
            placeholder="Buscar productos..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            style={{
              width: '100%',
              padding: '0.55rem 0.8rem 0.55rem 2.2rem',
              backgroundColor: 'var(--md-sys-color-surface)',
              border: '1px solid var(--md-sys-color-outline-variant)',
              borderRadius: 'var(--md-shape-sm)',
              color: 'var(--md-sys-color-on-surface)',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'border-color var(--md-transition)',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--md-sys-color-primary)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--md-sys-color-outline-variant)')}
          />
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--md-sys-color-outline)',
            }}
          />
        </div>
      </div>

      {/* 2. Categories Filter */}
      {facetData?.categories && facetData.categories.length > 0 && (
        <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1.2rem' }}>
          <div
            onClick={() => toggleSection('categories')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              marginBottom: '0.75rem',
            }}
          >
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--md-sys-color-on-surface-variant)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Categorías
            </span>
            {collapsedSections.categories ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </div>

          {!collapsedSections.categories && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {facetData.categories.map((cat) => {
                const isSelected = filters.category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.78rem',
                      fontWeight: isSelected ? 600 : 500,
                      backgroundColor: isSelected
                        ? 'var(--md-sys-color-primary-container)'
                        : 'var(--md-sys-color-surface)',
                      color: isSelected
                        ? 'var(--md-sys-color-on-primary-container)'
                        : 'var(--md-sys-color-on-surface-variant)',
                      border: '1px solid',
                      borderColor: isSelected
                        ? 'var(--md-sys-color-primary)'
                        : 'var(--md-sys-color-outline-variant)',
                      borderRadius: 'var(--md-shape-sm)',
                      cursor: 'pointer',
                      transition: 'all var(--md-transition)',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 3. Price Range Filter */}
      <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1.2rem' }}>
        <div
          onClick={() => toggleSection('price')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            marginBottom: '0.75rem',
          }}
        >
          <span
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              color: 'var(--md-sys-color-on-surface-variant)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Rango de Precio
          </span>
          {collapsedSections.price ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </div>

        {!collapsedSections.price && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="number"
              placeholder="Mín $"
              value={filters.min_price || ''}
              onChange={(e) => onFilterChange({ min_price: e.target.value })}
              style={{
                width: '50%',
                padding: '0.5rem 0.65rem',
                backgroundColor: 'var(--md-sys-color-surface)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                borderRadius: 'var(--md-shape-sm)',
                color: 'var(--md-sys-color-on-surface)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
              }}
            />
            <span style={{ color: 'var(--md-sys-color-outline)' }}>–</span>
            <input
              type="number"
              placeholder="Máx $"
              value={filters.max_price || ''}
              onChange={(e) => onFilterChange({ max_price: e.target.value })}
              style={{
                width: '50%',
                padding: '0.5rem 0.65rem',
                backgroundColor: 'var(--md-sys-color-surface)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                borderRadius: 'var(--md-shape-sm)',
                color: 'var(--md-sys-color-on-surface)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
              }}
            />
          </div>
        )}
      </div>

      {/* 4. Dynamic Attributes Discovered from MongoDB (RF-01.3) */}
      {facetData?.dynamic_attributes && Object.keys(facetData.dynamic_attributes).length > 0 && (
        <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.85rem' }}>
            <Tag size={15} color="var(--md-sys-color-primary)" />
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--md-sys-color-on-surface-variant)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Atributos
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {Object.entries(facetData.dynamic_attributes).map(([attrKey, values]) => {
              const activeVal = filters.dynamic_attributes?.[attrKey];
              return (
                <div key={attrKey}>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--md-sys-color-outline)',
                      textTransform: 'capitalize',
                      marginBottom: '0.35rem',
                      fontWeight: 600,
                    }}
                  >
                    {attrKey}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {values.map((val) => {
                      const isSelected = activeVal === String(val);
                      return (
                        <button
                          key={String(val)}
                          onClick={() => handleDynamicAttributeClick(attrKey, String(val))}
                          style={{
                            padding: '0.25rem 0.55rem',
                            fontSize: '0.72rem',
                            backgroundColor: isSelected
                              ? 'var(--md-sys-color-primary-container)'
                              : 'var(--md-sys-color-surface)',
                            color: isSelected
                              ? 'var(--md-sys-color-on-primary-container)'
                              : 'var(--md-sys-color-on-surface-variant)',
                            border: '1px solid',
                            borderColor: isSelected
                              ? 'var(--md-sys-color-primary)'
                              : 'var(--md-sys-color-outline-variant)',
                            borderRadius: 'var(--md-shape-xs)',
                            cursor: 'pointer',
                            transition: 'all var(--md-transition)',
                          }}
                        >
                          {String(val)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Result Counter Notice */}
      <div
        style={{
          borderTop: '1px solid var(--md-sys-color-outline-variant)',
          paddingTop: '0.85rem',
          fontSize: '0.75rem',
          color: 'var(--md-sys-color-outline)',
          textAlign: 'center',
        }}
      >
        {totalResults} resultado{totalResults === 1 ? '' : 's'} disponible{totalResults === 1 ? '' : 's'}
      </div>
    </aside>
  );
}
