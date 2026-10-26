/*
 * Module: TutorialGuide
 * Description: Interactive step-by-step onboarding walkthrough including multi-canvas page creation and linking
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of interactive tutorial guide.
 * - 2026-10-26 [v1.1.0]: Added multi-canvas page tab linking tutorial step (/pagina_x).
 */

import React, { useState } from 'react';
import {
  HelpCircle,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  MousePointerClick,
  Sliders,
  Sun,
  Layers,
} from 'lucide-react';

const TUTORIAL_STEPS = [
  {
    title: 'Bienvenido al Constructor Visual Drag & Drop',
    icon: Sparkles,
    badge: 'Paso 1 de 6',
    text: 'Esta pantalla te permite disenar la tienda y catalogo de tu emprendimiento sin tocar codigo. Arrastra bloques desde la barra lateral o haz clic en el boton "+" para agregarlos a tu lienzo.',
    actionHint: 'Arrastra cualquier widget de la columna izquierda hacia el lienzo central.',
  },
  {
    title: 'Biblioteca de 25 Widgets en Secciones Verticales',
    icon: MousePointerClick,
    badge: 'Paso 2 de 6',
    text: 'Los 25 widgets estan organizados en secciones verticales desplegables: Encabezados, Medios, Catalogo, Carrito, Formularios, Suscripciones y Estructura. Pasa el cursor por encima para ver una vista previa (Peek).',
    actionHint: 'Pasa el mouse sobre cualquier widget para previsualizar su funcion y parametros.',
  },
  {
    title: 'Creacion de Nuevas Paginas y Rutas (/pagina_x)',
    icon: Layers,
    badge: 'Paso 3 de 6',
    text: 'En la barra superior tienes la pestaña INICIO. Al pulsar el boton "+" crearas una nueva pagina con lienzo en blanco. Cada pagina tiene una ruta como "/pagina_x" que puedes vincular directamente en cualquier boton o menu.',
    actionHint: 'Crea una nueva pagina con "+" y usa su ruta "/pagina_1" en el enlace de un boton.',
  },
  {
    title: 'Inspector de Propiedades Flotante y Fijo en Camara',
    icon: Sliders,
    badge: 'Paso 4 de 6',
    text: 'Al hacer clic en cualquier widget se despliega el panel de propiedades sobre el lienzo sin descuadrar la pagina. Puedes minimizarlo u ocultarlo en cualquier momento para ver los cambios aplicados en vivo.',
    actionHint: 'Haz clic en un widget, edita su titulo y usa el boton de minimizar para ver el resultado.',
  },
  {
    title: 'Reordenar, Duplicar y Eliminar Bloques',
    icon: Sliders,
    badge: 'Paso 5 de 6',
    text: 'Cada bloque en el lienzo cuenta con controles superiores: flechas para subir/bajar su orden, boton para duplicarlo y papelera para removerlo cuando gustes.',
    actionHint: 'Usa las flechas para mover un bloque arriba o abajo en tu tienda.',
  },
  {
    title: 'Paletas M3, Modo Oscuro y Vistas Responsivas',
    icon: Sun,
    badge: 'Paso 6 de 6',
    text: 'Prueba las 4 paletas Material Design 3, alterna el modo claro/oscuro y verifica la responsividad cambiando entre Desktop, Tablet (768px) y Movil (390px).',
    actionHint: 'Haz clic en Tablet o Movil en la barra superior para revisar la adaptabilidad.',
  },
];

export function TutorialGuide({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const step = TUTORIAL_STEPS[currentStep];
  const StepIcon = step.icon;
  const isLast = currentStep === TUTORIAL_STEPS.length - 1;

  return (
    <div
      style={{
        backgroundColor: 'var(--md-sys-color-surface-container-high)',
        border: '1px solid var(--md-sys-color-primary)',
        borderRadius: 'var(--md-shape-lg)',
        padding: '1.15rem 1.4rem',
        marginBottom: '1rem',
        boxShadow: 'var(--md-elevation-2)',
        position: 'relative',
        animation: 'fadeIn 180ms ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--md-shape-sm)',
              backgroundColor: 'var(--md-sys-color-primary-container)',
              color: 'var(--md-sys-color-on-primary-container)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <StepIcon size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  backgroundColor: 'var(--md-sys-color-primary)',
                  color: 'var(--md-sys-color-on-primary)',
                  padding: '0.12rem 0.45rem',
                  borderRadius: 'var(--md-shape-full)',
                  textTransform: 'uppercase',
                }}
              >
                {step.badge}
              </span>
              <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
                {step.title}
              </h4>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          title="Cerrar guia tutorial"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--md-sys-color-on-surface-variant)',
            cursor: 'pointer',
            padding: '0.2rem',
          }}
        >
          <X size={17} />
        </button>
      </div>

      <p style={{ fontSize: '0.88rem', color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.55, marginBottom: '0.75rem' }}>
        {step.text}
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.45rem 0.75rem',
          backgroundColor: 'var(--md-sys-color-surface-container)',
          borderRadius: 'var(--md-shape-sm)',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'var(--md-sys-color-primary)',
          marginBottom: '0.85rem',
        }}
      >
        <Sparkles size={14} />
        <span>Consejo: {step.actionHint}</span>
      </div>

      {/* Progress & Navigation Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {TUTORIAL_STEPS.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentStep(i)}
              style={{
                width: i === currentStep ? '22px' : '7px',
                height: '7px',
                borderRadius: 'var(--md-shape-full)',
                backgroundColor: i === currentStep ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-outline-variant)',
                cursor: 'pointer',
                transition: 'all var(--md-transition)',
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.45rem' }}>
          <button
            type="button"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(currentStep - 1)}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--md-shape-full)',
              border: '1px solid var(--md-sys-color-outline-variant)',
              backgroundColor: 'transparent',
              color: 'var(--md-sys-color-on-surface)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              opacity: currentStep === 0 ? 0.4 : 1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <ChevronLeft size={14} />
            <span>Anterior</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (isLast) {
                onClose();
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
            style={{
              padding: '0.35rem 0.9rem',
              borderRadius: 'var(--md-shape-full)',
              border: 'none',
              backgroundColor: 'var(--md-sys-color-primary)',
              color: 'var(--md-sys-color-on-primary)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <span>{isLast ? 'Entendido' : 'Siguiente'}</span>
            {isLast ? <CheckCircle2 size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TutorialGuide;
