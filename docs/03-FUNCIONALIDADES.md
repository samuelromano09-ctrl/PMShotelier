# C. Lista Exhaustiva de Funcionalidades por Módulo

---

## 1. PMS Core

### 1.1 Reservaciones
- Crear reservación individual (walk-in, teléfono, email, web)
- Crear reservación de grupo (vinculada a bloque)
- Modificar reservación (fechas, habitación, tarifa, plan, huéspedes)
- Cancelar reservación con política configurable
- Confirmar reservación con depósito o garantía
- Reservación tentativa con fecha de expiración automática
- Reservación con múltiples habitaciones
- Reservación con paquete / plan alimenticio
- Reservación con notas internas y notas para huésped
- Reservación con solicitudes especiales (cama extra, vista, piso alto, etc.)
- Historial completo de cambios por reservación
- Número de confirmación único y legible
- Búsqueda de reservación por: nombre, confirmación, fecha, habitación, canal, grupo, empresa
- Duplicar reservación
- Cotizar sin confirmar
- Waitlist con notificación automática cuando hay disponibilidad

### 1.2 Check-in
- Check-in estándar con asignación de habitación
- Pre check-in digital (enlace al huésped antes de llegada)
- Express check-in (con pre-registro completado)
- Check-in de grupo masivo (rooming list pre-cargado)
- Walk-in con creación de reservación inmediata
- Selección de habitación desde room rack visual o mapa
- Captura de identificación oficial (OCR opcional)
- Firma digital de registro
- Asignación de brazalete / credencial all inclusive
- Asignación de plan alimenticio
- Impresión o envío digital de tarjeta de registro
- Generación automática de folio(s)
- Configuración de routing de cargos
- Verificación de depósito / garantía
- Early check-in con cargo configurable
- Alertas automáticas: VIP, huésped frecuente, notas especiales, blacklist
- Asignación de habitación inteligente (por preferencias, proximidad de grupo, accesibilidad)

### 1.3 Check-out
- Check-out estándar con revisión de folio
- Express check-out (folio pre-autorizado)
- Check-out con facturación inmediata
- Check-out con split de folio
- Late check-out con cargo configurable
- Check-out de grupo masivo
- Verificación de minibar / objetos olvidados
- Envío de folio por email
- Encuesta de satisfacción post check-out
- Liberación automática de habitación a housekeeping
- Cierre de folio con saldo cero obligatorio
- Transferencia de saldo a city ledger o CxC

### 1.4 Folios y cargos
- Folio principal por reservación
- Folios adicionales (split folio)
- Folio maestro de grupo
- Subfolios por integrante de grupo
- Routing de cargos: por tipo de cargo, por outlet, por concepto
- Cargo manual con concepto libre
- Cargo automático desde POS
- Cargo de hospedaje por noche (night audit)
- Abono / pago parcial o total
- Métodos de pago: efectivo, tarjeta (crédito/débito), transferencia, city ledger, prepago OTA
- Devoluciones y ajustes con autorización
- Descuentos con autorización y motivo
- Impuestos automáticos configurables (IVA, ISH, propina sugerida)
- Propinas registrables
- Depósitos y anticipos
- Saldo pendiente con alerta
- Historial completo de movimientos del folio
- Exportar folio a PDF / email

### 1.5 Room Rack y Calendar View
- Room rack visual tipo grid (habitaciones × fechas)
- Vista por día / semana / mes / periodo personalizado
- Filtros: por tipo de habitación, piso, edificio, zona, vista, estatus
- Colores diferenciados: ocupada, disponible, sucia, limpia, bloqueada, mantenimiento, overbooking, check-in hoy, check-out hoy
- Drag and drop para mover reservaciones entre habitaciones
- Drag and drop para extender / acortar estancia
- Click para ver detalle rápido de reservación
- Indicador de ocupación porcentual por fecha
- Indicador de disponibilidad por tipo
- Vista de allotments por canal / grupo
- Resumen de llegadas, salidas, in-house por día
- Exportar vista a PDF / Excel

### 1.6 Perfiles de huésped
- Perfil individual: nombre, email, teléfono, dirección, nacionalidad, idioma, fecha de nacimiento
- Datos fiscales para facturación
- Identificación oficial (número, tipo, imagen)
- Preferencias: tipo de habitación, piso, cama, almohada, vista, alergias, restricciones alimenticias
- Historial de estancias completo
- Historial de consumos
- Notas internas (visibles solo para staff)
- Clasificación: VIP, frecuente, blacklist, corporativo, agencia
- Programa de lealtad (puntos, nivel)
- Contactos asociados (empresa, agencia, wedding planner)
- Merge de perfiles duplicados
- GDPR / privacidad: anonimización bajo solicitud

### 1.7 Gestión de habitaciones y tipos
- Alta de tipo de habitación: código, nombre, descripción corta y larga
- Capacidad estándar y máxima (adultos, menores, infantes)
- Configuración de camas (king, queen, doble, individual, sofá-cama)
- Atributos: vista (mar, jardín, alberca, ciudad), piso, tamaño m², balcón, jacuzzi
- Amenidades configurables por tipo
- Fotografías múltiples por tipo
- Plano de habitación
- Planes aplicables: EP, AI, ambos
- Conexión entre habitaciones (connecting rooms)
- Habitaciones accesibles
- Estado: activa, inactiva, en mantenimiento, fuera de servicio temporal
- Asignación a edificio / torre / piso / zona
- Clonación de configuración de tipo
- Edición masiva de atributos
- Orden de preferencia para asignación automática
- Reglas de inventario: máximo por canal, mínimo disponible, stop sell automático

### 1.8 Tarifas y paquetes
- Tarifas por tipo de habitación
- Tarifas por temporada (alta, media, baja, especial)
- Tarifas por canal (directa, OTA, agencia, corporativo, grupo)
- Tarifas por segmento de mercado
- Tarifas dinámicas (vinculadas a revenue management)
- Paquetes: hospedaje + plan alimenticio + actividades + extras
- Promociones con vigencia y condiciones
- Tarifas con restricciones: min stay, max stay, CTA, CTD, stop sell
- Tarifas netas y comisionables
- Tarifas con impuestos incluidos o desglosados
- Tarifas por persona o por habitación
- Tarifas para menores y niños
- Suplementos: vista premium, piso alto, cama extra, early check-in, late check-out
- Histórico de cambios de tarifa

### 1.9 Overbooking y control de inventario
- Control de overbooking por tipo de habitación
- Nivel de overbooking configurable (porcentaje o unidades)
- Alertas automáticas al alcanzar umbral
- Waitlist automática cuando no hay disponibilidad
- Reubicación (walk) con tracking: hotel destino, costo, motivo
- Reportes de overbooking histórico vs materializado
- Dashboard de disponibilidad real vs vendida vs bloqueada

### 1.10 No shows y cancelaciones
- Marcado de no show manual o automático (por hora límite)
- Cargo de no show configurable por tarifa
- Liberación automática de habitación
- Política de cancelación por tarifa / canal / paquete
- Cargo de cancelación automático según política
- Reembolso parcial o total
- Historial de no shows por huésped

---

## 2. CRS / Channel Management Ready

### 2.1 Distribución de inventario
- Pool de inventario centralizado
- Distribución por canal con límites configurables
- Allotments por agencia / OTA / corporativo con fecha de corte
- Allotments de grupo con rooming list y cut-off
- Stop sell por canal, tipo, fecha
- Apertura / cierre de ventas por canal
- Disponibilidad en tiempo real sincronizada

### 2.2 Conectividad
- API estándar para channel managers (2-way sync)
- Mapeo de tipos de habitación y tarifas por canal
- Recepción automática de reservaciones de OTAs
- Confirmación y cancelación bidireccional
- Reconciliación de reservaciones OTA vs PMS
- Soporte para channel managers: SiteMinder, D-EDGE, Omnibees, RateGain, etc.

### 2.3 Booking engine ready
- API para motor de reservaciones web
- Widget embeddable de disponibilidad y reserva
- Soporte para códigos promocionales
- Upselling de habitación y paquetes
- Confirmación instantánea con email automático
- Pasarela de pago integrada para depósitos online

---

## 3. POS Hotelero Integral

### 3.1 Configuración de outlets
- Alta de centros de consumo: restaurante, bar, snack bar, pool bar, beach bar, room service, boutique, spa, actividades, lavandería, estacionamiento, otros
- Configuración por outlet: horarios, menú/catálogo, impuestos, propinas, métodos de pago
- Múltiples listas de precios por outlet (regular, happy hour, evento especial, grupo)
- Estaciones de servicio por outlet
- Impresoras de cocina / bar configurables por estación
- Diseño visual de mesas (plano del restaurante)

### 3.2 Operación de venta
- Apertura de cuenta por mesa, huésped, habitación o nombre
- Captura de productos por categoría, búsqueda o código
- Modificadores de producto (sin cebolla, extra queso, etc.)
- Combos y paquetes
- Tiempos de comanda (entrada, plato fuerte, postre)
- Envío de comanda a cocina/bar (impresión o pantalla KDS)
- División de cuenta (por producto, por partes iguales, por porcentaje)
- Transferencia de productos entre cuentas
- Cambio de mesero
- Descuentos con autorización y motivo
- Cortesías con autorización y motivo
- Cancelación de productos con autorización y motivo auditable
- Reapertura de cuenta cerrada (con autorización)

### 3.3 Cobro y cierre
- Cargo a habitación (validación de huésped activo)
- Pago en efectivo con cálculo de cambio
- Pago con tarjeta (integración terminal bancaria)
- Pago con transferencia
- Pago mixto (múltiples métodos)
- Consumo incluido en plan (validación AI)
- Propina sugerida y configurable
- Impresión de ticket o envío digital
- Facturación inmediata (datos fiscales del huésped o empresa)
- Cierre automático de cuenta al cobrar

### 3.4 All Inclusive en POS
- Validación automática de elegibilidad al abrir cuenta por habitación
- Indicador visual claro: consumo incluido vs consumo con cargo
- Productos marcados como: incluidos, premium con cargo, no incluidos
- Validación de horario de elegibilidad
- Validación de outlet autorizado para el plan
- Límites de consumo por comida, por día, por estancia
- Cargo automático al folio si excede lo incluido
- Registro detallado de consumos incluidos (para costeo y BI)
- Brazalete / credencial como identificador

### 3.5 Cortes y arqueos
- Corte de caja por turno
- Corte de caja por cajero
- Arqueo de fondo de caja
- Detalle de ventas por método de pago
- Detalle de propinas
- Detalle de descuentos y cortesías
- Detalle de cancelaciones
- Diferencias de caja
- Cierre de turno con firma digital
- Reporte de corte exportable

### 3.6 Room service
- Menú específico para room service
- Captura por habitación con validación de huésped
- Tiempos de entrega
- Cargo automático a folio + cargo por servicio configurable
- Integración con cocina

### 3.7 Boutique / Gift Shop
- Catálogo de productos con SKU, precio, categoría
- Control de inventario por pieza
- Código de barras / QR
- Cargo a habitación o pago directo
- Comisiones por vendedor

---

## 4. Operación All Inclusive

### 4.1 Definición de planes
- Plan Europeo (sin alimentos)
- Desayuno Incluido
- Media Pensión (desayuno + cena)
- Pensión Completa (3 comidas)
- All Inclusive Estándar
- All Inclusive Premium / Select
- Planes personalizados

### 4.2 Reglas de plan
- Outlets incluidos por plan
- Horarios de elegibilidad por outlet
- Productos incluidos vs premium por plan
- Límites de consumo: por comida, por día, por estancia, por outlet
- Restricciones por edad (adulto, menor, infante)
- Restricciones por mercado o segmento
- Reglas especiales para grupos
- Reglas especiales para convenciones
- Bebidas incluidas: alcohólicas nacionales, internacionales, premium
- Actividades incluidas: kayak, snorkel, gym, kids club, etc.
- Spa: incluido con restricciones o con cargo extra

### 4.3 Identificación y control
- Asignación de brazalete por color/tipo según plan
- Credencial digital (QR) por huésped
- Validación en POS por escaneo de brazalete, QR o búsqueda de habitación
- Foto del huésped en perfil para validación visual
- Registro de acompañantes autorizados
- Day pass con brazalete temporal

### 4.4 Trazabilidad
- Registro de cada consumo incluido con detalle de: outlet, hora, productos, huésped, habitación
- Diferenciación contable: ingreso all inclusive vs ingreso extra
- Costeo de all inclusive por huésped-noche
- Reportes de consumo promedio por plan
- Análisis de rentabilidad por plan alimenticio
- Comparativo de consumo real vs presupuestado

---

## 5. Grupos, Eventos y Salones

### 5.1 Gestión de grupos
- Creación de grupo: nombre, tipo (turístico, corporativo, boda, convención), contacto, empresa/agencia
- Bloqueo de habitaciones por tipo y fecha
- Allotment con fecha de corte (cut-off)
- Rooming list: carga masiva (Excel/CSV), edición individual
- Asignación de habitaciones desde room rack
- Folio maestro de grupo
- Subfolios por habitación o integrante
- Routing de cargos: qué paga el grupo vs qué paga el huésped
- Condiciones comerciales: tarifa negociada, plan, descuentos, cortesías, upgrades
- Depósitos y calendario de pagos
- Política de cancelación de grupo
- Contrato de grupo (template configurable, firma digital)
- Seguimiento de pick-up vs bloqueado
- Liberación automática post cut-off
- Historial completo del grupo

### 5.2 Eventos y banquetes
- Creación de evento vinculado o independiente de grupo
- Tipos: boda, convención, reunión, cena de gala, cóctel, conferencia, capacitación
- Asignación de salón(es)
- Montaje / configuración de salón (teatro, escuela, U, banquete, cóctel, imperial, etc.)
- BEO (Banquet Event Order): detalle completo del evento
- Menú de A&B para evento
- Equipo adicional: audio, video, proyección, decoración, iluminación
- Presupuesto / cotización del evento
- Confirmación y firma
- Cargos enlazados a folio maestro
- Facturación por evento
- Coordinador comercial y coordinador operativo asignados
- Timeline del evento
- Notas operativas para cada departamento

### 5.3 Salones
- Catálogo de salones: nombre, ubicación, capacidad por configuración
- Fotografías y planos de salón
- Configuraciones posibles con capacidad por cada una
- Divisibilidad de salones (A, B, A+B)
- Bloqueo de salón por fecha y horario
- Calendario visual de salones: vista diaria, semanal, mensual
- Colores por estatus: confirmado, tentativo, bloqueado, disponible
- Conflicto de reservación con alerta automática
- Ingresos proyectados por salón y periodo

### 5.4 Cotizaciones
- Cotización integrada: habitaciones + salones + A&B + equipo + extras
- Templates de cotización por tipo de evento
- Múltiples versiones de cotización por negociación
- Conversión de cotización a grupo + evento confirmado
- Seguimiento de cotizaciones pendientes con recordatorios
- Expiración automática de cotización tentativa

---

## 6. COI / ERP / Back Office

### 6.1 Contabilidad
- Catálogo de cuentas contables (personalizable, multinivel)
- Pólizas automáticas desde PMS: hospedaje, cargos, pagos, depósitos
- Pólizas automáticas desde POS: ventas por outlet, impuestos, propinas, cargos a habitación
- Pólizas automáticas desde grupos: depósitos, facturación, consumos
- Pólizas manuales con autorización
- Centros de costo por departamento / outlet
- Subcuentas por proyecto / evento
- Partidas presupuestales
- Catálogo de impuestos configurable (IVA, ISH, IEPS, propina)
- Diario, mayor, auxiliares
- Cierre diario (post auditoría nocturna)
- Cierre mensual con validaciones
- Cierre anual

### 6.2 Cuentas por cobrar
- City ledger: saldos por empresa, agencia, OTA, grupo
- Facturación individual y consolidada
- Facturación electrónica (CFDI 4.0 para México)
- Complementos de pago
- Notas de crédito
- Aged receivables (antigüedad de saldos)
- Estados de cuenta por cliente
- Seguimiento de cobranza con notas y recordatorios
- Pagos recibidos con aplicación a facturas
- Conciliación de pagos de OTAs
- Control de comisiones por agencia / OTA

### 6.3 Cuentas por pagar
- Registro de facturas de proveedores
- Programación de pagos
- Pagos por transferencia, cheque, efectivo
- Conciliación de facturas vs órdenes de compra vs recepción
- Retenciones fiscales
- Antigüedad de saldos por pagar

### 6.4 Bancos y tesorería
- Catálogo de cuentas bancarias
- Conciliación bancaria automática y manual
- Flujo de caja proyectado
- Movimientos bancarios
- Traspasos entre cuentas
- Chequera digital

### 6.5 Facturación electrónica
- Emisión de CFDI (ingreso, egreso, pago, traslado)
- Timbrado con PAC integrado
- Cancelación de CFDI con motivo
- Descarga de XML y PDF
- Buzón de recepción de CFDI de proveedores
- Validación de CFDI recibidos ante SAT
- Reporte mensual de CFDI emitidos y recibidos

### 6.6 Auditoría nocturna
- Proceso automatizado de cierre de día
- Cargo automático de room & tax
- Cargo de no shows
- Verificación de balances
- Validación de folios abiertos sin garantía
- Reporte de auditoría nocturna con detalle completo
- Detección de discrepancias
- Rollover de fecha del sistema
- Generación de pólizas contables del día

### 6.7 Reportes financieros
- Estado de resultados por departamento (USALI format)
- Balance general
- Flujo de efectivo
- Presupuesto vs real
- Ingresos por unidad de negocio
- Costos por centro de costo
- Análisis de márgenes
- Ingresos diferidos
- Depósitos de grupos pendientes de aplicar
- Conciliación PMS vs contabilidad
- Exportación a Excel, PDF, CSV

---

## 7. Revenue Management

### 7.1 Calendario tarifario
- Vista de calendario con tarifas por tipo y por día
- Edición masiva de tarifas por rango de fechas
- Comparativo de tarifa actual vs año anterior vs presupuesto
- Temporadas configurables con tarifas base
- Override manual con motivo y autorización

### 7.2 Forecast y análisis
- Forecast de ocupación a 30, 60, 90, 365 días
- Pick-up report diario, semanal, mensual
- Wash factor por segmento
- Pace report vs año anterior
- On-the-books vs forecast vs presupuesto
- Segmentación: transient, grupo, OTA, corporativo, directo, wholesale
- ADR por segmento, canal, tipo de habitación
- RevPAR diario, semanal, mensual, anual
- TRevPAR (ingreso total por habitación disponible)
- GOPPAR (utilidad operativa bruta por habitación disponible)
- Displacement analysis: evaluar si un grupo desplaza transient más rentable
- Índice de penetración vs comp set (con rate shopping externo)

### 7.3 Restricciones y controles
- Minimum Length of Stay (MinLOS)
- Maximum Length of Stay (MaxLOS)
- Closed to Arrival (CTA)
- Closed to Departure (CTD)
- Stop Sell por tipo, canal, fecha
- Release de allotments automáticos
- Alertas configurables por nivel de ocupación

### 7.4 Dashboards de revenue
- Dashboard de revenue manager: OTB, pick-up, forecast, restricciones activas, alertas
- Dashboard de dirección: ocupación, ADR, RevPAR, TRevPAR, comparativos
- Dashboard de ventas: producción por cuenta, pipeline, conversión
- Todos con filtros por periodo, segmento, canal, tipo de habitación

---

## 8. CRM y Ventas

### 8.1 Gestión de cuentas
- Tipos: agencia, OTA, DMC, corporativo, wedding planner, meeting planner, tour operador, gobierno
- Datos de contacto, contratos vigentes, condiciones comerciales
- Ejecutivo de cuenta asignado
- Producción histórica: room nights, ingresos, ADR promedio
- Estatus: activa, inactiva, prospecto, suspendida
- Documentos adjuntos (contratos, acuerdos, tarifas negociadas)
- Comisión configurada por cuenta

### 8.2 Pipeline comercial
- Oportunidades de venta: grupo, evento, contrato corporativo
- Etapas configurables: prospecto, cotización, negociación, propuesta, confirmado, perdido
- Valor estimado por oportunidad
- Fecha probable de cierre
- Probabilidad de cierre
- Pipeline total por ejecutivo, por periodo, por tipo
- Vista Kanban y vista lista
- Drag and drop entre etapas

### 8.3 Cotizaciones y contratos
- Generación de cotización desde oportunidad
- Templates por tipo de negocio
- Inclusión de: habitaciones, tarifas, plan alimenticio, salones, A&B, equipo, extras
- Versiones de cotización (v1, v2, v3...)
- Envío por email desde sistema
- Firma digital
- Conversión a reservación / grupo / evento confirmado
- Contratos con vigencia y condiciones

### 8.4 Seguimiento y productividad
- Tareas y recordatorios por oportunidad
- Calendario de actividades comerciales
- Log de interacciones (llamadas, emails, visitas, reuniones)
- Objetivos por ejecutivo: room nights, ingresos, eventos
- Tablero de productividad comercial
- Ranking de ejecutivos

---

## 9. Housekeeping

### 9.1 Estatus de habitaciones
- Estatus en tiempo real: limpia, sucia, en limpieza, inspeccionada, fuera de servicio, fuera de orden
- Vista por piso / edificio / zona
- Filtros por estatus, prioridad, camarista, tipo de servicio
- Código de colores intuitivo
- Actualización desde app móvil
- Prioridades automáticas: check-in inminente, VIP, early check-in

### 9.2 Asignación de camaristas
- Asignación manual o automática por piso / zona / carga
- Balance de carga de trabajo
- Reasignación por ausencias
- Créditos de limpieza por tipo (salida, estancia, VIP, deep clean)
- Productividad por camarista: habitaciones limpiadas, tiempo promedio, inspecciones aprobadas

### 9.3 Inspección
- Checklist de inspección configurable por tipo de habitación
- Inspección con resultado: aprobada, rechazada con observaciones
- Fotografías de evidencia
- Re-limpieza con seguimiento
- Supervisoras asignadas por zona

### 9.4 Operación
- Discrepancias de ocupación (housekeeping vs front desk)
- Registro de objetos olvidados (lost & found)
- Solicitudes de amenidades especiales
- Reporte de desperfectos a mantenimiento
- Minibar: consumo reportado, cargo automático
- App móvil para camaristas y supervisoras con interfaz simplificada

---

## 10. Mantenimiento / Ingeniería

### 10.1 Tickets
- Creación de ticket por cualquier departamento
- Prioridad: baja, media, alta, urgente
- Categoría: plomería, electricidad, A/C, carpintería, pintura, electrónica, áreas comunes, otros
- Asignación a técnico
- Estatus: abierto, en progreso, en espera de material, resuelto, cerrado
- Tiempo de respuesta y resolución
- Evidencia fotográfica antes/después
- Notificaciones automáticas al reportante

### 10.2 Mantenimiento preventivo
- Calendario de mantenimiento por activo
- Frecuencia configurable (diario, semanal, mensual, trimestral, anual)
- Checklist por tipo de mantenimiento
- Generación automática de órdenes de trabajo
- Historial de mantenimiento por activo
- Costos acumulados por activo

### 10.3 Activos y equipos
- Catálogo de activos: equipos A/C, elevadores, bombas, calderas, generadores, etc.
- Ubicación, marca, modelo, número de serie
- Fecha de compra, garantía, vida útil
- Proveedor de servicio
- Documentos adjuntos (manuales, garantías)
- Depreciación vinculada a contabilidad

### 10.4 Habitaciones fuera de servicio
- Registro de habitación fuera de orden con motivo y fecha estimada de liberación
- Impacto automático en inventario disponible
- Notificación a revenue / reservaciones
- Aprobación requerida para sacar de inventario

---

## 11. Inventarios, Compras y Almacenes

### 11.1 Catálogo de productos
- Productos por categoría: alimentos, bebidas, suministros, amenidades, limpieza, mantenimiento, boutique
- Unidad de medida, presentación, código interno, código de barras
- Proveedor(es) por producto
- Precio de compra, precio promedio, último precio
- Fotografía
- Recetas (para A&B): ingredientes, cantidades, rendimiento, costo teórico
- Sub-recetas y preparaciones base

### 11.2 Almacenes
- Múltiples almacenes: central, cocina, bar, housekeeping, mantenimiento, boutique
- Existencias en tiempo real por almacén
- Máximos y mínimos con alertas
- Traspasos entre almacenes
- Entradas por compra
- Salidas por consumo / requisición
- Ajustes de inventario (merma, robo, donación, caducidad)
- Conteos cíclicos programados
- Inventario físico periódico con conciliación

### 11.3 Compras
- Requisiciones por departamento con autorización
- Orden de compra con aprobación por monto
- Recepción de mercancía con validación vs orden de compra
- Devoluciones a proveedor
- Catálogo de proveedores con evaluación
- Comparativo de precios entre proveedores
- Historial de compras por producto y proveedor

### 11.4 Costeo
- Costo de receta teórico vs real
- Costo de venta por outlet
- Porcentaje de costo de alimentos y bebidas
- Variaciones de costo
- Consumo por centro de costo
- Integración automática con contabilidad

---

## 12. BI y Reportería

### 12.1 Dashboards ejecutivos
- Dashboard de Director General: ocupación, ADR, RevPAR, ingresos totales, GOP, alertas
- Dashboard de Revenue: forecast, pick-up, pace, segmentación, restricciones
- Dashboard de Ventas: pipeline, producción, conversión, top cuentas
- Dashboard de Finanzas: ingresos vs presupuesto, costos, CxC, flujo de caja
- Dashboard de Operación: housekeeping, mantenimiento, satisfacción, incidencias
- Dashboard de A&B: ventas por outlet, costo de venta, covers, ticket promedio

### 12.2 Reportes operativos
- Lista de llegadas / salidas / in-house
- Reporte de ocupación por día, semana, mes
- Reporte de disponibilidad por tipo
- Reporte de producción por canal
- Reporte de producción por segmento
- Reporte de no shows y cancelaciones
- Reporte de auditoría nocturna
- Reporte de housekeeping
- Reporte de mantenimiento
- Reporte de consumos all inclusive
- Reporte de consumos extras

### 12.3 Reportes financieros
- Estado de resultados por departamento (USALI)
- Balance general
- Flujo de efectivo
- Presupuesto vs real
- Aged receivables
- Ingresos por outlet
- Costo de venta por outlet
- Comisiones por agencia / OTA
- Conciliación de OTAs
- Impuestos por periodo

### 12.4 Reportes comerciales
- Producción por cuenta
- Producción por ejecutivo
- Pipeline por etapa
- Conversión de cotizaciones
- Room nights por segmento
- Grupos confirmados vs proyectados
- Eventos por periodo y tipo
- Ingresos de eventos y banquetes

### 12.5 Comparativos
- YoY (Year over Year)
- MoM (Month over Month)
- DoW (Day of Week)
- Mismo periodo año anterior
- Tendencias de 12 meses
- Benchmarking vs presupuesto

### 12.6 Exportación
- PDF estilizado
- Excel con datos detallados
- CSV para BI externo
- API para data warehouse
- Reportes programados por email

---

## 13. Automatización e Inteligencia

### 13.1 Asignación inteligente de habitaciones
- Algoritmo que considera: preferencias del huésped, proximidad de grupo, accesibilidad, estatus de limpieza, eficiencia de housekeeping, balance de pisos, upgrades autorizados

### 13.2 Alertas automáticas
- Sobreventa por tipo o fecha
- Grupos con depósito vencido
- Habitaciones fuera de servicio prolongadas
- Allotments por vencer (cut-off)
- Cotizaciones por expirar
- Tareas comerciales vencidas
- Folios con saldo pendiente al check-out
- Inventario bajo mínimo
- Cuentas por cobrar vencidas

### 13.3 Recomendaciones
- Upgrade automático sugerido (por perfil de huésped, disponibilidad, programa de lealtad)
- Tarifa sugerida por revenue (basado en demanda y competencia)
- Proveedor sugerido por precio y evaluación
- Asignación de habitación óptima

### 13.4 Detección de anomalías
- Consumos inusuales en POS (monto, frecuencia, horario)
- Descuentos excesivos por usuario
- Cancelaciones inusuales
- Variaciones de costo de receta
- Discrepancias de inventario

### 13.5 Mensajería automática
- Confirmación de reservación por email
- Pre check-in digital 48h antes
- Bienvenida por WhatsApp al check-in
- Encuesta de satisfacción al check-out
- Agradecimiento post-estancia
- Recordatorio de pago pendiente
- Notificación de cotización al ejecutivo de ventas

### 13.6 Forecast automático
- Proyección de ocupación basada en: histórico, tendencia, on-the-books, wash factor, eventos de la zona, estacionalidad
- Actualización diaria automática
- Comparativo con forecast manual del revenue manager
