/*
 * Module: PageTabEditorModal
 * Description: Modal dialog for renaming tabs, setting custom route slugs (/catalogo), and designating default views
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of page tab metadata editor.
 */

import React, { useState, useEffect } from 'react';
import { Edit3, X, Check, Globe, Tag } from 'lucide-react';

export function PageTabEditorModal({
  isOpen,
  page,
  onClose,
  onSave,
}) {
  const [label, setLabel] = useState('');
  const [slug, setSlug] = useState('');

  useEffect(() => {
    if (page) {
      setLabel(page.label || '');
      setSlug(page.slug || '/');
    }
  }, [page]);

  if (!isOpen || !page) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    let cleanSlug = slug.trim();
    if (!cleanSlug.startsWith('/')) {
      cleanSlug = `/${cleanSlug}`;
    }
    // Remove invalid characters
    cleanSlug = cleanSlug.toLowerCase().replace(/[^a-z0-9/_#-]/g, '');

    onSave(page.id, {
      label: label.trim() || 'Sin Titulo',
      slug: cleanSlug || '/',
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 120ms ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: 'var(--md-sys-color-surface)',
          borderRadius: 'var(--md-shape-xl)',
          border: '1px solid var(--md-sys-color-outline-variant)',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
          animation: 'slideUp 140ms ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--md-sys-color-outline-variant)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--md-sys-color-surface-container)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Edit3 size={18} color="var(--md-sys-color-primary)" />
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
              Editar Pestana y Ruta
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--md-sys-color-on-surface-variant)',
              cursor: 'pointer',
              padding: '0.2rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--md-sys-color-on-surface-variant)',
                marginBottom: '0.4rem',
              }}
            >
              Nombre de la Pestana
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Ej. Catalogo, Nosotros, Carrito"
                required
                style={{
                  width: '100%',
                  padding: '0.6rem 0.8rem 0.6rem 2.2rem',
                  borderRadius: 'var(--md-shape-sm)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  backgroundColor: 'var(--md-sys-color-surface-container-low)',
                  color: 'var(--md-sys-color-on-surface)',
                  fontSize: '0.875rem',
                  boxSizing: 'border-box',
                }}
              />
              <Tag
                size={14}
                color="var(--md-sys-color-on-surface-variant)"
                style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--md-sys-color-on-surface-variant)', marginTop: '0.25rem', display: 'block' }}>
              Este nombre se mostrara en la barra de pestanas y en los menus de navegacion.
            </span>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--md-sys-color-on-surface-variant)',
                marginBottom: '0.4rem',
              }}
            >
              Ruta / URL de la Vista
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Ej. /catalogo o /nosotros"
                required
                disabled={page.id === 'page-home'}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.8rem 0.6rem 2.2rem',
                  borderRadius: 'var(--md-shape-sm)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  backgroundColor: page.id === 'page-home' ? 'var(--md-sys-color-surface-container)' : 'var(--md-sys-color-surface-container-low)',
                  color: 'var(--md-sys-color-on-surface)',
                  fontSize: '0.875rem',
                  boxSizing: 'border-box',
                  fontFamily: 'var(--font-mono)',
                  cursor: page.id === 'page-home' ? 'not-allowed' : 'text',
                }}
              />
              <Globe
                size={14}
                color="var(--md-sys-color-on-surface-variant)"
                style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--md-sys-color-on-surface-variant)', marginTop: '0.25rem', display: 'block' }}>
              {page.id === 'page-home'
                ? 'La pagina principal siempre utiliza la ruta base "/"'
                : 'Usa esta ruta para vincular botones de otras paginas a esta vista.'}
            </span>
          </div>

          {/* Action buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.75rem',
              marginTop: '0.5rem',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.55rem 1rem',
                borderRadius: 'var(--md-shape-full)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                backgroundColor: 'transparent',
                color: 'var(--md-sys-color-on-surface)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancelar
            </button>

            <button
              type="submit"
              style={{
                padding: '0.55rem 1.35rem',
                borderRadius: 'var(--md-shape-full)',
                border: 'none',
                backgroundColor: 'var(--md-sys-color-primary)',
                color: 'var(--md-sys-color-on-primary)',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: 'var(--md-elevation-1)',
              }}
            >
              <Check size={15} />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PageTabEditorModal;
