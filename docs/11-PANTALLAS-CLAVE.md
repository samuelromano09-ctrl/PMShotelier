# K. Pantallas Clave a Diseñar (Priorización)

---

## Prioridad 1 — Core (diseñar primero)

Estas pantallas definen la identidad visual y funcional del sistema.

### 1. Dashboard Principal (Director General)
- KPIs: ocupación, ADR, RevPAR, ingresos
- Gráfica de ocupación 30 días
- Ingresos por departamento
- Movimiento del día (llegadas, salidas, in-house)
- Alertas activas
- **Criterio:** Primera pantalla que ve el usuario. Define la impresión del sistema.

### 2. Calendar View de Disponibilidad
- Grid: tipos de habitación × fechas
- Indicadores de disponibilidad por color
- Filtros: tipo, canal, allotment, grupo
- Hover con desglose
- Drag para crear reservación
- **Criterio:** Pantalla más consultada por reservaciones y revenue.

### 3. Room Rack Visual
- Grid: habitaciones × fechas
- Reservaciones como bloques con color por segmento/plan
- Drag and drop para mover/extender
- Indicadores de housekeeping
- **Criterio:** Pantalla principal de recepción para operación diaria.

### 4. Formulario de Nueva Reservación
- Wizard: fechas → disponibilidad → huésped → detalles → garantía → confirmar
- Autocompletado de huésped
- Preview de tarifa total
- Selección de plan
- **Criterio:** Transacción más frecuente del sistema.

### 5. Pantalla de Check-in
- Datos de reservación pre-cargados
- Asignación de habitación con sugerencia inteligente
- Captura de registro
- Asignación de plan/brazalete
- **Criterio:** Experiencia crítica para recepción.

### 6. Folio de Huésped
- Resumen: huésped, habitación, fechas, plan
- Lista de cargos y pagos cronológica
- Balance en tiempo real
- Acciones: agregar cargo, registrar pago, split, facturar
- **Criterio:** Pantalla de consulta constante durante la estancia.

### 7. POS — Pantalla de Venta (Outlet)
- Categorías de productos
- Búsqueda rápida
- Cuenta abierta con items
- Indicador AI (incluido/extra)
- Botones de cobro
- **Criterio:** Pantalla usada miles de veces al día en cada outlet.

---

## Prioridad 2 — Operativos

### 8. Dashboard de Recepción
- Acciones rápidas (check-in, walk-in, check-out)
- Llegadas pendientes con estatus
- Salidas del día
- Alertas (VIP, notas, late CO)
- Quick view de disponibilidad

### 9. Lista de Llegadas del Día
- Tabla con: hora, huésped, tipo, habitación, plan, estatus, notas
- Filtros: pendientes, asignados, VIP, grupos
- Acciones directas: asignar habitación, check-in

### 10. Housekeeping — Tablero de Estatus
- Grid de habitaciones por piso/zona
- Color por estatus (limpia, sucia, en limpieza, inspeccionada)
- Filtros por camarista, prioridad
- Actualización en tiempo real

### 11. Housekeeping — App Móvil (Camarista)
- Lista de habitaciones asignadas
- Checklist de limpieza
- Botón: marcar como limpia
- Reportar desperfecto
- Reportar objeto olvidado

### 12. Corte de Caja POS
- Resumen de ventas por método de pago
- Propinas, descuentos, cancelaciones
- Arqueo de fondo
- Confirmación con PIN

### 13. Auditoría Nocturna
- Pre-validación con alertas
- Botón de ejecución
- Barra de progreso
- Reporte generado

---

## Prioridad 3 — Comercial y Grupos

### 14. Pipeline Comercial (CRM)
- Vista Kanban con etapas
- Cards de oportunidad con valor y probabilidad
- Drag and drop entre etapas
- Filtros por ejecutivo, tipo, periodo

### 15. Ficha de Grupo
- Datos generales, bloqueo, pick-up
- Rooming list
- Depósitos
- Folio maestro
- Eventos vinculados
- Timeline de actividades

### 16. Calendario de Salones
- Grid: salones × fechas/horas
- Eventos como bloques con color por estatus
- Hover con detalle
- Click para crear/editar evento

### 17. Cotización de Evento
- Wizard: datos → salón → A&B → equipo → extras → resumen
- Precio calculado automáticamente
- Generación de PDF
- Envío por email

### 18. BEO (Banquet Event Order)
- Vista de documento con toda la información del evento
- Timeline horario
- Detalle de A&B, equipo, montaje
- Responsables
- Imprimible / PDF

---

## Prioridad 4 — Finanzas y Revenue

### 19. Dashboard de Revenue
- OTB, forecast, pick-up
- ADR, RevPAR por segmento
- Restricciones activas
- Comparativo vs año anterior
- Calendario tarifario

### 20. Calendario Tarifario
- Grid: tipos de habitación × fechas
- Tarifa por celda (editable)
- Colores por nivel de tarifa
- Restricciones aplicadas por celda
- Edición masiva

### 21. Estado de Resultados por Departamento (USALI)
- Departamentos como filas
- Ingresos, costos, GOP como columnas
- Actual vs presupuesto vs año anterior
- Drill-down a detalle

### 22. Aged Receivables (CxC)
- Cuentas con saldo por antigüedad (30, 60, 90, 120+ días)
- Filtros por empresa, agencia, OTA
- Acciones: enviar recordatorio, registrar pago

### 23. Facturación Electrónica
- Selección de folios a facturar
- Datos fiscales pre-cargados
- Preview de CFDI
- Timbrado con un clic
- Descarga XML/PDF

### 24. Conciliación
- Vista lado a lado: origen vs contabilidad
- Diferencias resaltadas
- Sugerencias automáticas
- Acciones de ajuste

---

## Prioridad 5 — Inventarios y Mantenimiento

### 25. Inventario de Almacén
- Productos con existencia, mínimo, máximo
- Filtros por almacén, categoría
- Alertas de bajo inventario
- Acciones: ajuste, traspaso, conteo

### 26. Orden de Compra
- Formulario: proveedor, productos, cantidades, precios
- Aprobación por monto
- Seguimiento de recepción

### 27. Tickets de Mantenimiento
- Lista de tickets con prioridad, estatus, asignado
- Filtros por categoría, prioridad, estatus
- Detalle con fotos y bitácora

### 28. App Móvil Mantenimiento
- Tickets asignados
- Actualizar estatus
- Subir fotos
- Checklist de preventivo

---

## Prioridad 6 — Configuración

### 29. Gestión de Tipos de Habitación
- Wizard de creación: datos → capacidad → atributos → amenidades → fotos → tarifas
- Lista de tipos con preview
- Edición inline

### 30. Gestión de Habitaciones
- Lista de habitaciones con tipo, piso, edificio, estatus
- Edición masiva
- Alta en lote por rango

### 31. Gestión de Usuarios y Permisos
- Lista de usuarios
- Asignación de rol
- Permisos granulares
- Bitácora de auditoría

### 32. Configuración de Outlet POS
- Datos del outlet
- Horarios
- Catálogo de productos
- Impuestos
- Impresoras

---

## Orden de prototipado recomendado

```
Sprint 1 (Semana 1-2):    #1 Dashboard, #2 Calendar View, #3 Room Rack
Sprint 2 (Semana 3-4):    #4 Nueva Reserva, #5 Check-in, #6 Folio
Sprint 3 (Semana 5-6):    #7 POS Venta, #8 Dashboard Recepción, #9 Llegadas
Sprint 4 (Semana 7-8):    #10 Housekeeping, #12 Corte de caja, #13 Auditoría
Sprint 5 (Semana 9-10):   #14 Pipeline CRM, #15 Ficha Grupo, #16 Cal Salones
Sprint 6 (Semana 11-12):  #19 Dashboard Revenue, #20 Cal Tarifario, #21 USALI
Sprint 7 (Semana 13-14):  #29 Tipos Hab, #30 Habitaciones, #31 Usuarios
Sprint 8 (Semana 15-16):  #17 Cotización Evento, #22 CxC, #23 Facturación
```
