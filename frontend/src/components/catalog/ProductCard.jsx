/*
 * Module: ProductCard
 * Description: Material Design 3 (M3) product card supporting Grid-3, Grid-4, and List layout structures (RF-01.4)
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation supporting polymorphic dynamic attributes.
 * - 2026-10-15 [v0.2.0]: Refined with Google M3 surfaces, elevation, and tonal styling.
 */

import React from 'react';
import { CheckCircle2, AlertCircle, ShoppingBag } from 'lucide-react';

function formatCLP(amount) {
  if (amount === undefined || amount === null) return '$0';
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ProductCard({ product, layout = 'grid-3' }) {
  const isList = layout === 'list';
  const hasDiscount = product.original_price && product.original_price > product.price;
  const inStock = product.stock > 0;
  const imageUrl = product.images && product.images.length > 0
    ? product.images[0]
    : 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80';

  if (isList) {
    return (
      <div
        className="product-card-list"
        style={{
          display: 'flex',
          backgroundColor: 'var(--md-sys-color-surface-container-low)',
          border: '1px solid var(--md-sys-color-outline-variant)',
          borderRadius: 'var(--md-shape-lg)',
          overflow: 'hidden',
          transition: 'border-color var(--md-transition), box-shadow var(--md-transition)',
          boxShadow: 'var(--md-elevation-1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--md-sys-color-outline)';
          e.currentTarget.style.boxShadow = 'var(--md-elevation-2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--md-sys-color-outline-variant)';
          e.currentTarget.style.boxShadow = 'var(--md-elevation-1)';
        }}
      >
        {/* Left: Product Image */}
        <div
          style={{
            width: '260px',
            minWidth: '220px',
            height: '210px',
            position: 'relative',
            backgroundColor: 'var(--md-sys-color-surface-container)',
            flexShrink: 0,
          }}
        >
          <img
            src={imageUrl}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            loading="lazy"
          />
          {hasDiscount && (
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                backgroundColor: 'var(--md-sys-color-error)',
                color: 'var(--md-sys-color-on-error)',
                fontSize: '0.7rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--md-shape-xs)',
              }}
            >
              OFERTA
            </div>
          )}
        </div>

        {/* Center: Details & Extended Description */}
        <div
          style={{
            flex: 1,
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--md-sys-color-primary)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {product.category}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--md-sys-color-outline)' }}>•</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--md-sys-color-outline)' }}>
                {product.brand}
              </span>
            </div>

            <h3
              style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--md-sys-color-on-surface)',
                marginBottom: '0.4rem',
                letterSpacing: '-0.01em',
              }}
            >
              {product.name}
            </h3>

            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--md-sys-color-on-surface-variant)',
                lineHeight: 1.5,
                marginBottom: '1rem',
              }}
            >
              {product.description}
            </p>

            {/* Dynamic Attributes Row */}
            {product.dynamic_attributes && Object.keys(product.dynamic_attributes).length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {Object.entries(product.dynamic_attributes).map(([key, val]) => (
                  <span
                    key={key}
                    style={{
                      fontSize: '0.75rem',
                      backgroundColor: 'var(--md-sys-color-surface-container)',
                      color: 'var(--md-sys-color-on-surface-variant)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--md-shape-sm)',
                    }}
                  >
                    <strong style={{ color: 'var(--md-sys-color-on-surface)', textTransform: 'capitalize' }}>
                      {key}:
                    </strong>{' '}
                    {String(val)}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Stock indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '1rem' }}>
            {inStock ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--md-sys-color-primary)', fontSize: '0.8rem' }}>
                <CheckCircle2 size={15} />
                <span>Disponible ({product.stock} un.)</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--md-sys-color-error)', fontSize: '0.8rem' }}>
                <AlertCircle size={15} />
                <span>Sin stock disponible</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Pricing & CTA */}
        <div
          style={{
            width: '190px',
            borderLeft: '1px solid var(--md-sys-color-outline-variant)',
            backgroundColor: 'var(--md-sys-color-surface-container)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: '0.6rem',
          }}
        >
          {hasDiscount && (
            <span
              style={{
                fontSize: '0.85rem',
                color: 'var(--md-sys-color-outline)',
                textDecoration: 'line-through',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {formatCLP(product.original_price)}
            </span>
          )}
          <div
            style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              color: 'var(--md-sys-color-on-surface)',
            }}
          >
            {formatCLP(product.price)}
          </div>

          <button
            disabled={!inStock}
            style={{
              width: '100%',
              padding: '0.65rem 1rem',
              backgroundColor: inStock ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface-variant)',
              color: inStock ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-on-surface-variant)',
              border: 'none',
              borderRadius: 'var(--md-shape-full)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: inStock ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              transition: 'opacity var(--md-transition)',
            }}
          >
            <ShoppingBag size={16} />
            <span>{inStock ? 'Agregar' : 'Agotado'}</span>
          </button>
        </div>
      </div>
    );
  }

  // Grid Layouts (Grid-3 and Grid-4)
  return (
    <div
      className="product-card-grid"
      style={{
        backgroundColor: 'var(--md-sys-color-surface-container-low)',
        border: '1px solid var(--md-sys-color-outline-variant)',
        borderRadius: 'var(--md-shape-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--md-elevation-1)',
        transition: 'transform var(--md-transition), box-shadow var(--md-transition), border-color var(--md-transition)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.borderColor = 'var(--md-sys-color-outline)';
        e.currentTarget.style.boxShadow = 'var(--md-elevation-2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--md-sys-color-outline-variant)';
        e.currentTarget.style.boxShadow = 'var(--md-elevation-1)';
      }}
    >
      {/* Product Image */}
      <div
        style={{
          width: '100%',
          height: layout === 'grid-4' ? '180px' : '220px',
          position: 'relative',
          backgroundColor: 'var(--md-sys-color-surface-container)',
          overflow: 'hidden',
        }}
      >
        <img
          src={imageUrl}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          loading="lazy"
        />
        {hasDiscount && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              backgroundColor: 'var(--md-sys-color-error)',
              color: 'var(--md-sys-color-on-error)',
              fontSize: '0.68rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              padding: '0.15rem 0.45rem',
              borderRadius: 'var(--md-shape-xs)',
            }}
          >
            OFERTA
          </div>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: '1.2rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontSize: '0.72rem',
                color: 'var(--md-sys-color-primary)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {product.category}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--md-sys-color-outline)' }}>
              {product.brand}
            </span>
          </div>

          <h3
            style={{
              fontSize: layout === 'grid-4' ? '0.98rem' : '1.08rem',
              fontWeight: 700,
              color: 'var(--md-sys-color-on-surface)',
              marginBottom: '0.4rem',
              lineHeight: 1.35,
              letterSpacing: '-0.01em',
            }}
          >
            {product.name}
          </h3>

          <p
            style={{
              fontSize: '0.825rem',
              color: 'var(--md-sys-color-on-surface-variant)',
              lineHeight: 1.45,
              marginBottom: '0.85rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.description}
          </p>

          {/* Dynamic Attributes Pills */}
          {product.dynamic_attributes && Object.keys(product.dynamic_attributes).length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.35rem',
                marginBottom: '1rem',
              }}
            >
              {Object.entries(product.dynamic_attributes).slice(0, 3).map(([key, val]) => (
                <span
                  key={key}
                  style={{
                    fontSize: '0.7rem',
                    backgroundColor: 'var(--md-sys-color-surface-container)',
                    color: 'var(--md-sys-color-on-surface-variant)',
                    padding: '0.15rem 0.45rem',
                    borderRadius: 'var(--md-shape-sm)',
                  }}
                >
                  <strong style={{ color: 'var(--md-sys-color-on-surface)', textTransform: 'capitalize' }}>{key}:</strong> {String(val)}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Cart Action */}
        <div
          style={{
            borderTop: '1px solid var(--md-sys-color-outline-variant)',
            paddingTop: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
          }}
        >
          <div>
            {hasDiscount && (
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--md-sys-color-outline)',
                  textDecoration: 'line-through',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {formatCLP(product.original_price)}
              </div>
            )}
            <div
              style={{
                fontSize: '1.2rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                color: 'var(--md-sys-color-on-surface)',
              }}
            >
              {formatCLP(product.price)}
            </div>
          </div>

          <button
            disabled={!inStock}
            style={{
              padding: '0.5rem 0.9rem',
              backgroundColor: inStock ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface-variant)',
              color: inStock ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-on-surface-variant)',
              border: 'none',
              borderRadius: 'var(--md-shape-full)',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: inStock ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'opacity var(--md-transition)',
            }}
          >
            <ShoppingBag size={14} />
            <span>{inStock ? 'Comprar' : 'Agotado'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
