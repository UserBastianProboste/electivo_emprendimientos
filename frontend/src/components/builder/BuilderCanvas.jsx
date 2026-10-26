/*
 * Module: BuilderCanvas
 * Description: Interactive drag-and-drop workspace rendering the responsive viewport and drop target areas
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of builder canvas with responsive framing.
 * - 2026-10-26 [v1.3.0]: Added animated insertion drop zones between widgets, mobile frame polish, and index-based dropping.
 */

import React, { useState } from 'react';
import { WidgetRenderer } from './WidgetRenderer';
import { Sparkles, Plus, LayoutTemplate, Smartphone } from 'lucide-react';

export function BuilderCanvas({
  widgets = [],
  deviceViewport = 'desktop',
  selectedWidgetId,
  isEditMode,
  onSelectWidget,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onDropWidget,
  onLoadStarterTemplate,
  onNavigate,
}) {
  const [activeDropIndex, setActiveDropIndex] = useState(null);

  const handleDragOverSlot = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    if (activeDropIndex !== index) {
      setActiveDropIndex(index);
    }
  };

  const handleDragLeaveSlot = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDropOnSlot = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropIndex(null);
    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (dataStr) {
        const widgetDef = JSON.parse(dataStr);
        onDropWidget(widgetDef, index);
      }
    } catch (err) {
      console.warn('Error parsing dropped widget data:', err);
    }
  };

  // Viewport width styling
  const isMobile = deviceViewport === 'mobile';
  const isTablet = deviceViewport === 'tablet';
  const isFramed = isMobile || isTablet;

  const viewportWidth = isMobile ? '390px' : isTablet ? '768px' : '100%';

  return (
    <main
      style={{
        flex: 1,
        overflowY: 'auto',
        backgroundColor: 'var(--md-sys-color-surface-container-lowest)',
        padding: isFramed ? '2rem 1rem' : '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100%',
        position: 'relative',
        scrollBehavior: 'smooth',
      }}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={() => setActiveDropIndex(null)}
    >
      <div
        style={{
          width: viewportWidth,
          maxWidth: '1200px',
          backgroundColor: isFramed ? 'var(--md-sys-color-surface)' : 'transparent',
          borderRadius: isFramed ? '36px' : '0',
          border: isFramed ? '10px solid var(--md-sys-color-surface-container-highest)' : 'none',
          boxShadow: isFramed ? '0 20px 48px rgba(0,0,0,0.35)' : 'none',
          padding: isFramed ? '1rem 0.85rem' : '0',
          transition: 'width 200ms cubic-bezier(0.2, 0, 0, 1), padding 200ms ease',
          minHeight: '650px',
          overflowX: 'hidden',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Mobile Device Simulation Top Notch */}
        {isMobile && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.4rem 0 0.85rem 0',
              borderBottom: '1px solid var(--md-sys-color-outline-variant)',
              marginBottom: '0.75rem',
            }}
          >
            <div
              style={{
                width: '110px',
                height: '14px',
                backgroundColor: 'var(--md-sys-color-surface-container-highest)',
                borderRadius: 'var(--md-shape-full)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--md-sys-color-outline)' }} />
              <div style={{ width: '38px', height: '4px', borderRadius: 'var(--md-shape-full)', backgroundColor: 'var(--md-sys-color-outline)' }} />
            </div>
          </div>
        )}

        {/* Empty State */}
        {widgets.length === 0 ? (
          <div
            onDragOver={(e) => handleDragOverSlot(e, 0)}
            onDrop={(e) => handleDropOnSlot(e, 0)}
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              border: activeDropIndex === 0
                ? '2px dashed var(--md-sys-color-primary)'
                : '2px dashed var(--md-sys-color-outline-variant)',
              borderRadius: 'var(--md-shape-xl)',
              backgroundColor: activeDropIndex === 0
                ? 'var(--md-sys-color-primary-container)'
                : 'var(--md-sys-color-surface-container-low)',
              transition: 'all 150ms ease',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--md-shape-md)',
                backgroundColor: 'var(--md-sys-color-primary-container)',
                color: 'var(--md-sys-color-primary)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <Sparkles size={28} />
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)', marginBottom: '0.5rem' }}>
              Tu Lienzo Esta Listo
            </h3>

            <p style={{ fontSize: '0.925rem', color: 'var(--md-sys-color-on-surface-variant)', maxWidth: '480px', margin: '0 auto 1.75rem auto', lineHeight: 1.6 }}>
              Arrastra cualquier bloque desde la barra lateral izquierda o comienza con una plantilla disenada para orientar a nuevos clientes.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={onLoadStarterTemplate}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--md-sys-color-primary)',
                  color: 'var(--md-sys-color-on-primary)',
                  border: 'none',
                  borderRadius: 'var(--md-shape-full)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  boxShadow: 'var(--md-elevation-1)',
                  transition: 'transform 100ms ease',
                }}
              >
                <LayoutTemplate size={16} />
                <span>Cargar Plantilla Tutorial</span>
              </button>
            </div>
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            {widgets.map((widget, idx) => {
              const isOverThisTopSlot = activeDropIndex === idx;

              return (
                <React.Fragment key={widget.id || idx}>
                  {/* Drop Indicator Before Widget */}
                  {isEditMode && (
                    <div
                      onDragOver={(e) => handleDragOverSlot(e, idx)}
                      onDragLeave={handleDragLeaveSlot}
                      onDrop={(e) => handleDropOnSlot(e, idx)}
                      style={{
                        height: isOverThisTopSlot ? '54px' : '10px',
                        margin: isOverThisTopSlot ? '0.65rem 0' : '2px 0',
                        borderRadius: 'var(--md-shape-md)',
                        border: isOverThisTopSlot
                          ? '2px dashed var(--md-sys-color-primary)'
                          : '2px dashed transparent',
                        backgroundColor: isOverThisTopSlot
                          ? 'var(--md-sys-color-primary-container)'
                          : 'transparent',
                        color: 'var(--md-sys-color-on-primary-container)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '0.825rem',
                        fontWeight: 700,
                        transition: 'all 140ms cubic-bezier(0.2, 0, 0, 1)',
                        overflow: 'hidden',
                      }}
                    >
                      {isOverThisTopSlot && (
                        <>
                          <Plus size={16} />
                          <span>Soltar aqui para insertar en Posicion #{idx + 1}</span>
                        </>
                      )}
                    </div>
                  )}

                  <WidgetRenderer
                    widget={widget}
                    index={idx}
                    totalWidgets={widgets.length}
                    isSelected={widget.id === selectedWidgetId}
                    isEditMode={isEditMode}
                    deviceViewport={deviceViewport}
                    onSelect={onSelectWidget}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    onDuplicate={onDuplicate}
                    onDelete={onDelete}
                    onNavigate={onNavigate}
                  />
                </React.Fragment>
              );
            })}

            {/* Bottom Drop Zone Indicator */}
            {isEditMode && (
              <div
                onDragOver={(e) => handleDragOverSlot(e, widgets.length)}
                onDragLeave={handleDragLeaveSlot}
                onDrop={(e) => handleDropOnSlot(e, widgets.length)}
                style={{
                  margin: '1.25rem 0',
                  padding: activeDropIndex === widgets.length ? '1.5rem' : '1.15rem',
                  borderRadius: 'var(--md-shape-lg)',
                  border: activeDropIndex === widgets.length
                    ? '2px dashed var(--md-sys-color-primary)'
                    : '1px dashed var(--md-sys-color-outline-variant)',
                  backgroundColor: activeDropIndex === widgets.length
                    ? 'var(--md-sys-color-primary-container)'
                    : 'var(--md-sys-color-surface-container-low)',
                  color: activeDropIndex === widgets.length
                    ? 'var(--md-sys-color-on-primary-container)'
                    : 'var(--md-sys-color-on-surface-variant)',
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 140ms ease',
                  cursor: 'pointer',
                }}
              >
                <Plus size={16} color="var(--md-sys-color-primary)" />
                <span>
                  {activeDropIndex === widgets.length
                    ? `Soltar aqui para insertar al final (Posicion #${widgets.length + 1})`
                    : 'Arrastra y suelta nuevos bloques aqui para agregarlos a tu pagina'}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default BuilderCanvas;
