/*
 * Module: WidgetWireframePeek
 * Description: Highly visual wireframe illustration renderer for widget hover previews tailored for non-technical entrepreneurs
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of visual wireframe peek illustrations.
 */

import React from 'react';

export function WidgetWireframePeek({ widgetDef }) {
  if (!widgetDef) return null;

  const type = widgetDef.type;

  const wireframeContainerStyle = {
    width: '100%',
    height: '110px',
    backgroundColor: 'var(--md-sys-color-surface-container-lowest)',
    borderRadius: 'var(--md-shape-md)',
    border: '1px solid var(--md-sys-color-outline-variant)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.5rem',
    boxSizing: 'border-box',
    position: 'relative',
  };

  switch (type) {
    case 'hero_banner':
      return (
        <div style={{ ...wireframeContainerStyle, backgroundColor: '#1a2233', color: '#fff', textAlign: 'center' }}>
          <div style={{ width: '40px', height: '6px', borderRadius: '4px', backgroundColor: 'var(--md-sys-color-primary)', marginBottom: '5px' }} />
          <div style={{ width: '120px', height: '10px', borderRadius: '3px', backgroundColor: '#ffffff', marginBottom: '5px' }} />
          <div style={{ width: '90px', height: '6px', borderRadius: '3px', backgroundColor: 'rgba(255,255,255,0.6)', marginBottom: '8px' }} />
          <div style={{ display: 'flex', gap: '4px' }}>
            <div style={{ width: '45px', height: '14px', borderRadius: '8px', backgroundColor: 'var(--md-sys-color-primary)' }} />
            <div style={{ width: '40px', height: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.5)' }} />
          </div>
        </div>
      );

    case 'cards_grid':
      return (
        <div style={{ ...wireframeContainerStyle, flexDirection: 'row', gap: '6px', padding: '8px' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ flex: 1, height: '100%', backgroundColor: 'var(--md-sys-color-surface-container)', borderRadius: '4px', padding: '4px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div style={{ height: '45px', backgroundColor: 'var(--md-sys-color-surface-container-high)', borderRadius: '3px' }} />
              <div style={{ height: '6px', width: '80%', backgroundColor: 'var(--md-sys-color-on-surface)', opacity: 0.8, borderRadius: '2px' }} />
              <div style={{ height: '4px', width: '60%', backgroundColor: 'var(--md-sys-color-primary)', borderRadius: '2px' }} />
            </div>
          ))}
        </div>
      );

    case 'product_card':
      return (
        <div style={{ ...wireframeContainerStyle, width: '100px', margin: '0 auto', padding: '6px' }}>
          <div style={{ width: '100%', height: '55px', backgroundColor: 'var(--md-sys-color-surface-container-high)', borderRadius: '4px', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '2px', left: '2px', width: '18px', height: '6px', backgroundColor: 'var(--md-sys-color-primary)', borderRadius: '3px' }} />
          </div>
          <div style={{ width: '80%', height: '6px', backgroundColor: 'var(--md-sys-color-on-surface)', opacity: 0.8, marginTop: '5px', borderRadius: '2px' }} />
          <div style={{ width: '50%', height: '6px', backgroundColor: 'var(--md-sys-color-primary)', marginTop: '3px', borderRadius: '2px' }} />
          <div style={{ width: '100%', height: '12px', backgroundColor: 'var(--md-sys-color-primary)', borderRadius: '3px', marginTop: '4px' }} />
        </div>
      );

    case 'membership_plans':
      return (
        <div style={{ ...wireframeContainerStyle, flexDirection: 'row', gap: '5px', padding: '6px' }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: '100%',
                backgroundColor: i === 2 ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface-container)',
                border: i === 2 ? '1px solid var(--md-sys-color-primary)' : '1px solid var(--md-sys-color-outline-variant)',
                borderRadius: '4px',
                padding: '4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <div style={{ width: '60%', height: '5px', backgroundColor: 'var(--md-sys-color-on-surface)', borderRadius: '2px' }} />
              <div style={{ width: '80%', height: '8px', backgroundColor: 'var(--md-sys-color-primary)', borderRadius: '2px' }} />
              <div style={{ width: '70%', height: '3px', backgroundColor: 'var(--md-sys-color-outline)', borderRadius: '1px' }} />
              <div style={{ width: '70%', height: '3px', backgroundColor: 'var(--md-sys-color-outline)', borderRadius: '1px' }} />
              <div style={{ width: '90%', height: '10px', backgroundColor: 'var(--md-sys-color-primary)', borderRadius: '4px', marginTop: 'auto' }} />
            </div>
          ))}
        </div>
      );

    case 'checkout_flow':
      return (
        <div style={{ ...wireframeContainerStyle, padding: '10px', alignItems: 'stretch' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            {[1, 2, 3, 4].map((s) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: s === 1 ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface-container-high)', color: '#fff', fontSize: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {s}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
            <div style={{ flex: 1, height: '16px', backgroundColor: 'var(--md-sys-color-surface-container)', borderRadius: '2px' }} />
            <div style={{ flex: 1, height: '16px', backgroundColor: 'var(--md-sys-color-surface-container)', borderRadius: '2px' }} />
          </div>
          <div style={{ width: '60px', height: '16px', backgroundColor: 'var(--md-sys-color-primary)', borderRadius: '8px', marginLeft: 'auto' }} />
        </div>
      );

    case 'faq_accordion':
      return (
        <div style={{ ...wireframeContainerStyle, padding: '8px', gap: '4px', alignItems: 'stretch' }}>
          {[1, 2, 3].map((f) => (
            <div key={f} style={{ height: f === 1 ? '34px' : '18px', backgroundColor: 'var(--md-sys-color-surface-container)', borderRadius: '3px', padding: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ width: '70%', height: '5px', backgroundColor: 'var(--md-sys-color-on-surface)', opacity: 0.8, borderRadius: '2px' }} />
                <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--md-sys-color-primary)', borderRadius: '1px' }} />
              </div>
              {f === 1 && (
                <span style={{ width: '90%', height: '4px', backgroundColor: 'var(--md-sys-color-outline)', opacity: 0.7, borderRadius: '1px', marginTop: '4px' }} />
              )}
            </div>
          ))}
        </div>
      );

    case 'generic_form':
      return (
        <div style={{ ...wireframeContainerStyle, padding: '8px', alignItems: 'stretch', gap: '4px' }}>
          <div style={{ width: '40%', height: '6px', backgroundColor: 'var(--md-sys-color-primary)', borderRadius: '2px', marginBottom: '2px' }} />
          <div style={{ width: '100%', height: '14px', backgroundColor: 'var(--md-sys-color-surface-container)', borderRadius: '2px' }} />
          <div style={{ width: '100%', height: '14px', backgroundColor: 'var(--md-sys-color-surface-container)', borderRadius: '2px' }} />
          <div style={{ width: '50px', height: '14px', backgroundColor: 'var(--md-sys-color-primary)', borderRadius: '7px', alignSelf: 'flex-start', marginTop: '2px' }} />
        </div>
      );

    case 'text_image':
      return (
        <div style={{ ...wireframeContainerStyle, flexDirection: 'row', gap: '8px', padding: '8px' }}>
          <div style={{ width: '70px', height: '100%', backgroundColor: 'var(--md-sys-color-surface-container-high)', borderRadius: '4px' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}>
            <div style={{ width: '90%', height: '8px', backgroundColor: 'var(--md-sys-color-on-surface)', borderRadius: '2px' }} />
            <div style={{ width: '100%', height: '5px', backgroundColor: 'var(--md-sys-color-outline)', borderRadius: '2px' }} />
            <div style={{ width: '70%', height: '5px', backgroundColor: 'var(--md-sys-color-outline)', borderRadius: '2px' }} />
            <div style={{ width: '45px', height: '12px', backgroundColor: 'var(--md-sys-color-primary)', borderRadius: '6px', marginTop: '4px' }} />
          </div>
        </div>
      );

    case 'video_gallery':
      return (
        <div style={{ ...wireframeContainerStyle, backgroundColor: '#090d16', position: 'relative' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--md-sys-color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px' }}>
            ▶
          </div>
          <div style={{ position: 'absolute', bottom: '6px', left: '10px', width: '100px', height: '5px', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: '2px' }} />
        </div>
      );

    default:
      return (
        <div style={{ ...wireframeContainerStyle, padding: '8px' }}>
          <div style={{ width: '60%', height: '8px', backgroundColor: 'var(--md-sys-color-primary)', borderRadius: '3px', marginBottom: '6px' }} />
          <div style={{ width: '90%', height: '5px', backgroundColor: 'var(--md-sys-color-on-surface)', opacity: 0.7, borderRadius: '2px', marginBottom: '4px' }} />
          <div style={{ width: '80%', height: '5px', backgroundColor: 'var(--md-sys-color-outline)', opacity: 0.6, borderRadius: '2px', marginBottom: '6px' }} />
          <div style={{ width: '40px', height: '12px', backgroundColor: 'var(--md-sys-color-primary)', borderRadius: '6px' }} />
        </div>
      );
  }
}

export default WidgetWireframePeek;
