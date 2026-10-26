/*
 * Module: BuilderHeader
 * Description: Header bar containing page tabs, device viewport controls, M3 palette picker, and live store launch trigger
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of builder header controls.
 * - 2026-10-26 [v1.1.0]: Added page tab manager with INICIO chip and dynamic canvas linker (/pagina_x).
 * - 2026-10-26 [v1.2.0]: Added launch full store in new window button and enhanced save action.
 * - 2026-10-26 [v1.3.0]: Added Home icon for main page, tab editor trigger, preflight warnings badge, and M3 styled selects.
 */

import React, { useState } from 'react';
import { useStoreConfig } from '../../context/StoreConfigContext';
import {
  Sun,
  Moon,
  HelpCircle,
  Eye,
  EyeOff,
  Smartphone,
  Tablet,
  Monitor,
  Save,
  Download,
  Palette,
  LayoutTemplate,
  Plus,
  X,
  ExternalLink,
  Home,
  Edit2,
  AlertTriangle,
} from 'lucide-react';
import { BUILDER_TEMPLATES } from '../../data/builderTemplates';
import { PageTabEditorModal } from './PageTabEditorModal';

const M3_PALETTES = [
  { id: 1, name: 'Sapphire Blue', color: '#415F91' },
  { id: 2, name: 'Sage Green', color: '#386A20' },
  { id: 3, name: 'Terracotta', color: '#8B5022' },
  { id: 4, name: 'Slate Quartz', color: '#4A5F76' },
];

export function BuilderHeader({
  pages = [],
  currentPageId,
  onSelectPage,
  onAddPage,
  onDeletePage,
  onUpdatePage,
  deviceViewport,
  onDeviceChange,
  isEditMode,
  onToggleEditMode,
  showTutorial,
  onToggleTutorial,
  onSelectTemplate,
  onSave,
  onOpenLivePreview,
  onExport,
  warningsCount = 0,
  onOpenWarnings,
}) {
  const { config, previewConfig, toggleColorMode } = useStoreConfig();
  const isDarkMode = config.color_mode === 'dark';
  const [editingPage, setEditingPage] = useState(null);

  return (
    <header
      style={{
        backgroundColor: 'var(--md-sys-color-surface)',
        borderBottom: '1px solid var(--md-sys-color-outline-variant)',
        padding: '0.55rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Title & Page Tabs System */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
        <h1
          style={{
            margin: 0,
            fontSize: '1.05rem',
            fontWeight: 800,
            color: 'var(--md-sys-color-on-surface)',
            letterSpacing: '-0.02em',
          }}
        >
          Constructor
        </h1>

        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--md-sys-color-outline-variant)' }} />

        {/* Page Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          {pages.map((p) => {
            const isActive = p.id === currentPageId;
            const isHome = p.id === 'page-home' || p.slug === '/';

            return (
              <div
                key={p.id}
                onClick={() => onSelectPage(p.id)}
                title={`Ruta activa: ${p.slug}. Haz clic para ver el lienzo o doble clic para editar nombre.`}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setEditingPage(p);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--md-shape-full)',
                  backgroundColor: isActive
                    ? 'var(--md-sys-color-primary)'
                    : 'var(--md-sys-color-surface-container)',
                  color: isActive
                    ? 'var(--md-sys-color-on-primary)'
                    : 'var(--md-sys-color-on-surface)',
                  border: isActive
                    ? '1px solid var(--md-sys-color-primary)'
                    : '1px solid var(--md-sys-color-outline-variant)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 120ms ease',
                  boxShadow: isActive ? 'var(--md-elevation-1)' : 'none',
                }}
              >
                {isHome && (
                  <Home
                    size={13}
                    style={{
                      flexShrink: 0,
                      opacity: isActive ? 1 : 0.85,
                      color: isActive ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-primary)',
                    }}
                  />
                )}
                <span>{p.label}</span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    opacity: isActive ? 0.9 : 0.65,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  ({p.slug})
                </span>

                {/* Edit tab name button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingPage(p);
                  }}
                  title="Cambiar nombre de pestana o ruta"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    opacity: isActive ? 0.9 : 0.6,
                    borderRadius: '50%',
                    transition: 'opacity 100ms ease',
                  }}
                >
                  <Edit2 size={11} />
                </button>

                {p.id !== 'page-home' && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeletePage(p.id);
                    }}
                    title="Eliminar esta pagina"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'inherit',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      opacity: 0.8,
                    }}
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            );
          })}

          {/* Add Page Button */}
          <button
            type="button"
            onClick={onAddPage}
            title="Agregar nueva pagina (Lienzo en blanco)"
            style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--md-shape-full)',
              border: '1px dashed var(--md-sys-color-primary)',
              backgroundColor: 'var(--md-sys-color-primary-container)',
              color: 'var(--md-sys-color-on-primary-container)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 120ms ease',
            }}
          >
            <Plus size={15} />
          </button>
        </div>
      </div>

      {/* Center Controls: Viewport, Palette and Preflight Warnings */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Preflight Audit Badge */}
        {warningsCount > 0 && (
          <button
            type="button"
            onClick={onOpenWarnings}
            title={`Se detectaron ${warningsCount} observaciones en tu tienda. Clic para revisarlas.`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.3rem 0.65rem',
              borderRadius: 'var(--md-shape-full)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: 'var(--md-sys-color-error)',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 120ms ease',
            }}
          >
            <AlertTriangle size={13} />
            <span>{warningsCount} avisos</span>
          </button>
        )}

        {/* Viewport Selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--md-sys-color-surface-container)',
            borderRadius: 'var(--md-shape-full)',
            padding: '0.2rem',
            border: '1px solid var(--md-sys-color-outline-variant)',
          }}
        >
          <button
            type="button"
            onClick={() => onDeviceChange('desktop')}
            title="Vista Escritorio (100%)"
            style={{
              padding: '0.25rem 0.55rem',
              borderRadius: 'var(--md-shape-full)',
              border: 'none',
              backgroundColor: deviceViewport === 'desktop' ? 'var(--md-sys-color-primary)' : 'transparent',
              color: deviceViewport === 'desktop' ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-on-surface-variant)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              transition: 'all 120ms ease',
            }}
          >
            <Monitor size={14} />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => onDeviceChange('tablet')}
            title="Vista Tablet (768px)"
            style={{
              padding: '0.25rem 0.55rem',
              borderRadius: 'var(--md-shape-full)',
              border: 'none',
              backgroundColor: deviceViewport === 'tablet' ? 'var(--md-sys-color-primary)' : 'transparent',
              color: deviceViewport === 'tablet' ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-on-surface-variant)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              transition: 'all 120ms ease',
            }}
          >
            <Tablet size={14} />
            <span>Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => onDeviceChange('mobile')}
            title="Vista Movil (390px)"
            style={{
              padding: '0.25rem 0.55rem',
              borderRadius: 'var(--md-shape-full)',
              border: 'none',
              backgroundColor: deviceViewport === 'mobile' ? 'var(--md-sys-color-primary)' : 'transparent',
              color: deviceViewport === 'mobile' ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-on-surface-variant)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              transition: 'all 120ms ease',
            }}
          >
            <Smartphone size={14} />
            <span>Movil</span>
          </button>
        </div>

        {/* Palette Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Palette size={15} color="var(--md-sys-color-on-surface-variant)" />
          {M3_PALETTES.map((pal) => (
            <button
              key={pal.id}
              type="button"
              onClick={() => previewConfig({ theme_id: pal.id })}
              title={`Activar paleta ${pal.name}`}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: pal.color,
                border: config.theme_id === pal.id ? '2px solid var(--md-sys-color-on-surface)' : '2px solid transparent',
                cursor: 'pointer',
                boxShadow: 'var(--md-elevation-1)',
                transition: 'transform 100ms ease',
              }}
            />
          ))}
        </div>

        {/* Light / Dark Mode Toggle */}
        <button
          type="button"
          onClick={toggleColorMode}
          title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--md-shape-full)',
            backgroundColor: 'var(--md-sys-color-surface-container)',
            color: 'var(--md-sys-color-on-surface)',
            border: '1px solid var(--md-sys-color-outline-variant)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 120ms ease',
          }}
        >
          {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>

      {/* Right Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
        {/* Template Selector with M3 styling */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <LayoutTemplate size={14} color="var(--md-sys-color-on-surface-variant)" />
          <select
            onChange={(e) => onSelectTemplate(e.target.value)}
            defaultValue="starter_tutorial"
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--md-shape-sm)',
              border: '1px solid var(--md-sys-color-outline-variant)',
              backgroundColor: 'var(--md-sys-color-surface-container)',
              color: 'var(--md-sys-color-on-surface)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              outline: 'none',
              boxShadow: 'var(--md-elevation-1)',
            }}
          >
            <option value="empty">Lienzo en Blanco</option>
            {BUILDER_TEMPLATES.map((tmpl) => (
              <option key={tmpl.id} value={tmpl.id}>
                {tmpl.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tutorial Toggle */}
        {isEditMode && (
          <button
            type="button"
            onClick={onToggleTutorial}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--md-shape-full)',
              border: '1px solid var(--md-sys-color-primary)',
              backgroundColor: showTutorial ? 'var(--md-sys-color-primary-container)' : 'transparent',
              color: showTutorial ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-primary)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: 'all 120ms ease',
            }}
          >
            <HelpCircle size={14} />
            <span>Guia</span>
          </button>
        )}

        {/* Edit / In-Canvas Preview Toggle */}
        <button
          type="button"
          onClick={onToggleEditMode}
          title={isEditMode ? 'Ver vista previa en este lienzo' : 'Volver a modo edicion'}
          style={{
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--md-shape-full)',
            border: '1px solid var(--md-sys-color-outline-variant)',
            backgroundColor: 'var(--md-sys-color-surface-container)',
            color: 'var(--md-sys-color-on-surface)',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            transition: 'all 120ms ease',
          }}
        >
          {isEditMode ? <Eye size={14} /> : <EyeOff size={14} />}
          <span>{isEditMode ? 'Previsualizar' : 'Editar'}</span>
        </button>

        {/* Launch Full Live Store in New Window Tab */}
        <button
          type="button"
          onClick={onOpenLivePreview}
          title="Abrir tienda completa en nueva pestana sin interfaz de edicion"
          style={{
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--md-shape-full)',
            border: '1px solid var(--md-sys-color-outline-variant)',
            backgroundColor: 'var(--md-sys-color-surface-container-high)',
            color: 'var(--md-sys-color-primary)',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'transform 100ms ease',
          }}
        >
          <ExternalLink size={14} />
          <span>Abrir Tienda</span>
        </button>

        {/* Save Store */}
        <button
          type="button"
          onClick={onSave}
          title="Guardar diseno completo de todas las paginas"
          style={{
            padding: '0.35rem 1rem',
            borderRadius: 'var(--md-shape-full)',
            border: 'none',
            backgroundColor: 'var(--md-sys-color-primary)',
            color: 'var(--md-sys-color-on-primary)',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            boxShadow: 'var(--md-elevation-1)',
            transition: 'transform 100ms ease, box-shadow 100ms ease',
          }}
        >
          <Save size={14} />
          <span>Guardar</span>
        </button>

        {/* Export JSON */}
        <button
          type="button"
          onClick={onExport}
          title="Descargar respaldo JSON de tus paginas"
          style={{
            padding: '0.35rem 0.65rem',
            borderRadius: 'var(--md-shape-full)',
            border: '1px solid var(--md-sys-color-outline-variant)',
            backgroundColor: 'var(--md-sys-color-surface-container)',
            color: 'var(--md-sys-color-on-surface-variant)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 100ms ease',
          }}
        >
          <Download size={14} />
        </button>
      </div>

      {/* Page Tab Metadata Editor Modal */}
      {editingPage && (
        <PageTabEditorModal
          isOpen={Boolean(editingPage)}
          page={editingPage}
          onClose={() => setEditingPage(null)}
          onSave={onUpdatePage}
        />
      )}
    </header>
  );
}

export default BuilderHeader;
