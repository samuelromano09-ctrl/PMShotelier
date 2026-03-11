# H. Roles y Permisos

---

## Estructura de permisos

El sistema utiliza **RBAC (Role-Based Access Control)** con granularidad por:
- **Módulo** (PMS, POS, Finanzas, etc.)
- **Acción** (ver, crear, editar, eliminar, autorizar)
- **Scope** (propiedad, departamento, outlet, propio)

Cada permiso sigue el formato: `module.resource.action`

---

## Roles predefinidos

### 1. Director General / Gerente General
```
Scope: Toda la propiedad (o multi-property)
Permisos: TODOS (lectura + escritura + autorización)
Dashboard: Ejecutivo con KPIs globales
Especial: Puede ver datos financieros completos, aprobar presupuestos,
          autorizar excepciones de cualquier departamento
```

### 2. Gerente de Recepción / Front Office Manager
```
Módulos: PMS Core (completo), Housekeeping (lectura), Revenue (lectura)
Permisos:
  pms.reservation.*                    # Todas las acciones de reservaciones
  pms.checkin.*                        # Check-in completo
  pms.checkout.*                       # Check-out completo
  pms.folio.*                          # Folios completo
  pms.folio.discount.authorize         # Autorizar descuentos en folio
  pms.folio.adjustment.authorize       # Autorizar ajustes
  pms.room.assign                      # Asignar habitaciones
  pms.room.change                      # Cambios de habitación
  pms.room.upgrade.authorize           # Autorizar upgrades
  pms.room.block                       # Bloquear habitaciones
  pms.guest.*                          # Gestión de huéspedes
  pms.walkin.create                    # Walk-ins
  pms.noshow.process                   # Procesar no shows
  housekeeping.status.read             # Ver estatus de habitaciones
  revenue.availability.read            # Ver disponibilidad
  revenue.rates.read                   # Ver tarifas
  reports.front_office.*               # Reportes de recepción
```

### 3. Recepcionista
```
Módulos: PMS Core (operativo)
Permisos:
  pms.reservation.read                 # Ver reservaciones
  pms.reservation.create               # Crear reservaciones
  pms.reservation.edit                 # Editar reservaciones
  pms.checkin.execute                  # Realizar check-in
  pms.checkout.execute                 # Realizar check-out
  pms.folio.read                       # Ver folios
  pms.folio.charge.create              # Agregar cargos
  pms.folio.payment.create             # Registrar pagos
  pms.guest.read                       # Ver huéspedes
  pms.guest.create                     # Crear huéspedes
  pms.guest.edit                       # Editar huéspedes
  pms.room.assign                      # Asignar habitaciones
  pms.walkin.create                    # Walk-ins
  housekeeping.status.read             # Ver estatus de limpieza
  NO: pms.folio.discount               # NO puede dar descuentos (requiere gerente)
  NO: pms.folio.adjustment             # NO puede hacer ajustes
  NO: pms.reservation.cancel           # NO puede cancelar (requiere gerente)
```

### 4. Gerente de Reservaciones
```
Módulos: PMS Reservaciones, CRS, Revenue (lectura)
Permisos:
  pms.reservation.*                    # Completo en reservaciones
  pms.availability.*                   # Disponibilidad completa
  crs.channels.*                       # Gestión de canales
  crs.allotments.*                     # Gestión de allotments
  revenue.rates.read                   # Ver tarifas
  revenue.restrictions.read            # Ver restricciones
  revenue.forecast.read                # Ver forecast
  groups.reservation.read              # Ver reservas de grupo
  reports.reservations.*               # Reportes de reservaciones
```

### 5. Revenue Manager
```
Módulos: Revenue (completo), PMS (lectura), CRS, BI
Permisos:
  revenue.*                            # Todo en revenue
  revenue.rates.edit                   # Modificar tarifas
  revenue.restrictions.edit            # Aplicar restricciones
  revenue.forecast.edit                # Editar forecast
  pms.reservation.read                 # Ver reservaciones
  pms.availability.read                # Ver disponibilidad
  crs.channels.read                    # Ver canales
  crs.allotments.edit                  # Gestionar allotments
  groups.read                          # Ver grupos
  bi.dashboards.revenue                # Dashboard de revenue
  bi.reports.revenue.*                 # Reportes de revenue
  reports.*                            # Todos los reportes
```

### 6. Director / Gerente de Ventas
```
Módulos: CRM (completo), Grupos (completo), Eventos (completo), Revenue (lectura)
Permisos:
  crm.*                                # CRM completo
  crm.accounts.*                       # Gestión de cuentas
  crm.pipeline.*                       # Pipeline comercial
  crm.quotes.*                         # Cotizaciones
  crm.contracts.*                      # Contratos
  groups.*                             # Grupos completo
  events.*                             # Eventos completo
  venues.*                             # Salones completo
  revenue.rates.read                   # Ver tarifas
  revenue.availability.read            # Ver disponibilidad
  pms.reservation.read                 # Ver reservaciones
  finance.ar.read                      # Ver CxC de sus cuentas
  bi.dashboards.sales                  # Dashboard de ventas
  reports.sales.*                      # Reportes comerciales
```

### 7. Ejecutivo de Ventas
```
Módulos: CRM (propio), Grupos (propios), Eventos (propios)
Permisos:
  crm.accounts.read                    # Ver cuentas
  crm.accounts.edit.own                # Editar sus cuentas
  crm.pipeline.read.own                # Ver su pipeline
  crm.pipeline.edit.own                # Editar su pipeline
  crm.quotes.create                    # Crear cotizaciones
  crm.quotes.edit.own                  # Editar sus cotizaciones
  groups.read.own                      # Ver sus grupos
  groups.create                        # Crear grupos
  events.read.own                      # Ver sus eventos
  events.create                        # Crear eventos
  venues.availability.read             # Ver disponibilidad de salones
  NO: crm.accounts.delete              # NO puede eliminar cuentas
  NO: crm.contracts.approve            # NO puede aprobar contratos (requiere director)
```

### 8. Contralor / Director de Finanzas
```
Módulos: Finanzas (completo), BI
Permisos:
  finance.*                            # Todo en finanzas
  finance.accounting.*                 # Contabilidad completa
  finance.ar.*                         # CxC completa
  finance.ap.*                         # CxP completa
  finance.invoicing.*                  # Facturación completa
  finance.banking.*                    # Bancos y conciliación
  finance.budget.*                     # Presupuestos
  finance.night_audit.*                # Auditoría nocturna
  finance.closing.*                    # Cierres de periodo
  purchasing.approve                   # Aprobar compras
  bi.dashboards.finance                # Dashboard financiero
  reports.finance.*                    # Todos los reportes financieros
```

### 9. Auditor Nocturno
```
Módulos: Finanzas (auditoría), PMS (lectura operativa)
Permisos:
  finance.night_audit.execute          # Ejecutar auditoría nocturna
  finance.night_audit.read             # Ver reportes de auditoría
  pms.reservation.read                 # Ver reservaciones
  pms.folio.read                       # Ver folios
  pms.noshow.process                   # Procesar no shows
  pos.cashclose.read                   # Verificar cierres de caja POS
  housekeeping.status.read             # Ver estatus de habitaciones
  NO: finance.accounting.edit          # NO puede modificar contabilidad directa
  NO: pms.folio.adjustment             # NO puede hacer ajustes de folio
```

### 10. Gerente de A&B
```
Módulos: POS (completo), Inventarios, All Inclusive
Permisos:
  pos.*                                # POS completo
  pos.outlet.config                    # Configurar outlets
  pos.product.*                        # Gestión de productos
  pos.pricing.*                        # Listas de precios
  pos.discount.authorize               # Autorizar descuentos
  pos.void.authorize                   # Autorizar cancelaciones
  pos.cashclose.*                      # Cortes de caja
  pos.reports.*                        # Reportes POS
  all_inclusive.rules.read             # Ver reglas AI
  inventory.ab.*                       # Inventarios A&B
  purchasing.requisition.approve       # Aprobar requisiciones
  reports.ab.*                         # Reportes de A&B
```

### 11. Mesero / Cajero POS
```
Módulos: POS (operativo, solo su outlet)
Permisos:
  pos.order.create                     # Abrir cuentas
  pos.order.edit.own                   # Editar sus cuentas
  pos.order.close.own                  # Cerrar sus cuentas
  pos.order.charge_room                # Cargo a habitación
  pos.cashclose.own                    # Cierre de su caja
  NO: pos.discount                     # NO puede dar descuentos
  NO: pos.void                         # NO puede cancelar productos
  NO: pos.order.reopen                 # NO puede reabrir cuentas
  Scope: Solo su outlet asignado
```

### 12. Ama de Llaves / Jefa de Housekeeping
```
Módulos: Housekeeping (completo)
Permisos:
  housekeeping.*                       # Housekeeping completo
  housekeeping.assign.*                # Asignar camaristas
  housekeeping.inspect.*               # Inspeccionar habitaciones
  housekeeping.status.update           # Actualizar estatus
  housekeeping.discrepancy.report      # Reportar discrepancias
  housekeeping.lost_found.*            # Objetos olvidados
  housekeeping.reports.*               # Reportes de housekeeping
  pms.room.status.read                 # Ver estatus de habitaciones PMS
  maintenance.ticket.create            # Crear tickets de mantenimiento
```

### 13. Camarista
```
Módulos: Housekeeping (app móvil, solo sus habitaciones)
Permisos:
  housekeeping.status.update.own       # Actualizar estatus de sus habitaciones
  housekeeping.minibar.report          # Reportar consumo de minibar
  housekeeping.lost_found.report       # Reportar objetos olvidados
  housekeeping.maintenance.report      # Reportar desperfectos
  Scope: Solo habitaciones asignadas
  Interfaz: App móvil simplificada
```

### 14. Jefe de Mantenimiento
```
Módulos: Mantenimiento (completo)
Permisos:
  maintenance.*                        # Mantenimiento completo
  maintenance.ticket.assign            # Asignar tickets
  maintenance.preventive.schedule      # Programar preventivo
  maintenance.asset.*                  # Gestión de activos
  pms.room.out_of_order                # Marcar habitaciones fuera de servicio
  purchasing.requisition.create        # Crear requisiciones de material
  reports.maintenance.*                # Reportes de mantenimiento
```

### 15. Técnico de Mantenimiento
```
Módulos: Mantenimiento (app móvil, solo sus tickets)
Permisos:
  maintenance.ticket.read.own          # Ver sus tickets
  maintenance.ticket.update.own        # Actualizar estatus de sus tickets
  maintenance.ticket.photo             # Subir fotos
  Scope: Solo tickets asignados
  Interfaz: App móvil simplificada
```

### 16. Coordinador de Eventos
```
Módulos: Eventos y Salones
Permisos:
  events.read                          # Ver todos los eventos
  events.edit                          # Editar eventos
  events.beo.*                         # BEOs completo
  venues.read                          # Ver salones
  venues.booking.edit                  # Editar reservas de salón
  groups.read                          # Ver grupos vinculados
  pos.event_orders.*                   # Órdenes de eventos
```

### 17. Jefe de Compras / Almacenista
```
Módulos: Inventarios y Compras
Permisos:
  inventory.*                          # Inventarios completo
  purchasing.*                         # Compras completo
  purchasing.po.create                 # Crear órdenes de compra
  purchasing.po.approve                # Aprobar OC (según monto)
  purchasing.receiving.*               # Recepción de mercancía
  purchasing.suppliers.*               # Gestión de proveedores
  reports.purchasing.*                 # Reportes de compras
```

### 18. Administrador de Sistemas
```
Módulos: Configuración (completo)
Permisos:
  admin.*                              # Administración completa
  admin.users.*                        # Gestión de usuarios
  admin.roles.*                        # Gestión de roles
  admin.property.config                # Configuración de propiedad
  admin.rooms.config                   # Configuración de habitaciones
  admin.integrations.*                 # Integraciones
  admin.audit.read                     # Ver bitácora de auditoría
  admin.api_keys.*                     # Gestión de API keys
```

---

## Matriz de autorizaciones especiales

| Acción crítica | Quién puede autorizar |
|---------------|----------------------|
| Descuento en folio > 10% | Gerente de Recepción, Director General |
| Descuento en POS > 15% | Gerente A&B, Director General |
| Cancelación de reservación con penalidad | Gerente Recepción, Director Ventas |
| Ajuste contable | Contralor |
| Cortesía completa | Director General |
| Upgrade sin cargo | Gerente Recepción, Revenue Manager |
| Reabrir folio cerrado | Contralor, Director General |
| Cancelar factura timbrada | Contralor |
| Aprobar orden de compra > $50,000 | Director General |
| Aprobar orden de compra > $10,000 | Contralor, Gerente General |
| Procesar reembolso | Contralor |
| Modificar tarifa publicada | Revenue Manager |
| Aplicar restricción de venta | Revenue Manager |
| Eliminar reservación | No permitido (solo cancelar) |
| Eliminar huésped | No permitido (solo anonimizar GDPR) |
| Modificar auditoría cerrada | No permitido |

---

## Bitácora de auditoría

Cada acción registra:
- **Quién:** usuario + rol
- **Qué:** módulo + recurso + acción
- **Cuándo:** timestamp
- **Dónde:** IP + dispositivo
- **Cambios:** valores antes y después (JSON diff)
- **Autorización:** si requirió aprobación de otro usuario, quién aprobó

La bitácora es **inmutable** — no se puede editar ni eliminar.

Retención: mínimo 5 años (configurable por regulación).

---

## Flujo de doble autorización

```
Recepcionista solicita descuento de 20% en folio
    │
    ▼
Sistema detecta: descuento > 10% requiere autorización
    │
    ▼
Notificación push a Gerente de Recepción
    │
    ▼
Gerente revisa en su dispositivo:
  - Folio #, huésped, monto original, descuento solicitado
  - Motivo ingresado por recepcionista
    │
    ├── Aprueba (PIN + motivo) → descuento aplicado, registrado en auditoría
    └── Rechaza (motivo) → recepcionista notificado, no se aplica descuento
```
