/*
 * Module: App
 * Description: Main React component managing routes, global StoreConfigProvider, and layout
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial routing implementation between Landing, Catalog, and Customization panel.
 */

import React, { useState, useEffect } from 'react';
import { StoreConfigProvider } from './context/StoreConfigContext';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { CatalogPage } from './pages/CatalogPage';
import { AdminCustomizationPage } from './pages/AdminCustomizationPage';

export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [initialCategory, setInitialCategory] = useState('');

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const url = new URL(window.location.href);
      setCurrentPath(url.pathname);
      setInitialCategory(url.searchParams.get('category') || '');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (pathWithQuery) => {
    const [path, query] = pathWithQuery.split('?');
    const params = new URLSearchParams(query || '');
    const category = params.get('category') || '';

    setInitialCategory(category);
    setCurrentPath(path);
    window.history.pushState({}, '', pathWithQuery);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/catalogo':
        return <CatalogPage initialCategory={initialCategory} />;
      case '/admin/personalizacion':
        return <AdminCustomizationPage />;
      case '/':
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <StoreConfigProvider>
      <Layout currentPath={currentPath} onNavigate={handleNavigate}>
        {renderCurrentPage()}
      </Layout>
    </StoreConfigProvider>
  );
}

export default App;
