# O. Prompt para Generar Frontend y Backend del Sistema

---

## 1. Prompt para generar el backend (NestJS + Prisma + PostgreSQL)

```
Genera el backend enterprise de "Hotelia", un PMS hotelero de nueva generación,
usando el siguiente stack:

STACK:
- Runtime: Node.js 22 LTS con TypeScript 5.x strict mode
- Framework: NestJS 11+ con módulos, DI, guards, interceptors, pipes
- ORM: Prisma 6+ con PostgreSQL 16
- Auth: JWT (access token 15min + refresh token 7d) con passport-jwt
- Authorization: CASL para permisos granulares RBAC+ABAC
- Validation: Zod schemas compartidos con frontend (via paquete @hotelia/shared)
- Queue: BullMQ con Redis para jobs asíncronos (night audit, reportes, emails)
- Events: EventEmitter2 para comunicación interna entre módulos
- Cache: Redis para sessions, disponibilidad cache, rate limiting
- Real-time: WebSocket gateway (Socket.io) para room rack, housekeeping, POS
- File Storage: S3-compatible (AWS S3 o MinIO)
- Email: Resend SDK
- PDF: Puppeteer para facturas, BEOs, reportes
- Search: Meilisearch para búsqueda global
- Testing: Jest + Supertest para unit e integration tests
- Docs: Swagger/OpenAPI auto-generado con @nestjs/swagger

ESTRUCTURA DE MÓDULOS:
src/
├── main.ts
├── app.module.ts
├── config/
│   ├── configuration.ts          # Configuración centralizada
│   ├── database.config.ts
│   ├── redis.config.ts
│   ├── jwt.config.ts
│   └── s3.config.ts
│
├── common/
│   ├── database/
│   │   ├── prisma.service.ts     # Prisma client singleton
│   │   └── prisma.module.ts
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts    # Login, refresh, logout
│   │   ├── auth.service.ts
│   │   ├── jwt.strategy.ts
│   │   ├── jwt-auth.guard.ts
│   │   └── current-user.decorator.ts
│   ├── authorization/
│   │   ├── casl-ability.factory.ts
│   │   ├── policies.guard.ts
│   │   └── check-policies.decorator.ts
│   ├── tenant/
│   │   ├── tenant.middleware.ts   # Extrae property_id del JWT/header
│   │   ├── tenant.guard.ts       # Valida acceso a la propiedad
│   │   └── tenant.decorator.ts   # @CurrentProperty()
│   ├── audit/
│   │   ├── audit.interceptor.ts  # Registra cambios automáticamente
│   │   └── audit.service.ts
│   ├── events/
│   │   ├── events.module.ts
│   │   └── events.service.ts     # EventEmitter2 wrapper
│   ├── search/
│   │   ├── search.module.ts
│   │   └── search.service.ts     # Meilisearch client
│   ├── notifications/
│   │   ├── notifications.module.ts
│   │   ├── notifications.gateway.ts  # WebSocket
│   │   └── notifications.service.ts
│   ├── files/
│   │   ├── files.module.ts
│   │   └── files.service.ts      # S3 upload/download
│   ├── pdf/
│   │   ├── pdf.module.ts
│   │   └── pdf.service.ts        # Puppeteer PDF generation
│   ├── email/
│   │   ├── email.module.ts
│   │   └── email.service.ts      # Resend
│   ├── pipes/
│   │   └── zod-validation.pipe.ts
│   ├── interceptors/
│   │   ├── transform.interceptor.ts   # Response wrapper
│   │   └── logging.interceptor.ts
│   ├── filters/
│   │   └── http-exception.filter.ts
│   └── utils/
│       ├── pagination.ts
│       ├── date.utils.ts
│       └── confirmation-number.ts  # Generador de números de confirmación
│
├── modules/
│   ├── pms/
│   │   ├── pms.module.ts
│   │   ├── reservations/
│   │   │   ├── reservations.controller.ts
│   │   │   ├── reservations.service.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-reservation.dto.ts  # Zod schema
│   │   │   │   ├── update-reservation.dto.ts
│   │   │   │   └── reservation-filters.dto.ts
│   │   │   └── reservations.module.ts
│   │   ├── availability/
│   │   │   ├── availability.controller.ts
│   │   │   ├── availability.service.ts  # Motor de disponibilidad
│   │   │   └── availability.module.ts
│   │   ├── check-in-out/
│   │   │   ├── check-in-out.controller.ts
│   │   │   ├── check-in.service.ts
│   │   │   ├── check-out.service.ts
│   │   │   └── check-in-out.module.ts
│   │   ├── folios/
│   │   │   ├── folios.controller.ts
│   │   │   ├── folios.service.ts
│   │   │   ├── charges.service.ts
│   │   │   └── folios.module.ts
│   │   ├── rooms/
│   │   │   ├── rooms.controller.ts
│   │   │   ├── rooms.service.ts
│   │   │   ├── room-types.controller.ts
│   │   │   ├── room-types.service.ts
│   │   │   └── rooms.module.ts
│   │   ├── guests/
│   │   │   ├── guests.controller.ts
│   │   │   ├── guests.service.ts
│   │   │   └── guests.module.ts
│   │   └── rates/
│   │       ├── rates.controller.ts
│   │       ├── rates.service.ts
│   │       └── rates.module.ts
│   │
│   ├── pos/
│   │   ├── pos.module.ts
│   │   ├── outlets/
│   │   ├── orders/
│   │   ├── products/
│   │   ├── cash-register/
│   │   └── kitchen/
│   │
│   ├── all-inclusive/
│   │   ├── all-inclusive.module.ts
│   │   ├── plans/
│   │   ├── rules/
│   │   ├── validation/
│   │   │   └── eligibility.service.ts  # Motor de validación de elegibilidad
│   │   └── wristbands/
│   │
│   ├── groups/
│   │   ├── groups.module.ts
│   │   ├── groups/
│   │   ├── events/
│   │   ├── venues/
│   │   ├── beo/
│   │   └── quotes/
│   │
│   ├── finance/
│   │   ├── finance.module.ts
│   │   ├── accounting/
│   │   ├── accounts-receivable/
│   │   ├── accounts-payable/
│   │   ├── invoicing/         # CFDI
│   │   ├── banking/
│   │   └── night-audit/
│   │       ├── night-audit.controller.ts
│   │       ├── night-audit.service.ts
│   │       └── night-audit.processor.ts  # BullMQ job
│   │
│   ├── revenue/
│   │   ├── revenue.module.ts
│   │   ├── forecast/
│   │   ├── pricing/
│   │   ├── restrictions/
│   │   └── analytics/
│   │
│   ├── crm/
│   │   ├── crm.module.ts
│   │   ├── accounts/
│   │   ├── pipeline/
│   │   ├── contracts/
│   │   └── commissions/
│   │
│   ├── operations/
│   │   ├── operations.module.ts
│   │   ├── housekeeping/
│   │   ├── maintenance/
│   │   ├── inventory/
│   │   └── purchasing/
│   │
│   ├── bi/
│   │   ├── bi.module.ts
│   │   ├── dashboards/
│   │   ├── reports/
│   │   └── exports/
│   │
│   └── integrations/
│       ├── integrations.module.ts
│       ├── channel-manager/
│       ├── payment-gateway/
│       ├── cfdi/              # PAC integration
│       ├── locks/             # Door locks
│       ├── messaging/         # WhatsApp, email, SMS
│       └── webhooks/
│
└── prisma/
    ├── schema.prisma
    ├── migrations/
    └── seed.ts

PATRONES A SEGUIR:
1. Cada módulo es auto-contenido con su controller, service, DTOs, module
2. DTOs usan Zod schemas (no class-validator) para validación compartida con frontend
3. Todos los endpoints requieren autenticación (JWT guard global)
4. Permisos verificados con CASL policies guard
5. Multi-tenant vía middleware que inyecta property_id del JWT
6. Eventos emitidos para comunicación entre módulos (ej: reservation.created)
7. Audit interceptor registra automáticamente cambios en entidades críticas
8. Paginación estándar: ?page=1&perPage=50&sort=-createdAt&filter[status]=confirmed
9. Respuestas envueltas: { data: T, meta?: PaginationMeta }
10. Error handling consistente con HttpException filter

ENDPOINTS CLAVE A GENERAR COMPLETOS:
- POST /auth/login, POST /auth/refresh, POST /auth/logout
- CRUD /reservations con filtros avanzados
- GET /availability?from=&to=&roomType= (motor de disponibilidad)
- POST /reservations/:id/check-in
- POST /reservations/:id/check-out
- CRUD /folios/:id/charges, /folios/:id/payments
- POST /pos/outlets/:id/orders (crear orden POS)
- POST /pos/orders/:id/charge-room (cargo a habitación)
- POST /all-inclusive/validate (validar elegibilidad)
- POST /night-audit/execute (ejecutar auditoría nocturna)
- GET /dashboards/:role (dashboard por rol)

Genera el código completo y funcional para los módulos core (auth, PMS, POS core,
all-inclusive validation).
```

---

## 2. Prompt para generar el frontend (Next.js + React)

```
Genera el frontend de "Hotelia", un PMS hotelero de nueva generación,
usando el siguiente stack:

STACK:
- Framework: Next.js 15+ con App Router
- UI: React 19+ con Server Components donde aplique
- Styling: Tailwind CSS 4+ con design tokens custom
- Components: Radix UI (primitives) + custom components
- State: Zustand para UI state + TanStack Query v5 para server state
- Forms: React Hook Form + Zod (schemas compartidos con backend)
- Tables: TanStack Table v8 con virtualización
- Calendars: Custom calendar components sobre base de date-fns
- Charts: Recharts
- DnD: dnd-kit
- Real-time: Socket.io client
- Icons: Lucide React
- Animation: Framer Motion (minimal, solo transiciones útiles)
- Testing: Vitest + Testing Library + Playwright (e2e)

ESTRUCTURA:
app/
├── layout.tsx                    # Root layout con providers
├── (auth)/
│   └── login/page.tsx
├── (dashboard)/
│   ├── layout.tsx               # Layout con sidebar + topbar
│   ├── page.tsx                 # Dashboard principal (por rol)
│   │
│   ├── pms/
│   │   ├── reservations/
│   │   │   ├── page.tsx         # Lista de reservaciones
│   │   │   ├── new/page.tsx     # Nueva reservación (wizard)
│   │   │   └── [id]/page.tsx    # Detalle de reservación
│   │   ├── availability/
│   │   │   └── page.tsx         # Calendar view de disponibilidad
│   │   ├── room-rack/
│   │   │   └── page.tsx         # Room rack visual (tape chart)
│   │   ├── check-in/
│   │   │   └── page.tsx         # Flujo de check-in
│   │   ├── check-out/
│   │   │   └── page.tsx         # Flujo de check-out
│   │   ├── arrivals/
│   │   │   └── page.tsx         # Lista de llegadas del día
│   │   ├── departures/
│   │   │   └── page.tsx         # Lista de salidas del día
│   │   ├── in-house/
│   │   │   └── page.tsx         # Huéspedes in-house
│   │   ├── guests/
│   │   │   ├── page.tsx         # Directorio de huéspedes
│   │   │   └── [id]/page.tsx    # Perfil de huésped
│   │   └── folios/
│   │       └── [id]/page.tsx    # Detalle de folio
│   │
│   ├── pos/
│   │   ├── [outletId]/
│   │   │   └── page.tsx         # POS de venta (pantalla principal)
│   │   ├── cash-close/
│   │   │   └── page.tsx         # Cierre de caja
│   │   └── config/
│   │       └── page.tsx         # Configuración de outlets
│   │
│   ├── groups/
│   │   ├── page.tsx             # Lista de grupos
│   │   ├── new/page.tsx         # Crear grupo
│   │   └── [id]/page.tsx        # Detalle de grupo (tabs)
│   │
│   ├── events/
│   │   ├── page.tsx             # Lista de eventos
│   │   ├── calendar/page.tsx    # Calendario de salones
│   │   ├── new/page.tsx         # Crear evento
│   │   └── [id]/page.tsx        # Detalle de evento + BEO
│   │
│   ├── crm/
│   │   ├── accounts/
│   │   │   ├── page.tsx         # Lista de cuentas
│   │   │   └── [id]/page.tsx    # Detalle de cuenta
│   │   ├── pipeline/
│   │   │   └── page.tsx         # Pipeline Kanban
│   │   └── quotes/
│   │       └── page.tsx         # Cotizaciones
│   │
│   ├── revenue/
│   │   ├── page.tsx             # Dashboard de revenue
│   │   ├── rates/page.tsx       # Calendario tarifario
│   │   ├── forecast/page.tsx    # Forecast
│   │   └── restrictions/page.tsx # Restricciones
│   │
│   ├── finance/
│   │   ├── page.tsx             # Dashboard financiero
│   │   ├── accounting/page.tsx  # Contabilidad
│   │   ├── ar/page.tsx          # CxC
│   │   ├── ap/page.tsx          # CxP
│   │   ├── invoicing/page.tsx   # Facturación
│   │   ├── banking/page.tsx     # Bancos
│   │   └── night-audit/page.tsx # Auditoría nocturna
│   │
│   ├── operations/
│   │   ├── housekeeping/page.tsx # Tablero de housekeeping
│   │   ├── maintenance/page.tsx  # Tickets de mantenimiento
│   │   ├── inventory/page.tsx    # Inventarios
│   │   └── purchasing/page.tsx   # Compras
│   │
│   ├── reports/
│   │   └── page.tsx             # Centro de reportes
│   │
│   └── admin/
│       ├── rooms/page.tsx       # Gestión de habitaciones
│       ├── room-types/page.tsx  # Gestión de tipos
│       ├── users/page.tsx       # Usuarios
│       ├── roles/page.tsx       # Roles y permisos
│       └── settings/page.tsx    # Configuración general
│
├── components/
│   ├── ui/                      # Componentes base (Button, Input, Select, Modal, etc.)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── modal.tsx
│   │   ├── side-panel.tsx       # Panel lateral deslizable
│   │   ├── data-table.tsx       # Tabla con sort, filter, pagination
│   │   ├── command-palette.tsx  # Búsqueda global (Cmd+K)
│   │   ├── calendar.tsx         # Calendar picker
│   │   ├── date-range-picker.tsx
│   │   ├── badge.tsx
│   │   ├── tooltip.tsx
│   │   ├── tabs.tsx
│   │   ├── card.tsx
│   │   ├── kpi-card.tsx         # Card de KPI con valor, variación, trend
│   │   ├── skeleton.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── sidebar.tsx          # Sidebar de navegación
│   │   ├── topbar.tsx           # Topbar con búsqueda y perfil
│   │   ├── notification-panel.tsx
│   │   └── breadcrumbs.tsx
│   │
│   ├── pms/
│   │   ├── availability-calendar.tsx  # Calendar view de disponibilidad
│   │   ├── room-rack.tsx              # Room rack visual
│   │   ├── reservation-card.tsx       # Card de reservación
│   │   ├── reservation-wizard.tsx     # Wizard de nueva reservación
│   │   ├── check-in-flow.tsx          # Flujo de check-in
│   │   ├── folio-detail.tsx           # Detalle de folio
│   │   ├── guest-profile.tsx          # Perfil de huésped
│   │   └── arrivals-list.tsx          # Lista de llegadas
│   │
│   ├── pos/
│   │   ├── pos-terminal.tsx           # Pantalla principal POS
│   │   ├── product-grid.tsx           # Grid de productos
│   │   ├── order-panel.tsx            # Panel de cuenta/orden
│   │   ├── payment-modal.tsx          # Modal de cobro
│   │   ├── ai-indicator.tsx           # Indicador de all inclusive
│   │   └── cash-close-report.tsx      # Reporte de cierre de caja
│   │
│   ├── groups/
│   │   ├── group-detail.tsx           # Detalle de grupo (tabs)
│   │   ├── rooming-list.tsx           # Rooming list editable
│   │   ├── venue-calendar.tsx         # Calendario de salones
│   │   └── beo-document.tsx           # Documento BEO
│   │
│   ├── crm/
│   │   ├── pipeline-board.tsx         # Kanban board
│   │   ├── account-card.tsx
│   │   └── quotation-builder.tsx
│   │
│   ├── revenue/
│   │   ├── rate-calendar.tsx          # Calendario tarifario editable
│   │   ├── forecast-chart.tsx
│   │   └── restriction-grid.tsx
│   │
│   ├── finance/
│   │   ├── night-audit-panel.tsx
│   │   ├── invoice-form.tsx
│   │   ├── aged-receivables.tsx
│   │   └── reconciliation-view.tsx
│   │
│   ├── dashboards/
│   │   ├── gm-dashboard.tsx           # Dashboard Director General
│   │   ├── front-desk-dashboard.tsx   # Dashboard Recepción
│   │   ├── revenue-dashboard.tsx      # Dashboard Revenue
│   │   ├── sales-dashboard.tsx        # Dashboard Ventas
│   │   └── finance-dashboard.tsx      # Dashboard Finanzas
│   │
│   └── charts/
│       ├── occupancy-chart.tsx
│       ├── revenue-by-dept.tsx
│       ├── trend-line.tsx
│       └── bar-comparison.tsx
│
├── hooks/
│   ├── use-reservations.ts      # TanStack Query hooks para reservaciones
│   ├── use-availability.ts      # Hook de disponibilidad
│   ├── use-folio.ts
│   ├── use-pos-order.ts
│   ├── use-groups.ts
│   ├── use-auth.ts
│   ├── use-websocket.ts         # Socket.io hook
│   ├── use-keyboard-shortcuts.ts
│   ├── use-search.ts            # Búsqueda global
│   └── use-notifications.ts
│
├── stores/
│   ├── ui.store.ts              # Sidebar, theme, modals
│   ├── pos.store.ts             # Estado del POS (orden actual)
│   └── filters.store.ts        # Filtros persistentes
│
├── lib/
│   ├── api.ts                   # Axios/fetch client configurado
│   ├── auth.ts                  # Token management
│   ├── websocket.ts             # Socket.io client
│   ├── format.ts                # Formateo de moneda, fechas, números
│   └── constants.ts             # Colores, estados, enums
│
├── styles/
│   ├── globals.css              # Tailwind base + custom properties
│   └── themes/
│       ├── light.css
│       └── dark.css
│
└── types/
    ├── api.types.ts             # Tipos de respuesta API
    ├── reservation.types.ts
    ├── folio.types.ts
    ├── pos.types.ts
    ├── group.types.ts
    └── ...

DESIGN TOKENS (Tailwind config):
- Colors: primary (#2563EB), success (#059669), warning (#D97706), danger (#DC2626),
  info (#7C3AED), backgrounds, borders, text levels
- Typography: Inter (sans), JetBrains Mono (mono)
- Spacing: 4px base grid
- Radius: sm (4px), md (8px), lg (12px), xl (16px)
- Shadows: minimal (sm, md only)
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1440px)

COMPONENTES CLAVE A GENERAR COMPLETOS:

1. AvailabilityCalendar
   - Grid: room types × dates
   - Color coding por nivel de disponibilidad
   - Hover tooltip con desglose
   - Drag to select dates for new reservation
   - Filtros en toolbar
   - Lazy loading horizontal scroll

2. RoomRack
   - Grid: individual rooms × dates
   - Reservation blocks with drag and drop
   - Color by segment/plan
   - HK status indicators
   - Click for reservation detail (side panel)

3. POSTerminal
   - 3-column layout: order | products | actions
   - AI inclusion indicator per item
   - Room charge validation
   - Real-time total calculation
   - Touch-friendly for tablet

4. CommandPalette (Cmd+K)
   - Fuzzy search across: guests, reservations, rooms, groups, accounts
   - Quick actions: "New reservation", "Check-in 301"
   - Navigation: "Go to Revenue", "Go to Housekeeping"
   - Keyboard navigation

5. GMDashboard
   - KPI cards row (occupation, ADR, RevPAR, TRevPAR, revenue)
   - Occupancy chart (30 days)
   - Revenue by department
   - Today's movement (arrivals, departures, in-house)
   - Alerts panel

Genera código funcional completo para los componentes core con datos de ejemplo.
Incluye responsive design y dark mode support.
```

---

## 3. Prompt para paquete compartido (@hotelia/shared)

```
Genera un paquete TypeScript compartido entre frontend y backend para Hotelia.

Nombre: @hotelia/shared

Contenido:
1. Zod schemas para todos los DTOs principales (reservation, guest, folio, pos order, etc.)
2. TypeScript types derivados de los Zod schemas (z.infer<typeof schema>)
3. Enums compartidos (ReservationStatus, RoomStatus, PaymentMethod, etc.)
4. Constantes (colores de estados, formatos de fecha, monedas)
5. Utilidades de formateo (moneda, fecha, porcentaje)
6. Utilidades de validación (RFC, email, phone)

Estructura:
packages/shared/
├── src/
│   ├── schemas/
│   │   ├── reservation.schema.ts
│   │   ├── guest.schema.ts
│   │   ├── folio.schema.ts
│   │   ├── pos-order.schema.ts
│   │   ├── group.schema.ts
│   │   ├── event.schema.ts
│   │   ├── room.schema.ts
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts           # All inferred types
│   ├── enums/
│   │   └── index.ts           # All enums
│   ├── constants/
│   │   └── index.ts
│   ├── utils/
│   │   ├── format.ts
│   │   ├── validation.ts
│   │   └── date.ts
│   └── index.ts               # Barrel export
├── package.json
└── tsconfig.json

Genera el código completo del paquete.
```

---

## 4. Prompt para monorepo setup

```
Configura un monorepo con Turborepo para Hotelia con la siguiente estructura:

hotelia/
├── turbo.json
├── package.json
├── pnpm-workspace.yaml
├── .env.example
├── docker-compose.yml          # PostgreSQL + Redis + Meilisearch + MinIO
│
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   └── ...
│   ├── api/                    # NestJS backend
│   │   ├── package.json
│   │   ├── nest-cli.json
│   │   └── ...
│   └── mobile/                 # React Native (future)
│       └── package.json
│
├── packages/
│   ├── shared/                 # @hotelia/shared (Zod schemas, types, enums)
│   │   └── package.json
│   ├── ui/                     # @hotelia/ui (shared React components)
│   │   └── package.json
│   └── config/                 # @hotelia/config (ESLint, TSConfig, Tailwind)
│       ├── eslint/
│       ├── typescript/
│       └── tailwind/
│
└── prisma/
    ├── schema.prisma
    ├── migrations/
    └── seed.ts

Pipelines de Turborepo:
- build: apps/web, apps/api (dependen de packages/*)
- dev: desarrollo paralelo de web + api
- lint: ESLint en todos los paquetes
- test: Jest/Vitest en todos los paquetes
- db:migrate: Prisma migrate
- db:seed: Prisma seed

Docker Compose con:
- PostgreSQL 16 (puerto 5432)
- Redis 7 (puerto 6379)
- Meilisearch (puerto 7700)
- MinIO (puertos 9000, 9001)

Genera configuración completa y funcional.
```
