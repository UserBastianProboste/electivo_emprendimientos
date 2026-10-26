/*
 * Module: WidgetRenderer
 * Description: Dynamic dispatcher rendering individual widgets based on type with canvas editing chrome and error boundaries
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of widget dispatcher with canvas controls.
 * - 2026-10-26 [v1.3.0]: Added vertical position index badges (#N), anchor ids (widget-N), onNavigate dispatcher, and WidgetErrorBoundary.
 */

import React from 'react';
import { HeroBannerWidget } from './widgets/HeroBannerWidget';
import { TextImageWidget } from './widgets/TextImageWidget';
import { CardsGridWidget } from './widgets/CardsGridWidget';
import {
  CatalogFiltersWidget,
  ProductCardWidget,
  ProductDetailWidget,
} from './widgets/CatalogCommerceWidgets';
import {
  CartDrawerWidget,
  CheckoutWidget,
  ShippingSelectorWidget,
  CouponFieldWidget,
} from './widgets/CheckoutDrawerWidgets';
import {
  DifferentiatedCtaWidget,
  GenericFormWidget,
  FloatingContactWidget,
  SocialLinksWidget,
} from './widgets/InteractiveFormWidgets';
import {
  PlansMembershipWidget,
  SubscriptionConfiguratorWidget,
  CustomerPortalWidget,
} from './widgets/MembershipPortalWidgets';
import {
  ContentBlogGridWidget,
  VideoGalleryWidget,
  AccordionFaqWidget,
} from './widgets/MediaContentWidgets';
import {
  NavMenuWidget,
  BreadcrumbsWidget,
  FooterWidget,
  ToastNotificationWidget,
  ContainerLayoutWidget,
} from './widgets/StructureNavWidgets';
import {
  ArrowUp,
  ArrowDown,
  Trash2,
  Copy,
  Settings,
} from 'lucide-react';
import { WIDGET_DEFINITIONS } from '../../data/widgetDefinitions';
import { WidgetErrorBoundary } from '../common/WidgetErrorBoundary';

export function WidgetRenderer({
  widget,
  index,
  totalWidgets,
  isSelected,
  isEditMode,
  deviceViewport = 'desktop',
  onSelect,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onNavigate = () => {},
}) {
  const definition = WIDGET_DEFINITIONS.find((d) => d.type === widget.type) || {
    name: widget.type,
    number: index + 1,
  };

  const verticalPosition = index + 1;
  const widgetAnchorId = `widget-${verticalPosition}`;

  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'hero_banner':
        return <HeroBannerWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'text_image':
        return <TextImageWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'cards_grid':
        return <CardsGridWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'catalog_filters':
        return <CatalogFiltersWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'product_card':
        return <ProductCardWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'product_detail':
        return <ProductDetailWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'cart_drawer':
        return <CartDrawerWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'checkout_flow':
        return <CheckoutWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'shipping_selector':
        return <ShippingSelectorWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'coupon_field':
        return <CouponFieldWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'differentiated_cta':
        return <DifferentiatedCtaWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'generic_form':
        return <GenericFormWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'membership_plans':
        return <PlansMembershipWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'subscription_configurator':
        return <SubscriptionConfiguratorWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'customer_portal':
        return <CustomerPortalWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'blog_grid':
        return <ContentBlogGridWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'video_gallery':
        return <VideoGalleryWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'faq_accordion':
        return <AccordionFaqWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'navigation_menu':
        return <NavMenuWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'breadcrumbs':
        return <BreadcrumbsWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'floating_contact':
        return <FloatingContactWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'social_links':
        return <SocialLinksWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'footer_block':
        return <FooterWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'toast_notification':
        return <ToastNotificationWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      case 'container_layout':
        return <ContainerLayoutWidget props={widget.props} onNavigate={onNavigate} deviceViewport={deviceViewport} />;
      default:
        return (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--md-sys-color-on-surface-variant)' }}>
            Widget desconocido: {widget.type}
          </div>
        );
    }
  };

  if (!isEditMode) {
    return (
      <div
        id={widgetAnchorId}
        data-vertical-index={verticalPosition}
        style={{
          margin: '1rem 0',
          scrollMarginTop: '80px',
        }}
      >
        <WidgetErrorBoundary widget={widget} onDelete={onDelete}>
          {renderWidgetContent()}
        </WidgetErrorBoundary>
      </div>
    );
  }

  return (
    <div
      id={widgetAnchorId}
      data-vertical-index={verticalPosition}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(widget.id);
      }}
      style={{
        position: 'relative',
        margin: '1.25rem 0',
        padding: '0.75rem',
        borderRadius: 'var(--md-shape-lg)',
        border: isSelected
          ? '2px solid var(--md-sys-color-primary)'
          : '1px solid var(--md-sys-color-outline-variant)',
        backgroundColor: isSelected
          ? 'var(--md-sys-color-surface-container-low)'
          : 'transparent',
        boxShadow: isSelected ? 'var(--md-elevation-2)' : 'none',
        transition: 'all 120ms ease',
        cursor: 'pointer',
        scrollMarginTop: '80px',
      }}
    >
      {/* Chrome Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.65rem',
          padding: '0.35rem 0.75rem',
          borderRadius: 'var(--md-shape-sm)',
          backgroundColor: isSelected
            ? 'var(--md-sys-color-primary-container)'
            : 'var(--md-sys-color-surface-container)',
          color: isSelected
            ? 'var(--md-sys-color-on-primary-container)'
            : 'var(--md-sys-color-on-surface-variant)',
          transition: 'background-color 100ms ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Vertical position #N badge */}
          <span
            title={`Posicion vertical #${verticalPosition}. Puedes vincular botones a este bloque usando /#${verticalPosition}`}
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              backgroundColor: 'var(--md-sys-color-primary)',
              color: 'var(--md-sys-color-on-primary)',
              padding: '0.15rem 0.5rem',
              borderRadius: 'var(--md-shape-full)',
              boxShadow: 'var(--md-elevation-1)',
            }}
          >
            #{verticalPosition}
          </span>
          <span style={{ fontSize: '0.825rem', fontWeight: 700 }}>
            {definition.name}
          </span>
          <span
            style={{
              fontSize: '0.7rem',
              color: 'var(--md-sys-color-primary)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              opacity: 0.85,
            }}
          >
            (Ancla: /#{verticalPosition})
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }} onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMoveUp(index)}
            title="Mover arriba"
            style={{
              padding: '0.25rem',
              background: 'none',
              border: 'none',
              cursor: index === 0 ? 'not-allowed' : 'pointer',
              color: 'inherit',
              opacity: index === 0 ? 0.35 : 1,
              borderRadius: 'var(--md-shape-sm)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ArrowUp size={15} />
          </button>
          <button
            type="button"
            disabled={index === totalWidgets - 1}
            onClick={() => onMoveDown(index)}
            title="Mover abajo"
            style={{
              padding: '0.25rem',
              background: 'none',
              border: 'none',
              cursor: index === totalWidgets - 1 ? 'not-allowed' : 'pointer',
              color: 'inherit',
              opacity: index === totalWidgets - 1 ? 0.35 : 1,
              borderRadius: 'var(--md-shape-sm)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ArrowDown size={15} />
          </button>
          <button
            type="button"
            onClick={() => onDuplicate(widget.id)}
            title="Duplicar bloque"
            style={{
              padding: '0.25rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'inherit',
              borderRadius: 'var(--md-shape-sm)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Copy size={15} />
          </button>
          <button
            type="button"
            onClick={() => onSelect(widget.id)}
            title="Configurar propiedades"
            style={{
              padding: '0.25rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'inherit',
              borderRadius: 'var(--md-shape-sm)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Settings size={15} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(widget.id)}
            title="Eliminar bloque"
            style={{
              padding: '0.25rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--md-sys-color-error)',
              borderRadius: 'var(--md-shape-sm)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Widget Content Isolated by Error Boundary */}
      <WidgetErrorBoundary widget={widget} onDelete={onDelete}>
        {renderWidgetContent()}
      </WidgetErrorBoundary>
    </div>
  );
}

export default WidgetRenderer;
