/*
 * Module: CheckoutDrawerWidgets
 * Description: Renders Cart Drawer, Multi-step Checkout, Shipping Selector, and Coupon widgets (Widgets 7, 8, 9, 10)
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of transaction and checkout widgets.
 * - 2026-10-26 [v1.3.0]: Added mobile column stacking, variant handling, and onNavigate handling.
 */

import React, { useState } from 'react';
import { ShoppingCart, Truck, Tag, CreditCard, Check, ArrowRight } from 'lucide-react';

export function CartDrawerWidget({ props = {}, onNavigate = () => {}, deviceViewport = 'desktop' }) {
  const {
    variant = 'standard',
    position = 'right',
    show_subtotal = true,
    show_coupon_field = true,
    cta_checkout = 'PROCEDER AL PAGO',
  } = props;

  const isMobile = deviceViewport === 'mobile';

  return (
    <div
      style={{
        maxWidth: isMobile ? '100%' : '380px',
        margin: '0 auto',
        backgroundColor: 'var(--md-sys-color-surface)',
        border: '1px solid var(--md-sys-color-outline-variant)',
        borderRadius: 'var(--md-shape-lg)',
        padding: isMobile ? '1rem' : '1.5rem',
        boxShadow: 'var(--md-elevation-2)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--md-sys-color-outline-variant)', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShoppingCart size={18} color="var(--md-sys-color-primary)" />
          <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>
            Carrito de Compras
          </h4>
        </div>
        <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--md-sys-color-primary-container)', color: 'var(--md-sys-color-on-primary-container)', padding: '0.15rem 0.5rem', borderRadius: 'var(--md-shape-full)', fontWeight: 700 }}>
          1 item
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.5rem', backgroundColor: 'var(--md-sys-color-surface-container-low)', borderRadius: 'var(--md-shape-sm)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--md-shape-xs)', backgroundColor: 'var(--md-sys-color-surface-container-high)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingCart size={20} opacity={0.6} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--md-sys-color-on-surface)' }}>ARTICULO EN TU CARRITO</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--md-sys-color-on-surface-variant)' }}>1 x $45.000 CLP</div>
          </div>
        </div>
      </div>

      {show_coupon_field && (
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Codigo promocional"
            style={{
              flex: 1,
              padding: '0.45rem 0.65rem',
              borderRadius: 'var(--md-shape-sm)',
              border: '1px solid var(--md-sys-color-outline-variant)',
              backgroundColor: 'var(--md-sys-color-surface-container-lowest)',
              color: 'var(--md-sys-color-on-surface)',
              fontSize: '0.8rem',
            }}
          />
          <button
            type="button"
            style={{
              padding: '0.45rem 0.85rem',
              backgroundColor: 'var(--md-sys-color-secondary)',
              color: 'var(--md-sys-color-on-secondary)',
              border: 'none',
              borderRadius: 'var(--md-shape-sm)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Aplicar
          </button>
        </div>
      )}

      {show_subtotal && (
        <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--md-sys-color-on-surface-variant)' }}>
            <span>Subtotal estimado:</span>
            <span style={{ fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>$45.000 CLP</span>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => onNavigate('/#1')}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: 'var(--md-sys-color-primary)',
          color: 'var(--md-sys-color-on-primary)',
          border: 'none',
          borderRadius: 'var(--md-shape-full)',
          fontWeight: 700,
          fontSize: '0.875rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          boxShadow: 'var(--md-elevation-1)',
          transition: 'transform 120ms ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        <span>{cta_checkout}</span>
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

export function CheckoutWidget({ props = {}, deviceViewport = 'desktop' }) {
  const {
    steps = ['DATOS', 'ENVIO', 'PAGO', 'CONFIRMACION'],
    delivery_options = [
      { name: 'Envio a Domicilio', cost: '$4.990' },
      { name: 'Retiro en Punto', cost: 'Gratis' },
    ],
    confirmation_message = 'Gracias por tu compra. Te enviaremos el comprobante al correo.',
  } = props;

  const isMobile = deviceViewport === 'mobile';
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div
      style={{
        backgroundColor: 'var(--md-sys-color-surface-container-lowest)',
        border: '1px solid var(--md-sys-color-outline-variant)',
        borderRadius: 'var(--md-shape-xl)',
        padding: isMobile ? '1.25rem' : '2rem',
        boxShadow: 'var(--md-elevation-1)',
        maxWidth: '680px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--md-sys-color-outline-variant)', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        {steps.map((st, i) => (
          <div
            key={i}
            onClick={() => setActiveStep(i)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem',
              color: activeStep === i ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface-variant)',
            }}
          >
            <span
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: activeStep === i ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface-container)',
                color: activeStep === i ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-on-surface-variant)',
                fontSize: '0.7rem',
                fontWeight: 700,
              }}
            >
              {i + 1}
            </span>
            <span>{st}</span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)', marginBottom: '0.85rem' }}>
          Paso {activeStep + 1}: {steps[activeStep] || 'Detalle'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0.65rem', marginBottom: '0.85rem' }}>
          <input
            placeholder="Nombre y Apellidos"
            style={{ padding: '0.55rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.85rem' }}
          />
          <input
            placeholder="RUT / DNI"
            style={{ padding: '0.55rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.85rem' }}
          />
        </div>
        <input
          placeholder="Direccion y Comuna de entrega"
          style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', boxSizing: 'border-box', marginBottom: '0.85rem', fontSize: '0.85rem' }}
        />
        <div style={{ fontSize: '0.78rem', color: 'var(--md-sys-color-on-surface-variant)', fontStyle: 'italic' }}>
          {confirmation_message}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
          style={{
            padding: '0.65rem 1.4rem',
            backgroundColor: 'var(--md-sys-color-primary)',
            color: 'var(--md-sys-color-on-primary)',
            border: 'none',
            borderRadius: 'var(--md-shape-full)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          {activeStep === steps.length - 1 ? 'Finalizar Pedido' : 'Siguiente Paso'}
        </button>
      </div>
    </div>
  );
}

export function ShippingSelectorWidget({ props = {} }) {
  const {
    options = ['Envio a Domicilio', 'Retiro en Punto Autorizado'],
    default_option = 'Envio a Domicilio',
    show_cost = true,
    show_eta = true,
  } = props;

  const [selected, setSelected] = useState(default_option);

  return (
    <div
      style={{
        backgroundColor: 'var(--md-sys-color-surface-container-low)',
        border: '1px solid var(--md-sys-color-outline-variant)',
        borderRadius: 'var(--md-shape-lg)',
        padding: '1.15rem',
        boxShadow: 'var(--md-elevation-1)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
        <Truck size={18} color="var(--md-sys-color-primary)" />
        <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>
          Modalidad de Despacho
        </h4>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {options.map((opt, i) => (
          <label
            key={i}
            onClick={() => setSelected(opt)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--md-shape-sm)',
              border: selected === opt ? '2px solid var(--md-sys-color-primary)' : '1px solid var(--md-sys-color-outline-variant)',
              backgroundColor: selected === opt ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface)',
              cursor: 'pointer',
              transition: 'all 100ms ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="radio" name="shipping_radio" checked={selected === opt} onChange={() => setSelected(opt)} />
              <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--md-sys-color-on-surface)' }}>{opt}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              {show_cost && <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--md-sys-color-primary)' }}>{i === 0 ? '$4.990' : 'Gratis'}</span>}
              {show_eta && <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--md-sys-color-on-surface-variant)' }}>{i === 0 ? '24-48 hrs' : 'Inmediato'}</span>}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export function CouponFieldWidget({ props = {} }) {
  const {
    placeholder = 'INGRESA TU CODIGO DE CUPON',
    button_label = 'APLICAR CUPON',
    validation_message = 'Descuento aplicado correctamente',
  } = props;

  const [code, setCode] = useState('');
  const [applied, setApplied] = useState(false);

  return (
    <div
      style={{
        backgroundColor: 'var(--md-sys-color-surface-container-low)',
        border: '1px solid var(--md-sys-color-outline-variant)',
        borderRadius: 'var(--md-shape-lg)',
        padding: '1.15rem',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.65rem' }}>
        <Tag size={16} color="var(--md-sys-color-primary)" />
        <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--md-sys-color-on-surface)' }}>Codigo Promocional</span>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            padding: '0.5rem 0.65rem',
            borderRadius: 'var(--md-shape-sm)',
            border: '1px solid var(--md-sys-color-outline-variant)',
            backgroundColor: 'var(--md-sys-color-surface)',
            color: 'var(--md-sys-color-on-surface)',
            fontSize: '0.825rem',
          }}
        />
        <button
          type="button"
          onClick={() => setApplied(true)}
          style={{
            padding: '0.5rem 0.9rem',
            backgroundColor: 'var(--md-sys-color-primary)',
            color: 'var(--md-sys-color-on-primary)',
            border: 'none',
            borderRadius: 'var(--md-shape-sm)',
            fontWeight: 700,
            fontSize: '0.825rem',
            cursor: 'pointer',
          }}
        >
          {button_label}
        </button>
      </div>
      {applied && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--md-sys-color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Check size={14} />
          <span>{validation_message}</span>
        </div>
      )}
    </div>
  );
}
