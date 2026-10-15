

# **ESPECIFICACIÓN DE REQUERIMIENTOS DE SOFTWARE** 

ERS 

**Plataforma E-commerce Personalizable (SaaS)** 

Arquitectura Hexagonal Orientada a Emprendedores 

|**Producto:**|Software de Paquetes E-commerce Multicliente|
|---|---|
|**Proyecto:**|Desarrollo de Aplicación Web Altamente Personalizable|
|**Versión:**|5.2 – Inclusión de Módulo de Marketing y SEO|
|**Estado:**|Candidato a aprobación|
|**Fecha:**|25 de septiembre de 2026|



**Elaborado por: Revisado por:** Equipo de Desarrollo Prof. René Galarce Emilio San Martín y Marianela Pareja Prof. Ximena del Carmen Prado 

ERS – E-commerce SaaS Multipropósito 

Proyecto de Ingeniería 

## **Control del documento** 

|**Versión**|**Fecha**|**Descripción**|**Responsable**|**Estado**|
|---|---|---|---|---|
|4.0 - 4.5|Agosto 2026|Versiones<br>orientadas a<br>cliente específico<br>(Fundación).<br>Obsoletas tras<br>pivote comercial.|Equipo Técnico|Obsoleto|
|5.0|30 de agosto 2026|Reestructuración<br>total a software<br>de paquetes<br>(SaaS),<br>arquitectura<br>hexagonal,<br>personalización y<br>pasarelas de<br>pago.|Equipo Técnico|Candidato a aprobación|
|5.1|Agosto 2026|Se añade<br>requerimiento<br>funcional de<br>Portal de<br>Seguimiento<br>(Tracking)<br>integrando APIs<br>logísticas para el<br>comprador.|Equipo Técnico|Candidato a aprobación|
|5.2|25 de septiembre de 2026|Se añaden<br>requerimientos<br>de Variantes<br>(SKUs), Páginas<br>Legales,<br>Notificaciones,<br>Promociones y<br>SEO. Inclusión<br>de Linkify.|Equipo Técnico|Candidato a aprobación|



**Tabla 1:** Historial de versiones del documento. 

### **Estado de aprobación** 

La presente versión se considera una versión candidata a aprobación. 

Página i 

ERS – E-commerce SaaS Multipropósito 

Proyecto de Ingeniería 

|**Rol**|**Responsable**|**Estado**|
|---|---|---|
|Elaboración|Equipo de Desarrollo|Preparado|
|Revisión técnica|Profesores Consultores|Preparado|
|Aprobación|Directiva de Proyecto|**Pendiente de validación**|



**Tabla 2:** Estado de revisión y aprobación del documento. 

## **Índice** 

|**Control del documento**|**i**|
|---|---|
|**1. Introducción**|**1**|
|1.1. Propósito del documento. . . . . . . . . . . . . . . . . . . . . . . . . . . . . .|. .<br>1|
|1.2. Alcance del sistema . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .|. .<br>1|
|1.3. Objetivos del sistema . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .|. .<br>1|
|**2. Descripción General del Sistema**|**2**|
|2.1. Contexto del producto . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .|. .<br>2|
|2.2. Actores del sistema . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .|. .<br>2|
|2.3. Supuestos y Restricciones . . . . . . . . . . . . . . . . . . . . . . . . . . . . .|. .<br>2|
|**3. Definiciones y Abreviaturas**|**2**|
|**4. Reglas de Negocio**|**3**|
|4.1. RN-01: Branding Obligatorio de Autoría . . . . . . . . . . . . . . . . . . . . .|. .<br>3|
|4.2. RN-02: Modalidades de Pago Configurables . . . . . . . . . . . . . . . . . . .|. .<br>3|
|4.3. RN-03: Gestión de Inventario (Stock). . . . . . . . . . . . . . . . . . . . . . .|. .<br>3|
|4.4. RN-04: Autenticación de Compradores . . . . . . . . . . . . . . . . . . . . . .|. .<br>3|
|**5. Requerimientos Funcionales**|**3**|
|5.1. RF-01: Catálogo, Navegación y Personalización Visual . . . . . . . . . . . . .|. .<br>3|
|5.1.1.<br>RF-01.1: Landing Page e Ingreso a la Tienda . . . . . . . . . . . . . .|. .<br>4|
|5.1.2.<br>RF-01.2: Personalización de Interfaz (Temas, Logos y Favicon) . . . .|. .<br>4|
|5.1.3.<br>RF-01.3: Catálogo Flexibe (MongoDB). . . . . . . . . . . . . . . . . .|. .<br>4|
|5.1.4.<br>RF-01.4: Personalización de la Estructura del Catálogo (Layout) . . .|. .<br>4|
|5.2. RF-02: Carrito, Pagos y Logística . . . . . . . . . . . . . . . . . . . . . . . . .|. .<br>5|
|5.2.1.<br>RF-02.1: Autenticación Configurable de Checkout<br>. . . . . . . . . . .|. .<br>5|
|5.2.2.<br>RF-02.2: Pasarelas de Pago Múltiples<br>. . . . . . . . . . . . . . . . . .|. .<br>5|



Página ii 

ERS – E-commerce SaaS Multipropósito 

Proyecto de Ingeniería 

||5.2.3.<br>RF-02.3: Integración de Logística y Envío . . . . . . . . . . . . . . .|. . .<br>5|
|---|---|---|
||5.2.4.<br>RF-02.4: Portal de Seguimiento (Tracking) para Compradores . . . .|. . .<br>5|
|5.3.|RF-03: Administración (Backoffice) . . . . . . . . . . . . . . . . . . . . . . .|. . .<br>6|
||5.3.1.<br>RF-03.1: Dashboard Operativo . . . . . . . . . . . . . . . . . . . . .|. . .<br>6|
||5.3.2.<br>RF-03.2: Gestión de Inventario (CRUD) . . . . . . . . . . . . . . . .|. . .<br>6|
||5.3.3.<br>RF-03.3: Gestión de Pedidos y Tracking . . . . . . . . . . . . . . . .|. . .<br>6|
||5.3.4.<br>RF-03.4: Gestión de Variantes de Producto (SKUs). . . . . . . . . .|. . .<br>6|
||5.3.5.<br>RF-03.5: Gestión de Páginas Informativas y Legales<br>. . . . . . . . .|. . .<br>6|
|5.4.|RF-04: Marketing, Operaciones y SEO . . . . . . . . . . . . . . . . . . . . .|. . .<br>7|
||5.4.1.<br>RF-04.1: Gestión de Promociones y Códigos de Descuento . . . . . .|. . .<br>7|
||5.4.2.<br>RF-04.2: Notificaciones Transaccionales Automatizadas<br>. . . . . . .|. . .<br>7|
||5.4.3.<br>RF-04.3: Configuración de Analítica y SEO Básico . . . . . . . . . .|. . .<br>7|
||5.4.4.<br>RF-04.4: Gestión de Privacidad y Consentimiento de Datos . . . . .|. . .<br>8|
|**6. Ma**|**triz de Roles**|**8**|
|**7. Req**|**uerimientos No Funcionales**|**8**|
|7.1.|RNF-01: Estándares de Calidad y Usabilidad . . . . . . . . . . . . . . . . .|. . .<br>9|
|7.2.|RNF-02: Arquitectura y Base de Datos. . . . . . . . . . . . . . . . . . . . .|. . .<br>9|
|7.3.|RNF-03: Seguridad . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .|. . .<br>9|
|7.4.|RNF-04: Entregables (Manual de Despliegue) . . . . . . . . . . . . . . . . .|. . .<br>9|
|**8. Ma**|**triz de Trazabilidad**|**9**|
|**9. Fue**|**ra de Alcance**|**10**|
|**10.Dec**|**isiones Pendientes de Validación**|**10**|
|**11.Est**|**ado Final de la Especificación**|**11**|



Página iii 

ERS – E-commerce SaaS Multipropósito 

Proyecto de Ingeniería 

## **1 Introducción** 

### **1.1 Propósito del documento** 

El presente documento especifica los requerimientos funcionales, no funcionales y reglas de negocio identificados para el desarrollo de una **Plataforma E-commerce Genérica y Personalizable (Software de Paquetes)** . 

La finalidad de esta Especificación de Requerimientos de Software (ERS) es establecer una referencia técnica para la creación de un sistema versátil, capaz de adaptarse a las necesidades de cualquier emprendedor o negocio que requiera una tienda en línea propia. 

### **1.2 Alcance del sistema** 

El sistema corresponde a una aplicación web de E-commerce desarrollada bajo **Arquitectura Hexagonal** , diseñada para ser entregada como un producto empaquetado (Marca Blanca). La plataforma permitirá a los emprendedores: 

- Disponer de una _Landing Page_ introductoria y un catálogo público navegable. 

- Personalizar la interfaz seleccionando entre al menos 4 plantillas de colores, además de incorporar el logo de su negocio. 

- Gestionar su inventario, cargando productos con stock e imágenes, aprovechando una base de datos flexible (MongoDB) para atributos dinámicos. 

- Configurar modalidades de pago a su elección: integración con APIs de pasarelas tradicionales (Transbank, PayPal, MercadoPago), servicios de verificación automatizada de transferencias (como Linkify) o validación manual de transferencias bancarias. 

- Configurar modalidades de entrega: consumo de APIs logísticas (Starken, Chilexpress) o habilitar retiro en tienda. 

- Determinar el nivel de acceso de sus compradores (Checkout como invitado, registro de cuenta o login vía Google). 

- Visualizar un panel administrativo (Dashboard) con el seguimiento de órdenes y el historial de ventas. 

El **despliegue en producción no forma parte del alcance del desarrollo** . Se entregará el software empaquetado junto con un manual de despliegue específico según el proveedor de hosting que el cliente final decida contratar. 

### **1.3 Objetivos del sistema** 

Los objetivos principales del sistema son: 

1. Desarrollar una solución E-commerce escalable e independiente del rubro comercial. 

2. Otorgar alto nivel de personalización visual (UI) a cada cliente. 

Página 1 

ERS – E-commerce SaaS Multipropósito 

Proyecto de Ingeniería 

3. Abstraer la complejidad de integración de pasarelas de pago y logística mediante módulos configurables. 

4. Promover la marca académica garantizando la visibilidad permanente del logo de la Universidad en las tiendas generadas. 

5. Facilitar el despliegue autónomo por parte del cliente a través de manuales técnicos detallados. 

## **2 Descripción General del Sistema** 

### **2.1 Contexto del producto** 

La solución será implementada como una aplicación web (SaaS / Empaquetado) utilizando **Django** (Backend) y **React** (Frontend). Contará con un modelo de datos híbrido empleando **PostgreSQL** para el núcleo transaccional y **MongoDB** para la gestión dinámica del catálogo de productos. 

### **2.2 Actores del sistema** 

|**Actor**|**Descripción**|
|---|---|
|Cliente Comprador|Usuario final que ingresa a la tienda del emprendedor para navegar el<br>catálogo, agregar productos al carrito y ejecutar la compra.|
|Emprendedor (Admin)|Dueño del negocio. Usuario con control total sobre la configuración de su<br>instancia de e-commerce, incluyendo personalización visual, carga de<br>catálogo, selección de pasarelas y gestión de pedidos.|



**Tabla 3:** Actores principales del sistema. 

### **2.3 Supuestos y Restricciones** 

1. **Despliegue Autónomo:** El equipo de desarrollo no administrará servidores ni dominios en producción para los clientes finales. 

2. **APIs Externas:** Se asume que las APIs de Transbank, PayPal, MercadoPago, Starken y Chilexpress proporcionan entornos de prueba funcionales para la certificación del software. 

3. **Cuentas de Servicios:** El emprendedor será responsable de obtener sus propias credenciales comerciales (API Keys) de las pasarelas de pago y operadores logísticos para ingresarlas en su panel de administración. 

## **3 Definiciones y Abreviaturas** 

Página 2 

ERS – E-commerce SaaS Multipropósito 

Proyecto de Ingeniería 

|**Término**|**Definición**|
|---|---|
|SaaS|Software as a Service. Modelo de entrega de software.|
|Arquitectura He-<br>xagonal|Patrón de diseño que aísla la lógica central del negocio de depen-<br>dencias externas (bases de datos, APIs).|
|MongoDB|Base de datos NoSQL orientada a documentos, utilizada para dar<br>flexibilidad a los atributos de los productos del catálogo.|
|PostgreSQL|Base de datos SQL relacional, utilizada para el manejo estricto de<br>usuarios, permisos, carritos y órdenes de compra.|
|Landing Page|Página web de aterrizaje preliminar a la tienda.|



## **4 Reglas de Negocio** 

### **4.1 RN-01: Branding Obligatorio de Autoría** 

Todo E-commerce generado por la plataforma deberá mostrar obligatoriamente el logo de la Universidad en un tamaño destacado, independientemente de la plantilla o el logo propio del negocio que el emprendedor configure. Esta marca de autoría no podrá ser ocultada desde el panel de control. 

### **4.2 RN-02: Modalidades de Pago Configurables** 

El flujo de *Checkout* dependerá de la configuración del emprendedor. El sistema debe permitir activar o desactivar proveedores de pago (Transbank, PayPal, Mercado Pago, servicios de automatización de transferencias como Linkify, o Verificación Manual de Transferencias). Solo se mostrarán al comprador final las opciones habilitadas y configuradas por el administrador. 

### **4.3 RN-03: Gestión de Inventario (Stock)** 

No se podrán procesar ventas de productos cuyo stock sea igual a cero. El sistema deberá descontar el inventario de manera transaccional al momento de confirmar un pago exitoso. 

### **4.4 RN-04: Autenticación de Compradores** 

El sistema respetará el nivel de barrera de entrada que defina el dueño de la tienda. El emprendedor debe poder forzar a los usuarios a crear una cuenta, permitirles iniciar sesión rápidamente vía Google, o habilitar la çompra como invitado"(sin registro). 

## **5 Requerimientos Funcionales** 

- **5.1 RF-01: Catálogo, Navegación y Personalización Visual** 

Página 3 

ERS – E-commerce SaaS Multipropósito 

Proyecto de Ingeniería 

#### **5.1.1 RF-01.1: Landing Page e Ingreso a la Tienda** 

El sistema proveerá una Landing Page de bienvenida configurada por el emprendedor, la cual contendrá información principal del negocio y un llamado a la acción (botón) para ingresar al catálogo E-commerce propiamente tal. 

##### **Criterio de aceptación** 

Dado que un visitante ingresa al dominio del cliente, cuando carga la página principal, entonces visualizará la Landing Page en lugar de ver el catálogo directamente. 

#### **5.1.2 RF-01.2: Personalización de Interfaz (Temas, Logos y Favicon)** 

El sistema deberá ofrecer un panel donde el emprendedor pueda seleccionar entre un mínimo de 4 plantillas de colores predefinidas para estructurar su tienda. Además, permitirá cargar el logo comercial del negocio y un ícono de pestaña (favicon) personalizado, garantizando siempre la presencia inamovible del logo de la Universidad en la interfaz principal (RN-01). 

##### **Criterio de aceptación** 

Dado que el administrador sube un nuevo logotipo y favicon en el panel de configuración, cuando el comprador visita la tienda, entonces visualizará el logo actualizado en la cabecera de la página y el favicon personalizado en la pestaña del navegador. 

#### **5.1.3 RF-01.3: Catálogo Flexibe (MongoDB)** 

El sistema permitirá la visualización pública de los productos. Dado el enfoque multipropósito, el catálogo estará sustentado en MongoDB para permitir atributos personalizados (ej. tallas para ropa, voltaje para electrónica) definidos por el emprendedor. Se incluirán filtros dinámicos. 

##### **Criterio de aceptación** 

Dado que el administrador crea un producto con atributos propios de su rubro, cuando un cliente navega el catálogo, entonces podrá filtrar y ver el producto con esos atributos exactos. 

#### **5.1.4 RF-01.4: Personalización de la Estructura del Catálogo (Layout)** 

El panel de administración deberá permitir al emprendedor modificar la disposición visual (layout) en la que se exhiben los productos dentro del catálogo público. El sistema ofrecerá distintas estructuras predefinidas (ej. vista en cuadrícula de 3 columnas, cuadrícula de 4 columnas, o vista de lista con descripciones extendidas) para que la presentación se adapte al tipo de producto que comercializa el negocio. 

Página 4 

ERS – E-commerce SaaS Multipropósito 

Proyecto de Ingeniería 

##### **Criterio de aceptación** 

Dado que el administrador selecciona la estructura de "vista de lista.<sup>en</sup> su panel de configuración, cuando un cliente ingresa al catálogo de la tienda, entonces los productos se renderizarán secuencialmente uno debajo del otro con su descripción al costado, sobrescribiendo la cuadrícula predeterminada. 

### **5.2 RF-02: Carrito, Pagos y Logística** 

#### **5.2.1 RF-02.1: Autenticación Configurable de Checkout** 

El proceso de pago solicitará inicio de sesión o datos de contacto basándose en la RN-04. El flujo se adaptará dinámicamente: 

Modo Invitado (solo pide correo y dirección). 

Modo Cuenta Obligatoria (pide registro/login). 

Modo Google SSO (Single Sign-On). 

#### **5.2.2 RF-02.2: Pasarelas de Pago Múltiples** 

El sistema integrará las APIs de pago mediante puertos en la Arquitectura Hexagonal. Durante el *checkout*, el sistema presentará al comprador las opciones habilitadas por el emprendedor (MercadoPago, PayPal, Transbank, o servicios de verificación de transferencias de bajo costo/automatizados como Linkify). 

##### **Criterio de aceptación** 

Dado que el cliente procede a pagar, cuando el emprendedor solo configuró Transbank y Linkify, entonces la vista de pagos no mostrará PayPal ni MercadoPago. 

#### **5.2.3 RF-02.3: Integración de Logística y Envío** 

Al momento de ingresar la dirección, el sistema consumirá las APIs logísticas habilitadas (Starken, Chilexpress) para cotizar el despacho, o bien ofrecerá la opción de Retiro en local"si el administrador la configuró. 

##### **Criterio de aceptación** 

Dado que el cliente ingresa su comuna de destino, cuando la tienda tiene activa el API de Starken, entonces se calculará el costo de envío y se sumará al total del carrito. 

#### **5.2.4 RF-02.4: Portal de Seguimiento (Tracking) para Compradores** 

El sistema deberá proveer una interfaz gráfica para que el comprador pueda visualizar el estado actualizado de su despacho. Para los compradores con cuenta registrada, el seguimiento estará disponible dentro de su “Historial de Pedidos”. Para compradores invitados, el sistema proveerá un enlace de seguimiento público y seguro donde el usuario validará su consulta ingresando su número de orden y correo electrónico. El sistema abstraerá la complejidad consumiendo la 

Página 5 

ERS – E-commerce SaaS Multipropósito 

Proyecto de Ingeniería 

API del proveedor logístico seleccionado (ej. Starken, Chilexpress) a través de un adaptador hexagonal, y mostrará al comprador una línea de tiempo estandarizada del envío (ej. En origen _→_ En tránsito _→_ En reparto). 

##### **Criterio de aceptación** 

Dado que un comprador accede al portal de seguimiento con datos válidos, cuando el pedido se encuentra en estado "Despachado", entonces el sistema mostrará la línea de tiempo actualizada consultando la API del proveedor logístico correspondiente. 

### **5.3 RF-03: Administración (Backoffice)** 

#### **5.3.1 RF-03.1: Dashboard Operativo** 

El emprendedor contará con un panel de control inicial (Dashboard) que graficará el rendimiento comercial, listando las últimas órdenes, nivel de ventas mensual e histórico (filtrable por fecha). 

#### **5.3.2 RF-03.2: Gestión de Inventario (CRUD)** 

El panel permitirá crear, leer, actualizar y eliminar (CRUD) productos, incluyendo el control numérico de stock y la subida de una galería de imágenes. 

##### **Criterio de aceptación** 

Dado que el stock de un producto llega a 0, cuando un cliente intenta agregarlo al carrito, entonces el sistema impedirá la acción notificando falta de inventario. 

#### **5.3.3 RF-03.3: Gestión de Pedidos y Tracking** 

El emprendedor visualizará un listado con todas las órdenes de compra. Podrá actualizar el estado del pedido (Pendiente, Pagado, En Preparación, Despachado, Entregado, Cancelado) para realizar seguimiento y trazabilidad de la compra hacia el cliente. 

#### **5.3.4 RF-03.4: Gestión de Variantes de Producto (SKUs)** 

El sistema deberá permitir desglosar el inventario de un producto en variantes basadas en atributos dinámicos (ej. talla, color, capacidad). El control de stock y la validación de compra se realizarán de forma estricta a nivel de variante, y no únicamente a nivel del producto "padre". 

##### **Criterio de aceptación** 

Dado que una variante específica (ej. Polera Talla M) agota su stock, cuando un cliente intenta agregar esa variante al carrito, entonces el sistema impedirá la acción, permitiendo la compra únicamente de las variantes que aún dispongan de inventario (ej. Polera Talla L). 

#### **5.3.5 RF-03.5: Gestión de Páginas Informativas y Legales** 

El panel de administración proveerá un módulo para que el emprendedor cree, edite y publique páginas de texto estáticas. Esto garantizará que la tienda pueda exhibir documentos de cumpli- 

Página 6 

ERS – E-commerce SaaS Multipropósito 

Proyecto de Ingeniería 

miento legal exigidos por las pasarelas de pago, tales como "Términos y Condiciones", "Políticas de Privacidad "Políticas de Reembolso". 

##### **Criterio de aceptación** 

Dado que el administrador publica una página de "Términos y Condiciones", cuando un visitante navega por la tienda pública, entonces el enlace a dicha página será visible en la estructura de la web (ej. el pie de página) y mostrará el contenido redactado. 

### **5.4 RF-04: Marketing, Operaciones y SEO** 

#### **5.4.1 RF-04.1: Gestión de Promociones y Códigos de Descuento** 

El sistema deberá permitir al emprendedor configurar reglas comerciales para incentivar las ventas. Esto incluye la creación de códigos de descuento (con rebajas por porcentaje o monto fijo), la configuración de envío gratuito por compras superiores a un umbral, y la visualización de "precio oferta"(precio original tachado) en el catálogo. 

##### **Criterio de aceptación** 

Dado que un cliente ingresa un código de descuento válido en su carrito, cuando aplica dicho código en el proceso de checkout, entonces el sistema recalculará el monto a pagar restando el valor configurado en la promoción. 

#### **5.4.2 RF-04.2: Notificaciones Transaccionales Automatizadas** 

El sistema deberá enviar correos electrónicos automáticos al comprador en los hitos fundamentales del ciclo de vida del pedido, con el fin de otorgar seguridad y trazabilidad. Los envíos mínimos obligatorios serán: 

Confirmación de recepción del pedido (Resumen de compra). 

Confirmación de pago exitoso (o aviso de rechazo). 

Notificación de despacho (incluyendo el enlace al portal de seguimiento). 

##### **Criterio de aceptación** 

Dado que un pedido cambia exitosamente al estado "Pagado", cuando la base de datos registra la actualización, entonces el sistema despachará automáticamente un correo electrónico de confirmación al cliente sin intervención manual. 

#### **5.4.3 RF-04.3: Configuración de Analítica y SEO Básico** 

El sistema proporcionará herramientas para optimizar la visibilidad y medición de la tienda. A nivel de producto, se habilitarán campos para ingresar metadatos (Meta-título y Meta-descripción). A nivel global, el panel permitirá al emprendedor ingresar identificadores de rastreo (como el ID de Google Analytics o el Pixel de Meta/Facebook) sin necesidad de intervenir el código fuente. 

Página 7 

ERS – E-commerce SaaS Multipropósito 

Proyecto de Ingeniería 

##### **Criterio de aceptación** 

Dado que el administrador guarda un ID de Google Analytics en sus configuraciones, cuando un cliente navega por la tienda pública, entonces el sistema inyectará dinámicamente el script de rastreo correspondiente en las vistas del Frontend. 

#### **5.4.4 RF-04.4: Gestión de Privacidad y Consentimiento de Datos** 

El sistema deberá garantizar el cumplimiento de normativas de privacidad y protección de datos (ej. Ley de Protección de Datos, GDPR) mediante la captura del consentimiento explícito del comprador. Esto se implementará a través de dos mecanismos obligatorios en la interfaz pública: 

- **Banner de Cookies:** Un aviso emergente al ingresar a la tienda que permita al usuario aceptar o rechazar las cookies de seguimiento de terceros. Si el usuario rechaza o ignora el aviso, el sistema bloqueará proactivamente la inyección de los scripts de analítica y marketing (definidos en RF-04.3). 

- **Consentimiento en Checkout:** Una casilla de verificación (checkbox) obligatoria, desmarcada por defecto, en el paso final del proceso de pago. Esta exigirá la aceptación explícita de los "Términos y Condiciones "Políticas de Privacidad"(definidos en RF-03.5) antes de habilitar el botón de procesar la compra. 

##### **Criterio de aceptación** 

Dado que un comprador nuevo ingresa a la tienda y selecciona Rechazar.<sup>en</sup> el banner de cookies, cuando navega por el catálogo o el carrito de compras, entonces el Frontend (React) bloqueará la ejecución y no inyectará los identificadores de rastreo (Google Analytics/Meta Pixel) en la sesión del usuario. 

## **6 Matriz de Roles** 

Para esta versión genérica, el sistema opera con dos roles base: 

|**Rol**|**Permisos y Alcance**|
|---|---|
|**Emprendedor**|Administrador absoluto de su propia instancia. Gestiona<br>diseño, pasarelas, catálogo, envíos y revisa el histórico de<br>ventas.|
|**Comprador**|Usuario público. Busca productos, utiliza el carrito de com-<br>pras, realiza el pago y recibe notificaciones de seguimiento.|



## **7 Requerimientos No Funcionales** 

Página 8 

ERS – E-commerce SaaS Multipropósito 

Proyecto de Ingeniería 

- **7.1 RNF-01: Estándares de Calidad y Usabilidad** 

   - **Diseño Responsivo:** La tienda y el panel de administración deben ser completamente utilizables en dispositivos móviles, tablets y computadoras de escritorio. 

   - **Accesibilidad:** Orientación al cumplimiento de pautas WCAG 2.1 nivel AA. 

   - **Rendimiento:** El catálogo público deberá resolver las solicitudes iniciales en un tiempo inferior a 2,5 segundos bajo condiciones estándar. 

- **7.2 RNF-02: Arquitectura y Base de Datos** 

   - **Arquitectura Hexagonal:** El código debe estar estructurado en capas (Dominio, Aplicación, Infraestructura) para permitir el fácil recambio o agregación de nuevas pasarelas de pago y logística mediante puertos y adaptadores. 

   - **Bases de Datos Híbridas:** El núcleo transaccional (usuarios, configuraciones, pedidos y facturación) residirá en **PostgreSQL** . La gestión del catálogo, debido a su naturaleza polimórfica exigida por los múltiples rubros, residirá en **MongoDB** . 

- **7.3 RNF-03: Seguridad** 

   - **Cifrado:** Toda la comunicación entre cliente, servidor y APIs de pago deberá cursarse por HTTPS (TLS 1.2+). 

**Contraseñas:** Almacenamiento mediante algoritmos de hashing fuertes (Argon2 / bcrypt). 

- **7.4 RNF-04: Entregables (Manual de Despliegue)** 

Dado que el equipo no realizará el paso a producción, el software deberá entregarse con un **Manual de Despliegue Técnico** estructurado. Se proporcionarán las instrucciones necesarias de configuración de variables de entorno y despliegue según el proveedor de hosting que decida el cliente final. 

## **8 Matriz de Trazabilidad** 

|**ID**|**Requisito**|**Tipo**|**Prioridad**|
|---|---|---|---|
|RN-01|Branding Obligatorio de Autoría|Negocio|Alta|
|RN-02|Modalidades de Pago Configurable|Negocio|Alta|
|RN-03|Gestión de Inventario (Stock)|Negocio|Alta|
|RN-04|Autenticación de Compradores|Negocio|Alta|
|RF-01.1|Landing Page|Funcional|Media|
|RF-01.2|Personalización de Interfaz (Temas)|Funcional|Alta|
|RF-01.3|Catálogo Flexible (MongoDB)|Funcional|Alta|
|RF-01.4|Estructura del Catálogo (Layout)|Funcional|Alta|



Página 9 

ERS – E-commerce SaaS Multipropósito 

Proyecto de Ingeniería 

|RF-02.1|Checkout y Autenticación|Funcional|Alta|
|---|---|---|---|
|RF-02.2|Pasarelas de Pago Múltiples|Funcional|Alta|
|RF-02.3|Integración Logística|Funcional|Alta|
|RF-02.4|Seguimiento de Envío (Tracking)|Funcional|Alta|
|RF-03.1|Dashboard Operativo|Funcional|Media|
|RF-03.2|Gestión de Inventario (CRUD)|Funcional|Alta|
|RF-03.3|Gestión de Pedidos y Tracking|Funcional|Alta|
|RF-03.4|Gestión de Variantes (SKUs)|Funcional|Alta|
|RF-03.5|Gestión de Páginas Legales|Funcional|Alta|
|RF-04.1|Promociones y Descuentos|Funcional|Media|
|RF-04.2|Notificaciones Transaccionales|Funcional|Alta|
|RF-04.3|Analítica y SEO Básico|Funcional|Media|
|RF-04.4|Privacidad y Consentimiento de Datos|Funcional|Alta|
|RNF-02|Arquitectura Hexagonal y DB Híbrida|No Funcional|Alta|
|RNF-04|Manuales de Despliegue|No Funcional|Alta|



## **9 Fuera de Alcance** 

Las siguientes actividades quedan explícitamente excluidas del desarrollo de este proyecto: 

1. **Alojamiento y Despliegue (Hosting):** El equipo desarrollador entregará el código fuente y los manuales, pero no administrará servidores (AWS, Heroku, VPS, etc.) ni pagará infraestructura en producción para los clientes. 

2. **Adquisición de Licencias:** El equipo no tramitará contratos comerciales con Transbank, Mercado Pago, Starken u otros. Las credenciales de producción (API Keys) corren por cuenta del emprendedor. 

3. **Facturación Electrónica Automática (SII):** El sistema gestionará el estado de las órdenes, pero la emisión de boletas o facturas válidas ante el Servicio de Impuestos Internos quedará sujeta a los sistemas externos que utilice el negocio. 

## **10 Decisiones Pendientes de Validación** 

1. **Validación de Levantamiento:** Se debe realizar el proceso de entrevistas con diferentes emprendedores la próxima semana para validar y priorizar si existen requerimientos adicionales críticos que la solución deba empaquetar por defecto. 

2. **Plantillas Específicas:** Definir los 4 conjuntos de paletas de colores exactos que estarán disponibles en la primera versión (MVP). 

Página 10 

ERS – E-commerce SaaS Multipropósito 

Proyecto de Ingeniería 

## **11 Estado Final de la Especificación** 

La presente versión (5.2) constituye el acta base de requerimientos tras el pivote hacia un **Software E-commerce Empaquetado (SaaS)** . Se han reciclado los estándares de calidad del proyecto anterior y se han integrado las directrices de Arquitectura Hexagonal, bases de datos híbridas y personalización comercial exigidas por la consultoría académica, junto con módulos avanzados de marketing, operaciones logísticas y analítica web. 

Página 11 

