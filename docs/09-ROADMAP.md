# I. Roadmap de Producto

---

## Fase 1: MVP (Meses 1-6)

**Objetivo:** Plataforma funcional para operar un hotel con PMS + POS + Contabilidad básica.

### PMS Core
- [x] Gestión de tipos de habitación y habitaciones
- [x] Tarifas por tipo, temporada y canal (básico)
- [x] Creación y gestión de reservaciones
- [x] Calendar view de disponibilidad (día/semana/mes)
- [x] Room rack visual con drag and drop
- [x] Check-in / Check-out estándar
- [x] Walk-ins
- [x] Folios: cargos, pagos, saldos
- [x] Perfiles de huésped
- [x] Lista de llegadas / salidas / in-house
- [x] Notas y alertas en reservación
- [x] Garantías y depósitos
- [x] No shows y cancelaciones
- [x] Housekeeping: estatus básico de habitación (limpia/sucia/inspeccionada)

### POS
- [x] Configuración de outlets
- [x] Catálogo de productos por outlet
- [x] Apertura y cierre de cuentas
- [x] Cargo a habitación
- [x] Pago en efectivo y tarjeta
- [x] Impuestos y propinas
- [x] Corte de caja básico
- [x] Impresión de ticket
- [x] Comandas a cocina (impresión)

### All Inclusive (básico)
- [x] Definición de planes: EP, BB, AI
- [x] Validación de elegibilidad en POS
- [x] Distinción consumo incluido vs extra
- [x] Cargo automático de extras a folio

### Contabilidad
- [x] Catálogo contable
- [x] Pólizas automáticas desde PMS y POS
- [x] Auditoría nocturna (cargo room & tax, rollover)
- [x] Facturación electrónica (CFDI básico)
- [x] CxC básica (city ledger)

### Infraestructura
- [x] Autenticación JWT
- [x] Roles y permisos básicos (5 roles)
- [x] API REST para módulos core
- [x] Búsqueda global
- [x] Bitácora de auditoría
- [x] Responsive: desktop + tablet
- [x] Dark mode

### Reportes MVP
- [x] Reporte de ocupación diaria
- [x] Lista de llegadas / salidas
- [x] Reporte de auditoría nocturna
- [x] Corte de caja POS
- [x] Ingresos por departamento (básico)

**Entregable:** Hotel puede operar día a día con reservaciones, check-in/out, POS y facturación.

---

## Fase 2: V2 — Profundidad operativa (Meses 7-12)

**Objetivo:** Módulos de grupos, revenue, CRM, housekeeping avanzado, inventarios.

### Grupos y Eventos
- [ ] Creación de grupos con bloqueo de inventario
- [ ] Rooming lists (carga masiva Excel)
- [ ] Folio maestro y subfolios
- [ ] Allotments con cut-off automático
- [ ] Condiciones comerciales y comisiones
- [ ] Depósitos y calendario de pagos
- [ ] Cotizaciones de grupo
- [ ] Contratos de grupo (templates)

### Eventos y Salones
- [ ] Catálogo de salones con configuraciones
- [ ] Calendario visual de salones
- [ ] Creación de eventos
- [ ] BEOs (Banquet Event Orders)
- [ ] Cotización de eventos
- [ ] Vinculación evento-grupo
- [ ] Facturación por evento

### Revenue Management
- [ ] Calendario tarifario visual
- [ ] Restricciones: MinLOS, MaxLOS, CTA, CTD, Stop Sell
- [ ] Forecast de ocupación
- [ ] Pick-up report
- [ ] ADR, RevPAR, TRevPAR dashboards
- [ ] Segmentación de mercado
- [ ] Análisis de canal
- [ ] Comparativos YoY

### CRM y Ventas
- [ ] Gestión de cuentas comerciales
- [ ] Pipeline comercial (Kanban)
- [ ] Cotizaciones desde CRM
- [ ] Seguimiento de leads
- [ ] Tareas y recordatorios
- [ ] Producción por cuenta
- [ ] Producción por ejecutivo
- [ ] Objetivos comerciales

### Housekeeping avanzado
- [ ] Asignación de camaristas por piso/zona
- [ ] Prioridades automáticas de limpieza
- [ ] Checklist de inspección configurable
- [ ] Discrepancias de ocupación
- [ ] Objetos olvidados (lost & found)
- [ ] Productividad por camarista
- [ ] App móvil para camaristas

### Mantenimiento
- [ ] Tickets de mantenimiento
- [ ] Asignación a técnicos
- [ ] Mantenimiento preventivo (calendarios)
- [ ] Habitaciones fuera de servicio
- [ ] Activos y equipos
- [ ] App móvil para técnicos

### All Inclusive avanzado
- [ ] Planes: HB, FB, AI Premium, custom
- [ ] Reglas por horario, outlet, edad
- [ ] Límites de consumo
- [ ] Brazaletes / credenciales
- [ ] Day pass
- [ ] Trazabilidad de consumos incluidos
- [ ] Costeo de AI por huésped-noche

### Inventarios y Compras
- [ ] Almacenes múltiples
- [ ] Requisiciones con aprobación
- [ ] Órdenes de compra
- [ ] Recepción de mercancía
- [ ] Traspasos entre almacenes
- [ ] Recetas y costeo
- [ ] Máximos y mínimos
- [ ] Catálogo de proveedores

### Contabilidad avanzada
- [ ] Centros de costo
- [ ] CxP completa
- [ ] Conciliación bancaria
- [ ] Estado de resultados por departamento (USALI)
- [ ] Balance general
- [ ] Presupuestos
- [ ] Cierres mensuales
- [ ] Complementos de pago CFDI
- [ ] Notas de crédito

### Reportes V2
- [ ] Dashboard de Director General
- [ ] Dashboard de Revenue
- [ ] Dashboard de Ventas
- [ ] Dashboard de Finanzas
- [ ] Dashboard de Operación
- [ ] Dashboard de A&B
- [ ] Reportes de grupos y eventos
- [ ] Reportes de CxC (aged receivables)
- [ ] Reportes de inventario y costos
- [ ] Comparativos YoY, MoM, DoW
- [ ] Exportación a Excel/PDF/CSV

### Permisos avanzados
- [ ] 18 roles predefinidos
- [ ] Permisos granulares por módulo/acción
- [ ] Doble autorización para acciones críticas
- [ ] Permisos por propiedad (multi-hotel)

**Entregable:** Hotel con operación completa incluyendo grupos, eventos, revenue, CRM, housekeeping profesional e inventarios.

---

## Fase 3: Enterprise Expansion (Meses 13-18)

**Objetivo:** Multi-property, integraciones avanzadas, automatización, BI profundo.

### Multi-Property
- [ ] Dashboard corporativo multi-hotel
- [ ] Configuración independiente por propiedad
- [ ] Consolidación financiera multi-hotel
- [ ] Usuarios compartidos entre propiedades
- [ ] Tarifas y planes por propiedad
- [ ] Reportes consolidados y por propiedad
- [ ] Multi-moneda
- [ ] Multi-idioma (ES, EN)
- [ ] Multi-empresa (diferentes razones sociales)
- [ ] Diferentes estructuras fiscales

### Integraciones
- [ ] Channel Manager 2-way sync (SiteMinder, D-EDGE)
- [ ] Booking Engine API
- [ ] Pasarelas de pago (Stripe, Conekta)
- [ ] Cerraduras (ASSA ABLOY, Dormakaba)
- [ ] WhatsApp Business API
- [ ] Email transaccional
- [ ] Kioscos de self check-in
- [ ] Telefonía IP (cargos de llamadas)
- [ ] Rate shopping (integración con servicios externos)
- [ ] Webhook management (configuración de webhooks salientes)
- [ ] API pública documentada (Swagger/OpenAPI)

### Automatización
- [ ] Asignación inteligente de habitaciones (ML)
- [ ] Alertas predictivas de sobreventa
- [ ] Recomendaciones de upgrade
- [ ] Detección de anomalías de consumo POS
- [ ] Forecast automático con ML
- [ ] Conciliaciones sugeridas automáticamente
- [ ] Recordatorios operativos automáticos
- [ ] Flujos automáticos de ventas (pipeline rules)
- [ ] Pre check-in digital (link al huésped)
- [ ] Express check-out automático
- [ ] Mensajería automática al huésped (pre/durante/post estancia)

### BI avanzado
- [ ] Data warehouse separado (read replica + ETL)
- [ ] Dashboards custom (drag and drop widgets)
- [ ] Reportes ad-hoc (query builder visual)
- [ ] Exportación programada por email
- [ ] GOPPAR, TRevPAR, displacement analysis
- [ ] Wash factor automático
- [ ] Comp set benchmarking
- [ ] Análisis de contribución por canal
- [ ] P&L forecast
- [ ] Tendencias de 3 años

### App del huésped
- [ ] Pre check-in digital
- [ ] Llave digital (BLE/NFC)
- [ ] Pedidos de room service desde app
- [ ] Reserva de restaurante/spa desde app
- [ ] Chat con recepción
- [ ] Facturación digital
- [ ] Encuesta de satisfacción in-app

### POS avanzado
- [ ] Kitchen Display System (KDS)
- [ ] Tablero de reservaciones de restaurante
- [ ] Programa de lealtad en outlets
- [ ] Ofertas personalizadas en POS

### Compliance y seguridad enterprise
- [ ] SOC 2 compliance
- [ ] PCI DSS Level 1
- [ ] GDPR/LFPDPPP compliance completo
- [ ] SSO (SAML/OIDC) para cadenas
- [ ] IP whitelisting
- [ ] Disaster recovery automatizado

**Entregable:** Plataforma enterprise completa, multi-property, con integraciones maduras, automatización inteligente y BI profundo.

---

## Fase 4: Plataforma abierta (Meses 19-24+)

**Objetivo:** Ecosistema abierto con marketplace de integraciones y personalización.

- [ ] Marketplace de integraciones (app store)
- [ ] SDK para desarrolladores terceros
- [ ] Custom reports builder (usuarios finales)
- [ ] Custom workflows (automatización visual)
- [ ] White-label para cadenas
- [ ] AI Assistant (NLP) para consultas: "¿Cuál fue el ADR de marzo?"
- [ ] Predictive pricing con ML
- [ ] Guest sentiment analysis
- [ ] API GraphQL pública
- [ ] Sandbox environment para integradores

---

## Timeline visual

```
MES   1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18
      ├──────────────────┤
      │    MVP (Fase 1)  │
      │  PMS+POS+Contab  │
      │  AI básico       │
      │  Facturación     │
      └──────────────────┘
                          ├──────────────────────────────┤
                          │        V2 (Fase 2)           │
                          │  Grupos+Eventos+Revenue      │
                          │  CRM+Housekeeping+Inventario │
                          │  Contabilidad avanzada       │
                          └──────────────────────────────┘
                                                          ├──────────────────┤
                                                          │ Enterprise (F3)  │
                                                          │ Multi-property   │
                                                          │ Integraciones    │
                                                          │ Automatización   │
                                                          │ BI avanzado      │
                                                          └──────────────────┘
```
