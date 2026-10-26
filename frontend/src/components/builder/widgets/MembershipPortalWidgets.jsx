/*
 * Module: MembershipPortalWidgets
 * Description: Renders membership, subscription configurator, and customer portal widgets with interactive selectors
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of membership and portal widgets.
 * - 2026-10-26 [v1.2.0]: Added functional plan selection, variant styles, and button micro-animations.
 * - 2026-10-26 [v1.3.0]: Added mobile 1-column layout adaptation and onNavigate support.
 */

import React, { useState } from 'react';
import { Check, ShieldCheck, User, Package, Calendar } from 'lucide-react';

export function PlansMembershipWidget({ props = {}, onSelectPlan = () => {}, onNavigate = () => {}, deviceViewport = 'desktop' }) {
  const {
    variant = 'standard',
    highlight_plan = 'PLAN COMUNIDAD',
    plan_cards = [
      {
        plan_name: 'PLAN BASICO',
        plan_price: '$9.990 / mes',
        plan_features: ['ITEM 1: Acceso a catalogo preferente', 'ITEM 2: Soporte regular'],
        plan_cta: 'ELEGIR BASICO',
      },
      {
        plan_name: 'PLAN COMUNIDAD',
        plan_price: '$19.990 / mes',
        plan_features: ['ITEM 1: Despacho prioritario', 'ITEM 2: 15% de descuento', 'ITEM 3: Acceso a lanzamientos privados'],
        plan_cta: 'SUSCRIBIRSE',
      },
    ],
  } = props;

  const isMobile = deviceViewport === 'mobile';
  const isHorizontal = variant === 'horizontal';
  const [selectedPlanName, setSelectedPlanName] = useState(null);

  const handleChoosePlan = (name) => {
    setSelectedPlanName(name);
    onSelectPlan(name);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile || isHorizontal ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.25rem',
        padding: '0.75rem 0',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {plan_cards.map((plan, idx) => {
        const isHighlight = plan.plan_name === highlight_plan;
        const isChosen = selectedPlanName === plan.plan_name;

        return (
          <div
            key={idx}
            style={{
              backgroundColor: isHighlight ? 'var(--md-sys-color-surface-container-high)' : 'var(--md-sys-color-surface-container-low)',
              border: isChosen
                ? '2px solid #10B981'
                : isHighlight
                ? '2px solid var(--md-sys-color-primary)'
                : '1px solid var(--md-sys-color-outline-variant)',
              borderRadius: 'var(--md-shape-lg)',
              padding: isMobile ? '1.25rem' : '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: isHighlight ? 'var(--md-elevation-2)' : 'var(--md-elevation-1)',
              position: 'relative',
              transition: 'transform 120ms ease, box-shadow 120ms ease',
              boxSizing: 'border-box',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--md-elevation-3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = isHighlight ? 'var(--md-elevation-2)' : 'var(--md-elevation-1)';
            }}
          >
            {isHighlight && (
              <span
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  backgroundColor: 'var(--md-sys-color-primary)',
                  color: 'var(--md-sys-color-on-primary)',
                  padding: '0.2rem 0.65rem',
                  borderRadius: 'var(--md-shape-full)',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                Recomendado
              </span>
            )}
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)', marginBottom: '0.4rem' }}>
              {plan.plan_name}
            </h3>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--md-sys-color-primary)', marginBottom: '1.15rem' }}>
              {plan.plan_price}
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {(plan.plan_features || []).map((feat, fIdx) => (
                <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--md-sys-color-on-surface-variant)' }}>
                  <Check size={16} color="var(--md-sys-color-primary)" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => handleChoosePlan(plan.plan_name)}
              style={{
                width: '100%',
                padding: '0.7rem',
                backgroundColor: isChosen
                  ? '#10B981'
                  : isHighlight
                  ? 'var(--md-sys-color-primary)'
                  : 'var(--md-sys-color-surface-container-highest)',
                color: isChosen || isHighlight ? '#ffffff' : 'var(--md-sys-color-on-surface)',
                border: 'none',
                borderRadius: 'var(--md-shape-full)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                transition: 'transform 120ms ease',
              }}
            >
              {isChosen && <Check size={16} />}
              <span>{isChosen ? 'Plan Seleccionado' : plan.plan_cta}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function SubscriptionConfiguratorWidget({ props = {}, deviceViewport = 'desktop' }) {
  const {
    option_groups = [
      { id: 'size', name: 'Tamano del Pedido', options: ['Pequeno (2 items)', 'Mediano (4 items)', 'Familiar (6 items)'] },
      { id: 'freq', name: 'Frecuencia de Reparto', options: ['Semanal', 'Quincenal', 'Mensual'] },
    ],
    summary_preview = 'Total estimado: $24.900 CLP / quincenal',
  } = props;

  const isMobile = deviceViewport === 'mobile';
  const [selections, setSelections] = useState({
    size: 'Mediano (4 items)',
    freq: 'Quincenal',
  });

  return (
    <div
      style={{
        backgroundColor: 'var(--md-sys-color-surface-container-low)',
        border: '1px solid var(--md-sys-color-outline-variant)',
        borderRadius: 'var(--md-shape-lg)',
        padding: isMobile ? '1.15rem' : '1.5rem',
        maxWidth: '580px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)', marginBottom: '1rem' }}>
        Configura tu Suscripcion
      </h3>

      {option_groups.map((group) => (
        <div key={group.id} style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.5rem' }}>
            {group.name}
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {group.options.map((opt) => {
              const isSelected = selections[group.id] === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelections({ ...selections, [group.id]: opt })}
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: 'var(--md-shape-sm)',
                    border: isSelected ? '2px solid var(--md-sys-color-primary)' : '1px solid var(--md-sys-color-outline-variant)',
                    backgroundColor: isSelected ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface)',
                    color: isSelected ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 120ms ease',
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{ padding: '0.75rem', backgroundColor: 'var(--md-sys-color-surface-container)', borderRadius: 'var(--md-shape-sm)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--md-sys-color-primary)', textAlign: 'center' }}>
        {summary_preview}
      </div>
    </div>
  );
}

export function CustomerPortalWidget({ props = {}, deviceViewport = 'desktop' }) {
  const {
    tabs = ['MI PERFIL', 'HISTORIAL DE PEDIDOS', 'SUSCRIPCIONES'],
    order_list = [
      { id: 'PEDIDO #1001', date: '2026-10-20', total: '$34.500 CLP', status: 'Entregado' },
    ],
  } = props;

  const isMobile = deviceViewport === 'mobile';
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      style={{
        backgroundColor: 'var(--md-sys-color-surface-container-lowest)',
        border: '1px solid var(--md-sys-color-outline-variant)',
        borderRadius: 'var(--md-shape-xl)',
        padding: isMobile ? '1.15rem' : '1.75rem',
        boxShadow: 'var(--md-elevation-1)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--md-sys-color-outline-variant)', paddingBottom: '0.75rem', marginBottom: '1.25rem', overflowX: 'auto' }}>
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveTab(idx)}
            style={{
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--md-shape-full)',
              border: 'none',
              backgroundColor: activeTab === idx ? 'var(--md-sys-color-primary-container)' : 'transparent',
              color: activeTab === idx ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface-variant)',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'background-color 120ms ease',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)', marginBottom: '0.75rem' }}>
          {tabs[activeTab]}
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {order_list.map((ord) => (
            <div key={ord.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--md-sys-color-surface-container-low)', borderRadius: 'var(--md-shape-sm)' }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--md-sys-color-on-surface)' }}>{ord.id}</span>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--md-sys-color-on-surface-variant)' }}>{ord.date}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--md-sys-color-primary)' }}>{ord.total}</span>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--md-sys-color-on-surface-variant)' }}>{ord.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
