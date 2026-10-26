/*
 * Module: PreflightWarningModal
 * Description: Accessible M3 modal warning users about broken links, placeholder copy, and orphaned pages before publishing
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of preflight warning dialog with correction shortcuts.
 */

import React from 'react';
import { AlertTriangle, Info, CheckCircle2, ArrowRight, X, ExternalLink } from 'lucide-react';

export function PreflightWarningModal({
  isOpen,
  warnings = [],
  onClose,
  onProceedAnyway,
  onFixWarning,
}) {
  if (!isOpen) return null;

  const warningCount = warnings.filter((w) => w.severity === 'warning').length;
  const infoCount = warnings.filter((w) => w.severity === 'info').length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(6px)',
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
          maxWidth: '680px',
          maxHeight: '85vh',
          backgroundColor: 'var(--md-sys-color-surface)',
          borderRadius: 'var(--md-shape-xl)',
          border: '1px solid var(--md-sys-color-outline-variant)',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.35)',
          display: 'flex',
          flexDirection: 'column',
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
            backgroundColor: 'var(--md-sys-color-surface-container-high)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: warningCount > 0 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                color: warningCount > 0 ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: 'var(--md-sys-color-on-surface)',
                  letterSpacing: '-0.02em',
                }}
              >
                Revision de tu Tienda antes de Guardar
              </h3>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--md-sys-color-on-surface-variant)' }}>
                Se detectaron {warnings.length} observaciones ({warningCount} advertencias, {infoCount} sugerencias).
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--md-sys-color-on-surface-variant)',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 'var(--md-shape-sm)',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Warning List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          {warnings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <CheckCircle2 size={40} color="var(--md-sys-color-primary)" style={{ marginBottom: '0.75rem' }} />
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', color: 'var(--md-sys-color-on-surface)' }}>
                Todo se encuentra listo y configurado
              </h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--md-sys-color-on-surface-variant)' }}>
                No hay enlaces rotos, botones sin accion ni textos de prueba pendientes.
              </p>
            </div>
          ) : (
            warnings.map((warn) => {
              const isWarning = warn.severity === 'warning';
              return (
                <div
                  key={warn.id}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--md-shape-md)',
                    backgroundColor: isWarning
                      ? 'var(--md-sys-color-surface-container)'
                      : 'var(--md-sys-color-surface-container-low)',
                    borderLeft: `4px solid ${isWarning ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-primary)'}`,
                    borderTop: '1px solid var(--md-sys-color-outline-variant)',
                    borderRight: '1px solid var(--md-sys-color-outline-variant)',
                    borderBottom: '1px solid var(--md-sys-color-outline-variant)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          padding: '0.15rem 0.45rem',
                          borderRadius: 'var(--md-shape-full)',
                          backgroundColor: isWarning ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-primary)',
                          color: '#ffffff',
                          textTransform: 'uppercase',
                        }}
                      >
                        {isWarning ? 'Atencion' : 'Sugerencia'}
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)' }}>
                        Pagina: {warn.pageLabel}
                      </span>
                    </div>

                    {onFixWarning && (
                      <button
                        type="button"
                        onClick={() => onFixWarning(warn)}
                        style={{
                          padding: '0.25rem 0.65rem',
                          borderRadius: 'var(--md-shape-full)',
                          border: '1px solid var(--md-sys-color-primary)',
                          backgroundColor: 'transparent',
                          color: 'var(--md-sys-color-primary)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          transition: 'all 120ms ease',
                        }}
                      >
                        <span>Ir a corregir</span>
                        <ArrowRight size={13} />
                      </button>
                    )}
                  </div>

                  <h5 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
                    {warn.title}
                  </h5>

                  <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.45 }}>
                    {warn.description}
                  </p>

                  <div
                    style={{
                      fontSize: '0.775rem',
                      color: 'var(--md-sys-color-primary)',
                      fontWeight: 600,
                      marginTop: '0.2rem',
                    }}
                  >
                    Solucion recomendada: {warn.remediation}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid var(--md-sys-color-outline-variant)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            backgroundColor: 'var(--md-sys-color-surface-container)',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '0.55rem 1.15rem',
              borderRadius: 'var(--md-shape-full)',
              border: '1px solid var(--md-sys-color-outline-variant)',
              backgroundColor: 'transparent',
              color: 'var(--md-sys-color-on-surface)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Volver al Editor
          </button>

          <button
            type="button"
            onClick={onProceedAnyway}
            style={{
              padding: '0.55rem 1.4rem',
              borderRadius: 'var(--md-shape-full)',
              border: 'none',
              backgroundColor: 'var(--md-sys-color-primary)',
              color: 'var(--md-sys-color-on-primary)',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              boxShadow: 'var(--md-elevation-1)',
            }}
          >
            <span>Guardar y Continuar de Todos Modos</span>
            <ExternalLink size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreflightWarningModal;
