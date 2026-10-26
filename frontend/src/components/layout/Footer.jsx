/*
 * Module: Footer
 * Description: Institutional footer displaying solely the Universidad Autonoma de Chile A+S project accreditation
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of Footer component.
 * - 2026-10-15 [v0.2.0]: Streamlined academic accreditation note.
 * - 2026-10-26 [v1.1.0]: Reduced to centered institutional text as requested.
 */

import React from 'react';

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--md-sys-color-surface-container-low)',
        borderTop: '1px solid var(--md-sys-color-outline-variant)',
        padding: '1.25rem 1rem',
        textAlign: 'center',
        transition: 'background-color var(--md-transition), border-color var(--md-transition)',
      }}
    >
      <div
        style={{
          fontSize: '0.85rem',
          fontWeight: 500,
          color: 'var(--md-sys-color-on-surface-variant)',
          letterSpacing: '0.01em',
        }}
      >
        Un proyecto del programa A+S de la Universidad Autónoma de Chile
      </div>
    </footer>
  );
}

export default Footer;
