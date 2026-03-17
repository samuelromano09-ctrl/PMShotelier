# D. Flujos de Usuario Clave

---

## Flujo 1: Crear Reservación

```
┌─────────────────────────────────────────────────────────────────┐
│                    CREAR RESERVACIÓN                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. BÚSQUEDA DE DISPONIBILIDAD                                 │
│     ├── Seleccionar fechas (check-in / check-out)              │
│     ├── Seleccionar # de habitaciones                          │
│     ├── Seleccionar # de adultos / menores / infantes          │
│     └── [Opcional] Filtrar por tipo de habitación              │
│                                                                 │
│  2. RESULTADO DE DISPONIBILIDAD                                │
│     ├── Grid visual: tipos disponibles × tarifas × planes      │
│     ├── Mostrar: tarifa por noche, tarifa total, plan incluido │
│     ├── Indicador de últimas habitaciones                      │
│     └── Seleccionar tipo + tarifa + plan                       │
│                                                                 │
│  3. DATOS DEL HUÉSPED                                          │
│     ├── Buscar huésped existente (nombre, email, teléfono)     │
│     ├── O crear nuevo perfil                                   │
│     ├── Autocompletar datos de huésped frecuente               │
│     └── Agregar solicitudes especiales                         │
│                                                                 │
│  4. CONFIGURACIÓN DE RESERVA                                   │
│     ├── Confirmar tarifa y plan                                │
│     ├── Agregar extras (early CI, late CO, cama extra)         │
│     ├── Seleccionar canal / segmento / fuente                  │
│     ├── [Opcional] Vincular a grupo o empresa                  │
│     ├── Configurar routing de cargos                           │
│     └── Notas internas                                         │
│                                                                 │
│  5. GARANTÍA / DEPÓSITO                                        │
│     ├── Registrar garantía (tarjeta, depósito, empresa)        │
│     ├── Cobrar depósito si aplica                              │
│     └── Sin garantía (con autorización)                        │
│                                                                 │
│  6. CONFIRMACIÓN                                               │
│     ├── Resumen completo de la reservación                     │
│     ├── Confirmar → genera # de confirmación                   │
│     ├── Enviar confirmación por email                          │
│     └── Reserva aparece en calendar view y lista de llegadas   │
│                                                                 │
│  TIEMPO OBJETIVO: < 2 minutos para reserva estándar            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flujo 2: Check-in

```
┌─────────────────────────────────────────────────────────────────┐
│                       CHECK-IN                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. IDENTIFICAR RESERVACIÓN                                     │
│     ├── Buscar por: nombre, # confirmación, apellido            │
│     ├── O seleccionar desde lista de llegadas del día           │
│     └── Verificar datos del huésped                             │
│                                                                 │
│  2. ASIGNAR HABITACIÓN                                          │
│     ├── Sistema sugiere habitación óptima automáticamente       │
│     ├── Recepcionista puede cambiar desde room rack visual      │
│     ├── Indicadores: limpia ✓, preferencias ✓, upgrade disp.   │
│     └── Confirmar habitación                                    │
│                                                                 │
│  3. REGISTRO                                                    │
│     ├── Verificar / completar datos del huésped                 │
│     ├── Capturar ID oficial (manual o escaneo)                  │
│     ├── Firma digital de tarjeta de registro                    │
│     └── [Si pre check-in digital] Solo confirmar               │
│                                                                 │
│  4. PLAN Y BRAZALETE (si aplica)                                │
│     ├── Confirmar plan alimenticio                              │
│     ├── Asignar brazalete / credencial AI                       │
│     ├── Explicar beneficios incluidos (imprimible)              │
│     └── Registrar acompañantes                                  │
│                                                                 │
│  5. FOLIO                                                       │
│     ├── Folio generado automáticamente                          │
│     ├── Configurar routing si hay cargos a empresa/agencia      │
│     ├── Verificar garantía / depósito aplicado                  │
│     └── [Grupo] Vincular a folio maestro                        │
│                                                                 │
│  6. ENTREGA DE LLAVES                                           │
│     ├── Generar llave(s) de habitación                          │
│     ├── Entregar información del hotel                          │
│     ├── Activar servicios (Wi-Fi, TV, minibar)                  │
│     └── Check-in completado                                     │
│                                                                 │
│  ALERTAS AUTOMÁTICAS AL CHECK-IN:                               │
│  ⚠ Huésped VIP → protocolo especial                            │
│  ⚠ Huésped frecuente → bienvenida personalizada                │
│  ⚠ Notas especiales → alergia, movilidad reducida              │
│  ⚠ Blacklist → notificar a gerencia                            │
│  ⚠ Saldo previo pendiente → notificar a recepción              │
│                                                                 │
│  TIEMPO OBJETIVO: < 3 minutos check-in estándar                │
│                   < 1 minuto express check-in                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flujo 3: Cargar Consumo a Habitación (POS)

```
┌─────────────────────────────────────────────────────────────────┐
│              CARGAR CONSUMO A HABITACIÓN                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. IDENTIFICAR OUTLET                                          │
│     └── Mesero/cajero ya autenticado en outlet asignado         │
│                                                                 │
│  2. ABRIR CUENTA                                                │
│     ├── Por # de habitación                                     │
│     ├── Por nombre de huésped                                   │
│     ├── Por escaneo de brazalete / QR                           │
│     └── Sistema valida: huésped activo, plan, elegibilidad      │
│                                                                 │
│  3. VALIDACIÓN ALL INCLUSIVE (automática)                        │
│     ├── ¿Huésped tiene plan AI? → Sí/No                        │
│     ├── ¿Outlet incluido en su plan? → Sí/No                   │
│     ├── ¿Horario dentro del plan? → Sí/No                      │
│     ├── ¿Límite no excedido? → Sí/No                           │
│     └── Resultado mostrado visualmente al mesero:               │
│         🟢 Consumo incluido                                     │
│         🟡 Parcialmente incluido (algunos productos con cargo)  │
│         🔴 Consumo con cargo extra                              │
│                                                                 │
│  4. CAPTURA DE PRODUCTOS                                        │
│     ├── Seleccionar productos por categoría o búsqueda          │
│     ├── Modificadores (sin hielo, extra limón, etc.)            │
│     ├── Cada producto indica: incluido ✓ o con cargo $XX       │
│     └── Enviar comanda a cocina/bar                             │
│                                                                 │
│  5. CIERRE DE CUENTA                                            │
│     ├── Resumen: consumos incluidos vs con cargo                │
│     ├── Si todo incluido → firma del huésped → cierre           │
│     ├── Si hay extras → cargo a habitación (folio)              │
│     ├── Propina (incluida o adicional según plan)               │
│     └── Ticket impreso o digital                                │
│                                                                 │
│  6. RESULTADO                                                   │
│     ├── Consumos incluidos registrados para trazabilidad        │
│     ├── Consumos con cargo reflejados en folio de habitación    │
│     └── Póliza contable generada automáticamente                │
│                                                                 │
│  TIEMPO OBJETIVO: < 30 segundos para validar y abrir cuenta    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flujo 4: Alta de Nueva Habitación / Tipo de Habitación

```
┌─────────────────────────────────────────────────────────────────┐
│              ALTA DE TIPO DE HABITACIÓN                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. CREAR TIPO                                                  │
│     ├── Código (ej: JRS, STD-VM, STE-OV)                       │
│     ├── Nombre comercial (ej: Junior Suite Vista Mar)           │
│     ├── Descripción corta                                       │
│     └── Descripción larga (para booking engine)                 │
│                                                                 │
│  2. CONFIGURAR CAPACIDAD                                        │
│     ├── Adultos: estándar / máximo                              │
│     ├── Menores: máximo                                         │
│     ├── Infantes: máximo                                        │
│     └── Total personas máximo                                   │
│                                                                 │
│  3. ATRIBUTOS FÍSICOS                                           │
│     ├── Tamaño (m²)                                             │
│     ├── Configuración de camas (selección visual)               │
│     ├── Vista(s) disponibles                                    │
│     ├── Piso / Edificio / Torre / Zona                          │
│     ├── Balcón / Terraza / Jacuzzi                              │
│     └── Accesible / Conectada / Especial                        │
│                                                                 │
│  4. AMENIDADES                                                  │
│     ├── Checklist visual de amenidades                          │
│     ├── Seleccionar / deseleccionar con un clic                 │
│     └── Amenidades custom si se necesita                        │
│                                                                 │
│  5. PLANES Y TARIFAS                                            │
│     ├── Planes aplicables: EP / AI / Ambos                      │
│     ├── Vincular tarifas existentes o crear nuevas              │
│     └── Suplementos configurables                               │
│                                                                 │
│  6. MEDIA                                                       │
│     ├── Subir fotografías (drag and drop)                       │
│     ├── Ordenar fotografías                                     │
│     ├── Subir plano de habitación                               │
│     └── Vista previa como se vería en booking engine            │
│                                                                 │
│  7. INVENTARIO FÍSICO                                           │
│     ├── Asignar habitaciones individuales al tipo               │
│     ├── Seleccionar desde lista de habitaciones no asignadas    │
│     ├── O crear habitaciones nuevas en lote                     │
│     │   ├── Rango de números (ej: 301-320)                     │
│     │   ├── Piso automático por rango                           │
│     │   └── Edificio / Torre                                    │
│     └── Confirmar asignación                                    │
│                                                                 │
│  8. REVISAR Y GUARDAR                                           │
│     ├── Resumen visual de todo lo configurado                   │
│     ├── Guardar tipo de habitación                              │
│     └── Tipo aparece en calendar view y distribución            │
│                                                                 │
│  CLONAR: duplicar un tipo existente y modificar lo necesario    │
│  EDICIÓN MASIVA: seleccionar múltiples habitaciones y cambiar   │
│  atributos en lote                                              │
│                                                                 │
│  TIEMPO OBJETIVO: < 5 minutos para tipo completo               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flujo 5: Asignación de Salón para Evento

```
┌─────────────────────────────────────────────────────────────────┐
│              ASIGNACIÓN DE SALÓN / EVENTO                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. VERIFICAR DISPONIBILIDAD                                    │
│     ├── Calendario visual de salones                            │
│     ├── Seleccionar fecha(s) y horario                          │
│     ├── Filtrar por capacidad mínima                            │
│     └── Ver salones disponibles con configuraciones posibles    │
│                                                                 │
│  2. SELECCIONAR SALÓN                                           │
│     ├── Click en salón disponible                               │
│     ├── Ver fotos, plano, capacidad por montaje                 │
│     ├── Seleccionar configuración (teatro, escuela, banquete)   │
│     └── Confirmar selección                                     │
│                                                                 │
│  3. CREAR EVENTO                                                │
│     ├── Nombre del evento                                       │
│     ├── Tipo (boda, convención, reunión, cena, etc.)            │
│     ├── Cliente / Empresa / Cuenta CRM                          │
│     ├── Contacto principal                                      │
│     ├── # de asistentes                                         │
│     ├── Horario detallado (montaje, inicio, fin, desmontaje)    │
│     ├── Ejecutivo comercial responsable                         │
│     └── Coordinador operativo                                   │
│                                                                 │
│  4. CONFIGURAR SERVICIOS                                        │
│     ├── Menú de A&B (seleccionar paquete o armar menú custom)   │
│     ├── Bebidas (barra abierta, consumo, paquete)               │
│     ├── Equipo (audio, video, proyección, iluminación)          │
│     ├── Decoración                                              │
│     ├── Montaje especial                                        │
│     └── Extras (valet, estacionamiento, seguridad)              │
│                                                                 │
│  5. COTIZAR                                                     │
│     ├── Sistema calcula automáticamente con precios vigentes    │
│     ├── Ajustar precios / descuentos con autorización           │
│     ├── Generar cotización formal (PDF)                         │
│     ├── Enviar al cliente                                       │
│     └── Estatus: tentativo                                      │
│                                                                 │
│  6. CONFIRMAR                                                   │
│     ├── Cliente acepta → cambiar a confirmado                   │
│     ├── Registrar depósito                                      │
│     ├── Generar BEO (Banquet Event Order)                       │
│     ├── Distribuir BEO a departamentos involucrados             │
│     └── Evento aparece en calendario como confirmado            │
│                                                                 │
│  7. [OPCIONAL] VINCULAR A GRUPO                                 │
│     ├── Si el evento tiene habitaciones → crear grupo           │
│     ├── Bloquear habitaciones                                   │
│     ├── Folio maestro del grupo vinculado al evento             │
│     └── Facturación consolidada: habitaciones + evento          │
│                                                                 │
│  TIEMPO OBJETIVO: < 10 minutos para cotización completa        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flujo 6: Crear Grupo

```
┌─────────────────────────────────────────────────────────────────┐
│                     CREAR GRUPO                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. DATOS GENERALES                                             │
│     ├── Nombre del grupo                                        │
│     ├── Tipo: turístico, corporativo, boda, convención, social  │
│     ├── Empresa / Agencia / Cuenta CRM                          │
│     ├── Contacto principal                                      │
│     ├── Ejecutivo de ventas                                     │
│     ├── Fechas de llegada y salida                              │
│     └── Estimado de habitaciones                                │
│                                                                 │
│  2. BLOQUEO DE INVENTARIO                                       │
│     ├── Seleccionar tipos de habitación y cantidad por tipo     │
│     ├── Tarifa negociada por tipo                               │
│     ├── Plan alimenticio por tipo                               │
│     ├── Fecha de cut-off (liberación automática)                │
│     ├── Sistema valida disponibilidad en tiempo real            │
│     └── Confirmar bloqueo                                       │
│                                                                 │
│  3. CONDICIONES COMERCIALES                                     │
│     ├── Tarifa negociada (neta o comisionable)                  │
│     ├── Comisión a agencia                                      │
│     ├── Cortesías (1x20, 1x15, etc.)                           │
│     ├── Upgrades incluidos                                      │
│     ├── Early check-in / late check-out                         │
│     ├── Amenidades de bienvenida                                │
│     ├── Servicios incluidos (traslado, actividad, etc.)         │
│     └── Penalidad por cancelación                               │
│                                                                 │
│  4. DEPÓSITOS Y PAGOS                                           │
│     ├── Calendario de depósitos                                 │
│     ├── Registrar primer depósito                               │
│     ├── Alertas automáticas de depósitos próximos               │
│     └── Políticas de cancelación                                │
│                                                                 │
│  5. CONTRATO                                                    │
│     ├── Generar contrato desde template                         │
│     ├── Revisar y editar                                        │
│     ├── Enviar para firma                                       │
│     └── Firma digital                                           │
│                                                                 │
│  6. ROOMING LIST                                                │
│     ├── Subir rooming list (Excel/CSV)                          │
│     ├── Mapear columnas automáticamente                         │
│     ├── Editar individual en línea                              │
│     ├── Asignar habitaciones (manual o automático)              │
│     └── Generar subfolios por habitación                        │
│                                                                 │
│  7. FOLIO MAESTRO                                               │
│     ├── Folio maestro del grupo creado automáticamente          │
│     ├── Routing: qué cargos van al maestro vs al huésped       │
│     ├── Visualización de todos los subfolios                    │
│     └── Saldo total del grupo                                   │
│                                                                 │
│  8. SEGUIMIENTO                                                 │
│     ├── Pick-up del grupo (habitaciones tomadas vs bloqueadas)  │
│     ├── Depósitos recibidos vs pendientes                       │
│     ├── Rooming list completado (%)                             │
│     ├── Timeline de actividades del grupo                       │
│     └── Dashboard del grupo con métricas clave                  │
│                                                                 │
│  TIEMPO OBJETIVO: < 15 minutos para grupo completo con bloqueo │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flujo 7: Facturar a Empresa

```
┌─────────────────────────────────────────────────────────────────┐
│                 FACTURACIÓN A EMPRESA                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. IDENTIFICAR FOLIOS A FACTURAR                               │
│     ├── Buscar por empresa / cuenta                             │
│     ├── Buscar por grupo                                        │
│     ├── Buscar por rango de fechas                              │
│     ├── Sistema muestra folios con saldo pendiente              │
│     └── Seleccionar folios a incluir en factura                 │
│                                                                 │
│  2. CONFIGURAR FACTURA                                          │
│     ├── Datos fiscales de la empresa (precargados de cuenta)    │
│     ├── Verificar RFC / razón social                            │
│     ├── Uso de CFDI                                             │
│     ├── Forma de pago                                           │
│     ├── Método de pago                                          │
│     ├── Moneda                                                  │
│     └── Condiciones de pago (crédito a 30, 45, 60 días)        │
│                                                                 │
│  3. DETALLE                                                     │
│     ├── Desglose automático por concepto                        │
│     │   ├── Hospedaje                                           │
│     │   ├── Alimentos                                           │
│     │   ├── Bebidas                                             │
│     │   ├── Eventos / salones                                   │
│     │   ├── Otros servicios                                     │
│     │   └── Impuestos desglosados                               │
│     ├── Factura consolidada o individual por folio              │
│     └── Ajustes / descuentos con autorización                   │
│                                                                 │
│  4. TIMBRAR                                                     │
│     ├── Preview de CFDI                                         │
│     ├── Timbrar ante PAC                                        │
│     ├── Generar PDF y XML                                       │
│     └── Enviar por email automáticamente                        │
│                                                                 │
│  5. REGISTRO                                                    │
│     ├── Factura registrada en CxC                               │
│     ├── Saldo a cobrar con fecha de vencimiento                 │
│     ├── Póliza contable generada automáticamente                │
│     └── Factura visible en el estado de cuenta del cliente      │
│                                                                 │
│  TIEMPO OBJETIVO: < 3 minutos para factura estándar            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flujo 8: Cierre de Caja (POS)

```
┌─────────────────────────────────────────────────────────────────┐
│                    CIERRE DE CAJA                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. VERIFICAR CUENTAS ABIERTAS                                  │
│     ├── Sistema muestra cuentas abiertas del turno              │
│     ├── Cerrar o transferir cuentas pendientes                  │
│     └── No se puede cerrar caja con cuentas abiertas            │
│                                                                 │
│  2. ARQUEO DE FONDO                                             │
│     ├── Contar efectivo en caja                                 │
│     ├── Ingresar monto contado                                  │
│     ├── Sistema muestra fondo de caja esperado                  │
│     └── Diferencia calculada automáticamente                    │
│                                                                 │
│  3. RESUMEN DEL TURNO                                           │
│     ├── Total de ventas                                         │
│     ├── Desglose por método de pago:                            │
│     │   ├── Efectivo                                            │
│     │   ├── Tarjeta                                             │
│     │   ├── Cargo a habitación                                  │
│     │   ├── Consumo incluido (AI)                               │
│     │   └── Otros                                               │
│     ├── Propinas cobradas                                       │
│     ├── Descuentos otorgados                                    │
│     ├── Cortesías                                               │
│     ├── Cancelaciones                                           │
│     ├── Covers (comensales)                                     │
│     └── Ticket promedio                                         │
│                                                                 │
│  4. CONFIRMAR CIERRE                                            │
│     ├── Cajero confirma con su pin / contraseña                 │
│     ├── Supervisor valida si hay diferencias significativas     │
│     ├── Imprimir reporte de cierre                              │
│     └── Caja cerrada — no se pueden agregar ventas al turno    │
│                                                                 │
│  5. RESULTADO                                                   │
│     ├── Reporte de cierre archivado                             │
│     ├── Póliza contable generada automáticamente                │
│     └── Datos disponibles en BI y auditoría                     │
│                                                                 │
│  TIEMPO OBJETIVO: < 5 minutos                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flujo 9: Auditoría Nocturna

```
┌─────────────────────────────────────────────────────────────────┐
│                  AUDITORÍA NOCTURNA                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. PRE-VALIDACIÓN (automática)                                 │
│     ├── Verificar que todos los POS hayan cerrado caja          │
│     ├── Verificar folios sin garantía activa                    │
│     ├── Verificar reservaciones del día sin check-in (no shows) │
│     ├── Verificar discrepancias de housekeeping                 │
│     └── Mostrar alertas que requieren atención                  │
│                                                                 │
│  2. ATENDER ALERTAS                                             │
│     ├── Resolver cuentas POS abiertas                           │
│     ├── Procesar no shows (cancelar o cobrar)                   │
│     ├── Resolver discrepancias de housekeeping                  │
│     ├── Folios sin garantía: contactar huésped o registrar nota │
│     └── Marcar alertas como atendidas                           │
│                                                                 │
│  3. EJECUTAR AUDITORÍA (un clic)                                │
│     ├── Cargo automático de room & tax a folios in-house        │
│     ├── Cargo de no shows según política                        │
│     ├── Aplicación de cargos recurrentes (paquetes, extras)     │
│     ├── Generación de pólizas contables del día                 │
│     ├── Rollover de fecha del sistema                           │
│     └── Barra de progreso durante el proceso                    │
│                                                                 │
│  4. REPORTE DE AUDITORÍA                                        │
│     ├── Resumen de ocupación del día                            │
│     ├── Ingresos por departamento                               │
│     ├── Cargos aplicados (room & tax, servicios, POS)           │
│     ├── Pagos recibidos por método                              │
│     ├── Saldos en folios                                        │
│     ├── No shows procesados                                     │
│     ├── Cancelaciones del día                                   │
│     ├── Variaciones vs día anterior                             │
│     ├── ADR y RevPAR del día                                    │
│     └── Estadísticas de llegadas, salidas, in-house             │
│                                                                 │
│  5. CIERRE DE DÍA                                               │
│     ├── Confirmar cierre de día                                 │
│     ├── Día cerrado — no se pueden modificar transacciones      │
│     ├── Nuevo día operativo activo                              │
│     └── Reporte enviado automáticamente a gerencia              │
│                                                                 │
│  TIEMPO OBJETIVO: < 15 minutos total (sin resolver alertas)    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flujo 10: Conciliación Contable

```
┌─────────────────────────────────────────────────────────────────┐
│               CONCILIACIÓN CONTABLE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. SELECCIONAR TIPO DE CONCILIACIÓN                            │
│     ├── PMS vs Contabilidad (ingresos de hospedaje)             │
│     ├── POS vs Contabilidad (ventas de outlets)                 │
│     ├── OTAs vs PMS vs Banco (pagos de canales)                 │
│     ├── Bancaria (estado de cuenta vs registros)                │
│     └── Grupos (depósitos recibidos vs registrados)             │
│                                                                 │
│  2. DEFINIR PERIODO                                             │
│     ├── Seleccionar rango de fechas                             │
│     └── Filtrar por departamento / outlet / canal               │
│                                                                 │
│  3. REVISIÓN                                                    │
│     ├── Vista lado a lado: origen vs contabilidad               │
│     ├── Diferencias resaltadas automáticamente                  │
│     ├── Sugerencias automáticas de conciliación                 │
│     ├── Drill-down a transacción individual                     │
│     └── Marcar como conciliado o pendiente                      │
│                                                                 │
│  4. AJUSTES                                                     │
│     ├── Generar póliza de ajuste si necesario                   │
│     ├── Nota explicativa obligatoria                            │
│     ├── Autorización de supervisor contable                     │
│     └── Registro de ajuste en bitácora                          │
│                                                                 │
│  5. CIERRE DE CONCILIACIÓN                                      │
│     ├── Marcar periodo como conciliado                          │
│     ├── Reporte de conciliación generado                        │
│     ├── Diferencias documentadas                                │
│     └── Historial de conciliaciones archivado                   │
│                                                                 │
│  TIEMPO OBJETIVO: < 30 minutos para conciliación diaria        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flujo 11: Revenue Manager — Ajustar Tarifas y Restricciones

```
┌─────────────────────────────────────────────────────────────────┐
│        AJUSTAR TARIFAS Y RESTRICCIONES                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. REVISAR DASHBOARD DE REVENUE                                │
│     ├── OTB (on-the-books) por fecha: ocupación, ADR, RevPAR   │
│     ├── Pick-up últimos 7 días por segmento                     │
│     ├── Pace vs año anterior por fecha                          │
│     ├── Forecast de ocupación a 30/60/90 días                   │
│     ├── Alertas: fechas con baja demanda, overbooking riesgo   │
│     └── Identificar fechas que requieren acción                 │
│                                                                 │
│  2. ABRIR CALENDARIO TARIFARIO                                  │
│     ├── Vista mensual con tarifa actual por tipo × fecha        │
│     ├── Colores: por encima/debajo de floor rate                │
│     ├── Indicadores de restricciones activas por fecha          │
│     └── Comparativo con tarifa del año anterior                 │
│                                                                 │
│  3. SELECCIONAR RANGO DE FECHAS                                 │
│     ├── Click + drag para seleccionar rango                     │
│     ├── O seleccionar fechas específicas (multi-select)         │
│     └── Panel lateral muestra detalle de las fechas             │
│                                                                 │
│  4. APLICAR CAMBIOS                                             │
│     ├── Ajustar tarifa por tipo (% o monto absoluto)            │
│     ├── Aplicar restricciones:                                  │
│     │   ├── Minimum Length of Stay (MinLOS)                     │
│     │   ├── Close to Arrival (CTA)                              │
│     │   ├── Close to Departure (CTD)                            │
│     │   ├── Stop Sell por tipo y/o canal                        │
│     │   └── Maximum Length of Stay (MaxLOS)                     │
│     ├── Cada cambio muestra preview de impacto                  │
│     └── Aplicar a todos los canales o canales específicos       │
│                                                                 │
│  5. CONFIRMAR Y PUBLICAR                                        │
│     ├── Resumen de cambios con impacto proyectado              │
│     ├── Confirmar → cambios se aplican inmediatamente           │
│     ├── CRS sincroniza con channel managers (< 30 seg)          │
│     └── Registro en bitácora: quién, qué, cuándo, motivo       │
│                                                                 │
│  TIEMPO OBJETIVO: < 5 minutos para ajuste de rango             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flujo 12: Cotización de Evento (Wedding Planner)

```
┌─────────────────────────────────────────────────────────────────┐
│              COTIZAR EVENTO (BODA)                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. RECIBIR SOLICITUD EN CRM                                    │
│     ├── Wedding planner contacta al ejecutivo de ventas         │
│     ├── Crear oportunidad en pipeline: tipo "Boda"              │
│     ├── Datos: fecha deseada, # asistentes, habitaciones, etc.  │
│     └── Asignar ejecutivo responsable                           │
│                                                                 │
│  2. VERIFICAR DISPONIBILIDAD                                    │
│     ├── Calendario de salones: ¿hay salón disponible?           │
│     ├── Calendar view: ¿hay habitaciones disponibles?           │
│     ├── Verificar que no hay conflicto con otros eventos        │
│     └── Revenue: ¿displacement analysis favorable?              │
│                                                                 │
│  3. ARMAR COTIZACIÓN                                            │
│     ├── Seleccionar template de cotización "Boda"               │
│     ├── HABITACIONES:                                           │
│     │   ├── # de habitaciones por tipo                          │
│     │   ├── Tarifa negociada por tipo                           │
│     │   ├── Plan alimenticio                                    │
│     │   ├── Cortesías (1x20, suite nupcial)                    │
│     │   └── Early check-in / late check-out                    │
│     ├── EVENTO:                                                 │
│     │   ├── Salón + configuración (banquete, 200 pax)          │
│     │   ├── Menú: cena de gala + cóctel de bienvenida          │
│     │   ├── Barra abierta: premium 5 horas                     │
│     │   ├── Equipo: audio, DJ, iluminación especial            │
│     │   ├── Decoración: centro de mesa, mantelería especial    │
│     │   └── Montaje + desmontaje                               │
│     ├── EXTRAS:                                                 │
│     │   ├── Ensayo de cena (noche anterior)                    │
│     │   ├── Brunch día siguiente                               │
│     │   ├── Spa para novia + damas                             │
│     │   └── Amenidades VIP en suite nupcial                    │
│     └── Sistema calcula total automáticamente                   │
│                                                                 │
│  4. REVISAR Y AJUSTAR                                           │
│     ├── Preview de cotización en formato PDF elegante           │
│     ├── Ajustar descuentos con autorización del director        │
│     ├── Agregar notas y condiciones                             │
│     ├── Definir calendario de depósitos                         │
│     └── Versión: v1 (puede haber v2, v3 por negociación)       │
│                                                                 │
│  5. ENVIAR                                                      │
│     ├── Enviar por email desde sistema                          │
│     ├── PDF profesional con branding del hotel                  │
│     ├── Seguimiento automático (recordatorio en 48h si no hay   │
│     │   respuesta)                                              │
│     └── Oportunidad pasa a etapa "Cotización enviada"          │
│                                                                 │
│  6. [SI ACEPTA] CONFIRMAR                                       │
│     ├── Cotización → Confirmada                                 │
│     ├── Crear grupo con bloqueo de habitaciones automático      │
│     ├── Crear evento con booking de salón                       │
│     ├── Generar BEO para operaciones                            │
│     ├── Generar contrato para firma                             │
│     ├── Registrar primer depósito                               │
│     └── Todo conectado: grupo + evento + salón + folio maestro  │
│                                                                 │
│  TIEMPO OBJETIVO: < 30 minutos para cotización completa        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flujo 13: Housekeeping — Turno Completo de Camarista

```
┌─────────────────────────────────────────────────────────────────┐
│           TURNO DE CAMARISTA (APP MÓVIL)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. INICIAR TURNO                                               │
│     ├── Camarista abre app en su teléfono                       │
│     ├── Login con PIN (4 dígitos)                               │
│     ├── Ve su lista de habitaciones asignadas del día           │
│     ├── Ordenadas por prioridad:                                │
│     │   🔴 Check-in inminente (llega en 2h)                    │
│     │   🟠 VIP / Early check-in                                │
│     │   🟡 Salida del día (check-out)                          │
│     │   🟢 Estancia (stay-over)                                │
│     └── Total de créditos del día y tiempo estimado             │
│                                                                 │
│  2. LIMPIAR HABITACIÓN                                          │
│     ├── Tocar habitación → ver detalle:                         │
│     │   ├── Tipo de servicio (salida/estancia/VIP/deep clean)  │
│     │   ├── Notas especiales (alergia, bebé, accesible)        │
│     │   ├── Próximo huésped: nombre, hora de llegada, plan     │
│     │   └── # de adultos y niños                               │
│     ├── Marcar "Inicio de limpieza" → timer empieza            │
│     ├── Realizar limpieza según protocolo                       │
│     └── Marcar "Limpieza terminada"                             │
│                                                                 │
│  3. REPORTAR (durante o después de limpieza)                    │
│     ├── ¿Desperfecto encontrado?                                │
│     │   └── Tomar foto → seleccionar categoría → crear ticket  │
│     │       de mantenimiento automáticamente                    │
│     ├── ¿Objeto olvidado?                                       │
│     │   └── Tomar foto → descripción → registrar en lost&found │
│     ├── ¿Consumo de minibar?                                    │
│     │   └── Seleccionar productos → cargo automático a folio   │
│     └── ¿Discrepancia? (habitación marcada vacía pero ocupada  │
│         o viceversa)                                            │
│         └── Reportar → alerta a recepción                      │
│                                                                 │
│  4. MARCAR ESTATUS                                              │
│     ├── "Limpia" → habitación disponible para asignar           │
│     ├── "Necesita inspección" → notifica a supervisora          │
│     └── "Pendiente" → con motivo (falta material, ocupada)     │
│                                                                 │
│  5. INSPECCIÓN (supervisora)                                    │
│     ├── Supervisora recibe notificación                         │
│     ├── Inspecciona con checklist digital                       │
│     ├── Aprobada ✓ → estatus "Inspeccionada"                   │
│     └── Rechazada ✗ → nota de observaciones → vuelve a limpieza│
│                                                                 │
│  6. FIN DE TURNO                                                │
│     ├── Ver resumen del día:                                    │
│     │   ├── Habitaciones limpiadas: 14                          │
│     │   ├── Créditos completados: 18 de 20                     │
│     │   ├── Tiempo promedio: 28 min/habitación                 │
│     │   ├── Inspecciones aprobadas: 12 de 14                   │
│     │   └── Tickets reportados: 2                               │
│     └── Cerrar turno                                            │
│                                                                 │
│  TIEMPO OBJETIVO: toda interacción con app < 30 segundos       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flujo 14: Compra de Insumos (Requisición → Recepción)

```
┌─────────────────────────────────────────────────────────────────┐
│           COMPRA DE INSUMOS                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. REQUISICIÓN                                                 │
│     ├── Chef ejecutivo detecta que necesita insumos             │
│     ├── Abre requisición en sistema:                            │
│     │   ├── Selecciona productos del catálogo                   │
│     │   ├── Cantidad requerida                                  │
│     │   ├── Fecha necesaria                                     │
│     │   ├── Almacén destino (cocina central)                   │
│     │   └── Justificación                                       │
│     ├── Sistema muestra: existencia actual, mínimo, sugerido   │
│     └── Enviar requisición → va a aprobación                    │
│                                                                 │
│  2. APROBACIÓN                                                  │
│     ├── Gerente de A&B recibe notificación                      │
│     ├── Revisa requisición:                                     │
│     │   ├── ¿Es necesario? ¿Presupuesto disponible?           │
│     │   ├── ¿Hay existencia en otro almacén? (sugerir traspaso)│
│     │   └── ¿Monto requiere doble aprobación?                  │
│     ├── Aprueba → va a compras                                  │
│     └── Rechaza → notifica al solicitante con motivo            │
│                                                                 │
│  3. ORDEN DE COMPRA                                             │
│     ├── Compras recibe requisición aprobada                     │
│     ├── Sistema sugiere proveedores por producto:               │
│     │   ├── Proveedor habitual + último precio                  │
│     │   ├── Alternativas con comparativo de precio              │
│     │   └── Evaluación del proveedor (calidad, cumplimiento)   │
│     ├── Crear OC:                                               │
│     │   ├── Seleccionar proveedor                               │
│     │   ├── Confirmar cantidades y precios                      │
│     │   ├── Fecha de entrega solicitada                         │
│     │   └── Condiciones de pago                                 │
│     ├── Si monto > umbral → requiere aprobación de contralor   │
│     └── OC aprobada → enviar al proveedor (email/PDF)          │
│                                                                 │
│  4. RECEPCIÓN DE MERCANCÍA                                      │
│     ├── Almacenista recibe mercancía                            │
│     ├── Buscar OC en sistema (por # de OC o proveedor)         │
│     ├── Registrar recepción:                                    │
│     │   ├── Cantidad recibida por producto                      │
│     │   ├── Condición (aceptado/rechazado/parcial)             │
│     │   ├── Número de factura del proveedor                     │
│     │   └── Notas (faltante, daño, sustitución)                │
│     ├── Sistema valida: recibido vs ordenado                    │
│     ├── Entrada automática al inventario del almacén destino   │
│     └── CxP generada automáticamente con asiento contable       │
│                                                                 │
│  5. RESULTADO                                                   │
│     ├── Inventario actualizado en tiempo real                   │
│     ├── Costo promedio recalculado                              │
│     ├── CxP registrada con vencimiento                         │
│     ├── Póliza contable automática:                             │
│     │   Debit:  Inventario Alimentos    $15,000                │
│     │   Debit:  IVA Acreditable          $2,400                │
│     │   Credit: Proveedores             $17,400                │
│     └── Trazabilidad: requisición → OC → recepción → póliza   │
│                                                                 │
│  TIEMPO OBJETIVO: < 10 minutos para requisición + OC           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flujo 15: Check-out de Grupo

```
┌─────────────────────────────────────────────────────────────────┐
│              CHECK-OUT DE GRUPO                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. PREPARACIÓN (día anterior o temprano)                       │
│     ├── Revisar lista de habitaciones del grupo                 │
│     ├── Verificar saldos en subfolios individuales              │
│     │   ├── Cargos personales (minibar, spa, extras) → huésped │
│     │   └── Cargos de grupo (hospedaje, A&B) → folio maestro   │
│     ├── Identificar habitaciones con saldo pendiente personal   │
│     ├── Verificar que routing de cargos esté correcto           │
│     └── Alertar a recepción de habitaciones con pendientes      │
│                                                                 │
│  2. CHECK-OUT INDIVIDUAL (cada habitación del grupo)            │
│     ├── Huésped llega a recepción                               │
│     ├── Recepcionista abre su subfolio:                         │
│     │   ├── Cargos personales: $2,300 (minibar + spa)          │
│     │   ├── Cargos de grupo (ruteados): $0 (va al maestro)    │
│     │   └── Saldo personal: $2,300                              │
│     ├── Cobrar saldo personal (tarjeta, efectivo)               │
│     ├── ¿Necesita factura personal?                             │
│     │   ├── Sí → generar CFDI por cargos personales            │
│     │   └── No → recibo simple                                  │
│     ├── Cerrar subfolio                                         │
│     ├── Check-out → habitación a housekeeping                   │
│     └── Express check-out disponible (folio por email)          │
│                                                                 │
│  3. CHECK-OUT MASIVO (opcional)                                  │
│     ├── Si el grupo sale junto: check-out masivo                │
│     ├── Seleccionar todas las habitaciones del grupo            │
│     ├── Verificar que no hay saldos personales pendientes       │
│     ├── Ejecutar check-out masivo en un clic                    │
│     └── Todas las habitaciones van a housekeeping               │
│                                                                 │
│  4. CIERRE DE FOLIO MAESTRO                                     │
│     ├── Revisar folio maestro del grupo:                        │
│     │   ├── Total hospedaje: $245,000                           │
│     │   ├── Total A&B eventos: $120,000                         │
│     │   ├── Total salones: $35,000                              │
│     │   ├── Total extras: $18,000                               │
│     │   ├── Depósitos aplicados: -$150,000                      │
│     │   └── Saldo pendiente: $268,000                           │
│     ├── Verificar depósitos aplicados correctamente             │
│     ├── Ajustes finales (si los hay, con autorización)          │
│     └── Cerrar folio maestro                                    │
│                                                                 │
│  5. FACTURACIÓN DEL GRUPO                                       │
│     ├── Generar factura consolidada a la empresa/agencia:       │
│     │   ├── Datos fiscales de la cuenta (precargados del CRM)  │
│     │   ├── Desglose por concepto (hospedaje, A&B, salón, etc)│
│     │   ├── Aplicar condiciones de pago (crédito 30 días)      │
│     │   └── Timbrar CFDI                                        │
│     ├── Enviar factura por email                                │
│     ├── Saldo registrado en CxC con fecha de vencimiento       │
│     └── Póliza contable automática                              │
│                                                                 │
│  6. SEGUIMIENTO POST-GRUPO                                      │
│     ├── Revenue: actualizar producción real del grupo           │
│     ├── CRM: registrar resultado en la cuenta                  │
│     ├── Ventas: actualizar producción del ejecutivo             │
│     └── BI: métricas del grupo disponibles para análisis       │
│                                                                 │
│  TIEMPO OBJETIVO: < 2 min por check-out individual             │
│                    < 15 min para cierre de folio maestro         │
└─────────────────────────────────────────────────────────────────┘
```
