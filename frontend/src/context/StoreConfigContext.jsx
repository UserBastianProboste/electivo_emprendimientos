/*
 * Module: StoreConfigContext
 * Description: React context managing M3 theme application, light/dark color modes, dynamic favicon, and store state
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of StoreConfigContext with dynamic favicon and theme injection.
 * - 2026-10-15 [v0.2.0]: Material Design 3 (M3) support with light/dark color modes and refined defaults.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getStoreConfig, updateStoreConfig } from '../services/api';

const StoreConfigContext = createContext(null);

const DEFAULT_CONFIG = {
  id: null,
  store_name: 'Tienda & Estudio',
  hero_title: 'Diseño, Calidad y Autenticidad en Cada Detalle',
  hero_subtitle: 'Descubre una cuidada selección de productos creados con dedicación, sostenibilidad y excelencia.',
  hero_cta_text: 'Explorar Catálogo',
  theme_id: 1,
  color_mode: 'light',
  logo_url: '',
  favicon_url: '',
  catalog_layout: 'grid-3',
  updated_at: null,
};

export function StoreConfigProvider({ children }) {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Apply M3 theme and color mode to root document element
  const applyBranding = useCallback((currentConfig) => {
    const themeId = currentConfig.theme_id || 1;
    const colorMode = currentConfig.color_mode || 'light';

    document.documentElement.setAttribute('data-theme', String(themeId));
    document.documentElement.setAttribute('data-color-mode', colorMode);

    // Dynamic Favicon Injection (RF-01.2)
    const faviconElement =
      document.getElementById('app-dynamic-favicon') ||
      document.querySelector("link[rel*='icon']");

    if (faviconElement) {
      if (currentConfig.favicon_url && currentConfig.favicon_url.trim()) {
        faviconElement.href = currentConfig.favicon_url;
      } else {
        // Fallback SVG favicon using M3 seed
        const themeColors = {
          1: '%23415F91', // M3 Sapphire Blue
          2: '%23386A20', // M3 Sage Green
          3: '%238B5022', // M3 Warm Terracotta
          4: '%234A5F76', // M3 Slate Quartz
        };
        const color = themeColors[themeId] || '%23415F91';
        faviconElement.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${color}'><circle cx='12' cy='12' r='10'/></svg>`;
      }
    }

    // Dynamic Title
    if (currentConfig.store_name) {
      document.title = `${currentConfig.store_name} | Catálogo Oficial`;
    }
  }, []);

  const loadConfig = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStoreConfig();
      setConfig(data);
      applyBranding(data);
    } catch (err) {
      console.warn('Could not load remote store config, using local defaults:', err.message);
      setError(err.message);
      applyBranding(DEFAULT_CONFIG);
    } finally {
      setLoading(false);
    }
  }, [applyBranding]);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  const saveConfig = async (payload) => {
    try {
      setError(null);
      const updated = await updateStoreConfig(payload);
      setConfig(updated);
      applyBranding(updated);
      return { success: true, data: updated };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const previewConfig = (tempOverrides) => {
    const merged = { ...config, ...tempOverrides };
    setConfig(merged);
    applyBranding(merged);
  };

  const toggleColorMode = async () => {
    const nextMode = config.color_mode === 'dark' ? 'light' : 'dark';
    previewConfig({ color_mode: nextMode });
    await saveConfig({ color_mode: nextMode });
  };

  return (
    <StoreConfigContext.Provider
      value={{
        config,
        loading,
        error,
        saveConfig,
        previewConfig,
        toggleColorMode,
        refreshConfig: loadConfig,
      }}
    >
      {children}
    </StoreConfigContext.Provider>
  );
}

export function useStoreConfig() {
  const context = useContext(StoreConfigContext);
  if (!context) {
    throw new Error('useStoreConfig must be used within a StoreConfigProvider');
  }
  return context;
}
