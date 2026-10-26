/*
 * Module: WidgetSidebar
 * Description: Vertical collapsible category accordion with draggable widgets and visual wireframe hover peek previews
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of widget sidebar.
 * - 2026-10-26 [v1.1.0]: Refactored to vertical accordion sections and added hover peek preview card.
 * - 2026-10-26 [v1.2.0]: Swapped textual parameter list in peek with visual wireframe illustration and entrepreneur tips.
 */

import React, { useState } from 'react';
import { WIDGET_DEFINITIONS } from '../../data/widgetDefinitions';
import { WidgetWireframePeek } from './WidgetWireframePeek';
import {
  Search,
  Plus,
  GripVertical,
  ChevronDown,
  ChevronRight,
  Sparkles,
  LayoutTemplate,
  Grid,
  Sliders,
  ShoppingBag,
  Layers,
  ShoppingCart,
  CreditCard,
  Truck,
  Tag,
  ArrowRight,
  FileText,
  ShieldCheck,
  Play,
  HelpCircle,
  Compass,
  MessageCircle,
  Share2,
  Layout,
  Check,
  Lightbulb,
} from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  LayoutTemplate,
  Grid,
  Sliders,
  ShoppingBag,
  Layers,
  ShoppingCart,
  CreditCard,
  Truck,
  Tag,
  ArrowRight,
  FileText,
  ShieldCheck,
  Play,
  HelpCircle,
  Compass,
  ChevronRight,
  MessageCircle,
  Share2,
  Layout,
  Check,
};

const SECTIONS = [
  { id: 'header', label: 'Encabezado y Hero', icon: Sparkles },
  { id: 'content', label: 'Contenido y Medios', icon: LayoutTemplate },
  { id: 'commerce', label: 'Catalogo y Comercio', icon: ShoppingBag },
  { id: 'checkout', label: 'Carrito y Checkout', icon: ShoppingCart },
  { id: 'forms', label: 'Formularios e Interaccion', icon: MessageCircle },
  { id: 'membership', label: 'Planes y Suscripciones', icon: Layers },
  { id: 'structure', label: 'Estructura y Sistema', icon: Layout },
];

export function WidgetSidebar({ onAddWidget }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    header: true,
    content: true,
    commerce: true,
    checkout: true,
    forms: true,
    membership: true,
    structure: true,
  });

  const [hoveredWidget, setHoveredWidget] = useState(null);
  const [peekCoords, setPeekCoords] = useState({ top: 120 });

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleDragStart = (e, widgetDef) => {
    e.dataTransfer.setData('application/json', JSON.stringify(widgetDef));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleMouseEnter = (e, widgetDef) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPeekCoords({
      top: Math.max(75, Math.min(window.innerHeight - 360, rect.top - 20)),
    });
    setHoveredWidget(widgetDef);
  };

  const handleMouseLeave = () => {
    setHoveredWidget(null);
  };

  const getWidgetsForSection = (sectionId) => {
    return WIDGET_DEFINITIONS.filter((w) => {
      const inCategory = w.category === sectionId;
      if (!searchQuery.trim()) return inCategory;
      const matchesSearch =
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(w.number).includes(searchQuery);
      return inCategory && matchesSearch;
    });
  };

  return (
    <aside
      style={{
        width: '320px',
        backgroundColor: 'var(--md-sys-color-surface-container-low)',
        borderRight: '1px solid var(--md-sys-color-outline-variant)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: 'var(--md-elevation-1)',
        userSelect: 'none',
        position: 'relative',
        zIndex: 40,
      }}
    >
      {/* Search Header */}
      <div style={{ padding: '0.85rem 1rem', borderBottom: '1px solid var(--md-sys-color-outline-variant)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <h2 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
            Widgets Disponibles
          </h2>
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 800,
              backgroundColor: 'var(--md-sys-color-primary-container)',
              color: 'var(--md-sys-color-on-primary-container)',
              padding: '0.1rem 0.45rem',
              borderRadius: 'var(--md-shape-full)',
            }}
          >
            25 Bloques
          </span>
        </div>

        <div style={{ position: 'relative' }}>
          <Search
            size={14}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--md-sys-color-on-surface-variant)',
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar bloque..."
            style={{
              width: '100%',
              padding: '0.45rem 0.65rem 0.45rem 1.9rem',
              borderRadius: 'var(--md-shape-sm)',
              border: '1px solid var(--md-sys-color-outline-variant)',
              backgroundColor: 'var(--md-sys-color-surface)',
              color: 'var(--md-sys-color-on-surface)',
              fontSize: '0.8rem',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* Vertical Collapsible Accordion Sections */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0.5rem 0.65rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.45rem',
        }}
      >
        {SECTIONS.map((section) => {
          const sectionWidgets = getWidgetsForSection(section.id);
          const isExpanded = expandedSections[section.id] || searchQuery.trim().length > 0;
          const SectionIcon = section.icon;

          if (searchQuery.trim() && sectionWidgets.length === 0) {
            return null;
          }

          return (
            <div
              key={section.id}
              style={{
                borderRadius: 'var(--md-shape-md)',
                backgroundColor: 'var(--md-sys-color-surface)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                overflow: 'hidden',
              }}
            >
              {/* Accordion Section Header */}
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'var(--md-sys-color-surface-container)',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 120ms ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <SectionIcon size={15} color="var(--md-sys-color-primary)" />
                  <span style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
                    {section.label}
                  </span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      backgroundColor: 'var(--md-sys-color-surface-container-high)',
                      color: 'var(--md-sys-color-on-surface-variant)',
                      padding: '0.05rem 0.4rem',
                      borderRadius: 'var(--md-shape-full)',
                    }}
                  >
                    {sectionWidgets.length}
                  </span>
                </div>

                {isExpanded ? (
                  <ChevronDown size={15} color="var(--md-sys-color-on-surface-variant)" />
                ) : (
                  <ChevronRight size={15} color="var(--md-sys-color-on-surface-variant)" />
                )}
              </button>

              {/* Section Widget Items */}
              {isExpanded && (
                <div style={{ padding: '0.45rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {sectionWidgets.map((def) => {
                    const WidgetIcon = ICON_MAP[def.icon] || Grid;
                    return (
                      <div
                        key={def.type}
                        draggable
                        onDragStart={(e) => handleDragStart(e, def)}
                        onMouseEnter={(e) => handleMouseEnter(e, def)}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0.65rem',
                          borderRadius: 'var(--md-shape-sm)',
                          backgroundColor: 'var(--md-sys-color-surface-container-lowest)',
                          border: '1px solid var(--md-sys-color-outline-variant)',
                          cursor: 'grab',
                          transition: 'all 120ms ease',
                        }}
                      >
                        <GripVertical size={14} color="var(--md-sys-color-outline)" style={{ cursor: 'grab' }} />

                        <div
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: 'var(--md-shape-xs)',
                            backgroundColor: 'var(--md-sys-color-surface-container)',
                            color: 'var(--md-sys-color-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <WidgetIcon size={14} />
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <span
                              style={{
                                fontSize: '0.62rem',
                                fontWeight: 800,
                                backgroundColor: 'var(--md-sys-color-surface-container-high)',
                                color: 'var(--md-sys-color-on-surface)',
                                padding: '0.05rem 0.3rem',
                                borderRadius: 'var(--md-shape-full)',
                              }}
                            >
                              #{def.number}
                            </span>
                            <div
                              style={{
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                color: 'var(--md-sys-color-on-surface)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {def.name}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onAddWidget(def)}
                          title="Anadir al lienzo"
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: 'var(--md-shape-full)',
                            backgroundColor: 'var(--md-sys-color-primary-container)',
                            color: 'var(--md-sys-color-on-primary-container)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            flexShrink: 0,
                            transition: 'transform 120ms ease',
                          }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Visual Wireframe Peek Popover on Hover */}
      {hoveredWidget && (
        <div
          style={{
            position: 'fixed',
            left: '335px',
            top: `${peekCoords.top}px`,
            width: '290px',
            backgroundColor: 'var(--md-sys-color-surface-container-high)',
            border: '1px solid var(--md-sys-color-primary)',
            borderRadius: 'var(--md-shape-lg)',
            padding: '1rem',
            boxShadow: '0 16px 40px rgba(0,0,0,0.32)',
            zIndex: 9999,
            pointerEvents: 'none',
            animation: 'fadeIn 120ms ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                backgroundColor: 'var(--md-sys-color-primary)',
                color: 'var(--md-sys-color-on-primary)',
                padding: '0.1rem 0.45rem',
                borderRadius: 'var(--md-shape-full)',
              }}
            >
              #{hoveredWidget.number}
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
              {hoveredWidget.name}
            </span>
          </div>

          <p style={{ margin: '0 0 0.65rem 0', fontSize: '0.75rem', color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.4 }}>
            {hoveredWidget.purpose}
          </p>

          {/* Visual Miniature Wireframe Placeholder */}
          <div style={{ marginBottom: '0.65rem' }}>
            <WidgetWireframePeek widgetDef={hoveredWidget} />
          </div>

          {/* Practical Entrepreneur Tip */}
          {hoveredWidget.tip && (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.4rem',
                padding: '0.5rem',
                borderRadius: 'var(--md-shape-sm)',
                backgroundColor: 'var(--md-sys-color-surface-container-lowest)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                fontSize: '0.72rem',
                color: 'var(--md-sys-color-on-surface)',
                lineHeight: 1.4,
                marginBottom: '0.5rem',
              }}
            >
              <Lightbulb size={14} color="var(--md-sys-color-primary)" style={{ flexShrink: 0, marginTop: '1px' }} />
              <div>
                <strong style={{ color: 'var(--md-sys-color-primary)' }}>Tip de Negocio: </strong>
                {hoveredWidget.tip}
              </div>
            </div>
          )}

          <div style={{ fontSize: '0.72rem', color: 'var(--md-sys-color-primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Sparkles size={13} />
            <span>Arrastra al lienzo o pulsa + para agregar</span>
          </div>
        </div>
      )}
    </aside>
  );
}

export default WidgetSidebar;
