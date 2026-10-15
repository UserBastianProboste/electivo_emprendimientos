/*
 * Module: LandingPage
 * Description: Sophisticated, neutral e-commerce landing page adhering to Google Material 3 aesthetics (RF-01.1)
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of configurable Landing Page.
 * - 2026-10-15 [v0.2.0]: Redesigned with neutral luxury aesthetics, M3 tokens, and elevated typography.
 */

import React from 'react';
import { useStoreConfig } from '../context/StoreConfigContext';
import { ArrowRight, ShoppingBag, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export function LandingPage({ onNavigate }) {
  const { config } = useStoreConfig();

  const curatedCategories = [
    {
      name: 'Vestuario & Textiles',
      desc: 'Materiales nobles y confección de autor.',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80',
    },
    {
      name: 'Tecnología & Energía',
      desc: 'Dispositivos inteligentes y diseño funcional.',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80',
    },
    {
      name: 'Gourmet & Origen',
      desc: 'Ingredientes seleccionados y procesos tradicionales.',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=700&q=80',
    },
    {
      name: 'Artesanía & Cerámica',
      desc: 'Piezas exclusivas modeladas en gres y arcilla.',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80',
    },
  ];

  return (
    <div className="landing-page animate-fade-in">
      {/* Hero Section (RF-01.1) */}
      <section
        style={{
          position: 'relative',
          padding: '6rem 0 5rem 0',
          backgroundColor: 'var(--md-sys-color-surface-container-lowest)',
          borderBottom: '1px solid var(--md-sys-color-outline-variant)',
          transition: 'background-color var(--md-transition)',
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--md-shape-full)',
              backgroundColor: 'var(--md-sys-color-surface-container)',
              color: 'var(--md-sys-color-primary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '1.75rem',
            }}
          >
            <Compass size={14} />
            <span>Colección Seleccionada</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: 'var(--md-sys-color-on-surface)',
              marginBottom: '1.5rem',
            }}
          >
            {config.hero_title || 'Diseño, Calidad y Autenticidad en Cada Detalle'}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--md-sys-color-on-surface-variant)',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              fontWeight: 400,
            }}
          >
            {config.hero_subtitle || 'Descubre una cuidada selección de productos creados con dedicación, sostenibilidad y excelencia.'}
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
                padding: '0.85rem 2.2rem',
                backgroundColor: 'var(--md-sys-color-primary)',
                color: 'var(--md-sys-color-on-primary)',
                border: 'none',
                borderRadius: 'var(--md-shape-full)',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: 'var(--md-elevation-1)',
                transition: 'transform var(--md-transition), box-shadow var(--md-transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = 'var(--md-elevation-2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--md-elevation-1)';
              }}
            >
              <ShoppingBag size={17} />
              <span>{config.hero_cta_text || 'Explorar Catálogo'}</span>
              <ArrowRight size={17} />
            </button>

            <button
              onClick={() => onNavigate('/admin/personalizacion')}
              style={{
                padding: '0.85rem 1.75rem',
                backgroundColor: 'var(--md-sys-color-surface-container)',
                color: 'var(--md-sys-color-on-surface)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                borderRadius: 'var(--md-shape-full)',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all var(--md-transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--md-sys-color-outline)';
                e.currentTarget.style.backgroundColor = 'var(--md-sys-color-surface-container-high)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--md-sys-color-outline-variant)';
                e.currentTarget.style.backgroundColor = 'var(--md-sys-color-surface-container)';
              }}
            >
              Personalizar Tienda
            </button>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.75rem',
            }}
          >
            <div
              style={{
                backgroundColor: 'var(--md-sys-color-surface-container-low)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                borderRadius: 'var(--md-shape-lg)',
                padding: '2rem',
                boxShadow: 'var(--md-elevation-1)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--md-shape-sm)',
                  backgroundColor: 'var(--md-sys-color-primary-container)',
                  color: 'var(--md-sys-color-on-primary-container)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Sparkles size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--md-sys-color-on-surface)' }}>
                Catálogo Flexible y Adaptativo
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.6 }}>
                Persistencia documental en MongoDB que permite atributos técnicos y especificaciones exactas para cada rubro comercial.
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--md-sys-color-surface-container-low)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                borderRadius: 'var(--md-shape-lg)',
                padding: '2rem',
                boxShadow: 'var(--md-elevation-1)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--md-shape-sm)',
                  backgroundColor: 'var(--md-sys-color-primary-container)',
                  color: 'var(--md-sys-color-on-primary-container)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Compass size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--md-sys-color-on-surface)' }}>
                Diseño Material 3 Personalizable
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.6 }}>
                Paletas cromáticas M3 de alto contraste, modos claro y oscuro, y disposición de catálogo en cuadrícula o lista.
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--md-sys-color-surface-container-low)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                borderRadius: 'var(--md-shape-lg)',
                padding: '2rem',
                boxShadow: 'var(--md-elevation-1)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--md-shape-sm)',
                  backgroundColor: 'var(--md-sys-color-primary-container)',
                  color: 'var(--md-sys-color-on-primary-container)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <ShieldCheck size={20} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--md-sys-color-on-surface)' }}>
                Arquitectura Hexagonal & Seguridad
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.6 }}>
                Núcleo transaccional en PostgreSQL con hashing Argon2, desacoplado y preparado para escalar con pasarelas de pago y logística.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Categories */}
      <section style={{ padding: '0 0 5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--md-sys-color-primary)',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                }}
              >
                Categorías Destacadas
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)', marginTop: '0.25rem' }}>
                Explorar el Catálogo
              </h2>
            </div>

            <button
              onClick={() => onNavigate('/catalogo')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--md-sys-color-primary)',
                fontSize: '0.875rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                cursor: 'pointer',
              }}
            >
              <span>Ver todos</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {curatedCategories.map((cat) => (
              <div
                key={cat.name}
                onClick={() => onNavigate('/catalogo')}
                style={{
                  position: 'relative',
                  height: '260px',
                  borderRadius: 'var(--md-shape-lg)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  boxShadow: 'var(--md-elevation-1)',
                  transition: 'transform var(--md-transition), box-shadow var(--md-transition)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = 'var(--md-elevation-2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--md-elevation-1)';
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  loading="lazy"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.78) 100%)',
                    color: '#ffffff',
                  }}
                >
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>{cat.name}</h3>
                  <p style={{ fontSize: '0.825rem', color: '#e0e2ec', marginTop: '0.25rem' }}>{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
