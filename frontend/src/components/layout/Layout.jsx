/*
 * Module: Layout
 * Description: Master layout wrapper containing main application workspace and institutional footer
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of Layout component.
 * - 2026-10-26 [v1.1.0]: Removed redundant top navbar to leave builder header as sole authoritative top bar.
 */

import React from 'react';
import { Footer } from './Footer';

export function Layout({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--md-sys-color-background)',
      }}
    >
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
