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
