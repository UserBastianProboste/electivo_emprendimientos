/*
 * Module: Footer
 * Description: Global application footer enforcing RN-01 institutional branding and security notices
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of Footer component.
 */

import React from 'react';
import { useStoreConfig } from '../../context/StoreConfigContext';
import { UniversityLogo } from '../common/UniversityLogo';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export function Footer({ onNavigate }) {
  const { config } = useStoreConfig();

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-color)',
        marginTop: 'auto',
        paddingTop: '3rem',
        paddingBottom: '2.5rem',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Institutional Anchor Column (RN-01) */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <UniversityLogo size="medium" />
            </div>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                maxWidth: '380px',
              }}
            >
              Iniciativa de fomento al comercio local y comunitario sustentada sobre infraestructura tecnológica de alta disponibilidad y arquitectura hexagonal.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--primary)',
                marginTop: '0.75rem',
                padding: '0.2rem 0.5rem',
                backgroundColor: 'var(--primary-light)',
                borderRadius: '4px',
                border: '1px solid var(--primary-border)',
              }}
            >
              <ShieldCheck size={14} />
              <span>RN-01: Certificación Institucional Permanente</span>
            </div>
          </div>

          {/* Business & Navigation */}
          <div>
            <h4
              style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {config.store_name}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
                >
                  Página de Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/catalogo')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
                >
                  Catálogo de Productos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/admin/personalizacion')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
                >
                  Panel de Personalización (Backoffice)
                </button>
              </li>
            </ul>
          </div>

          {/* Technical Architecture & Security (RNF-02, RNF-03) */}
          <div>
            <h4
              style={{
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Garantía Técnica (ERS v5.2)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-subtle)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <Lock size={14} color="var(--primary)" />
                <span>RNF-03: Argon2 Hashing & HTTPS Ready</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-subtle)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
                <span>RNF-02: DB Híbrida (PostgreSQL + MongoDB)</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-subtle)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                <span>Arquitectura Hexagonal Estricta</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.75rem',
            color: 'var(--text-subtle)',
          }}
        >
          <div>
            © {new Date().getFullYear()} {config.store_name}. Plataforma E-commerce Marca Blanca.
          </div>
          <div style={{ fontFamily: 'var(--font-mono)' }}>
            Sprint 1 (Arquitectura Base, DB Híbrida y Catálogo Flexible) - ERS v5.2
          </div>
        </div>
      </div>
    </footer>
  );
}
