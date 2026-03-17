# 02 — Mapa Completo de Módulos

## Arquitectura modular de Hotelia

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          HOTELIA PLATFORM                                   │
│                                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   PMS CORE   │  │  CRS/CHANNEL │  │  POS HOTEL   │  │  ALL INCLUS. │   │
│  │              │◄─┤              │  │              │  │              │   │
│  │ Reservas     │  │ Disponibil.  │  │ Restaurantes │  │ Planes       │   │
│  │ Check-in/out │  │ Tarifas      │  │ Bares        │  │ Brazaletes   │   │
│  │ Folios       │  │ Canales      │  │ Room Service │  │ Reglas       │   │
│  │ Room Rack    │  │ Allotments   │  │ Boutique     │  │ Elegibilidad │   │
│  │ Housekeeping │  │ Restricciones│  │ Spa/Otros    │  │ Consumos     │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         │                 │                 │                 │             │
│         ├─────────────────┼─────────────────┼─────────────────┤             │
│         │           CORE DATA BUS (Event-Driven)              │             │
│         ├─────────────────┼─────────────────┼─────────────────┤             │
│         │                 │                 │                 │             │
│  ┌──────┴───────┐  ┌──────┴───────┐  ┌──────┴───────┐  ┌──────┴───────┐   │
│  │ GRUPOS/EVEN. │  │  COI / ERP   │  │   REVENUE    │  │  CRM/VENTAS  │   │
│  │              │  │              │  │              │  │              │   │
│  │ Grupos       │  │ Contabilidad │  │ Forecast     │  │ Cuentas      │   │
│  │ Eventos      │  │ CxC / CxP   │  │ Tarifas      │  │ Pipeline     │   │
│  │ Salones      │  │ Facturación  │  │ Segmentación │  │ Cotizaciones │   │
│  │ BEOs         │  │ Bancos       │  │ Pick-up      │  │ Contratos    │   │
│  │ Cotizaciones │  │ Auditoría    │  │ KPIs         │  │ Comisiones   │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         │                 │                 │                 │             │
│         ├─────────────────┼─────────────────┼─────────────────┤             │
│         │                 │                 │                 │             │
│  ┌──────┴───────┐  ┌──────┴───────┐  ┌──────┴───────┐  ┌──────┴───────┐   │
│  │ HOUSEKEEPING │  │ MANTENIMIEN. │  │ INVENTARIOS  │  │   BI/REPORT  │   │
│  │              │  │              │  │              │  │              │   │
│  │ Estatus      │  │ Tickets      │  │ Almacenes    │  │ Dashboards   │   │
│  │ Asignación   │  │ Preventivo   │  │ Compras      │  │ Reportes     │   │
│  │ Productivid. │  │ Correctivo   │  │ Recetas      │  │ Exportación  │   │
│  │ App Móvil    │  │ Activos      │  │ Costeo       │  │ Comparativos │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    CAPA TRANSVERSAL                                  │   │
│  │  Roles/Permisos │ Multi-Property │ Auditoría │ Notificaciones      │   │
│  │  API Gateway    │ Webhooks       │ Seguridad │ Búsqueda Global     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    INTEGRACIONES EXTERNAS                           │   │
│  │  Channel Mgr │ OTAs │ Booking Engine │ Cerraduras │ Pagos │ CFDI  │   │
│  │  Kioscos │ WhatsApp │ Email │ SMS │ Llaves Digitales │ BI Tools   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Módulos y sus conexiones

### 1. PMS Core

**Función:** Núcleo operativo — reservaciones, check-in/out, folios, room rack, huéspedes, habitaciones.

**Recibe de:**
- CRS: reservaciones de canales externos (OTAs, booking engine)
- CRM: reservaciones desde cotizaciones comerciales
- Grupos: bloqueos, rooming lists, folios maestros
- All Inclusive: plan asignado al huésped y reglas activas
- Housekeeping: estatus de limpieza de habitaciones
- Mantenimiento: habitaciones liberadas post-reparación

**Envía a:**
- POS: identificación de huésped para cargos a habitación, plan alimenticio activo
- COI/ERP: transacciones de hospedaje, cargos, pagos, depósitos → pólizas automáticas
- Housekeeping: estatus de habitación al check-out, prioridades de limpieza (VIP, early CI)
- Revenue: datos de ocupación, ADR, segmento, canal, pick-up
- BI: datos operativos para dashboards y reportes
- Notificaciones: alertas de check-in, VIP, notas especiales
- Cerraduras: generar/desactivar llaves al check-in/check-out

**Eventos que emite:**
```
reservation.created      → CRS (sync inventario), Revenue (forecast update)
reservation.modified     → CRS (sync inventario), Revenue, Grupos (si aplica)
reservation.cancelled    → CRS, Revenue, Finance (processar penalidad)
checkin.completed        → Housekeeping (marcar ocupada), POS (habilitar cargo hab),
                           Locks (generar llave), All-Inclusive (activar brazalete)
checkout.completed       → Housekeeping (marcar sucia), POS (deshabilitar cargo),
                           Locks (desactivar llave), Finance (cerrar/transferir folio)
folio.charge.posted      → Finance (póliza automática), BI (ingreso real-time)
folio.payment.received   → Finance (póliza), BI
noshow.processed         → Finance (cargo no-show), Revenue (liberar inventario)
room.status.changed      → Housekeeping, Revenue (inventario disponible)
room.outoforder          → Revenue (reducir inventario), Reservaciones (alertar)
```

---

### 2. CRS / Motor de Reservaciones / Channel Management Ready

**Función:** Gestión centralizada de disponibilidad, tarifas y canales de distribución.

**Recibe de:**
- PMS Core: inventario en tiempo real (reservaciones, cancellaciones, cambios)
- Revenue: restricciones (CTA, CTD, MinLOS, stop sell), tarifas dinámicas
- Grupos: allotments y bloqueos que reducen inventario vendible

**Envía a:**
- PMS Core: reservaciones confirmadas desde canales externos
- Channel Managers: disponibilidad y tarifas actualizadas (push cada evento o cada 30s)
- Booking Engine: inventario para venta directa web
- Revenue: producción por canal en tiempo real

**Eventos que emite:**
```
availability.updated     → Channel Managers (push ARI), Booking Engine
rate.published           → Channel Managers, Booking Engine
channel.reservation.received → PMS (crear reservación), Finance (registrar prepago OTA)
restriction.applied      → Channel Managers (sync restricciones)
allotment.released       → Revenue (inventario liberado disponible)
```

---

### 3. POS Hotelero

**Función:** Punto de venta para todos los centros de consumo del hotel.

**Recibe de:**
- PMS Core: datos de huésped y habitación para cargos, plan alimenticio activo
- All Inclusive: reglas de elegibilidad, validación de consumos
- Inventarios: productos, recetas, precios, existencias

**Envía a:**
- PMS Core: cargos a folio de habitación
- COI/ERP: ingresos por outlet, impuestos, propinas, descuentos → pólizas automáticas
- Inventarios: consumos para descontar existencias automáticamente
- All Inclusive: registro de consumos incluidos vs extras para trazabilidad
- BI: métricas de ventas por outlet, covers, ticket promedio
- Cocina/Bar: comandas para preparación

**Eventos que emite:**
```
pos.order.created        → Kitchen (comanda)
pos.order.closed         → Finance (póliza), Inventory (descuento stock)
pos.room_charge.posted   → PMS (cargo a folio), Finance (asiento)
pos.ai_consumption.logged → All-Inclusive (tracking), Finance (costo AI)
pos.cash_close.completed → Finance (póliza de cierre), BI (totales turno)
pos.void.executed        → Audit (registro), Inventory (reversa stock)
```

---

### 4. Operación All Inclusive

**Función:** Motor de reglas para planes alimenticios, elegibilidad y control de consumos.

**Recibe de:**
- PMS Core: plan del huésped, fechas, paquete, acompañantes, edad
- POS: solicitudes de validación de consumo en tiempo real
- Reservaciones: tipo de plan contratado por reservación

**Envía a:**
- POS: autorización/denegación/cargo extra por cada validación
- COI/ERP: diferenciación de ingresos incluidos vs extras
- BI: estadísticas de consumo all inclusive, costeo por huésped-noche
- Housekeeping: información de brazalete para identificación

**Eventos que emite:**
```
ai.plan.assigned         → POS (habilitar reglas), Finance (ingreso AI)
ai.wristband.activated   → POS (validación activa)
ai.consumption.validated → POS (resultado: incluido/premium/extra)
ai.limit.exceeded        → POS (cargo automático), Guest (notificación)
ai.plan.expired          → POS (desactivar), Finance (cierre plan)
```

**Motor de validación (flujo en cada consumo POS):**
```
Solicitud de consumo
    │
    ├── ¿Huésped tiene plan AI activo? ──No──→ Cargo normal a folio
    │
    ├── ¿Outlet incluido en plan? ──No──→ Cargo normal a folio
    │
    ├── ¿Horario dentro del plan? ──No──→ Cargo normal (fuera de horario)
    │
    ├── ¿Producto incluido en plan? ──No──→ Cargo como extra premium
    │
    ├── ¿Límite no excedido? ──No──→ Cargo extra (límite superado)
    │
    └── ✓ Consumo incluido → Registro para trazabilidad, sin cargo a folio
```

---

### 5. Grupos, Eventos y Salones

**Función:** Gestión comercial y operativa de grupos turísticos, bodas, convenciones, banquetes.

**Recibe de:**
- CRM: leads de grupos y eventos, cuentas comerciales
- PMS Core: disponibilidad de habitaciones para bloqueo
- Revenue: tarifas recomendadas, análisis de desplazamiento
- Finance: estatus de depósitos y pagos recibidos

**Envía a:**
- PMS Core: bloqueos de habitaciones, rooming lists, folios maestros y subfolios
- COI/ERP: depósitos, facturación por grupo/evento, ingresos diferidos
- POS: paquetes de A&B para eventos, comandas especiales
- Revenue: impacto de grupos en ocupación/ADR, displacement data
- CRM: estatus del grupo para seguimiento comercial
- BI: métricas de grupos y eventos

**Eventos que emite:**
```
group.created            → Revenue (forecast impact), PMS (bloquear inventario)
group.block.modified     → Revenue (recalcular), CRS (actualizar disponibilidad)
group.rooming_list.loaded → PMS (crear reservaciones), Housekeeping (preparar)
group.deposit.received   → Finance (póliza), CRM (actualizar estatus)
group.cutoff.reached     → Revenue (liberar), CRS (abrir inventario)
event.confirmed          → POS (preparar), Operations (coordinar), Finance (facturar)
event.beo.distributed    → Kitchen (menú), Service (montaje), AV (equipo)
venue.booking.confirmed  → Calendar (bloquear), Revenue (ingreso proyectado)
```

---

### 6. COI / ERP / Back Office

**Función:** Contabilidad, finanzas, facturación, CxC/CxP, conciliaciones.

**Recibe de:**
- PMS Core: transacciones de hospedaje (room & tax, cargos, pagos)
- POS: ventas de outlets (ingresos, impuestos, propinas, cargos a habitación)
- Grupos: depósitos, facturación de eventos, ingresos diferidos
- Inventarios: compras, costos, cuentas por pagar a proveedores
- Todos los módulos: cualquier movimiento financiero

**Envía a:**
- BI: estados financieros, métricas de rentabilidad, KPIs
- CRM: estatus de cobranza por cuenta (aging)
- Dirección: reportes ejecutivos financieros
- SAT: CFDI timbrados, complementos de pago

**Eventos que emite:**
```
accounting.entry.posted  → BI (actualizar dashboards financieros)
invoice.stamped          → CxC (crear saldo), Guest/Account (enviar PDF+XML)
invoice.paid             → CxC (aplicar pago), BI (actualizar cobranza)
invoice.cancelled        → CxC (reversar), Audit (registrar)
night_audit.completed    → PMS (rollover fecha), BI (cierre diario), Reports (auto-send)
period.closed            → Reports (generar estados financieros), Audit (bloquear)
bank.reconciliation.done → BI (actualizar flujo de caja)
```

**Mapeo USALI automático (ejemplos de pólizas):**

```
Cargo de hospedaje (night audit):
  Debit:  4100 - Cuentas por Cobrar Huéspedes     $3,200.00
  Credit: 5100 - Ingresos por Habitaciones          $2,758.62
  Credit: 2100 - IVA por Pagar (16%)                  $441.38

Cargo POS restaurante (consumo AI incluido):
  Debit:  5400 - Costo All Inclusive                   $180.00
  Credit: 1300 - Inventario Alimentos                  $180.00
  (Sin ingreso porque es consumo incluido — el ingreso AI se registró al cargo de hospedaje)

Cargo POS restaurante (extra premium):
  Debit:  4100 - Cuentas por Cobrar Huéspedes         $580.00
  Credit: 5200 - Ingresos Alimentos                    $500.00
  Credit: 2100 - IVA por Pagar                          $80.00

Depósito de grupo:
  Debit:  1100 - Bancos                             $50,000.00
  Credit: 2300 - Anticipos de Clientes               $50,000.00
```

---

### 7. Revenue Management

**Función:** Análisis, forecast, pricing y control de distribución comercial.

**Recibe de:**
- PMS Core: ocupación real, ADR por segmento, producción por canal
- CRS: producción por canal, reservaciones on-the-books
- Grupos: impacto de grupos en inventario y ADR
- BI: datos históricos, tendencias, patrones estacionales
- External: rate shopping data (via integración)

**Envía a:**
- CRS: restricciones (CTA, CTD, MinLOS, stop sell), tarifas ajustadas
- PMS Core: alertas de sobreventa, recomendaciones de pricing
- Dirección: KPIs de revenue en tiempo real
- CRM: análisis de rentabilidad por cuenta, displacement analysis

**Eventos que emite:**
```
rate.adjusted            → CRS (publicar nueva tarifa), Channel Managers
restriction.applied      → CRS (sync), Reservations (alertar)
forecast.updated         → BI (dashboards), Direction (alertas)
overbooking.alert        → PMS (alertar recepción), Direction (notificar)
displacement.calculated  → CRM (evaluar grupo), Direction (decidir)
```

---

### 8. CRM y Ventas

**Función:** Gestión comercial de cuentas, pipeline, cotizaciones, contratos.

**Recibe de:**
- PMS Core: producción histórica por cuenta (room nights, ADR, ingresos)
- COI/ERP: estatus de cobranza, saldos pendientes
- Grupos: seguimiento de grupos activos, pick-up
- Revenue: disponibilidad, tarifas sugeridas, períodos de baja demanda

**Envía a:**
- PMS Core: reservaciones desde cotizaciones confirmadas
- Grupos: creación de grupos y eventos desde pipeline
- Revenue: pipeline de ingresos proyectados
- BI: métricas comerciales, conversión, producción

**Eventos que emite:**
```
opportunity.created      → Revenue (pipeline proyectado)
quote.sent               → Audit (tracking), Calendar (recordatorio follow-up)
quote.accepted           → Groups (crear grupo), PMS (crear reservaciones)
contract.signed          → Finance (términos de crédito), Groups (confirmar)
account.production.updated → BI (ranking de cuentas)
```

---

### 9. Housekeeping

**Función:** Control operativo de limpieza, estatus de habitaciones, asignación de personal.

**Recibe de:**
- PMS Core: check-outs (marcar sucia), llegadas (priorizar limpieza), cambios de habitación
- Reservaciones: early check-in, VIPs (prioridad alta)

**Envía a:**
- PMS Core: habitación lista para asignar (limpia → disponible)
- Mantenimiento: tickets de reparación detectados durante limpieza
- BI: productividad por camarista, tiempos de limpieza
- Inventarios: consumo de suministros de limpieza

**Eventos que emite:**
```
room.cleaned             → PMS (disponible para asignar)
room.inspected           → PMS (confirmada lista)
room.inspection_failed   → Housekeeping (re-asignar limpieza)
discrepancy.detected     → PMS (alertar recepción), Audit (registrar)
maintenance.reported     → Maintenance (crear ticket automático)
minibar.consumed         → PMS (cargo a folio), Inventory (descontar)
lost_found.registered    → PMS (nota en perfil huésped)
```

---

### 10. Mantenimiento / Ingeniería

**Función:** Gestión de tickets, mantenimiento preventivo/correctivo, activos.

**Recibe de:**
- Housekeeping: reportes de desperfectos encontrados en limpieza
- PMS Core: habitaciones fuera de servicio

**Envía a:**
- PMS Core: habitaciones liberadas post-reparación
- COI/ERP: costos de mantenimiento por activo y área
- Revenue: impacto en inventario (habitaciones OOO)
- Inventarios: requisición de refacciones y materiales

**Eventos que emite:**
```
ticket.created           → Assigned tech (notificación push)
ticket.resolved          → PMS (liberar habitación), Reporter (notificar)
preventive.due           → Tech (notificación), Supervisor (alerta)
room.returned_to_service → PMS (habilitar), Revenue (inventario +1)
asset.critical_alert     → Engineering chief (notificar), Direction (alerta)
```

---

### 11. Inventarios, Compras y Almacenes

**Función:** Control de insumos, compras, recetas, costeo, proveedores.

**Recibe de:**
- POS: consumos para descontar inventario automáticamente
- Housekeeping: suministros operativos consumidos
- Mantenimiento: refacciones y materiales utilizados

**Envía a:**
- POS: catálogo de productos, precios actualizados
- COI/ERP: compras (CxP), costos de venta, variaciones
- BI: análisis de costos, márgenes, consumo por centro de costo

**Eventos que emite:**
```
stock.below_minimum      → Purchasing (alerta reorden), AB Manager (notificar)
purchase_order.approved  → Supplier (enviar OC), Finance (comprometer presupuesto)
goods.received           → Inventory (entrada), Finance (CxP), Warehouse (actualizar)
recipe.cost.changed      → POS (actualizar margen), BI (alerta de variación)
cycle_count.discrepancy  → Audit (registrar), AB Manager (investigar)
```

---

### 12. BI y Reportería

**Función:** Dashboards ejecutivos, reportes operativos/financieros/comerciales, análisis.

**Recibe de:**
- Todos los módulos: datos para consolidación en tiempo real

**Envía a:**
- Todos los roles: visualización y exportación de datos
- Data Warehouse: datos históricos para análisis profundo
- Email: reportes programados automáticos

---

## Principio de conexión

Todos los módulos comparten:
- **Base de datos centralizada** — no hay sincronización entre sistemas; una sola fuente de verdad
- **Event bus (Redis Pub/Sub)** — cada acción genera eventos que otros módulos consumen asincrónicamente
- **Audit trail unificado** — cada cambio es trazable: usuario, módulo, timestamp, IP, valores antes/después
- **Permisos transversales** — un solo sistema RBAC+ABAC controla acceso a toda la plataforma
- **Búsqueda global** — desde cualquier punto se buscan huéspedes, reservas, folios, cuentas, habitaciones, grupos, eventos
- **Notificaciones centralizadas** — in-app, push, email según configuración por rol y por tipo de evento

---

## Matriz de intercomunicación de eventos

| Módulo origen | Evento | Módulos que consumen |
|---------------|--------|---------------------|
| PMS | reservation.created | CRS, Revenue, Finance, BI |
| PMS | checkin.completed | Housekeeping, POS, Locks, AI, BI |
| PMS | checkout.completed | Housekeeping, POS, Locks, Finance, BI |
| PMS | folio.charge.posted | Finance, BI |
| CRS | channel.reservation.received | PMS, Finance, BI |
| CRS | availability.updated | Channel Managers, Booking Engine |
| POS | pos.order.closed | Finance, Inventory, BI |
| POS | pos.room_charge.posted | PMS, Finance |
| AI | ai.consumption.validated | POS, Finance, BI |
| Groups | group.created | PMS, Revenue, CRS, BI |
| Groups | event.confirmed | POS, Operations, Finance, BI |
| Finance | night_audit.completed | PMS, BI, Reports |
| Finance | invoice.stamped | CxC, Guest/Account |
| Revenue | rate.adjusted | CRS, Channel Managers |
| Revenue | restriction.applied | CRS, Reservations |
| Housekeeping | room.cleaned | PMS |
| Housekeeping | maintenance.reported | Maintenance |
| Maintenance | room.returned_to_service | PMS, Revenue |
| Inventory | stock.below_minimum | Purchasing, AB Manager |
| CRM | quote.accepted | Groups, PMS, Revenue |

---

## Flujo de datos end-to-end: ejemplo completo

**Escenario:** Huésped AI pide un vino premium en el restaurante italiano.

```
1. Mesero abre cuenta por habitación 304 en POS del Restaurante Italiano
   │
2. POS → PMS Core: ¿Habitación 304 tiene huésped activo?
   │         → Sí: García, María — Plan AI Premium — Brazalete dorado
   │
3. POS → All Inclusive Engine: Validar elegibilidad
   │         → Outlet: Restaurante Italiano ✓ (incluido en AI Premium)
   │         → Horario: 20:30 ✓ (cena 18:00-22:00)
   │         → Límite restaurante especialidad: 2/estancia, usados: 1 ✓
   │
4. Mesero agrega productos:
   │   - Pasta carbonara → AI Engine: incluido ✓ (alimento estándar)
   │   - Tiramisú → AI Engine: incluido ✓ (postre estándar)
   │   - Vino Chianti Reserva → AI Engine: PREMIUM 🟡 (categoría premium)
   │         → Precio: $850 MXN — se cargará como extra
   │
5. Mesero cierra cuenta:
   │   - Consumos incluidos: $680 (registrados para trazabilidad, sin cargo)
   │   - Extra premium: $850 + IVA = $986 (cargo a folio)
   │
6. POS → PMS Core: Cargo a folio de habitación 304 por $986
   │
7. POS → Finance: Póliza automática
   │   Debit:  4100 CxC Huéspedes         $986.00
   │   Credit: 5200 Ingresos A&B           $850.00
   │   Credit: 2100 IVA por pagar          $136.00
   │
8. POS → Finance: Registro de consumo AI incluido (costo)
   │   Debit:  5400 Costo All Inclusive    $180.00  (costo receta)
   │   Credit: 1300 Inventario Alimentos   $180.00
   │
9. POS → Inventory: Descontar ingredientes según recetas
   │
10. POS → BI: Actualizar métricas del Restaurante Italiano
    │   - Revenue extra: +$850
    │   - Covers AI: +1
    │   - Consumo incluido: +$680 (valor menú)
    │   - Ticket promedio: recalcular
    │
11. Todo se refleja en tiempo real en:
    - Folio del huésped (recepción ve el cargo)
    - Dashboard de A&B (gerente ve la venta)
    - Dashboard financiero (contralor ve el ingreso)
    - Dashboard ejecutivo (DG ve ingresos del día)
    - Reporte de consumos AI (trazabilidad)
```
