/*
 * Module: CardsGridWidget
 * Description: Renders Cards Grid widget (Widget 3) with configurable cards, hover animations, variants, and click handlers
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of Cards Grid widget.
 * - 2026-10-26 [v1.2.0]: Added style variant rendering, hover micro-interactions, and functional link actions.
 * - 2026-10-26 [v1.3.0]: Added mobile 1-column layout adaptation and compact variant styling.
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';

export function CardsGridWidget({ props = {}, onNavigate = () => {}, deviceViewport = 'desktop' }) {
  const {
    variant = 'standard',
    columns = 3,
    gap = '20px',
    cards = [],
  } = props;

  const isMobile = deviceViewport === 'mobile';
  const isCompact = variant === 'compact';
  const isOutlined = variant === 'outlined';

  const colTemplate = isMobile
    ? '1fr'
    : `repeat(auto-fit, minmax(${columns >= 4 ? '220px' : '260px'}, 1fr))`;

  return (
    <section style={{ padding: '0.75rem 0', width: '100%', boxSizing: 'border-box' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: colTemplate,
          gap: isMobile ? '16px' : gap,
          width: '100%',
        }}
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'var(--md-sys-color-surface-container-low)',
              border: isOutlined
                ? '2px solid var(--md-sys-color-primary)'
                : '1px solid var(--md-sys-color-outline-variant)',
              borderRadius: 'var(--md-shape-lg)',
              overflow: 'hidden',
              boxShadow: isOutlined ? 'none' : 'var(--md-elevation-1)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 120ms cubic-bezier(0.2, 0, 0, 1), box-shadow 120ms ease',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--md-elevation-3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = isOutlined ? 'none' : 'var(--md-elevation-1)';
            }}
          >
            {card.card_image && (
              <div style={{ position: 'relative', height: isCompact ? '140px' : '190px', width: '100%', overflow: 'hidden' }}>
                <img
                  src={card.card_image}
                  alt={card.card_title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 200ms ease',
                    display: 'block',
                  }}
                />
                {card.card_badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: 'var(--md-sys-color-primary)',
                      color: 'var(--md-sys-color-on-primary)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--md-shape-full)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {card.card_badge}
                  </span>
                )}
              </div>
            )}

            <div style={{ padding: isCompact ? '0.85rem' : '1.15rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3
                style={{
                  fontSize: isCompact ? '0.95rem' : '1.1rem',
                  fontWeight: 700,
                  color: 'var(--md-sys-color-on-surface)',
                  marginBottom: '0.35rem',
                }}
              >
                {card.card_title}
              </h3>

              <p
                style={{
                  fontSize: isCompact ? '0.8rem' : '0.85rem',
                  color: 'var(--md-sys-color-on-surface-variant)',
                  lineHeight: 1.45,
                  marginBottom: '1rem',
                  flex: 1,
                }}
              >
                {card.card_description}
              </p>

              {card.card_cta && card.card_cta.text && (
                <button
                  type="button"
                  onClick={() => onNavigate(card.card_cta.link || '/#1')}
                  style={{
                    alignSelf: 'flex-start',
                    background: 'none',
                    border: 'none',
                    color: 'var(--md-sys-color-primary)',
                    fontWeight: 700,
                    fontSize: '0.825rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: 0,
                    transition: 'gap 100ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.gap = '0.55rem';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.gap = '0.35rem';
                  }}
                >
                  <span>{card.card_cta.text}</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CardsGridWidget;
