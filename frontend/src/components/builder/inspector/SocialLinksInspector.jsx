/*
 * Module: SocialLinksInspector
 * Description: Inspector configuration panel for social networks and external channel URLs (Widget 22)
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial modular implementation of social links editor.
 */

import React from 'react';
import { Plus, Trash2, ExternalLink, Share2, Globe } from 'lucide-react';

const POPULAR_NETWORKS = [
  'Instagram',
  'Facebook',
  'LinkedIn',
  'WhatsApp',
  'YouTube',
  'TikTok',
  'X',
  'Pinterest',
];

export function SocialLinksInspector({ currentProps = {}, onFieldChange, onNestedFieldChange }) {
  const networks = currentProps.networks || ['Instagram', 'Facebook', 'LinkedIn', 'WhatsApp'];
  const urls = currentProps.urls || {};
  const openNewTab = currentProps.open_new_tab !== false;

  const handleToggleNetwork = (netName) => {
    let nextNetworks;
    if (networks.includes(netName)) {
      nextNetworks = networks.filter((n) => n !== netName);
    } else {
      nextNetworks = [...networks, netName];
      if (!urls[netName]) {
        onNestedFieldChange('urls', netName, `https://${netName.toLowerCase()}.com`);
      }
    }
    onFieldChange('networks', nextNetworks);
  };

  const handleAddCustomNetwork = () => {
    const customName = prompt('Ingresa el nombre de la red social o canal (ej. Telegram, Discord):');
    if (!customName || !customName.trim()) return;
    const cleanName = customName.trim();
    if (!networks.includes(cleanName)) {
      onFieldChange('networks', [...networks, cleanName]);
      onNestedFieldChange('urls', cleanName, 'https://');
    }
  };

  return (
    <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
        <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
          Redes Sociales Activas ({networks.length})
        </h4>
        <button
          type="button"
          onClick={handleAddCustomNetwork}
          style={{
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--md-shape-full)',
            border: 'none',
            backgroundColor: 'var(--md-sys-color-primary)',
            color: 'var(--md-sys-color-on-primary)',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <Plus size={13} />
          <span>Otra Red</span>
        </button>
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--md-sys-color-on-surface-variant)', margin: '0 0 0.75rem 0' }}>
        Haz clic en cada red para activarla o desactivarla, y define su enlace de destino abajo:
      </p>

      {/* Network Chips Toggle */}
      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {POPULAR_NETWORKS.map((net) => {
          const isActive = networks.includes(net);
          return (
            <button
              key={net}
              type="button"
              onClick={() => handleToggleNetwork(net)}
              style={{
                padding: '0.35rem 0.7rem',
                borderRadius: 'var(--md-shape-full)',
                border: isActive
                  ? '1px solid var(--md-sys-color-primary)'
                  : '1px solid var(--md-sys-color-outline-variant)',
                backgroundColor: isActive
                  ? 'var(--md-sys-color-primary-container)'
                  : 'var(--md-sys-color-surface-container)',
                color: isActive
                  ? 'var(--md-sys-color-on-primary-container)'
                  : 'var(--md-sys-color-on-surface-variant)',
                fontSize: '0.75rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 100ms ease',
              }}
            >
              {isActive ? `✓ ${net}` : `+ ${net}`}
            </button>
          );
        })}
      </div>

      {/* URL Inputs for Active Networks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
        {networks.map((net) => (
          <div
            key={net}
            style={{
              padding: '0.65rem',
              borderRadius: 'var(--md-shape-md)',
              backgroundColor: 'var(--md-sys-color-surface-container)',
              border: '1px solid var(--md-sys-color-outline-variant)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--md-sys-color-primary)' }}>
                {net}
              </span>
              <button
                type="button"
                onClick={() => handleToggleNetwork(net)}
                title="Quitar red"
                style={{ background: 'none', border: 'none', color: 'var(--md-sys-color-error)', cursor: 'pointer', padding: 0 }}
              >
                <Trash2 size={13} />
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder={`URL de tu cuenta de ${net} (ej. https://${net.toLowerCase()}.com/tu_pagina)`}
                value={urls[net] || ''}
                onChange={(e) => onNestedFieldChange('urls', net, e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.45rem 0.65rem 0.45rem 2rem',
                  borderRadius: 'var(--md-shape-sm)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  color: 'var(--md-sys-color-on-surface)',
                  fontSize: '0.8rem',
                  boxSizing: 'border-box',
                  fontFamily: 'var(--font-mono)',
                }}
              />
              <Globe
                size={13}
                color="var(--md-sys-color-on-surface-variant)"
                style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Open in New Tab Toggle */}
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: 'var(--md-sys-color-on-surface)',
          cursor: 'pointer',
        }}
      >
        <input
          type="checkbox"
          checked={openNewTab}
          onChange={(e) => onFieldChange('open_new_tab', e.target.checked)}
          style={{ accentColor: 'var(--md-sys-color-primary)', cursor: 'pointer' }}
        />
        <span>Abrir enlaces en pestana nueva del navegador</span>
      </label>
    </div>
  );
}
