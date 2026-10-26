/*
 * Module: FormsAndPortalInspector
 * Description: Inspector configuration panels for Form Builder, Subscription Configurator, and Customer Portal
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial modular implementation of form fields and member portal inspectors.
 */

import React from 'react';
import { Plus, Trash2, FileText, Sliders, ShieldCheck } from 'lucide-react';

export function GenericFormInspector({ currentProps = {}, onFieldChange }) {
  const fields = currentProps.fields || [];
  const submitButton = currentProps.submit_button || 'ENVIAR MENSAJE';
  const successMessage = currentProps.success_message || 'Tu solicitud ha sido enviada con exito.';
  const notificationEmail = currentProps.notification_email || 'contacto@tiendaonline.cl';

  const handleAddField = () => {
    const newField = {
      name: `campo_${fields.length + 1}`,
      label: 'Nuevo Campo',
      type: 'text',
      placeholder: 'Escribe aqui...',
      required: false,
    };
    onFieldChange('fields', [...fields, newField]);
  };

  const handleRemoveField = (idx) => {
    onFieldChange('fields', fields.filter((_, i) => i !== idx));
  };

  const handleUpdateField = (idx, prop, val) => {
    const next = [...fields];
    next[idx] = { ...next[idx], [prop]: val };
    onFieldChange('fields', next);
  };

  return (
    <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
        Configuracion de Formulario de Captura
      </h4>

      {/* Button & Notification Email */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.25rem' }}>
            Texto del Boton
          </label>
          <input
            type="text"
            value={submitButton}
            onChange={(e) => onFieldChange('submit_button', e.target.value)}
            style={{ width: '100%', padding: '0.4rem 0.6rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.8rem', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.25rem' }}>
            Correo Notificacion
          </label>
          <input
            type="email"
            value={notificationEmail}
            onChange={(e) => onFieldChange('notification_email', e.target.value)}
            style={{ width: '100%', padding: '0.4rem 0.6rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.8rem', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.25rem' }}>
          Mensaje de Confirmacion
        </label>
        <textarea
          rows={2}
          value={successMessage}
          onChange={(e) => onFieldChange('success_message', e.target.value)}
          style={{ width: '100%', padding: '0.4rem 0.6rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.8rem', boxSizing: 'border-box', fontFamily: 'inherit' }}
        />
      </div>

      {/* Fields List */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)' }}>
            Campos del Formulario ({fields.length})
          </label>
          <button
            type="button"
            onClick={handleAddField}
            style={{ padding: '0.2rem 0.55rem', borderRadius: 'var(--md-shape-full)', border: 'none', backgroundColor: 'var(--md-sys-color-primary)', color: 'var(--md-sys-color-on-primary)', fontSize: '0.725rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
          >
            <Plus size={12} />
            <span>Anadir Campo</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {fields.map((f, idx) => (
            <div
              key={idx}
              style={{
                padding: '0.6rem',
                borderRadius: 'var(--md-shape-md)',
                backgroundColor: 'var(--md-sys-color-surface-container)',
                border: '1px solid var(--md-sys-color-outline-variant)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <input
                  type="text"
                  placeholder="Etiqueta visible"
                  value={f.label || ''}
                  onChange={(e) => handleUpdateField(idx, 'label', e.target.value)}
                  style={{ fontWeight: 700, width: '60%', padding: '0.3rem 0.5rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.8rem' }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(idx)}
                  style={{ background: 'none', border: 'none', color: 'var(--md-sys-color-error)', cursor: 'pointer', padding: 0 }}
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem', marginBottom: '0.35rem' }}>
                <select
                  value={f.type || 'text'}
                  onChange={(e) => handleUpdateField(idx, 'type', e.target.value)}
                  style={{ padding: '0.35rem 0.5rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.75rem' }}
                >
                  <option value="text">Texto corto</option>
                  <option value="email">Correo electronico</option>
                  <option value="tel">Telefono</option>
                  <option value="textarea">Area de texto</option>
                </select>
                <input
                  type="text"
                  placeholder="Placeholder"
                  value={f.placeholder || ''}
                  onChange={(e) => handleUpdateField(idx, 'placeholder', e.target.value)}
                  style={{ padding: '0.35rem 0.5rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.75rem' }}
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--md-sys-color-on-surface-variant)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={!!f.required}
                  onChange={(e) => handleUpdateField(idx, 'required', e.target.checked)}
                  style={{ accentColor: 'var(--md-sys-color-primary)', cursor: 'pointer' }}
                />
                <span>Campo obligatorio</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SubscriptionAndPortalInspector({ widgetType, currentProps = {}, onFieldChange }) {
  if (widgetType === 'subscription_configurator') {
    const summaryPreview = currentProps.summary_preview || '';
    const optionGroups = currentProps.option_groups || [];

    return (
      <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
          Configurador de Suscripciones
        </h4>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
            Texto de Resumen Estimado
          </label>
          <input
            type="text"
            value={summaryPreview}
            onChange={(e) => onFieldChange('summary_preview', e.target.value)}
            style={{ width: '100%', padding: '0.45rem 0.65rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.8rem', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
            Grupos de Opciones ({optionGroups.length})
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {optionGroups.map((grp, i) => (
              <div key={i} style={{ padding: '0.55rem', borderRadius: 'var(--md-shape-sm)', backgroundColor: 'var(--md-sys-color-surface-container)', border: '1px solid var(--md-sys-color-outline-variant)' }}>
                <input
                  type="text"
                  placeholder="Nombre del grupo"
                  value={grp.name || ''}
                  onChange={(e) => {
                    const next = [...optionGroups];
                    next[i] = { ...next[i], name: e.target.value };
                    onFieldChange('option_groups', next);
                  }}
                  style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.78rem', marginBottom: '0.35rem', boxSizing: 'border-box' }}
                />
                <input
                  type="text"
                  placeholder="Opciones (separadas por coma)"
                  value={(grp.options || []).join(', ')}
                  onChange={(e) => {
                    const next = [...optionGroups];
                    next[i] = { ...next[i], options: e.target.value.split(',').map((s) => s.trim()) };
                    onFieldChange('option_groups', next);
                  }}
                  style={{ width: '100%', padding: '0.35rem 0.5rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.75rem', boxSizing: 'border-box' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (widgetType === 'customer_portal') {
    const tabs = currentProps.tabs || ['MI PERFIL', 'HISTORIAL DE PEDIDOS', 'SUSCRIPCIONES'];

    return (
      <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
          Pestanas del Area de Clientes
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {tabs.map((tab, idx) => (
            <input
              key={idx}
              type="text"
              value={tab}
              onChange={(e) => {
                const next = [...tabs];
                next[idx] = e.target.value;
                onFieldChange('tabs', next);
              }}
              style={{ padding: '0.35rem 0.5rem', borderRadius: 'var(--md-shape-sm)', border: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.78rem' }}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}
