# E. Diseño UX/UI

---

## Filosofía de diseño

```
"El mejor PMS es el que desaparece — el usuario piensa en su tarea,
 no en el software."
```

### Principios fundamentales

1. **Densidad informativa sin saturación** — mostrar lo que importa, ocultar lo que no, revelar bajo demanda
2. **Velocidad percibida** — respuesta < 100ms para acciones locales, < 500ms para queries, < 2s para reportes pesados
3. **Consistencia radical** — mismos patrones de interacción en todos los módulos
4. **Contextualidad** — la interfaz se adapta al rol, al módulo y a la tarea actual
5. **Progresividad** — funciones avanzadas accesibles pero no estorbando al uso básico

---

## Estructura de navegación

### Layout principal

```
┌──────────────────────────────────────────────────────────────────┐
│  TOPBAR                                                          │
│  [≡ Módulo ▾] [🔍 Búsqueda global...        ] [🔔] [👤] [⚙️]  │
├──────┬───────────────────────────────────────────────────────────┤
│      │                                                           │
│ SIDE │              ÁREA PRINCIPAL                               │
│ BAR  │                                                           │
│      │  ┌─────────────────────────────────────────────────┐     │
│ ───  │  │  TOOLBAR CONTEXTUAL                              │     │
│ 🏨   │  │  [Acción 1] [Acción 2] [Filtros] [Vista ▾]     │     │
│ 📅   │  ├─────────────────────────────────────────────────┤     │
│ 🛒   │  │                                                 │     │
│ 👥   │  │         CONTENIDO DINÁMICO                      │     │
│ 💰   │  │                                                 │     │
│ 📊   │  │   (tablas, calendarios, formularios,            │     │
│ 🏗️   │  │    dashboards, room rack, etc.)                 │     │
│ 📦   │  │                                                 │     │
│ ⚙️   │  │                                                 │     │
│      │  └─────────────────────────────────────────────────┘     │
│      │                                                           │
│      │  ┌─────────────────────────────────────────────────┐     │
│      │  │  PANEL LATERAL (contextual, colapsable)          │     │
│      │  │  Detalle de reserva, folio, huésped, etc.       │     │
│      │  └─────────────────────────────────────────────────┘     │
└──────┴───────────────────────────────────────────────────────────┘
```

### Sidebar de navegación

Sidebar colapsable con iconos + texto. Al colapsar, solo iconos. Organizada por módulo:

| Icono | Módulo | Submenús principales |
|-------|--------|---------------------|
| 🏨 | **PMS** | Dashboard, Reservaciones, Room Rack, Calendar, Huéspedes, Folios, Check-in/out |
| 📅 | **Reservaciones** | Nueva reserva, Disponibilidad, Lista de llegadas, Lista de salidas, In-house |
| 🛒 | **POS** | Outlets, Caja, Cortes, Menús, Precios |
| 🍹 | **All Inclusive** | Planes, Reglas, Brazaletes, Consumos, Reportes |
| 👥 | **Grupos & Eventos** | Grupos, Eventos, Salones, Cotizaciones, BEOs |
| 💼 | **CRM & Ventas** | Cuentas, Pipeline, Cotizaciones, Contratos, Producción |
| 📊 | **Revenue** | Calendar tarifario, Forecast, KPIs, Restricciones |
| 💰 | **Finanzas** | Contabilidad, CxC, CxP, Facturación, Bancos, Auditoría |
| 🏗️ | **Operación** | Housekeeping, Mantenimiento, Inventarios, Compras |
| 📈 | **BI** | Dashboards, Reportes, Comparativos, Exportación |
| ⚙️ | **Admin** | Habitaciones, Tarifas, Usuarios, Permisos, Configuración |

### Búsqueda global (Cmd/Ctrl + K)

Command palette estilo Spotlight/VS Code:
- Buscar por: nombre de huésped, # de reserva, # de habitación, nombre de grupo, nombre de empresa, # de folio
- Acciones rápidas: "Nueva reserva", "Check-in 301", "Corte de caja restaurante"
- Navegación: "Ir a Revenue", "Ir a Housekeeping"
- Resultados agrupados por tipo con preview

---

## Dashboards

### Dashboard de Director General

```
┌────────────────────────────────────────────────────────────────┐
│  HOY: Martes 11 Mar 2026          Hotel Playa Diamante        │
├───────────┬───────────┬───────────┬───────────┬───────────────┤
│  OCUP.    │   ADR     │  RevPAR   │ TRevPAR   │  INGRESOS    │
│  87.3%    │  $2,450   │  $2,139   │  $3,891   │  $1,556,400  │
│  ▲ +3.2%  │  ▲ +5.1%  │  ▲ +8.4%  │  ▲ +4.7%  │  ▲ +7.2%    │
│  vs ayer  │  vs ayer  │  vs ayer  │  vs ayer  │  vs ayer     │
├───────────┴───────────┴───────────┴───────────┴───────────────┤
│                                                                │
│  ┌─ OCUPACIÓN 30 DÍAS ──────────────────────────────────┐     │
│  │  [Gráfica de barras con línea de tendencia]           │     │
│  │  Incluye: real, forecast, presupuesto, año anterior   │     │
│  └───────────────────────────────────────────────────────┘     │
│                                                                │
│  ┌─ INGRESOS POR DEPTO ──┐  ┌─ ALERTAS ────────────────┐     │
│  │  Hospedaje    $890,200 │  │  ⚠ 3 grupos sin depósito │     │
│  │  A&B          $412,300 │  │  ⚠ Overbooking sáb +4    │     │
│  │  Eventos      $156,800 │  │  ⚠ 12 CxC vencidas       │     │
│  │  Spa           $54,200 │  │  ✓ Auditoría nocturna OK  │     │
│  │  Boutique      $28,400 │  │  ⚠ Inventario bajo: 5    │     │
│  │  Otros         $14,500 │  │                           │     │
│  └────────────────────────┘  └───────────────────────────┘     │
│                                                                │
│  ┌─ MOVIMIENTO DE HOY ───────────────────────────────────┐     │
│  │  Llegadas: 47  │  Salidas: 52  │  In-house: 349      │     │
│  │  Walk-ins: 3   │  No shows: 1  │  Grupos activos: 4  │     │
│  └───────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────┘
```

### Dashboard de Recepción

```
┌────────────────────────────────────────────────────────────────┐
│  RECEPCIÓN - Martes 11 Mar 2026                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌─ ACCIONES RÁPIDAS ────────────────────────────────────┐    │
│  │  [+ Check-in]  [+ Walk-in]  [+ Reserva]  [Check-out] │    │
│  └───────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─ LLEGADAS PENDIENTES (47) ────────────────────────────┐    │
│  │  Hora   Huésped          Tipo       Hab   Plan  Est.  │    │
│  │  14:00  García, María    JR Suite   ---   AI    ●     │    │
│  │  14:00  Smith, John      Std VM     305   EP    ✓     │    │
│  │  14:30  Grupo Bodas Luna (12 habs)        AI    ◐     │    │
│  │  15:00  Corp. Bimbo (8 habs)              EP    ●     │    │
│  │  ...                                                   │    │
│  │  ● = pendiente  ◐ = parcial  ✓ = asignado            │    │
│  └───────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─ SALIDAS HOY (52) ──────┐  ┌─ ALERTAS ──────────────┐    │
│  │  Pendientes: 18          │  │  🌟 VIP: Suite 801     │    │
│  │  Express: 12             │  │  ⚠ Late CO: 3 habs    │    │
│  │  Completadas: 22         │  │  📋 Nota: Hab 512     │    │
│  └──────────────────────────┘  └─────────────────────────┘    │
│                                                                │
│  ┌─ ROOM RACK QUICK VIEW ────────────────────────────────┐    │
│  │  Total: 412  │  Ocupadas: 360  │  Disponibles: 38    │    │
│  │  Sucias: 52  │  Limpias: 347   │  Mant: 5  │ OOO: 9 │    │
│  └───────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────┘
```

---

## Vistas principales

### Calendar View de Disponibilidad

El componente estrella del sistema. Diseñado para ser el mejor calendario de disponibilidad del mercado.

```
┌────────────────────────────────────────────────────────────────┐
│  DISPONIBILIDAD                                                │
│  [◀ Mar 2026 ▶]  [Día│Semana│Mes]  [Filtros ▾]  [Exportar]   │
├────────────────────────────────────────────────────────────────┤
│               │ L 9 │ M 10│ X 11│ J 12│ V 13│ S 14│ D 15│    │
│  Ocupación %  │ 72% │ 78% │ 87% │ 91% │ 95% │ 98% │ 82% │    │
├───────────────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤    │
│  STD Vista Jar│  8  │  5  │  3  │  1  │  0  │  0  │  4  │    │
│  (40 total)   │ 🟢  │ 🟢  │ 🟡  │ 🔴  │ ⬛  │ ⬛  │ 🟢  │    │
├───────────────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤    │
│  STD Vista Mar│  12 │  9  │  6  │  4  │  2  │  0  │  7  │    │
│  (60 total)   │ 🟢  │ 🟢  │ 🟡  │ 🟡  │ 🔴  │ ⬛  │ 🟢  │    │
├───────────────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤    │
│  JR Suite     │  6  │  4  │  2  │  1  │  0  │  0  │  3  │    │
│  (30 total)   │ 🟢  │ 🟢  │ 🟡  │ 🔴  │ ⬛  │ ⬛  │ 🟡  │    │
├───────────────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤    │
│  Suite Master │  3  │  3  │  2  │  2  │  1  │  0  │  2  │    │
│  (15 total)   │ 🟢  │ 🟢  │ 🟢  │ 🟢  │ 🟡  │ ⬛  │ 🟢  │    │
├───────────────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤    │
│  Presidential │  1  │  1  │  0  │  0  │  0  │  1  │  1  │    │
│  (2 total)    │ 🟢  │ 🟢  │ ⬛  │ ⬛  │ ⬛  │ 🟢  │ 🟢  │    │
├───────────────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┤    │
│  🟢 = >20% disp  🟡 = 5-20% disp  🔴 = <5%  ⬛ = SOLD OUT  │
│  Click en celda para ver desglose: transient/grupo/allotment  │
│  Drag para seleccionar rango y crear reservación              │
└────────────────────────────────────────────────────────────────┘
```

**Características del Calendar View:**
- Scroll horizontal infinito (lazy loading)
- Hover sobre celda muestra tooltip con desglose
- Click abre detalle: disponibilidad real, bloqueada, allotments, grupos
- Filtros: por tipo, por canal, por plan, por edificio
- Vista expandida: ver cada habitación individual como fila
- Indicadores: grupos (banda de color), bloqueos (patrón), mantenimiento (icono)
- Drag and drop: seleccionar rango de fechas + tipo → crear reservación
- Exportar a Excel con un clic

### Room Rack

```
┌────────────────────────────────────────────────────────────────┐
│  ROOM RACK    [Hoy: 11 Mar]  [Filtros ▾]  [Leyenda ▾]        │
├────────────────────────────────────────────────────────────────┤
│         │ L 9  │ M 10 │ X 11 │ J 12 │ V 13 │ S 14 │ D 15 │  │
├─────────┤      │      │      │      │      │      │      │  │
│ PISO 3  │      │      │      │      │      │      │      │  │
│ 301 STD │██████████████│      │      │      │      │      │  │
│         │ García, M.   │      │      │      │      │      │  │
│ 302 STD │      │████████████████████████████│      │      │  │
│         │      │ Smith, J. - AI             │      │      │  │
│ 303 STD │      │      │▓▓▓▓▓▓│      │      │      │      │  │
│         │      │      │MANT  │      │      │      │      │  │
│ 304 JRS │████████████████████████████████████████████████████│ │
│         │ Grupo Bodas Luna - AI                              │ │
│ 305 JRS │      │██████████████│      │░░░░░░░░░░░░░░│      │  │
│         │      │ Corp Bimbo   │      │ Tentativa     │      │  │
│ 306 STE │      │      │      │████████████████████████│      │ │
│         │      │      │      │ Wedding VIP - AI       │      │ │
├─────────┤      │      │      │      │      │      │      │  │
│ PISO 4  │      │      │      │      │      │      │      │  │
│ ...     │      │      │      │      │      │      │      │  │
├─────────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┤  │
│  ██ Ocupada  ░░ Tentativa  ▓▓ Mantenimiento  ── Disponible│  │
│  🔵 EP  🟠 AI  🟣 Grupo  🟤 Corporativo                   │  │
│  Drag reserva para mover │ Drag borde para extender       │  │
└────────────────────────────────────────────────────────────────┘
```

---

## Formularios

### Principios de formularios

1. **Wizard para procesos complejos** (crear grupo, evento, tipo de habitación) — pasos claros con progreso
2. **Inline editing para cambios rápidos** (modificar tarifa, cambiar estatus)
3. **Modales para acciones simples** (agregar nota, autorizar descuento)
4. **Side panels para detalle** (ver folio, ver perfil de huésped)
5. **Autocompletado agresivo** — nombres, empresas, productos, habitaciones
6. **Validación en tiempo real** — no esperar al submit para mostrar errores
7. **Defaults inteligentes** — pre-llenar con valores más probables
8. **Confirmación solo para acciones destructivas** — no para guardar

### Ejemplo: Formulario de nueva reservación

```
┌────────────────────────────────────────────────────────────────┐
│  NUEVA RESERVACIÓN                                    [✕]      │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌─ FECHAS Y HABITACIÓN ─────────────────────────────────┐    │
│  │                                                        │    │
│  │  Check-in          Check-out         Noches            │    │
│  │  [📅 11 Mar 2026]  [📅 14 Mar 2026]  3               │    │
│  │                                                        │    │
│  │  Tipo habitación        Habitaciones    Adultos  Niños │    │
│  │  [Junior Suite ▾]       [1        ]     [2  ]   [1  ] │    │
│  │                                                        │    │
│  │  Plan              Tarifa                               │    │
│  │  [All Inclusive ▾]  $3,200 MXN / noche                 │    │
│  │                     Total: $9,600 MXN + impuestos      │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─ HUÉSPED ─────────────────────────────────────────────┐    │
│  │  Buscar: [García________________________] 🔍           │    │
│  │                                                        │    │
│  │  ✓ María García Hernández                              │    │
│  │    maria.garcia@email.com │ +52 55 1234 5678          │    │
│  │    🌟 Huésped frecuente │ 3 estancias previas         │    │
│  │    Preferencias: piso alto, king bed, vista mar        │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─ DETALLES ────────────────────────────────────────────┐    │
│  │  Canal [Directo ▾]  Segmento [Leisure ▾]              │    │
│  │  Solicitudes especiales: [________________________]    │    │
│  │  Notas internas: [________________________________]    │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                │
│  ┌─ GARANTÍA ────────────────────────────────────────────┐    │
│  │  [● Tarjeta de crédito] [○ Depósito] [○ Empresa]     │    │
│  │  Tarjeta: **** **** **** 4532  Exp: 08/27             │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                │
│         [Cancelar]                    [Confirmar reserva ✓]    │
└────────────────────────────────────────────────────────────────┘
```

---

## Paleta de colores

### Light mode (default)

| Elemento | Color | Uso |
|----------|-------|-----|
| Background principal | `#FAFBFC` | Fondo general |
| Background cards | `#FFFFFF` | Tarjetas, modales, paneles |
| Texto principal | `#1A1D21` | Títulos, contenido principal |
| Texto secundario | `#6B7280` | Labels, subtítulos |
| Primary / Accent | `#2563EB` | Botones primarios, links, selección |
| Success | `#059669` | Confirmado, limpia, aprobado, disponible |
| Warning | `#D97706` | Tentativo, alerta, pendiente |
| Danger | `#DC2626` | Error, cancelado, vencido, sold out |
| Info | `#7C3AED` | Informativo, grupo, evento |
| Border | `#E5E7EB` | Bordes, separadores |
| Hover | `#F3F4F6` | Estado hover en filas y elementos |

### Dark mode

Misma estructura pero con backgrounds oscuros (`#0F1117`, `#1A1D27`) y textos claros. Primary se mantiene con ajuste de luminosidad.

### Colores semánticos en Room Rack / Calendar

| Estado | Color | Código |
|--------|-------|--------|
| Disponible | Blanco / Vacío | — |
| Ocupada (EP) | Azul | `#3B82F6` |
| Ocupada (AI) | Naranja | `#F59E0B` |
| Ocupada (Grupo) | Púrpura | `#8B5CF6` |
| Ocupada (Corporativo) | Café/Marrón | `#92400E` |
| Tentativa | Patrón rayado | — |
| Bloqueada | Gris | `#6B7280` |
| Mantenimiento | Rojo suave | `#FCA5A5` |
| Check-in hoy | Borde verde | `#059669` |
| Check-out hoy | Borde naranja | `#D97706` |
| VIP | Estrella dorada | `#EAB308` |

---

## Tipografía

- **Font principal:** Inter (sans-serif, excelente legibilidad en pantalla)
- **Font monospace:** JetBrains Mono (números, códigos, importes)
- **Tamaños:**
  - Título de página: 24px / bold
  - Subtítulo: 18px / semibold
  - Contenido: 14px / regular
  - Labels: 12px / medium, uppercase, tracking wide
  - Datos numéricos grandes (KPIs): 32px / bold, monospace

---

## Atajos de teclado

| Atajo | Acción |
|-------|--------|
| `Cmd/Ctrl + K` | Búsqueda global |
| `Cmd/Ctrl + N` | Nueva reservación |
| `Cmd/Ctrl + I` | Check-in rápido |
| `Cmd/Ctrl + O` | Check-out rápido |
| `Cmd/Ctrl + F` | Buscar en vista actual |
| `Cmd/Ctrl + .` | Panel de acciones rápidas |
| `Esc` | Cerrar modal / panel |
| `Tab` | Siguiente campo |
| `Enter` | Confirmar / Guardar |
| `← →` | Navegar calendario día a día |
| `Shift + ← →` | Navegar calendario semana a semana |

---

## Responsive design

| Dispositivo | Módulos optimizados | Uso principal |
|-------------|--------------------|----|
| **Desktop** (1440px+) | Todos los módulos completos | Recepción, reservaciones, finanzas, revenue, admin |
| **Tablet** (768-1439px) | PMS, POS, Housekeeping, Mantenimiento | Supervisoras, meseros (tablets en outlet), recepción auxiliar |
| **Móvil** (< 768px) | Housekeeping, Mantenimiento, Aprobaciones | Camaristas, técnicos de mantenimiento, gerentes en movimiento |

### Diseño mobile-first para:
- App de housekeeping (camaristas): checklist de habitación, reporte de desperfectos, objetos olvidados
- App de mantenimiento: tickets asignados, checklist preventivo, fotos
- App de gerencia: KPIs, alertas, aprobaciones

---

## Interacciones clave

### Drag and Drop
- Mover reservación entre habitaciones en room rack
- Extender/acortar estancia arrastrando borde de reservación
- Reordenar fotografías de habitación
- Mover oportunidades entre etapas en pipeline CRM (Kanban)
- Mover archivos en documentos de grupo/evento

### Tooltips informativos
- Hover sobre reservación: nombre, fechas, plan, estatus, saldo
- Hover sobre celda de disponibilidad: desglose transient/grupo/allotment
- Hover sobre KPI: explicación y fórmula
- Hover sobre icono de alerta: detalle del problema

### Transiciones
- Slide-in para paneles laterales (detalle de reserva, folio, huésped)
- Fade para modales
- Smooth scroll para calendarios
- Skeleton loading para contenido que tarda > 200ms
- Optimistic UI: la acción se refleja inmediato, se revierte si falla

---

## Notificaciones

### In-app
- Badge rojo en icono de campana para notificaciones no leídas
- Panel desplegable con lista de notificaciones agrupadas por tipo
- Click en notificación navega al contexto relevante
- Marcar como leída individual o masivamente

### Push (para roles que lo necesiten)
- Alertas de sobreventa → Revenue Manager
- Depósito vencido → Ventas
- Ticket de mantenimiento urgente → Jefe de mantenimiento
- Check-out con saldo → Recepción
- Aprobación requerida → Autorizador correspondiente

### Sonido
- Alerta suave para nuevas reservaciones
- Sin sonido por defecto (configurable por usuario)

---

## Especificación de componentes clave

### 1. Command Palette (Cmd+K)

```
┌────────────────────────────────────────────────────┐
│  🔍 Buscar huéspedes, reservas, habitaciones...    │
│                                                     │
│  RECIENTES                                          │
│  ├── 🏨 García, María — Hab 304 — AI Premium      │
│  ├── 📋 Reserva HPDA-2026-00421                   │
│  └── 👥 Grupo Boda Luna                            │
│                                                     │
│  ACCIONES RÁPIDAS                                   │
│  ├── ➕ Nueva reservación                           │
│  ├── 🔑 Check-in rápido                            │
│  ├── 💳 Check-out rápido                            │
│  └── 📊 Dashboard de revenue                       │
│                                                     │
│  NAVEGACIÓN                                         │
│  ├── Ir a Reservaciones                             │
│  ├── Ir a Room Rack                                 │
│  └── Ir a Housekeeping                              │
└────────────────────────────────────────────────────┘
```

**Comportamiento:**
- Abre con `Cmd/Ctrl + K` desde cualquier pantalla
- Búsqueda fuzzy (tolera errores de escritura)
- Resultados agrupados por tipo (huéspedes, reservas, habitaciones, grupos, cuentas)
- Los 3 items más recientes aparecen antes de escribir
- Enter en resultado navega directo; Esc cierra
- Debounce de 150ms en búsqueda
- Máximo 10 resultados visibles con scroll

### 2. Formularios — Estados y validación

**Campos de texto:**
```
ESTADO NORMAL:
┌─ Label ──────────────────────────┐
│  Placeholder text                 │
└───────────────────────────────────┘

ESTADO FOCUS:
┌─ Label ──────────────────────────┐  ← Borde azul primary
│  Texto ingresado|                 │
└───────────────────────────────────┘

ESTADO ERROR:
┌─ Label ──────────────────────────┐  ← Borde rojo
│  Texto inválido                   │
└───────────────────────────────────┘
  ⚠ El RFC ingresado no es válido     ← Mensaje de error en rojo

ESTADO DISABLED:
┌─ Label ──────────────────────────┐  ← Fondo gris claro
│  Valor readonly                   │
└───────────────────────────────────┘

ESTADO LOADING:
┌─ Label ──────────────────────────┐
│  Buscando...  ◌                   │  ← Spinner inline
└───────────────────────────────────┘
```

**Principios de validación:**
- Validación en tiempo real (al perder focus o después de 500ms de inactividad)
- Nunca esperar al submit para mostrar errores
- Mensaje de error específico y accionable ("El RFC debe tener 12 o 13 caracteres", no "Campo inválido")
- Indicador visual claro: borde rojo + icono + texto de error
- Campos requeridos marcados con asterisco (*)
- Validación de formato con máscara (teléfono, RFC, email)

### 3. Tablas de datos — Patrones de interacción

```
┌──────────────────────────────────────────────────────────────────┐
│  RESERVACIONES     [🔍 Buscar...]  [Filtros ▾]  [+ Nueva]       │
├──────────────────────────────────────────────────────────────────┤
│  □  Confirmación ▼  │ Huésped        │ Fechas        │ Estado   │
│  ─────────────────────────────────────────────────────────────── │
│  □  HPDA-2026-421  │ García, María  │ 11-14 Mar     │ ● Conf.  │
│  □  HPDA-2026-422  │ Smith, John    │ 12-15 Mar     │ ● CI     │
│  □  HPDA-2026-423  │ López, Carlos  │ 11-13 Mar     │ ○ Tent.  │
│  □  HPDA-2026-424  │ Grupo Luna     │ 14-17 Mar     │ ● Conf.  │
├──────────────────────────────────────────────────────────────────┤
│  Mostrando 1-50 de 234  │  ◀ 1 2 3 4 5 ▶  │  50 por página ▾  │
└──────────────────────────────────────────────────────────────────┘
```

**Interacciones:**
- Click en fila → abre detalle en side panel (no navega fuera)
- Doble click → navega a vista completa
- Checkbox para selección múltiple → acciones masivas (cambiar estatus, exportar)
- Click en header de columna → sort (asc/desc/none)
- Resize de columnas arrastrando borde
- Columnas configurables (mostrar/ocultar)
- Filtros persistentes por usuario
- Exportar selección o todo a Excel/CSV
- Virtualización para listas de 1,000+ filas sin degradación

### 4. Side Panel — Detalle contextual

```
┌─ RESERVACIÓN HPDA-2026-00421 ────────── [✕] ──┐
│                                                  │
│  ● Confirmada                                    │
│                                                  │
│  HUÉSPED                                         │
│  María García Hernández                          │
│  🌟 VIP │ 3 estancias previas                   │
│  📧 maria@email.com │ 📞 +52 55 1234            │
│                                                  │
│  ESTANCIA                                        │
│  📅 11 Mar → 14 Mar (3 noches)                  │
│  🏨 Junior Suite Vista Mar │ Hab 304             │
│  🍽️ All Inclusive Premium                        │
│  💰 $3,200/noche │ Total: $9,600                 │
│                                                  │
│  FOLIO                                           │
│  Cargos: $12,450 │ Pagos: $5,000                │
│  Saldo: $7,450                                   │
│                                                  │
│  NOTAS                                           │
│  ⚠ Alergia a mariscos                           │
│  ⚠ Prefiere piso alto                           │
│                                                  │
│  ┌────────────────────────────────────────┐      │
│  │ [Check-in] [Editar] [Folio] [Cancelar]│      │
│  └────────────────────────────────────────┘      │
└──────────────────────────────────────────────────┘
```

**Comportamiento:**
- Se abre deslizando desde la derecha (slide-in 300ms, ease-out)
- Ancho: 480px en desktop, full-width en mobile
- No bloquea el contenido principal (no es modal)
- Se puede tener abierto mientras se navega la tabla
- Botones de acción contextual en la parte inferior
- Scroll independiente del contenido principal

### 5. Modal vs Drawer vs Side Panel — Criterios

| Componente | Cuándo usar | Ejemplo |
|-----------|-------------|---------|
| **Modal** | Acciones que requieren atención completa y confirmación | Autorizar descuento, confirmar cancelación, procesar pago |
| **Drawer** | Formularios de creación/edición que necesitan más espacio | Nueva reservación, crear grupo, editar tipo de habitación |
| **Side Panel** | Ver detalle sin perder contexto de la vista actual | Ver folio, ver perfil de huésped, ver detalle de reservación |
| **Inline** | Ediciones rápidas de un solo campo | Cambiar estatus, editar nota, ajustar tarifa |
| **Toast** | Confirmaciones y errores no bloqueantes | "Reservación creada", "Error al guardar" |

---

## Micro-interacciones y animaciones

### Timing

| Interacción | Duración | Easing | Propósito |
|-------------|----------|--------|-----------|
| Hover en botón/fila | 100ms | ease-in | Feedback inmediato |
| Abrir side panel | 300ms | ease-out | Sensación de deslizamiento |
| Cerrar side panel | 200ms | ease-in | Cierre rápido |
| Abrir modal | 200ms | ease-out | Aparición suave |
| Toast notification | 300ms entrada, 5s visible, 200ms salida | ease-out | No intrusivo |
| Skeleton loading | Pulse de 1.5s loop | linear | Indicar carga sin ansiedad |
| Drag & drop | Real-time (0ms) | — | Feedback directo |
| Transición de página | 150ms | ease-in-out | Navegación fluida |
| Expandir/colapsar sección | 200ms | ease-out | Revelar contenido |

### Optimistic UI

Para acciones frecuentes, el UI se actualiza instantáneamente antes de recibir confirmación del servidor:

- Cambiar estatus de habitación → se refleja inmediato, se revierte si falla
- Mover reservación en room rack → se mueve inmediato, se revierte si hay conflicto
- Marcar notificación como leída → desaparece inmediato
- Agregar cargo a folio → aparece inmediato en la lista

Si la operación falla, se revierte con un toast de error explicativo.

### Loading states

```
SKELETON (para contenido estructural):
┌─────────────────────────────────────┐
│  ████████████  │  ████████          │  ← Pulso gris animado
│  ████████      │  ██████████████    │
│  ██████████    │  ████████          │
└─────────────────────────────────────┘

SPINNER (para acciones puntuales):
Usado solo en botones después de click: [Guardando... ◌]

PROGRESS BAR (para procesos largos):
Auditoría nocturna: [████████████░░░░░░░░] 67% — Procesando folios...
```

---

## Accesibilidad (WCAG 2.1 AA)

### Requisitos mínimos

| Criterio | Implementación |
|----------|----------------|
| **Contraste** | Ratio mínimo 4.5:1 para texto normal, 3:1 para texto grande y componentes UI |
| **Navegación por teclado** | Todo operable sin mouse: Tab para navegar, Enter para activar, Esc para cerrar, Arrow keys para navegar listas |
| **Focus visible** | Indicador de focus claro (outline azul 2px) en todos los elementos interactivos |
| **Screen readers** | Todos los elementos con aria-labels apropiados, landmarks (main, nav, aside), live regions para actualizaciones |
| **Texto escalable** | UI funcional hasta 200% de zoom sin pérdida de contenido |
| **Error identification** | Errores identificados por texto + color + icono (no solo color) |
| **Timing** | No hay time-outs que expulsen al usuario sin advertencia; toasts se pueden pausar con hover |
| **Motion** | Respetar `prefers-reduced-motion`: desactivar animaciones excepto las esenciales |
| **Touch targets** | Mínimo 44x44px para todos los elementos tocables (mobile/tablet) |

### Atajos de accesibilidad

- `Alt + 1-9`: Navegar directamente a módulos del sidebar
- `Alt + S`: Ir a búsqueda global
- `Alt + N`: Nueva entidad (según contexto)
- `?`: Mostrar panel de ayuda con atajos disponibles

---

## Apps móviles — Diseño específico

### App de Housekeeping (PWA / React Native)

```
┌──────────────────────────────┐
│  ☰  HOUSEKEEPING    🔔 3     │
│  María López — Turno AM      │
├──────────────────────────────┤
│                               │
│  HOY: 14 habitaciones         │
│  ████████████░░░░ 10/14      │
│                               │
│  🔴 PRIORIDAD ALTA            │
│  ┌────────────────────────┐  │
│  │ 304 JR Suite — CHECK-IN│  │
│  │ VIP │ Llega 14:00      │  │
│  │ [Iniciar limpieza →]   │  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ 512 Deluxe — CHECK-IN  │  │
│  │ Early CI │ Llega 12:00 │  │
│  │ [Iniciar limpieza →]   │  │
│  └────────────────────────┘  │
│                               │
│  🟡 SALIDAS                   │
│  ┌────────────────────────┐  │
│  │ 201 Standard — SALIDA  │  │
│  │ Check-out 11:45        │  │
│  │ [Iniciar limpieza →]   │  │
│  └────────────────────────┘  │
│  ...                          │
│                               │
├──────────────────────────────┤
│  🏠 Lista  │  📊 Mi día  │ ⚙️ │
└──────────────────────────────┘
```

**Principios mobile:**
- Botones grandes (mínimo 48px)
- Una acción principal por pantalla
- Gestos: swipe para cambiar estatus, pull-to-refresh
- Funciona offline: cola de acciones que sincroniza al reconectar
- Notificaciones push para nuevas asignaciones o prioridades
- Cámara integrada para reportes de mantenimiento y lost & found

### App de Mantenimiento (PWA / React Native)

```
┌──────────────────────────────┐
│  ☰  MANTENIMIENTO   🔔 2     │
│  Jorge Méndez — Turno AM     │
├──────────────────────────────┤
│                               │
│  MIS TICKETS: 5 pendientes    │
│                               │
│  🔴 URGENTE                   │
│  ┌────────────────────────┐  │
│  │ #MT-0892               │  │
│  │ Hab 304 — A/C no enfría│  │
│  │ VIP — Check-in 14:00   │  │
│  │ Reportado hace 45 min  │  │
│  │ [Tomar ticket →]       │  │
│  └────────────────────────┘  │
│                               │
│  🟠 ALTA                      │
│  ┌────────────────────────┐  │
│  │ #MT-0891               │  │
│  │ Hab 201 — Fuga en baño │  │
│  │ Reportado hace 2h      │  │
│  │ [En progreso ◌]        │  │
│  └────────────────────────┘  │
│  ...                          │
│                               │
├──────────────────────────────┤
│  📋 Tickets │ 🔧 Preventivo │ ⚙️│
└──────────────────────────────┘
```

### App de Gerencia (PWA)

- Dashboard ejecutivo con KPIs del día
- Alertas que requieren aprobación
- Aprobar/rechazar solicitudes (descuentos, upgrades, compras)
- Vista rápida de ocupación y revenue
- Notificaciones push para alertas críticas
- Funciona como complemento del desktop, no como reemplazo

---

## Design tokens (variables de diseño)

```css
/* Espaciado */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;

/* Border radius */
--radius-sm: 4px;    /* Badges, tags */
--radius-md: 6px;    /* Inputs, botones */
--radius-lg: 8px;    /* Cards, modales */
--radius-xl: 12px;   /* Panels grandes */
--radius-full: 999px; /* Avatares, pills */

/* Sombras */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);       /* Cards en reposo */
--shadow-md: 0 4px 6px rgba(0,0,0,0.07);       /* Cards hover, dropdowns */
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);      /* Modales, panels flotantes */
--shadow-xl: 0 20px 25px rgba(0,0,0,0.15);     /* Popovers principales */

/* Breakpoints */
--bp-mobile: 640px;
--bp-tablet: 768px;
--bp-laptop: 1024px;
--bp-desktop: 1280px;
--bp-wide: 1536px;

/* Z-index scale */
--z-base: 0;
--z-dropdown: 10;
--z-sticky: 20;
--z-overlay: 30;
--z-modal: 40;
--z-popover: 50;
--z-toast: 60;
--z-command-palette: 70;
```

---

## Print layouts

Para reportes y documentos que necesitan impresión o PDF:

- **Folio de huésped:** Formato carta, logo del hotel, desglose de cargos y pagos, saldo
- **Factura CFDI:** Formato estándar SAT con QR de timbrado
- **BEO:** Formato profesional con logo, detalle del evento, menú, equipo, timeline
- **Cotización:** Formato elegante con branding del hotel, desglose de servicios
- **Contrato:** Formato legal con campos de firma
- **Reporte de auditoría:** Formato tabular compacto para impresión
- **Tarjeta de registro:** Formato media carta con datos del huésped y firma

Todos generados como PDF vía Puppeteer/React-PDF con la misma paleta tipográfica del sistema.
