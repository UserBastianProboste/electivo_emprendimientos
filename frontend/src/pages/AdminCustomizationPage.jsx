/*
 * Module: AdminCustomizationPage
 * Description: Entrepreneur Backoffice customization panel for themes, branding, landing texts, and layout (RF-01.2, RF-01.4)
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial implementation of admin customization view with RN-01 institutional lock.
 */

import React, { useState, useEffect } from 'react';
import { useStoreConfig } from '../context/StoreConfigContext';
import { UniversityLogo } from '../components/common/UniversityLogo';
import {
  Palette,
  LayoutTemplate,
  Type,
  Image as ImageIcon,
  Save,
  Lock,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

const THEMES = [
  {
    id: 1,
    name: 'Tema 1: Slate Obsidian',
    description: 'Estilo minimalista oscuro con acentos esmeralda de alta fidelidad.',
    bg: '#09090b',
    surface: '#18181b',
    primary: '#10b981',
    border: '#27272a',
  },
  {
    id: 2,
    name: 'Tema 2: Ocean Navy',
    description: 'Tonos zafiro profundo con acento celeste eléctrico corporativo.',
    bg: '#060b17',
    surface: '#0f1c38',
    primary: '#0284c7',
    border: '#1e293b',
  },
  {
    id: 3,
    name: 'Tema 3: Forest Pine',
    description: 'Inspiración botánica y ecológica con tonos bosque y menta.',
    bg: '#04140e',
    surface: '#0d2c20',
    primary: '#059669',
    border: '#184232',
  },
  {
    id: 4,
    name: 'Tema 4: Sunset Amber',
    description: 'Carbón cálido artesanal con acentos ámbar dorado de alto impacto.',
    bg: '#140d0a',
    surface: '#291a13',
    primary: '#d97706',
    border: '#43281c',
  },
];

const LAYOUT_OPTIONS = [
  {
    id: 'grid-3',
    name: 'Cuadrícula Estándar (3 Columnas)',
    description: 'Distribución equilibrada óptima para catálogos con fotos detalladas.',
  },
  {
    id: 'grid-4',
    name: 'Cuadrícula Compacta (4 Columnas)',
    description: 'Mayor densidad de productos para inventarios extensos.',
  },
  {
    id: 'list',
    name: 'Vista de Lista con Descripción Extendida',
    description: 'Presentación secuencial donde la ficha técnica y descripción tienen protagonismo.',
  },
];

export function AdminCustomizationPage() {
  const { config, saveConfig, previewConfig, refreshConfig } = useStoreConfig();

  // Local form state
  const [formData, setFormData] = useState({
    store_name: '',
    hero_title: '',
    hero_subtitle: '',
    hero_cta_text: '',
    theme_id: 1,
    logo_url: '',
    favicon_url: '',
    catalog_layout: 'grid-3',
  });

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Initialize form with loaded config
  useEffect(() => {
    if (config) {
      setFormData({
        store_name: config.store_name || '',
        hero_title: config.hero_title || '',
        hero_subtitle: config.hero_subtitle || '',
        hero_cta_text: config.hero_cta_text || '',
        theme_id: config.theme_id || 1,
        logo_url: config.logo_url || '',
        favicon_url: config.favicon_url || '',
        catalog_layout: config.catalog_layout || 'grid-3',
      });
    }
  }, [config]);

  // Handle immediate live preview
  const handleThemeChange = (newThemeId) => {
    setFormData((prev) => ({ ...prev, theme_id: newThemeId }));
    previewConfig({ theme_id: newThemeId });
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

  const handleReset = () => {
    refreshConfig();
  };

  return (
    <div className="admin-page container animate-fade-in" style={{ paddingTop: '2.5rem', maxWidth: '1000px' }}>
      {/* Page Header */}
      <div
        style={{
          borderBottom: '1px solid var(--border-color)',
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
              fontFamily: 'var(--font-mono)',
              color: 'var(--primary)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Panel de Control del Emprendedor
          </span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
            Personalización de Tienda (SaaS / Marca Blanca)
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Modifica en tiempo real la identidad visual, temas cromáticos, textos de bienvenida y estructura del catálogo.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: '0.6rem 1rem',
              backgroundColor: 'transparent',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <RotateCcw size={15} />
            <span>Descartar Cambios</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            style={{
              padding: '0.6rem 1.5rem',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: saving ? 'wait' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Save size={16} />
            <span>{saving ? 'Guardando en PostgreSQL...' : 'Guardar Configuración'}</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid var(--primary-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            color: 'var(--primary)',
            fontSize: '0.9rem',
          }}
        >
          <CheckCircle size={18} />
          <span>¡Ajustes guardados exitosamente en PostgreSQL! El tema y favicon han sido sincronizados.</span>
        </div>
      )}

      {saveError && (
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            color: 'var(--danger)',
            fontSize: '0.9rem',
          }}
        >
          <AlertTriangle size={18} />
          <span>Error al guardar: {saveError}</span>
        </div>
      )}

      {/* RN-01 Mandatory Brand Security Card */}
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: '1px dashed var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-subtle)',
            }}
          >
            <Lock size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Regla de Negocio RN-01: Branding Obligatorio de Autoría
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  color: '#f87171',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '4px',
                  fontWeight: 600,
                }}
              >
                Inalterable
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Todo E-commerce generado por la plataforma muestra permanentemente el logo de la Universidad en cabecera y pie de página. No puede ser ocultado ni desactivado.
            </p>
          </div>
        </div>

        <UniversityLogo size="small" />
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Section 1: Predefined Color Themes (RF-01.2) */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Palette size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
              1. Selección de Plantilla de Color (Mínimo 4 Temas)
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Selecciona una de las 4 paletas prediseñadas orientadas a Dark Mode y alto contraste. Al hacer clic se previsualiza de inmediato.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '1rem',
            }}
          >
            {THEMES.map((th) => {
              const isSelected = formData.theme_id === th.id;
              return (
                <div
                  key={th.id}
                  onClick={() => handleThemeChange(th.id)}
                  style={{
                    backgroundColor: th.surface,
                    border: '2px solid',
                    borderColor: isSelected ? 'var(--primary)' : 'rgba(255, 255, 255, 0.08)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.1rem',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        color: 'var(--primary)',
                      }}
                    >
                      <CheckCircle size={18} />
                    </div>
                  )}

                  {/* Swatch dots */}
                  <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: th.bg, border: '1px solid #444' }} />
                    <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: th.surface, border: '1px solid #444' }} />
                    <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: th.primary }} />
                  </div>

                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.25rem' }}>
                    {th.name}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af', lineHeight: 1.35 }}>
                    {th.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Catalog Layout Structure (RF-01.4) */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <LayoutTemplate size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
              2. Disposición Estructural del Catálogo (Layout)
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Elige la estructura predeterminada con la que los compradores visualizarán tus productos al ingresar al catálogo (RF-01.4).
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
                    padding: '1rem 1.25rem',
                    backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-card)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--primary-border)' : 'var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <input
                    type="radio"
                    name="catalog_layout"
                    value={opt.id}
                    checked={isSelected}
                    onChange={() => handleLayoutChange(opt.id)}
                    style={{ accentColor: 'var(--primary)', width: 18, height: 18 }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {opt.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {opt.description}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Section 3: Branding & Assets (RF-01.2: Logo y Favicon) */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <ImageIcon size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
              3. Identidad Visual Propia (Logo y Favicon)
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Carga el logotipo comercial de tu negocio y el ícono de pestaña (favicon) para personalizar la experiencia de tu marca blanca.
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
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Logotipo del Negocio (URL o Imagen)
              </label>
              <input
                type="text"
                placeholder="https://... o sube un archivo"
                value={formData.logo_url}
                onChange={(e) => handleInputChange('logo_url', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.8rem',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem',
                  marginBottom: '0.5rem',
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'logo_url')}
                style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}
              />

              {/* Preview */}
              {formData.logo_url && (
                <div style={{ marginTop: '0.75rem', padding: '0.5rem', backgroundColor: '#000', borderRadius: '6px', textAlign: 'center' }}>
                  <img
                    src={formData.logo_url}
                    alt="Logo preview"
                    style={{ maxHeight: '48px', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>
              )}
            </div>

            {/* Favicon */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Ícono de Pestaña (Favicon Dinámico)
              </label>
              <input
                type="text"
                placeholder="https://... o sube un archivo"
                value={formData.favicon_url}
                onChange={(e) => handleInputChange('favicon_url', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.8rem',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem',
                  marginBottom: '0.5rem',
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'favicon_url')}
                style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}
              />

              {/* Favicon Preview */}
              {formData.favicon_url && (
                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <img
                    src={formData.favicon_url}
                    alt="Favicon preview"
                    style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                  />
                  <span>Vista previa del favicon en pestaña</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 4: Store Name & Landing Texts (RF-01.1) */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Type size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
              4. Contenido de la Landing Page y Marca
            </h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Configura el titular de bienvenida y el llamado a la acción para ingresar al catálogo E-commerce (RF-01.1).
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Nombre del Negocio
              </label>
              <input
                type="text"
                value={formData.store_name}
                onChange={(e) => handleInputChange('store_name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Título Principal del Hero (Landing)
              </label>
              <input
                type="text"
                value={formData.hero_title}
                onChange={(e) => handleInputChange('hero_title', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Subtítulo Descriptivo (Bajada de bienvenida)
              </label>
              <textarea
                rows={3}
                value={formData.hero_subtitle}
                onChange={(e) => handleInputChange('hero_subtitle', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-main)',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Texto del Botón CTA (Acceso al Catálogo)
              </label>
              <input
                type="text"
                value={formData.hero_cta_text}
                onChange={(e) => handleInputChange('hero_cta_text', e.target.value)}
                style={{
                  width: '100%',
                  maxWidth: '320px',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                }}
              />
            </div>
          </div>
        </div>

        {/* Submit Bar at bottom */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingBottom: '3rem' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '0.85rem 2.25rem',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: saving ? 'wait' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <Save size={18} />
            <span>{saving ? 'Guardando cambios...' : 'Guardar y Aplicar Todo'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
