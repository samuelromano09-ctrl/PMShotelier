# 09 — Roadmap de Producto

---

## Visión de fases

| Fase | Periodo | Objetivo | Equipo estimado |
|------|---------|----------|----------------|
| **MVP** | Meses 1-6 | Hotel opera día a día: PMS + POS + AI básico + Contabilidad + Facturación | 8-10 personas |
| **V2** | Meses 7-12 | Profundidad operativa: Grupos + Eventos + Revenue + CRM + Housekeeping avanzado + Inventarios | 12-15 personas |
| **Enterprise** | Meses 13-18 | Multi-property + Integraciones avanzadas + Automatización + BI profundo | 15-20 personas |
| **Open Platform** | Meses 19-24+ | Marketplace + SDK + AI Assistant + Predictive + Guest App | 20-25 personas |

---

## Fase 1: MVP (Meses 1-6)

**Objetivo:** Plataforma funcional para que un hotel de 400+ habitaciones opere día a día con reservaciones, check-in/out, POS, all inclusive básico, facturación y contabilidad esencial.

**Hotel piloto:** Propiedad de referencia (Acapulco, 412 habs) opera en producción al final de esta fase.

### Sprint 1-2 (Semanas 1-4): Infraestructura y PMS básico

**Entregables:**
- Arquitectura base: monorepo Turborepo, NestJS, Next.js, PostgreSQL, Redis
- Autenticación JWT + refresh tokens + MFA
- Roles básicos (5 roles: admin, FO manager, recepcionista, cajero, auditor)
- CRUD de Property, RoomType, Room
- CRUD de Guest
- Búsqueda global (Meilisearch)
- Layout principal con sidebar, topbar, dark mode
- Bitácora de auditoría

**Riesgos:**
- Selección de stack incorrecto → Mitigación: POC de componentes críticos en semana 1
- Modelo de datos insuficiente → Mitigación: revisión con hotelero real antes de implementar

### Sprint 3-4 (Semanas 5-8): Reservaciones y disponibilidad

**Entregables:**
- Motor de disponibilidad (query < 200ms para 400 habitaciones × 365 días)
- CRUD de reservaciones completo (crear, editar, cancelar, confirmar)
- Calendar View de disponibilidad (día/semana/mes) con colores y filtros
- Room Rack visual con drag & drop
- Tarifas por tipo, temporada y canal
- Paquetes básicos (hospedaje + plan)
- Lista de llegadas / salidas / in-house
- Número de confirmación único
- Garantías y depósitos
- Notas y alertas en reservación

**Riesgos:**
- Performance del motor de disponibilidad → Mitigación: índices especializados, materializing views
- Calendar View complejo → Mitigación: componente custom con virtualización, no usar librería genérica

**KPIs de éxito:**
- Crear reservación en < 2 minutos
- Cargar calendar view en < 1 segundo
- Drag & drop en room rack fluido a 60fps

### Sprint 5-6 (Semanas 9-12): Check-in/out y folios

**Entregables:**
- Check-in estándar y express
- Walk-in con creación de reservación inmediata
- Asignación de habitación (manual y sugerida)
- Check-out con revisión de folio
- Folios: cargos, pagos, saldos, split
- Routing de cargos (por tipo de cargo, por outlet)
- Folio maestro de grupo (estructura)
- No shows (manual y automático)
- Housekeeping básico: estatus de habitación (limpia/sucia/inspeccionada/OOO)
- Perfil de huésped con historial

**KPIs de éxito:**
- Check-in completo en < 3 minutos
- Check-in express en < 1 minuto
- Consulta de folio en < 200ms

### Sprint 7-8 (Semanas 13-16): POS hotelero

**Entregables:**
- Configuración de outlets (restaurante, bar, room service, boutique, spa)
- Catálogo de productos por outlet con categorías
- Apertura y cierre de cuentas (por mesa, por habitación, por nombre)
- Captura de productos (categoría, búsqueda, código)
- Modificadores de producto
- Comandas a cocina/bar (impresión)
- Cargo a habitación (validación de huésped activo)
- Pago en efectivo (con cálculo de cambio), tarjeta, mixto
- Impuestos configurables y propinas
- Corte de caja por turno con arqueo
- Impresión de ticket
- División de cuentas
- Descuentos y cortesías con autorización

**KPIs de éxito:**
- Abrir cuenta y validar huésped en < 10 segundos
- Cargo a habitación en < 5 segundos
- Corte de caja guiado en < 5 minutos

### Sprint 9-10 (Semanas 17-20): All Inclusive básico + Contabilidad

**Entregables:**
- Definición de planes: EP, BB, AI, AI Premium
- Reglas básicas: outlets incluidos, productos incluidos vs premium
- Validación de elegibilidad en POS
- Indicador visual: consumo incluido vs extra
- Cargo automático de extras a folio
- Brazalete/credencial (asignación al check-in)
- Catálogo contable preconfigurado USALI
- Pólizas automáticas desde PMS (room & tax, pagos, depósitos)
- Pólizas automáticas desde POS (ventas, impuestos, propinas)
- CxC básica (city ledger)
- Auditoría nocturna automatizada (room & tax, rollover, no shows)

**KPIs de éxito:**
- Validación AI en POS en < 100ms
- Auditoría nocturna en < 2 minutos (400 habs)
- 100% de transacciones con póliza automática

### Sprint 11-12 (Semanas 21-24): Facturación, reportes y estabilización

**Entregables:**
- Facturación electrónica CFDI 4.0 (ingreso, egreso, pago)
- Timbrado con PAC (Finkok)
- Descarga de PDF y XML
- Reporte de ocupación diaria
- Lista de llegadas / salidas
- Reporte de auditoría nocturna
- Corte de caja POS
- Ingresos por departamento
- Dashboard de recepción
- QA completo, pruebas de carga, corrección de bugs
- Documentación de usuario
- Capacitación para hotel piloto

**KPIs de éxito:**
- Timbrar factura en < 5 segundos
- Cero errores críticos en 2 semanas de pruebas
- Hotel piloto operando en producción

### Criterios de éxito del MVP

| Criterio | Métrica |
|---------|---------|
| Estabilidad | Uptime > 99.5% durante primer mes de operación |
| Performance | P95 de todas las operaciones < 500ms |
| Adopción | 100% de check-ins/outs procesados en el sistema |
| Errores | < 5 bugs críticos reportados por semana después del lanzamiento |
| Satisfacción | NPS del equipo operativo > 40 |
| Capacitación | Recepcionista nuevo operando solo después de 4 horas de training |

### Dependencias del MVP

```
Sprint 1-2 (Infra) ──→ Sprint 3-4 (Reservaciones)
                                │
                                ├──→ Sprint 5-6 (Check-in/Folios)
                                │         │
                                │         └──→ Sprint 7-8 (POS)
                                │                  │
                                │                  └──→ Sprint 9-10 (AI + Contabilidad)
                                │                           │
                                │                           └──→ Sprint 11-12 (CFDI + QA)
                                │
                                └──→ Sprint 5-6 puede empezar sin POS
```

---

## Fase 2: V2 — Profundidad operativa (Meses 7-12)

**Objetivo:** Módulos de grupos, revenue, CRM, housekeeping avanzado, mantenimiento, inventarios, contabilidad profunda. Al final de esta fase, el hotel tiene operación completa enterprise-grade.

### Mes 7-8: Grupos, eventos y salones

- Creación de grupos con bloqueo de inventario
- Rooming lists (carga masiva Excel/CSV con mapeo automático)
- Folio maestro y subfolios con routing de cargos
- Allotments con cut-off automático y liberación
- Condiciones comerciales, comisiones, cortesías
- Depósitos y calendario de pagos con alertas
- Cotizaciones de grupo (template + PDF)
- Contratos de grupo (template + firma digital)
- Catálogo de salones con configuraciones y capacidades
- Calendario visual de salones (diario/semanal/mensual)
- Creación de eventos (boda, convención, reunión, etc.)
- BEOs (Banquet Event Orders) auto-generados
- Cotización de eventos integrada
- Vinculación evento↔grupo
- Facturación por evento
- Pick-up de grupo vs bloqueado

**KPIs de éxito:**
- Crear grupo completo con bloqueo en < 15 minutos
- Cotización de evento en < 10 minutos
- Calendario de salones cargando en < 500ms

**Riesgos:**
- Complejidad del routing de cargos grupo/huésped → Mitigación: diseño detallado con hotelero, muchos edge cases
- Carga masiva de rooming list con datos sucios → Mitigación: validación robusta, mapeo inteligente de columnas

### Mes 8-9: Revenue management y CRM

**Revenue:**
- Calendario tarifario visual con edición masiva
- Restricciones: MinLOS, MaxLOS, CTA, CTD, Stop Sell
- Forecast de ocupación (30/60/90/365 días)
- Pick-up report diario, semanal, mensual
- ADR, RevPAR, TRevPAR dashboards
- Segmentación de mercado (leisure, corporate, group, wholesale, direct)
- Análisis de canal
- Comparativos YoY
- Pace report vs año anterior
- Displacement analysis (grupos vs transient)

**CRM y Ventas:**
- Gestión de cuentas comerciales (agencia, OTA, DMC, corporativo, wedding planner)
- Pipeline comercial (vista Kanban + lista)
- Cotizaciones desde CRM → conversión a reservación/grupo/evento
- Seguimiento de leads con tareas y recordatorios
- Producción por cuenta (room nights, ingresos, ADR)
- Producción por ejecutivo con objetivos
- Calendario de actividades comerciales
- Log de interacciones (llamadas, emails, visitas)

**KPIs de éxito:**
- Dashboard de revenue cargando en < 1 segundo
- Forecast calculado en < 5 segundos
- Pipeline visual con drag & drop fluido

### Mes 9-10: Housekeeping, mantenimiento, AI avanzado

**Housekeeping avanzado:**
- Asignación de camaristas por piso/zona con balance de carga
- Prioridades automáticas (early CI, VIP, checkout, estancia)
- Checklist de inspección configurable por tipo de servicio
- Discrepancias de ocupación con resolución
- Objetos olvidados (lost & found)
- Productividad por camarista (habitaciones, tiempo, inspecciones)
- App móvil para camaristas y supervisoras (PWA)
- Reporte de minibar con cargo automático

**Mantenimiento:**
- Tickets de mantenimiento (cualquier departamento puede crear)
- Asignación a técnicos con prioridades
- Mantenimiento preventivo con calendarios y checklists
- Habitaciones fuera de servicio con impacto en inventario
- Activos y equipos con historial y costos
- App móvil para técnicos (PWA)
- Tiempos de respuesta y resolución

**All Inclusive avanzado:**
- Planes: HB, FB, AI Premium, custom
- Reglas por horario, outlet, edad, mercado
- Límites de consumo (por comida, día, estancia, outlet)
- Brazaletes con colores diferenciados por plan
- Day pass con brazalete temporal
- Trazabilidad completa de consumos incluidos
- Costeo de AI por huésped-noche
- Reportes de consumo promedio por plan
- Análisis de rentabilidad por plan

### Mes 10-11: Inventarios, compras, contabilidad avanzada

**Inventarios y compras:**
- Almacenes múltiples (central, cocina, bar, HK, mantenimiento, boutique)
- Requisiciones con flujo de aprobación
- Órdenes de compra con aprobación por monto
- Recepción de mercancía vs orden de compra
- Traspasos entre almacenes
- Recetas (A&B) con costeo teórico y rendimiento
- Sub-recetas y preparaciones base
- Máximos y mínimos con alertas automáticas
- Conteos cíclicos programados
- Catálogo de proveedores con evaluación
- Comparativos de precio entre proveedores
- Mermas y ajustes de inventario
- Consumo por centro de costo

**Contabilidad avanzada:**
- Centros de costo completos
- CxP completa con programación de pagos
- Conciliación bancaria (automática y manual)
- Estado de resultados por departamento (USALI)
- Balance general
- Flujo de efectivo
- Presupuestos (captura y comparativo vs real)
- Cierres mensuales con validaciones
- Complementos de pago CFDI
- Notas de crédito
- Aged receivables con seguimiento de cobranza
- Ingresos diferidos (depósitos de grupos)
- Conciliación PMS vs contabilidad

### Mes 11-12: Dashboards, reportes, permisos avanzados, estabilización

**Dashboards:**
- Dashboard de Director General (KPIs globales)
- Dashboard de Revenue (forecast, pick-up, pace)
- Dashboard de Ventas (pipeline, producción, conversión)
- Dashboard de Finanzas (ingresos vs presupuesto, CxC, flujo)
- Dashboard de Operación (HK, mantenimiento, incidencias)
- Dashboard de A&B (ventas por outlet, costo, covers, ticket promedio)

**Reportes:**
- Reportes de grupos y eventos
- Reportes de CxC (aged receivables)
- Reportes de inventario y costos
- Comparativos YoY, MoM, DoW
- Exportación a Excel/PDF/CSV
- Reportes programados por email

**Permisos avanzados:**
- 18 roles predefinidos completos
- Permisos granulares por módulo/acción/scope
- Doble autorización para acciones críticas
- Bitácora de auditoría completa con filtros avanzados

**Estabilización:**
- Performance optimization bajo carga real
- Bug fixes de fase 2
- Documentación de usuario actualizada
- Capacitación de nuevos módulos

### Criterios de éxito de V2

| Criterio | Métrica |
|---------|---------|
| Grupos operando | Al menos 10 grupos gestionados completamente en Hotelia |
| Revenue adoption | Revenue Manager usa Hotelia como herramienta principal |
| CRM adoption | 100% del pipeline comercial gestionado en Hotelia |
| HK digital | 100% de camaristas usando app móvil |
| Contabilidad | Cierre mensual completo en Hotelia en < 2 días |
| Reportería | Director General revisa dashboard diariamente |
| Inventarios | 100% de órdenes de compra procesadas en el sistema |

---

## Fase 3: Enterprise Expansion (Meses 13-18)

**Objetivo:** Multi-property, integraciones avanzadas, automatización inteligente, BI profundo, cumplimiento enterprise.

### Mes 13-14: Multi-Property

- Dashboard corporativo multi-hotel
- Configuración independiente por propiedad (planes, tarifas, outlets, catálogo contable)
- Consolidación financiera multi-hotel (P&L consolidado)
- Usuarios compartidos entre propiedades con roles por propiedad
- Huéspedes cross-property (perfil unificado)
- Tarifas y planes por propiedad
- Reportes consolidados y por propiedad
- Multi-moneda (MXN, USD, EUR) con tipos de cambio
- Multi-idioma (ES, EN, PT)
- Multi-empresa (diferentes razones sociales/RFCs)
- Diferentes estructuras fiscales por propiedad

**Riesgo principal:** Row Level Security (RLS) con property_id debe ser bullet-proof. Mitigación: auditoría exhaustiva de queries, testing de penetración.

### Mes 14-15: Integraciones

- Channel Manager 2-way sync (SiteMinder iQ, D-EDGE)
  - Push de ARI (Availability, Rates, Inventory) por evento
  - Recepción automática de reservaciones
  - Confirmación y cancelación bidireccional
- Booking Engine API para web del hotel
- Pasarelas de pago (Stripe, Conekta, OpenPay)
  - Tokenización de tarjetas (PCI compliance)
  - Pre-autorizaciones para garantías
  - Cobros online para depósitos
- Cerraduras electrónicas (ASSA ABLOY Visionline, Dormakaba, Salto)
  - Generar llave digital al check-in
  - Desactivar al check-out
- WhatsApp Business API
  - Confirmación de reservación
  - Pre check-in digital (48h antes)
  - Bienvenida al check-in
  - Encuesta post check-out
- Email transaccional (Resend/SES)
- Kioscos de self check-in (API)
- Rate shopping (integración con OTA Insight, Rate Shopper)
- Webhook management (configuración de webhooks salientes por evento)
- API pública documentada (Swagger/OpenAPI) — versión estable

### Mes 15-16: Automatización e inteligencia

- Asignación inteligente de habitaciones
  - Considera: preferencias del huésped, proximidad de grupo, accesibilidad, estatus de limpieza, eficiencia de HK, balance de pisos, upgrades autorizados
  - Modelo heurístico primero, ML después
- Alertas predictivas
  - Sobreventa por tipo/fecha con recomendación
  - Grupos con depósito vencido (escalamiento automático)
  - Habitaciones OOO prolongadas
  - Allotments por vencer
  - Cotizaciones por expirar
  - Inventario bajo mínimo
  - CxC vencidas
- Recomendaciones de upgrade
  - Por disponibilidad, perfil VIP, programa de lealtad
  - Sugerencia en pantalla de check-in
- Detección de anomalías
  - Consumos POS inusuales (monto, frecuencia, horario)
  - Descuentos excesivos por usuario
  - Cancelaciones inusuales
  - Variaciones de costo de receta
  - Discrepancias de inventario
- Forecast automático
  - Basado en: histórico, tendencia, OTB, wash factor, eventos locales, estacionalidad
  - Actualización diaria automática
  - Comparativo con forecast manual del RM
- Pre check-in digital (link al huésped vía email/WhatsApp)
- Express check-out automático
- Mensajería automática al huésped (confirmación, bienvenida, encuesta, agradecimiento)
- Conciliaciones sugeridas (OTAs vs banco vs PMS)
- Flujos automáticos de ventas (pipeline rules: recordatorios, escalamiento)

### Mes 16-17: BI avanzado

- Data warehouse separado (read replica + ETL/materialized views)
- Dashboards custom (drag and drop widgets)
- Reportes ad-hoc (query builder visual)
- Exportación programada por email (diario, semanal, mensual)
- GOPPAR, TRevPAR
- Displacement analysis avanzado
- Wash factor automático por segmento
- Comp set benchmarking (con rate shopping data)
- Análisis de contribución por canal (net ADR después de comisiones)
- P&L forecast
- Tendencias de 3 años
- Heat map de demanda (día de la semana × semana del año)

### Mes 17-18: Compliance, seguridad enterprise, estabilización

- SOC 2 Type II preparación
- PCI DSS compliance para datos de tarjetas
- GDPR/LFPDPPP compliance completo (anonimización, consentimiento, derecho al olvido)
- SSO (SAML/OIDC) para cadenas hoteleras
- IP whitelisting
- Disaster recovery automatizado (RTO < 4h, RPO < 1h)
- Penetration testing
- Documentación de seguridad
- Optimización de performance a escala multi-property
- Bug fixes y estabilización

### Criterios de éxito de Enterprise

| Criterio | Métrica |
|---------|---------|
| Multi-property | Al menos 3 propiedades operando en la misma instancia |
| Channel Manager | Sync bidireccional con < 30s de latencia |
| Automatización | 80% de habitaciones pre-asignadas automáticamente |
| BI | Director General toma decisiones basado en dashboards de Hotelia |
| Security | Pasar penetration testing sin vulnerabilidades críticas |
| Scale | Sistema manejando 1,000+ habitaciones totales sin degradación |

---

## Fase 4: Plataforma abierta (Meses 19-24+)

**Objetivo:** Ecosistema abierto con marketplace, SDK, IA avanzada, app del huésped.

### Mes 19-20: App del huésped y POS avanzado

**App del huésped (React Native):**
- Pre check-in digital completo
- Llave digital (BLE/NFC)
- Pedidos de room service desde app
- Reserva de restaurante/spa desde app
- Chat con recepción
- Itinerario de eventos/actividades
- Facturación digital (envío de CFDI)
- Encuesta de satisfacción in-app
- Programa de lealtad

**POS avanzado:**
- Kitchen Display System (KDS) — pantallas en cocina/bar
- Tablero de reservaciones de restaurante
- Programa de lealtad en outlets
- Ofertas personalizadas en POS
- POS offline mode completo (sincroniza al reconectar)

### Mes 21-22: Marketplace y SDK

- Marketplace de integraciones (app store de Hotelia)
- SDK para desarrolladores terceros (REST + webhooks + eventos)
- Custom reports builder (usuarios finales crean sus propios reportes)
- Custom workflows (automatización visual tipo Zapier)
- White-label para cadenas (logo, colores, dominio custom)
- Sandbox environment para integradores
- API GraphQL pública (además de REST)
- Documentación para desarrolladores (portal tipo Stripe Docs)

### Mes 23-24: IA avanzada

- AI Assistant (NLP) para consultas: "¿Cuál fue el ADR de marzo?" / "¿Qué grupos llegan esta semana?"
- Predictive pricing con ML (sugerencias de tarifa basadas en demanda, competencia, eventos)
- Guest sentiment analysis (análisis de reviews y encuestas)
- Demand forecasting avanzado (incorpora datos externos: vuelos, eventos, clima)
- Anomaly detection avanzada con ML
- Chatbot para huéspedes (FAQ, solicitudes, quejas)
- Recomendaciones personalizadas al huésped (actividades, restaurantes, upgrades)

---

## Timeline visual

```
MES   1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
      ├──────────────────┤
      │    MVP (Fase 1)  │
      │  PMS + POS       │
      │  AI básico       │
      │  Contabilidad    │
      │  Facturación     │
      │  Housekeeping    │
      └────────┬─────────┘
               │  ┌──────────────────────────────┐
               └──┤        V2 (Fase 2)           │
                  │  Grupos + Eventos + Salones   │
                  │  Revenue + CRM + Ventas       │
                  │  HK + Maint avanzado          │
                  │  Inventarios + Compras        │
                  │  Contabilidad avanzada        │
                  │  Dashboards + Reportes        │
                  └──────────────┬───────────────┘
                                 │  ┌──────────────────────────────┐
                                 └──┤    Enterprise (Fase 3)       │
                                    │  Multi-property              │
                                    │  Channel Manager + OTAs      │
                                    │  Pagos + Cerraduras          │
                                    │  WhatsApp + Messaging        │
                                    │  Automatización + ML         │
                                    │  BI avanzado                 │
                                    │  Security + Compliance       │
                                    └──────────────┬───────────────┘
                                                   │  ┌──────────────────┐
                                                   └──┤  Open Platform   │
                                                      │  Guest App       │
                                                      │  Marketplace     │
                                                      │  SDK             │
                                                      │  AI Assistant    │
                                                      │  Predictive      │
                                                      └──────────────────┘
```

---

## Gestión de riesgos por fase

### Riesgos técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Performance del motor de disponibilidad con 400+ habs | Media | Alto | POC temprano, índices especializados, caching, materializing views |
| Complejidad de reglas all inclusive | Alta | Alto | Motor de reglas configurable con JSONB, testing exhaustivo con hotelero |
| Calendar View responsiveness con miles de celdas | Media | Medio | Virtualización, lazy loading, optimistic UI |
| Facturación CFDI con edge cases fiscales | Alta | Alto | Integración temprana con PAC, testing con contador |
| Auditoría nocturna con 400 folios | Media | Alto | Procesamiento batch con BullMQ, rollback capability |
| Sincronización con Channel Manager | Alta | Alto | Cola de mensajes, retry logic, reconciliación automática |
| Offline mode del POS | Media | Alto | Service Worker + IndexedDB, sync queue, conflict resolution |

### Riesgos de negocio

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Resistencia al cambio del personal operativo | Alta | Alto | UX excepcional, capacitación inmersiva, soporte en sitio durante go-live |
| Migración de datos del sistema actual | Alta | Medio | ETL scripts, validación cruzada, periodo de operación paralela |
| Scope creep por peticiones del hotel piloto | Alta | Medio | Priorización estricta, MVP definido, backlog visible |
| Competidor lanza feature similar | Media | Bajo | Velocidad de ejecución, profundidad funcional como moat |
| Regulación fiscal cambia (CFDI 5.0?) | Baja | Medio | Arquitectura modular de facturación, abstracción del PAC |

---

## Estrategia de lanzamiento

### MVP (Mes 6)

1. **Alpha** (Mes 5): Pruebas internas con datos de prueba realistas
2. **Beta** (Mes 5.5): Hotel piloto opera en paralelo con sistema actual durante 2 semanas
3. **Go-live** (Mes 6): Cutover al nuevo sistema con soporte en sitio 24/7 durante primera semana
4. **Estabilización** (Mes 6-7): Bug fixes críticos, optimizaciones, feedback loop

### V2 (Mes 12)

- Rollout modular: cada módulo nuevo se activa por separado con capacitación
- Primero: Grupos y Eventos (más crítico para el hotel de referencia)
- Luego: Revenue y CRM
- Luego: HK/Maint apps
- Finalmente: Inventarios y Contabilidad avanzada

### Enterprise (Mes 18)

- Segundo hotel piloto para validar multi-property
- Integraciones por prioridad del cliente
- Automatización gradual (reglas simples primero, ML después)

---

## Métricas de producto a trackear

| Categoría | Métrica | Target |
|-----------|---------|--------|
| **Adopción** | % de operaciones procesadas en Hotelia vs manual/otro sistema | > 95% |
| **Performance** | P95 latency de operaciones core | < 500ms |
| **Confiabilidad** | Uptime mensual | > 99.9% |
| **UX** | Tiempo promedio por tarea (check-in, reserva, cierre caja) | Mejorar 3x vs sistema anterior |
| **Errores** | Bugs críticos abiertos | < 3 en cualquier momento |
| **Satisfacción** | NPS del equipo operativo | > 50 |
| **Data quality** | % de transacciones con póliza contable automática | 100% |
| **Revenue impact** | Incremento en RevPAR atribuible a mejor gestión | +3-5% en 12 meses |
