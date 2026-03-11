# G. Modelo de Datos Principal

---

## Diagrama de relaciones (simplificado)

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  Property    │────<│  RoomType    │────<│    Room      │
│             │     │              │     │              │
│  id         │     │  id          │     │  id          │
│  name       │     │  property_id │     │  room_type_id│
│  code       │     │  code        │     │  number      │
│  address    │     │  name        │     │  floor       │
│  timezone   │     │  base_occ    │     │  building    │
│  currency   │     │  max_occ     │     │  status      │
│  config     │     │  amenities   │     │  features    │
└─────────────┘     │  views       │     │  hk_status   │
                    │  bed_config  │     └──────┬───────┘
                    │  photos[]    │            │
                    └──────┬───────┘            │
                           │                    │
                    ┌──────┴───────┐            │
                    │   RateCode   │            │
                    │              │            │
                    │  id          │            │
                    │  room_type_id│            │
                    │  code        │            │
                    │  name        │            │
                    │  amount      │            │
                    │  currency    │            │
                    │  meal_plan   │            │
                    │  channel     │            │
                    │  season      │            │
                    │  restrictions│            │
                    └──────┬───────┘            │
                           │                    │
                    ┌──────┴────────────────────┴───────┐
                    │         Reservation               │
                    │                                    │
                    │  id                                │
                    │  confirmation_number               │
                    │  property_id                       │
                    │  guest_id ──────────────────────┐  │
                    │  room_type_id                   │  │
                    │  room_id (nullable, post-assign)│  │
                    │  rate_code_id                   │  │
                    │  group_id (nullable)            │  │
                    │  check_in_date                  │  │
                    │  check_out_date                 │  │
                    │  nights                         │  │
                    │  adults                         │  │
                    │  children                       │  │
                    │  status (confirmed/checked_in/  │  │
                    │   checked_out/cancelled/no_show)│  │
                    │  channel                        │  │
                    │  segment                        │  │
                    │  meal_plan_id                   │  │
                    │  total_rate                     │  │
                    │  special_requests               │  │
                    │  notes                          │  │
                    │  guarantee_type                 │  │
                    └──────────────┬──────────────────┘  │
                                   │                     │
                           ┌───────┴───────┐     ┌──────┴───────┐
                           │    Folio      │     │    Guest     │
                           │               │     │              │
                           │  id           │     │  id          │
                           │  reservation_id│    │  first_name  │
                           │  type (main/  │     │  last_name   │
                           │   split/master│     │  email       │
                           │   /sub)       │     │  phone       │
                           │  parent_id    │     │  nationality │
                           │  group_id     │     │  id_type     │
                           │  balance      │     │  id_number   │
                           │  status       │     │  tax_id      │
                           └───────┬───────┘     │  tax_name    │
                                   │             │  preferences │
                                   │             │  vip_level   │
                           ┌───────┴───────┐     │  loyalty_id  │
                           │  FolioCharge  │     │  blacklisted │
                           │               │     │  notes       │
                           │  id           │     │  photo_url   │
                           │  folio_id     │     └──────────────┘
                           │  type (room/  │
                           │   tax/pos/    │
                           │   service/    │
                           │   payment/    │
                           │   adjustment) │
                           │  description  │
                           │  amount       │
                           │  tax_amount   │
                           │  department_id│
                           │  outlet_id    │
                           │  pos_order_id │
                           │  posted_by    │
                           │  posted_at    │
                           │  auth_by      │
                           │  reversal_of  │
                           └───────────────┘
```

---

## Entidades detalladas

### Property (Hotel / Propiedad)
```sql
Property {
  id              UUID PRIMARY KEY
  code            VARCHAR(10) UNIQUE        -- "HPDA" (Hotel Playa Diamante Acapulco)
  name            VARCHAR(200)              -- "Hotel Playa Diamante"
  legal_name      VARCHAR(300)              -- Razón social
  tax_id          VARCHAR(20)               -- RFC
  address         JSONB                     -- {street, city, state, country, zip}
  phone           VARCHAR(20)
  email           VARCHAR(100)
  website         VARCHAR(200)
  timezone        VARCHAR(50)               -- "America/Mexico_City"
  currency        VARCHAR(3)                -- "MXN"
  star_rating     DECIMAL(2,1)
  total_rooms     INTEGER
  check_in_time   TIME                      -- 15:00
  check_out_time  TIME                      -- 12:00
  logo_url        VARCHAR(500)
  config          JSONB                     -- Configuraciones específicas
  is_active       BOOLEAN DEFAULT true
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ
}
```

### RoomType (Tipo de Habitación)
```sql
RoomType {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property
  code            VARCHAR(10)               -- "JRS", "STD-VM", "STE-OV"
  name            VARCHAR(100)              -- "Junior Suite Vista Mar"
  description     TEXT
  long_description TEXT                     -- Para booking engine
  base_occupancy  INTEGER                   -- 2
  max_occupancy   INTEGER                   -- 4
  max_adults      INTEGER                   -- 3
  max_children    INTEGER                   -- 2
  max_infants     INTEGER                   -- 1
  size_sqm        DECIMAL(6,1)              -- 45.0
  bed_configurations JSONB                  -- [{type: "king", qty: 1}, {type: "sofa_bed", qty: 1}]
  views           VARCHAR[]                 -- ["ocean", "garden"]
  amenities       VARCHAR[]                 -- ["wifi", "minibar", "safe", "jacuzzi"]
  features        JSONB                     -- {balcony: true, accessible: false, connecting: true}
  meal_plans      VARCHAR[]                 -- ["european", "all_inclusive"]
  building        VARCHAR(50)               -- "Torre Norte"
  floors          INTEGER[]                 -- [3, 4, 5, 6]
  photos          JSONB[]                   -- [{url, caption, order}]
  floor_plan_url  VARCHAR(500)
  sort_order      INTEGER
  is_active       BOOLEAN DEFAULT true
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ

  UNIQUE(property_id, code)
}
```

### Room (Habitación)
```sql
Room {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property
  room_type_id    UUID REFERENCES RoomType
  number          VARCHAR(10)               -- "301", "PH-01"
  floor           INTEGER                   -- 3
  building        VARCHAR(50)               -- "Torre Norte"
  zone            VARCHAR(50)               -- "Ala Este"
  status          ENUM('available','occupied','blocked','maintenance','out_of_order')
  hk_status       ENUM('clean','dirty','inspected','in_progress','out_of_service')
  is_accessible   BOOLEAN DEFAULT false
  connecting_room_id UUID REFERENCES Room   -- Habitación conectada
  features        JSONB                     -- Atributos específicos de esta habitación
  notes           TEXT
  sort_order      INTEGER
  is_active       BOOLEAN DEFAULT true
  out_of_order_reason TEXT
  out_of_order_until  DATE
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ

  UNIQUE(property_id, number)
}
```

### Guest (Huésped)
```sql
Guest {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property  -- NULL si es cross-property
  first_name      VARCHAR(100)
  last_name       VARCHAR(100)
  email           VARCHAR(200)
  phone           VARCHAR(30)
  phone_alt       VARCHAR(30)
  date_of_birth   DATE
  gender          ENUM('male','female','other','unspecified')
  nationality     VARCHAR(3)                -- ISO country code
  language        VARCHAR(5)                -- "es", "en"
  address         JSONB
  id_type         VARCHAR(30)               -- "passport", "ine", "drivers_license"
  id_number       VARCHAR(50)
  id_expiry       DATE
  id_photo_url    VARCHAR(500)
  tax_id          VARCHAR(20)               -- RFC para facturación
  tax_name        VARCHAR(300)              -- Razón social
  tax_address     JSONB
  tax_regime      VARCHAR(10)               -- Régimen fiscal
  tax_cfdi_use    VARCHAR(10)               -- Uso CFDI
  photo_url       VARCHAR(500)
  preferences     JSONB                     -- {bed: "king", floor: "high", pillow: "firm", allergies: ["shellfish"]}
  vip_level       INTEGER DEFAULT 0         -- 0=normal, 1=VIP, 2=VVIP
  loyalty_program VARCHAR(50)
  loyalty_id      VARCHAR(50)
  loyalty_level   VARCHAR(20)
  is_blacklisted  BOOLEAN DEFAULT false
  blacklist_reason TEXT
  notes           TEXT
  tags            VARCHAR[]                 -- ["frequent", "corporate", "wedding"]
  total_stays     INTEGER DEFAULT 0
  total_nights    INTEGER DEFAULT 0
  total_revenue   DECIMAL(12,2) DEFAULT 0
  last_stay_date  DATE
  company_id      UUID REFERENCES Account   -- Empresa asociada
  source          VARCHAR(50)               -- "direct", "ota", "agency"
  gdpr_consent    BOOLEAN DEFAULT false
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ
}
```

### Reservation (Reservación)
```sql
Reservation {
  id                  UUID PRIMARY KEY
  property_id         UUID REFERENCES Property
  confirmation_number VARCHAR(20) UNIQUE      -- "HPDA-2026-00001"
  guest_id            UUID REFERENCES Guest
  room_type_id        UUID REFERENCES RoomType
  room_id             UUID REFERENCES Room    -- Asignada al check-in
  rate_code_id        UUID REFERENCES RateCode
  group_id            UUID REFERENCES ReservationGroup -- NULL si individual
  meal_plan_id        UUID REFERENCES MealPlan
  package_id          UUID REFERENCES Package
  check_in_date       DATE
  check_out_date      DATE
  nights              INTEGER
  adults              INTEGER
  children            INTEGER
  infants             INTEGER
  status              ENUM('tentative','confirmed','checked_in','checked_out',
                           'cancelled','no_show','waitlisted')
  channel             VARCHAR(30)             -- "direct", "booking.com", "expedia", "agency"
  segment             VARCHAR(30)             -- "leisure", "corporate", "group", "wholesale"
  source              VARCHAR(50)             -- Fuente específica
  market              VARCHAR(30)             -- "domestic", "usa", "europe", "latam"
  rate_amount         DECIMAL(10,2)           -- Tarifa por noche
  rate_currency       VARCHAR(3)
  total_amount        DECIMAL(12,2)           -- Total de hospedaje
  deposit_amount      DECIMAL(10,2)           -- Depósito pagado
  guarantee_type      ENUM('credit_card','deposit','company','none')
  guarantee_details   JSONB                   -- {card_last4, card_token, company_id}
  special_requests    TEXT
  internal_notes      TEXT
  arrival_time        TIME
  departure_time      TIME
  is_early_checkin    BOOLEAN DEFAULT false
  is_late_checkout    BOOLEAN DEFAULT false
  wristband_color     VARCHAR(20)             -- Para AI
  wristband_number    VARCHAR(20)
  cancellation_date   TIMESTAMPTZ
  cancellation_reason TEXT
  cancelled_by        UUID
  no_show_date        TIMESTAMPTZ
  no_show_charge      DECIMAL(10,2)
  walk_hotel          VARCHAR(200)            -- Hotel destino si walk
  walk_cost           DECIMAL(10,2)
  external_ref        VARCHAR(100)            -- Referencia de OTA/channel
  created_by          UUID
  created_at          TIMESTAMPTZ
  updated_at          TIMESTAMPTZ
}
```

### Folio
```sql
Folio {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property
  reservation_id  UUID REFERENCES Reservation
  guest_id        UUID REFERENCES Guest
  group_id        UUID REFERENCES ReservationGroup
  folio_number    VARCHAR(20) UNIQUE        -- "F-2026-00001"
  type            ENUM('main','split','master','sub')
  parent_folio_id UUID REFERENCES Folio     -- Para split y sub-folios
  status          ENUM('open','closed','transferred')
  balance         DECIMAL(12,2) DEFAULT 0   -- Calculado: sum(cargos) - sum(pagos)
  total_charges   DECIMAL(12,2) DEFAULT 0
  total_payments  DECIMAL(12,2) DEFAULT 0
  routing_rules   JSONB                     -- [{charge_type: "room", target_folio: "master"}, ...]
  city_ledger_account_id UUID               -- Si se transfiere a CxC
  notes           TEXT
  closed_at       TIMESTAMPTZ
  closed_by       UUID
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ
}
```

### FolioCharge (Cargo/Abono a Folio)
```sql
FolioCharge {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property
  folio_id        UUID REFERENCES Folio
  transaction_type ENUM('charge','payment','adjustment','transfer')
  charge_type     ENUM('room','tax','pos','service','minibar','phone',
                       'laundry','spa','parking','event','package',
                       'deposit','payment','refund','adjustment')
  description     VARCHAR(300)
  amount          DECIMAL(10,2)             -- Positivo=cargo, Negativo=pago
  tax_amount      DECIMAL(10,2) DEFAULT 0
  currency        VARCHAR(3)
  department_id   UUID REFERENCES Department
  outlet_id       UUID REFERENCES Outlet    -- Si viene de POS
  pos_order_id    UUID REFERENCES PosOrder  -- Referencia a orden POS
  invoice_id      UUID REFERENCES Invoice   -- Si está facturado
  payment_method  ENUM('cash','credit_card','debit_card','transfer',
                       'city_ledger','ota_prepaid','included_ai')
  payment_ref     VARCHAR(100)              -- Referencia de pago
  is_included_ai  BOOLEAN DEFAULT false     -- ¿Consumo incluido en AI?
  meal_plan_id    UUID REFERENCES MealPlan  -- Plan que lo cubre
  business_date   DATE                      -- Fecha operativa
  posted_by       UUID REFERENCES User
  posted_at       TIMESTAMPTZ
  authorized_by   UUID REFERENCES User      -- Para descuentos/ajustes
  reversal_of     UUID REFERENCES FolioCharge -- Si es reverso de otro cargo
  reversed_by     UUID REFERENCES FolioCharge -- Si fue reversado
  is_void         BOOLEAN DEFAULT false
  void_reason     TEXT
  accounting_entry_id UUID                  -- Referencia a asiento contable
  created_at      TIMESTAMPTZ
}
```

### MealPlan (Plan Alimenticio)
```sql
MealPlan {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property
  code            VARCHAR(10)               -- "EP", "BB", "HB", "FB", "AI", "AIP"
  name            VARCHAR(100)              -- "All Inclusive Premium"
  description     TEXT
  type            ENUM('european','breakfast','half_board','full_board',
                       'all_inclusive','all_inclusive_premium','custom')
  rules           JSONB                     -- Reglas detalladas (ver abajo)
  wristband_color VARCHAR(20)               -- "green", "gold"
  adult_cost_per_night   DECIMAL(8,2)       -- Costo interno por noche adulto
  child_cost_per_night   DECIMAL(8,2)       -- Costo interno por noche niño
  is_active       BOOLEAN DEFAULT true
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ
}

-- Estructura de "rules" (JSONB):
-- {
--   "included_outlets": ["rest_buffet", "rest_specialty", "bar_lobby", "bar_pool", "bar_beach"],
--   "excluded_outlets": ["rest_premium", "spa"],
--   "schedules": {
--     "breakfast": {"from": "07:00", "to": "11:00", "outlets": ["rest_buffet"]},
--     "lunch": {"from": "12:00", "to": "16:00", "outlets": ["rest_buffet", "snack_bar"]},
--     "dinner": {"from": "18:00", "to": "22:00", "outlets": ["rest_buffet", "rest_specialty"]},
--     "snacks": {"from": "10:00", "to": "23:00", "outlets": ["snack_bar", "bar_pool"]},
--     "drinks": {"from": "10:00", "to": "01:00", "outlets": ["bar_lobby", "bar_pool", "bar_beach"]}
--   },
--   "included_categories": ["national_drinks", "house_wine", "domestic_beer", "soft_drinks"],
--   "premium_categories": ["imported_drinks", "premium_wine", "premium_spirits"],
--   "limits": {
--     "specialty_restaurant_per_stay": 2,
--     "room_service_per_day": 1,
--     "minibar_restock_per_day": 1
--   },
--   "age_rules": {
--     "adult_min_age": 18,
--     "child_min_age": 4,
--     "infant_max_age": 3,
--     "child_discount_pct": 50,
--     "infant_free": true
--   },
--   "included_activities": ["kayak", "snorkel", "gym", "kids_club", "pool"],
--   "included_amenities": ["wifi", "parking", "beach_towels"]
-- }
```

### ReservationGroup (Grupo)
```sql
ReservationGroup {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property
  group_number    VARCHAR(20) UNIQUE        -- "GRP-2026-0042"
  name            VARCHAR(200)              -- "Boda García-López"
  type            ENUM('tourist','corporate','wedding','convention',
                       'social','government','sports','incentive')
  account_id      UUID REFERENCES Account   -- Agencia/empresa
  contact_name    VARCHAR(200)
  contact_email   VARCHAR(200)
  contact_phone   VARCHAR(30)
  sales_exec_id   UUID REFERENCES User
  coordinator_id  UUID REFERENCES User      -- Coordinador operativo
  check_in_date   DATE
  check_out_date  DATE
  status          ENUM('tentative','definite','cancelled','completed')
  rooms_blocked   INTEGER                   -- Total de habitaciones bloqueadas
  rooms_picked    INTEGER                   -- Habitaciones tomadas
  cutoff_date     DATE                      -- Fecha de liberación
  rate_type       ENUM('net','commissionable')
  commission_pct  DECIMAL(4,2)
  contract_url    VARCHAR(500)
  payment_schedule JSONB                    -- [{date, amount, status, payment_id}]
  total_deposit_required DECIMAL(12,2)
  total_deposit_received DECIMAL(12,2) DEFAULT 0
  cancellation_policy TEXT
  special_conditions TEXT
  notes           TEXT
  master_folio_id UUID REFERENCES Folio
  routing_rules   JSONB                     -- Qué paga grupo vs huésped
  estimated_revenue DECIMAL(12,2)
  actual_revenue  DECIMAL(12,2) DEFAULT 0
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ
}
```

### GroupBlock (Bloqueo de Habitaciones de Grupo)
```sql
GroupBlock {
  id              UUID PRIMARY KEY
  group_id        UUID REFERENCES ReservationGroup
  room_type_id    UUID REFERENCES RoomType
  date            DATE
  blocked         INTEGER                   -- Habitaciones bloqueadas
  picked_up       INTEGER DEFAULT 0         -- Habitaciones tomadas
  rate_amount     DECIMAL(10,2)
  meal_plan_id    UUID REFERENCES MealPlan
  released        BOOLEAN DEFAULT false
  released_at     TIMESTAMPTZ

  UNIQUE(group_id, room_type_id, date)
}
```

### Event (Evento)
```sql
Event {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property
  group_id        UUID REFERENCES ReservationGroup  -- NULL si evento sin grupo
  event_number    VARCHAR(20) UNIQUE
  name            VARCHAR(200)
  type            ENUM('wedding','convention','meeting','gala_dinner',
                       'cocktail','conference','training','social','other')
  account_id      UUID REFERENCES Account
  contact_name    VARCHAR(200)
  contact_email   VARCHAR(200)
  contact_phone   VARCHAR(30)
  sales_exec_id   UUID REFERENCES User
  ops_coordinator_id UUID REFERENCES User
  start_date      DATE
  end_date        DATE
  attendees       INTEGER
  status          ENUM('inquiry','tentative','definite','cancelled','completed')
  estimated_revenue DECIMAL(12,2)
  actual_revenue  DECIMAL(12,2) DEFAULT 0
  notes           TEXT
  beo_url         VARCHAR(500)
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ
}
```

### Venue (Salón)
```sql
Venue {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property
  name            VARCHAR(100)              -- "Salón Diamante"
  code            VARCHAR(10)
  location        VARCHAR(100)              -- "Piso 2, ala norte"
  area_sqm        DECIMAL(8,2)
  ceiling_height  DECIMAL(4,2)
  configurations  JSONB                     -- [{setup: "theater", capacity: 500}, {setup: "banquet", capacity: 300}, ...]
  is_divisible    BOOLEAN DEFAULT false
  parent_venue_id UUID REFERENCES Venue     -- Si es subdivisión
  amenities       VARCHAR[]                 -- ["projector", "sound", "wifi", "ac", "natural_light"]
  photos          JSONB[]
  floor_plan_url  VARCHAR(500)
  hourly_rate     DECIMAL(8,2)
  half_day_rate   DECIMAL(8,2)
  full_day_rate   DECIMAL(8,2)
  notes           TEXT
  is_active       BOOLEAN DEFAULT true
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ
}
```

### VenueBooking (Reserva de Salón)
```sql
VenueBooking {
  id              UUID PRIMARY KEY
  event_id        UUID REFERENCES Event
  venue_id        UUID REFERENCES Venue
  date            DATE
  setup_time      TIME
  start_time      TIME
  end_time        TIME
  teardown_time   TIME
  setup_type      VARCHAR(30)               -- "theater", "banquet", "classroom", etc.
  attendees       INTEGER
  status          ENUM('tentative','confirmed','cancelled')
  rate            DECIMAL(10,2)
  notes           TEXT
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ

  -- Constraint: no overlap de mismo venue en mismo date/time
}
```

### Outlet (Centro de Consumo POS)
```sql
Outlet {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property
  code            VARCHAR(10)               -- "REST01", "BAR01"
  name            VARCHAR(100)              -- "Restaurante La Perla"
  type            ENUM('restaurant','bar','snack_bar','pool_bar','beach_bar',
                       'room_service','boutique','spa','activities',
                       'laundry','parking','other')
  location        VARCHAR(100)
  operating_hours JSONB                     -- {mon: {open: "07:00", close: "23:00"}, ...}
  tax_config      JSONB                     -- {iva: 16, ish: 3, tip_suggested: 15}
  accepts_room_charge BOOLEAN DEFAULT true
  accepts_ai      BOOLEAN DEFAULT true
  printer_config  JSONB                     -- Impresoras de cocina/bar
  table_layout    JSONB                     -- Diseño de mesas (si aplica)
  department_id   UUID REFERENCES Department
  cost_center_id  UUID REFERENCES CostCenter
  is_active       BOOLEAN DEFAULT true
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ
}
```

### PosOrder (Orden/Ticket POS)
```sql
PosOrder {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property
  outlet_id       UUID REFERENCES Outlet
  order_number    VARCHAR(20)
  table_number    VARCHAR(10)
  guest_id        UUID REFERENCES Guest
  room_id         UUID REFERENCES Room      -- Si cargo a habitación
  reservation_id  UUID REFERENCES Reservation
  server_id       UUID REFERENCES User      -- Mesero
  cashier_id      UUID REFERENCES User      -- Cajero
  status          ENUM('open','closed','voided')
  subtotal        DECIMAL(10,2)
  tax_amount      DECIMAL(10,2)
  tip_amount      DECIMAL(10,2)
  discount_amount DECIMAL(10,2) DEFAULT 0
  total           DECIMAL(10,2)
  payment_method  ENUM('room_charge','cash','credit_card','debit_card',
                       'transfer','included_ai','mixed')
  payment_details JSONB                     -- Detalle de pagos múltiples
  covers          INTEGER                   -- Número de comensales
  is_ai_included  BOOLEAN DEFAULT false     -- ¿Todo fue consumo AI incluido?
  ai_included_amount DECIMAL(10,2) DEFAULT 0 -- Monto de consumos incluidos
  ai_extra_amount    DECIMAL(10,2) DEFAULT 0 -- Monto de consumos extra
  folio_charge_id UUID REFERENCES FolioCharge -- Si se cargó a folio
  discount_reason TEXT
  discount_auth_by UUID REFERENCES User
  void_reason     TEXT
  void_auth_by    UUID REFERENCES User
  business_date   DATE
  opened_at       TIMESTAMPTZ
  closed_at       TIMESTAMPTZ
  created_at      TIMESTAMPTZ
}
```

### PosOrderItem (Detalle de Orden POS)
```sql
PosOrderItem {
  id              UUID PRIMARY KEY
  order_id        UUID REFERENCES PosOrder
  product_id      UUID REFERENCES Product
  quantity         DECIMAL(6,2)
  unit_price      DECIMAL(8,2)
  subtotal        DECIMAL(10,2)
  tax_amount      DECIMAL(8,2)
  discount_amount DECIMAL(8,2) DEFAULT 0
  total           DECIMAL(10,2)
  modifiers       JSONB                     -- ["sin cebolla", "extra queso"]
  course          INTEGER                   -- 1=entrada, 2=fuerte, 3=postre
  is_ai_included  BOOLEAN DEFAULT false     -- ¿Incluido en plan AI?
  is_voided       BOOLEAN DEFAULT false
  void_reason     TEXT
  sent_to_kitchen BOOLEAN DEFAULT false
  sent_at         TIMESTAMPTZ
  notes           TEXT
  created_at      TIMESTAMPTZ
}
```

### Account (Cuenta Comercial CRM)
```sql
Account {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property
  code            VARCHAR(20)
  name            VARCHAR(200)              -- "Viajes Premier"
  type            ENUM('agency','ota','dmc','corporate','wedding_planner',
                       'meeting_planner','tour_operator','government','other')
  tax_id          VARCHAR(20)
  tax_name        VARCHAR(300)
  contact_name    VARCHAR(200)
  contact_email   VARCHAR(200)
  contact_phone   VARCHAR(30)
  address         JSONB
  website         VARCHAR(200)
  sales_exec_id   UUID REFERENCES User
  commission_pct  DECIMAL(4,2)
  payment_terms   INTEGER                   -- Días de crédito
  credit_limit    DECIMAL(12,2)
  status          ENUM('active','inactive','prospect','suspended')
  contract_start  DATE
  contract_end    DATE
  contracted_rates JSONB                    -- Tarifas negociadas
  notes           TEXT
  tags            VARCHAR[]
  total_room_nights INTEGER DEFAULT 0
  total_revenue   DECIMAL(14,2) DEFAULT 0
  last_booking_date DATE
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ
}
```

### AccountingEntry (Asiento Contable / Póliza)
```sql
AccountingEntry {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property
  entry_number    VARCHAR(20)               -- "POL-2026-00001"
  type            ENUM('automatic','manual','night_audit','adjustment',
                       'closing','opening')
  source_module   VARCHAR(30)               -- "pms", "pos", "groups", "purchasing"
  source_ref      VARCHAR(50)               -- Referencia al documento origen
  description     VARCHAR(500)
  business_date   DATE
  period          VARCHAR(7)                -- "2026-03"
  status          ENUM('draft','posted','reversed')
  posted_by       UUID REFERENCES User
  posted_at       TIMESTAMPTZ
  reversed_by     UUID REFERENCES User
  reversed_at     TIMESTAMPTZ
  created_at      TIMESTAMPTZ
}

AccountingEntryLine {
  id              UUID PRIMARY KEY
  entry_id        UUID REFERENCES AccountingEntry
  account_id      UUID REFERENCES ChartOfAccount
  department_id   UUID REFERENCES Department
  cost_center_id  UUID REFERENCES CostCenter
  debit           DECIMAL(14,2) DEFAULT 0
  credit          DECIMAL(14,2) DEFAULT 0
  description     VARCHAR(300)
  reference       VARCHAR(100)
}
```

### Invoice (Factura)
```sql
Invoice {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property
  invoice_number  VARCHAR(30)
  type            ENUM('income','credit_note','payment_complement')
  guest_id        UUID REFERENCES Guest
  account_id      UUID REFERENCES Account
  group_id        UUID REFERENCES ReservationGroup
  tax_id          VARCHAR(20)               -- RFC receptor
  tax_name        VARCHAR(300)              -- Razón social
  cfdi_use        VARCHAR(10)               -- Uso CFDI
  payment_form    VARCHAR(5)                -- Forma de pago SAT
  payment_method  VARCHAR(5)                -- Método de pago SAT
  currency        VARCHAR(3)
  exchange_rate   DECIMAL(10,4)
  subtotal        DECIMAL(12,2)
  tax_total       DECIMAL(12,2)
  total           DECIMAL(12,2)
  uuid            VARCHAR(36)               -- UUID de timbrado
  xml_url         VARCHAR(500)
  pdf_url         VARCHAR(500)
  status          ENUM('draft','stamped','sent','paid','cancelled')
  cancellation_uuid VARCHAR(36)
  cancellation_reason VARCHAR(5)
  related_invoices JSONB                    -- Para notas de crédito
  due_date        DATE
  paid_date       DATE
  folio_charges   UUID[]                    -- Cargos incluidos en esta factura
  created_by      UUID REFERENCES User
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ
}
```

### Product (Producto para POS / Inventario)
```sql
Product {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property
  sku             VARCHAR(30)
  barcode         VARCHAR(50)
  name            VARCHAR(200)
  category_id     UUID REFERENCES ProductCategory
  type            ENUM('food','beverage','merchandise','service','amenity','supply')
  unit_of_measure VARCHAR(20)               -- "pieza", "kg", "litro", "porción"
  sale_price      DECIMAL(8,2)
  cost_price      DECIMAL(8,2)
  tax_rate        DECIMAL(4,2)              -- 0.16 para IVA
  is_ai_included  BOOLEAN DEFAULT false     -- Incluido en plan AI estándar
  ai_category     ENUM('included','premium','not_included')
  recipe_id       UUID REFERENCES Recipe    -- Si tiene receta
  track_inventory BOOLEAN DEFAULT true
  photo_url       VARCHAR(500)
  modifiers       JSONB                     -- Modificadores posibles
  is_active       BOOLEAN DEFAULT true
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ
}
```

### InventoryItem (Inventario en Almacén)
```sql
InventoryItem {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property
  product_id      UUID REFERENCES Product
  warehouse_id    UUID REFERENCES Warehouse
  quantity        DECIMAL(10,3)
  min_quantity    DECIMAL(10,3)
  max_quantity    DECIMAL(10,3)
  reorder_point   DECIMAL(10,3)
  avg_cost        DECIMAL(10,4)
  last_cost       DECIMAL(10,4)
  last_count_date DATE
  last_count_qty  DECIMAL(10,3)
  updated_at      TIMESTAMPTZ

  UNIQUE(product_id, warehouse_id)
}
```

### PurchaseOrder (Orden de Compra)
```sql
PurchaseOrder {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property
  po_number       VARCHAR(20) UNIQUE
  supplier_id     UUID REFERENCES Supplier
  warehouse_id    UUID REFERENCES Warehouse
  status          ENUM('draft','pending_approval','approved','ordered',
                       'partially_received','received','cancelled')
  subtotal        DECIMAL(12,2)
  tax_total       DECIMAL(12,2)
  total           DECIMAL(12,2)
  currency        VARCHAR(3)
  requested_by    UUID REFERENCES User
  approved_by     UUID REFERENCES User
  approved_at     TIMESTAMPTZ
  expected_date   DATE
  received_date   DATE
  notes           TEXT
  created_at      TIMESTAMPTZ
  updated_at      TIMESTAMPTZ
}
```

### MaintenanceTicket
```sql
MaintenanceTicket {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property
  ticket_number   VARCHAR(20)
  room_id         UUID REFERENCES Room      -- NULL si área común
  location        VARCHAR(200)              -- "Lobby", "Alberca", etc.
  category        ENUM('plumbing','electrical','ac','carpentry','painting',
                       'electronics','common_areas','other')
  priority        ENUM('low','medium','high','urgent')
  description     TEXT
  type            ENUM('corrective','preventive')
  status          ENUM('open','assigned','in_progress','waiting_parts',
                       'resolved','closed','cancelled')
  reported_by     UUID REFERENCES User
  assigned_to     UUID REFERENCES User
  estimated_cost  DECIMAL(8,2)
  actual_cost     DECIMAL(8,2)
  photos_before   VARCHAR[]
  photos_after    VARCHAR[]
  reported_at     TIMESTAMPTZ
  assigned_at     TIMESTAMPTZ
  started_at      TIMESTAMPTZ
  resolved_at     TIMESTAMPTZ
  closed_at       TIMESTAMPTZ
  resolution_notes TEXT
  created_at      TIMESTAMPTZ
}
```

### AuditLog (Bitácora de Auditoría)
```sql
AuditLog {
  id              UUID PRIMARY KEY
  property_id     UUID REFERENCES Property
  user_id         UUID REFERENCES User
  module          VARCHAR(30)               -- "pms", "pos", "finance"
  action          VARCHAR(30)               -- "create", "update", "delete", "void"
  entity_type     VARCHAR(50)               -- "reservation", "folio_charge"
  entity_id       UUID
  changes         JSONB                     -- {field: {from: "old", to: "new"}}
  ip_address      VARCHAR(45)
  user_agent      VARCHAR(500)
  created_at      TIMESTAMPTZ
}
```

---

## Índices críticos

```sql
-- Disponibilidad (query más frecuente)
CREATE INDEX idx_reservation_dates ON Reservation(property_id, check_in_date, check_out_date, status);
CREATE INDEX idx_reservation_room ON Reservation(room_id, check_in_date, check_out_date);
CREATE INDEX idx_group_block_lookup ON GroupBlock(group_id, room_type_id, date);

-- Room Rack
CREATE INDEX idx_room_status ON Room(property_id, status, hk_status);

-- Folios
CREATE INDEX idx_folio_reservation ON Folio(reservation_id);
CREATE INDEX idx_folio_charge_folio ON FolioCharge(folio_id, business_date);
CREATE INDEX idx_folio_charge_type ON FolioCharge(property_id, charge_type, business_date);

-- POS
CREATE INDEX idx_pos_order_outlet ON PosOrder(outlet_id, business_date, status);
CREATE INDEX idx_pos_order_room ON PosOrder(room_id, business_date);

-- Búsqueda de huéspedes
CREATE INDEX idx_guest_name ON Guest(property_id, last_name, first_name);
CREATE INDEX idx_guest_email ON Guest(email);

-- Auditoría
CREATE INDEX idx_audit_entity ON AuditLog(entity_type, entity_id);
CREATE INDEX idx_audit_user ON AuditLog(user_id, created_at);

-- Contabilidad
CREATE INDEX idx_accounting_period ON AccountingEntry(property_id, period, status);
```
