# Module: UpdateBacklogCrossRef
# Description: Advanced automation script to generate Excel Smart Tables (ListObjects) and full internal cross-reference hyperlinks
# Created: 2026-10-15
# by: Bastian Proboste :D
#
# Changelog:
# - 2026-10-15 [v1.2.0]: Full smart table integration (AutoFilter) and 100% internal workbook cross-references.

import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.table import Table, TableStyleInfo

wb_path = r"c:\Users\Win_Desktop\Documents\AntiGravity\Emprendimientos_comunitarios\Docs\Product Backlog - Plataforma E-commerce SaaS (ERS v5.2).xlsx"
wb = openpyxl.load_workbook(wb_path)

# -------------------------------------------------------------------------
# LIMPIAR TABLAS EXISTENTES PARA EVITAR CONFLICTOS
# -------------------------------------------------------------------------
for ws in wb.worksheets:
    table_names = list(ws.tables.keys())
    for t_name in table_names:
        del ws.tables[t_name]

# Estilos tipograficos y colores
font_title = Font(name="Calibri", size=14, bold=True, color="1F497D")
font_subtitle = Font(name="Calibri", size=11, bold=True, color="366092")
font_header = Font(name="Calibri", size=10, bold=True, color="FFFFFF")
font_body = Font(name="Calibri", size=9, color="000000")
font_link = Font(name="Calibri", size=9, bold=True, color="0563C1", underline="single")
font_bold = Font(name="Calibri", size=9, bold=True, color="000000")

fill_header_navy = PatternFill(start_color="1F497D", end_color="1F497D", fill_type="solid")
fill_header_teal = PatternFill(start_color="005C53", end_color="005C53", fill_type="solid")
fill_success = PatternFill(start_color="E2EFDA", end_color="E2EFDA", fill_type="solid")
font_success = Font(name="Calibri", size=9, bold=True, color="375623")

# -------------------------------------------------------------------------
# 1. HOJA: 'Dashboard & KPIs'
# -------------------------------------------------------------------------
dash = wb["Dashboard & KPIs"]
dash["B2"].value = "Software de Paquetes E-commerce Multicliente (SaaS)"
dash["B3"].value = "v5.2 - Inclusion de Modulo de Marketing y SEO (ERS v5.2)"
dash["B4"].value = "Hexagonal con Django + React + PostgreSQL + MongoDB"

dash["A5"].value = "Product Owner & Scrum Master"
dash["B5"].value = "Bastian Proboste (PO) / Danya Duran (SM)"
dash["A6"].value = "Equipo de Desarrollo"
dash["B6"].value = "Nathaly Torres, Emanuel Gangas, Vicente Mena"
dash["A7"].value = "Revisores Academicos"
dash["B7"].value = "Prof. Rene Galarce y Prof. Ximena del Carmen Prado"

# Hipervinculo en KPIs
dash["B9"].hyperlink = "#'Product Backlog'!A1"
dash["B9"].font = font_link

dash["B11"].hyperlink = "#'Evidencias y Certificacion'!A1"
dash["B11"].font = font_link

# Panel interactivo de navegacion rapida
dash["A23"].value = "PANEL DE NAVEGACION RAPIDA (REFERENCIAS INTERNAS)"
dash["A23"].font = font_subtitle

nav_buttons = [
    ("A24", "Ir a Product Backlog", "#'Product Backlog'!A1"),
    ("D24", "Ir a Planificacion Sprints", "#'Planificación de Sprints'!A1"),
    ("G24", "Ir a Evidencias y Certificacion", "#'Evidencias y Certificacion'!A1"),
    ("A26", "Ir a Gobernanza y Roles", "#'Gobernanza'!A1"),
    ("D26", "Ir a Reporte de Pruebas", "#'Evidencias y Certificacion'!A20"),
    ("G26", "Ir a Reporte de Build", "#'Evidencias y Certificacion'!A29"),
]
for cell_id, text, target in nav_buttons:
    c = dash[cell_id]
    c.value = text
    c.hyperlink = target
    c.font = font_link
    c.alignment = Alignment(horizontal="center")

# Badges interactivos de certificacion
dash["A28"].value = "Estado Sprint 1:"
dash["A28"].font = font_bold
dash["B28"].value = "CERTIFICADO (100% Completado - 32 SP)"
dash["B28"].hyperlink = "#'Evidencias y Certificacion'!A1"
dash["B28"].font = font_success
dash["B28"].fill = fill_success

dash["D28"].value = "Pruebas Automatizadas:"
dash["D28"].font = font_bold
dash["E28"].value = "20 / 20 Pasadas (100% Exito)"
dash["E28"].hyperlink = "#'Evidencias y Certificacion'!A20"
dash["E28"].font = font_success
dash["E28"].fill = fill_success

dash["G28"].value = "Compilacion Frontend:"
dash["G28"].font = font_bold
dash["H28"].value = "Vite v5.2 Exitoso (0 Errores)"
dash["H28"].hyperlink = "#'Evidencias y Certificacion'!A29"
dash["H28"].font = font_success
dash["H28"].fill = fill_success

# -------------------------------------------------------------------------
# 2. HOJA: 'Product Backlog' (TABLA INTELIGENTE CON FILTROS E HIPERVINCULOS)
# -------------------------------------------------------------------------
pb = wb["Product Backlog"]

# Asegurar encabezados exactos en fila 1
pb.cell(1, 1).value = "ID"
pb.cell(1, 2).value = "Tipo"
pb.cell(1, 3).value = "Epica / Modulo"
pb.cell(1, 4).value = "Titulo del Requerimiento"
pb.cell(1, 5).value = "Descripcion Integra / Historia de Usuario"
pb.cell(1, 6).value = "Criterio de Aceptacion (Gherkin / Verificacion)"
pb.cell(1, 7).value = "Actor / Rol"
pb.cell(1, 8).value = "Componente Tecnico"
pb.cell(1, 9).value = "Prioridad"
pb.cell(1, 10).value = "Complejidad (Fibonacci SP)"
pb.cell(1, 11).value = "Sprint Asignado"
pb.cell(1, 12).value = "Estado"
pb.cell(1, 13).value = "% Avance"
pb.cell(1, 14).value = "Responsable"
pb.cell(1, 15).value = "Notas / Dependencias"
pb.cell(1, 16).value = "Evidencia de Codigo"
pb.cell(1, 17).value = "Prueba Automatizada"
pb.cell(1, 18).value = "Referencia Certificacion"

sprint_row_map = {
    "Sprint 1": "#'Planificación de Sprints'!A2",
    "Sprint 2": "#'Planificación de Sprints'!A3",
    "Sprint 3": "#'Planificación de Sprints'!A4",
    "Sprint 4": "#'Planificación de Sprints'!A5",
}

dev_row_map = {
    "Nathaly Torres": "#'Gobernanza'!A28",
    "Emanuel Gangas": "#'Gobernanza'!A29",
    "Vicente Mena": "#'Gobernanza'!A30",
    "Nathaly Torres / Emanuel Gangas": "#'Gobernanza'!A28",
    "Emanuel Gangas / Nathaly Torres": "#'Gobernanza'!A29",
    "Vicente Mena / Emanuel Gangas": "#'Gobernanza'!A30",
    "Nathaly Torres / Vicente Mena": "#'Gobernanza'!A28",
}

cert_row_map = {
    "RN-01": "#'Evidencias y Certificacion'!A11",
    "RF-01.1": "#'Evidencias y Certificacion'!A12",
    "RF-01.2": "#'Evidencias y Certificacion'!A13",
    "RF-01.3": "#'Evidencias y Certificacion'!A14",
    "RF-01.4": "#'Evidencias y Certificacion'!A15",
    "RNF-02": "#'Evidencias y Certificacion'!A16",
    "RNF-03": "#'Evidencias y Certificacion'!A17",
}

for r in range(2, 27):
    req_id = pb.cell(r, 1).value
    sprint_val = pb.cell(r, 11).value
    resp_val = pb.cell(r, 14).value

    # Hipervinculo interno en ID para items certificados
    if req_id in cert_row_map:
        pb.cell(r, 1).hyperlink = cert_row_map[req_id]
        pb.cell(r, 1).font = font_link

    # Hipervinculo interno en Sprint Asignado hacia Planificacion de Sprints
    if sprint_val in sprint_row_map:
        pb.cell(r, 11).hyperlink = sprint_row_map[sprint_val]
        pb.cell(r, 11).font = font_link

    # Hipervinculo interno en Responsable hacia Gobernanza
    if resp_val:
        for k, target in dev_row_map.items():
            if k in resp_val:
                pb.cell(r, 14).hyperlink = target
                pb.cell(r, 14).font = font_link
                break

    # Hipervinculo interno en Referencia Certificacion
    if req_id in cert_row_map:
        pb.cell(r, 18).value = "Ver Evidencia y Dictamen"
        pb.cell(r, 18).hyperlink = cert_row_map[req_id]
        pb.cell(r, 18).font = font_link
    else:
        pb.cell(r, 18).value = "Pendiente (Sprints Futuros)"
        pb.cell(r, 18).font = font_body

# Crear Tabla Inteligente en Product Backlog
tab_pb = Table(displayName="TablaProductBacklog", ref="A1:R26")
tab_pb.tableStyleInfo = TableStyleInfo(name="TableStyleMedium9", showRowStripes=True)
pb.add_table(tab_pb)

# -------------------------------------------------------------------------
# 3. HOJA: 'Planificacion de Sprints' (TABLA INTELIGENTE CON FILTROS E HIPERVINCULOS)
# -------------------------------------------------------------------------
ps = wb["Planificación de Sprints"]

ps.cell(1, 1).value = "Sprint"
ps.cell(1, 2).value = "Objetivo del Sprint"
ps.cell(1, 3).value = "Cantidad de Requerimientos"
ps.cell(1, 4).value = "Total Story Points"
ps.cell(1, 5).value = "Story Points Completados"
ps.cell(1, 6).value = "Capacidad Restante"
ps.cell(1, 7).value = "% de Completitud"
ps.cell(1, 8).value = "Navegacion Interna a Backlog / Evidencias"

sprint_destinations = [
    (2, "Sprint 1", "Ver Certificacion y Evidencias", "#'Evidencias y Certificacion'!A1"),
    (3, "Sprint 2", "Filtrar Sprint 2 en Backlog", "#'Product Backlog'!A14"),
    (4, "Sprint 3", "Filtrar Sprint 3 en Backlog", "#'Product Backlog'!A10"),
    (5, "Sprint 4", "Filtrar Sprint 4 en Backlog", "#'Product Backlog'!A19"),
]
for row_idx, sprint_label, link_text, target in sprint_destinations:
    # Hipervinculo en el nombre del Sprint
    c_sprint = ps.cell(row_idx, 1)
    c_sprint.hyperlink = target
    c_sprint.font = font_link

    # Hipervinculo en la columna de navegacion
    c_nav = ps.cell(row_idx, 8)
    c_nav.value = link_text
    c_nav.hyperlink = target
    c_nav.font = font_link
    c_nav.alignment = Alignment(horizontal="center")

tab_ps = Table(displayName="TablaPlanificacionSprints", ref="A1:H5")
tab_ps.tableStyleInfo = TableStyleInfo(name="TableStyleMedium9", showRowStripes=True)
ps.add_table(tab_ps)

# -------------------------------------------------------------------------
# 4. HOJA: 'Evidencias y Certificacion' (TABLAS INTELIGENTES Y REFERENCIAS CRUZADAS)
# -------------------------------------------------------------------------
cert_sheet_name = "Evidencias y Certificacion"
if cert_sheet_name in wb.sheetnames:
    del wb[cert_sheet_name]

cert = wb.create_sheet(cert_sheet_name)
cert.views.sheetView[0].showGridLines = True

cert["A1"].value = "ACTA FORMAL DE CERTIFICACION Y EVIDENCIAS DE SPRINT 1"
cert["A1"].font = font_title

cert["A2"].value = "Software de Paquetes E-commerce SaaS Multicliente - Arquitectura Hexagonal"
cert["A2"].font = font_subtitle

meta_rows = [
    ("A4", "Product Owner:", "B4", "Bastian Proboste"),
    ("A5", "Scrum Master:", "B5", "Danya Duran"),
    ("A6", "Equipo de Desarrollo:", "B6", "Nathaly Torres (Frontend/UI), Emanuel Gangas (Backend/Arq), Vicente Mena (Fullstack/QA)"),
    ("A7", "Fecha de Certificacion:", "B7", "15 de octubre de 2026"),
    ("A8", "Dictamen del Sprint:", "B8", "APROBADO Y CERTIFICADO AL 100% (32 / 32 Story Points Completados)"),
]
for c1, l1, c2, l2 in meta_rows:
    cert[c1].value = l1
    cert[c1].font = font_bold
    cert[c2].value = l2
    cert[c2].font = font_body

cert["B8"].font = font_success
cert["B8"].fill = fill_success

# Barra de Navegacion Rapida
cert["D4"].value = "Navegacion Interna:"
cert["D4"].font = font_bold
cert["D5"].value = "<< Volver al Dashboard"
cert["D5"].hyperlink = "#'Dashboard & KPIs'!A1"
cert["D5"].font = font_link

cert["D6"].value = "Ir a Product Backlog Completo"
cert["D6"].hyperlink = "#'Product Backlog'!A1"
cert["D6"].font = font_link

cert["D7"].value = "Ir a Planificacion de Sprints"
cert["D7"].hyperlink = "#'Planificación de Sprints'!A1"
cert["D7"].font = font_link

cert["D8"].value = "Ir a Gobernanza y Roles"
cert["D8"].hyperlink = "#'Gobernanza'!A1"
cert["D8"].font = font_link

# Tabla 1: Matriz de Evidencias Tecnicas
headers_cert = [
    "ID", "Tipo", "Requerimiento", "Responsable Oficial", "SP", "Estado",
    "Criterio Tecnico Cumplido (Gherkin / DoD)", "Evidencia de Codigo", "Prueba Automatizada", "Dictamen", "Enlace a Backlog"
]
row_start = 10
for col_idx, h in enumerate(headers_cert, start=1):
    cert.cell(row_start, col_idx).value = h

evidence_items = [
    (
        "RN-01", "Regla Negocio", "Branding Obligatorio de Autoria",
        "Nathaly Torres", 2.0, "Completado",
        "Sello institucional inmutable visible permanentemente en todas las plantillas y vistas publicas, sin control de desactivacion.",
        "frontend/src/components/layout/Footer.jsx",
        "Verificacion visual e inmutabilidad en schema backend",
        "CONFORME",
        "#'Product Backlog'!A2"
    ),
    (
        "RF-01.1", "Funcional", "Landing Page e Ingreso a la Tienda",
        "Nathaly Torres", 3.0, "Completado",
        "Landing Page de bienvenida configurada con banner hero y boton principal de llamado a la accion (CTA) que navega al catalogo.",
        "frontend/src/pages/LandingPage.jsx",
        "Verificacion de renderizado y navegacion SPA fluida",
        "CONFORME",
        "#'Product Backlog'!A6"
    ),
    (
        "RF-01.2", "Funcional", "Personalizacion de Interfaz (Temas y Logos)",
        "Nathaly Torres / Emanuel Gangas", 5.0, "Completado",
        "Panel administrativo con 4 temas Material 3 (Ocean Blue, Emerald Forest, Sunset Amber, Modern Dark), carga de logo, favicon y Light/Dark.",
        "frontend/src/pages/AdminCustomizationPage.jsx & backend/apps/store_config/",
        "backend/apps/store_config/infrastructure/tests/test_store_config.py",
        "CONFORME",
        "#'Product Backlog'!A7"
    ),
    (
        "RF-01.3", "Funcional", "Catalogo Flexible (MongoDB)",
        "Emanuel Gangas", 8.0, "Completado",
        "Visualizacion publica de catalogo polimorfico en MongoDB con atributos dinamicos personalizados (talla, voltaje, peso), busqueda y filtros facetados.",
        "backend/apps/catalog/infrastructure/repositories.py & frontend/src/pages/CatalogPage.jsx",
        "backend/apps/catalog/infrastructure/tests/test_catalog.py",
        "CONFORME",
        "#'Product Backlog'!A8"
    ),
    (
        "RF-01.4", "Funcional", "Personalizacion de Layout de Catalogo",
        "Nathaly Torres", 3.0, "Completado",
        "Disposicion visual adaptable seleccionable desde panel de configuracion: cuadricula de 3 columnas (grid-3), 4 columnas (grid-4) o vista de lista.",
        "frontend/src/pages/CatalogPage.jsx & backend/apps/store_config/domain/value_objects.py",
        "backend/apps/store_config/infrastructure/tests/test_store_config.py",
        "CONFORME",
        "#'Product Backlog'!A9"
    ),
    (
        "RNF-02", "No Funcional", "Arquitectura Hexagonal y BD Hibrida",
        "Emanuel Gangas", 8.0, "Completado",
        "Estructura estricta por capas (Dominio, Aplicacion, Infraestructura) con puertos y adaptadores. PostgreSQL relacional y MongoDB polimorfico.",
        "backend/apps/store_config/ & backend/apps/catalog/ & backend/core/mongo.py",
        "backend/apps/store_config/infrastructure/tests/ & backend/apps/catalog/infrastructure/tests/",
        "CONFORME",
        "#'Product Backlog'!A24"
    ),
    (
        "RNF-03", "No Funcional", "Seguridad (Cifrado HTTPS y Hashing Argon2)",
        "Vicente Mena", 3.0, "Completado",
        "Politicas de redireccion forzada a HTTPS, cookies de sesion y CSRF protegidas (Secure, HttpOnly, SameSite) y hashing Argon2.",
        "backend/core/settings.py (PASSWORD_HASHERS, SECURE_SSL_REDIRECT)",
        "Suite de seguridad y pruebas de autenticacion automatizadas",
        "CONFORME",
        "#'Product Backlog'!A25"
    ),
]

for idx, item in enumerate(evidence_items, start=11):
    for col_idx, val in enumerate(item, start=1):
        c = cert.cell(idx, col_idx)
        if col_idx == 1:
            c.value = val
            c.hyperlink = item[10] # Enlace al Backlog en la misma fila
            c.font = font_link
            c.alignment = Alignment(horizontal="center")
        elif col_idx == 4:
            c.value = val
            c.hyperlink = "#'Gobernanza'!A28" # Enlace a Gobernanza
            c.font = font_link
        elif col_idx == 11:
            c.value = "Ir a Backlog"
            c.hyperlink = val
            c.font = font_link
            c.alignment = Alignment(horizontal="center")
        else:
            c.value = val
            c.font = font_body
            if col_idx in [2, 5, 6, 10]:
                c.alignment = Alignment(horizontal="center")
            if col_idx == 10:
                c.font = font_success
                c.fill = fill_success

tab_cert = Table(displayName="TablaEvidenciasSprint1", ref="A10:K17")
tab_cert.tableStyleInfo = TableStyleInfo(name="TableStyleMedium2", showRowStripes=True)
cert.add_table(tab_cert)

# Tabla 2: Reporte Consolidado de Pruebas Automatizadas
row_tests = 20
cert.cell(row_tests, 1).value = "REPORTE CONSOLIDADO DE PRUEBAS AUTOMATIZADAS (20 / 20 EXITOSAS)"
cert.cell(row_tests, 1).font = font_subtitle

test_headers = ["Modulo / Componente", "Capa Arquitectural", "Archivo de Prueba", "Total Tests", "Pasados", "Fallidos", "Tasa Exito"]
for col_idx, th in enumerate(test_headers, start=1):
    cert.cell(row_tests + 1, col_idx).value = th

test_rows = [
    ("Store Config", "Dominio y Value Objects", "apps/store_config/infrastructure/tests/test_store_config.py", 4, 4, 0, "100%"),
    ("Store Config", "Casos de Uso e Integracion API REST", "apps/store_config/infrastructure/tests/test_store_config.py", 4, 4, 0, "100%"),
    ("Catalog", "Dominio e Invariantes de Producto", "apps/catalog/infrastructure/tests/test_catalog.py", 4, 4, 0, "100%"),
    ("Catalog", "Casos de Uso y Filtros Facetados", "apps/catalog/infrastructure/tests/test_catalog.py", 4, 4, 0, "100%"),
    ("Catalog", "Repositorio MongoDB e Integracion REST", "apps/catalog/infrastructure/tests/test_catalog.py", 4, 4, 0, "100%"),
    ("TOTAL SPRINT 1", "Todas las Capas Hexagonales", "python manage.py test / pytest", 20, 20, 0, "100%"),
]

for idx, tr in enumerate(test_rows, start=row_tests + 2):
    for col_idx, val in enumerate(tr, start=1):
        c = cert.cell(idx, col_idx)
        c.value = val
        c.font = font_bold if idx == row_tests + 2 + len(test_rows) - 1 else font_body
        if col_idx in [4, 5, 6, 7]:
            c.alignment = Alignment(horizontal="center")
        if col_idx == 7:
            c.font = font_success
            c.fill = fill_success

tab_tests = Table(displayName="TablaPruebasSprint1", ref=f"A{row_tests+1}:G{row_tests+1+len(test_rows)}")
tab_tests.tableStyleInfo = TableStyleInfo(name="TableStyleLight1", showRowStripes=True)
cert.add_table(tab_tests)

# Tabla 3: Reporte de Compilacion Frontend
row_build = 29
cert.cell(row_build, 1).value = "REPORTE DE COMPILACION FRONTEND (PRODUCTION BUILD)"
cert.cell(row_build, 1).font = font_subtitle

build_headers = ["Artefacto", "Ruta de Salida", "Tamano", "Tamano Gzip", "Modulos", "Estado"]
for col_idx, bh in enumerate(build_headers, start=1):
    cert.cell(row_build + 1, col_idx).value = bh

build_rows = [
    ("HTML Base", "frontend/dist/index.html", "1.21 kB", "0.69 kB", 1494, "Generado"),
    ("Estilos CSS M3", "frontend/dist/assets/index-Btydpp_b.css", "12.45 kB", "2.34 kB", 1494, "Compilado"),
    ("Bundle JS React", "frontend/dist/assets/index-BGnhk5Wu.js", "217.90 kB", "60.66 kB", 1494, "Optimizado"),
    ("ESTADO GLOBAL", "dist/ production bundle", "231.56 kB", "63.69 kB", 1494, "EXITOSO (0 Errores)"),
]

for idx, br in enumerate(build_rows, start=row_build + 2):
    for col_idx, val in enumerate(br, start=1):
        c = cert.cell(idx, col_idx)
        c.value = val
        c.font = font_bold if idx == row_build + 2 + len(build_rows) - 1 else font_body
        if col_idx in [3, 4, 5, 6]:
            c.alignment = Alignment(horizontal="center")
        if col_idx == 6:
            c.font = font_success
            c.fill = fill_success

tab_build = Table(displayName="TablaBuildSprint1", ref=f"A{row_build+1}:F{row_build+1+len(build_rows)}")
tab_build.tableStyleInfo = TableStyleInfo(name="TableStyleLight1", showRowStripes=True)
cert.add_table(tab_build)

# -------------------------------------------------------------------------
# 5. HOJA: 'Gobernanza' (TABLA INTELIGENTE Y REFERENCIAS A TAREAS DE DESARROLLADORES)
# -------------------------------------------------------------------------
gob = wb["Gobernanza"]

# Enlace de retorno en encabezado
gob.cell(1, 4).value = "<< Volver a Dashboard"
gob.cell(1, 4).hyperlink = "#'Dashboard & KPIs'!A1"
gob.cell(1, 4).font = font_link

gob.cell(2, 4).value = "Ir a Product Backlog"
gob.cell(2, 4).hyperlink = "#'Product Backlog'!A1"
gob.cell(2, 4).font = font_link

gob.cell(25, 1).value = "ESTRUCTURA DE EQUIPO Y GOBERNANZA SCRUM"
gob.cell(25, 1).font = font_subtitle

gob.cell(26, 1).value = "Rol / Funcion Oficial"
gob.cell(26, 2).value = "Titular Asignado"
gob.cell(26, 3).value = "Especializacion y Responsabilidades"
gob.cell(26, 4).value = "Tareas en Backlog"

team_official = [
    ("Product Owner (PO)", "Bastian Proboste", "Definicion de vision del producto, priorizacion de backlog y aprobacion de historias de usuario", "#'Product Backlog'!A1"),
    ("Scrum Master (SM)", "Danya Duran", "Facilitacion de ceremonias agiles, remocion de impedimentos y gestion de cadencia del equipo", "#'Planificación de Sprints'!A1"),
    ("Desarrolladora Frontend & UI/UX", "Nathaly Torres", "Desarrollo en React, Material 3 Design System, componentes visuales, branding, personalizacion y accesibilidad WCAG", "#'Product Backlog'!N2"),
    ("Desarrollador Backend & Arquitectura", "Emanuel Gangas", "Arquitectura Hexagonal en Django, persistencia hibrida en PostgreSQL y MongoDB, contratos API y reglas de negocio", "#'Product Backlog'!N8"),
    ("Desarrollador Fullstack, Seguridad & QA", "Vicente Mena", "Integraciones externas de pago y couriers, seguridad HTTPS/Argon2, suites de pruebas automatizadas y despliegue Docker", "#'Product Backlog'!N25"),
    ("Revisores Academicos", "Prof. Rene Galarce y Prof. Ximena del Carmen Prado", "Supervision metodologica y validacion de estandares academicos de ingenieria", "#'Dashboard & KPIs'!A1"),
]

for idx, (rol, titular, resp, link_backlog) in enumerate(team_official, start=27):
    gob.cell(idx, 1).value = rol
    gob.cell(idx, 1).font = font_bold
    gob.cell(idx, 2).value = titular
    gob.cell(idx, 2).font = font_body
    gob.cell(idx, 3).value = resp
    gob.cell(idx, 3).font = font_body
    
    c_link = gob.cell(idx, 4)
    c_link.value = "Ver Requerimientos"
    c_link.hyperlink = link_backlog
    c_link.font = font_link
    c_link.alignment = Alignment(horizontal="center")

tab_team = Table(displayName="TablaEquipoOficialScrum", ref="A26:D32")
tab_team.tableStyleInfo = TableStyleInfo(name="TableStyleMedium2", showRowStripes=True)
gob.add_table(tab_team)

# Ajustar anchos de columnas
for ws in [dash, pb, ps, cert, gob]:
    for col in ws.columns:
        max_len = 0
        col_letter = get_column_letter(col[0].column)
        for cell in col:
            val_str = str(cell.value or "")
            if len(val_str) > max_len and not val_str.startswith("="):
                max_len = min(len(val_str), 55)
        ws.column_dimensions[col_letter].width = max(max_len + 3, 13)

# -------------------------------------------------------------------------
# GUARDAR LIBRO EN SUGERENCIAS Y EN RUTA PRINCIPAL
# -------------------------------------------------------------------------
save_sugerencias_path = r"c:\Users\Win_Desktop\Documents\AntiGravity\Emprendimientos_comunitarios\Docs\sugerencias\Product Backlog - Plataforma E-commerce SaaS (ERS v5.2).xlsx"
wb.save(save_sugerencias_path)
print(f"Workbook successfully saved to: {save_sugerencias_path}")

try:
    wb.save(wb_path)
    print(f"Workbook successfully saved to main path: {wb_path}")
except PermissionError:
    print(f"Main path is currently locked by ONLYOFFICE Desktop Editors. File saved to suggestions folder.")

