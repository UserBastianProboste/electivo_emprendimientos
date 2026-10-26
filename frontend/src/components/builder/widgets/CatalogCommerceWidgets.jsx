/*
 * Module: CatalogCommerceWidgets
 * Description: Renders Catalog and Product widgets (Widgets 4, 5, 6) with interactive cart triggers and micro-animations
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of catalog commerce widgets.
 * - 2026-10-26 [v1.2.0]: Added interactive cart action toasts, variant changes, and button micro-interactions.
 * - 2026-10-26 [v1.3.0]: Added mobile responsive stacking, variant styling, and onNavigate link handling.
 */

import React, { useState } from 'react';
import { ShoppingBag, Sliders, Check, RotateCcw, ArrowRight } from 'lucide-react';

export function CatalogFiltersWidget({ props = {}, deviceViewport = 'desktop' }) {
  const {
    filter_type = 'checkbox',
    filter_fields = ['CATEGORIA 1', 'CATEGORIA 2', 'RANGO DE PRECIO', 'EN STOCK'],
    show_count = true,
    position = 'lateral',
    reset_button = true,
    dynamic_source = 'Coleccion General',
  } = props;

  const isMobile = deviceViewport === 'mobile';
  const isTop = position === 'top' || isMobile;
  const [activeFilters, setActiveFilters] = useState([filter_fields[0]]);

  const toggleFilter = (f) => {
    setActiveFilters((prev) =>
      prev.includes(f) ? prev.filter((item) => item !== f) : [...prev, f]
    );
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--md-sys-color-surface-container-low)',
        border: '1px solid var(--md-sys-color-outline-variant)',
        borderRadius: 'var(--md-shape-lg)',
        padding: isMobile ? '1rem' : '1.25rem',
        boxShadow: 'var(--md-elevation-1)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.85rem',
          borderBottom: '1px solid var(--md-sys-color-outline-variant)',
          paddingBottom: '0.65rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sliders size={17} color="var(--md-sys-color-primary)" />
          <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>
            Filtros ({dynamic_source})
          </h4>
        </div>
        {reset_button && (
          <button
            type="button"
            onClick={() => setActiveFilters([])}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--md-sys-color-on-surface-variant)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <RotateCcw size={12} />
            <span>Limpiar</span>
          </button>
        )}
      </div>

      <div
        style={{
          display: isTop ? 'flex' : 'block',
          gap: isTop ? '0.75rem' : '0.65rem',
          flexWrap: 'wrap',
        }}
      >
        {filter_fields.map((field, idx) => {
          const isChecked = activeFilters.includes(field);
          return (
            <div key={idx} style={{ marginBottom: isTop ? 0 : '0.65rem' }}>
              <label
                onClick={() => toggleFilter(field)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.825rem',
                  color: 'var(--md-sys-color-on-surface)',
                  cursor: 'pointer',
                  padding: isTop ? '0.35rem 0.65rem' : '0',
                  borderRadius: isTop ? 'var(--md-shape-full)' : '0',
                  backgroundColor: isTop && isChecked ? 'var(--md-sys-color-primary-container)' : 'transparent',
                }}
              >
                <input
                  type={filter_type === 'radio' ? 'radio' : 'checkbox'}
                  name="catalog_facet"
                  checked={isChecked}
                  onChange={() => toggleFilter(field)}
                  style={{ accentColor: 'var(--md-sys-color-primary)', cursor: 'pointer' }}
                />
                <span>{field}</span>
                {show_count && (
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '0.7rem',
                      color: 'var(--md-sys-color-on-surface-variant)',
                      backgroundColor: 'var(--md-sys-color-surface-container)',
                      padding: '0.1rem 0.4rem',
                      borderRadius: 'var(--md-shape-full)',
                    }}
                  >
                    {12 - idx * 2}
                  </span>
                )}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProductCardWidget({ props = {}, onAddToCart = () => {}, onNavigate = () => {}, deviceViewport = 'desktop' }) {
  const {
    variant = 'standard',
    image = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    title = 'TITULO: NOMBRE DEL PRODUCTO',
    subtitle = 'SUBTITULO: Categoria o edicion',
    price = '$45.000 CLP',
    badge = 'DESTACADO',
    variant_selector = true,
    quantity_selector = true,
    cta = 'AGREGAR AL CARRITO',
    link = '/#1',
    stock_status = 'En Stock (Disponibilidad inmediata)',
  } = props;

  const isMobile = deviceViewport === 'mobile';
  const isMinimal = variant === 'minimal';
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    onAddToCart({ title, price, qty });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      style={{
        maxWidth: isMobile ? '100%' : '340px',
        margin: '0 auto',
        backgroundColor: isMinimal ? 'transparent' : 'var(--md-sys-color-surface-container-low)',
        border: isMinimal ? 'none' : '1px solid var(--md-sys-color-outline-variant)',
        borderRadius: 'var(--md-shape-lg)',
        overflow: 'hidden',
        boxShadow: isMinimal ? 'none' : 'var(--md-elevation-1)',
        transition: 'transform 120ms ease, box-shadow 120ms ease',
        boxSizing: 'border-box',
        width: '100%',
      }}
      onMouseEnter={(e) => {
        if (!isMinimal) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = 'var(--md-elevation-2)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isMinimal) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--md-elevation-1)';
        }
      }}
    >
      <div style={{ position: 'relative', height: isMobile ? '200px' : '230px', width: '100%', overflow: 'hidden' }}>
        <img
          src={image}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {badge && (
          <span
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              backgroundColor: 'var(--md-sys-color-primary)',
              color: 'var(--md-sys-color-on-primary)',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '0.2rem 0.55rem',
              borderRadius: 'var(--md-shape-full)',
              textTransform: 'uppercase',
            }}
          >
            {badge}
          </span>
        )}
      </div>

      <div style={{ padding: isMobile ? '1rem' : '1.25rem' }}>
        <div style={{ fontSize: '0.725rem', color: 'var(--md-sys-color-primary)', fontWeight: 600, textTransform: 'uppercase' }}>
          {subtitle}
        </div>
        <h3
          onClick={() => onNavigate(link)}
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            margin: '0.35rem 0 0.45rem 0',
            color: 'var(--md-sys-color-on-surface)',
            cursor: 'pointer',
          }}
        >
          {title}
        </h3>
        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--md-sys-color-primary)', marginBottom: '0.45rem' }}>
          {price}
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.85rem' }}>
          {stock_status}
        </div>

        {variant_selector && (
          <div style={{ marginBottom: '0.85rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--md-sys-color-on-surface-variant)', display: 'block', marginBottom: '0.25rem' }}>
              Variante
            </label>
            <select
              style={{
                width: '100%',
                padding: '0.45rem',
                borderRadius: 'var(--md-shape-sm)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                backgroundColor: 'var(--md-sys-color-surface)',
                color: 'var(--md-sys-color-on-surface)',
                fontSize: '0.825rem',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <option>Opcion Estandar</option>
              <option>Edicion Especial</option>
            </select>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {quantity_selector && (
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--md-sys-color-outline-variant)', borderRadius: 'var(--md-shape-sm)' }}>
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                style={{ padding: '0.4rem 0.65rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--md-sys-color-on-surface)' }}
              >
                -
              </button>
              <span style={{ fontSize: '0.825rem', fontWeight: 600, minWidth: '18px', textAlign: 'center' }}>{qty}</span>
              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                style={{ padding: '0.4rem 0.65rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--md-sys-color-on-surface)' }}
              >
                +
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleAdd}
            style={{
              flex: 1,
              padding: '0.65rem 0.85rem',
              backgroundColor: added ? '#10B981' : 'var(--md-sys-color-primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--md-shape-sm)',
              fontWeight: 700,
              fontSize: '0.825rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              transition: 'background-color 150ms ease, transform 120ms ease',
            }}
          >
            {added ? <Check size={16} /> : <ShoppingBag size={14} />}
            <span>{added ? 'Agregado' : cta}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductDetailWidget({ props = {}, onAddToCart = () => {}, deviceViewport = 'desktop' }) {
  const {
    variant = 'standard',
    gallery = ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80'],
    title = 'TITULO: FICHA COMPLETA DEL PRODUCTO',
    price = '$89.990',
    currency = 'CLP',
    description = 'DESCRIPCION: Explica en detalle los materiales, proceso de confeccion y dimensiones tecnicas del articulo.',
    attributes = [
      { label: 'ORIGEN', value: 'Fabricacion Local' },
      { label: 'MATERIAL', value: 'Materia prima sustentable' },
    ],
    add_to_cart_button = 'ANADIR AL CARRITO',
    secondary_cta = 'COMPRAR CON 1 CLIC',
  } = props;

  const isMobile = deviceViewport === 'mobile';
  const isWide = variant === 'wide';
  const [activeImg, setActiveImg] = useState(gallery[0] || '');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    onAddToCart({ title, price: `${price} ${currency}`, qty: 1 });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--md-sys-color-surface-container-lowest)',
        border: '1px solid var(--md-sys-color-outline-variant)',
        borderRadius: 'var(--md-shape-xl)',
        padding: isMobile ? '1.25rem' : '2rem',
        boxShadow: 'var(--md-elevation-1)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile || isWide ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: isMobile ? '1.25rem' : '2rem',
        }}
      >
        <div>
          <img
            src={activeImg || gallery[0]}
            alt={title}
            style={{
              width: '100%',
              height: isMobile ? '240px' : isWide ? '420px' : '360px',
              objectFit: 'cover',
              borderRadius: 'var(--md-shape-md)',
              display: 'block',
            }}
          />
          {gallery.length > 1 && (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', overflowX: 'auto' }}>
              {gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Vista ${i}`}
                  onClick={() => setActiveImg(img)}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: 'var(--md-shape-sm)',
                    cursor: 'pointer',
                    border: activeImg === img ? '2px solid var(--md-sys-color-primary)' : '1px solid var(--md-sys-color-outline-variant)',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 style={{ fontSize: isMobile ? '1.4rem' : '1.75rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)', marginBottom: '0.5rem' }}>
            {title}
          </h2>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--md-sys-color-primary)', marginBottom: '0.85rem' }}>
            {price} {currency}
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            {description}
          </p>

          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)', marginBottom: '0.45rem' }}>
              Especificaciones y Origen
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0.5rem' }}>
              {attributes.map((attr, idx) => (
                <div key={idx} style={{ padding: '0.45rem 0.65rem', backgroundColor: 'var(--md-sys-color-surface-container)', borderRadius: 'var(--md-shape-sm)' }}>
                  <span style={{ fontSize: '0.725rem', color: 'var(--md-sys-color-on-surface-variant)', display: 'block' }}>{attr.label}</span>
                  <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--md-sys-color-on-surface)' }}>{attr.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleAdd}
              style={{
                flex: 1,
                minWidth: '160px',
                padding: '0.75rem 1.25rem',
                backgroundColor: added ? '#10B981' : 'var(--md-sys-color-primary)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 'var(--md-shape-full)',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                transition: 'transform 120ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {added ? <Check size={16} /> : <ShoppingBag size={16} />}
              <span>{added ? 'Agregado al Carrito' : add_to_cart_button}</span>
            </button>
            {secondary_cta && (
              <button
                type="button"
                onClick={handleAdd}
                style={{
                  flex: 1,
                  minWidth: '140px',
                  padding: '0.75rem 1.15rem',
                  backgroundColor: 'transparent',
                  color: 'var(--md-sys-color-primary)',
                  border: '1px solid var(--md-sys-color-primary)',
                  borderRadius: 'var(--md-shape-full)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'transform 120ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {secondary_cta}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
