# B. Mapa Completo de Módulos

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
**Función:** Núcleo operativo — reservaciones, check-in/out, folios, room rack, huéspedes.

**Recibe de:**
- CRS: reservaciones de canales externos
- CRM: reservaciones desde cotizaciones comerciales
- Grupos: bloqueos, rooming lists, folios maestros
- All Inclusive: plan asignado al huésped

**Envía a:**
- POS: identificación de huésped para cargos a habitación
- COI/ERP: transacciones de hospedaje, cargos, pagos
- Housekeeping: estatus de habitación al check-out
- Revenue: datos de ocupación, ADR, segmento
- BI: datos operativos para reportes

---

### 2. CRS / Motor de Reservaciones / Channel Management Ready
**Función:** Gestión centralizada de disponibilidad, tarifas y canales de distribución.

**Recibe de:**
- PMS Core: inventario en tiempo real
- Revenue: restricciones, tarifas dinámicas
- Grupos: allotments y bloqueos

**Envía a:**
- PMS Core: reservaciones confirmadas
- Channel Managers: disponibilidad y tarifas actualizadas
- Booking Engine: inventario para venta directa
- Revenue: producción por canal

---

### 3. POS Hotelero
**Función:** Punto de venta para todos los centros de consumo del hotel.

**Recibe de:**
- PMS Core: datos de huésped y habitación para cargos
- All Inclusive: reglas de elegibilidad y planes
- Inventarios: productos, recetas, precios

**Envía a:**
- PMS Core: cargos a folio de habitación
- COI/ERP: ingresos por outlet, impuestos, propinas
- Inventarios: consumos para descontar existencias
- All Inclusive: registro de consumos incluidos vs extras
- BI: métricas de ventas por outlet

---

### 4. Operación All Inclusive
**Función:** Motor de reglas para planes alimenticios, elegibilidad y control de consumos.

**Recibe de:**
- PMS Core: plan del huésped, fechas, paquete
- POS: solicitudes de validación de consumo

**Envía a:**
- POS: autorización/denegación/cargo extra
- COI/ERP: diferenciación de ingresos incluidos vs extras
- BI: estadísticas de consumo all inclusive

---

### 5. Grupos, Eventos y Salones
**Función:** Gestión comercial y operativa de grupos turísticos, bodas, convenciones, banquetes.

**Recibe de:**
- CRM: leads de grupos y eventos
- PMS Core: disponibilidad de habitaciones

**Envía a:**
- PMS Core: bloqueos de habitaciones, rooming lists, folios maestros
- COI/ERP: depósitos, facturación por grupo/evento
- POS: paquetes de A&B para eventos
- Revenue: impacto de grupos en ocupación/ADR

---

### 6. COI / ERP / Back Office
**Función:** Contabilidad, finanzas, facturación, cuentas por cobrar/pagar, conciliaciones.

**Recibe de:**
- PMS Core: transacciones de hospedaje
- POS: ventas de outlets
- Grupos: depósitos, facturación de eventos
- Inventarios: compras, costos
- Todos los módulos: movimientos financieros

**Envía a:**
- BI: estados financieros, métricas de rentabilidad
- CRM: estatus de cobranza por cuenta
- Dirección: reportes ejecutivos financieros

---

### 7. Revenue Management
**Función:** Análisis, forecast, pricing y control de distribución comercial.

**Recibe de:**
- PMS Core: ocupación, ADR, segmentación real
- CRS: producción por canal
- Grupos: impacto de grupos en inventario
- BI: datos históricos

**Envía a:**
- CRS: restricciones, tarifas ajustadas
- PMS Core: alertas de sobreventa
- Dirección: KPIs de revenue

---

### 8. CRM y Ventas
**Función:** Gestión comercial de cuentas, pipeline, cotizaciones, contratos.

**Recibe de:**
- PMS Core: producción histórica por cuenta
- COI/ERP: estatus de cobranza
- Grupos: seguimiento de grupos activos

**Envía a:**
- PMS Core: reservaciones desde cotizaciones
- Grupos: creación de grupos y eventos
- Revenue: pipeline de ingresos proyectados

---

### 9. Housekeeping
**Función:** Control operativo de limpieza, estatus de habitaciones, asignación de personal.

**Recibe de:**
- PMS Core: check-outs, llegadas, cambios de habitación

**Envía a:**
- PMS Core: habitación lista para asignar
- Mantenimiento: tickets de reparación detectados

---

### 10. Mantenimiento / Ingeniería
**Función:** Gestión de tickets, mantenimiento preventivo/correctivo, activos.

**Recibe de:**
- Housekeeping: reportes de desperfectos
- PMS Core: habitaciones fuera de servicio

**Envía a:**
- PMS Core: habitaciones liberadas post-reparación
- COI/ERP: costos de mantenimiento

---

### 11. Inventarios, Compras y Almacenes
**Función:** Control de insumos, compras, recetas, costeo, proveedores.

**Recibe de:**
- POS: consumos para descontar inventario
- Housekeeping: suministros operativos
- Mantenimiento: refacciones y materiales

**Envía a:**
- POS: catálogo de productos, precios
- COI/ERP: compras, costos, cuentas por pagar
- BI: análisis de costos

---

### 12. BI y Reportería
**Función:** Dashboards ejecutivos, reportes operativos/financieros/comerciales, análisis.

**Recibe de:**
- Todos los módulos: datos para consolidación

**Envía a:**
- Todos los roles: visualización y exportación de datos
- Data Warehouse: datos históricos para análisis profundo

---

## Principio de conexión

Todos los módulos comparten:
- **Base de datos centralizada** — no hay sincronización entre sistemas
- **Event bus** — cada acción genera eventos que otros módulos pueden consumir
- **Audit trail unificado** — cada cambio es trazable al usuario, módulo y timestamp
- **Permisos transversales** — un solo sistema de roles controla acceso a todo
- **Búsqueda global** — desde cualquier punto del sistema se puede buscar huéspedes, reservas, folios, cuentas, habitaciones
