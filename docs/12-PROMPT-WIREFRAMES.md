# L. Prompt para Generar Wireframes

---

## Instrucciones para diseñar wireframes de las pantallas principales

Usa el siguiente prompt en una herramienta de diseño AI (v0, Figma AI, Galileo AI) o como guía para un diseñador UI.

---

### Prompt maestro (contexto general)

```
Diseña wireframes de alta fidelidad para "Hotelia", un PMS (Property Management System)
de nueva generación para hoteles resort, all inclusive y plan europeo.

CONTEXTO:
- Hotel de referencia: resort de playa en Acapulco, 412 habitaciones, 5 restaurantes,
  3 bares, boutique, spa, 4 salones de eventos
- Operación: all inclusive + plan europeo + grupos + eventos + OTAs + agencias + corporativo
- Usuarios: recepción, reservaciones, revenue, ventas, A&B, contabilidad, housekeeping,
  mantenimiento, dirección general

PRINCIPIOS DE DISEÑO:
- Interfaz limpia, moderna y minimalista (inspiración: Linear, Figma, Notion)
- Paleta neutra con acentos azul (#2563EB), verde (#059669), naranja (#D97706), rojo (#DC2626)
- Tipografía: Inter para texto, JetBrains Mono para números/importes
- Fondo: #FAFBFC (light) / #0F1117 (dark)
- Navegación: sidebar izquierda colapsable + topbar con búsqueda global
- Componentes: cards, tablas con virtualización, calendarios tipo Gantt, formularios
  con autocompletado, modales, side panels, tooltips
- Responsive: desktop-first, con versiones tablet y móvil para módulos operativos
- Densidad: informativa sin saturación, excelente jerarquía visual
- Interacciones: drag and drop, hover previews, inline editing, skeleton loading
- Dark mode como opción

NO:
- No uses colores brillantes o gradientes innecesarios
- No uses iconos decorativos — solo funcionales
- No sobrecargues de texto — prefiere datos visuales
- No diseñes como software de los 2000s
```

---

### Prompt por pantalla

#### 1. Dashboard de Director General
```
Diseña el dashboard ejecutivo principal de Hotelia.

Layout:
- Topbar: nombre del hotel, fecha actual, búsqueda global, notificaciones, perfil
- Sidebar colapsada con iconos de módulos

Contenido:
- Fila superior: 5 KPI cards (Ocupación %, ADR, RevPAR, TRevPAR, Ingresos del día)
  - Cada card muestra: valor actual, variación vs ayer (flecha + porcentaje + color)
  - Números grandes en monospace bold

- Sección media izquierda: Gráfica de barras de ocupación últimos 30 días
  - Barras con línea de tendencia superpuesta
  - Leyenda: real, forecast, presupuesto, año anterior

- Sección media derecha: Ingresos por departamento (tabla compacta)
  - Hospedaje, A&B, Eventos, Spa, Boutique, Otros
  - Monto y % del total

- Sección inferior izquierda: Movimiento del día
  - Llegadas: 47, Salidas: 52, In-house: 349, Walk-ins: 3, Grupos activos: 4

- Sección inferior derecha: Alertas (lista con iconos de severidad)
  - ⚠ 3 grupos sin depósito
  - ⚠ Overbooking sábado +4
  - ⚠ 12 CxC vencidas
  - ✓ Auditoría nocturna OK

Estilo: cards con bordes sutiles, sombra mínima, mucho espacio blanco.
```

#### 2. Calendar View de Disponibilidad
```
Diseña el calendario de disponibilidad de habitaciones para Hotelia.

Layout:
- Toolbar: selector de periodo (día/semana/mes), navegación (< mes >), filtros
  (tipo de habitación, canal, allotment), botón exportar
- Grid principal: filas = tipos de habitación, columnas = días

Contenido:
- Primera fila: indicador de ocupación % por día (con color: verde <70%, amarillo 70-90%, rojo >90%)
- Filas por tipo: nombre + total de habitaciones a la izquierda
- Cada celda muestra: número de habitaciones disponibles
- Color de celda: 🟢 >20% disp, 🟡 5-20%, 🔴 <5%, ⬛ SOLD OUT
- Hover: tooltip con desglose (transient: 5, grupo: 3, allotment: 2, disponible: 8)
- Footer: leyenda de colores

Interacciones:
- Click en celda: popup con detalle y opción de crear reservación
- Drag horizontal: seleccionar rango de fechas para nueva reservación
- Scroll horizontal fluido con lazy loading
- Filtros que actualizan grid en tiempo real

Estilo: grid limpio, bordes sutiles, números centrados, hover con highlight de fila y columna.
```

#### 3. Room Rack
```
Diseña el room rack visual (tape chart) de Hotelia.

Layout:
- Toolbar: fecha actual, navegación, filtros (piso, edificio, tipo, estatus), leyenda
- Grid: filas = habitaciones individuales (agrupadas por piso), columnas = días

Contenido:
- Columna izquierda fija: número de habitación + tipo (ej: "301 STD")
- Separadores por piso
- Reservaciones como bloques horizontales sobre las celdas
  - Color por tipo: 🔵 EP, 🟠 AI, 🟣 Grupo, 🟤 Corporativo
  - Texto en bloque: nombre del huésped
  - Borde izquierdo verde = check-in hoy, borde derecho naranja = check-out hoy
  - Patrón rayado = tentativa
  - Gris = bloqueada
  - Rojo suave con icono = mantenimiento
- Celdas vacías = disponible (fondo blanco)
- Indicadores de housekeeping en la columna de hoy

Interacciones:
- Drag bloque para mover reservación a otra habitación
- Drag borde derecho para extender/acortar estancia
- Click en bloque: side panel con detalle de reservación
- Click en celda vacía: crear reservación
- Hover en bloque: tooltip con nombre, fechas, plan, saldo

Estilo: Grid compacto pero legible. Bloques con esquinas redondeadas. Texto pequeño pero claro.
```

#### 4. POS — Pantalla de Venta
```
Diseña la pantalla principal de venta del POS para un restaurante del hotel.

Layout dividido en 3 columnas:
- Izquierda (30%): Cuenta abierta / ticket
- Centro (50%): Catálogo de productos
- Derecha (20%): Acciones y cobro

Columna izquierda (Cuenta):
- Header: Mesa 5 | Hab. 301 | García, María
- Badge: 🟢 AI INCLUIDO (o 🔴 CON CARGO)
- Lista de items:
  - Producto | Cant | Precio | Subtotal
  - Items incluidos en AI con checkmark verde y precio tachado
  - Items premium/extra con precio normal
- Subtotal, impuestos, propina, total
- Botón: Dividir cuenta

Columna central (Productos):
- Barra de búsqueda
- Tabs de categoría: Entradas | Platos Fuertes | Postres | Bebidas | Otros
- Grid de productos como cards con: nombre, precio, foto pequeña
- Badge en producto: "AI" (incluido), "$" (cargo extra)
- Modificadores al seleccionar (popup rápido)

Columna derecha (Acciones):
- Botones grandes:
  [Cargo a habitación]
  [Efectivo]
  [Tarjeta]
  [Consumo incluido AI]
  [Dividir]
  [Enviar a cocina]
  [Imprimir]

Indicador claro de plan del huésped en header.
Touch-friendly para uso en tablet.
```

#### 5. Formulario de Check-in
```
Diseña el flujo de check-in de Hotelia.

Layout: Panel central con pasos progresivos (stepper sutil en la parte superior).

Paso 1 - Identificar reservación:
- Campo de búsqueda prominente: "Buscar por nombre, # confirmación..."
- Resultado: card con datos de la reservación
  - Huésped, fechas, noches, tipo habitación, plan, estatus
  - Alertas: VIP ⭐, notas especiales ⚠, huésped frecuente 🔄

Paso 2 - Asignar habitación:
- Habitación sugerida automáticamente (highlight)
- Mini room rack filtrado al tipo de la reservación
- Indicadores: limpia ✓, preferencias del huésped ✓, upgrade disponible ↑
- Botón: "Aceptar sugerida" o seleccionar otra

Paso 3 - Registro:
- Datos del huésped pre-llenados (editable)
- Captura de ID (campo + botón de escaneo)
- Firma digital (canvas)
- Checkbox: términos y condiciones

Paso 4 - Plan y brazalete (si AI):
- Plan asignado mostrado claramente
- Selector de color de brazalete
- Info imprimible de beneficios incluidos
- Registro de acompañantes

Paso 5 - Confirmación:
- Resumen visual completo
- Botón grande: "Completar check-in ✓"
- Acciones post: imprimir tarjeta de registro, generar llave, enviar bienvenida WhatsApp

Estilo: Formulario amplio, campos grandes, mínimo scroll, acciones claras.
```

#### 6. Ficha de Grupo
```
Diseña la pantalla de detalle de un grupo en Hotelia.

Layout: Header + tabs de contenido

Header:
- Nombre del grupo: "Boda García-López"
- Badge de estatus: CONFIRMADO (verde)
- Tipo: Boda | 45 habitaciones | 12-15 Mar 2026
- Ejecutivo: Ana Martínez | Coordinador: Roberto López
- Progress bar de pick-up: 38/45 habitaciones (84%)
- KPIs: Ingreso estimado $890,000 | Depósitos recibidos $445,000 (50%)

Tabs:
1. Resumen - KPIs, timeline, alertas
2. Bloqueo - Tabla: tipo de hab × fechas × bloqueado × picked × disponible
3. Rooming List - Tabla editable con huéspedes, habitaciones, plan
4. Depósitos - Calendario de pagos, estatus, registrar pago
5. Eventos - Eventos vinculados al grupo (boda, cena, cóctel)
6. Folio Maestro - Saldo, cargos, pagos, routing
7. Documentos - Contrato, cotizaciones, BEOs
8. Actividad - Timeline de interacciones y cambios

Estilo: Información densa pero bien organizada por tabs. Header siempre visible con KPIs clave.
```

#### 7. Calendario de Salones
```
Diseña el calendario de disponibilidad de salones para eventos.

Layout:
- Toolbar: navegación de fecha, vista (día/semana/mes), filtros (capacidad, configuración)
- Grid: filas = salones, columnas = horas del día (vista diaria) o días (vista semanal/mensual)

Vista diaria:
- Filas: Salón Diamante (500 pax) | Salón Perla (200 pax) | Terraza Mar (150 pax) | Sala VIP (30 pax)
- Bloques de eventos sobre timeline horario
  - Color: 🟢 Confirmado, 🟡 Tentativo, ⬜ Disponible
  - Texto en bloque: nombre del evento, # asistentes, tipo
  - Zonas de montaje/desmontaje en color más claro

Vista mensual:
- Celdas con indicadores de ocupación
- Click en celda disponible: crear evento

Interacciones:
- Click en evento: side panel con detalle
- Drag para crear nuevo evento en espacio disponible
- Hover: tooltip con detalle completo

Estilo: Timeline limpio, colores suaves, buena diferenciación de estados.
```
