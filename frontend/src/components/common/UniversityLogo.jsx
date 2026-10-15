/*
 * Module: UniversityLogo
 * Description: Permanent institutional University branding badge component (RN-01)
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of immutable institutional branding asset.
 */

import React from 'react';

export function UniversityLogo({ size = 'medium', className = '' }) {
  const sizeMap = {
    small: { height: 32, iconSize: 22, fontSize: '0.75rem', subtitleSize: '0.625rem' },
    medium: { height: 42, iconSize: 28, fontSize: '0.85rem', subtitleSize: '0.7rem' },
    large: { height: 56, iconSize: 36, fontSize: '1rem', subtitleSize: '0.8rem' },
  };

  const currentSize = sizeMap[size] || sizeMap.medium;

  return (
    <div
      className={`university-branding-seal ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.4rem 0.75rem',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '8px',
        userSelect: 'none',
      }}
      title="Sello Oficial de Autoría Universitaria - Inamovible según RN-01"
    >
      {/* High-detail University Institutional Emblem SVG */}
      <svg
        width={currentSize.iconSize}
        height={currentSize.iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <circle cx="24" cy="24" r="22" stroke="var(--primary)" strokeWidth="2.5" fill="rgba(16, 185, 129, 0.08)" />
        <path
          d="M24 10L12 17V20H36V17L24 10Z"
          fill="var(--primary)"
        />
        <rect x="15" y="21" width="3" height="12" fill="var(--text-main)" />
        <rect x="22.5" y="21" width="3" height="12" fill="var(--text-main)" />
        <rect x="30" y="21" width="3" height="12" fill="var(--text-main)" />
        <path d="M11 34H37V37H11V34Z" fill="var(--primary)" />
        <circle cx="24" cy="15" r="1.5" fill="#ffffff" />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: 'var(--text-main)',
            fontSize: currentSize.fontSize,
            textTransform: 'uppercase',
          }}
        >
          Universidad de Chile
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: currentSize.subtitleSize,
            color: 'var(--primary)',
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}
        >
          Red de Emprendimientos Comunitarios
        </span>
      </div>
    </div>
  );
}
