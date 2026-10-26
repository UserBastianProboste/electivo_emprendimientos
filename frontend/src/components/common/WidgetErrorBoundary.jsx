/*
 * Module: WidgetErrorBoundary
 * Description: React Error Boundary isolating individual widget crashes so the entire builder canvas remains operational
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of resilient widget-level error boundary.
 */

import React from 'react';
import { AlertCircle, RotateCcw, Trash2 } from 'lucide-react';
import { formatFriendlyError } from '../../utils/friendlyErrors';

export class WidgetErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Widget render failure caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const friendly = formatFriendlyError(this.state.error);
      const { widget, onDelete } = this.props;

      return (
        <div
          style={{
            padding: '1.25rem',
            margin: '0.75rem 0',
            borderRadius: 'var(--md-shape-lg)',
            border: '1px solid var(--md-sys-color-outline-variant)',
            backgroundColor: 'var(--md-sys-color-surface-container-low)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--md-sys-color-primary)' }}>
            <AlertCircle size={18} />
            <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800 }}>
              {friendly.title}
            </h4>
          </div>

          <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--md-sys-color-on-surface-variant)' }}>
            {friendly.message} {friendly.suggestion}
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
            <button
              type="button"
              onClick={this.handleReset}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--md-shape-full)',
                border: '1px solid var(--md-sys-color-primary)',
                backgroundColor: 'transparent',
                color: 'var(--md-sys-color-primary)',
                fontSize: '0.775rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <RotateCcw size={13} />
              <span>Reintentar</span>
            </button>

            {onDelete && widget && (
              <button
                type="button"
                onClick={() => onDelete(widget.id)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--md-shape-full)',
                  border: 'none',
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  color: 'var(--md-sys-color-error)',
                  fontSize: '0.775rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                <Trash2 size={13} />
                <span>Quitar este bloque</span>
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default WidgetErrorBoundary;
