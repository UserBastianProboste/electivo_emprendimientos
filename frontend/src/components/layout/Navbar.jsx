/*
 * Module: Navbar
 * Description: Minimalist, elegant M3 top navigation bar focused on the entrepreneur's brand
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of responsive Navbar.
 * - 2026-10-15 [v0.2.0]: Streamlined to elegant white-label design with M3 light/dark mode toggle.
 */

import React, { useState } from 'react';
import { useStoreConfig } from '../../context/StoreConfigContext';
import { Sun, Moon, Sliders, ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';

export function Navbar({ currentPath, onNavigate }) {
  const { config, toggleColorMode } = useStoreConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDarkMode = config.color_mode === 'dark';

  const navItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Catálogo', path: '/catalogo' },
    { label: 'Personalización', path: '/admin/personalizacion', isSpecial: true },
  ];

  const handleNavClick = (path) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--md-sys-color-surface)',
        borderBottom: '1px solid var(--md-sys-color-outline-variant)',
        transition: 'background-color var(--md-transition), border-color var(--md-transition)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
          gap: '1.5rem',
        }}
      >
        {/* Entrepreneur Brand Identity */}
        <button
          onClick={() => handleNavClick('/')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textAlign: 'left',
            padding: 0,
          }}
        >
          {config.logo_url && config.logo_url.trim() ? (
            <img
              src={config.logo_url}
              alt={config.store_name}
              style={{
                height: '38px',
                maxWidth: '160px',
                objectFit: 'contain',
              }}
            />
          ) : (
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--md-shape-sm)',
                backgroundColor: 'var(--md-sys-color-primary-container)',
                color: 'var(--md-sys-color-on-primary-container)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.95rem',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {(config.store_name || 'T')[0].toUpperCase()}
            </div>
          )}

          <div>
            <div
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--md-sys-color-on-surface)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              {config.store_name || 'Tienda & Estudio'}
            </div>
          </div>
        </button>

        {/* Desktop Navigation & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.35rem',
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              if (item.isSpecial) {
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      color: isActive ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-primary)',
                      backgroundColor: isActive ? 'var(--md-sys-color-primary-container)' : 'transparent',
                      border: '1px solid var(--md-sys-color-outline-variant)',
                      borderRadius: 'var(--md-shape-full)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      marginLeft: '0.5rem',
                      transition: 'all var(--md-transition)',
                    }}
                  >
                    <Sliders size={14} />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface-variant)',
                    backgroundColor: isActive ? 'var(--md-sys-color-surface-container-high)' : 'transparent',
                    border: 'none',
                    borderRadius: 'var(--md-shape-sm)',
                    cursor: 'pointer',
                    transition: 'all var(--md-transition)',
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Light / Dark Mode M3 Toggle */}
          <button
            onClick={toggleColorMode}
            title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--md-shape-full)',
              backgroundColor: 'var(--md-sys-color-surface-container)',
              color: 'var(--md-sys-color-on-surface-variant)',
              border: '1px solid var(--md-sys-color-outline-variant)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all var(--md-transition)',
            }}
            aria-label="Alternar tema claro y oscuro"
          >
            {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: '1px solid var(--md-sys-color-outline-variant)',
              borderRadius: 'var(--md-shape-sm)',
              padding: '0.4rem',
              color: 'var(--md-sys-color-on-surface)',
              cursor: 'pointer',
            }}
            className="mobile-toggle"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--md-sys-color-surface-container-low)',
            borderBottom: '1px solid var(--md-sys-color-outline-variant)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                backgroundColor: currentPath === item.path ? 'var(--md-sys-color-surface-container-high)' : 'transparent',
                color: currentPath === item.path ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface)',
                border: 'none',
                borderRadius: 'var(--md-shape-sm)',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
