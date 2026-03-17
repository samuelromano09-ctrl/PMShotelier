"use client";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { groups } from "@/lib/data";
import { Plus, Search, Users, Calendar, DollarSign, ChevronRight } from "lucide-react";

function formatCurrency(n: number) {
  return n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : `$${(n / 1000).toFixed(0)}K`;
}

const statusColors: Record<string, string> = {
  definite: "bg-success/10 text-success",
  tentative: "bg-warning/10 text-warning",
  cancelled: "bg-danger/10 text-danger",
};

const typeIcons: Record<string, string> = {
  Boda: "💍",
  Convención: "🎤",
  Turístico: "✈️",
  Corporativo: "💼",
};

export default function GroupsPage() {
  const totalRooms = groups.reduce((s, g) => s + g.rooms, 0);
  const totalRevenue = groups.reduce((s, g) => s + g.revenue, 0);
  const totalDeposit = groups.reduce((s, g) => s + g.deposit, 0);

  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar />
      <main className="ml-[240px] pt-16">
        <div className="p-6 max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold">Grupos & Eventos</h1>
              <p className="text-sm text-text-secondary mt-0.5">Gestión de grupos, bodas, convenciones y eventos</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark">
              <Plus size={16} /> Nuevo grupo
            </button>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl border p-4" style={{ borderColor: "var(--color-border)" }}>
              <div className="text-xs text-text-secondary font-medium uppercase tracking-wider mb-1">Grupos activos</div>
              <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)" }}>{groups.length}</div>
            </div>
            <div className="bg-white rounded-xl border p-4" style={{ borderColor: "var(--color-border)" }}>
              <div className="text-xs text-text-secondary font-medium uppercase tracking-wider mb-1">Habitaciones bloqueadas</div>
              <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)" }}>{totalRooms}</div>
            </div>
            <div className="bg-white rounded-xl border p-4" style={{ borderColor: "var(--color-border)" }}>
              <div className="text-xs text-text-secondary font-medium uppercase tracking-wider mb-1">Ingreso proyectado</div>
              <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)" }}>{formatCurrency(totalRevenue)}</div>
            </div>
            <div className="bg-white rounded-xl border p-4" style={{ borderColor: "var(--color-border)" }}>
              <div className="text-xs text-text-secondary font-medium uppercase tracking-wider mb-1">Depósitos recibidos</div>
              <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)" }}>{formatCurrency(totalDeposit)}</div>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Buscar grupo por nombre, empresa, ejecutivo..."
              className="w-full pl-11 pr-4 py-3 bg-white border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
              style={{ borderColor: "var(--color-border)" }}
            />
          </div>

          {/* Groups list */}
          <div className="space-y-3">
            {groups.map((group) => (
              <div key={group.id} className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow cursor-pointer"
                style={{ borderColor: "var(--color-border)" }}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{typeIcons[group.type] || "📋"}</div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-base font-semibold">{group.name}</h3>
                        <span className={`text-[11px] font-medium rounded-full px-2.5 py-0.5 ${statusColors[group.status]}`}>
                          {group.status === "definite" ? "Confirmado" : "Tentativo"}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-text-secondary">
                        <span className="flex items-center gap-1"><Users size={13} /> {group.type}</span>
                        <span className="flex items-center gap-1"><Calendar size={13} /> {group.checkIn} — {group.checkOut}</span>
                        <span>Ejecutivo: {group.executive}</span>
                        <span>Cuenta: {group.account}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-text-secondary mt-2" />
                </div>

                {/* Progress bars */}
                <div className="grid grid-cols-3 gap-6 mt-4 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
                  {/* Rooms pick-up */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-text-secondary">Habitaciones</span>
                      <span className="font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
                        {group.picked}/{group.rooms}
                      </span>
                    </div>
                    <div className="h-2 bg-hover rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(group.picked / group.rooms) * 100}%` }} />
                    </div>
                  </div>

                  {/* Revenue */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-text-secondary">Ingreso</span>
                      <span className="font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
                        {formatCurrency(group.revenue)}
                      </span>
                    </div>
                    <div className="h-2 bg-hover rounded-full overflow-hidden">
                      <div className="h-full bg-success rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>

                  {/* Deposits */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-text-secondary">Depósitos</span>
                      <span className={`font-semibold ${group.depositPct < 50 ? "text-danger" : ""}`}
                        style={{ fontFamily: "var(--font-mono)" }}>
                        {group.depositPct}%
                      </span>
                    </div>
                    <div className="h-2 bg-hover rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${
                        group.depositPct >= 100 ? "bg-success" :
                        group.depositPct >= 50 ? "bg-warning" : "bg-danger"
                      }`}
                        style={{ width: `${group.depositPct}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
