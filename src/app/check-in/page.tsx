"use client";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { arrivals } from "@/lib/data";
import { Search, UserCheck, Footprints, ClipboardList, Star, Users, Clock, ChevronRight } from "lucide-react";

const statusBadge: Record<string, { color: string; label: string }> = {
  pending: { color: "bg-gray-100 text-gray-600", label: "Pendiente" },
  assigned: { color: "bg-success/10 text-success", label: "Asignada" },
  partial: { color: "bg-warning/10 text-warning", label: "Parcial" },
};

export default function CheckInPage() {
  const pending = arrivals.filter((a) => a.status === "pending").length;
  const assigned = arrivals.filter((a) => a.status === "assigned").length;
  const total = arrivals.length;

  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar />
      <main className="ml-[240px] pt-16">
        <div className="p-6 max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold">Check-in</h1>
              <p className="text-sm text-text-secondary mt-0.5">Llegadas de hoy — Martes 11 Marzo 2026</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark">
                <UserCheck size={16} /> Check-in rápido
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium hover:bg-hover"
                style={{ borderColor: "var(--color-border)" }}>
                <Footprints size={16} /> Walk-in
              </button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total llegadas", value: total, icon: ClipboardList, color: "text-primary" },
              { label: "Pendientes", value: pending, icon: Clock, color: "text-warning" },
              { label: "Hab. asignada", value: assigned, icon: UserCheck, color: "text-success" },
              { label: "VIP", value: arrivals.filter((a) => a.vip).length, icon: Star, color: "text-amber-500" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white rounded-xl border p-4 flex items-center gap-4"
                style={{ borderColor: "var(--color-border)" }}>
                <div className={`w-10 h-10 rounded-lg bg-hover flex items-center justify-center ${color}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)" }}>{value}</div>
                  <div className="text-xs text-text-secondary">{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Buscar por nombre, # confirmación, habitación..."
              className="w-full pl-11 pr-4 py-3 bg-white border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
              style={{ borderColor: "var(--color-border)" }}
            />
          </div>

          {/* Arrivals list */}
          <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--color-border)" }}>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Hora</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Huésped</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Tipo</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Hab.</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Plan</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Noches</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">Estatus</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {arrivals.map((arr, i) => {
                  const badge = statusBadge[arr.status];
                  return (
                    <tr key={i} className="border-b hover:bg-hover/50 transition-colors cursor-pointer"
                      style={{ borderColor: "var(--color-border)" }}>
                      <td className="px-4 py-3.5 text-sm text-text-secondary" style={{ fontFamily: "var(--font-mono)" }}>
                        {arr.time}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          {arr.vip && <Star size={14} className="text-amber-500 fill-amber-500 shrink-0" />}
                          {arr.group && <Users size={14} className="text-violet-500 shrink-0" />}
                          <span className="text-sm font-medium">{arr.guest}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-sm text-text-secondary">{arr.type}</td>
                      <td className="px-4 py-3.5">
                        {arr.room ? (
                          <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-mono)" }}>{arr.room}</span>
                        ) : (
                          <span className="text-sm text-text-secondary">Sin asignar</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center text-[11px] font-semibold rounded-full px-2 py-0.5 ${
                          arr.plan === "AI" ? "bg-amber-100 text-amber-700" :
                          arr.plan === "AIP" ? "bg-amber-200 text-amber-800" :
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {arr.plan}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-sm" style={{ fontFamily: "var(--font-mono)" }}>{arr.nights}</td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center text-[11px] font-medium rounded-full px-2.5 py-1 ${badge?.color}`}>
                          {badge?.label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary-dark transition-colors">
                          Check-in <ChevronRight size={12} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
