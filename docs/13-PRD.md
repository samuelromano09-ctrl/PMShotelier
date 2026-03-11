# M. PRD — Product Requirements Document

---

## Hotelia: Plataforma Central Hotelera de Nueva Generación

**Versión:** 1.0
**Fecha:** Marzo 2026
**Autor:** Equipo de Producto Hotelia
**Estado:** Draft para revisión

---

## 1. Resumen Ejecutivo

### Problema
Los hoteles con operación compleja (resort, all inclusive, grupos, eventos, múltiples outlets) utilizan entre 4 y 8 sistemas desconectados para operar: PMS, POS, contabilidad, CRM, revenue, inventarios, channel manager, grupos. Esto genera:
- Duplicidad de captura de datos
- Conciliaciones manuales entre sistemas
- Poca visibilidad financiera y operativa
- Errores humanos frecuentes
- Curva de aprendizaje alta
- Costos de licenciamiento y mantenimiento elevados
- Incapacidad de operar all inclusive con trazabilidad real

### Solución
**Hotelia** es una plataforma central hotelera que unifica PMS + POS + CRS + ERP + CRM + Revenue + Grupos/Eventos + Inventarios + BI en un solo ecosistema modular, con UX de nueva generación y arquitectura cloud-native.

### Métricas de éxito
| Métrica | Baseline (sistema actual) | Target Hotelia |
|---------|--------------------------|----------------|
| Tiempo de check-in | 5-8 min | < 3 min |
| Tiempo de cierre de caja POS | 15-20 min | < 5 min |
| Conciliación diaria PMS-Contabilidad | 2-4 horas manual | Automática (0 min) |
| Tiempo de cotización de grupo/evento | 1-2 días | < 30 min |
| Errores de doble captura | 10-15/día | 0 |
| Tiempo de auditoría nocturna | 45-60 min | < 15 min |
| Visibilidad de ocupación por canal | T+1 (día siguiente) | Tiempo real |
| Tiempo de capacitación nuevo usuario | 2-3 semanas | 3-5 días |

---

## 2. Usuarios y Personas

### Persona 1: María — Recepcionista
- **Edad:** 25 años
- **Experiencia tech:** Media (usa smartphone, redes sociales)
- **Frustración:** "El sistema actual tiene demasiados clics para hacer un check-in. Los formularios son confusos y no me dice si la habitación está limpia."
- **Necesita:** Interfaz rápida, intuitiva, que muestre todo lo relevante en una pantalla. Room rack visual. Búsqueda instantánea.

### Persona 2: Roberto — Revenue Manager
- **Edad:** 35 años
- **Experiencia tech:** Alta (Excel avanzado, BI tools)
- **Frustración:** "Paso 3 horas al día sacando datos del PMS a Excel para hacer mi análisis. No tengo pick-up report automatizado ni forecast confiable."
- **Necesita:** Dashboards con datos en tiempo real, forecast integrado, restricciones aplicables desde la misma plataforma, comparativos históricos automáticos.

### Persona 3: Ana — Directora de Ventas
- **Edad:** 40 años
- **Experiencia tech:** Media-alta (CRM básico, email)
- **Frustración:** "Tengo las cotizaciones en Word, el seguimiento en Excel, y los contratos en carpetas. No sé cuánto produce cada cuenta realmente."
- **Necesita:** CRM integrado con pipeline visual, cotizaciones que se convierten en reservaciones/grupos, producción por cuenta automática.

### Persona 4: Carlos — Contralor
- **Edad:** 45 años
- **Experiencia tech:** Media (COI, Excel)
- **Frustración:** "Cada mes paso una semana conciliando el PMS con la contabilidad. Los cargos de POS llegan como un total, no puedo ver el detalle."
- **Necesita:** Pólizas automáticas, trazabilidad transacción→asiento contable, CFDI integrado, CxC/CxP con antigüedad, estado de resultados por departamento.

### Persona 5: Luis — Gerente de A&B
- **Edad:** 38 años
- **Experiencia tech:** Baja-media
- **Frustración:** "El POS no distingue all inclusive de cargo extra. Los meseros no saben qué incluye el plan del huésped. Los costos los saco en Excel."
- **Necesita:** POS con validación de all inclusive, costeo automático por receta, cortes de caja claros, inventario integrado.

### Persona 6: Elena — Ama de Llaves
- **Edad:** 50 años
- **Experiencia tech:** Baja (usa WhatsApp)
- **Frustración:** "Mis camaristas usan hojas impresas. No sé en tiempo real qué habitaciones están listas. Las discrepancias las descubro hasta la noche."
- **Necesita:** App móvil simple para camaristas, tablero de estatus en tiempo real, prioridades automáticas.

---

## 3. Requisitos funcionales por módulo

### 3.1 PMS Core

| ID | Requisito | Prioridad | Criterio de aceptación |
|----|-----------|-----------|----------------------|
| PMS-001 | Crear reservación con búsqueda de disponibilidad | P0-MVP | Reservación creada en < 2 min con confirmación automática |
| PMS-002 | Calendar view de disponibilidad por tipo × fecha | P0-MVP | Grid con filtros, colores por nivel, desglose en hover |
| PMS-003 | Room rack visual tipo tape chart | P0-MVP | Drag and drop de reservaciones, colores por segmento |
| PMS-004 | Check-in con asignación inteligente de habitación | P0-MVP | Sugerencia automática, < 3 min proceso completo |
| PMS-005 | Check-out con revisión de folio | P0-MVP | Revisión de saldo, pago pendiente, facturación opcional |
| PMS-006 | Folios con cargos, pagos, split, routing | P0-MVP | Operaciones CRUD, saldo actualizado en tiempo real |
| PMS-007 | Perfiles de huésped con historial | P0-MVP | Búsqueda, creación, merge, historial de estancias |
| PMS-008 | Tarifas por tipo, temporada, canal | P0-MVP | CRUD de tarifas, aplicación automática en reservaciones |
| PMS-009 | Paquetes con plan alimenticio + extras | P0-MVP | Creación de paquete, aplicación en reservación |
| PMS-010 | No shows y cancelaciones con política | P0-MVP | Proceso automático o manual, cargo configurable |
| PMS-011 | Walk-ins | P0-MVP | Creación de reservación + check-in inmediato |
| PMS-012 | Express check-in (pre-registro digital) | P1-V2 | Link enviado al huésped, datos pre-llenados |
| PMS-013 | Express check-out | P1-V2 | Folio pre-autorizado, salida sin pasar por recepción |
| PMS-014 | Overbooking control con alertas | P1-V2 | Umbral configurable, alerta automática, walk tracking |
| PMS-015 | Waitlist con notificación automática | P1-V2 | Lista de espera, notificación cuando hay disponibilidad |
| PMS-016 | Cambios de habitación | P0-MVP | Move en room rack, actualización de folio |
| PMS-017 | Upgrades con autorización | P1-V2 | Sugerencia automática, aprobación, registro |
| PMS-018 | Early check-in / late check-out con cargo | P0-MVP | Cargo configurable, registro en folio |

### 3.2 POS

| ID | Requisito | Prioridad | Criterio de aceptación |
|----|-----------|-----------|----------------------|
| POS-001 | Configuración de outlets | P0-MVP | Alta de outlet con horarios, impuestos, catálogo |
| POS-002 | Apertura de cuenta por mesa/habitación/nombre | P0-MVP | Validación de huésped activo para cargo a habitación |
| POS-003 | Catálogo de productos con categorías y búsqueda | P0-MVP | Navegación por categoría + búsqueda + favoritos |
| POS-004 | Cargo a habitación | P0-MVP | Validación de huésped, cargo automático a folio |
| POS-005 | Validación all inclusive en POS | P0-MVP | Indicador claro: incluido vs cargo extra |
| POS-006 | Corte de caja por turno/cajero | P0-MVP | Arqueo, desglose por método de pago, cierre |
| POS-007 | Comandas a cocina/bar | P0-MVP | Impresión o pantalla KDS |
| POS-008 | División de cuentas | P0-MVP | Por producto, por partes iguales |
| POS-009 | Descuentos y cortesías con autorización | P0-MVP | Motivo obligatorio, autorización por nivel |
| POS-010 | Cancelación de productos con auditoría | P0-MVP | Motivo, autorización, registro inmutable |
| POS-011 | Múltiples listas de precios por outlet | P1-V2 | Regular, happy hour, evento especial, grupo |
| POS-012 | Room service con menú específico | P1-V2 | Menú diferenciado, cargo por servicio |
| POS-013 | Boutique con inventario por pieza | P1-V2 | SKU, código de barras, stock |

### 3.3 All Inclusive

| ID | Requisito | Prioridad | Criterio de aceptación |
|----|-----------|-----------|----------------------|
| AI-001 | Definición de planes alimenticios | P0-MVP | EP, BB, HB, FB, AI, AIP configurables |
| AI-002 | Reglas por outlet, horario, producto | P0-MVP | Motor de reglas evaluable en POS |
| AI-003 | Validación de elegibilidad en POS | P0-MVP | < 100ms respuesta, indicador visual claro |
| AI-004 | Cargo automático de excedentes | P0-MVP | Si excede plan → cargo a folio automático |
| AI-005 | Brazaletes / credenciales | P1-V2 | Asignación por plan, escaneo en POS |
| AI-006 | Límites de consumo (por comida, día, estancia) | P1-V2 | Configurables por plan, validados en POS |
| AI-007 | Restricciones por edad | P1-V2 | Adulto, menor, infante con reglas diferenciadas |
| AI-008 | Trazabilidad de consumos incluidos | P0-MVP | Registro detallado para costeo y BI |
| AI-009 | Costeo de AI por huésped-noche | P1-V2 | Cálculo automático, reporte comparativo |

### 3.4 Grupos y Eventos

| ID | Requisito | Prioridad | Criterio de aceptación |
|----|-----------|-----------|----------------------|
| GRP-001 | Creación de grupo con bloqueo | P1-V2 | Bloqueo por tipo × fecha, cut-off configurable |
| GRP-002 | Rooming list (carga masiva) | P1-V2 | Upload Excel, mapeo automático, validación |
| GRP-003 | Folio maestro y subfolios | P1-V2 | Routing configurable grupo vs huésped |
| GRP-004 | Depósitos y calendario de pagos | P1-V2 | Programación, alertas, registro |
| GRP-005 | Cotización de grupo | P1-V2 | Template, versiones, conversión a grupo confirmado |
| GRP-006 | Contrato de grupo | P1-V2 | Template, firma digital |
| EVT-001 | Creación de evento con asignación de salón | P1-V2 | Calendario visual, validación de conflictos |
| EVT-002 | BEO (Banquet Event Order) | P1-V2 | Documento completo, imprimible/PDF |
| EVT-003 | Cotización de evento | P1-V2 | Habitaciones + salón + A&B + equipo + extras |
| EVT-004 | Calendario de salones | P1-V2 | Vista diaria/semanal/mensual, drag and drop |
| EVT-005 | Facturación por evento | P1-V2 | Cargos a folio maestro, factura consolidada |

### 3.5 Finanzas

| ID | Requisito | Prioridad | Criterio de aceptación |
|----|-----------|-----------|----------------------|
| FIN-001 | Catálogo contable | P0-MVP | Multinivel, personalizable |
| FIN-002 | Pólizas automáticas PMS/POS | P0-MVP | Cada transacción genera asiento contable |
| FIN-003 | Auditoría nocturna | P0-MVP | Proceso automatizado, reporte completo |
| FIN-004 | CFDI 4.0 (facturación electrónica) | P0-MVP | Emisión, timbrado, cancelación |
| FIN-005 | CxC - City ledger | P0-MVP | Saldos por empresa, antigüedad, cobranza |
| FIN-006 | CxP | P1-V2 | Registro de facturas, programación de pagos |
| FIN-007 | Conciliación bancaria | P1-V2 | Automática y manual |
| FIN-008 | Estado de resultados USALI | P1-V2 | Por departamento, actual vs presupuesto vs YA |
| FIN-009 | Cierres mensuales | P1-V2 | Validaciones, bloqueo de periodo |
| FIN-010 | Complementos de pago CFDI | P1-V2 | Generación automática al registrar pago |

---

## 4. Requisitos no funcionales

| Categoría | Requisito | Especificación |
|-----------|-----------|----------------|
| **Performance** | Tiempo de respuesta API | < 200ms p95 para operaciones CRUD |
| **Performance** | Búsqueda global | < 300ms con resultados relevantes |
| **Performance** | Auditoría nocturna (400 habs) | < 2 minutos |
| **Performance** | Carga de dashboard | < 1 segundo |
| **Disponibilidad** | Uptime | 99.9% SLA |
| **Disponibilidad** | RTO | < 4 horas |
| **Disponibilidad** | RPO | < 1 hora |
| **Seguridad** | Autenticación | JWT + MFA opcional |
| **Seguridad** | Datos de tarjeta | Tokenización, no almacenamiento de PAN |
| **Seguridad** | Encriptación | TLS 1.3 en tránsito, AES-256 en reposo |
| **Seguridad** | Audit trail | Inmutable, retención 5 años |
| **Escalabilidad** | Propiedades | Hasta 100 hoteles por instancia |
| **Escalabilidad** | Habitaciones | Hasta 2,000 por propiedad |
| **Escalabilidad** | Transacciones | 10,000+ por día por propiedad |
| **Usabilidad** | Capacitación | Nuevo usuario operativo en < 5 días |
| **Usabilidad** | Accesibilidad | WCAG 2.1 AA |
| **Compatibilidad** | Navegadores | Chrome, Safari, Edge, Firefox (últimas 2 versiones) |
| **Compatibilidad** | Dispositivos | Desktop (1440px+), Tablet (768px+), Mobile (360px+) |
| **Localización** | Idiomas | Español (base), Inglés |
| **Localización** | Moneda | MXN (base), USD, EUR |
| **Localización** | Zona horaria | Configurable por propiedad |
| **Localización** | Fiscal | CFDI 4.0 México, extensible a otros países |

---

## 5. Dependencias y restricciones

### Dependencias externas
- PAC (Proveedor Autorizado de Certificación) para CFDI
- Channel Manager API para conectividad con OTAs
- Pasarela de pago para cobros con tarjeta
- Servicio de email transaccional
- WhatsApp Business API (Fase 3)

### Restricciones
- El sistema debe cumplir con la regulación fiscal mexicana vigente (CFDI 4.0)
- Los datos de tarjeta de crédito NO deben almacenarse (tokenización obligatoria)
- La auditoría nocturna no puede ejecutarse si hay POS sin cerrar caja
- Los cierres mensuales contables son irreversibles

---

## 6. Fuera de alcance (explícito)

- **Revenue Management System completo** (tipo IDeaS/Duetto) — Hotelia incluye herramientas de apoyo pero no reemplaza un RMS dedicado con ML avanzado en MVP
- **Property Management de áreas comunes** (mantenimiento de albercas, jardines como módulo dedicado)
- **Nómina y recursos humanos**
- **E-commerce / venta de merchandise online**
- **Loyalty program propio** (integración con programas existentes sí)
- **Guest-facing app** (Fase 3, no MVP ni V2)

---

## 7. Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|-----------|
| Complejidad de reglas AI demasiado alta | Media | Alto | Iterar con hoteles piloto, comenzar con reglas simples |
| Resistencia al cambio del personal | Alta | Alto | UX excepcional, capacitación gamificada, migración gradual |
| Integraciones con channel managers lentas | Media | Medio | Comenzar con 1-2 CM principales, expandir después |
| Requisitos fiscales cambiantes (SAT) | Media | Medio | Arquitectura flexible para reglas fiscales |
| Performance con muchas habitaciones + transacciones | Baja | Alto | Pruebas de carga desde MVP, optimización continua |

---

## 8. Plan de lanzamiento

### Fase Alpha (Mes 5)
- Ambiente de pruebas con datos simulados
- Testing interno del equipo
- 1 hotel piloto (ambiente de staging)

### Fase Beta (Mes 6)
- 1-2 hoteles piloto en producción (operación paralela con sistema anterior)
- Feedback intensivo de usuarios reales
- Iteración rápida de UX y bugs

### GA (General Availability) — Mes 7
- MVP disponible para nuevos clientes
- Soporte 24/7 durante primeros 30 días
- Documentación completa
- Onboarding asistido

### V2 Launch — Mes 12
- Módulos de grupos, eventos, revenue, CRM, housekeeping avanzado
- Migración de datos de sistemas anteriores
- Expansión a más hoteles
