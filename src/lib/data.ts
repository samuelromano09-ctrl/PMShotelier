// Mock data for the Hotelia prototype

export const hotelInfo = {
  name: "Hotel Playa Diamante",
  location: "Acapulco, Guerrero",
  totalRooms: 412,
  date: "Martes 11 Mar 2026",
};

export const kpis = {
  occupancy: { value: 87.3, change: 3.2, label: "Ocupación" },
  adr: { value: 2450, change: 5.1, label: "ADR" },
  revpar: { value: 2139, change: 8.4, label: "RevPAR" },
  trevpar: { value: 3891, change: 4.7, label: "TRevPAR" },
  revenue: { value: 1556400, change: 7.2, label: "Ingresos" },
};

export const departmentRevenue = [
  { name: "Hospedaje", amount: 890200, pct: 57.2 },
  { name: "A&B", amount: 412300, pct: 26.5 },
  { name: "Eventos", amount: 156800, pct: 10.1 },
  { name: "Spa", amount: 54200, pct: 3.5 },
  { name: "Boutique", amount: 28400, pct: 1.8 },
  { name: "Otros", amount: 14500, pct: 0.9 },
];

export const todayMovement = {
  arrivals: 47,
  departures: 52,
  inHouse: 349,
  walkIns: 3,
  noShows: 1,
  activeGroups: 4,
};

export const alerts = [
  { type: "warning", message: "3 grupos sin depósito vencido", module: "Grupos" },
  { type: "danger", message: "Overbooking sábado 14 Mar: +4 habitaciones", module: "Revenue" },
  { type: "warning", message: "12 CxC vencidas > 30 días ($1.2M)", module: "Finanzas" },
  { type: "success", message: "Auditoría nocturna completada correctamente", module: "PMS" },
  { type: "warning", message: "5 productos bajo inventario mínimo", module: "Inventarios" },
  { type: "info", message: "Grupo Boda García: rooming list al 84%", module: "Grupos" },
];

export const occupancyData = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const base = 70 + Math.sin(i / 3) * 15;
  return {
    day: `${day}`,
    date: `Mar ${day}`,
    actual: day <= 11 ? Math.round(base + Math.random() * 10) : null,
    forecast: Math.round(base + Math.random() * 8),
    budget: Math.round(75 + Math.random() * 5),
    lastYear: Math.round(base - 5 + Math.random() * 8),
  };
});

export const roomTypes = [
  { code: "STD-VJ", name: "Estándar Vista Jardín", total: 80, floor: "2-5" },
  { code: "STD-VM", name: "Estándar Vista Mar", total: 100, floor: "3-8" },
  { code: "SUP-VM", name: "Superior Vista Mar", total: 70, floor: "5-10" },
  { code: "JRS", name: "Junior Suite", total: 60, floor: "6-12" },
  { code: "JRS-OV", name: "Junior Suite Ocean View", total: 50, floor: "8-14" },
  { code: "STE", name: "Suite Master", total: 30, floor: "10-16" },
  { code: "STE-PR", name: "Suite Presidencial", total: 12, floor: "15-16" },
  { code: "PH", name: "Penthouse", total: 4, floor: "17" },
  { code: "VILLA", name: "Villa Playa", total: 6, floor: "PB" },
];

export function generateAvailability() {
  const days = 14;
  return roomTypes.map((rt) => ({
    ...rt,
    availability: Array.from({ length: days }, (_, i) => {
      const dayOfWeek = (i + 2) % 7; // Start on Tuesday
      const isWeekend = dayOfWeek >= 5;
      const base = isWeekend ? rt.total * 0.05 : rt.total * 0.2;
      const avail = Math.max(0, Math.round(base + Math.random() * rt.total * 0.15));
      return {
        date: `Mar ${i + 9}`,
        available: avail,
        total: rt.total,
        pct: Math.round((avail / rt.total) * 100),
      };
    }),
  }));
}

export const rooms = [
  // Floor 3
  { number: "301", type: "STD-VJ", floor: 3, status: "occupied", hk: "clean", guest: "García, María", plan: "AI", checkIn: "Mar 9", checkOut: "Mar 14", segment: "direct" },
  { number: "302", type: "STD-VJ", floor: 3, status: "occupied", hk: "clean", guest: "Smith, John", plan: "AI", checkIn: "Mar 10", checkOut: "Mar 15", segment: "ota" },
  { number: "303", type: "STD-VJ", floor: 3, status: "maintenance", hk: "out_of_service", guest: null, plan: null, checkIn: null, checkOut: null, segment: null },
  { number: "304", type: "STD-VM", floor: 3, status: "occupied", hk: "clean", guest: "López, Carlos", plan: "EP", checkIn: "Mar 8", checkOut: "Mar 12", segment: "corporate" },
  { number: "305", type: "STD-VM", floor: 3, status: "available", hk: "inspected", guest: null, plan: null, checkIn: null, checkOut: null, segment: null },
  { number: "306", type: "STD-VM", floor: 3, status: "occupied", hk: "dirty", guest: "Martínez, Ana", plan: "AI", checkIn: "Mar 11", checkOut: "Mar 16", segment: "group" },
  { number: "307", type: "STD-VJ", floor: 3, status: "available", hk: "clean", guest: null, plan: null, checkIn: null, checkOut: null, segment: null },
  { number: "308", type: "STD-VJ", floor: 3, status: "occupied", hk: "clean", guest: "Wilson, Emma", plan: "EP", checkIn: "Mar 10", checkOut: "Mar 13", segment: "agency" },
  // Floor 4
  { number: "401", type: "SUP-VM", floor: 4, status: "occupied", hk: "clean", guest: "Hernández, Sofía", plan: "AI", checkIn: "Mar 9", checkOut: "Mar 14", segment: "direct" },
  { number: "402", type: "SUP-VM", floor: 4, status: "available", hk: "dirty", guest: null, plan: null, checkIn: null, checkOut: null, segment: null },
  { number: "403", type: "SUP-VM", floor: 4, status: "occupied", hk: "clean", guest: "Johnson, Michael", plan: "EP", checkIn: "Mar 11", checkOut: "Mar 15", segment: "ota" },
  { number: "404", type: "JRS", floor: 4, status: "occupied", hk: "clean", guest: "Grupo Boda Luna", plan: "AI", checkIn: "Mar 10", checkOut: "Mar 15", segment: "group" },
  { number: "405", type: "JRS", floor: 4, status: "occupied", hk: "clean", guest: "Rodríguez, Pablo", plan: "AI", checkIn: "Mar 9", checkOut: "Mar 13", segment: "direct" },
  { number: "406", type: "JRS", floor: 4, status: "blocked", hk: "clean", guest: null, plan: null, checkIn: null, checkOut: null, segment: null },
  // Floor 5
  { number: "501", type: "STE", floor: 5, status: "occupied", hk: "clean", guest: "VIP: Morales, Roberto", plan: "AIP", checkIn: "Mar 10", checkOut: "Mar 16", segment: "direct" },
  { number: "502", type: "STE", floor: 5, status: "available", hk: "inspected", guest: null, plan: null, checkIn: null, checkOut: null, segment: null },
  { number: "503", type: "STE-PR", floor: 5, status: "occupied", hk: "clean", guest: "Corp. Bimbo - Dir.", plan: "EP", checkIn: "Mar 11", checkOut: "Mar 13", segment: "corporate" },
];

export const arrivals = [
  { time: "14:00", guest: "García Hernández, María", type: "JR Suite VM", room: null, plan: "AI", status: "pending", vip: false, group: null, nights: 5 },
  { time: "14:00", guest: "Smith, John & Sarah", type: "Std Vista Mar", room: "305", plan: "EP", status: "assigned", vip: false, group: null, nights: 4 },
  { time: "14:30", guest: "Grupo Boda Luna (12 habs)", type: "Varios", room: null, plan: "AI", status: "partial", vip: false, group: "Boda Luna", nights: 5 },
  { time: "15:00", guest: "Corp. Bimbo (8 habs)", type: "Suite + JRS", room: null, plan: "EP", status: "pending", vip: true, group: "Corp Bimbo", nights: 2 },
  { time: "15:30", guest: "Fernández, Luis", type: "Penthouse", room: "PH-01", plan: "AIP", status: "assigned", vip: true, group: null, nights: 7 },
  { time: "16:00", guest: "Torres, Carmen", type: "Sup Vista Mar", room: null, plan: "AI", status: "pending", vip: false, group: null, nights: 3 },
  { time: "16:00", guest: "OTA: Williams, David", type: "Estándar VJ", room: "307", plan: "EP", status: "assigned", vip: false, group: null, nights: 2 },
  { time: "17:00", guest: "Agencia Viajes Premier (4)", type: "Std VM", room: null, plan: "AI", status: "pending", vip: false, group: "V. Premier", nights: 4 },
];

export const posProducts = {
  categories: ["Entradas", "Platos Fuertes", "Postres", "Bebidas", "Cócteles", "Vinos"],
  items: [
    { id: 1, name: "Ceviche de Camarón", category: "Entradas", price: 220, ai: "included" },
    { id: 2, name: "Carpaccio de Pulpo", category: "Entradas", price: 280, ai: "included" },
    { id: 3, name: "Ensalada César", category: "Entradas", price: 180, ai: "included" },
    { id: 4, name: "Sopa de Tortilla", category: "Entradas", price: 150, ai: "included" },
    { id: 5, name: "Filete de Res 300g", category: "Platos Fuertes", price: 520, ai: "premium" },
    { id: 6, name: "Pescado a la Talla", category: "Platos Fuertes", price: 380, ai: "included" },
    { id: 7, name: "Pollo al Pastor", category: "Platos Fuertes", price: 320, ai: "included" },
    { id: 8, name: "Langosta Thermidor", category: "Platos Fuertes", price: 890, ai: "premium" },
    { id: 9, name: "Tacos de Arrachera", category: "Platos Fuertes", price: 290, ai: "included" },
    { id: 10, name: "Tiramisú", category: "Postres", price: 180, ai: "included" },
    { id: 11, name: "Flan Napolitano", category: "Postres", price: 140, ai: "included" },
    { id: 12, name: "Margarita", category: "Cócteles", price: 180, ai: "included" },
    { id: 13, name: "Piña Colada", category: "Cócteles", price: 190, ai: "included" },
    { id: 14, name: "Cerveza Nacional", category: "Bebidas", price: 80, ai: "included" },
    { id: 15, name: "Cerveza Importada", category: "Bebidas", price: 120, ai: "premium" },
    { id: 16, name: "Agua Mineral", category: "Bebidas", price: 60, ai: "included" },
    { id: 17, name: "Refresco", category: "Bebidas", price: 55, ai: "included" },
    { id: 18, name: "Vino Casa Tinto", category: "Vinos", price: 160, ai: "included" },
    { id: 19, name: "Vino Reserva", category: "Vinos", price: 380, ai: "premium" },
    { id: 20, name: "Champagne Moët", category: "Vinos", price: 1200, ai: "not_included" },
  ],
};

export const groups = [
  {
    id: "GRP-001",
    name: "Boda García-López",
    type: "Boda",
    status: "definite",
    rooms: 45,
    picked: 38,
    checkIn: "Mar 12",
    checkOut: "Mar 15",
    revenue: 890000,
    deposit: 445000,
    depositPct: 50,
    executive: "Ana Martínez",
    account: "Directo",
  },
  {
    id: "GRP-002",
    name: "Conv. Farmacéutica Nacional",
    type: "Convención",
    status: "definite",
    rooms: 120,
    picked: 98,
    checkIn: "Mar 18",
    checkOut: "Mar 21",
    revenue: 2400000,
    deposit: 1200000,
    depositPct: 50,
    executive: "Roberto López",
    account: "Pfizer México",
  },
  {
    id: "GRP-003",
    name: "Tour Viajes Premier",
    type: "Turístico",
    status: "definite",
    rooms: 30,
    picked: 30,
    checkIn: "Mar 11",
    checkOut: "Mar 14",
    revenue: 420000,
    deposit: 420000,
    depositPct: 100,
    executive: "Ana Martínez",
    account: "Viajes Premier",
  },
  {
    id: "GRP-004",
    name: "Retiro Corp. Bimbo",
    type: "Corporativo",
    status: "tentative",
    rooms: 55,
    picked: 0,
    checkIn: "Abr 5",
    checkOut: "Abr 8",
    revenue: 1100000,
    deposit: 0,
    depositPct: 0,
    executive: "Roberto López",
    account: "Grupo Bimbo",
  },
  {
    id: "GRP-005",
    name: "Boda Martínez-Ruiz",
    type: "Boda",
    status: "tentative",
    rooms: 35,
    picked: 0,
    checkIn: "Abr 12",
    checkOut: "Abr 15",
    revenue: 680000,
    deposit: 170000,
    depositPct: 25,
    executive: "Ana Martínez",
    account: "Wedding Planner MX",
  },
];

export const revenueMetrics = {
  forecast: Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    otb: Math.round(60 + Math.random() * 30),
    forecast: Math.round(70 + Math.sin(i / 4) * 20),
    budget: 78,
    lastYear: Math.round(65 + Math.random() * 20),
  })),
  segments: [
    { name: "Transient Direct", roomNights: 2840, adr: 2680, revenue: 7611200, pct: 32 },
    { name: "OTA", roomNights: 1890, adr: 2150, revenue: 4063500, pct: 21 },
    { name: "Grupos", roomNights: 1650, adr: 1950, revenue: 3217500, pct: 18 },
    { name: "Corporativo", roomNights: 1200, adr: 2400, revenue: 2880000, pct: 13 },
    { name: "Agencias", roomNights: 980, adr: 1850, revenue: 1813000, pct: 11 },
    { name: "Wholesale", roomNights: 440, adr: 1600, revenue: 704000, pct: 5 },
  ],
  channels: [
    { name: "Directo Web", pct: 28, trend: "up" },
    { name: "Booking.com", pct: 18, trend: "stable" },
    { name: "Expedia", pct: 12, trend: "down" },
    { name: "Agencias", pct: 15, trend: "up" },
    { name: "Teléfono", pct: 10, trend: "stable" },
    { name: "Grupos", pct: 12, trend: "up" },
    { name: "Otros", pct: 5, trend: "stable" },
  ],
};

export const housekeepingData = {
  summary: { clean: 198, dirty: 142, inProgress: 24, inspected: 31, outOfService: 12, outOfOrder: 5 },
  staff: [
    { name: "Rosa Méndez", zone: "Pisos 3-5", assigned: 18, completed: 12, pending: 6 },
    { name: "María López", zone: "Pisos 6-8", assigned: 16, completed: 14, pending: 2 },
    { name: "Elena Torres", zone: "Pisos 9-11", assigned: 15, completed: 8, pending: 7 },
    { name: "Carmen Ruiz", zone: "Pisos 12-14", assigned: 14, completed: 14, pending: 0 },
    { name: "Ana García", zone: "Pisos 15-17", assigned: 10, completed: 6, pending: 4 },
    { name: "Lupita Sánchez", zone: "Suites", assigned: 12, completed: 9, pending: 3 },
  ],
};
