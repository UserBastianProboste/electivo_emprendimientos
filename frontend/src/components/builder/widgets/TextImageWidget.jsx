/*
 * Module: TextImageWidget
 * Description: Renders Text + Image section widget (Widget 2) with position controls, rich body, and CTA button
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of Text + Image widget.
 * - 2026-10-26 [v1.3.0]: Added variant handling (card, split, standard), mobile column stacking, and onNavigate support.
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';

export function TextImageWidget({ props = {}, onNavigate = () => {}, deviceViewport = 'desktop' }) {
  const {
    variant = 'standard',
    image = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    image_position = 'left',
    title = 'TITULO: NUESTRA HISTORIA Y ORIGEN',
    body = 'DESCRIPCION: Presenta los valores de tu emprendimiento, los insumos locales y el proceso artesanal que hace unicos a tus productos.',
    cta = { enabled: true, text: 'BOTON DE ACCION', link: '/#1' },
    background_color = 'transparent',
    padding = '36px 20px',
  } = props;

  const isMobile = deviceViewport === 'mobile';
  const isTop = image_position === 'top' || isMobile;
  const isRight = image_position === 'right' && !isMobile;

  const isCardVariant = variant === 'card';
  const isSplitVariant = variant === 'split';

  return (
    <section
      style={{
        backgroundColor: isCardVariant
          ? 'var(--md-sys-color-surface-container-low)'
          : background_color,
        border: isCardVariant
          ? '1px solid var(--md-sys-color-outline-variant)'
          : 'none',
        boxShadow: isCardVariant ? 'var(--md-elevation-1)' : 'none',
        padding: isMobile ? '1.5rem 1rem' : padding,
        borderRadius: 'var(--md-shape-lg)',
        boxSizing: 'border-box',
        transition: 'all 150ms ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: isTop ? 'column' : isRight ? 'row-reverse' : 'row',
          alignItems: 'center',
          gap: isSplitVariant ? '3.5rem' : '2rem',
          width: '100%',
        }}
      >
        <div style={{ flex: isMobile ? 'none' : '1 1 320px', width: isMobile ? '100%' : 'auto', minWidth: 0 }}>
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              maxHeight: isTop ? '280px' : '400px',
              objectFit: 'cover',
              borderRadius: 'var(--md-shape-md)',
              border: '1px solid var(--md-sys-color-outline-variant)',
              boxShadow: 'var(--md-elevation-1)',
              display: 'block',
            }}
          />
        </div>

        <div style={{ flex: isMobile ? 'none' : '1 1 340px', width: isMobile ? '100%' : 'auto', minWidth: 0 }}>
          <h2
            style={{
              fontSize: isMobile ? '1.4rem' : 'clamp(1.5rem, 3vw, 2.15rem)',
              fontWeight: 800,
              color: 'var(--md-sys-color-on-surface)',
              lineHeight: 1.25,
              marginBottom: '0.85rem',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h2>

          <p
            style={{
              fontSize: isMobile ? '0.875rem' : '0.975rem',
              lineHeight: 1.65,
              color: 'var(--md-sys-color-on-surface-variant)',
              marginBottom: '1.5rem',
            }}
          >
            {body}
          </p>

          {cta && cta.enabled && cta.text && (
            <button
              type="button"
              onClick={() => onNavigate(cta.link)}
              style={{
                padding: '0.7rem 1.5rem',
                backgroundColor: 'var(--md-sys-color-primary)',
                color: 'var(--md-sys-color-on-primary)',
                border: 'none',
                borderRadius: 'var(--md-shape-full)',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                boxShadow: 'var(--md-elevation-1)',
                transition: 'transform 120ms ease',
                width: isMobile ? '100%' : 'auto',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>{cta.text}</span>
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default TextImageWidget;
