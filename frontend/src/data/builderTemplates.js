/*
 * Module: BuilderTemplates
 * Description: Predefined templates and starter layouts for home, catalog, cart, blog, contact, and membership pages
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of 3 curated template structures.
 * - 2026-10-26 [v1.3.0]: Added 6 comprehensive presets (Home, Catalog, Cart, Blog, Contact, Membership) with explanatory copy.
 */

export const BUILDER_TEMPLATES = [
  {
    id: 'starter_tutorial',
    name: 'Inicio / Portada Principal',
    badge: 'Pagina Principal',
    description: 'Estructura equilibrada con Navegacion, Hero Banner, Historia, Tarjetas destacadas, Planes y Footer.',
    widgets: [
      {
        id: 'w-nav-home',
        type: 'navigation_menu',
        props: {
          variant: 'standard',
          layout: 'horizontal',
          sticky: true,
          items: [
            { label: 'Inicio', url: '/' },
            { label: 'Catalogo', url: '/#3' },
            { label: 'Nosotros', url: '/#2' },
            { label: 'Planes', url: '/#4' },
          ],
          cta_item: { text: 'Mi Cuenta', link: '/portal' },
        },
      },
      {
        id: 'w-hero-home',
        type: 'hero_banner',
        props: {
          variant: 'standard',
          background: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
          title: 'TITULO DE TU TIENDA ONLINE',
          subtitle: 'DESCRIPCION: Explica aqui brevemente la propuesta de valor y los productos que ofreces.',
          cta_primary: { text: 'BOTON PRINCIPAL', link: '/#3', style: 'filled' },
          cta_secondary: { text: 'BOTON SECUNDARIO', link: '/#2', style: 'outline' },
          alignment: 'center',
          overlay_color: '#000000',
          overlay_opacity: 0.45,
          height: '480px',
        },
      },
      {
        id: 'w-story-home',
        type: 'text_image',
        props: {
          variant: 'standard',
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
          image_position: 'left',
          title: 'TITULO DE SECCION / HISTORIA',
          body: 'DESCRIPCION: Presenta los valores de tu emprendimiento, el origen de tus insumos o el equipo detras del proyecto.',
          cta: { enabled: true, text: 'BOTON DE ACCION', link: '/#3' },
          background_color: 'transparent',
          padding: '48px 24px',
        },
      },
      {
        id: 'w-cards-home',
        type: 'cards_grid',
        props: {
          variant: 'standard',
          columns: 3,
          gap: '24px',
          cards: [
            {
              card_image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
              card_title: 'ITEM 1: NOMBRE DEL PRODUCTO',
              card_description: 'DESCRIPCION: Detalle breve de caracteristicas o beneficios de esta categoria.',
              card_badge: 'DESTACADO',
              card_cta: { text: 'VER DETALLE', link: '/#1' },
            },
            {
              card_image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
              card_title: 'ITEM 2: NOMBRE DEL PRODUCTO',
              card_description: 'DESCRIPCION: Detalle breve de caracteristicas o beneficios de esta categoria.',
              card_badge: 'ARTESANAL',
              card_cta: { text: 'VER DETALLE', link: '/#1' },
            },
            {
              card_image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
              card_title: 'ITEM 3: NOMBRE DEL PRODUCTO',
              card_description: 'DESCRIPCION: Detalle breve de caracteristicas o beneficios de esta categoria.',
              card_badge: 'NUEVO',
              card_cta: { text: 'VER DETALLE', link: '/#1' },
            },
          ],
        },
      },
      {
        id: 'w-plans-home',
        type: 'membership_plans',
        props: {
          variant: 'standard',
          highlight_plan: 'PLAN COMUNIDAD',
          billing_cycle: 'mensual',
          plan_cards: [
            {
              plan_name: 'PLAN BASICO',
              plan_price: '$9.990 / mes',
              plan_features: ['BENEFICIO 1: Acceso a catalogo', 'BENEFICIO 2: Boletin de novedades', 'BENEFICIO 3: Descuento 5%'],
              plan_cta: 'ELEGIR BASICO',
            },
            {
              plan_name: 'PLAN COMUNIDAD',
              plan_price: '$19.990 / mes',
              plan_features: ['BENEFICIO 1: Envio prioritario', 'BENEFICIO 2: Descuento 15%', 'BENEFICIO 3: Lanzamientos privados'],
              plan_cta: 'UNIRME AHORA',
            },
          ],
        },
      },
      {
        id: 'w-faq-home',
        type: 'faq_accordion',
        props: {
          variant: 'standard',
          default_open: 0,
          items: [
            {
              question: 'PREGUNTA FRECUENTE: Como se realiza la entrega?',
              answer: 'RESPUESTA: Explicacion detallada sobre los plazos y empresas de encomienda utilizadas.',
            },
            {
              question: 'PREGUNTA FRECUENTE: Que metodos de pago aceptan?',
              answer: 'RESPUESTA: Detalle de transferencias bancarias y tarjetas habilitadas.',
            },
          ],
        },
      },
      {
        id: 'w-footer-home',
        type: 'footer_block',
        props: {
          variant: 'standard',
          columns: 3,
          text: 'DESCRIPCION: Informacion institucional y valores de la comunidad de emprendedores.',
          social_links: true,
          copyright: '2026 TIENDA ONLINE. Todos los derechos reservados.',
        },
      },
    ],
  },
  {
    id: 'ecommerce_direct',
    name: 'Catalogo & Vitrina de Productos',
    badge: 'Comercio Digital',
    description: 'Orientado a ventas con filtros de catalogo, ficha de producto, selector de despachos y cupones.',
    widgets: [
      {
        id: 'w-nav-cat',
        type: 'navigation_menu',
        props: {
          variant: 'standard',
          items: [
            { label: 'Inicio', url: '/' },
            { label: 'Catalogo', url: '/#2' },
            { label: 'Envios', url: '/#3' },
          ],
          cta_item: { text: 'Mi Carrito', link: '/#1' },
        },
      },
      {
        id: 'w-hero-cat',
        type: 'hero_banner',
        props: {
          variant: 'gradient',
          title: 'TITULO: CATALOGO DE PRODUCTOS',
          subtitle: 'DESCRIPCION: Explora nuestra seleccion exclusiva de articulos disponibles con envio a todo el pais.',
          cta_primary: { text: 'VER PRODUCTOS', link: '/#2', style: 'filled' },
          alignment: 'center',
          height: '380px',
        },
      },
      {
        id: 'w-filters-cat',
        type: 'catalog_filters',
        props: {
          variant: 'standard',
          filter_fields: ['Categoria General', 'Rango de Precios', 'Disponibilidad Inmediata'],
          show_count: true,
          position: 'top',
          reset_button: true,
        },
      },
      {
        id: 'w-product-cat',
        type: 'product_card',
        props: {
          variant: 'standard',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
          title: 'NOMBRE DEL PRODUCTO DESTACADO',
          subtitle: 'SUBTITULO: Especificaciones de material y edicion',
          price: '$45.000 CLP',
          badge: 'MAS VENDIDO',
          cta: 'AGREGAR AL CARRITO',
          stock_status: 'En Stock (12 unidades)',
        },
      },
      {
        id: 'w-shipping-cat',
        type: 'shipping_selector',
        props: {
          variant: 'standard',
          options: ['Envio Estandar a Domicilio', 'Retiro en Taller / Punto Oficial'],
          default_option: 'Envio Estandar a Domicilio',
          show_cost: true,
          show_eta: true,
        },
      },
      {
        id: 'w-coupon-cat',
        type: 'coupon_field',
        props: {
          variant: 'standard',
          placeholder: 'INGRESA CODIGO DE DESCUENTO',
          button_label: 'APLICAR CUPON',
          validation_message: 'Descuento aplicado correctamente',
        },
      },
    ],
  },
  {
    id: 'cart_checkout',
    name: 'Carrito & Checkout de Pago',
    badge: 'Proceso de Compra',
    description: 'Flujo dedicado al cierre de ventas con cajon de articulos, calculo de envio y pasarela de pago.',
    widgets: [
      {
        id: 'w-breadcrumbs-cart',
        type: 'breadcrumbs',
        props: {
          variant: 'standard',
          trail: ['Inicio', 'Catalogo', 'Carrito y Pago'],
        },
      },
      {
        id: 'w-cart-drawer',
        type: 'cart_drawer',
        props: {
          variant: 'standard',
          cta_checkout: 'PROCEDER AL PAGO',
        },
      },
      {
        id: 'w-checkout-flow',
        type: 'checkout_flow',
        props: {
          variant: 'standard',
          steps: ['DATOS PERSONALES', 'DIRECCION DE ENTREGA', 'METODO DE PAGO', 'CONFIRMACION'],
          confirmation_message: 'Gracias por tu compra. Te enviaremos el comprobante al correo.',
        },
      },
      {
        id: 'w-whatsapp-cart',
        type: 'floating_contact',
        props: {
          variant: 'standard',
          channel: 'WhatsApp',
          number_or_link: '+56912345678',
          message_template: 'Hola, tengo una consulta sobre mi compra.',
        },
      },
    ],
  },
  {
    id: 'blog_content',
    name: 'Blog & Historias del Proyecto',
    badge: 'Contenido y Medios',
    description: 'Diseno editorial con articulos, relatos de taller, galeria de video y redes sociales.',
    widgets: [
      {
        id: 'w-hero-blog',
        type: 'hero_banner',
        props: {
          variant: 'minimal',
          title: 'TITULO DEL BLOG / HISTORIAS',
          subtitle: 'DESCRIPCION: Relatos, procesos productivos y guias de cuidado de nuestros artesanos.',
          cta_primary: { text: 'EXPLORAR ARTICULOS', link: '/#2', style: 'filled' },
          height: '340px',
        },
      },
      {
        id: 'w-blog-grid',
        type: 'blog_grid',
        props: {
          variant: 'standard',
          columns: 3,
          posts: [
            {
              card_image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
              card_title: 'TITULO DEL ARTICULO 1',
              card_excerpt: 'DESCRIPCION: Resumen breve del contenido de la publicacion o tutorial.',
              card_date: '24 OCT 2026',
            },
            {
              card_image: 'https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=600&q=80',
              card_title: 'TITULO DEL ARTICULO 2',
              card_excerpt: 'DESCRIPCION: Resumen breve del contenido de la publicacion o tutorial.',
              card_date: '18 OCT 2026',
            },
            {
              card_image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
              card_title: 'TITULO DEL ARTICULO 3',
              card_excerpt: 'DESCRIPCION: Resumen breve del contenido de la publicacion o tutorial.',
              card_date: '10 OCT 2026',
            },
          ],
        },
      },
      {
        id: 'w-video-blog',
        type: 'video_gallery',
        props: {
          variant: 'standard',
          caption: 'VIDEO: Proceso de produccion y trabajo en taller.',
        },
      },
      {
        id: 'w-social-blog',
        type: 'social_links',
        props: {
          variant: 'standard',
          networks: ['Instagram', 'Facebook', 'LinkedIn', 'WhatsApp'],
        },
      },
    ],
  },
  {
    id: 'contact_support',
    name: 'Contacto & Preguntas Frecuentes',
    badge: 'Atencion al Cliente',
    description: 'Canal de atencion con formulario de contacto, preguntas FAQ, enlaces de redes y WhatsApp directo.',
    widgets: [
      {
        id: 'w-hero-contact',
        type: 'hero_banner',
        props: {
          variant: 'minimal',
          title: 'TITULO: CENTRO DE CONTACTO Y SOPORTE',
          subtitle: 'DESCRIPCION: Estamos aqui para responder tus preguntas, atender pedidos especiales y coordinar entregas.',
          height: '320px',
        },
      },
      {
        id: 'w-form-contact',
        type: 'generic_form',
        props: {
          variant: 'standard',
          submit_button: 'ENVIAR MENSAJE',
          success_message: 'Mensaje recibido con exito. Nos comunicaremos contigo pronto.',
        },
      },
      {
        id: 'w-faq-contact',
        type: 'faq_accordion',
        props: {
          variant: 'standard',
          items: [
            {
              question: 'PREGUNTA: Como rastreo el despacho de mi pedido?',
              answer: 'RESPUESTA: Te enviamos un codigo de seguimiento tan pronto como el paquete sea entregado al transportista.',
            },
            {
              question: 'PREGUNTA: Hacen envios a todas las regiones?',
              answer: 'RESPUESTA: Si, contamos con cobertura en todo el territorio nacional.',
            },
          ],
        },
      },
      {
        id: 'w-social-contact',
        type: 'social_links',
        props: {
          variant: 'standard',
          networks: ['Instagram', 'WhatsApp', 'Facebook'],
        },
      },
      {
        id: 'w-whatsapp-float',
        type: 'floating_contact',
        props: {
          variant: 'standard',
          channel: 'WhatsApp',
          number_or_link: '+56912345678',
        },
      },
    ],
  },
  {
    id: 'membership_community',
    name: 'Membresias & Planes Colectivos',
    badge: 'Suscripciones',
    description: 'Estructura para suscripciones mensuales, configurador de reparto y portal de usuario.',
    widgets: [
      {
        id: 'w-hero-memb',
        type: 'hero_banner',
        props: {
          variant: 'gradient',
          title: 'TITULO: PLANES Y MEMBRESIAS COLECTIVAS',
          subtitle: 'DESCRIPCION: Suscribete para recibir cajas periodicas con precios preferenciales y beneficios de comunidad.',
          cta_primary: { text: 'VER PLANES', link: '/#2', style: 'filled' },
          height: '380px',
        },
      },
      {
        id: 'w-plans-memb',
        type: 'membership_plans',
        props: {
          variant: 'standard',
          highlight_plan: 'PLAN COMUNIDAD',
          billing_cycle: 'mensual',
          plan_cards: [
            {
              plan_name: 'PLAN BASICO',
              plan_price: '$9.990 / mes',
              plan_features: ['ITEM 1: Catalogo preferente', 'ITEM 2: Descuento 5% permanente'],
              plan_cta: 'ELEGIR PLAN',
            },
            {
              plan_name: 'PLAN COMUNIDAD',
              plan_price: '$19.990 / mes',
              plan_features: ['ITEM 1: Envio sin costo', 'ITEM 2: Descuento 15% en compras', 'ITEM 3: Invitacion a talleres'],
              plan_cta: 'SUSCRIBIRME',
            },
          ],
        },
      },
      {
        id: 'w-config-memb',
        type: 'subscription_configurator',
        props: {
          variant: 'standard',
          summary_preview: 'Total estimado: $24.900 CLP / quincenal',
        },
      },
      {
        id: 'w-portal-memb',
        type: 'customer_portal',
        props: {
          variant: 'standard',
          tabs: ['MI PERFIL', 'HISTORIAL DE PEDIDOS', 'SUSCRIPCIONES', 'DIRECCIONES'],
        },
      },
    ],
  },
];
