/*
 * Module: StoreConfigContext
 * Description: React context managing theme application, dynamic favicon injection, and store state
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of StoreConfigContext with dynamic favicon and theme injection.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getStoreConfig, updateStoreConfig } from '../services/api';

const StoreConfigContext = createContext(null);

const DEFAULT_CONFIG = {
  id: null,
  store_name: 'Mi Emprendimiento Comunitario',
  hero_title: 'Impulsa tu Negocio Local con Nuestra Vitrina Digital',
  hero_subtitle: 'Descubre productos artesanales, sostenibles y de alta calidad elaborados por emprendedores de nuestra comunidad.',
  hero_cta_text: 'Explorar Catálogo',
  theme_id: 1,
  logo_url: '',
  favicon_url: '',
  catalog_layout: 'grid-3',
  updated_at: null,
};

export function StoreConfigProvider({ children }) {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Apply theme to root document element and update favicon
  const applyBranding = useCallback((currentConfig) => {
    const themeId = currentConfig.theme_id || 1;
    document.documentElement.setAttribute('data-theme', String(themeId));

    // Dynamic Favicon Injection (RF-01.2)
    const faviconElement = document.getElementById('app-dynamic-favicon') ||
      document.querySelector("link[rel*='icon']");

    if (faviconElement) {
      if (currentConfig.favicon_url && currentConfig.favicon_url.trim()) {
        faviconElement.href = currentConfig.favicon_url;
      } else {
        // Fallback SVG favicon matching active theme color
        const themeColors = {
          1: '%2310b981', // Emerald
          2: '%230284c7', // Ocean Sky
          3: '%23059669', // Forest Green
          4: '%23d97706', // Warm Amber
        };
        const color = themeColors[themeId] || '%2310b981';
        faviconElement.href = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${color}'><circle cx='12' cy='12' r='10'/></svg>`;
      }
    }

    // Dynamic Title
    if (currentConfig.store_name) {
      document.title = `${currentConfig.store_name} | Plataforma E-commerce`;
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

  return (
    <StoreConfigContext.Provider
      value={{
        config,
        loading,
        error,
        saveConfig,
        previewConfig,
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
