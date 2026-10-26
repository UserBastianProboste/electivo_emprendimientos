/*
 * Module: StructureNavWidgets
 * Description: Renders navigation, breadcrumbs, footer, toast, and container layout widgets (Widgets 19, 20, 23, 24, 25)
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of structure and navigation widgets.
 * - 2026-10-26 [v1.3.0]: Added mobile responsive menu wrapping, variant handling (minimal/compact), and onNavigate click handlers.
 */

import React, { useState } from 'react';
import { Compass, ChevronRight, Check, X, Menu, ExternalLink } from 'lucide-react';

export function NavMenuWidget({ props = {}, onNavigate = () => {}, deviceViewport = 'desktop' }) {
  const {
    variant = 'standard',
    items = [
      { label: 'Inicio', url: '/' },
      { label: 'Catalogo', url: '/#2' },
      { label: 'Nosotros', url: '/#1' },
    ],
    cta_item = { text: 'Mi Cuenta', link: '/portal' },
  } = props;

  const isMobile = deviceViewport === 'mobile';
  const isMinimal = variant === 'minimal';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '0.75rem 1rem' : '0.75rem 1.5rem',
        backgroundColor: isMinimal ? 'transparent' : 'var(--md-sys-color-surface-container-low)',
        border: isMinimal ? 'none' : '1px solid var(--md-sys-color-outline-variant)',
        borderRadius: 'var(--md-shape-lg)',
        boxShadow: isMinimal ? 'none' : 'var(--md-elevation-1)',
        gap: '0.75rem',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'all 120ms ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          onClick={() => onNavigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
        >
          <Compass size={20} color="var(--md-sys-color-primary)" />
          <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--md-sys-color-on-surface)' }}>
            Tienda & Diseno
          </span>
        </div>

        {isMobile && (
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--md-sys-color-on-surface)',
              cursor: 'pointer',
              padding: '0.25rem',
            }}
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      <div
        style={{
          display: isMobile ? (mobileMenuOpen ? 'flex' : 'none') : 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          gap: isMobile ? '0.5rem' : '1rem',
          flexWrap: 'wrap',
        }}
      >
        {items.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onNavigate(item.url)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--md-sys-color-on-surface-variant)',
              cursor: 'pointer',
              padding: isMobile ? '0.4rem 0' : '0.2rem 0.4rem',
              textAlign: isMobile ? 'left' : 'center',
              borderRadius: 'var(--md-shape-sm)',
              transition: 'color 100ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--md-sys-color-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--md-sys-color-on-surface-variant)')}
          >
            {item.label}
          </button>
        ))}

        {cta_item && cta_item.text && (
          <button
            type="button"
            onClick={() => onNavigate(cta_item.link)}
            style={{
              padding: '0.4rem 0.9rem',
              backgroundColor: 'var(--md-sys-color-primary)',
              color: 'var(--md-sys-color-on-primary)',
              borderRadius: 'var(--md-shape-full)',
              fontSize: '0.8rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 100ms ease',
            }}
          >
            {cta_item.text}
          </button>
        )}
      </div>
    </nav>
  );
}

export function BreadcrumbsWidget({ props = {}, onNavigate = () => {} }) {
  const {
    variant = 'standard',
    separator = '/',
    trail = ['Inicio', 'Catalogo General', 'Coleccion Actual'],
  } = props;

  const isArrows = variant === 'arrows';
  const displaySep = isArrows ? '>' : separator;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.4rem 0', fontSize: '0.8rem', flexWrap: 'wrap' }}>
      {trail.map((crumb, idx) => {
        const isLast = idx === trail.length - 1;
        return (
          <React.Fragment key={idx}>
            <span
              onClick={() => {
                if (!isLast) onNavigate(idx === 0 ? '/' : '/#1');
              }}
              style={{
                color: isLast ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface-variant)',
                fontWeight: isLast ? 700 : 500,
                cursor: isLast ? 'default' : 'pointer',
                transition: 'color 100ms ease',
              }}
            >
              {crumb}
            </span>
            {!isLast && <span style={{ color: 'var(--md-sys-color-outline-variant)' }}>{displaySep}</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export function FooterWidget({ props = {}, onNavigate = () => {}, deviceViewport = 'desktop' }) {
  const {
    variant = 'standard',
    text = 'DESCRIPCION: Resumen institucional del emprendimiento y compromiso con el comercio etico.',
    link_groups = [
      { title: 'EXPLORAR', links: ['Colecciones', 'Novedades', 'Categorias', 'Planes'] },
      { title: 'SOPORTE', links: ['Preguntas Frecuentes', 'Politica de Envios', 'Garantias', 'Contacto'] },
    ],
    copyright = '2026 TIENDA ONLINE. Todos los derechos reservados.',
  } = props;

  const isMobile = deviceViewport === 'mobile';
  const isCompact = variant === 'compact';

  return (
    <footer
      style={{
        backgroundColor: 'var(--md-sys-color-surface-container-lowest)',
        borderTop: '1px solid var(--md-sys-color-outline-variant)',
        borderRadius: 'var(--md-shape-lg)',
        padding: isMobile ? '1.5rem 1rem' : '2.5rem 1.5rem 1.5rem 1.5rem',
        marginTop: '2rem',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {!isCompact && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.75rem',
            marginBottom: '1.75rem',
          }}
        >
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)', marginBottom: '0.5rem' }}>
              Tienda & Diseno
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.6 }}>
              {text}
            </p>
          </div>

          {link_groups.map((grp, i) => (
            <div key={i}>
              <h5 style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                {grp.title}
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {grp.links.map((lnk, lIdx) => (
                  <li key={lIdx}>
                    <button
                      type="button"
                      onClick={() => onNavigate('/#1')}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '0.825rem',
                        color: 'var(--md-sys-color-on-surface-variant)',
                        cursor: 'pointer',
                        padding: 0,
                        textAlign: 'left',
                      }}
                    >
                      {lnk}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          borderTop: isCompact ? 'none' : '1px solid var(--md-sys-color-outline-variant)',
          paddingTop: isCompact ? '0' : '1rem',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'var(--md-sys-color-on-surface-variant)',
        }}
      >
        {copyright}
      </div>
    </footer>
  );
}

export function ToastNotificationWidget({ props = {} }) {
  const {
    variant = 'standard',
    message = 'MENSAJE: Accion completada correctamente.',
    action = { enabled: true, text: 'VER ACCION' },
    dismissible = true,
  } = props;

  const isAccent = variant === 'accent';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1.25rem',
        backgroundColor: isAccent ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-inverse-surface)',
        color: isAccent ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-inverse-on-surface)',
        borderRadius: 'var(--md-shape-md)',
        boxShadow: 'var(--md-elevation-3)',
        fontSize: '0.85rem',
        maxWidth: 'calc(100vw - 48px)',
      }}
    >
      <Check size={16} color={isAccent ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-inverse-primary)'} />
      <span>{message}</span>
      {action && action.enabled && (
        <button
          type="button"
          style={{
            background: 'none',
            border: 'none',
            color: isAccent ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-inverse-primary)',
            fontWeight: 700,
            cursor: 'pointer',
            padding: 0,
            fontSize: '0.8rem',
            marginLeft: '0.5rem',
          }}
        >
          {action.text}
        </button>
      )}
      {dismissible && <X size={14} style={{ cursor: 'pointer', opacity: 0.7 }} />}
    </div>
  );
}

export function ContainerLayoutWidget({ props = {}, children, deviceViewport = 'desktop' }) {
  const {
    variant = 'standard',
    layout = '2_col',
    gap = '20px',
    padding = '24px',
    border_radius = '16px',
    title = 'TITULO: CONTENEDOR AGRUPADOR DE CONTENIDO',
  } = props;

  const isMobile = deviceViewport === 'mobile';
  const effectiveLayout = isMobile ? '1_col' : layout;

  const colStyle = effectiveLayout === '1_col'
    ? '1fr'
    : effectiveLayout === '2_col'
    ? '1fr 1fr'
    : 'repeat(auto-fit, minmax(240px, 1fr))';

  return (
    <div
      style={{
        padding: isMobile ? '1rem' : padding,
        borderRadius: border_radius,
        border: '1px dashed var(--md-sys-color-outline)',
        backgroundColor: 'var(--md-sys-color-surface-container-low)',
        margin: '1rem 0',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--md-sys-color-primary)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        {title} ({effectiveLayout})
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: colStyle, gap: isMobile ? '16px' : gap }}>
        {children || (
          <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.85rem' }}>
            Espacio contenedor responsivo: aloja tarjetas y bloques secundarios.
          </div>
        )}
      </div>
    </div>
  );
}
