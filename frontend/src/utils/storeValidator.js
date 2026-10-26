/*
 * Module: StoreValidator
 * Description: Preflight audit utility analyzing store pages, broken links, placeholder text, and orphaned views
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of comprehensive store preflight audit rules.
 */

const PLACEHOLDER_PATTERNS = [
  'TITULO',
  'DESCRIPCION',
  'TEXTO DESCRIPTIVO',
  'NOMBRE DEL ITEM',
  'SUBTITULO',
  'LOREM IPSUM',
  'PRODUCTO DE EJEMPLO',
];

/**
 * Validates the complete store pages state and returns structured warnings and suggestions.
 * @param {Array} pages - Array of page objects with id, label, slug, widgets
 * @returns {{ warnings: Array, hasBlockingErrors: boolean }}
 */
export function validateStorePages(pages = []) {
  const warnings = [];
  const registeredSlugs = new Set(pages.map((p) => p.slug || ''));
  const referencedSlugs = new Set(['/']);

  pages.forEach((page) => {
    const pageLabel = page.label || 'Sin Titulo';
    const widgets = page.widgets || [];

    // Check 1: Empty Page
    if (widgets.length === 0) {
      warnings.push({
        id: `empty-page-${page.id}`,
        type: 'empty_page',
        severity: 'warning',
        pageId: page.id,
        pageLabel,
        title: `Pagina vacia: "${pageLabel}"`,
        description: `La pagina "${pageLabel}" (${page.slug}) no contiene ningun bloque. Los visitantes veran una pantalla en blanco.`,
        remediation: 'Agrega al menos un bloque (Hero Banner, Catalogo o Texto) o elimina esta pagina si no la usas.',
      });
      return;
    }

    // Check widgets on this page
    widgets.forEach((widget, idx) => {
      const verticalIndex = idx + 1;
      const props = widget.props || {};

      // Check text placeholders
      const checkTextForPlaceholder = (text, fieldName) => {
        if (typeof text !== 'string') return;
        const upper = text.toUpperCase().trim();
        const isPlaceholder = PLACEHOLDER_PATTERNS.some((pat) => upper.includes(pat));
        if (isPlaceholder) {
          warnings.push({
            id: `placeholder-${widget.id}-${fieldName}`,
            type: 'placeholder',
            severity: 'info',
            pageId: page.id,
            pageLabel,
            widgetId: widget.id,
            verticalIndex,
            title: `Texto de ejemplo sin editar en bloque #${verticalIndex}`,
            description: `El campo "${fieldName}" en el bloque #${verticalIndex} contiene texto de demostracion ("${text.slice(0, 30)}...").`,
            remediation: 'Personaliza este texto en el panel de ajustes con el contenido real de tu emprendimiento.',
          });
        }
      };

      if (props.title) checkTextForPlaceholder(props.title, 'Titulo Principal');
      if (props.subtitle) checkTextForPlaceholder(props.subtitle, 'Subtitulo');
      if (props.body) checkTextForPlaceholder(props.body, 'Texto Descriptivo');

      // Check links
      const checkLinkTarget = (link, label, contextName) => {
        if (!link || link === '#' || link.trim() === '') {
          warnings.push({
            id: `dead-link-${widget.id}-${contextName}`,
            type: 'broken_link',
            severity: 'warning',
            pageId: page.id,
            pageLabel,
            widgetId: widget.id,
            verticalIndex,
            title: `Boton sin destino en bloque #${verticalIndex}`,
            description: `El boton "${label || contextName}" no tiene una ruta asignada y no realizara ninguna accion.`,
            remediation: 'Asigna una pagina (ej. /catalogo) o un bloque vertical (ej. /#1 o #2) para navegar.',
          });
          return;
        }

        // Clean link
        const trimmed = link.trim();

        // Check internal page link
        if (trimmed.startsWith('/')) {
          const [slugPart, anchorPart] = trimmed.split('#');
          referencedSlugs.add(slugPart || '/');

          if (slugPart && slugPart !== '/' && !registeredSlugs.has(slugPart)) {
            warnings.push({
              id: `missing-route-${widget.id}-${contextName}`,
              type: 'broken_link',
              severity: 'warning',
              pageId: page.id,
              pageLabel,
              widgetId: widget.id,
              verticalIndex,
              title: `Ruta inexistente en boton "${label || contextName}"`,
              description: `El enlace apunta a "${slugPart}", pero ninguna pestana actual tiene esa ruta.`,
              remediation: `Crea una pestana con la ruta "${slugPart}" o actualiza el enlace a una pagina existente.`,
            });
          }

          // Check anchor part if provided
          if (anchorPart) {
            const anchorNum = parseInt(anchorPart.replace(/\D/g, ''), 10);
            if (!isNaN(anchorNum)) {
              const targetPage = pages.find((p) => p.slug === slugPart) || page;
              const targetWidgetsCount = (targetPage.widgets || []).length;
              if (anchorNum < 1 || anchorNum > targetWidgetsCount) {
                warnings.push({
                  id: `invalid-anchor-${widget.id}-${contextName}`,
                  type: 'broken_link',
                  severity: 'warning',
                  pageId: page.id,
                  pageLabel,
                  widgetId: widget.id,
                  verticalIndex,
                  title: `Posicion vertical invalida #${anchorNum}`,
                  description: `El enlace intenta hacer scroll al bloque #${anchorNum}, pero la pagina solo tiene ${targetWidgetsCount} bloques.`,
                  remediation: `Ajusta el destino del boton entre #1 y #${targetWidgetsCount}.`,
                });
              }
            }
          }
        } else if (trimmed.startsWith('#')) {
          // Local anchor on this page
          const anchorNum = parseInt(trimmed.replace(/\D/g, ''), 10);
          if (!isNaN(anchorNum)) {
            if (anchorNum < 1 || anchorNum > widgets.length) {
              warnings.push({
                id: `invalid-local-anchor-${widget.id}-${contextName}`,
                type: 'broken_link',
                severity: 'warning',
                pageId: page.id,
                pageLabel,
                widgetId: widget.id,
                verticalIndex,
                title: `Scroll a bloque inexistente #${anchorNum}`,
                description: `El boton hace scroll al bloque #${anchorNum}, pero esta pagina solo cuenta con ${widgets.length} bloques.`,
                remediation: `Cambia el enlace para apuntar a un bloque entre #1 y #${widgets.length}.`,
              });
            }
          }
        }
      };

      // Check primary CTA
      if (props.cta_primary) {
        checkLinkTarget(props.cta_primary.link, props.cta_primary.text, 'Boton Principal');
      }

      // Check secondary CTA
      if (props.cta_secondary) {
        checkLinkTarget(props.cta_secondary.link, props.cta_secondary.text, 'Boton Secundario');
      }

      // Check generic CTA
      if (props.cta && props.cta.enabled) {
        checkLinkTarget(props.cta.link, props.cta.text, 'Boton de Accion');
      }

      // Check nav menu items
      if (widget.type === 'navigation_menu' && Array.isArray(props.items)) {
        props.items.forEach((item, itemIdx) => {
          checkLinkTarget(item.url, item.label, `Item Menu #${itemIdx + 1}`);
        });
        if (props.cta_item) {
          checkLinkTarget(props.cta_item.link, props.cta_item.text, 'Boton Menu Destacado');
        }
      }

      // Check cards CTA
      if (widget.type === 'cards_grid' && Array.isArray(props.cards)) {
        props.cards.forEach((card, cardIdx) => {
          if (card.card_cta) {
            checkLinkTarget(card.card_cta.link, card.card_cta.text, `Tarjeta #${cardIdx + 1}`);
          }
        });
      }
    });
  });

  // Check 3: Orphaned pages (pages not referenced anywhere)
  pages.forEach((page) => {
    if (page.id !== 'page-home' && page.slug && !referencedSlugs.has(page.slug)) {
      warnings.push({
        id: `orphaned-page-${page.id}`,
        type: 'orphaned_page',
        severity: 'info',
        pageId: page.id,
        pageLabel: page.label || 'Sin Titulo',
        title: `Pagina sin enlaces entrantes: "${page.label}"`,
        description: `La pagina "${page.label}" (${page.slug}) no esta vinculada en ningun boton ni menu de navegacion. Tus visitantes no podran encontrarla a menos que escriban la direccion directamente.`,
        remediation: `Agrega un enlace a "${page.slug}" en tu Menu de Navegacion o en un boton de llamada a la accion.`,
      });
    }
  });

  return {
    warnings,
    hasBlockingErrors: warnings.some((w) => w.severity === 'warning'),
  };
}
