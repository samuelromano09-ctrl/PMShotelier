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
