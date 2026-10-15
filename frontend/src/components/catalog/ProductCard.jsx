/*
 * Module: ProductCard
 * Description: Adaptable product card supporting Grid-3, Grid-4, and List layout structures (RF-01.4)
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation supporting polymorphic dynamic attributes.
 */

import React from 'react';
import { Tag, CheckCircle2, AlertCircle, ShoppingCart } from 'lucide-react';

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
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          transition: 'all var(--transition-fast)',
        }}
      >
        {/* Left: Product Image */}
        <div
          style={{
            width: '260px',
            minWidth: '220px',
            height: '220px',
            position: 'relative',
            backgroundColor: '#000',
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
                top: '10px',
                left: '10px',
                backgroundColor: 'var(--danger)',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--primary)',
                  backgroundColor: 'var(--primary-light)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px',
                  fontWeight: 600,
                }}
              >
                {product.category}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                {product.brand}
              </span>
            </div>

            <h3
              style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '0.5rem',
              }}
            >
              {product.name}
            </h3>

            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
                marginBottom: '1rem',
              }}
            >
              {product.description}
            </p>

            {/* Dynamic Attributes Row */}
            {product.dynamic_attributes && Object.keys(product.dynamic_attributes).length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {Object.entries(product.dynamic_attributes).map(([key, val]) => (
                  <span
                    key={key}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-muted)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                    }}
                  >
                    <strong style={{ color: 'var(--text-main)', textTransform: 'capitalize' }}>{key}:</strong> {String(val)}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Info: Stock status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem' }}>
            {inStock ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--success)', fontSize: '0.8rem' }}>
                <CheckCircle2 size={15} />
                <span>En stock ({product.stock} unidades)</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--danger)', fontSize: '0.8rem' }}>
                <AlertCircle size={15} />
                <span>Agotado</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Pricing & CTA */}
        <div
          style={{
            width: '200px',
            borderLeft: '1px solid var(--border-color)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: '0.75rem',
          }}
        >
          {hasDiscount && (
            <span
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-subtle)',
                textDecoration: 'line-through',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {formatCLP(product.original_price)}
            </span>
          )}
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              color: 'var(--primary)',
            }}
          >
            {formatCLP(product.price)}
          </div>

          <button
            disabled={!inStock}
            style={{
              width: '100%',
              padding: '0.65rem 1rem',
              backgroundColor: inStock ? 'var(--primary)' : 'var(--border-color)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: inStock ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'background-color var(--transition-fast)',
            }}
          >
            <ShoppingCart size={16} />
            <span>{inStock ? 'Comprar' : 'Agotado'}</span>
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
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform var(--transition-fast), border-color var(--transition-fast)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.borderColor = 'var(--border-focus)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-color)';
      }}
    >
      {/* Product Image */}
      <div
        style={{
          width: '100%',
          height: layout === 'grid-4' ? '180px' : '220px',
          position: 'relative',
          backgroundColor: '#000',
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
            transition: 'transform 300ms ease',
          }}
          loading="lazy"
        />
        {hasDiscount && (
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              backgroundColor: 'var(--danger)',
              color: '#fff',
              fontSize: '0.68rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
              padding: '0.15rem 0.45rem',
              borderRadius: '4px',
            }}
          >
            OFERTA
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            backgroundColor: 'rgba(9, 9, 11, 0.85)',
            backdropFilter: 'blur(4px)',
            color: 'var(--text-main)',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            padding: '0.15rem 0.45rem',
            borderRadius: '4px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {product.brand}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: '1.1rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--primary)',
              backgroundColor: 'var(--primary-light)',
              padding: '0.15rem 0.45rem',
              borderRadius: '4px',
              fontWeight: 600,
              display: 'inline-block',
              marginBottom: '0.5rem',
            }}
          >
            {product.category}
          </span>

          <h3
            style={{
              fontSize: layout === 'grid-4' ? '0.95rem' : '1.05rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              marginBottom: '0.4rem',
              lineHeight: 1.35,
            }}
          >
            {product.name}
          </h3>

          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              lineHeight: 1.45,
              marginBottom: '0.8rem',
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
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-muted)',
                    padding: '0.15rem 0.4rem',
                    borderRadius: '4px',
                  }}
                >
                  <strong style={{ color: 'var(--text-main)', textTransform: 'capitalize' }}>{key}:</strong> {String(val)}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Cart Action */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
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
                  color: 'var(--text-subtle)',
                  textDecoration: 'line-through',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {formatCLP(product.original_price)}
              </div>
            )}
            <div
              style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                color: 'var(--primary)',
              }}
            >
              {formatCLP(product.price)}
            </div>
          </div>

          <button
            disabled={!inStock}
            style={{
              padding: '0.5rem 0.85rem',
              backgroundColor: inStock ? 'var(--primary)' : 'var(--border-color)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: inStock ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'background-color var(--transition-fast)',
            }}
          >
            <ShoppingCart size={15} />
            <span>{inStock ? 'Comprar' : 'Agotado'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
