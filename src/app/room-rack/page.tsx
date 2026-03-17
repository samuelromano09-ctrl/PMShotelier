"use client";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { rooms } from "@/lib/data";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";

const statusColors: Record<string, string> = {
  occupied: "bg-primary text-white",
  available: "",
  maintenance: "bg-danger/15 text-danger",
  blocked: "bg-gray-200 text-gray-500",
};

const planColors: Record<string, string> = {
  AI: "bg-amber-500",
  AIP: "bg-amber-600",
  EP: "bg-blue-500",
};

const segmentColors: Record<string, string> = {
  direct: "bg-blue-500",
  ota: "bg-purple-500",
  agency: "bg-teal-500",
  corporate: "bg-amber-700",
  group: "bg-violet-500",
};

const hkBadges: Record<string, { color: string; label: string }> = {
  clean: { color: "bg-success", label: "L" },
  dirty: { color: "bg-danger", label: "S" },
  inspected: { color: "bg-primary", label: "I" },
  in_progress: { color: "bg-warning", label: "..." },
  out_of_service: { color: "bg-gray-400", label: "X" },
};

const days = ["L 9", "M 10", "X 11", "J 12", "V 13", "S 14", "D 15"];

export default function RoomRackPage() {
  const floors = [...new Set(rooms.map((r) => r.floor))].sort();

  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar />
      <main className="ml-[240px] pt-16">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold">Room Rack</h1>
              <p className="text-sm text-text-secondary mt-0.5">Vista visual de habitaciones por fecha</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-1.5 rounded-lg hover:bg-hover"><ChevronLeft size={18} /></button>
              <span className="text-sm font-semibold">9 — 15 Marzo 2026</span>
              <button className="p-1.5 rounded-lg hover:bg-hover"><ChevronRight size={18} /></button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:bg-hover ml-4"
                style={{ borderColor: "var(--color-border)" }}>
                <Filter size={14} /> Filtros
              </button>
            </div>
          </div>

          {/* Room Rack Grid */}
          <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--color-border)" }}>
                    <th className="sticky left-0 z-10 bg-white text-left px-4 py-3 text-xs font-semibold text-text-secondary w-[140px] border-r"
                      style={{ borderColor: "var(--color-border)" }}>
                      Habitación
                    </th>
                    <th className="px-2 py-3 text-center text-[10px] font-medium text-text-secondary w-[36px]">HK</th>
                    {days.map((d) => (
                      <th key={d} className={`px-2 py-3 text-center min-w-[140px] text-xs font-semibold ${
                        d === "X 11" ? "bg-primary/5" : ""
                      }`}>
                        {d}
                        {d === "X 11" && <div className="text-[9px] text-primary font-normal">HOY</div>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {floors.map((floor) => {
                    const floorRooms = rooms.filter((r) => r.floor === floor);
                    return (
                      <tbody key={floor}>
                        {/* Floor header */}
                        <tr className="bg-gray-50/70">
                          <td colSpan={2 + days.length} className="px-4 py-2 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                            Piso {floor}
                          </td>
                        </tr>
                        {floorRooms.map((room) => {
                          const hk = hkBadges[room.hk];
                          // Calculate which days this reservation spans
                          const checkInDay = room.checkIn ? parseInt(room.checkIn.replace("Mar ", "")) : null;
                          const checkOutDay = room.checkOut ? parseInt(room.checkOut.replace("Mar ", "")) : null;

                          return (
                            <tr key={room.number} className="border-b hover:bg-hover/20 transition-colors"
                              style={{ borderColor: "var(--color-border)" }}>
                              <td className="sticky left-0 z-10 bg-white px-4 py-2 border-r"
                                style={{ borderColor: "var(--color-border)" }}>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold">{room.number}</span>
                                  <span className="text-[10px] text-text-secondary">{room.type}</span>
                                </div>
                              </td>
                              <td className="text-center py-2">
                                <span className={`inline-flex items-center justify-center w-5 h-5 rounded text-[9px] font-bold text-white ${hk?.color || "bg-gray-300"}`}>
                                  {hk?.label || "?"}
                                </span>
                              </td>
                              {days.map((d, dayIdx) => {
                                const dayNum = dayIdx + 9;
                                const isToday = dayNum === 11;
                                const isOccupied = checkInDay && checkOutDay && dayNum >= checkInDay && dayNum < checkOutDay;
                                const isCheckIn = checkInDay === dayNum;
                                const isCheckOut = checkOutDay === dayNum;
                                const isMaintenance = room.status === "maintenance";
                                const isBlocked = room.status === "blocked";

                                if (isMaintenance) {
                                  return (
                                    <td key={d} className={`px-1 py-2 ${isToday ? "bg-primary/5" : ""}`}>
                                      <div className="bg-red-100 border border-red-200 rounded-md h-10 flex items-center justify-center">
                                        <span className="text-[10px] font-medium text-red-500">Mantenimiento</span>
                                      </div>
                                    </td>
                                  );
                                }

                                if (isBlocked) {
                                  return (
                                    <td key={d} className={`px-1 py-2 ${isToday ? "bg-primary/5" : ""}`}>
                                      <div className="bg-gray-100 border border-gray-200 rounded-md h-10 flex items-center justify-center">
                                        <span className="text-[10px] font-medium text-gray-400">Bloqueada</span>
                                      </div>
                                    </td>
                                  );
                                }

                                if (isOccupied && room.guest) {
                                  const planColor = planColors[room.plan || "EP"];
                                  const segColor = segmentColors[room.segment || "direct"];
                                  return (
                                    <td key={d} className={`px-0.5 py-2 ${isToday ? "bg-primary/5" : ""}`}>
                                      <div className={`relative h-10 rounded-md flex items-center px-2 cursor-pointer hover:brightness-95 transition-all ${
                                        room.segment === "group" ? "bg-violet-100 border border-violet-200" :
                                        room.segment === "corporate" ? "bg-amber-50 border border-amber-200" :
                                        room.plan === "AI" || room.plan === "AIP" ? "bg-amber-50 border border-amber-200" :
                                        "bg-blue-50 border border-blue-200"
                                      } ${isCheckIn ? "rounded-l-xl" : ""} ${isCheckOut ? "" : ""}`}>
                                        {isCheckIn && (
                                          <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-md ${segColor}`}></div>
                                        )}
                                        <div className="flex items-center gap-1.5 min-w-0">
                                          {isCheckIn && (
                                            <span className={`shrink-0 w-4 h-4 rounded-full text-[8px] font-bold text-white flex items-center justify-center ${planColor}`}>
                                              {room.plan?.charAt(0)}
                                            </span>
                                          )}
                                          <span className="text-[11px] font-medium truncate">
                                            {isCheckIn ? room.guest : ""}
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                  );
                                }

                                return (
                                  <td key={d} className={`px-1 py-2 ${isToday ? "bg-primary/5" : ""}`}>
                                    <div className="h-10 rounded-md border border-dashed border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer"></div>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-5 px-4 py-3 border-t text-[11px] text-text-secondary"
              style={{ borderColor: "var(--color-border)" }}>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-50 border border-amber-200"></span> All Inclusive</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-50 border border-blue-200"></span> Plan Europeo</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-violet-100 border border-violet-200"></span> Grupo</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-100 border border-red-200"></span> Mantenimiento</span>
              <span className="ml-auto">HK: <b>L</b>=Limpia <b>S</b>=Sucia <b>I</b>=Inspeccionada</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
