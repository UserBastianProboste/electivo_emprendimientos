/*
 * Module: CommerceInspector
 * Description: Inspector configuration panels for catalog filters, product details, checkout, shipping, and coupons
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial modular implementation of commerce and checkout property inspectors.
 */

import React from 'react';
import { Plus, Trash2, Sliders, Layers, Tag, Truck, ShoppingCart } from 'lucide-react';

export function CatalogFiltersInspector({ currentProps = {}, onFieldChange }) {
  const dynamicSource = currentProps.dynamic_source || 'Coleccion General';
  const filterFields = currentProps.filter_fields || ['CATEGORIA 1', 'CATEGORIA 2', 'EN STOCK'];
  const showCount = currentProps.show_count !== false;

  const handleAddField = () => {
    const newName = prompt('Nombre de la nueva categoria o filtro:');
    if (!newName || !newName.trim()) return;
    onFieldChange('filter_fields', [...filterFields, newName.trim()]);
  };

  const handleRemoveField = (idx) => {
    onFieldChange('filter_fields', filterFields.filter((_, i) => i !== idx));
  };

  const handleUpdateField = (idx, val) => {
    const next = [...filterFields];
    next[idx] = val;
    onFieldChange('filter_fields', next);
  };

  return (
    <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
        Configuracion de Filtros de Catalogo
      </h4>

      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
          Titulo de la Coleccion
        </label>
        <input
          type="text"
          value={dynamicSource}
          onChange={(e) => onFieldChange('dynamic_source', e.target.value)}
          placeholder="Coleccion General"
          style={{
            width: '100%',
            padding: '0.45rem 0.65rem',
            borderRadius: 'var(--md-shape-sm)',
            border: '1px solid var(--md-sys-color-outline-variant)',
            backgroundColor: 'var(--md-sys-color-surface)',
            color: 'var(--md-sys-color-on-surface)',
            fontSize: '0.825rem',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)' }}>
          Filtros y Categorias ({filterFields.length})
        </label>
        <button
          type="button"
          onClick={handleAddField}
          style={{
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--md-shape-full)',
            border: 'none',
            backgroundColor: 'var(--md-sys-color-primary)',
            color: 'var(--md-sys-color-on-primary)',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <Plus size={12} />
          <span>Anadir Filtro</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {filterFields.map((f, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <input
              type="text"
              value={f}
              onChange={(e) => handleUpdateField(idx, e.target.value)}
              style={{
                flex: 1,
                padding: '0.4rem 0.6rem',
                borderRadius: 'var(--md-shape-sm)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                backgroundColor: 'var(--md-sys-color-surface)',
                color: 'var(--md-sys-color-on-surface)',
                fontSize: '0.8rem',
              }}
            />
            <button
              type="button"
              onClick={() => handleRemoveField(idx)}
              title="Eliminar filtro"
              style={{ background: 'none', border: 'none', color: 'var(--md-sys-color-error)', cursor: 'pointer', padding: '0.2rem' }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--md-sys-color-on-surface)', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={showCount}
          onChange={(e) => onFieldChange('show_count', e.target.checked)}
          style={{ accentColor: 'var(--md-sys-color-primary)', cursor: 'pointer' }}
        />
        <span>Mostrar contador numerico de productos</span>
      </label>
    </div>
  );
}

export function ProductDetailInspector({ currentProps = {}, onFieldChange }) {
  const gallery = currentProps.gallery || [];
  const attributes = currentProps.attributes || [];
  const description = currentProps.description || '';
  const addToCartBtn = currentProps.add_to_cart_button || 'ANADIR AL CARRITO';
  const secondaryCta = currentProps.secondary_cta || 'COMPRAR CON 1 CLIC';

  const handleAddImage = () => {
    const url = prompt('Ingresa la URL de la nueva fotografia para la galeria:');
    if (!url || !url.trim()) return;
    onFieldChange('gallery', [...gallery, url.trim()]);
  };

  const handleRemoveImage = (idx) => {
    onFieldChange('gallery', gallery.filter((_, i) => i !== idx));
  };

  const handleAddAttribute = () => {
    const label = prompt('Nombre del atributo (ej. MATERIAL, ORIGEN, MEDIDAS):');
    if (!label || !label.trim()) return;
    const value = prompt(`Valor para "${label}" (ej. 100% Algodon):`) || '';
    onFieldChange('attributes', [...attributes, { label: label.trim(), value: value.trim() }]);
  };

  const handleRemoveAttribute = (idx) => {
    onFieldChange('attributes', attributes.filter((_, i) => i !== idx));
  };

  return (
    <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
        Ficha y Detalle de Producto
      </h4>

      {/* Description */}
      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
          Descripcion del Articulo
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => onFieldChange('description', e.target.value)}
          style={{
            width: '100%',
            padding: '0.45rem 0.65rem',
            borderRadius: 'var(--md-shape-sm)',
            border: '1px solid var(--md-sys-color-outline-variant)',
            backgroundColor: 'var(--md-sys-color-surface)',
            color: 'var(--md-sys-color-on-surface)',
            fontSize: '0.8rem',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
          }}
        />
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.25rem' }}>
            Boton Principal
          </label>
          <input
            type="text"
            value={addToCartBtn}
            onChange={(e) => onFieldChange('add_to_cart_button', e.target.value)}
            style={{ width: '100%', padding: '0.4rem 0.6rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.8rem', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.25rem' }}>
            Boton Secundario
          </label>
          <input
            type="text"
            value={secondaryCta}
            onChange={(e) => onFieldChange('secondary_cta', e.target.value)}
            style={{ width: '100%', padding: '0.4rem 0.6rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.8rem', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {/* Gallery Images */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)' }}>
            Fotos de Galeria ({gallery.length})
          </label>
          <button
            type="button"
            onClick={handleAddImage}
            style={{ padding: '0.2rem 0.5rem', borderRadius: 'var(--md-shape-full)', border: 'none', backgroundColor: 'var(--md-sys-color-primary)', color: 'var(--md-sys-color-on-primary)', fontSize: '0.725rem', fontWeight: 700, cursor: 'pointer' }}
          >
            + Foto
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {gallery.map((imgUrl, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
              <input
                type="text"
                value={imgUrl}
                onChange={(e) => {
                  const next = [...gallery];
                  next[i] = e.target.value;
                  onFieldChange('gallery', next);
                }}
                style={{ flex: 1, padding: '0.35rem 0.5rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.75rem' }}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(i)}
                style={{ background: 'none', border: 'none', color: 'var(--md-sys-color-error)', cursor: 'pointer', padding: 0 }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Attributes */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)' }}>
            Atributos y Especificaciones ({attributes.length})
          </label>
          <button
            type="button"
            onClick={handleAddAttribute}
            style={{ padding: '0.2rem 0.5rem', borderRadius: 'var(--md-shape-full)', border: 'none', backgroundColor: 'var(--md-sys-color-primary)', color: 'var(--md-sys-color-on-primary)', fontSize: '0.725rem', fontWeight: 700, cursor: 'pointer' }}
          >
            + Atributo
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {attributes.map((attr, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Etiqueta"
                value={attr.label || ''}
                onChange={(e) => {
                  const next = [...attributes];
                  next[idx] = { ...next[idx], label: e.target.value };
                  onFieldChange('attributes', next);
                }}
                style={{ width: '40%', padding: '0.35rem 0.5rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.75rem' }}
              />
              <input
                type="text"
                placeholder="Valor"
                value={attr.value || ''}
                onChange={(e) => {
                  const next = [...attributes];
                  next[idx] = { ...next[idx], value: e.target.value };
                  onFieldChange('attributes', next);
                }}
                style={{ flex: 1, padding: '0.35rem 0.5rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.75rem' }}
              />
              <button
                type="button"
                onClick={() => handleRemoveAttribute(idx)}
                style={{ background: 'none', border: 'none', color: 'var(--md-sys-color-error)', cursor: 'pointer', padding: 0 }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CheckoutAndShippingInspector({ widgetType, currentProps = {}, onFieldChange }) {
  if (widgetType === 'checkout_flow') {
    const steps = currentProps.steps || ['DATOS', 'ENVIO', 'PAGO', 'CONFIRMACION'];
    const confirmationMessage = currentProps.confirmation_message || '';

    return (
      <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
          Configuracion de Checkout
        </h4>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
            Pasos de Checkout ({steps.length})
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {steps.map((st, i) => (
              <input
                key={i}
                type="text"
                value={st}
                onChange={(e) => {
                  const next = [...steps];
                  next[i] = e.target.value;
                  onFieldChange('steps', next);
                }}
                style={{ padding: '0.35rem 0.5rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.75rem' }}
              />
            ))}
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
            Mensaje de Exito Final
          </label>
          <textarea
            rows={2}
            value={confirmationMessage}
            onChange={(e) => onFieldChange('confirmation_message', e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.8rem', boxSizing: 'border-box', fontFamily: 'inherit' }}
          />
        </div>
      </div>
    );
  }

  if (widgetType === 'coupon_field') {
    return (
      <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
          Campo de Cupon y Descuento
        </h4>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
            Texto Guia (Placeholder)
          </label>
          <input
            type="text"
            value={currentProps.placeholder || ''}
            onChange={(e) => onFieldChange('placeholder', e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.8rem', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
            Texto del Boton
          </label>
          <input
            type="text"
            value={currentProps.button_label || ''}
            onChange={(e) => onFieldChange('button_label', e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.8rem', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
            Mensaje de Validacion
          </label>
          <input
            type="text"
            value={currentProps.validation_message || ''}
            onChange={(e) => onFieldChange('validation_message', e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.8rem', boxSizing: 'border-box' }}
          />
        </div>
      </div>
    );
  }

  return null;
}
