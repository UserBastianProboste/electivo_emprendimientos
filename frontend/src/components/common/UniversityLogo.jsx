/*
 * Module: UniversityLogo
 * Description: Subtle, elegant institutional accreditation mark for the Universidad Autonoma de Chile (RN-01)
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of immutable institutional branding asset.
 * - 2026-10-15 [v0.2.0]: Redesigned to be minimalist, discreet, and elegant for professional e-commerce stores.
 */

import React from 'react';

export function UniversityLogo({ className = '' }) {
  return (
    <div
      className={`university-academic-seal ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.78rem',
        color: 'var(--md-sys-color-on-surface-variant)',
        fontFamily: 'var(--font-sans)',
        opacity: 0.85,
        userSelect: 'none',
      }}
      title="Programa Aprendizaje + Servicio (A+S) - Universidad Autónoma de Chile"
    >
      {/* Subtle academic laurel/crest icon */}
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0, color: 'var(--md-sys-color-primary)' }}
      >
        <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z" />
        <path d="M12 7v8" />
        <path d="M9 11l3-3 3 3" />
      </svg>

      <span style={{ letterSpacing: '0.01em', fontWeight: 500 }}>
        Un proyecto del programa A+S de la Universidad Autónoma de Chile
      </span>
    </div>
  );
}
