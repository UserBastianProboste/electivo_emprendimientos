/*
 * Module: LandingPage
 * Description: Client-facing Drag and Drop workspace with multi-canvas page routing, vertical widget accordion, and fixed inspector
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of Landing Page.
 * - 2026-10-15 [v0.2.0]: Material Design 3 tokens and neutral aesthetics.
 * - 2026-10-26 [v1.0.0]: Rebuilt as interactive Drag & Drop tutorial workspace for all client profiles with 25 widgets.
 * - 2026-10-26 [v1.1.0]: Multi-canvas page management (/pagina_x), fixed overlay inspector without layout shift, and vertical accordion.
 * - 2026-10-26 [v1.2.0]: Hide tutorial on preview, save-and-open full store in new tab, and interactive button handlers.
 * - 2026-10-26 [v1.3.0]: Added preflight audit warning modal, /#N vertical anchor scrolling, index-based drag drop, and tab renaming.
 */

import React, { useState, useEffect } from 'react';
import { BuilderHeader } from '../components/builder/BuilderHeader';
import { WidgetSidebar } from '../components/builder/WidgetSidebar';
import { BuilderCanvas } from '../components/builder/BuilderCanvas';
import { WidgetPropertyInspector } from '../components/builder/WidgetPropertyInspector';
import { TutorialGuide } from '../components/builder/TutorialGuide';
import { PreflightWarningModal } from '../components/builder/PreflightWarningModal';
import { BUILDER_TEMPLATES } from '../data/builderTemplates';
import { ToastNotificationWidget } from '../components/builder/widgets/StructureNavWidgets';
import { validateStorePages } from '../utils/storeValidator';
import { formatFriendlyError } from '../utils/friendlyErrors';

const PAGES_STORAGE_KEY = 'store_builder_pages_v2';

export function LandingPage() {
  // Load pages from localStorage or initialize with INICIO containing default tutorial template
  const [pages, setPages] = useState(() => {
    try {
      const saved = localStorage.getItem(PAGES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Could not read saved pages from storage:', err);
    }
    return [
      {
        id: 'page-home',
        label: 'INICIO',
        slug: '/',
        widgets: JSON.parse(JSON.stringify(BUILDER_TEMPLATES[0].widgets)),
      },
    ];
  });

  const [currentPageId, setCurrentPageId] = useState('page-home');
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);
  const [deviceViewport, setDeviceViewport] = useState('desktop');
  const [isEditMode, setIsEditMode] = useState(true);
  const [showTutorial, setShowTutorial] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // Preflight validation & warning modal state
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // 'save' | 'open'

  // Calculate store audit warnings
  const auditResult = validateStorePages(pages);

  // Auto-save pages state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(pages));
    } catch (err) {
      console.warn('Could not save pages to storage:', err);
    }
  }, [pages]);

  // Current active page and its widgets
  const activePage = pages.find((p) => p.id === currentPageId) || pages[0];
  const activeWidgets = activePage ? activePage.widgets || [] : [];
  const selectedWidgetIndex = activeWidgets.findIndex((w) => w.id === selectedWidgetId);
  const selectedWidget = activeWidgets[selectedWidgetIndex];

  // Helper to update active page's widgets
  const updateActivePageWidgets = (updater) => {
    setPages((prevPages) =>
      prevPages.map((p) => {
        if (p.id === activePage.id) {
          const nextWidgets = typeof updater === 'function' ? updater(p.widgets || []) : updater;
          return { ...p, widgets: nextWidgets };
        }
        return p;
      })
    );
  };

  // Add Page Tab
  const handleAddPage = () => {
    const pageNumber = pages.length;
    const newPage = {
      id: `page-${Date.now()}`,
      label: `Pagina ${pageNumber}`,
      slug: `/pagina_${pageNumber}`,
      widgets: [],
    };
    setPages((prev) => [...prev, newPage]);
    setCurrentPageId(newPage.id);
    setSelectedWidgetId(null);
    showNotification(`Nueva pagina "${newPage.label}" (${newPage.slug}) creada con lienzo en blanco.`);
  };

  // Update Page Tab Metadata (Name & Route)
  const handleUpdatePage = (pageId, updates) => {
    setPages((prev) =>
      prev.map((p) => (p.id === pageId ? { ...p, ...updates } : p))
    );
    showNotification(`Pestana actualizada a "${updates.label}" (${updates.slug}).`);
  };

  // Delete Page Tab
  const handleDeletePage = (pageId) => {
    if (pageId === 'page-home') return;
    setPages((prev) => prev.filter((p) => p.id !== pageId));
    if (currentPageId === pageId) {
      setCurrentPageId('page-home');
      setSelectedWidgetId(null);
    }
    showNotification('Pagina eliminada correctamente.');
  };

  // Add / Drop Widget (at specified index or end)
  const handleDropWidget = (widgetDef, targetIndex) => {
    const newWidget = {
      id: `w-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      type: widgetDef.type,
      props: JSON.parse(JSON.stringify(widgetDef.defaultProps || {})),
    };
    updateActivePageWidgets((prev) => {
      const next = [...prev];
      if (typeof targetIndex === 'number' && targetIndex >= 0 && targetIndex <= next.length) {
        next.splice(targetIndex, 0, newWidget);
      } else {
        next.push(newWidget);
      }
      return next;
    });
    setSelectedWidgetId(newWidget.id);
    const pos = typeof targetIndex === 'number' ? targetIndex + 1 : activeWidgets.length + 1;
    showNotification(`Bloque "${widgetDef.name}" agregado en la Posicion #${pos}.`);
  };

  // Move Up
  const handleMoveUp = (index) => {
    if (index === 0) return;
    updateActivePageWidgets((prev) => {
      const updated = [...prev];
      const temp = updated[index - 1];
      updated[index - 1] = updated[index];
      updated[index] = temp;
      return updated;
    });
  };

  // Move Down
  const handleMoveDown = (index) => {
    if (index >= activeWidgets.length - 1) return;
    updateActivePageWidgets((prev) => {
      const updated = [...prev];
      const temp = updated[index + 1];
      updated[index + 1] = updated[index];
      updated[index] = temp;
      return updated;
    });
  };

  // Duplicate
  const handleDuplicate = (widgetId) => {
    const target = activeWidgets.find((w) => w.id === widgetId);
    if (!target) return;
    const duplicated = {
      ...target,
      id: `w-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      props: JSON.parse(JSON.stringify(target.props || {})),
    };
    const targetIndex = activeWidgets.findIndex((w) => w.id === widgetId);
    updateActivePageWidgets((prev) => {
      const next = [...prev];
      next.splice(targetIndex + 1, 0, duplicated);
      return next;
    });
    setSelectedWidgetId(duplicated.id);
    showNotification('Bloque duplicado correctamente.');
  };

  // Delete Widget
  const handleDeleteWidget = (widgetId) => {
    updateActivePageWidgets((prev) => prev.filter((w) => w.id !== widgetId));
    if (selectedWidgetId === widgetId) {
      setSelectedWidgetId(null);
    }
    showNotification('Bloque removido del lienzo.');
  };

  // Update Widget Props
  const handleUpdateProps = (widgetId, updatedProps) => {
    updateActivePageWidgets((prev) =>
      prev.map((w) => (w.id === widgetId ? { ...w, props: updatedProps } : w))
    );
  };

  // Select Template for current page
  const handleSelectTemplate = (templateId) => {
    if (templateId === 'empty') {
      updateActivePageWidgets([]);
      setSelectedWidgetId(null);
      showNotification('Lienzo vaciado para nuevo diseno.');
      return;
    }
    const tmpl = BUILDER_TEMPLATES.find((t) => t.id === templateId);
    if (tmpl) {
      updateActivePageWidgets(JSON.parse(JSON.stringify(tmpl.widgets)));
      setSelectedWidgetId(null);
      showNotification(`Plantilla "${tmpl.name}" cargada en esta pagina.`);
    }
  };

  // Reset Canvas to default
  const handleResetCanvas = () => {
    updateActivePageWidgets(JSON.parse(JSON.stringify(BUILDER_TEMPLATES[0].widgets)));
    setSelectedWidgetId(null);
    showNotification('Lienzo restablecido a la portada principal.');
  };

  // Link click handler supporting /#N vertical scroll and /pagina_x routing
  const handleNavigate = (url) => {
    if (!url) return;
    const trimmed = url.trim();

    // Check vertical anchor on current page (e.g. /#1 or #1)
    const anchorMatch = trimmed.match(/^(\/)?#(\d+)$/);
    if (anchorMatch) {
      const posNum = parseInt(anchorMatch[2], 10);
      const targetEl = document.getElementById(`widget-${posNum}`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const targetWidget = activeWidgets[posNum - 1];
        if (targetWidget && isEditMode) {
          setSelectedWidgetId(targetWidget.id);
        }
      } else {
        showNotification(`El bloque vertical #${posNum} no existe en esta pagina.`);
      }
      return;
    }

    // Check internal page navigation (e.g. /catalogo or /pagina_1#2)
    if (trimmed.startsWith('/')) {
      const [pathPart, hashPart] = trimmed.split('#');
      const targetPage = pages.find((p) => p.slug === pathPart);
      if (targetPage) {
        setCurrentPageId(targetPage.id);
        setSelectedWidgetId(null);
        if (hashPart) {
          const posNum = parseInt(hashPart.replace(/\D/g, ''), 10);
          setTimeout(() => {
            const targetEl = document.getElementById(`widget-${posNum}`);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 150);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
    }

    // External link
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      window.open(trimmed, '_blank');
      return;
    }

    // Direct element hash
    if (trimmed.startsWith('#')) {
      const el = document.querySelector(trimmed);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Execute Save Action
  const executeSave = () => {
    try {
      localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(pages));
      showNotification('Diseno guardado con exito.');
    } catch (err) {
      const friendly = formatFriendlyError(err);
      showNotification(`${friendly.title}: ${friendly.message}`);
    }
  };

  // Execute Open Live Store Action
  const executeOpenLivePreview = () => {
    try {
      localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(pages));
      window.open('/preview', '_blank');
    } catch (err) {
      const friendly = formatFriendlyError(err);
      showNotification(`${friendly.title}: ${friendly.message}`);
    }
  };

  // Trigger Save with Preflight Validation
  const handleSaveTrigger = () => {
    if (auditResult.warnings.length > 0) {
      setPendingAction('save');
      setShowWarningModal(true);
      return;
    }
    executeSave();
  };

  // Trigger Open Live Preview with Preflight Validation
  const handleOpenLivePreviewTrigger = () => {
    if (auditResult.warnings.length > 0) {
      setPendingAction('open');
      setShowWarningModal(true);
      return;
    }
    executeOpenLivePreview();
  };

  // Modal proceed anyway
  const handleProceedFromWarningModal = () => {
    setShowWarningModal(false);
    if (pendingAction === 'open') {
      executeOpenLivePreview();
    } else {
      executeSave();
    }
    setPendingAction(null);
  };

  // Modal jump to fix
  const handleFixWarning = (warning) => {
    setShowWarningModal(false);
    setPendingAction(null);
    if (warning.pageId) {
      setCurrentPageId(warning.pageId);
    }
    if (warning.widgetId) {
      setSelectedWidgetId(warning.widgetId);
      setTimeout(() => {
        const targetEl = document.getElementById(`widget-${warning.verticalIndex}`);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 120);
    }
  };

  // Export JSON
  const handleExport = () => {
    try {
      const jsonStr = JSON.stringify(pages, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'paginas-tienda-emprendimiento.json';
      a.click();
      URL.revokeObjectURL(url);
      showNotification('Archivo de paginas JSON descargado correctamente.');
    } catch (err) {
      const friendly = formatFriendlyError(err);
      showNotification(`${friendly.title}: ${friendly.message}`);
    }
  };

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 50px)',
        backgroundColor: 'var(--md-sys-color-background)',
        position: 'relative',
      }}
    >
      {/* Top Header Bar */}
      <BuilderHeader
        pages={pages}
        currentPageId={currentPageId}
        onSelectPage={(id) => {
          setCurrentPageId(id);
          setSelectedWidgetId(null);
        }}
        onAddPage={handleAddPage}
        onDeletePage={handleDeletePage}
        onUpdatePage={handleUpdatePage}
        deviceViewport={deviceViewport}
        onDeviceChange={setDeviceViewport}
        isEditMode={isEditMode}
        onToggleEditMode={() => {
          setIsEditMode(!isEditMode);
          setSelectedWidgetId(null);
        }}
        showTutorial={showTutorial}
        onToggleTutorial={() => setShowTutorial(!showTutorial)}
        onSelectTemplate={handleSelectTemplate}
        onResetCanvas={handleResetCanvas}
        onSave={handleSaveTrigger}
        onOpenLivePreview={handleOpenLivePreviewTrigger}
        onExport={handleExport}
        warningsCount={auditResult.warnings.length}
        onOpenWarnings={() => {
          setPendingAction('save');
          setShowWarningModal(true);
        }}
      />

      {/* Main Studio Layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Left Sidebar */}
        {isEditMode && <WidgetSidebar onAddWidget={(def) => handleDropWidget(def)} />}

        {/* Center Canvas Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Tutorial Guide */}
          {isEditMode && showTutorial && (
            <div style={{ padding: '0.85rem 1.25rem 0 1.25rem' }}>
              <TutorialGuide
                isOpen={showTutorial}
                onClose={() => setShowTutorial(false)}
              />
            </div>
          )}

          <BuilderCanvas
            widgets={activeWidgets}
            deviceViewport={deviceViewport}
            selectedWidgetId={selectedWidgetId}
            isEditMode={isEditMode}
            onSelectWidget={(id) => setSelectedWidgetId(id)}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onDuplicate={handleDuplicate}
            onDelete={handleDeleteWidget}
            onDropWidget={handleDropWidget}
            onLoadStarterTemplate={() => handleSelectTemplate('starter_tutorial')}
            onNavigate={handleNavigate}
          />
        </div>

        {/* Camera-Fixed Floating Property Inspector Overlay */}
        {isEditMode && selectedWidget && (
          <WidgetPropertyInspector
            widget={selectedWidget}
            verticalIndex={selectedWidgetIndex + 1}
            pages={pages}
            activeWidgets={activeWidgets}
            onUpdateProps={handleUpdateProps}
            onClose={() => setSelectedWidgetId(null)}
          />
        )}
      </div>

      {/* Preflight Audit Warning Modal */}
      <PreflightWarningModal
        isOpen={showWarningModal}
        warnings={auditResult.warnings}
        onClose={() => {
          setShowWarningModal(false);
          setPendingAction(null);
        }}
        onProceedAnyway={handleProceedFromWarningModal}
        onFixWarning={handleFixWarning}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 10000,
            animation: 'slideUp 180ms ease',
          }}
        >
          <ToastNotificationWidget
            props={{
              type: 'success',
              message: toastMessage,
              action: { enabled: false },
              dismissible: true,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default LandingPage;
