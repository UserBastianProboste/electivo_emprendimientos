/*
 * Module: PublishedStorePage
 * Description: Pristine, full-screen published store preview rendered in a standalone window without builder chrome
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of standalone published store preview.
 * - 2026-10-26 [v1.3.0]: Added vertical position anchor scrolling (/#N and #N), responsive mobile styling, and onNavigate dispatcher.
 */

import React, { useState, useEffect } from 'react';
import { WidgetRenderer } from '../components/builder/WidgetRenderer';
import { ToastNotificationWidget } from '../components/builder/widgets/StructureNavWidgets';
import { ShoppingBag, ArrowLeft, Home } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

const PAGES_STORAGE_KEY = 'store_builder_pages_v2';

export function PublishedStorePage() {
  const [pages, setPages] = useState([]);
  const [currentPageSlug, setCurrentPageSlug] = useState('/');
  const [cartCount, setCartCount] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PAGES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPages(parsed);
        }
      }
    } catch (err) {
      console.warn('Could not read saved pages for preview:', err);
    }
  }, []);

  const activePage = pages.find((p) => p.slug === currentPageSlug) || pages[0] || { widgets: [] };
  const widgets = activePage.widgets || [];

  const handleNavigate = (path) => {
    if (!path) return;
    const trimmed = path.trim();

    // Check vertical anchor on current page: /#1 or #1
    const anchorMatch = trimmed.match(/^(\/)?#(\d+)$/);
    if (anchorMatch) {
      const posNum = parseInt(anchorMatch[2], 10);
      const targetEl = document.getElementById(`widget-${posNum}`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // Check page route
    if (trimmed.startsWith('/')) {
      const [pathPart, hashPart] = trimmed.split('#');
      const targetPage = pages.find((p) => p.slug === pathPart);
      if (targetPage) {
        setCurrentPageSlug(targetPage.slug);
        if (hashPart) {
          const posNum = parseInt(hashPart.replace(/\D/g, ''), 10);
          setTimeout(() => {
            const targetEl = document.getElementById(`widget-${posNum}`);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 150);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
    }

    // Local hashtag
    if (trimmed.startsWith('#')) {
      const targetEl = document.querySelector(trimmed);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // External
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      window.open(trimmed, '_blank');
    }
  };

  const handleAddToCart = (item) => {
    setCartCount((prev) => prev + (item?.qty || 1));
    showToast(`"${item?.title || 'Producto'}" anadido al carrito.`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--md-sys-color-background)',
        scrollBehavior: 'smooth',
      }}
    >
      {/* Pristine Storefront Navigation Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'var(--md-sys-color-surface)',
          borderBottom: '1px solid var(--md-sys-color-outline-variant)',
          padding: '0.75rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div
            onClick={() => handleNavigate('/')}
            style={{
              fontSize: '1.1rem',
              fontWeight: 800,
              color: 'var(--md-sys-color-on-surface)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>Mi Tienda Online</span>
          </div>

          {/* Page Links */}
          {pages.length > 1 && (
            <nav style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {pages.map((p) => {
                const isActive = currentPageSlug === p.slug;
                const isHome = p.id === 'page-home' || p.slug === '/';

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleNavigate(p.slug)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: 'var(--md-shape-full)',
                      border: 'none',
                      backgroundColor: isActive ? 'var(--md-sys-color-primary-container)' : 'transparent',
                      color: isActive ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface-variant)',
                      fontSize: '0.825rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      transition: 'all 120ms ease',
                    }}
                  >
                    {isHome && <Home size={13} />}
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Cart Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              backgroundColor: 'var(--md-sys-color-surface-container)',
              borderRadius: 'var(--md-shape-full)',
              color: 'var(--md-sys-color-on-surface)',
              fontSize: '0.85rem',
              fontWeight: 700,
            }}
          >
            <ShoppingBag size={16} color="var(--md-sys-color-primary)" />
            <span>{cartCount} items</span>
          </div>
        </div>
      </header>

      {/* Main Rendered Storefront Body */}
      <main style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '1.5rem 1rem', boxSizing: 'border-box' }}>
        {widgets.map((widget, idx) => (
          <div key={widget.id || idx} style={{ margin: '1rem 0' }}>
            <WidgetRenderer
              widget={widget}
              index={idx}
              totalWidgets={widgets.length}
              isSelected={false}
              isEditMode={false}
              onSelect={() => {}}
              onMoveUp={() => {}}
              onMoveDown={() => {}}
              onDuplicate={() => {}}
              onDelete={() => {}}
              onNavigate={handleNavigate}
            />
          </div>
        ))}
      </main>

      {/* Institutional Centered Footer */}
      <Footer />

      {/* Floating Return Button */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 1000,
        }}
      >
        <button
          type="button"
          onClick={() => {
            if (window.opener) {
              window.close();
            } else {
              window.location.href = '/';
            }
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.65rem 1.15rem',
            backgroundColor: 'var(--md-sys-color-inverse-surface)',
            color: 'var(--md-sys-color-inverse-on-surface)',
            borderRadius: 'var(--md-shape-full)',
            border: 'none',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: 'var(--md-elevation-3)',
            transition: 'transform 120ms ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <ArrowLeft size={15} />
          <span>Volver al Constructor</span>
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 10000 }}>
          <ToastNotificationWidget
            props={{
              type: 'success',
              message: toastMessage,
              action: { enabled: false },
              dismissible: true,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default PublishedStorePage;
