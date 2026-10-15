/*
 * Module: Layout
 * Description: Master layout wrapper with header, main content region, and institutional footer
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of Layout component.
 */

import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout({ currentPath, onNavigate, children }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar currentPath={currentPath} onNavigate={onNavigate} />
      <main style={{ flex: 1, paddingBottom: '3rem' }}>
        {children}
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
