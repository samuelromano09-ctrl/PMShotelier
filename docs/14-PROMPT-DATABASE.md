# N. Prompt para Generar el Esquema de Base de Datos

---

## Prompt para generar schema Prisma completo

```
Genera el schema de Prisma (prisma/schema.prisma) para un PMS hotelero llamado "Hotelia"
usando PostgreSQL como base de datos.

CONTEXTO:
- Hotel resort de playa, 400+ habitaciones
- Operación: all inclusive + plan europeo + grupos + eventos + múltiples outlets POS
- Plataforma unificada: PMS + POS + CRS + ERP + CRM + Grupos/Eventos + Inventarios + BI
- Multi-tenant por property_id (Row Level Security)
- Soft deletes donde aplique
- Audit trail en tablas dedicadas
- Todas las tablas con created_at y updated_at
- UUIDs como primary keys

ENTIDADES PRINCIPALES (genera con todos sus campos, relaciones y enums):

1. PROPERTY (Hotel)
   - Datos generales, dirección, configuración, timezone, moneda
   - Relación 1:N con todas las entidades principales

2. ROOM TYPE
   - Código, nombre, descripciones, capacidad (adultos, niños, infantes)
   - Configuración de camas (JSON), vistas, amenidades, features
   - Fotos (JSON array), plano, planes aplicables (EP/AI)
   - Edificio, pisos, sort order, activo/inactivo
   - Relación 1:N con Room, 1:N con RateCode

3. ROOM
   - Número, piso, edificio, zona
   - Status (available, occupied, blocked, maintenance, out_of_order)
   - HK status (clean, dirty, inspected, in_progress, out_of_service)
   - Accesible, connecting room, features específicas
   - Relación N:1 con RoomType

4. GUEST
   - Datos personales, contacto, nacionalidad, idioma
   - Identificación oficial (tipo, número, foto)
   - Datos fiscales (RFC, razón social, régimen, uso CFDI)
   - Preferencias (JSON), VIP level, loyalty
   - Blacklist, notas, tags
   - Estadísticas acumuladas (total stays, nights, revenue)
   - Relación 1:N con Reservation

5. RESERVATION
   - Confirmation number (unique, generado)
   - Guest, RoomType, Room (nullable pre-asignación)
   - RateCode, Group (nullable), MealPlan, Package
   - Fechas, noches, adultos, niños, infantes
   - Status enum (tentative, confirmed, checked_in, checked_out, cancelled, no_show, waitlisted)
   - Channel, segment, source, market
   - Rate amount, total, deposit
   - Guarantee (type + details JSON)
   - Special requests, notes, arrival/departure time
   - Early CI, late CO, wristband
   - Cancellation fields, no show fields, walk fields
   - External reference (OTA booking ID)
   - Relación 1:N con Folio

6. FOLIO
   - Folio number (unique, generado)
   - Type enum (main, split, master, sub)
   - Parent folio (self-relation para splits y subfolios)
   - Balance, total charges, total payments
   - Routing rules (JSON)
   - Status (open, closed, transferred)
   - City ledger account reference
   - Relación 1:N con FolioCharge

7. FOLIO CHARGE
   - Transaction type enum (charge, payment, adjustment, transfer)
   - Charge type enum (room, tax, pos, service, minibar, phone, laundry,
     spa, parking, event, package, deposit, payment, refund, adjustment)
   - Description, amount, tax amount, currency
   - Department, outlet, POS order reference
   - Payment method enum
   - Is AI included flag, meal plan reference
   - Business date
   - Posted by, posted at, authorized by
   - Reversal tracking (reversal_of, reversed_by)
   - Void flag + reason
   - Accounting entry reference

8. MEAL PLAN
   - Code (EP, BB, HB, FB, AI, AIP), name, description
   - Type enum
   - Rules (JSON complejo con outlets, horarios, categorías, límites, edades)
   - Wristband color
   - Costo por noche adulto/niño

9. RATE CODE
   - Room type, code, name, amount, currency
   - Meal plan reference
   - Channel, segment, season
   - Restrictions (JSON: minLOS, maxLOS, CTA, CTD, stop_sell)
   - Net vs commissionable
   - Per person vs per room
   - Supplements (JSON)
   - Vigencia (valid_from, valid_to)

10. RESERVATION GROUP
    - Group number (unique), name, type enum
    - Account (agency/company), contacts
    - Sales exec, ops coordinator
    - Dates, status enum (tentative, definite, cancelled, completed)
    - Rooms blocked, rooms picked, cutoff date
    - Rate type, commission
    - Payment schedule (JSON), deposits required/received
    - Cancellation policy, conditions
    - Master folio reference
    - Routing rules (JSON)
    - Revenue estimated/actual

11. GROUP BLOCK
    - Group, RoomType, date
    - Blocked, picked_up, rate_amount
    - Meal plan, released flag
    - Unique constraint: group + room_type + date

12. EVENT
    - Event number, name, type enum
    - Group reference (nullable)
    - Account, contacts
    - Sales exec, ops coordinator
    - Dates, attendees, status enum
    - Revenue estimated/actual

13. VENUE (Salón)
    - Name, code, location, area, ceiling height
    - Configurations (JSON array: [{setup, capacity}])
    - Divisible, parent venue (self-relation)
    - Amenities, photos, floor plan
    - Rates (hourly, half day, full day)

14. VENUE BOOKING
    - Event, venue, date
    - Times (setup, start, end, teardown)
    - Setup type, attendees, status, rate

15. BEO (Banquet Event Order)
    - Event reference
    - Version, status (draft, approved, distributed)
    - Content (JSON with full event details)
    - Approved by, distributed to

16. OUTLET (Centro de consumo POS)
    - Code, name, type enum (restaurant, bar, snack_bar, pool_bar, etc.)
    - Location, operating hours (JSON)
    - Tax config (JSON), printer config (JSON)
    - Accepts room charge, accepts AI
    - Department, cost center

17. POS ORDER
    - Order number, table, guest, room, reservation
    - Server, cashier
    - Status (open, closed, voided)
    - Subtotal, tax, tip, discount, total
    - Payment method, payment details (JSON)
    - Covers
    - AI flags: is_ai_included, ai_included_amount, ai_extra_amount
    - Folio charge reference
    - Discount/void authorization
    - Business date, opened/closed timestamps

18. POS ORDER ITEM
    - Order, product, quantity, prices, tax, discount, total
    - Modifiers (JSON), course number
    - AI included flag
    - Void flag + reason
    - Kitchen sent flag

19. PRODUCT
    - SKU, barcode, name, category
    - Type enum (food, beverage, merchandise, service, amenity, supply)
    - Unit, sale price, cost price, tax rate
    - AI category enum (included, premium, not_included)
    - Recipe reference, track inventory flag

20. PRODUCT CATEGORY
    - Name, parent category (self-relation for hierarchy), sort order

21. RECIPE
    - Product output, yield, theoretical cost
    - Relación 1:N con RecipeIngredient

22. RECIPE INGREDIENT
    - Recipe, product (ingredient), quantity, unit, cost

23. WAREHOUSE
    - Name, type, location

24. INVENTORY ITEM
    - Product, warehouse, quantity, min, max, reorder point
    - Avg cost, last cost, last count
    - Unique: product + warehouse

25. INVENTORY MOVEMENT
    - Product, warehouse, type enum (purchase, sale, transfer_in, transfer_out,
      adjustment, waste, count)
    - Quantity, cost, reference, notes

26. PURCHASE ORDER
    - PO number, supplier, warehouse
    - Status enum, amounts, currency
    - Requested by, approved by, dates

27. PURCHASE ORDER ITEM
    - PO, product, quantity, unit price, tax, total
    - Received quantity

28. SUPPLIER
    - Name, tax_id, contacts, address, payment terms, rating

29. ACCOUNT (CRM)
    - Code, name, type enum (agency, ota, dmc, corporate, etc.)
    - Tax info, contacts, address
    - Sales exec, commission, payment terms, credit limit
    - Status, contract dates, contracted rates (JSON)
    - Production stats

30. OPPORTUNITY (Pipeline CRM)
    - Account, name, type enum (group, event, corporate_contract)
    - Stage enum (prospect, quotation, negotiation, proposal, confirmed, lost)
    - Value, probability, expected close date
    - Sales exec, notes

31. QUOTATION
    - Opportunity, group or event reference
    - Version, status (draft, sent, accepted, rejected, expired)
    - Content (JSON with full quotation details)
    - Valid until, total amount
    - Sent at, PDF URL

32. CHART OF ACCOUNT
    - Account number (e.g., "4101"), name, type enum (asset, liability, equity, revenue, expense)
    - Parent account (self-relation), level
    - Department, cost center defaults
    - Is active

33. COST CENTER
    - Code, name, department

34. DEPARTMENT
    - Code, name, type enum (rooms, fb, spa, events, admin, maintenance, etc.)

35. ACCOUNTING ENTRY (Póliza)
    - Entry number, type enum (automatic, manual, night_audit, adjustment, closing)
    - Source module, source reference
    - Description, business date, period
    - Status (draft, posted, reversed)
    - Posted by, reversed by

36. ACCOUNTING ENTRY LINE (Detalle de póliza)
    - Entry, account, department, cost center
    - Debit, credit, description, reference

37. INVOICE (Factura CFDI)
    - Invoice number, type enum (income, credit_note, payment_complement)
    - Guest or Account reference
    - Tax info (RFC, razón social, uso CFDI, régimen)
    - Payment form, payment method, currency, exchange rate
    - Subtotal, tax total, total
    - UUID (timbrado), XML URL, PDF URL
    - Status (draft, stamped, sent, paid, cancelled)
    - Due date, paid date
    - Related invoices, folio charges included

38. BANK ACCOUNT
    - Name, bank, account number, CLABE, currency, balance

39. BANK TRANSACTION
    - Bank account, type (deposit, withdrawal, transfer, fee)
    - Amount, reference, description, date
    - Reconciled flag, reconciliation date
    - Accounting entry reference

40. HOUSEKEEPING ASSIGNMENT
    - Room, housekeeper (user), date, shift
    - Priority, type (checkout, stayover, deep_clean)
    - Status (pending, in_progress, completed, inspected, rejected)
    - Started at, completed at, inspected by
    - Notes, credits

41. LOST AND FOUND
    - Room, description, found by, found date
    - Status (found, claimed, disposed), photos
    - Guest reference (if claimed)

42. MAINTENANCE TICKET
    - Ticket number, room (nullable), location
    - Category enum, priority enum, type enum (corrective, preventive)
    - Description, status enum
    - Reported by, assigned to
    - Times (reported, assigned, started, resolved, closed)
    - Costs, photos before/after, resolution notes

43. ASSET
    - Name, category, location, room
    - Brand, model, serial number
    - Purchase date, warranty expiry, expected life
    - Supplier, cost, accumulated maintenance cost
    - Status (active, maintenance, retired)

44. USER
    - Username, email, password hash, name
    - Role, department, property access
    - Status (active, inactive, locked)
    - MFA enabled, last login, preferences (JSON)

45. ROLE
    - Name, description, permissions (JSON array)

46. AUDIT LOG
    - User, module, action, entity type, entity id
    - Changes (JSON diff), IP, user agent, timestamp

47. NOTIFICATION
    - User, type, title, message, data (JSON)
    - Read flag, read at, created at

48. SEASON
    - Name, property, start date, end date, type enum (high, mid, low, special)

49. ALLOTMENT
    - Account, room type, dates (from/to)
    - Quantity, picked up, cut off date
    - Rate, meal plan, status

50. NIGHT AUDIT LOG
    - Business date, property
    - Status (started, completed, failed)
    - Started at, completed at, started by
    - Summary (JSON: rooms charged, amount, no shows, discrepancies)
    - Errors (JSON array)

RELACIONES CLAVE:
- Property → todas las entidades (multi-tenant)
- RoomType → Room (1:N)
- Guest → Reservation (1:N)
- Reservation → Folio (1:N)
- Folio → FolioCharge (1:N)
- Folio → Folio (self: parent for splits/subs)
- ReservationGroup → Reservation (1:N)
- ReservationGroup → GroupBlock (1:N)
- ReservationGroup → Event (1:N)
- Event → VenueBooking (1:N)
- Venue → VenueBooking (1:N)
- Outlet → PosOrder (1:N)
- PosOrder → PosOrderItem (1:N)
- Product → PosOrderItem (1:N)
- Product → InventoryItem (1:N)
- Product → RecipeIngredient (1:N)
- Account → Opportunity (1:N)
- Opportunity → Quotation (1:N)
- AccountingEntry → AccountingEntryLine (1:N)
- ChartOfAccount → AccountingEntryLine (1:N)

ENUMS que se deben crear como Prisma enums:
- ReservationStatus, FolioType, FolioStatus, ChargeType, TransactionType,
  PaymentMethod, GuaranteeType, RoomStatus, HKStatus, MealPlanType,
  GroupType, GroupStatus, EventType, EventStatus, VenueBookingStatus,
  OutletType, PosOrderStatus, ProductType, AICategory, InventoryMovementType,
  POStatus, AccountType, AccountStatus, OpportunityStage, QuotationStatus,
  ChartAccountType, AccountingEntryType, AccountingEntryStatus,
  InvoiceType, InvoiceStatus, TicketCategory, TicketPriority, TicketType,
  TicketStatus, MaintenanceType, AssetStatus, UserStatus, SeasonType,
  AllotmentStatus, HKAssignmentStatus, HKAssignmentType, LostFoundStatus,
  Gender, RateType

INDICES que se deben crear:
- Reservation: (property_id, check_in_date, check_out_date, status)
- Reservation: (room_id, check_in_date, check_out_date)
- Reservation: (confirmation_number) UNIQUE
- Room: (property_id, status, hk_status)
- Room: (property_id, number) UNIQUE
- FolioCharge: (folio_id, business_date)
- PosOrder: (outlet_id, business_date, status)
- Guest: (property_id, last_name, first_name)
- Guest: (email)
- AuditLog: (entity_type, entity_id)
- AccountingEntry: (property_id, period, status)
- GroupBlock: (group_id, room_type_id, date) UNIQUE
- InventoryItem: (product_id, warehouse_id) UNIQUE

Genera el schema completo en formato Prisma con todos los modelos, enums, relaciones
y directivas @@index / @@unique necesarias.
```

---

## Prompt para generar migraciones SQL directas

```
Genera el SQL de creación de tablas para PostgreSQL 16 basado en el modelo de datos
de Hotelia (PMS hotelero).

Incluye:
1. CREATE TYPE para todos los enums
2. CREATE TABLE con constraints (PK, FK, NOT NULL, DEFAULT, CHECK)
3. CREATE INDEX para queries frecuentes
4. CREATE UNIQUE INDEX para constraints de unicidad
5. Comentarios en cada tabla explicando su propósito
6. Triggers para updated_at automático
7. Trigger de audit trail genérico

Usa UUID como tipo de primary key (gen_random_uuid() como default).
Usa TIMESTAMPTZ para timestamps.
Usa JSONB para campos semi-estructurados.
Incluye Row Level Security policies basadas en property_id.

Genera las tablas en orden de dependencias (sin FK a tablas no creadas aún).
```
