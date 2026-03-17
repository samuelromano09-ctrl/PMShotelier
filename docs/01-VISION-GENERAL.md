# 01 — Visión General del Producto

## Nombre del producto

**Hotelia** — Plataforma Central Hotelera de Nueva Generación

---

## Qué es Hotelia

Hotelia es una plataforma hotelera integral, modular y de nueva generación que unifica en un solo ecosistema todos los sistemas que un hotel necesita para **vender, reservar, hospedar, consumir, facturar, controlar, conciliar, analizar y decidir**. No es solo un PMS: es el sistema nervioso central de la operación hotelera.

Hotelia nace de una premisa simple pero ambiciosa: **un hotelero no debería necesitar 5-8 sistemas desconectados para operar su hotel**. La realidad actual de la mayoría de hoteles resort y all inclusive es un ecosistema fragmentado donde el PMS no habla con el POS, el POS no habla con contabilidad, contabilidad no habla con ventas, y el director general tiene que esperar días o semanas para saber cómo va su negocio.

Hotelia elimina esa fragmentación de raíz.

### Módulos integrados

| Módulo | Función principal | Equivalente que reemplaza |
|--------|-------------------|--------------------------|
| **PMS Core** | Reservaciones, check-in/out, folios, room rack, housekeeping | Opera, Protel, Clock, Hotelogix |
| **CRS / Channel Management** | Motor de reservaciones, distribución, conectividad OTA | SiteMinder, Cubilis, TravelClick |
| **POS Hotelero** | Punto de venta nativo para todos los centros de consumo | Micros, Aloha, Soft Restaurant |
| **All Inclusive Engine** | Motor de planes alimenticios, brazaletes, consumos incluidos | Módulos AI de Opera, desarrollo interno |
| **Grupos, Eventos y Salones** | Bloqueos, rooming lists, BEO, cotizaciones, calendarios | Delphi, Opera Sales & Catering, Excel |
| **COI / ERP Financiero** | Contabilidad, CxC, CxP, facturación, conciliaciones | COI, Aspel, SAP Business One, Contpaq |
| **Revenue Management** | Calendario tarifario, forecast, restricciones, dashboards | IDeaS, Duetto, hojas de cálculo |
| **CRM y Ventas** | Pipeline comercial, cuentas, cotizaciones, seguimiento | Salesforce, HubSpot, Excel |
| **Housekeeping y Mantenimiento** | Estatus real time, asignaciones, tickets, preventivo | Optii, Flexkeeping, papel/radio |
| **Inventarios y Compras** | Almacenes, requisiciones, recetas, costeo, proveedores | SAP, módulos ERP, Excel |
| **BI y Reportería** | Dashboards ejecutivos, reportes operativos y financieros | STR, Excel, BI custom |
| **Automatización e IA** | Preasignación inteligente, alertas, forecast, anomalías | No existe integrado |

---

## A quién sirve

### Perfil de propiedad objetivo

**Primario:**
- Hoteles de playa y resort (200-1,000+ habitaciones)
- Propiedades all inclusive y modelos híbridos (EP + AI)
- Hoteles con operación de grupos y eventos (bodas, convenciones, corporativos)
- Hoteles con múltiples centros de consumo (restaurantes, bares, spa, boutique)
- Grupos hoteleros multi-propiedad que necesitan consolidación

**Secundario:**
- Hoteles boutique y de ciudad (50-200 habitaciones)
- Propiedades plan europeo puro con restaurantes y eventos
- Hoteles corporativos urbanos con salones de eventos
- Cadenas regionales o nacionales

**Terciario:**
- Cualquier hotel que necesite PMS + POS + ERP en una sola plataforma
- Operadores independientes con alta complejidad operativa

### Propiedad de referencia para diseño

Hotel de playa en Acapulco — **412 habitaciones**:

| Atributo | Detalle |
|----------|---------|
| **Ubicación** | Acapulco, Guerrero, México |
| **Habitaciones** | 412 llaves en 3 torres (8 pisos) + 2 villas presidenciales |
| **Tipos de habitación** | 12 categorías: Estándar Vista Jardín, Estándar Vista Mar, Superior Vista Jardín, Superior Vista Mar, Deluxe Vista Mar, Deluxe Frente Mar, Junior Suite, Junior Suite Frente Mar, Suite, Suite Premium, Villa, Villa Presidencial |
| **Planes comerciales** | All inclusive estándar, all inclusive premium, plan europeo, desayuno incluido, media pensión, pensión completa |
| **Restaurantes** | 5: El Buffet (principal, 350 pax), La Hacienda (mexicano, 120 pax), Trattoria (italiano, 80 pax), Sakura (asiático, 60 pax), La Palapa (snack bar playa, 100 pax) |
| **Bares** | 3: Lobby Bar (50 pax), Pool Bar (80 pax), Beach Bar (60 pax) |
| **Otros outlets** | Boutique, Spa (8 cabinas + área húmeda), Gimnasio, Business Center, Room Service, Lavandería Express |
| **Salones** | 4: Gran Salón (500 pax), Salón Pacífico (200 pax), Salón Diamante (100 pax), Sala Ejecutiva (30 pax) + Terraza Eventos (300 pax) |
| **Albercas** | 3: Principal, Adultos, Infantil |
| **Segmentos** | OTAs 35%, Agencias 25%, Grupos 20%, Corporativo 10%, Directo 10% |
| **Temporadas** | Alta (dic-abr), Media (jul-ago, puentes), Baja (may-jun, sep-nov) |
| **Personal** | ~280 colaboradores, ~60 usuarios del sistema |
| **Facturación mensual** | $15-25M MXN dependiendo temporada |
| **Ocupación promedio anual** | 68-72% |
| **ADR promedio** | $2,800-3,500 MXN (varía por plan y temporada) |

---

## Matriz de stakeholders

### Usuarios operativos

| Rol | Cantidad típica | Dolor actual | Qué resuelve Hotelia | Frecuencia de uso |
|-----|----------------|-------------|---------------------|-------------------|
| **Recepcionista** | 6-8 | Sistemas lentos, muchos clicks para check-in, no ve información del huésped de un vistazo, alterna entre 3 pantallas | Check-in en <90 seg, perfil unificado, vista compacta con todo lo necesario, atajos de teclado | 8h continuas |
| **Reservacionista** | 3-4 | No ve disponibilidad real, captura doble entre PMS y channel manager, errores de tarifa, no sabe qué grupos tienen allotment | Calendario de disponibilidad real time, tarifas centralizadas, reserva en <2 min, vista de allotments integrada | 8h continuas |
| **Cajero/Mesero POS** | 15-25 | POS genérico que no distingue consumo incluido vs extra, no carga a habitación fácilmente, cortes de caja confusos | POS nativo hotelero con validación AI automática, cargo a habitación en 2 toques, corte guiado paso a paso | 6-8h turno |
| **Capitán de meseros** | 4-5 | No puede abrir/cerrar mesas fácilmente, no ve estatus de comandas, no controla propinas | Vista de salón interactiva, comandas real time, split de cuentas intuitivo, control de propinas | 8h turno |
| **Ama de llaves** | 2-3 | Reportes impresos, no sabe prioridades, no recibe cambios de estatus real time, discrepancias toman horas resolver | App móvil con asignación inteligente, estatus real time, prioridades automáticas, discrepancias en 1 click | 8h diarias |
| **Camarista** | 30-40 | No sabe qué habitación seguir, no puede reportar desperfectos fácilmente, sin retroalimentación | App móvil con lista de trabajo, reporte de mantenimiento con foto en 3 toques, notificación de inspección | 8h turno |
| **Auditor nocturno** | 1-2 | Proceso manual tedioso de 2-4 horas, errores difíciles de rastrear, cuadra PMS con POS manualmente | Auditoría automatizada con validaciones, ejecución en <15 min, alertas de discrepancias, reconciliación automática | 1-2h noche |
| **Coordinador de eventos** | 2-3 | Excel para cotizaciones, no ve disponibilidad de salones, pierde seguimiento de BEOs, no conecta con cocina | Calendario visual de salones, cotizaciones automáticas, BEO integrado con cocina, pipeline visual | 8h diarias |
| **Bellboy / Concierge** | 4-6 | No sabe qué habitación asignaron, no ve notas especiales del huésped | Vista rápida de asignación, alertas VIP, notas de preferencias visibles | 8h turno |
| **Técnico de mantenimiento** | 5-8 | Reportes en papel, no sabe prioridad, no hay seguimiento de tiempos, no tiene historial de activos | App móvil con tickets priorizados, fotos, tiempos de respuesta, historial por activo | 8h turno |

### Usuarios administrativos y comerciales

| Rol | Dolor actual | Qué resuelve Hotelia | Frecuencia |
|-----|-------------|---------------------|-----------|
| **Revenue Manager** | Datos dispersos, no tiene forecast confiable, ajusta tarifas en otro sistema, tarda horas en analizar pick-up | Dashboard unificado ADR/RevPAR/OCC real time, calendario tarifario integrado, forecast automático, pick-up instantáneo | 4-6h/día |
| **Director de Ventas** | Pipeline en Excel, no sabe producción por cuenta, no tiene visibilidad de huecos comerciales | CRM nativo con pipeline visual, producción histórica por cuenta, alertas de fechas por vender, reportes automáticos | 3-5h/día |
| **Ejecutivo de Ventas** | Cotizaciones manuales en Word, seguimiento disperso en correo, no sabe estatus de grupos, pierde follow-ups | Cotizador integrado, seguimiento automático, vista completa desde prospección hasta operación | 6-8h/día |
| **Contralor / CFO** | Contabilidad separada del PMS, conciliaciones de 2 días, cierre mensual de 5-10 días, no distingue ingresos AI vs EP | Contabilidad nativa con pólizas automáticas, cierre en 1-2 días, separación automática AI/EP, USALI nativo | 4-6h/día |
| **Auxiliar contable** | Captura doble de pólizas, conciliación manual de OTAs, facturación lenta, errores frecuentes | Pólizas automáticas, conciliación sugerida OTAs, facturación electrónica integrada, validaciones real time | 8h/día |
| **Director General** | Llama a 5 personas para saber cómo va el hotel, reportes llegan tarde, no compara vs presupuesto fácilmente | Dashboard ejecutivo real time con KPIs, alertas automáticas, comparativos YoY/MoM/vs budget | 30-60 min/día |
| **Gerente de A&B** | No sabe costo real de platillos, no distingue consumos AI vs EP, mermas invisibles | Recetas con costeo automático, trazabilidad AI vs EP, control de mermas, margen por platillo | 3-5h/día |
| **Gerente de Compras** | Requisiciones en papel, no compara precios, no controla inventario real time | Flujo digital de compras, comparativos automáticos, inventario real time por almacén | 4-6h/día |

### Usuarios tecnológicos y estratégicos

| Rol | Dolor actual | Qué resuelve Hotelia |
|-----|-------------|---------------------|
| **Director de TI** | 5-8 sistemas desconectados, integraciones frágiles tipo FTP/archivo plano, sin API real, cada actualización rompe algo | API-first, webhooks, arquitectura moderna, integraciones nativas, un solo sistema |
| **Administrador de sistemas** | Permisos difíciles de gestionar, sin auditoría real, usuarios comparten passwords | RBAC granular, bitácora inmutable, MFA, control por propiedad/departamento/turno |
| **Propietario / Inversionista** | No tiene visibilidad del negocio, depende del DG para todo, no compara propiedades | Dashboard de portafolio, P&L por propiedad, comparativos multi-hotel, alertas de rentabilidad |

---

## Propuesta de valor

### Para el hotelero / propietario

> **"Un solo sistema que reemplaza 5-8 herramientas desconectadas, reduce errores operativos en un 70%, acelera procesos clave 3-5x, y da visibilidad total del negocio en tiempo real — desde la reservación hasta el estado de resultados."**

### Los 8 pilares de valor

#### 1. Plataforma unificada — cero fricción entre módulos

La reservación fluye automáticamente al folio, al room rack, al housekeeping, al POS (para validar plan alimenticio), a la facturación y a la contabilidad. Un cargo en POS se refleja instantáneamente en el folio del huésped, en el estado de resultados del outlet, en el dashboard del director y en el asiento contable correspondiente.

**Ejemplo concreto:** Un huésped all inclusive consume en el restaurante italiano. El mesero valida su brazalete en el POS → el sistema verifica que el consumo está incluido → registra el consumo para trazabilidad → si pidió un vino premium fuera de plan, genera el cargo extra al folio → actualiza el ingreso del outlet → genera el asiento contable distinguiendo consumo incluido vs extra. Todo automático, en tiempo real, sin intervención manual.

#### 2. All inclusive como ciudadano de primera clase

No es un parche sobre un PMS de plan europeo. El motor de all inclusive entiende:
- Planes diferenciados (estándar, premium, kids, grupos)
- Brazaletes y credenciales con validación en POS
- Restricciones por horario, por outlet, por edad, por mercado
- Límites de consumo (monetarios o por cantidad)
- Consumos premium con cargo extra automático
- Reglas por huésped, por habitación, por noche, por paquete
- Trazabilidad total: qué se consumió incluido y qué se cobró aparte

#### 3. Grupos y eventos integrados al core

El grupo vive junto con la reservación, el folio, el salón, la facturación y el CRM. Desde la cotización hasta la conciliación contable del evento, todo conectado. Calendario visual de salones con disponibilidad, montajes, ingresos proyectados y responsables. BEO auto-generado. Coordinación con cocina, servicio y operaciones.

#### 4. ERP contable-financiero nativo para hotelería

Cada transacción operativa genera automáticamente su asiento contable con mapeo USALI. Catálogo contable preconfigurado para hotelería. CxC con aging, city ledger, comisiones de OTAs y agencias, conciliación automática. Facturación electrónica CFDI nativa. No necesitas exportar a otro sistema para cerrar el mes.

#### 5. UX de nueva generación

Interfaz limpia, rápida, moderna — cero sensación de software legacy. Curva de aprendizaje mínima: un recepcionista nuevo opera en 2-4 horas. Atajos de teclado, búsqueda global tipo Command Palette, drag & drop, dark mode. Dashboards personalizables por rol. Responsive: desktop para administración, tablet para supervisión, móvil para operación.

#### 6. Revenue management integrado

Calendario tarifario visual con restricciones (min stay, CTA, CTD, stop sell). Forecast con pick-up diario y wash factor. Métricas real time: OCC, ADR, RevPAR, TRevPAR, GOPPAR. Segmentación completa. Análisis de desplazamiento. Alertas de oportunidades y riesgos.

#### 7. API-first y arquitectura abierta

API REST documentada con OpenAPI/Swagger. Webhooks para eventos real time. Integraciones nativas con channel managers, OTAs, cerraduras electrónicas, pasarelas de pago, facturación electrónica, BI tools. SDK para desarrolladores.

#### 8. Multi-propiedad y escalable

Desde un hotel independiente hasta un grupo de 50+ propiedades. Multi-moneda (MXN, USD, EUR), multi-idioma (ES, EN, PT, FR), multi-empresa, multi-régimen fiscal. Consolidación a nivel grupo. Cada propiedad con su propia configuración.

---

## Filosofía de diseño

### 10 principios rectores

| # | Principio | Significado | Ejemplo |
|---|-----------|-------------|---------|
| 1 | **Dato único, captura única** | Toda información se ingresa una vez y se propaga automáticamente | El nombre del huésped se captura en la reservación y aparece en folio, POS, housekeeping, factura |
| 2 | **Tiempo real, siempre** | Todo refleja el estado actual sin refrescar ni procesos batch | Disponibilidad, estatus de habitación, saldo de folio, dashboard — siempre actualizados |
| 3 | **Tres clicks o menos** | Las acciones frecuentes en máximo 3 interacciones | Cargar a habitación: producto → habitación → confirmar |
| 4 | **Contexto inteligente** | Información relevante según rol y tarea actual | Recepcionista ve alertas de llegadas; revenue manager ve pick-up y forecast |
| 5 | **Automatización con control** | El sistema sugiere y calcula, pero el humano decide | Preasignación sugerida, pero el recepcionista puede cambiarla |
| 6 | **Trazabilidad total** | Cada acción registrada: quién, cuándo, qué, desde dónde | Bitácora inmutable para auditoría y resolución de disputas |
| 7 | **Simplicidad no es simplismo** | Simple para operar, profundo para administrar | Un mesero ve 4 botones; un gerente ve recetas, costos y márgenes |
| 8 | **Mobile-ready por naturaleza** | Módulos operativos funcionan en móvil/tablet | Housekeeping, mantenimiento, POS tablet, supervisión |
| 9 | **Offline-resilient** | Operaciones críticas funcionan sin conexión temporal | POS registra ventas offline y sincroniza al reconectarse |
| 10 | **Seguridad enterprise** | Protección de datos, cumplimiento, control de acceso | Encriptación AES-256, RBAC, MFA, auditoría, PCI-DSS |

---

## Metáfora del producto

> Hotelia es al hotelero lo que un cockpit moderno es a un piloto: **un centro de mando unificado donde toda la información crítica está visible, cada control está al alcance, y el sistema trabaja contigo para anticipar problemas antes de que ocurran.**

No es un conjunto de herramientas pegadas con cinta. Es **un solo instrumento afinado** para la complejidad de la operación hotelera.

---

## Posicionamiento de mercado

### Categoría

**Unified Hospitality Platform (UHP)** — categoría emergente que combina PMS + POS + CRS + ERP + CRM + Revenue en una sola solución cloud-native.

### Análisis competitivo

| Competidor | Tipo | Fortaleza | Debilidades que Hotelia resuelve |
|------------|------|-----------|----------------------------------|
| **Oracle OPERA Cloud** | Enterprise | Estándar de grandes cadenas, profundidad funcional | UX anticuada, costoso ($15-30/hab/mes), requiere consultores, sin POS/ERP/CRM nativo, implementación 6-12 meses |
| **Protel (Planet)** | Enterprise europeo | Buena presencia en resorts europeos | Arquitectura legacy Windows, all inclusive limitado, sin ERP, UI de los 2000s |
| **Cloudbeds** | Cloud SaaS | Excelente UX, channel manager incluido | Sin ERP, POS básico, grupos débil, no escala a 400+ habitaciones, sin AI real |
| **Mews** | Cloud SaaS | Moderna, buena API, marketplace | Sin ERP, sin all inclusive real, sin eventos/salones, enfocado en urbanos |
| **Stayntouch** | Cloud mobile | Cloud-native, check-in digital | Sin ERP, sin POS robusto, sin grupos avanzados, limitada para resorts |
| **OPERA + Micros + SAP + Salesforce** | Stack completo | Cada pieza potente individualmente | 4 sistemas, 4 contratos, 4 soportes, integraciones frágiles, $40-80/hab/mes |

### Posicionamiento único

> **"La primera plataforma hotelera que combina la profundidad funcional de un PMS enterprise con la experiencia de uso de un SaaS moderno, más ERP contable nativo, POS hotelero integrado, motor all inclusive y módulo de grupos/eventos — todo cloud-native, en una sola plataforma."**

---

## Impacto esperado

### Eficiencia operativa

| Proceso | Tiempo actual (industria) | Con Hotelia | Reducción |
|---------|--------------------------|-------------|-----------|
| Check-in completo | 5-8 minutos | < 90 seg (express: 15 seg) | 75-95% |
| Creación de reservación | 4-6 minutos | < 2 minutos | 60-70% |
| Cargo a habitación desde POS | 45-90 segundos | < 10 segundos | 80-90% |
| Auditoría nocturna | 2-4 horas | < 15 minutos | 90-95% |
| Cierre mensual contable | 5-10 días | 1-2 días | 70-80% |
| Cotización de grupo/evento | 2-4 horas | 15-30 minutos | 85-90% |
| Generación de BEO | 30-60 minutos | 5 min (auto-generado) | 85-90% |
| Conciliación de OTAs | 4-8 horas/semana | 30 min/semana | 90% |
| Reporte de ocupación | 15-30 min (manual) | Tiempo real | 100% |
| Asignación de camaristas | 30-45 minutos | 5 min (auto-sugerida) | 85% |

### Calidad y control

| Métrica | Actual | Objetivo |
|---------|--------|---------|
| Errores de captura por turno | 8-15 | < 2 |
| Discrepancias de housekeeping | 10-20/día | < 3/día |
| Folios con errores al check-out | 15-25% | < 3% |
| Tiempo para detectar anomalía de consumo | Días o nunca | Minutos (alerta) |
| Sistemas necesarios para operar | 5-8 | 1 |
| Tiempo de capacitación nuevo usuario | 2-4 semanas | 2-4 horas (operativo) |

### Impacto en ingresos

| Área | Impacto esperado |
|------|-----------------|
| Revenue management | +3-5% RevPAR por mejor gestión de tarifas |
| Reducción de no-shows | -15-20% por confirmación automática |
| Upselling en check-in | +$50-150K MXN/año por sugerencias de upgrade |
| Captura de extras AI | +$200-500K MXN/año por mejor trazabilidad |
| Productividad de ventas | +10-15% más cotizaciones por automatización |
| Shift a canal directo | -2-3% comisiones por booking engine propio |

---

## Principios de producto no negociables

1. **Velocidad ante todo**: Ninguna pantalla más de 200ms en cargar. Ninguna acción frecuente más de 500ms.
2. **Cero captura doble**: Si un dato se ingresó una vez, no se vuelve a pedir jamás.
3. **Auditable siempre**: Cada cambio tiene quién, cuándo y qué.
4. **Hotelería real**: Diseñado por y para hoteleros, no por informáticos que nunca operaron un hotel.
5. **Escalable desde día uno**: Desde 1 hotel de 50 habitaciones hasta 50 propiedades sin rediseñar.
6. **Abierto pero seguro**: API-first con seguridad enterprise.
7. **Bello y funcional**: Cada decisión visual tiene razón operativa.
8. **Offline-capable**: El hotel no para por una caída de internet de 30 minutos.
9. **Localizado para LATAM**: CFDI México, multi-moneda, impuestos locales, español nativo.
10. **Evolución continua**: Modular — agregar funcionalidad sin romper lo existente.

---

## Resumen ejecutivo

Hotelia no es solo un PMS — es **la plataforma central que un hotel necesita para vender, operar, controlar y crecer**. Diseñada para la complejidad real de hoteles resort, all inclusive, con grupos, eventos, múltiples outlets y contabilidad integrada, pero flexible para cualquier tipo de propiedad.

Un solo sistema. Cero fricción. Visibilidad total. Control absoluto. Experiencia de uso extraordinaria.

**El futuro de la operación hotelera.**
