"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Search, Plus, Filter, Download, ChevronRight, Calendar, Phone, Mail, Globe, Building2 } from "lucide-react";

const reservations = [
  { id: "RES-20260311-001", guest: "García Hernández, María", email: "maria.garcia@email.com", phone: "+52 744 123 4567", type: "JR Suite VM", room: null, plan: "AI", status: "confirmed", source: "direct", checkIn: "Mar 11", checkOut: "Mar 16", nights: 5, adults: 2, children: 1, total: 61250, balance: 0, notes: "Aniversario de bodas" },
  { id: "RES-20260311-002", guest: "Smith, John & Sarah", email: "jsmith@gmail.com", phone: "+1 555 234 5678", type: "Std Vista Mar", room: "305", plan: "EP", status: "confirmed", source: "booking", checkIn: "Mar 11", checkOut: "Mar 15", nights: 4, adults: 2, children: 0, total: 39200, balance: 39200, notes: "" },
  { id: "RES-20260312-003", guest: "Grupo Boda Luna", email: "eventos@bodagarcialopez.com", phone: "+52 55 9876 5432", type: "Varios (45 habs)", room: null, plan: "AI", status: "confirmed", source: "direct", checkIn: "Mar 12", checkOut: "Mar 15", nights: 3, adults: 90, children: 15, total: 890000, balance: 445000, notes: "Boda García-López, 45 habitaciones" },
  { id: "RES-20260314-004", guest: "Fernández Rojas, Luis", email: "lfernandez@corp.com", phone: "+52 55 1234 5678", type: "Penthouse", room: "PH-01", plan: "AIP", status: "confirmed", source: "direct", checkIn: "Mar 14", checkOut: "Mar 21", nights: 7, adults: 2, children: 0, total: 196000, balance: 0, notes: "VIP Platino, early check-in 10am" },
  { id: "RES-20260311-005", guest: "Torres Ramírez, Carmen", email: "carmen.torres@email.com", phone: "+52 33 5555 1234", type: "Sup Vista Mar", room: null, plan: "AI", status: "pending", source: "expedia", checkIn: "Mar 11", checkOut: "Mar 14", nights: 3, adults: 2, children: 2, total: 47100, balance: 47100, notes: "Familia con niños" },
  { id: "RES-20260315-006", guest: "Williams, David", email: "dwilliams@outlook.com", phone: "+1 310 555 6789", type: "Estándar VJ", room: "307", plan: "EP", status: "confirmed", source: "booking", checkIn: "Mar 15", checkOut: "Mar 17", nights: 2, adults: 1, children: 0, total: 9800, balance: 9800, notes: "" },
  { id: "RES-20260318-007", guest: "Conv. Farmacéutica Nacional", email: "eventos@pfizer.mx", phone: "+52 55 3456 7890", type: "Varios (120 habs)", room: null, plan: "EP", status: "confirmed", source: "corporate", checkIn: "Mar 18", checkOut: "Mar 21", nights: 3, adults: 240, children: 0, total: 2400000, balance: 1200000, notes: "Convención 120 habs + 2 salones" },
  { id: "RES-20260311-008", guest: "Agencia Viajes Premier", email: "reservas@viajespremier.com", phone: "+52 998 555 1234", type: "Std VM (4 habs)", room: null, plan: "AI", status: "pending", source: "agency", checkIn: "Mar 11", checkOut: "Mar 15", nights: 4, adults: 8, children: 0, total: 78400, balance: 78400, notes: "Serie de agencia" },
];

const statusBadge: Record<string, { color: string; label: string }> = {
  confirmed: { color: "bg-success/10 text-success", label: "Confirmada" },
  pending: { color: "bg-warning/10 text-warning", label: "Pendiente" },
  cancelled: { color: "bg-danger/10 text-danger", label: "Cancelada" },
  checked_in: { color: "bg-primary/10 text-primary", label: "In-house" },
  checked_out: { color: "bg-gray-100 text-gray-500", label: "Check-out" },
  no_show: { color: "bg-red-100 text-red-600", label: "No show" },
};

const sourceIcons: Record<string, React.ReactNode> = {
  direct: <Building2 size={13} className="text-primary" />,
  booking: <Globe size={13} className="text-blue-600" />,
  expedia: <Globe size={13} className="text-yellow-600" />,
  corporate: <Building2 size={13} className="text-amber-700" />,
  agency: <Globe size={13} className="text-teal-600" />,
};

function formatCurrency(n: number) {
  return n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : `$${n.toLocaleString("es-MX")}`;
}

export default function ReservationsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? reservations : reservations.filter((r) => r.status === filter);

  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar />
      <main className="ml-[240px] pt-16">
        <div className="p-6 max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold">Reservaciones</h1>
              <p className="text-sm text-text-secondary mt-0.5">Gestión central de reservas individuales y grupales</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:bg-hover"
                style={{ borderColor: "var(--color-border)" }}>
                <Download size={14} /> Exportar
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark">
                <Plus size={16} /> Nueva reservación
              </button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {[
              { label: "Hoy llegadas", value: "47", sub: "8 pendientes" },
              { label: "Hoy salidas", value: "52", sub: "3 late check-out" },
              { label: "In-house", value: "349", sub: "87.3% ocupación" },
              { label: "Próx. 7 días", value: "186", sub: "nuevas llegadas" },
              { label: "Revenue OTB", value: "$4.2M", sub: "marzo total" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border p-4" style={{ borderColor: "var(--color-border)" }}>
                <div className="text-xs text-text-secondary font-medium uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)" }}>{stat.value}</div>
                <div className="text-[11px] text-text-secondary mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Filters + Search */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center bg-white border rounded-lg overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
              {[
                { key: "all", label: "Todas" },
                { key: "confirmed", label: "Confirmadas" },
                { key: "pending", label: "Pendientes" },
                { key: "checked_in", label: "In-house" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    filter === f.key ? "bg-primary text-white" : "text-text-secondary hover:bg-hover"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Buscar por nombre, # confirmación, email, teléfono..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                style={{ borderColor: "var(--color-border)" }}
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:bg-hover"
              style={{ borderColor: "var(--color-border)" }}>
              <Filter size={14} /> Filtros
            </button>
          </div>

          {/* Reservations table */}
          <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--color-border)" }}>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Confirmación</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Huésped</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Fechas</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Tipo / Plan</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Fuente</th>
                  <th className="text-right px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Total</th>
                  <th className="text-right px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Saldo</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Estatus</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((res) => {
                  const badge = statusBadge[res.status];
                  return (
                    <tr key={res.id} className="border-b hover:bg-hover/50 transition-colors cursor-pointer"
                      style={{ borderColor: "var(--color-border)" }}>
                      <td className="px-4 py-3.5">
                        <span className="text-xs font-semibold text-primary" style={{ fontFamily: "var(--font-mono)" }}>
                          {res.id}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="text-sm font-medium">{res.guest}</div>
                        <div className="flex items-center gap-3 text-[11px] text-text-secondary mt-0.5">
                          <span className="flex items-center gap-1"><Mail size={10} /> {res.email}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar size={13} className="text-text-secondary" />
                          <span>{res.checkIn} — {res.checkOut}</span>
                        </div>
                        <div className="text-[11px] text-text-secondary">{res.nights} noches • {res.adults}A {res.children > 0 ? `${res.children}N` : ""}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="text-sm">{res.type}</div>
                        <span className={`inline-flex items-center text-[10px] font-semibold rounded-full px-2 py-0.5 mt-0.5 ${
                          res.plan === "AI" ? "bg-amber-100 text-amber-700" :
                          res.plan === "AIP" ? "bg-amber-200 text-amber-800" :
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {res.plan === "AI" ? "All Inclusive" : res.plan === "AIP" ? "All Inc. Premium" : "Plan Europeo"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5 text-sm">
                          {sourceIcons[res.source]}
                          <span className="capitalize">{res.source}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-right text-sm font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
                        {formatCurrency(res.total)}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <span className={`text-sm font-semibold ${res.balance > 0 ? "text-warning" : "text-success"}`}
                          style={{ fontFamily: "var(--font-mono)" }}>
                          {res.balance > 0 ? formatCurrency(res.balance) : "Pagada"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center text-[11px] font-medium rounded-full px-2.5 py-1 ${badge?.color}`}>
                          {badge?.label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <ChevronRight size={16} className="text-text-secondary" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-text-secondary"
              style={{ borderColor: "var(--color-border)" }}>
              <span>Mostrando {filtered.length} de {reservations.length} reservaciones</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border rounded hover:bg-hover text-xs" style={{ borderColor: "var(--color-border)" }}>Anterior</button>
                <button className="px-3 py-1 bg-primary text-white rounded text-xs">1</button>
                <button className="px-3 py-1 border rounded hover:bg-hover text-xs" style={{ borderColor: "var(--color-border)" }}>2</button>
                <button className="px-3 py-1 border rounded hover:bg-hover text-xs" style={{ borderColor: "var(--color-border)" }}>Siguiente</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
