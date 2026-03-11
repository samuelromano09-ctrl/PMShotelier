"use client";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { housekeepingData, rooms } from "@/lib/data";
import { Sparkles, User, AlertTriangle } from "lucide-react";

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  clean: { color: "text-success", bg: "bg-success", label: "Limpia" },
  dirty: { color: "text-danger", bg: "bg-danger", label: "Sucia" },
  inspected: { color: "text-primary", bg: "bg-primary", label: "Inspeccionada" },
  in_progress: { color: "text-warning", bg: "bg-warning", label: "En limpieza" },
  out_of_service: { color: "text-gray-400", bg: "bg-gray-400", label: "Fuera de servicio" },
};

export default function HousekeepingPage() {
  const { summary, staff } = housekeepingData;
  const total = Object.values(summary).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar />
      <main className="ml-[240px] pt-16">
        <div className="p-6 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold">Housekeeping</h1>
              <p className="text-sm text-text-secondary mt-0.5">Estatus de habitaciones en tiempo real</p>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-6 gap-3 mb-6">
            {[
              { label: "Limpias", value: summary.clean, color: "bg-success/10 text-success", dot: "bg-success" },
              { label: "Sucias", value: summary.dirty, color: "bg-danger/10 text-danger", dot: "bg-danger" },
              { label: "En limpieza", value: summary.inProgress, color: "bg-warning/10 text-warning", dot: "bg-warning" },
              { label: "Inspeccionadas", value: summary.inspected, color: "bg-primary/10 text-primary", dot: "bg-primary" },
              { label: "Fuera de servicio", value: summary.outOfService, color: "bg-gray-100 text-gray-500", dot: "bg-gray-400" },
              { label: "Fuera de orden", value: summary.outOfOrder, color: "bg-red-100 text-red-600", dot: "bg-red-500" },
            ].map(({ label, value, color, dot }) => (
              <div key={label} className={`rounded-xl p-4 ${color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${dot}`}></span>
                  <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
                </div>
                <div className="text-3xl font-bold" style={{ fontFamily: "var(--font-mono)" }}>{value}</div>
                <div className="text-[11px] opacity-70 mt-0.5">{Math.round((value / total) * 100)}% del total</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Room grid */}
            <div className="col-span-2 bg-white rounded-xl border p-5" style={{ borderColor: "var(--color-border)" }}>
              <h3 className="text-sm font-semibold mb-4">Mapa de habitaciones — Pisos 3-5</h3>
              {[3, 4, 5].map((floor) => {
                const floorRooms = rooms.filter((r) => r.floor === floor);
                return (
                  <div key={floor} className="mb-4">
                    <div className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-2">Piso {floor}</div>
                    <div className="flex gap-2 flex-wrap">
                      {floorRooms.map((room) => {
                        const hk = statusConfig[room.hk] || statusConfig.dirty;
                        const isOccupied = room.status === "occupied";
                        const isMaintenance = room.status === "maintenance";
                        return (
                          <div
                            key={room.number}
                            className={`relative w-20 h-20 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-all ${
                              isMaintenance
                                ? "border-red-300 bg-red-50"
                                : room.hk === "clean" || room.hk === "inspected"
                                ? "border-success/30 bg-success/5"
                                : room.hk === "dirty"
                                ? "border-danger/30 bg-danger/5"
                                : "border-warning/30 bg-warning/5"
                            }`}
                          >
                            <div className="text-sm font-bold">{room.number}</div>
                            <div className={`text-[9px] font-semibold mt-0.5 ${hk.color}`}>{hk.label}</div>
                            {isOccupied && (
                              <div className="absolute top-1 right-1">
                                <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                                  <User size={8} className="text-white" />
                                </div>
                              </div>
                            )}
                            {isMaintenance && (
                              <div className="absolute top-1 right-1">
                                <AlertTriangle size={12} className="text-red-500" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div className="flex items-center gap-4 mt-4 pt-4 border-t text-[11px] text-text-secondary"
                style={{ borderColor: "var(--color-border)" }}>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded border-2 border-success/30 bg-success/5"></span> Limpia</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded border-2 border-danger/30 bg-danger/5"></span> Sucia</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded border-2 border-warning/30 bg-warning/5"></span> En limpieza</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded border-2 border-red-300 bg-red-50"></span> Mantenimiento</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center"><User size={8} className="text-white" /></span> Ocupada
                </span>
              </div>
            </div>

            {/* Staff productivity */}
            <div className="bg-white rounded-xl border p-5" style={{ borderColor: "var(--color-border)" }}>
              <h3 className="text-sm font-semibold mb-4">Productividad por camarista</h3>
              <div className="space-y-4">
                {staff.map((s) => {
                  const pct = Math.round((s.completed / s.assigned) * 100);
                  return (
                    <div key={s.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div>
                          <div className="text-sm font-medium">{s.name}</div>
                          <div className="text-[11px] text-text-secondary">{s.zone}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
                            {s.completed}/{s.assigned}
                          </div>
                          <div className="text-[11px] text-text-secondary">{s.pending} pendientes</div>
                        </div>
                      </div>
                      <div className="h-2 bg-hover rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${
                          pct === 100 ? "bg-success" : pct >= 70 ? "bg-primary" : "bg-warning"
                        }`}
                          style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
