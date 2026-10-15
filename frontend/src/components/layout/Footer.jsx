/*
 * Module: Footer
 * Description: Clean, elegant footer with subtle RN-01 institutional accreditation for Universidad Autonoma de Chile
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of Footer component.
 * - 2026-10-15 [v0.2.0]: Streamlined to elegant typography and discreet A+S institutional accreditation note.
 */

import React from 'react';
import { useStoreConfig } from '../../context/StoreConfigContext';
import { UniversityLogo } from '../common/UniversityLogo';

export function Footer({ onNavigate }) {
  const { config } = useStoreConfig();

  return (
    <footer
      style={{
        backgroundColor: 'var(--md-sys-color-surface-container-low)',
        borderTop: '1px solid var(--md-sys-color-outline-variant)',
        marginTop: 'auto',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        transition: 'background-color var(--md-transition), border-color var(--md-transition)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid var(--md-sys-color-outline-variant)',
          }}
        >
          {/* Store Brand */}
          <div>
            <div
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--md-sys-color-on-surface)',
                letterSpacing: '-0.02em',
                marginBottom: '0.25rem',
              }}
            >
              {config.store_name}
            </div>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--md-sys-color-on-surface-variant)',
                maxWidth: '420px',
                lineHeight: 1.5,
              }}
            >
              Plataforma de comercio electrónico configurable y autogestionada para marcas y creadores locales.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('/')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--md-sys-color-on-surface-variant)',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'color var(--md-transition)',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--md-sys-color-primary)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--md-sys-color-on-surface-variant)')}
            >
              Inicio
            </button>
            <button
              onClick={() => onNavigate('/catalogo')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--md-sys-color-on-surface-variant)',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'color var(--md-transition)',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--md-sys-color-primary)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--md-sys-color-on-surface-variant)')}
            >
              Catálogo
            </button>
            <button
              onClick={() => onNavigate('/admin/personalizacion')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--md-sys-color-on-surface-variant)',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'color var(--md-transition)',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--md-sys-color-primary)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--md-sys-color-on-surface-variant)')}
            >
              Personalización
            </button>
          </nav>
        </div>

        {/* Bottom Bar: Copyright & Subtle Academic Accreditation (RN-01) */}
        <div
          style={{
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              fontSize: '0.8rem',
              color: 'var(--md-sys-color-outline)',
            }}
          >
            © {new Date().getFullYear()} {config.store_name}. Todos los derechos reservados.
          </div>

          {/* Discreet, elegant institutional footer mention as requested */}
          <UniversityLogo />
        </div>
      </div>
    </footer>
  );
}
