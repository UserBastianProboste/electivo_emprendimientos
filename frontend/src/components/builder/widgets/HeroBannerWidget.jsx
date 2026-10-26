/*
 * Module: HeroBannerWidget
 * Description: Renders configurable Hero Banner widget (Widget 1) with variant support, hover micro-interactions, and functional links
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of Hero Banner widget.
 * - 2026-10-26 [v1.2.0]: Added style variant rendering and hover micro-animations.
 * - 2026-10-26 [v1.3.0]: Fixed gradient CSS, added mobile viewport responsive adjustments, and robust link handling.
 */

import React from 'react';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

export function HeroBannerWidget({ props = {}, onNavigate = () => {}, deviceViewport = 'desktop' }) {
  const {
    variant = 'standard',
    background = '',
    background_type = 'image',
    background_color = '#1a1f2c',
    title = 'TITULO DE TU TIENDA ONLINE',
    subtitle = 'DESCRIPCION: Explica aqui brevemente la propuesta de valor y los productos que ofreces.',
    cta_primary = { text: 'BOTON PRINCIPAL', link: '/#2', style: 'filled' },
    cta_secondary = { text: 'BOTON SECUNDARIO', link: '/#3', style: 'outline' },
    alignment = 'center',
    overlay_color = '#000000',
    overlay_opacity = 0.45,
    height = '480px',
  } = props;

  const isMobile = deviceViewport === 'mobile';
  const textAlignMap = { left: 'left', center: 'center', right: 'right' };
  const justifyContentMap = { left: 'flex-start', center: 'center', right: 'flex-end' };

  const isMinimal = variant === 'minimal';
  const isGradient = variant === 'gradient';

  return (
    <section
      style={{
        position: 'relative',
        minHeight: isMobile ? '380px' : height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: isMobile ? 'center' : justifyContentMap[alignment] || 'center',
        overflow: 'hidden',
        borderRadius: 'var(--md-shape-lg)',
        background: isGradient
          ? 'linear-gradient(135deg, var(--md-sys-color-primary) 0%, var(--md-sys-color-surface-container-highest) 100%)'
          : isMinimal
          ? 'var(--md-sys-color-surface-container)'
          : background_color,
        color: isMinimal ? 'var(--md-sys-color-on-surface)' : '#ffffff',
        padding: isMobile ? '2rem 1.25rem' : '3rem 2rem',
        boxShadow: isMinimal ? 'none' : 'var(--md-elevation-2)',
        border: isMinimal ? '1px solid var(--md-sys-color-outline-variant)' : 'none',
        boxSizing: 'border-box',
        transition: 'all 150ms ease',
      }}
    >
      {/* Background Image Layer */}
      {!isMinimal && !isGradient && background_type === 'image' && background && (
        <img
          src={background}
          alt={title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}
        />
      )}

      {/* Overlay Layer */}
      {!isMinimal && !isGradient && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: overlay_color,
            opacity: overlay_opacity,
            zIndex: 2,
          }}
        />
      )}

      {/* Foreground Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '760px',
          textAlign: isMobile ? 'center' : textAlignMap[alignment] || 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.75rem',
            borderRadius: 'var(--md-shape-full)',
            backgroundColor: isMinimal
              ? 'var(--md-sys-color-primary-container)'
              : 'rgba(255, 255, 255, 0.18)',
            color: isMinimal
              ? 'var(--md-sys-color-on-primary-container)'
              : '#ffffff',
            backdropFilter: 'blur(8px)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          <Sparkles size={13} />
          <span>DESTACADO OFICIAL</span>
        </div>

        <h1
          style={{
            fontSize: isMobile ? '1.75rem' : 'clamp(2rem, 4.5vw, 3rem)',
            fontWeight: 800,
            lineHeight: 1.18,
            letterSpacing: '-0.02em',
            marginBottom: '0.85rem',
            color: isMinimal ? 'var(--md-sys-color-on-surface)' : '#ffffff',
            textShadow: isMinimal ? 'none' : '0 2px 10px rgba(0,0,0,0.3)',
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: isMobile ? '0.9rem' : 'clamp(0.95rem, 1.8vw, 1.1rem)',
            lineHeight: 1.6,
            marginBottom: '1.75rem',
            color: isMinimal ? 'var(--md-sys-color-on-surface-variant)' : 'rgba(255,255,255,0.92)',
            maxWidth: '640px',
            marginInline: (isMobile || alignment === 'center') ? 'auto' : '0',
          }}
        >
          {subtitle}
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: isMobile ? 'center' : justifyContentMap[alignment] || 'center',
          }}
        >
          {cta_primary && cta_primary.text && (
            <button
              type="button"
              onClick={() => onNavigate(cta_primary.link)}
              style={{
                padding: '0.75rem 1.6rem',
                backgroundColor: 'var(--md-sys-color-primary)',
                color: 'var(--md-sys-color-on-primary)',
                border: 'none',
                borderRadius: 'var(--md-shape-full)',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                boxShadow: 'var(--md-elevation-1)',
                transition: 'transform 120ms ease, box-shadow 120ms ease',
                width: isMobile ? '100%' : 'auto',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--md-elevation-2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--md-elevation-1)';
              }}
            >
              <ShoppingBag size={16} />
              <span>{cta_primary.text}</span>
              <ArrowRight size={15} />
            </button>
          )}

          {cta_secondary && cta_secondary.text && (
            <button
              type="button"
              onClick={() => onNavigate(cta_secondary.link)}
              style={{
                padding: '0.75rem 1.4rem',
                backgroundColor: isMinimal ? 'transparent' : 'rgba(255, 255, 255, 0.15)',
                color: isMinimal ? 'var(--md-sys-color-on-surface)' : '#ffffff',
                border: isMinimal
                  ? '1px solid var(--md-sys-color-outline)'
                  : '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: 'var(--md-shape-full)',
                fontWeight: 600,
                fontSize: '0.875rem',
                cursor: 'pointer',
                backdropFilter: 'blur(6px)',
                transition: 'transform 120ms ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? '100%' : 'auto',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>{cta_secondary.text}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroBannerWidget;
