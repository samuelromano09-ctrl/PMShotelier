"use client";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { generateAvailability } from "@/lib/data";
import { ChevronLeft, ChevronRight, Filter, Download, Plus } from "lucide-react";

function getColor(pct: number) {
  if (pct === 0) return { bg: "bg-gray-900", text: "text-white", label: "SOLD" };
  if (pct < 5) return { bg: "bg-danger/10", text: "text-danger", label: null };
  if (pct <= 20) return { bg: "bg-warning/10", text: "text-warning", label: null };
  return { bg: "bg-success/5", text: "text-success-light", label: null };
}

export default function AvailabilityPage() {
  const data = generateAvailability();
  const days = data[0].availability;

  // Calculate total occupancy per day
  const dailyOcc = days.map((_, i) => {
    const totalAvail = data.reduce((sum, rt) => sum + rt.availability[i].available, 0);
    const totalRooms = data.reduce((sum, rt) => sum + rt.total, 0);
    const occ = Math.round(((totalRooms - totalAvail) / totalRooms) * 100);
    return occ;
  });

  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar />
      <main className="ml-[240px] pt-16">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold">Disponibilidad</h1>
              <p className="text-sm text-text-secondary mt-0.5">Inventario por tipo de habitación y fecha</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white border rounded-lg overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                <button className="px-3 py-2 text-sm bg-primary text-white font-medium">Mes</button>
                <button className="px-3 py-2 text-sm text-text-secondary hover:bg-hover">Semana</button>
                <button className="px-3 py-2 text-sm text-text-secondary hover:bg-hover">Día</button>
              </div>
              <button className="flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:bg-hover"
                style={{ borderColor: "var(--color-border)" }}>
                <Filter size={14} /> Filtros
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:bg-hover"
                style={{ borderColor: "var(--color-border)" }}>
                <Download size={14} /> Exportar
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark">
                <Plus size={14} /> Nueva reserva
              </button>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className="flex items-center gap-4 mb-4">
            <button className="p-1.5 rounded-lg hover:bg-hover"><ChevronLeft size={18} /></button>
            <h2 className="text-lg font-semibold">Marzo 2026</h2>
            <button className="p-1.5 rounded-lg hover:bg-hover"><ChevronRight size={18} /></button>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--color-border)" }}>
                    <th className="sticky left-0 z-10 bg-white text-left px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider w-[200px] border-r"
                      style={{ borderColor: "var(--color-border)" }}>
                      Tipo
                    </th>
                    {days.map((d, i) => {
                      const dayNames = ["L", "M", "X", "J", "V", "S", "D"];
                      const dayIdx = (i + 1) % 7;
                      const isWeekend = dayIdx >= 5;
                      return (
                        <th key={i} className={`px-2 py-3 text-center min-w-[70px] ${isWeekend ? "bg-blue-50/40" : ""}`}>
                          <div className="text-[10px] text-text-secondary">{dayNames[dayIdx]}</div>
                          <div className="text-xs font-semibold">{d.date.replace("Mar ", "")}</div>
                        </th>
                      );
                    })}
                  </tr>
                  {/* Occupancy row */}
                  <tr className="border-b bg-gray-50/50" style={{ borderColor: "var(--color-border)" }}>
                    <td className="sticky left-0 z-10 bg-gray-50 px-4 py-2 text-xs font-semibold text-text-secondary border-r"
                      style={{ borderColor: "var(--color-border)" }}>
                      OCUPACIÓN
                    </td>
                    {dailyOcc.map((occ, i) => (
                      <td key={i} className="text-center py-2">
                        <span className={`text-xs font-bold ${
                          occ >= 95 ? "text-danger" : occ >= 85 ? "text-warning" : "text-success"
                        }`} style={{ fontFamily: "var(--font-mono)" }}>
                          {occ}%
                        </span>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((rt) => (
                    <tr key={rt.code} className="border-b hover:bg-hover/30 transition-colors"
                      style={{ borderColor: "var(--color-border)" }}>
                      <td className="sticky left-0 z-10 bg-white px-4 py-3 border-r"
                        style={{ borderColor: "var(--color-border)" }}>
                        <div className="text-sm font-medium">{rt.name}</div>
                        <div className="text-[11px] text-text-secondary">{rt.code} • {rt.total} habs</div>
                      </td>
                      {rt.availability.map((av, i) => {
                        const color = getColor(av.pct);
                        return (
                          <td key={i} className="text-center py-2 px-1 cursor-pointer group">
                            <div className={`inline-flex items-center justify-center w-12 h-8 rounded-md text-xs font-bold transition-transform group-hover:scale-110 ${color.bg} ${color.text}`}
                              style={{ fontFamily: "var(--font-mono)" }}>
                              {color.label || av.available}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 px-4 py-3 border-t text-[11px] text-text-secondary"
              style={{ borderColor: "var(--color-border)" }}>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-success/10 border border-success/20"></span> &gt;20% disponible</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-warning/10 border border-warning/20"></span> 5-20% disponible</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-danger/10 border border-danger/20"></span> &lt;5% disponible</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-900"></span> Sold out</span>
              <span className="ml-auto">Click en celda para ver desglose • Drag para crear reservación</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
