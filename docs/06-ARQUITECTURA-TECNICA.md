# F. Arquitectura Técnica

---

## Principios arquitectónicos

1. **API-First** — toda funcionalidad expuesta como API antes que como UI
2. **Modular** — cada módulo es un bounded context que puede evolucionar independientemente
3. **Event-Driven** — los módulos se comunican por eventos, no por llamadas directas
4. **Cloud-Native** — diseñado para correr en la nube desde el día uno
5. **Multi-Tenant** — una instancia sirve múltiples propiedades/cadenas con aislamiento de datos
6. **Offline-Resilient** — POS y housekeeping funcionan con conectividad intermitente

---

## Stack tecnológico

### Frontend

| Componente | Tecnología | Justificación |
|------------|-----------|---------------|
| Framework | **Next.js 15+ (App Router)** | SSR, RSC, routing robusto, excelente DX |
| UI Library | **React 19+** | Ecosistema maduro, Server Components |
| State Management | **Zustand** + **TanStack Query** | Zustand para UI state, TanStack para server state/cache |
| UI Components | **Radix UI** + **Tailwind CSS** | Componentes accesibles + utilidades CSS eficientes |
| Calendarios | **Custom** sobre base de DayPicker + virtualización | Los calendarios son core del producto, requieren control total |
| Tablas | **TanStack Table** | Virtualización, sort, filter, group, export |
| Drag & Drop | **dnd-kit** | Moderno, accesible, performante |
| Gráficas | **Recharts** o **Visx** | Declarativas, customizables |
| Formularios | **React Hook Form** + **Zod** | Validación en cliente y servidor con schema compartido |
| Real-time | **WebSockets** (Socket.io o native WS) | Room rack, housekeeping, POS en vivo |
| PWA | Service Worker | Offline para POS y housekeeping |
| Mobile | **React Native** (housekeeping, mantenimiento, gerencia) | Código compartido con web para lógica de negocio |

### Backend

| Componente | Tecnología | Justificación |
|------------|-----------|---------------|
| Runtime | **Node.js 22+ LTS** | Performance, ecosystem, TypeScript nativo |
| Framework | **NestJS** | Arquitectura modular, DI, decorators, enterprise-grade |
| API | **REST** (principal) + **GraphQL** (BI/reportes) | REST para operaciones CRUD, GraphQL para queries complejas |
| ORM | **Prisma** | Type-safe, migraciones, excelente DX |
| Validación | **Zod** (compartida con frontend) | Schema único validación client/server |
| Autenticación | **JWT** + **Refresh Tokens** | Stateless, eficiente |
| Autorización | **CASL** | Permisos granulares basados en roles y atributos |
| Jobs/Queues | **BullMQ** (Redis) | Auditoría nocturna, reportes, emails, reconciliaciones |
| Events | **EventEmitter2** (interno) + **Redis Pub/Sub** (entre servicios) | Comunicación asíncrona entre módulos |
| Cache | **Redis** | Sessions, cache de disponibilidad, rate limiting |
| Search | **Meilisearch** o **Elasticsearch** | Búsqueda global rápida |
| File Storage | **S3** (o compatible) | Fotos, documentos, backups |
| Email | **Resend** o **AWS SES** | Confirmaciones, notificaciones |
| PDF | **Puppeteer** o **React-PDF** | Facturas, BEOs, reportes, contratos |

### Base de datos

| Componente | Tecnología | Justificación |
|------------|-----------|---------------|
| Primary DB | **PostgreSQL 16+** | Robusta, ACID, JSON support, extensiones |
| Multi-tenant | **Row Level Security (RLS)** con `property_id` | Aislamiento sin complejidad de multi-schema |
| Migrations | **Prisma Migrate** | Versionadas, reproducibles |
| Audit Trail | **Triggers + tabla de auditoría** | Cada cambio registrado automáticamente |
| Read replicas | **PostgreSQL Streaming Replication** | Reportes y BI sin afectar operación |
| Time-series | **TimescaleDB** (extensión PG) | Métricas de revenue, ocupación, forecast |
| Backup | **pg_dump** automatizado + Point-in-time recovery | RPO < 1 hora |

### Infraestructura

```
┌──────────────────────────────────────────────────────────┐
│                     CDN (CloudFlare)                      │
│              Static assets, edge caching                  │
└─────────────────────────┬────────────────────────────────┘
                          │
┌─────────────────────────┴────────────────────────────────┐
│                   Load Balancer (ALB)                      │
│              SSL termination, routing                      │
└──────────┬─────────────────────────────────┬─────────────┘
           │                                 │
┌──────────┴──────────┐           ┌──────────┴──────────┐
│   Frontend (Vercel  │           │   API Servers        │
│   o AWS ECS)        │           │   (ECS / Kubernetes) │
│                     │           │                      │
│   Next.js SSR       │           │   NestJS instances   │
│   Static + Dynamic  │           │   Auto-scaling       │
└─────────────────────┘           │   Min 2, Max N       │
                                  └──────────┬───────────┘
                                             │
                    ┌────────────────────────┬┴───────────────────────┐
                    │                        │                        │
           ┌────────┴────────┐    ┌──────────┴──────┐    ┌──────────┴──────┐
           │   PostgreSQL    │    │     Redis        │    │    S3 / Minio   │
           │   (RDS / Aurora)│    │   (ElastiCache)  │    │   File storage  │
           │                 │    │                  │    │                 │
           │   Primary +     │    │   Cache +        │    │   Fotos, docs,  │
           │   Read Replica  │    │   Sessions +     │    │   backups,      │
           │                 │    │   Queues +       │    │   exports       │
           │                 │    │   Pub/Sub        │    │                 │
           └─────────────────┘    └──────────────────┘    └─────────────────┘
```

---

## Arquitectura de módulos (Backend)

```
src/
├── modules/
│   ├── auth/                    # Autenticación y autorización
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/          # JWT, local, API key
│   │   ├── guards/              # Role guard, permission guard
│   │   └── decorators/          # @CurrentUser, @RequirePermission
│   │
│   ├── pms/                     # PMS Core
│   │   ├── reservations/        # Reservaciones
│   │   ├── check-in-out/        # Check-in / Check-out
│   │   ├── folios/              # Folios y cargos
│   │   ├── rooms/               # Habitaciones y tipos
│   │   ├── guests/              # Perfiles de huéspedes
│   │   ├── rates/               # Tarifas y paquetes
│   │   └── availability/        # Motor de disponibilidad
│   │
│   ├── pos/                     # POS Hotelero
│   │   ├── outlets/             # Configuración de outlets
│   │   ├── orders/              # Órdenes / tickets
│   │   ├── products/            # Catálogo de productos
│   │   ├── cash-register/       # Cortes de caja
│   │   └── kitchen/             # Comandas a cocina
│   │
│   ├── all-inclusive/           # Motor All Inclusive
│   │   ├── plans/               # Planes alimenticios
│   │   ├── rules/               # Reglas de elegibilidad
│   │   ├── wristbands/          # Brazaletes
│   │   └── validation/          # Motor de validación en POS
│   │
│   ├── groups/                  # Grupos y Eventos
│   │   ├── groups/              # Gestión de grupos
│   │   ├── events/              # Eventos y banquetes
│   │   ├── venues/              # Salones
│   │   ├── beo/                 # Banquet Event Orders
│   │   └── quotes/              # Cotizaciones
│   │
│   ├── finance/                 # COI / ERP
│   │   ├── accounting/          # Contabilidad general
│   │   ├── accounts-receivable/ # CxC
│   │   ├── accounts-payable/    # CxP
│   │   ├── invoicing/           # Facturación (CFDI)
│   │   ├── banking/             # Bancos y conciliación
│   │   ├── night-audit/         # Auditoría nocturna
│   │   └── budgets/             # Presupuestos
│   │
│   ├── revenue/                 # Revenue Management
│   │   ├── forecast/            # Forecast y pick-up
│   │   ├── pricing/             # Pricing engine
│   │   ├── restrictions/        # Restricciones
│   │   ├── segments/            # Segmentación
│   │   └── analytics/           # KPIs y análisis
│   │
│   ├── crm/                     # CRM y Ventas
│   │   ├── accounts/            # Cuentas comerciales
│   │   ├── pipeline/            # Pipeline de ventas
│   │   ├── contracts/           # Contratos
│   │   └── commissions/         # Comisiones
│   │
│   ├── operations/              # Operaciones
│   │   ├── housekeeping/        # Housekeeping
│   │   ├── maintenance/         # Mantenimiento
│   │   ├── inventory/           # Inventarios
│   │   └── purchasing/          # Compras
│   │
│   ├── bi/                      # Business Intelligence
│   │   ├── dashboards/          # Dashboards configurables
│   │   ├── reports/             # Motor de reportes
│   │   └── exports/             # Exportación
│   │
│   └── integrations/            # Integraciones externas
│       ├── channel-manager/     # Channel managers
│       ├── payment-gateway/     # Pasarelas de pago
│       ├── cfdi/                # Facturación electrónica SAT
│       ├── locks/               # Cerraduras
│       ├── messaging/           # WhatsApp, Email, SMS
│       └── webhooks/            # Webhooks salientes
│
├── common/                      # Compartido
│   ├── database/                # Prisma client, migrations
│   ├── events/                  # Event bus
│   ├── audit/                   # Audit trail
│   ├── multi-tenant/            # Tenant context, RLS
│   ├── search/                  # Búsqueda global
│   ├── notifications/           # Notificaciones
│   ├── files/                   # File upload/storage
│   └── utils/                   # Utilidades compartidas
│
├── config/                      # Configuración por entorno
├── prisma/                      # Schema y migraciones
└── main.ts                      # Bootstrap
```

---

## API Design

### Convenciones REST

```
Base URL: https://api.hotelia.io/v1

# Reservaciones
GET    /reservations                    # Listar (paginado, filtrable)
POST   /reservations                    # Crear
GET    /reservations/:id                # Detalle
PATCH  /reservations/:id                # Actualizar parcial
DELETE /reservations/:id                # Cancelar

# Check-in
POST   /reservations/:id/check-in      # Ejecutar check-in
POST   /reservations/:id/check-out     # Ejecutar check-out

# Folios
GET    /folios/:id                      # Detalle con cargos
POST   /folios/:id/charges              # Agregar cargo
POST   /folios/:id/payments             # Registrar pago
POST   /folios/:id/split                # Split folio

# POS
POST   /pos/outlets/:id/orders          # Crear orden
PATCH  /pos/orders/:id                  # Modificar orden
POST   /pos/orders/:id/close            # Cerrar orden
POST   /pos/orders/:id/charge-room      # Cargo a habitación

# All Inclusive
POST   /all-inclusive/validate          # Validar elegibilidad
GET    /all-inclusive/consumption/:guestId  # Historial de consumo

# Disponibilidad
GET    /availability?from=&to=&roomType= # Consultar disponibilidad
```

### Paginación

```json
{
  "data": [...],
  "meta": {
    "total": 1250,
    "page": 1,
    "perPage": 50,
    "totalPages": 25
  }
}
```

### Filtros

```
GET /reservations?status=confirmed&checkIn[gte]=2026-03-01&channel=direct&sort=-createdAt
```

### Webhooks salientes

```json
{
  "event": "reservation.created",
  "timestamp": "2026-03-11T14:30:00Z",
  "property_id": "prop_abc123",
  "data": {
    "reservation_id": "res_xyz789",
    "guest_name": "María García",
    "check_in": "2026-03-15",
    "check_out": "2026-03-18",
    "room_type": "JRS",
    "rate": 3200.00,
    "plan": "all_inclusive"
  }
}
```

---

## Seguridad

### Autenticación
- JWT con access token (15 min) + refresh token (7 días)
- MFA opcional (TOTP)
- API keys para integraciones
- Session management: forzar logout remoto, límite de sesiones activas

### Autorización (RBAC + ABAC)
- Roles predefinidos con permisos granulares
- Permisos por módulo, acción y scope (propiedad, departamento)
- Override por usuario individual
- Doble autorización para acciones críticas (descuentos, cancelaciones, ajustes contables)

### Protección de datos
- Encriptación en tránsito (TLS 1.3)
- Encriptación en reposo (AES-256)
- PCI DSS compliance para datos de tarjetas (tokenización, no almacenamiento de PAN)
- GDPR/LFPDPPP: anonimización de datos de huéspedes bajo solicitud
- Audit trail inmutable

### Seguridad de API
- Rate limiting por IP y por API key
- Input validation (Zod schemas)
- SQL injection prevention (Prisma ORM parameterized queries)
- XSS prevention (React DOM escaping + CSP headers)
- CORS configurado por dominio

---

## Escalabilidad

### Horizontal
- API servers stateless → escalar con auto-scaling groups
- Read replicas de PostgreSQL para reportes
- Redis cluster para cache y sessions
- CDN para assets estáticos

### Vertical
- Índices optimizados en PostgreSQL para queries frecuentes
- Materializing views para reportes pesados
- Connection pooling (PgBouncer)
- Query optimization con EXPLAIN ANALYZE

### Performance targets

| Operación | Target |
|-----------|--------|
| Búsqueda de disponibilidad | < 200ms |
| Crear reservación | < 500ms |
| Check-in | < 300ms |
| Consulta de folio | < 200ms |
| Validación AI en POS | < 100ms |
| Dashboard load | < 1s |
| Reporte complejo | < 3s |
| Auditoría nocturna (400 habs) | < 2 min |

---

## Integraciones externas

### Channel Manager (2-way sync)
- **Protocolo:** REST API bidireccional
- **Sync:** Disponibilidad → CM cada 30s o por evento
- **Reservaciones:** CM → PMS vía webhook
- **Compatibilidad:** SiteMinder, D-EDGE, Omnibees, RateGain

### Pasarelas de pago
- **Tokenización** de tarjetas (nunca almacenar PAN)
- **Integración:** Stripe, Conekta, OpenPay, terminales bancarias
- **Pre-autorizaciones** para garantías de reservación

### Facturación electrónica (México)
- **CFDI 4.0** con timbrado vía PAC (Finkok, SW Sapien, Digicel)
- **Complementos de pago**
- **Cancelación con motivo**
- **Validación de RFC y razón social** ante SAT

### Cerraduras
- **Protocolo:** Vendor-specific APIs (ASSA ABLOY, Dormakaba, Salto)
- **Operación:** Generar llave digital al check-in, desactivar al check-out
- **Llaves digitales:** BLE/NFC vía app del huésped

### Mensajería
- **WhatsApp Business API** para confirmaciones, pre check-in, bienvenida
- **Email transaccional** vía Resend/SES
- **SMS** como fallback
- **Templates** configurables por tipo de mensaje

---

## DevOps y operaciones

### CI/CD
- **GitHub Actions** para CI (lint, test, build)
- **Deployment:** Blue-green en AWS ECS o Kubernetes
- **Environments:** development → staging → production
- **Feature flags:** para rollout gradual de funcionalidades

### Monitoreo
- **APM:** Datadog o New Relic
- **Logs:** Structured logging (JSON) → CloudWatch / ELK
- **Alertas:** PagerDuty para incidentes críticos
- **Uptime:** 99.9% SLA target

### Backups
- **PostgreSQL:** Automated daily + PITR (7 días retención)
- **S3:** Versionado habilitado
- **Redis:** Snapshots cada hora
- **Disaster Recovery:** RTO < 4 horas, RPO < 1 hora
