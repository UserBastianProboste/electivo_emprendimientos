/*
 * Module: WidgetPropertyInspector
 * Description: Deep property inspector providing visual variant selectors, item list editors, and business tips
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of property inspector panel.
 * - 2026-10-26 [v1.1.0]: Refactored to fixed viewport overlay with minimizer tab to avoid canvas reflow.
 * - 2026-10-26 [v1.2.0]: Added deep editing for cards, plans, FAQs, form fields, style variants, and business tips.
 * - 2026-10-26 [v1.3.0]: Added instant variant chips, link auto-suggestions (pages and vertical #N anchors), and exhaustive editing for all 25 widgets.
 * - 2026-10-26 [v1.4.0]: Integrated modular sub-inspectors for social networks, videos, blog posts, catalog filters, and forms.
 */

import React, { useState } from 'react';
import {
  X,
  Sliders,
  ChevronDown,
  Minimize2,
  Maximize2,
  Plus,
  Trash2,
  Lightbulb,
  Check,
  Layers,
  Link as LinkIcon,
  Image as ImageIcon,
  Compass,
} from 'lucide-react';
import { WIDGET_DEFINITIONS } from '../../data/widgetDefinitions';
import { SocialLinksInspector } from './inspector/SocialLinksInspector';
import { VideoPlayerInspector, BlogGridInspector } from './inspector/MediaContentInspector';
import {
  CatalogFiltersInspector,
  ProductDetailInspector,
  CheckoutAndShippingInspector,
} from './inspector/CommerceInspector';
import {
  GenericFormInspector,
  SubscriptionAndPortalInspector,
} from './inspector/FormsAndPortalInspector';
import { StructureInspector } from './inspector/StructureInspector';

export function WidgetPropertyInspector({
  widget,
  verticalIndex = 1,
  pages = [],
  activeWidgets = [],
  onUpdateProps,
  onClose,
}) {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!widget) return null;

  const definition = WIDGET_DEFINITIONS.find((d) => d.type === widget.type) || {
    name: widget.type,
    purpose: '',
    tip: '',
    variants: [],
    number: verticalIndex,
  };

  const currentProps = widget.props || {};

  const handleFieldChange = (key, value) => {
    onUpdateProps(widget.id, {
      ...currentProps,
      [key]: value,
    });
  };

  const handleNestedFieldChange = (parentKey, childKey, value) => {
    onUpdateProps(widget.id, {
      ...currentProps,
      [parentKey]: {
        ...(currentProps[parentKey] || {}),
        [childKey]: value,
      },
    });
  };

  // Helper component for link input with destination suggestions
  const LinkInputWithSuggestions = ({ label = 'Enlace / Destino', value = '', onChange }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);

    return (
      <div style={{ position: 'relative', marginTop: '0.35rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)' }}>
            {label}
          </label>
          <button
            type="button"
            onClick={() => setShowSuggestions(!showSuggestions)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--md-sys-color-primary)',
              fontSize: '0.725rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.2rem',
              padding: 0,
            }}
          >
            <Compass size={12} />
            <span>Sugerir destino</span>
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Ej. /catalogo o /#1"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.45rem 0.65rem 0.45rem 2rem',
              borderRadius: 'var(--md-shape-sm)',
              border: '1px solid var(--md-sys-color-outline-variant)',
              backgroundColor: 'var(--md-sys-color-surface)',
              color: 'var(--md-sys-color-on-surface)',
              fontSize: '0.8rem',
              boxSizing: 'border-box',
              fontFamily: 'var(--font-mono)',
            }}
          />
          <LinkIcon
            size={13}
            color="var(--md-sys-color-on-surface-variant)"
            style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' }}
          />
        </div>

        {/* Suggestions Menu */}
        {showSuggestions && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 200,
              backgroundColor: 'var(--md-sys-color-surface)',
              border: '1px solid var(--md-sys-color-outline-variant)',
              borderRadius: 'var(--md-shape-md)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              padding: '0.5rem',
              marginTop: '0.25rem',
              maxHeight: '220px',
              overflowY: 'auto',
            }}
          >
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--md-sys-color-primary)', padding: '0.25rem 0.5rem', textTransform: 'uppercase' }}>
              Vistas / Paginas
            </div>
            {pages.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onChange(p.slug || '/');
                  setShowSuggestions(false);
                }}
                style={{
                  padding: '0.35rem 0.5rem',
                  fontSize: '0.775rem',
                  cursor: 'pointer',
                  borderRadius: 'var(--md-shape-sm)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: 'var(--md-sys-color-on-surface)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--md-sys-color-surface-container)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span>{p.label}</span>
                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', opacity: 0.7 }}>{p.slug}</span>
              </div>
            ))}

            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--md-sys-color-primary)', padding: '0.4rem 0.5rem 0.25rem 0.5rem', textTransform: 'uppercase', borderTop: '1px solid var(--md-sys-color-outline-variant)', marginTop: '0.35rem' }}>
              Scroll a Bloque Vertical
            </div>
            {activeWidgets.map((w, wIdx) => {
              const pos = wIdx + 1;
              const def = WIDGET_DEFINITIONS.find((d) => d.type === w.type);
              const anchor = `/#${pos}`;
              return (
                <div
                  key={w.id}
                  onClick={() => {
                    onChange(anchor);
                    setShowSuggestions(false);
                  }}
                  style={{
                    padding: '0.35rem 0.5rem',
                    fontSize: '0.775rem',
                    cursor: 'pointer',
                    borderRadius: 'var(--md-shape-sm)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'var(--md-sys-color-on-surface)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--md-sys-color-surface-container)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span>Bloque #{pos} ({def?.name || w.type})</span>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--md-sys-color-primary)', fontWeight: 700 }}>
                    {anchor}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Minimized Mode
  if (isMinimized) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '24px',
          zIndex: 1000,
          backgroundColor: 'var(--md-sys-color-surface-container-high)',
          border: '1px solid var(--md-sys-color-primary)',
          borderRadius: 'var(--md-shape-full)',
          padding: '0.5rem 1rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          cursor: 'pointer',
          animation: 'fadeIn 120ms ease',
        }}
        onClick={() => setIsMinimized(false)}
      >
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            backgroundColor: 'var(--md-sys-color-primary)',
            color: 'var(--md-sys-color-on-primary)',
            padding: '0.15rem 0.5rem',
            borderRadius: 'var(--md-shape-full)',
          }}
        >
          #{verticalIndex}
        </span>
        <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>
          Editar: {definition.name}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsMinimized(false);
          }}
          title="Desplegar inspector"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--md-sys-color-primary)',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Maximize2 size={15} />
        </button>
      </div>
    );
  }

  return (
    <aside
      style={{
        position: 'fixed',
        top: '70px',
        right: '20px',
        bottom: '24px',
        width: '400px',
        maxWidth: 'calc(100vw - 40px)',
        zIndex: 1000,
        backgroundColor: 'var(--md-sys-color-surface-container-low)',
        border: '1px solid var(--md-sys-color-outline-variant)',
        borderRadius: 'var(--md-shape-xl)',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.28)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
        animation: 'fadeIn 120ms ease',
      }}
    >
      {/* Header with vertical position and scroll anchor */}
      <div
        style={{
          padding: '0.85rem 1.25rem',
          borderBottom: '1px solid var(--md-sys-color-outline-variant)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--md-sys-color-surface-container)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              backgroundColor: 'var(--md-sys-color-primary)',
              color: 'var(--md-sys-color-on-primary)',
              padding: '0.2rem 0.55rem',
              borderRadius: 'var(--md-shape-full)',
            }}
          >
            #{verticalIndex}
          </span>
          <div>
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
              {definition.name}
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--md-sys-color-primary)', fontWeight: 600 }}>
              Destino para botones: /#{verticalIndex}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            title="Minimizar panel para ver cambios en vivo"
            style={{
              padding: '0.35rem',
              borderRadius: 'var(--md-shape-sm)',
              border: 'none',
              backgroundColor: 'transparent',
              color: 'var(--md-sys-color-on-surface-variant)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Minimize2 size={16} />
          </button>
          <button
            type="button"
            onClick={onClose}
            title="Cerrar panel"
            style={{
              padding: '0.35rem',
              borderRadius: 'var(--md-shape-sm)',
              border: 'none',
              backgroundColor: 'transparent',
              color: 'var(--md-sys-color-on-surface-variant)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* Practical Entrepreneur Tip */}
      {definition.tip && (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            backgroundColor: 'var(--md-sys-color-surface-container-high)',
            fontSize: '0.78rem',
            color: 'var(--md-sys-color-on-surface)',
            lineHeight: 1.45,
            borderBottom: '1px solid var(--md-sys-color-outline-variant)',
          }}
        >
          <Lightbulb size={15} color="var(--md-sys-color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ color: 'var(--md-sys-color-primary)' }}>Tip de Negocio: </strong>
            {definition.tip}
          </div>
        </div>
      )}

      {/* Scrollable Form */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.15rem',
        }}
      >
        {/* Style Variant Selector with M3 Segmented Chips */}
        {definition.variants && definition.variants.length > 0 && (
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--md-sys-color-on-surface-variant)',
                marginBottom: '0.45rem',
              }}
            >
              Variante Visual (Cambio Inmediato)
            </label>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {definition.variants.map((v) => {
                const isActive = (currentProps.variant || definition.variants[0].id) === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => handleFieldChange('variant', v.id)}
                    style={{
                      flex: '1 1 auto',
                      padding: '0.45rem 0.65rem',
                      borderRadius: 'var(--md-shape-sm)',
                      border: isActive
                        ? '1px solid var(--md-sys-color-primary)'
                        : '1px solid var(--md-sys-color-outline-variant)',
                      backgroundColor: isActive
                        ? 'var(--md-sys-color-primary)'
                        : 'var(--md-sys-color-surface-container)',
                      color: isActive
                        ? 'var(--md-sys-color-on-primary)'
                        : 'var(--md-sys-color-on-surface)',
                      fontSize: '0.78rem',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 100ms ease',
                    }}
                  >
                    {v.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation Menu Editor (Widget 19) */}
        {widget.type === 'navigation_menu' && (
          <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.55rem' }}>
              <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
                Enlaces del Menu ({((currentProps.items) || []).length})
              </h4>
              <button
                type="button"
                onClick={() => {
                  const newItems = [...(currentProps.items || []), { label: 'NUEVO ENLACE', url: '/' }];
                  handleFieldChange('items', newItems);
                }}
                style={{
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--md-shape-full)',
                  border: 'none',
                  backgroundColor: 'var(--md-sys-color-primary)',
                  color: 'var(--md-sys-color-on-primary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <Plus size={13} />
                <span>Anadir Enlace</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {(currentProps.items || []).map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '0.65rem',
                    borderRadius: 'var(--md-shape-md)',
                    backgroundColor: 'var(--md-sys-color-surface-container)',
                    border: '1px solid var(--md-sys-color-outline-variant)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>
                      Enlace #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (currentProps.items || []).filter((_, i) => i !== idx);
                        handleFieldChange('items', updated);
                      }}
                      title="Eliminar enlace"
                      style={{ background: 'none', border: 'none', color: 'var(--md-sys-color-error)', cursor: 'pointer', padding: 0 }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Texto visible (ej. Inicio, Catalogo)"
                    value={item.label || ''}
                    onChange={(e) => {
                      const updated = [...(currentProps.items || [])];
                      updated[idx] = { ...updated[idx], label: e.target.value };
                      handleFieldChange('items', updated);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.4rem 0.6rem',
                      borderRadius: 'var(--md-shape-sm)',
                      border: '1px solid var(--md-sys-color-outline-variant)',
                      backgroundColor: 'var(--md-sys-color-surface)',
                      color: 'var(--md-sys-color-on-surface)',
                      fontSize: '0.8rem',
                      boxSizing: 'border-box',
                      marginBottom: '0.35rem',
                    }}
                  />

                  <LinkInputWithSuggestions
                    label="Destino (Página o Scroll vertical)"
                    value={item.url || ''}
                    onChange={(nextUrl) => {
                      const updated = [...(currentProps.items || [])];
                      updated[idx] = { ...updated[idx], url: nextUrl };
                      handleFieldChange('items', updated);
                    }}
                  />
                </div>
              ))}
            </div>

            {/* CTA in Nav */}
            <div style={{ marginTop: '0.85rem', padding: '0.65rem', backgroundColor: 'var(--md-sys-color-surface-container)', borderRadius: 'var(--md-shape-md)' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)', marginBottom: '0.35rem' }}>
                Boton Destacado en Menu
              </label>
              <input
                type="text"
                placeholder="Texto del boton"
                value={currentProps.cta_item?.text || ''}
                onChange={(e) => handleNestedFieldChange('cta_item', 'text', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.4rem 0.6rem',
                  borderRadius: 'var(--md-shape-sm)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  color: 'var(--md-sys-color-on-surface)',
                  fontSize: '0.8rem',
                  boxSizing: 'border-box',
                }}
              />
              <LinkInputWithSuggestions
                label="Ruta del boton destacado"
                value={currentProps.cta_item?.link || ''}
                onChange={(nextLink) => handleNestedFieldChange('cta_item', 'link', nextLink)}
              />
            </div>
          </div>
        )}

        {/* Title */}
        {currentProps.title !== undefined && (
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
              Titulo Principal
            </label>
            <input
              type="text"
              value={currentProps.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem',
                borderRadius: 'var(--md-shape-sm)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                backgroundColor: 'var(--md-sys-color-surface)',
                color: 'var(--md-sys-color-on-surface)',
                fontSize: '0.85rem',
                boxSizing: 'border-box',
              }}
            />
          </div>
        )}

        {/* Subtitle */}
        {currentProps.subtitle !== undefined && (
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
              Subtitulo / Descripcion Breve
            </label>
            <textarea
              rows={3}
              value={currentProps.subtitle}
              onChange={(e) => handleFieldChange('subtitle', e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem',
                borderRadius: 'var(--md-shape-sm)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                backgroundColor: 'var(--md-sys-color-surface)',
                color: 'var(--md-sys-color-on-surface)',
                fontSize: '0.85rem',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />
          </div>
        )}

        {/* Body Text */}
        {currentProps.body !== undefined && (
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
              Texto Principal / Contenido
            </label>
            <textarea
              rows={4}
              value={currentProps.body}
              onChange={(e) => handleFieldChange('body', e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem',
                borderRadius: 'var(--md-shape-sm)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                backgroundColor: 'var(--md-sys-color-surface)',
                color: 'var(--md-sys-color-on-surface)',
                fontSize: '0.85rem',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />
          </div>
        )}

        {/* Background / Image URL */}
        {(currentProps.background !== undefined || currentProps.image !== undefined) && (
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
              URL de Imagen / Fondo
            </label>
            <input
              type="text"
              value={currentProps.background || currentProps.image || ''}
              onChange={(e) => {
                if (currentProps.background !== undefined) handleFieldChange('background', e.target.value);
                if (currentProps.image !== undefined) handleFieldChange('image', e.target.value);
              }}
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem',
                borderRadius: 'var(--md-shape-sm)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                backgroundColor: 'var(--md-sys-color-surface)',
                color: 'var(--md-sys-color-on-surface)',
                fontSize: '0.85rem',
                boxSizing: 'border-box',
              }}
            />
          </div>
        )}

        {/* Alignment */}
        {currentProps.alignment !== undefined && (
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
              Alineacion
            </label>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {['left', 'center', 'right'].map((align) => (
                <button
                  key={align}
                  type="button"
                  onClick={() => handleFieldChange('alignment', align)}
                  style={{
                    flex: 1,
                    padding: '0.45rem',
                    borderRadius: 'var(--md-shape-sm)',
                    border: currentProps.alignment === align ? '2px solid var(--md-sys-color-primary)' : '1px solid var(--md-sys-color-outline-variant)',
                    backgroundColor: currentProps.alignment === align ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface)',
                    color: currentProps.alignment === align ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {align}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Primary CTA */}
        {currentProps.cta_primary && (
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--md-sys-color-surface-container)', borderRadius: 'var(--md-shape-md)' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)', marginBottom: '0.4rem' }}>
              Boton Principal (Llamada a la Accion)
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <input
                type="text"
                placeholder="Texto del boton"
                value={currentProps.cta_primary.text || ''}
                onChange={(e) => handleNestedFieldChange('cta_primary', 'text', e.target.value)}
                style={{
                  padding: '0.45rem 0.65rem',
                  borderRadius: 'var(--md-shape-sm)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  color: 'var(--md-sys-color-on-surface)',
                  fontSize: '0.8rem',
                }}
              />
              <LinkInputWithSuggestions
                label="Ruta o destino"
                value={currentProps.cta_primary.link || ''}
                onChange={(nextLink) => handleNestedFieldChange('cta_primary', 'link', nextLink)}
              />
            </div>
          </div>
        )}

        {/* Secondary CTA */}
        {currentProps.cta_secondary && (
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--md-sys-color-surface-container)', borderRadius: 'var(--md-shape-md)' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)', marginBottom: '0.4rem' }}>
              Boton Secundario
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <input
                type="text"
                placeholder="Texto del boton"
                value={currentProps.cta_secondary.text || ''}
                onChange={(e) => handleNestedFieldChange('cta_secondary', 'text', e.target.value)}
                style={{
                  padding: '0.45rem 0.65rem',
                  borderRadius: 'var(--md-shape-sm)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  color: 'var(--md-sys-color-on-surface)',
                  fontSize: '0.8rem',
                }}
              />
              <LinkInputWithSuggestions
                label="Ruta o destino"
                value={currentProps.cta_secondary.link || ''}
                onChange={(nextLink) => handleNestedFieldChange('cta_secondary', 'link', nextLink)}
              />
            </div>
          </div>
        )}

        {/* Generic CTA (Widget 2, Widget 11, etc.) */}
        {currentProps.cta && (
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--md-sys-color-surface-container)', borderRadius: 'var(--md-shape-md)' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)', marginBottom: '0.4rem' }}>
              Boton de Accion
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <input
                type="text"
                placeholder="Texto del boton"
                value={currentProps.cta.text || (typeof currentProps.cta === 'string' ? currentProps.cta : '')}
                onChange={(e) => {
                  if (typeof currentProps.cta === 'object') {
                    handleNestedFieldChange('cta', 'text', e.target.value);
                  } else {
                    handleFieldChange('cta', e.target.value);
                  }
                }}
                style={{
                  padding: '0.45rem 0.65rem',
                  borderRadius: 'var(--md-shape-sm)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  color: 'var(--md-sys-color-on-surface)',
                  fontSize: '0.8rem',
                }}
              />
              {typeof currentProps.cta === 'object' && (
                <LinkInputWithSuggestions
                  label="Ruta o destino"
                  value={currentProps.cta.link || ''}
                  onChange={(nextLink) => handleNestedFieldChange('cta', 'link', nextLink)}
                />
              )}
            </div>
          </div>
        )}

        {/* Cards Editor for Widget 3 */}
        {widget.type === 'cards_grid' && currentProps.cards && (
          <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
                Tarjetas ({currentProps.cards.length})
              </h4>
              <button
                type="button"
                onClick={() => {
                  const newCard = {
                    card_image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
                    card_title: 'NUEVO ITEM',
                    card_description: 'DESCRIPCION: Informacion del elemento.',
                    card_badge: 'NUEVO',
                    card_cta: { text: 'VER DETALLE', link: '/#1' },
                  };
                  handleFieldChange('cards', [...(currentProps.cards || []), newCard]);
                }}
                style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--md-shape-full)',
                  border: 'none',
                  backgroundColor: 'var(--md-sys-color-primary)',
                  color: 'var(--md-sys-color-on-primary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <Plus size={13} />
                <span>Anadir Tarjeta</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {currentProps.cards.map((c, i) => (
                <div
                  key={i}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--md-shape-md)',
                    backgroundColor: 'var(--md-sys-color-surface-container)',
                    border: '1px solid var(--md-sys-color-outline-variant)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>
                      Tarjeta #{i + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (currentProps.cards || []).filter((_, idx) => idx !== i);
                        handleFieldChange('cards', updated);
                      }}
                      title="Eliminar tarjeta"
                      style={{ background: 'none', border: 'none', color: 'var(--md-sys-color-error)', cursor: 'pointer', padding: 0 }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Titulo de tarjeta"
                    value={c.card_title || ''}
                    onChange={(e) => {
                      const updated = [...(currentProps.cards || [])];
                      updated[i] = { ...updated[i], card_title: e.target.value };
                      handleFieldChange('cards', updated);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.4rem 0.6rem',
                      borderRadius: 'var(--md-shape-sm)',
                      border: '1px solid var(--md-sys-color-outline-variant)',
                      backgroundColor: 'var(--md-sys-color-surface)',
                      color: 'var(--md-sys-color-on-surface)',
                      fontSize: '0.8rem',
                      boxSizing: 'border-box',
                      marginBottom: '0.35rem',
                    }}
                  />
                  <textarea
                    rows={2}
                    placeholder="Descripcion breve"
                    value={c.card_description || ''}
                    onChange={(e) => {
                      const updated = [...(currentProps.cards || [])];
                      updated[i] = { ...updated[i], card_description: e.target.value };
                      handleFieldChange('cards', updated);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.4rem 0.6rem',
                      borderRadius: 'var(--md-shape-sm)',
                      border: '1px solid var(--md-sys-color-outline-variant)',
                      backgroundColor: 'var(--md-sys-color-surface)',
                      color: 'var(--md-sys-color-on-surface)',
                      fontSize: '0.78rem',
                      boxSizing: 'border-box',
                      marginBottom: '0.35rem',
                      fontFamily: 'inherit',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.35rem' }}>
                    <input
                      type="text"
                      placeholder="Etiqueta (Badge)"
                      value={c.card_badge || ''}
                      onChange={(e) => {
                        const updated = [...(currentProps.cards || [])];
                        updated[i] = { ...updated[i], card_badge: e.target.value };
                        handleFieldChange('cards', updated);
                      }}
                      style={{
                        flex: 1,
                        padding: '0.35rem 0.5rem',
                        borderRadius: 'var(--md-shape-sm)',
                        border: '1px solid var(--md-sys-color-outline-variant)',
                        backgroundColor: 'var(--md-sys-color-surface)',
                        color: 'var(--md-sys-color-on-surface)',
                        fontSize: '0.75rem',
                      }}
                    />
                    <input
                      type="text"
                      placeholder="URL Imagen"
                      value={c.card_image || ''}
                      onChange={(e) => {
                        const updated = [...(currentProps.cards || [])];
                        updated[i] = { ...updated[i], card_image: e.target.value };
                        handleFieldChange('cards', updated);
                      }}
                      style={{
                        flex: 1,
                        padding: '0.35rem 0.5rem',
                        borderRadius: 'var(--md-shape-sm)',
                        border: '1px solid var(--md-sys-color-outline-variant)',
                        backgroundColor: 'var(--md-sys-color-surface)',
                        color: 'var(--md-sys-color-on-surface)',
                        fontSize: '0.75rem',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <input
                      type="text"
                      placeholder="Texto boton (ej. Ver Detalle)"
                      value={c.card_cta?.text || ''}
                      onChange={(e) => {
                        const updated = [...(currentProps.cards || [])];
                        updated[i] = {
                          ...updated[i],
                          card_cta: { ...updated[i].card_cta, text: e.target.value },
                        };
                        handleFieldChange('cards', updated);
                      }}
                      style={{
                        flex: 1,
                        padding: '0.35rem 0.5rem',
                        borderRadius: 'var(--md-shape-sm)',
                        border: '1px solid var(--md-sys-color-outline-variant)',
                        backgroundColor: 'var(--md-sys-color-surface)',
                        color: 'var(--md-sys-color-on-surface)',
                        fontSize: '0.75rem',
                      }}
                    />
                  </div>
                  <LinkInputWithSuggestions
                    label="Destino del boton de tarjeta"
                    value={c.card_cta?.link || ''}
                    onChange={(nextLink) => {
                      const updated = [...(currentProps.cards || [])];
                      updated[i] = {
                        ...updated[i],
                        card_cta: { ...updated[i].card_cta, link: nextLink },
                      };
                      handleFieldChange('cards', updated);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Price & Currency */}
        {currentProps.price !== undefined && (
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
              Precio Visible
            </label>
            <input
              type="text"
              value={currentProps.price}
              onChange={(e) => handleFieldChange('price', e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem',
                borderRadius: 'var(--md-shape-sm)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                backgroundColor: 'var(--md-sys-color-surface)',
                color: 'var(--md-sys-color-on-surface)',
                fontSize: '0.85rem',
                boxSizing: 'border-box',
              }}
            />
          </div>
        )}

        {/* Stock status */}
        {currentProps.stock_status !== undefined && (
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
              Estado de Inventario (Stock)
            </label>
            <input
              type="text"
              value={currentProps.stock_status}
              onChange={(e) => handleFieldChange('stock_status', e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem',
                borderRadius: 'var(--md-shape-sm)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                backgroundColor: 'var(--md-sys-color-surface)',
                color: 'var(--md-sys-color-on-surface)',
                fontSize: '0.85rem',
                boxSizing: 'border-box',
              }}
            />
          </div>
        )}

        {/* Badge */}
        {currentProps.badge !== undefined && (
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
              Etiqueta / Badge
            </label>
            <input
              type="text"
              value={currentProps.badge}
              onChange={(e) => handleFieldChange('badge', e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem',
                borderRadius: 'var(--md-shape-sm)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                backgroundColor: 'var(--md-sys-color-surface)',
                color: 'var(--md-sys-color-on-surface)',
                fontSize: '0.85rem',
                boxSizing: 'border-box',
              }}
            />
          </div>
        )}

        {/* Button Label (Widget 11, etc.) */}
        {currentProps.label !== undefined && (
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
              Texto del Boton
            </label>
            <input
              type="text"
              value={currentProps.label}
              onChange={(e) => handleFieldChange('label', e.target.value)}
              style={{
                width: '100%',
                padding: '0.55rem 0.75rem',
                borderRadius: 'var(--md-shape-sm)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                backgroundColor: 'var(--md-sys-color-surface)',
                color: 'var(--md-sys-color-on-surface)',
                fontSize: '0.85rem',
                boxSizing: 'border-box',
              }}
            />
            {currentProps.link !== undefined && (
              <LinkInputWithSuggestions
                label="Destino del boton"
                value={currentProps.link}
                onChange={(nextLink) => handleFieldChange('link', nextLink)}
              />
            )}
          </div>
        )}

        {/* Floating WhatsApp Contact (Widget 21) */}
        {widget.type === 'floating_contact' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
                Numero de WhatsApp o Enlace
              </label>
              <input
                type="text"
                value={currentProps.number_or_link || ''}
                onChange={(e) => handleFieldChange('number_or_link', e.target.value)}
                placeholder="+56912345678"
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--md-shape-sm)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  color: 'var(--md-sys-color-on-surface)',
                  fontSize: '0.85rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
                Mensaje Predeterminado
              </label>
              <textarea
                rows={2}
                value={currentProps.message_template || ''}
                onChange={(e) => handleFieldChange('message_template', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--md-shape-sm)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  color: 'var(--md-sys-color-on-surface)',
                  fontSize: '0.85rem',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
              />
            </div>
          </div>
        )}

        {/* Plans Editor for Widget 13 */}
        {widget.type === 'membership_plans' && currentProps.plan_cards && (
          <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
                Planes ({currentProps.plan_cards.length})
              </h4>
              <button
                type="button"
                onClick={() => {
                  const newPlan = {
                    plan_name: 'NUEVO PLAN',
                    plan_price: '$14.990 / mes',
                    plan_features: ['ITEM 1: Beneficio principal', 'ITEM 2: Atencion preferencial'],
                    plan_cta: 'ELEGIR PLAN',
                  };
                  handleFieldChange('plan_cards', [...(currentProps.plan_cards || []), newPlan]);
                }}
                style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--md-shape-full)',
                  border: 'none',
                  backgroundColor: 'var(--md-sys-color-primary)',
                  color: 'var(--md-sys-color-on-primary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <Plus size={13} />
                <span>Anadir Plan</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {currentProps.plan_cards.map((p, i) => (
                <div
                  key={i}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--md-shape-md)',
                    backgroundColor: 'var(--md-sys-color-surface-container)',
                    border: '1px solid var(--md-sys-color-outline-variant)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>
                      Plan #{i + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (currentProps.plan_cards || []).filter((_, idx) => idx !== i);
                        handleFieldChange('plan_cards', updated);
                      }}
                      title="Eliminar plan"
                      style={{ background: 'none', border: 'none', color: 'var(--md-sys-color-error)', cursor: 'pointer', padding: 0 }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Nombre del Plan"
                    value={p.plan_name || ''}
                    onChange={(e) => {
                      const updated = [...(currentProps.plan_cards || [])];
                      updated[i] = { ...updated[i], plan_name: e.target.value };
                      handleFieldChange('plan_cards', updated);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.4rem 0.6rem',
                      borderRadius: 'var(--md-shape-sm)',
                      border: '1px solid var(--md-sys-color-outline-variant)',
                      backgroundColor: 'var(--md-sys-color-surface)',
                      color: 'var(--md-sys-color-on-surface)',
                      fontSize: '0.8rem',
                      boxSizing: 'border-box',
                      marginBottom: '0.35rem',
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Precio (ej. $19.990 / mes)"
                    value={p.plan_price || ''}
                    onChange={(e) => {
                      const updated = [...(currentProps.plan_cards || [])];
                      updated[i] = { ...updated[i], plan_price: e.target.value };
                      handleFieldChange('plan_cards', updated);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.4rem 0.6rem',
                      borderRadius: 'var(--md-shape-sm)',
                      border: '1px solid var(--md-sys-color-outline-variant)',
                      backgroundColor: 'var(--md-sys-color-surface)',
                      color: 'var(--md-sys-color-on-surface)',
                      fontSize: '0.8rem',
                      boxSizing: 'border-box',
                      marginBottom: '0.35rem',
                    }}
                  />
                  <textarea
                    rows={3}
                    placeholder="Beneficios (uno por linea)"
                    value={(p.plan_features || []).join('\n')}
                    onChange={(e) => {
                      const updated = [...(currentProps.plan_cards || [])];
                      updated[i] = { ...updated[i], plan_features: e.target.value.split('\n') };
                      handleFieldChange('plan_cards', updated);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.4rem 0.6rem',
                      borderRadius: 'var(--md-shape-sm)',
                      border: '1px solid var(--md-sys-color-outline-variant)',
                      backgroundColor: 'var(--md-sys-color-surface)',
                      color: 'var(--md-sys-color-on-surface)',
                      fontSize: '0.78rem',
                      boxSizing: 'border-box',
                      marginBottom: '0.35rem',
                      fontFamily: 'inherit',
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Texto boton (ej. Suscribirme)"
                    value={p.plan_cta || ''}
                    onChange={(e) => {
                      const updated = [...(currentProps.plan_cards || [])];
                      updated[i] = { ...updated[i], plan_cta: e.target.value };
                      handleFieldChange('plan_cards', updated);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.35rem 0.5rem',
                      borderRadius: 'var(--md-shape-sm)',
                      border: '1px solid var(--md-sys-color-outline-variant)',
                      backgroundColor: 'var(--md-sys-color-surface)',
                      color: 'var(--md-sys-color-on-surface)',
                      fontSize: '0.75rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Editor for Widget 18 */}
        {widget.type === 'faq_accordion' && currentProps.items && (
          <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
                Preguntas Frecuentes ({currentProps.items.length})
              </h4>
              <button
                type="button"
                onClick={() => {
                  const newFaq = {
                    question: 'PREGUNTA: Consulta habitual de tus compradores',
                    answer: 'RESPUESTA: Explicacion clara sobre tiempos, garantias o soporte.',
                  };
                  handleFieldChange('items', [...(currentProps.items || []), newFaq]);
                }}
                style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--md-shape-full)',
                  border: 'none',
                  backgroundColor: 'var(--md-sys-color-primary)',
                  color: 'var(--md-sys-color-on-primary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <Plus size={13} />
                <span>Anadir Pregunta</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {currentProps.items.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--md-shape-md)',
                    backgroundColor: 'var(--md-sys-color-surface-container)',
                    border: '1px solid var(--md-sys-color-outline-variant)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>
                      Pregunta #{i + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (currentProps.items || []).filter((_, idx) => idx !== i);
                        handleFieldChange('items', updated);
                      }}
                      title="Eliminar pregunta"
                      style={{ background: 'none', border: 'none', color: 'var(--md-sys-color-error)', cursor: 'pointer', padding: 0 }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Pregunta"
                    value={faq.question || ''}
                    onChange={(e) => {
                      const updated = [...(currentProps.items || [])];
                      updated[i] = { ...updated[i], question: e.target.value };
                      handleFieldChange('items', updated);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.4rem 0.6rem',
                      borderRadius: 'var(--md-shape-sm)',
                      border: '1px solid var(--md-sys-color-outline-variant)',
                      backgroundColor: 'var(--md-sys-color-surface)',
                      color: 'var(--md-sys-color-on-surface)',
                      fontSize: '0.8rem',
                      boxSizing: 'border-box',
                      marginBottom: '0.35rem',
                    }}
                  />
                  <textarea
                    rows={2}
                    placeholder="Respuesta"
                    value={faq.answer || ''}
                    onChange={(e) => {
                      const updated = [...(currentProps.items || [])];
                      updated[i] = { ...updated[i], answer: e.target.value };
                      handleFieldChange('items', updated);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.4rem 0.6rem',
                      borderRadius: 'var(--md-shape-sm)',
                      border: '1px solid var(--md-sys-color-outline-variant)',
                      backgroundColor: 'var(--md-sys-color-surface)',
                      color: 'var(--md-sys-color-on-surface)',
                      fontSize: '0.78rem',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Links Editor (Widget 22) */}
        {widget.type === 'social_links' && (
          <SocialLinksInspector
            currentProps={currentProps}
            onFieldChange={handleFieldChange}
            onNestedFieldChange={handleNestedFieldChange}
          />
        )}

        {/* Video Player Inspector (Widget 17) */}
        {widget.type === 'video_gallery' && (
          <VideoPlayerInspector
            currentProps={currentProps}
            onFieldChange={handleFieldChange}
          />
        )}

        {/* Blog / Content Grid Inspector (Widget 16) */}
        {widget.type === 'blog_grid' && (
          <BlogGridInspector
            currentProps={currentProps}
            onFieldChange={handleFieldChange}
            LinkInput={LinkInputWithSuggestions}
          />
        )}

        {/* Catalog Filters Inspector (Widget 4) */}
        {widget.type === 'catalog_filters' && (
          <CatalogFiltersInspector
            currentProps={currentProps}
            onFieldChange={handleFieldChange}
          />
        )}

        {/* Product Detail Inspector (Widget 6) */}
        {widget.type === 'product_detail' && (
          <ProductDetailInspector
            currentProps={currentProps}
            onFieldChange={handleFieldChange}
          />
        )}

        {/* Checkout Flow and Coupons (Widgets 8 and 10) */}
        {(widget.type === 'checkout_flow' || widget.type === 'coupon_field') && (
          <CheckoutAndShippingInspector
            widgetType={widget.type}
            currentProps={currentProps}
            onFieldChange={handleFieldChange}
          />
        )}

        {/* Generic Form Inspector (Widget 12) */}
        {widget.type === 'generic_form' && (
          <GenericFormInspector
            currentProps={currentProps}
            onFieldChange={handleFieldChange}
          />
        )}

        {/* Subscription Configurator and Customer Portal (Widgets 14 and 15) */}
        {(widget.type === 'subscription_configurator' || widget.type === 'customer_portal') && (
          <SubscriptionAndPortalInspector
            widgetType={widget.type}
            currentProps={currentProps}
            onFieldChange={handleFieldChange}
          />
        )}

        {/* Structural Widgets: Breadcrumbs, Footer, Toast, Container Layout (Widgets 20, 23, 24, 25) */}
        {(widget.type === 'breadcrumbs' ||
          widget.type === 'footer_block' ||
          widget.type === 'toast_notification' ||
          widget.type === 'container_layout') && (
          <StructureInspector
            widgetType={widget.type}
            currentProps={currentProps}
            onFieldChange={handleFieldChange}
          />
        )}
      </div>
    </aside>
  );
}

export default WidgetPropertyInspector;
