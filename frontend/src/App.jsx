/*
 * Module: App
 * Description: Main React application entry point providing theme context, master builder view, and standalone published store route
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial routing implementation.
 * - 2026-10-26 [v1.1.0]: Streamlined to unified Drag and Drop visual builder workspace.
 * - 2026-10-26 [v1.2.0]: Added standalone live store preview route (/preview and ?view=live).
 */

import React, { useState, useEffect } from 'react';
import { StoreConfigProvider } from './context/StoreConfigContext';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { PublishedStorePage } from './pages/PublishedStorePage';

export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [searchParams, setSearchParams] = useState(window.location.search);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setSearchParams(window.location.search);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const isLivePreview = currentPath === '/preview' || searchParams.includes('view=live');

  return (
    <StoreConfigProvider>
      {isLivePreview ? (
        <PublishedStorePage />
      ) : (
        <Layout>
          <LandingPage />
        </Layout>
      )}
    </StoreConfigProvider>
  );
}

export default App;
