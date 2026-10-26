/*
 * Module: InteractiveFormWidgets
 * Description: Renders forms and interaction widgets (Widgets 11, 12, 21, 22: Differentiated CTA, Generic Form, Floating Contact, Social Links)
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of interaction and form widgets.
 * - 2026-10-26 [v1.3.0]: Added variant handling (banner/clean/brand/icons), onNavigate click handler, and mobile responsiveness.
 * - 2026-10-26 [v1.4.0]: Added dynamic network URL navigation and external tab opening for SocialLinksWidget.
 */

import React, { useState } from 'react';
import { ArrowRight, Send, MessageCircle, Share2, Check, Briefcase, ExternalLink } from 'lucide-react';

export function DifferentiatedCtaWidget({ props = {}, onNavigate = () => {}, deviceViewport = 'desktop' }) {
  const {
    variant = 'standard',
    label = 'BOTON DESTACADO: VENTA MAYORISTA / EMPRESAS',
    link = '/#1',
    style = 'filled',
    position = 'inline',
  } = props;

  const isBanner = variant === 'banner';
  const isFilled = style === 'filled';
  const isMobile = deviceViewport === 'mobile';

  if (isBanner) {
    return (
      <div
        onClick={() => onNavigate(link)}
        style={{
          padding: isMobile ? '1rem' : '1rem 1.5rem',
          margin: '0.75rem 0',
          backgroundColor: 'var(--md-sys-color-primary-container)',
          color: 'var(--md-sys-color-on-primary-container)',
          borderRadius: 'var(--md-shape-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          boxShadow: 'var(--md-elevation-1)',
          transition: 'transform 120ms ease',
          boxSizing: 'border-box',
          width: '100%',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <Briefcase size={20} />
          <span style={{ fontWeight: 800, fontSize: isMobile ? '0.85rem' : '0.95rem' }}>{label}</span>
        </div>
        <ArrowRight size={18} />
      </div>
    );
  }

  return (
    <div style={{ textAlign: position === 'inline' ? 'center' : 'right', padding: '0.75rem 0', width: '100%', boxSizing: 'border-box' }}>
      <button
        type="button"
        onClick={() => onNavigate(link)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '0.8rem 1.75rem',
          borderRadius: 'var(--md-shape-full)',
          backgroundColor: isFilled ? 'var(--md-sys-color-primary)' : 'transparent',
          color: isFilled ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-primary)',
          border: isFilled ? 'none' : '2px solid var(--md-sys-color-primary)',
          fontWeight: 700,
          fontSize: '0.875rem',
          boxShadow: 'var(--md-elevation-1)',
          cursor: 'pointer',
          width: isMobile ? '100%' : 'auto',
          transition: 'transform 120ms ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        <Briefcase size={16} />
        <span>{label}</span>
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

export function GenericFormWidget({ props = {}, deviceViewport = 'desktop' }) {
  const {
    variant = 'standard',
    fields = [
      { name: 'nombre', label: 'Nombre completo', type: 'text', placeholder: 'Tu nombre' },
      { name: 'email', label: 'Correo electronico', type: 'email', placeholder: 'ejemplo@correo.com' },
      { name: 'mensaje', label: 'Mensaje o consulta', type: 'textarea', placeholder: 'Escribe tu mensaje...' },
    ],
    submit_button = 'ENVIAR MENSAJE',
    success_message = 'Tu solicitud ha sido enviada con exito.',
  } = props;

  const isClean = variant === 'clean';
  const isMobile = deviceViewport === 'mobile';
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      style={{
        backgroundColor: isClean ? 'transparent' : 'var(--md-sys-color-surface-container-low)',
        border: isClean ? 'none' : '1px solid var(--md-sys-color-outline-variant)',
        borderRadius: 'var(--md-shape-lg)',
        padding: isMobile ? '1.25rem' : '2rem',
        maxWidth: '560px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
        boxShadow: isClean ? 'none' : 'var(--md-elevation-1)',
      }}
    >
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)', marginBottom: '1.25rem' }}>
        Formulario de Contacto
      </h3>

      {submitted ? (
        <div style={{ padding: '1rem', backgroundColor: 'var(--md-sys-color-primary-container)', color: 'var(--md-sys-color-on-primary-container)', borderRadius: 'var(--md-shape-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Check size={18} />
          <span>{success_message}</span>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
        >
          {fields.map((f, idx) => (
            <div key={idx}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
                {f.label}
              </label>
              {f.type === 'textarea' ? (
                <textarea
                  rows={3}
                  placeholder={f.placeholder}
                  required
                  style={{
                    width: '100%',
                    padding: '0.55rem',
                    borderRadius: 'var(--md-shape-sm)',
                    border: '1px solid var(--md-sys-color-outline-variant)',
                    backgroundColor: 'var(--md-sys-color-surface)',
                    color: 'var(--md-sys-color-on-surface)',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    fontSize: '0.85rem',
                  }}
                />
              ) : (
                <input
                  type={f.type || 'text'}
                  placeholder={f.placeholder}
                  required
                  style={{
                    width: '100%',
                    padding: '0.55rem',
                    borderRadius: 'var(--md-shape-sm)',
                    border: '1px solid var(--md-sys-color-outline-variant)',
                    backgroundColor: 'var(--md-sys-color-surface)',
                    color: 'var(--md-sys-color-on-surface)',
                    boxSizing: 'border-box',
                    fontSize: '0.85rem',
                  }}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--md-sys-color-primary)',
              color: 'var(--md-sys-color-on-primary)',
              border: 'none',
              borderRadius: 'var(--md-shape-full)',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              boxShadow: 'var(--md-elevation-1)',
              transition: 'transform 100ms ease',
            }}
          >
            <Send size={15} />
            <span>{submit_button}</span>
          </button>
        </form>
      )}
    </div>
  );
}

export function FloatingContactWidget({ props = {} }) {
  const {
    variant = 'standard',
    channel = 'WhatsApp',
    number_or_link = '+56912345678',
    message_template = 'Hola, tengo una consulta sobre sus productos.',
  } = props;

  const isBrand = variant === 'brand';

  const handleClick = () => {
    const cleanNum = number_or_link.replace(/\D/g, '');
    const url = `https://wa.me/${cleanNum}?text=${encodeURIComponent(message_template)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.65rem 1.25rem',
        borderRadius: 'var(--md-shape-full)',
        backgroundColor: isBrand ? 'var(--md-sys-color-primary)' : '#25D366',
        color: '#ffffff',
        fontWeight: 700,
        fontSize: '0.85rem',
        boxShadow: 'var(--md-elevation-3)',
        cursor: 'pointer',
        transition: 'transform 120ms ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <MessageCircle size={18} />
      <span>{channel}: {number_or_link}</span>
    </div>
  );
}

export function SocialLinksWidget({ props = {}, onNavigate = () => {} }) {
  const {
    variant = 'standard',
    networks = ['Instagram', 'Facebook', 'LinkedIn', 'WhatsApp'],
    urls = {
      Instagram: 'https://instagram.com',
      Facebook: 'https://facebook.com',
      LinkedIn: 'https://linkedin.com',
      WhatsApp: 'https://whatsapp.com',
    },
    open_new_tab = true,
  } = props;

  const isIcons = variant === 'icons';

  const handleNetworkClick = (net) => {
    const targetUrl = (urls && urls[net]) || '#';
    if (!targetUrl || targetUrl === '#') return;
    if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://')) {
      if (open_new_tab && typeof window !== 'undefined') {
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
      } else if (typeof window !== 'undefined') {
        window.location.href = targetUrl;
      }
    } else {
      onNavigate(targetUrl);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', justifyContent: 'center', padding: '0.75rem 0', flexWrap: 'wrap' }}>
      <Share2 size={16} color="var(--md-sys-color-primary)" />
      {networks.map((net, i) => (
        <button
          key={i}
          type="button"
          onClick={() => handleNetworkClick(net)}
          title={`Visitar ${net}: ${(urls && urls[net]) || 'Sin enlace asignado'}`}
          style={{
            padding: isIcons ? '0.55rem' : '0.4rem 0.9rem',
            borderRadius: isIcons ? '50%' : 'var(--md-shape-full)',
            backgroundColor: 'var(--md-sys-color-surface-container)',
            color: 'var(--md-sys-color-on-surface)',
            fontSize: '0.8rem',
            fontWeight: 600,
            border: '1px solid var(--md-sys-color-outline-variant)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'all 120ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--md-sys-color-primary-container)';
            e.currentTarget.style.color = 'var(--md-sys-color-on-primary-container)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--md-sys-color-surface-container)';
            e.currentTarget.style.color = 'var(--md-sys-color-on-surface)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>{isIcons ? net.slice(0, 2).toUpperCase() : net}</span>
          {!isIcons && <ExternalLink size={11} opacity={0.7} />}
        </button>
      ))}
    </div>
  );
}

