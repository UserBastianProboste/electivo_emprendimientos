/*
 * Module: LandingPage
 * Description: Welcome landing view connected to store configuration and call-to-action (RF-01.1)
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of configurable Landing Page.
 */

import React from 'react';
import { useStoreConfig } from '../context/StoreConfigContext';
import { UniversityLogo } from '../components/common/UniversityLogo';
import { ArrowRight, ShoppingBag, ShieldCheck, Sparkles, Layers, RefreshCw } from 'lucide-react';

export function LandingPage({ onNavigate }) {
  const { config, loading } = useStoreConfig();

  const categories = [
    { name: 'Vestuario', desc: 'Prendas con materiales nobles y tintes naturales.', icon: '👕', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80' },
    { name: 'Tecnología', desc: 'Dispositivos solares y gadgets sustentables.', icon: '⚡', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80' },
    { name: 'Gourmet', desc: 'Mieles nativas, cafés de origen y alimentos vivos.', icon: '🍯', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80' },
    { name: 'Artesanía', desc: 'Piezas únicas en gres, terracota y lanas del sur.', icon: '🏺', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="landing-page animate-fade-in">
      {/* Hero Section (RF-01.1) */}
      <section
        style={{
          position: 'relative',
          padding: '5rem 0 4rem 0',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '860px' }}>
          {/* Institutional Badge in Hero (RN-01) */}
          <div style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
            <UniversityLogo size="small" />
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: 'var(--text-main)',
              marginBottom: '1.5rem',
            }}
          >
            {config.hero_title || 'Impulsa tu Negocio Local con Nuestra Vitrina Digital'}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
            }}
          >
            {config.hero_subtitle || 'Descubre productos artesanales, sostenibles y de alta calidad elaborados por emprendedores de nuestra comunidad.'}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Primary CTA (RF-01.1) */}
            <button
              onClick={() => onNavigate('/catalogo')}
              style={{
                padding: '0.85rem 2rem',
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: 'var(--shadow-md)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
            >
              <ShoppingBag size={18} />
              <span>{config.hero_cta_text || 'Explorar Catálogo'}</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => onNavigate('/admin/personalizacion')}
              style={{
                padding: '0.85rem 1.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-border)';
                e.currentTarget.style.backgroundColor = 'var(--primary-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              Personalizar Tienda (Admin)
            </button>
          </div>
        </div>
      </section>

      {/* Featured Pillars */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--primary-light)',
                  border: '1px solid var(--primary-border)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Sello Institucional Universitario
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Garantía inamovible de autoría e impacto comunitario auditado académicamente bajo la regla RN-01.
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--primary-light)',
                  border: '1px solid var(--primary-border)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Layers size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Catálogo Flexible en MongoDB
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Esquema polimórfico adaptativo: cada rubro exhibe sus atributos propios (talla, voltaje, origen o técnica).
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--primary-light)',
                  border: '1px solid var(--primary-border)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Sparkles size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                Personalización en Tiempo Real
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                4 plantillas de colores, favicon dinámico, logotipos y disposición en cuadrícula o lista (RF-01.2, RF-01.4).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section style={{ padding: '1rem 0 3rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--primary)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                Rubros Comunitarios
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                Explora por Categoría
              </h2>
            </div>

            <button
              onClick={() => onNavigate('/catalogo')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontSize: '0.875rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                cursor: 'pointer',
              }}
            >
              <span>Ver todo el catálogo</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {categories.map((cat) => (
              <div
                key={cat.name}
                onClick={() => onNavigate(`/catalogo?category=${encodeURIComponent(cat.name)}`)}
                style={{
                  position: 'relative',
                  height: '240px',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid var(--border-color)',
                  transition: 'transform var(--transition-fast), border-color var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--primary-border)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.55)',
                    transition: 'transform 300ms ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    background: 'linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.85) 100%)',
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{cat.icon}</div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>{cat.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#d1d5db', marginTop: '0.25rem' }}>{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
