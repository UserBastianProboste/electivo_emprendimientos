/*
 * Module: AdminCustomizationPage
 * Description: Material Design 3 (M3) Backoffice customization panel with light/dark mode and palette controls
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of admin customization view.
 * - 2026-10-15 [v0.2.0]: Updated with Google M3 theme tokens, light/dark mode toggle, and refined professional copy.
 */

import React, { useState, useEffect } from 'react';
import { useStoreConfig } from '../context/StoreConfigContext';
import {
  Palette,
  LayoutTemplate,
  Type,
  Image as ImageIcon,
  Save,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Sun,
  Moon,
  Info,
} from 'lucide-react';

const M3_PALETTES = [
  {
    id: 1,
    name: 'Sapphire Blue (M3 Custom)',
    seed: '#769CDF',
    description: 'Paleta insignia con azules zafiro y lavanda, inspirada en diseño de alta precisión.',
    lightPreview: { primary: '#415F91', surface: '#F9F9FF', container: '#D6E3FF' },
    darkPreview: { primary: '#AAC7FF', surface: '#111318', container: '#284777' },
  },
  {
    id: 2,
    name: 'Sage Green (M3)',
    seed: '#386A20',
    description: 'Tonos botánicos y orgánicos ideales para tiendas sustentables y bienestar.',
    lightPreview: { primary: '#386A20', surface: '#F8FAF0', container: '#B7F397' },
    darkPreview: { primary: '#9CD67D', surface: '#11140E', container: '#215108' },
  },
  {
    id: 3,
    name: 'Terracotta & Sand (M3)',
    seed: '#8B5022',
    description: 'Cálidos ocres y arcilla artesanal, ideal para cerámica, gourmet y moda.',
    lightPreview: { primary: '#8B5022', surface: '#FFF8F5', container: '#FFDCC5' },
    darkPreview: { primary: '#FFB688', surface: '#19120E', container: '#6F3A0E' },
  },
  {
    id: 4,
    name: 'Slate & Quartz (M3)',
    seed: '#4A5F76',
    description: 'Elegancia monocrómica sobria y contemporánea para estudios y marcas de diseño.',
    lightPreview: { primary: '#4A5F76', surface: '#F7F9FC', container: '#CEE5FF' },
    darkPreview: { primary: '#B2C9E4', surface: '#101417', container: '#33485E' },
  },
];

const LAYOUT_OPTIONS = [
  {
    id: 'grid-3',
    name: 'Cuadrícula Estándar (3 Columnas)',
    description: 'Distribución equilibrada y versátil para todo tipo de productos.',
  },
  {
    id: 'grid-4',
    name: 'Cuadrícula Compacta (4 Columnas)',
    description: 'Mayor densidad visual recomendada para catálogos con amplio inventario.',
  },
  {
    id: 'list',
    name: 'Vista de Lista con Ficha Extendida',
    description: 'Estructura secuencial horizontal donde la descripción técnica tiene protagonismo.',
  },
];

export function AdminCustomizationPage() {
  const { config, saveConfig, previewConfig, refreshConfig } = useStoreConfig();

  const [formData, setFormData] = useState({
    store_name: '',
    hero_title: '',
    hero_subtitle: '',
    hero_cta_text: '',
    theme_id: 1,
    color_mode: 'light',
    logo_url: '',
    favicon_url: '',
    catalog_layout: 'grid-3',
  });

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (config) {
      setFormData({
        store_name: config.store_name || '',
        hero_title: config.hero_title || '',
        hero_subtitle: config.hero_subtitle || '',
        hero_cta_text: config.hero_cta_text || '',
        theme_id: config.theme_id || 1,
        color_mode: config.color_mode || 'light',
        logo_url: config.logo_url || '',
        favicon_url: config.favicon_url || '',
        catalog_layout: config.catalog_layout || 'grid-3',
      });
    }
  }, [config]);

  const handlePaletteChange = (newThemeId) => {
    setFormData((prev) => ({ ...prev, theme_id: newThemeId }));
    previewConfig({ theme_id: newThemeId });
  };

  const handleModeChange = (newMode) => {
    setFormData((prev) => ({ ...prev, color_mode: newMode }));
    previewConfig({ color_mode: newMode });
  };

  const handleLayoutChange = (newLayout) => {
    setFormData((prev) => ({ ...prev, catalog_layout: newLayout }));
    previewConfig({ catalog_layout: newLayout });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      previewConfig(next);
      return next;
    });
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result;
        if (dataUrl) {
          handleInputChange(field, dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    const result = await saveConfig(formData);
    setSaving(false);

    if (result.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } else {
      setSaveError(result.error);
    }
  };

  const isDarkMode = formData.color_mode === 'dark';

  return (
    <div className="admin-page container animate-fade-in" style={{ paddingTop: '2.5rem', maxWidth: '960px' }}>
      {/* Header Bar */}
      <div
        style={{
          borderBottom: '1px solid var(--md-sys-color-outline-variant)',
          paddingBottom: '1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--md-sys-color-primary)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Panel de Configuración
          </span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)', marginTop: '0.2rem', letterSpacing: '-0.02em' }}>
            Personalización de la Tienda
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--md-sys-color-on-surface-variant)' }}>
            Configura la paleta Material Design 3, modo de color, logotipos y disposición del catálogo.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={refreshConfig}
            style={{
              padding: '0.6rem 1.1rem',
              backgroundColor: 'transparent',
              border: '1px solid var(--md-sys-color-outline-variant)',
              color: 'var(--md-sys-color-on-surface-variant)',
              borderRadius: 'var(--md-shape-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all var(--md-transition)',
            }}
          >
            <RotateCcw size={14} />
            <span>Descartar</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            style={{
              padding: '0.6rem 1.6rem',
              backgroundColor: 'var(--md-sys-color-primary)',
              color: 'var(--md-sys-color-on-primary)',
              border: 'none',
              borderRadius: 'var(--md-shape-full)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: saving ? 'wait' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: 'var(--md-elevation-1)',
              transition: 'opacity var(--md-transition)',
            }}
          >
            <Save size={16} />
            <span>{saving ? 'Guardando...' : 'Guardar Cambios'}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div
          style={{
            backgroundColor: 'var(--md-sys-color-primary-container)',
            color: 'var(--md-sys-color-on-primary-container)',
            border: '1px solid var(--md-sys-color-primary)',
            borderRadius: 'var(--md-shape-md)',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.875rem',
          }}
        >
          <CheckCircle size={18} />
          <span>Configuración guardada exitosamente y sincronizada en tiempo real.</span>
        </div>
      )}

      {saveError && (
        <div
          style={{
            backgroundColor: 'var(--md-sys-color-error-container)',
            color: 'var(--md-sys-color-on-error-container)',
            border: '1px solid var(--md-sys-color-error)',
            borderRadius: 'var(--md-shape-md)',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.875rem',
          }}
        >
          <AlertTriangle size={18} />
          <span>Error al guardar: {saveError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Section 1: Material 3 Color Palette & Light/Dark Mode */}
        <div
          style={{
            backgroundColor: 'var(--md-sys-color-surface-container-low)',
            border: '1px solid var(--md-sys-color-outline-variant)',
            borderRadius: 'var(--md-shape-lg)',
            padding: '1.75rem',
            boxShadow: 'var(--md-elevation-1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Palette size={20} color="var(--md-sys-color-primary)" />
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>
                1. Paleta Material Design 3 (M3) y Modo de Color
              </h2>
            </div>

            {/* Light / Dark Mode Switcher */}
            <div
              style={{
                display: 'inline-flex',
                backgroundColor: 'var(--md-sys-color-surface-container)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                borderRadius: 'var(--md-shape-full)',
                padding: '0.2rem',
                gap: '0.2rem',
              }}
            >
              <button
                type="button"
                onClick={() => handleModeChange('light')}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--md-shape-full)',
                  border: 'none',
                  backgroundColor: !isDarkMode ? 'var(--md-sys-color-primary-container)' : 'transparent',
                  color: !isDarkMode ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface-variant)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all var(--md-transition)',
                }}
              >
                <Sun size={14} />
                <span>Modo Claro</span>
              </button>

              <button
                type="button"
                onClick={() => handleModeChange('dark')}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--md-shape-full)',
                  border: 'none',
                  backgroundColor: isDarkMode ? 'var(--md-sys-color-primary-container)' : 'transparent',
                  color: isDarkMode ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface-variant)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all var(--md-transition)',
                }}
              >
                <Moon size={14} />
                <span>Modo Oscuro</span>
              </button>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '1.25rem' }}>
            Selecciona la armonía cromática basada en el estándar Google M3. Puedes alternar entre modo claro y oscuro manteniendo la identidad de tu marca.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '1rem',
            }}
          >
            {M3_PALETTES.map((pal) => {
              const isSelected = formData.theme_id === pal.id;
              const preview = isDarkMode ? pal.darkPreview : pal.lightPreview;

              return (
                <div
                  key={pal.id}
                  onClick={() => handlePaletteChange(pal.id)}
                  style={{
                    backgroundColor: preview.surface,
                    border: '2px solid',
                    borderColor: isSelected ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-outline-variant)',
                    borderRadius: 'var(--md-shape-md)',
                    padding: '1.1rem',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all var(--md-transition)',
                    boxShadow: isSelected ? 'var(--md-elevation-2)' : 'none',
                  }}
                >
                  {/* Swatches */}
                  <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem', alignItems: 'center' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: preview.primary }} />
                    <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: preview.container, border: '1px solid rgba(0,0,0,0.1)' }} />
                    <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: preview.surface, border: '1px solid rgba(0,0,0,0.2)' }} />
                  </div>

                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: isDarkMode ? '#FFFFFF' : '#191C20', marginBottom: '0.25rem' }}>
                    {pal.name}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: isDarkMode ? '#C4C6D0' : '#44474E', lineHeight: 1.35 }}>
                    {pal.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Catalog Layout (RF-01.4) */}
        <div
          style={{
            backgroundColor: 'var(--md-sys-color-surface-container-low)',
            border: '1px solid var(--md-sys-color-outline-variant)',
            borderRadius: 'var(--md-shape-lg)',
            padding: '1.75rem',
            boxShadow: 'var(--md-elevation-1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <LayoutTemplate size={20} color="var(--md-sys-color-primary)" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>
              2. Disposición Predeterminada del Catálogo
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '1.25rem' }}>
            Define cómo se exhibirán inicialmente los productos a tus clientes (RF-01.4).
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {LAYOUT_OPTIONS.map((opt) => {
              const isSelected = formData.catalog_layout === opt.id;
              return (
                <label
                  key={opt.id}
                  onClick={() => handleLayoutChange(opt.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.9rem 1.2rem',
                    backgroundColor: isSelected ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-outline-variant)',
                    borderRadius: 'var(--md-shape-sm)',
                    cursor: 'pointer',
                    transition: 'all var(--md-transition)',
                  }}
                >
                  <input
                    type="radio"
                    name="catalog_layout"
                    value={opt.id}
                    checked={isSelected}
                    onChange={() => handleLayoutChange(opt.id)}
                    style={{ accentColor: 'var(--md-sys-color-primary)', width: 17, height: 17 }}
                  />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>
                      {opt.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--md-sys-color-on-surface-variant)' }}>
                      {opt.description}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Section 3: Brand Assets (Logo & Favicon) */}
        <div
          style={{
            backgroundColor: 'var(--md-sys-color-surface-container-low)',
            border: '1px solid var(--md-sys-color-outline-variant)',
            borderRadius: 'var(--md-shape-lg)',
            padding: '1.75rem',
            boxShadow: 'var(--md-elevation-1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <ImageIcon size={20} color="var(--md-sys-color-primary)" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>
              3. Identidad de Marca (Logotipo y Favicon)
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '1.25rem' }}>
            Sube o ingresa la URL de tus archivos de imagen propios para una experiencia de marca blanca completa.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* Logo */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--md-sys-color-on-surface)' }}>
                Logotipo del Negocio
              </label>
              <input
                type="text"
                placeholder="https://... o sube una imagen"
                value={formData.logo_url}
                onChange={(e) => handleInputChange('logo_url', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.8rem',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  borderRadius: 'var(--md-shape-sm)',
                  color: 'var(--md-sys-color-on-surface)',
                  fontSize: '0.85rem',
                  marginBottom: '0.5rem',
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'logo_url')}
                style={{ fontSize: '0.78rem', color: 'var(--md-sys-color-outline)' }}
              />

              {formData.logo_url && (
                <div style={{ marginTop: '0.75rem', padding: '0.5rem', backgroundColor: 'var(--md-sys-color-surface-container)', borderRadius: 'var(--md-shape-xs)', textAlign: 'center' }}>
                  <img
                    src={formData.logo_url}
                    alt="Logo preview"
                    style={{ maxHeight: '42px', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>
              )}
            </div>

            {/* Favicon */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--md-sys-color-on-surface)' }}>
                Ícono de Pestaña (Favicon)
              </label>
              <input
                type="text"
                placeholder="https://... o sube un ícono"
                value={formData.favicon_url}
                onChange={(e) => handleInputChange('favicon_url', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.8rem',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  borderRadius: 'var(--md-shape-sm)',
                  color: 'var(--md-sys-color-on-surface)',
                  fontSize: '0.85rem',
                  marginBottom: '0.5rem',
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'favicon_url')}
                style={{ fontSize: '0.78rem', color: 'var(--md-sys-color-outline)' }}
              />

              {formData.favicon_url && (
                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--md-sys-color-on-surface-variant)' }}>
                  <img
                    src={formData.favicon_url}
                    alt="Favicon preview"
                    style={{ width: '22px', height: '22px', objectFit: 'contain' }}
                  />
                  <span>Vista previa del favicon dinámico</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 4: Store Content & Texts */}
        <div
          style={{
            backgroundColor: 'var(--md-sys-color-surface-container-low)',
            border: '1px solid var(--md-sys-color-outline-variant)',
            borderRadius: 'var(--md-shape-lg)',
            padding: '1.75rem',
            boxShadow: 'var(--md-elevation-1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Type size={20} color="var(--md-sys-color-primary)" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>
              4. Textos de la Portada
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '1.25rem' }}>
            Configura el nombre comercial y el mensaje de bienvenida de tu tienda (RF-01.1).
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--md-sys-color-on-surface)' }}>
                Nombre de la Tienda
              </label>
              <input
                type="text"
                value={formData.store_name}
                onChange={(e) => handleInputChange('store_name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  borderRadius: 'var(--md-shape-sm)',
                  color: 'var(--md-sys-color-on-surface)',
                  fontSize: '0.9rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--md-sys-color-on-surface)' }}>
                Titular Principal (Hero)
              </label>
              <input
                type="text"
                value={formData.hero_title}
                onChange={(e) => handleInputChange('hero_title', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  borderRadius: 'var(--md-shape-sm)',
                  color: 'var(--md-sys-color-on-surface)',
                  fontSize: '0.9rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--md-sys-color-on-surface)' }}>
                Bajada o Subtítulo
              </label>
              <textarea
                rows={3}
                value={formData.hero_subtitle}
                onChange={(e) => handleInputChange('hero_subtitle', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  borderRadius: 'var(--md-shape-sm)',
                  color: 'var(--md-sys-color-on-surface)',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--md-sys-color-on-surface)' }}>
                Texto del Botón de Ingreso (CTA)
              </label>
              <input
                type="text"
                value={formData.hero_cta_text}
                onChange={(e) => handleInputChange('hero_cta_text', e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  borderRadius: 'var(--md-shape-sm)',
                  color: 'var(--md-sys-color-on-surface)',
                  fontSize: '0.9rem',
                }}
              />
            </div>
          </div>
        </div>

        {/* Institutional Note (RN-01) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--md-sys-color-surface-container)',
            borderRadius: 'var(--md-shape-md)',
            border: '1px solid var(--md-sys-color-outline-variant)',
            fontSize: '0.825rem',
            color: 'var(--md-sys-color-on-surface-variant)',
          }}
        >
          <Info size={16} color="var(--md-sys-color-primary)" style={{ flexShrink: 0 }} />
          <span>
            <strong>Nota de cumplimiento:</strong> La plataforma incorpora en el pie de página la acreditación del programa A+S de la Universidad Autónoma de Chile, preservando la sobriedad y protagonismo de tu marca.
          </span>
        </div>

        {/* Bottom Save Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingBottom: '3rem' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '0.85rem 2.25rem',
              backgroundColor: 'var(--md-sys-color-primary)',
              color: 'var(--md-sys-color-on-primary)',
              border: 'none',
              borderRadius: 'var(--md-shape-full)',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: saving ? 'wait' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: 'var(--md-elevation-1)',
            }}
          >
            <Save size={18} />
            <span>{saving ? 'Guardando...' : 'Guardar y Aplicar'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
