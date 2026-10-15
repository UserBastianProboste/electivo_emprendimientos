/*
 * Module: Navbar
 * Description: Header navigation with permanent institutional branding (RN-01) and entrepreneur logo
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of responsive Navbar with RN-01 branding.
 */

import React, { useState } from 'react';
import { useStoreConfig } from '../../context/StoreConfigContext';
import { UniversityLogo } from '../common/UniversityLogo';
import { Store, Sliders, ShoppingBag, Menu, X } from 'lucide-react';

export function Navbar({ currentPath, onNavigate }) {
  const { config } = useStoreConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Catálogo', path: '/catalogo' },
    { label: 'Personalización', path: '/admin/personalizacion', badge: 'Admin' },
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
        backgroundColor: 'rgba(9, 9, 11, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '74px',
          gap: '1rem',
        }}
      >
        {/* Left Side: RN-01 Mandatory University Branding + Entrepreneur Store Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* RN-01: Permanent, non-removable institutional seal */}
          <UniversityLogo size="medium" />

          {/* Divider */}
          <div
            style={{
              height: '32px',
              width: '1px',
              backgroundColor: 'var(--border-color)',
            }}
          />

          {/* Entrepreneur Store Logo or Brand Title */}
          <button
            onClick={() => handleNavClick('/')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              textAlign: 'left',
            }}
          >
            {config.logo_url && config.logo_url.trim() ? (
              <img
                src={config.logo_url}
                alt={config.store_name}
                style={{
                  height: '36px',
                  maxWidth: '140px',
                  objectFit: 'contain',
                  borderRadius: '4px',
                }}
              />
            ) : (
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--primary-light)',
                  border: '1px solid var(--primary-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                }}
              >
                <Store size={18} />
              </div>
            )}
            <div>
              <div
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  letterSpacing: '-0.01em',
                }}
              >
                {config.store_name || 'Mi Emprendimiento'}
              </div>
              <div
                style={{
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-subtle)',
                }}
              >
                Tienda Oficial
              </div>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                style={{
                  padding: '0.45rem 0.9rem',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  border: isActive ? '1px solid var(--primary-border)' : '1px solid transparent',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {item.path === '/catalogo' && <ShoppingBag size={15} />}
                {item.path === '/admin/personalizacion' && <Sliders size={15} />}
                {item.label}
                {item.badge && (
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: 'var(--font-mono)',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      padding: '0.1rem 0.35rem',
                      borderRadius: '4px',
                      color: 'var(--text-subtle)',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '0.4rem',
            color: 'var(--text-main)',
            cursor: 'pointer',
          }}
          className="mobile-toggle"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
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
                backgroundColor: currentPath === item.path ? 'var(--primary-light)' : 'transparent',
                color: currentPath === item.path ? 'var(--primary)' : 'var(--text-main)',
                border: '1px solid',
                borderColor: currentPath === item.path ? 'var(--primary-border)' : 'var(--border-color)',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    padding: '0.15rem 0.4rem',
                    borderRadius: '4px',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* CSS helper for responsive desktop nav */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
