/*
 * Module: StructureInspector
 * Description: Inspector configuration panels for Breadcrumbs, Footer, Toast, and Layout Container widgets
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial modular implementation of structural and layout property inspectors.
 */

import React from 'react';
import { Plus, Trash2, Layout, Bell, ChevronRight } from 'lucide-react';

export function StructureInspector({ widgetType, currentProps = {}, onFieldChange }) {
  if (widgetType === 'breadcrumbs') {
    const separator = currentProps.separator || '/';
    const trail = currentProps.trail || ['Inicio', 'Catalogo General', 'Coleccion Actual'];

    const handleAddCrumb = () => {
      const crumb = prompt('Nombre del nuevo nivel en la ruta de navegacion:');
      if (!crumb || !crumb.trim()) return;
      onFieldChange('trail', [...trail, crumb.trim()]);
    };

    const handleRemoveCrumb = (idx) => {
      onFieldChange('trail', trail.filter((_, i) => i !== idx));
    };

    return (
      <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
          Miga de Pan (Breadcrumbs)
        </h4>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
            Separador
          </label>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {['/', '>', '•', '→'].map((sep) => (
              <button
                key={sep}
                type="button"
                onClick={() => onFieldChange('separator', sep)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--md-shape-sm)',
                  border: separator === sep ? '1px solid var(--md-sys-color-primary)' : '1px solid var(--md-sys-color-outline-variant)',
                  backgroundColor: separator === sep ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface)',
                  color: separator === sep ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {sep}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)' }}>
              Ruta ({trail.length} niveles)
            </label>
            <button
              type="button"
              onClick={handleAddCrumb}
              style={{ padding: '0.2rem 0.5rem', borderRadius: 'var(--md-shape-full)', border: 'none', backgroundColor: 'var(--md-sys-color-primary)', color: 'var(--md-sys-color-on-primary)', fontSize: '0.725rem', fontWeight: 700, cursor: 'pointer' }}
            >
              + Nivel
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {trail.map((cr, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={cr}
                  onChange={(e) => {
                    const next = [...trail];
                    next[idx] = e.target.value;
                    onFieldChange('trail', next);
                  }}
                  style={{ flex: 1, padding: '0.35rem 0.5rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.75rem' }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCrumb(idx)}
                  style={{ background: 'none', border: 'none', color: 'var(--md-sys-color-error)', cursor: 'pointer', padding: 0 }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (widgetType === 'footer_block') {
    const text = currentProps.text || '';
    const copyright = currentProps.copyright || '';
    const linkGroups = currentProps.link_groups || [];

    const handleAddGroup = () => {
      const title = prompt('Titulo de la nueva columna (ej. INFORMACION, ENLACES):');
      if (!title || !title.trim()) return;
      onFieldChange('link_groups', [...linkGroups, { title: title.trim(), links: ['Inicio', 'Catalogo'] }]);
    };

    const handleRemoveGroup = (idx) => {
      onFieldChange('link_groups', linkGroups.filter((_, i) => i !== idx));
    };

    return (
      <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
          Pie de Pagina (Footer)
        </h4>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
            Texto Institucional / Mision
          </label>
          <textarea
            rows={2}
            value={text}
            onChange={(e) => onFieldChange('text', e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.8rem', boxSizing: 'border-box', fontFamily: 'inherit' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
            Texto de Copyright
          </label>
          <input
            type="text"
            value={copyright}
            onChange={(e) => onFieldChange('copyright', e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.8rem', boxSizing: 'border-box' }}
          />
        </div>

        {/* Link Columns */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)' }}>
              Columnas de Enlaces ({linkGroups.length})
            </label>
            <button
              type="button"
              onClick={handleAddGroup}
              style={{ padding: '0.2rem 0.5rem', borderRadius: 'var(--md-shape-full)', border: 'none', backgroundColor: 'var(--md-sys-color-primary)', color: 'var(--md-sys-color-on-primary)', fontSize: '0.725rem', fontWeight: 700, cursor: 'pointer' }}
            >
              + Columna
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {linkGroups.map((grp, gIdx) => (
              <div key={gIdx} style={{ padding: '0.55rem', borderRadius: 'var(--md-shape-sm)', backgroundColor: 'var(--md-sys-color-surface-container)', border: '1px solid var(--md-sys-color-outline-variant)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <input
                    type="text"
                    value={grp.title || ''}
                    onChange={(e) => {
                      const next = [...linkGroups];
                      next[gIdx] = { ...next[gIdx], title: e.target.value };
                      onFieldChange('link_groups', next);
                    }}
                    placeholder="Titulo de columna"
                    style={{ fontWeight: 700, width: '70%', padding: '0.3rem 0.5rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.78rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveGroup(gIdx)}
                    style={{ background: 'none', border: 'none', color: 'var(--md-sys-color-error)', cursor: 'pointer', padding: 0 }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <input
                  type="text"
                  value={(grp.links || []).join(', ')}
                  onChange={(e) => {
                    const next = [...linkGroups];
                    next[gIdx] = { ...next[gIdx], links: e.target.value.split(',').map((s) => s.trim()) };
                    onFieldChange('link_groups', next);
                  }}
                  placeholder="Enlaces separados por coma"
                  style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.75rem', boxSizing: 'border-box' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (widgetType === 'toast_notification') {
    return (
      <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
          Alerta / Toast
        </h4>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
            Mensaje Notificacion
          </label>
          <input
            type="text"
            value={currentProps.message || ''}
            onChange={(e) => onFieldChange('message', e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.8rem', boxSizing: 'border-box' }}
          />
        </div>
      </div>
    );
  }

  if (widgetType === 'container_layout') {
    const layout = currentProps.layout || '2_col';

    return (
      <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
          Distribucion de Contenedor Layout
        </h4>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
            Columnas
          </label>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {[
              { id: '1_col', label: '1 Columna' },
              { id: '2_col', label: '2 Columnas' },
              { id: 'grid', label: 'Cuadricula' },
            ].map((col) => (
              <button
                key={col.id}
                type="button"
                onClick={() => onFieldChange('layout', col.id)}
                style={{
                  flex: 1,
                  padding: '0.45rem',
                  borderRadius: 'var(--md-shape-sm)',
                  border: layout === col.id ? '1px solid var(--md-sys-color-primary)' : '1px solid var(--md-sys-color-outline-variant)',
                  backgroundColor: layout === col.id ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface)',
                  color: layout === col.id ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)',
                  fontSize: '0.78rem',
                  fontWeight: layout === col.id ? 700 : 500,
                  cursor: 'pointer',
                }}
              >
                {col.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
