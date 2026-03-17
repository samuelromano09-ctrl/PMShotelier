"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import {
  Package, AlertTriangle, TrendingDown, Search, Filter, Plus,
  ArrowDown, ArrowUp, RotateCcw, ChevronRight,
} from "lucide-react";

const inventoryItems = [
  { id: 1, name: "Toallas de baño", category: "Blancos", location: "Almacén central", stock: 1200, min: 800, max: 2000, unit: "pzas", cost: 145, status: "ok", lastOrder: "Mar 5" },
  { id: 2, name: "Sábanas King", category: "Blancos", location: "Almacén central", stock: 450, min: 400, max: 1000, unit: "juegos", cost: 890, status: "low", lastOrder: "Feb 28" },
  { id: 3, name: "Shampoo amenidad", category: "Amenidades", location: "Almacén HK", stock: 340, min: 500, max: 2000, unit: "pzas", cost: 28, status: "critical", lastOrder: "Feb 20" },
  { id: 4, name: "Jabón facial", category: "Amenidades", location: "Almacén HK", stock: 890, min: 500, max: 2000, unit: "pzas", cost: 22, status: "ok", lastOrder: "Mar 2" },
  { id: 5, name: "Cerveza Nacional", category: "Bebidas", location: "Bar central", stock: 120, min: 200, max: 800, unit: "cajas", cost: 280, status: "critical", lastOrder: "Mar 8" },
  { id: 6, name: "Vino casa tinto", category: "Bebidas", location: "Cava", stock: 85, min: 50, max: 200, unit: "botellas", cost: 160, status: "ok", lastOrder: "Mar 3" },
  { id: 7, name: "Filete de res", category: "Alimentos", location: "Cámara fría", stock: 45, min: 30, max: 100, unit: "kg", cost: 480, status: "ok", lastOrder: "Mar 10" },
  { id: 8, name: "Camarón jumbo", category: "Alimentos", location: "Cámara fría", stock: 18, min: 25, max: 80, unit: "kg", cost: 520, status: "low", lastOrder: "Mar 9" },
  { id: 9, name: "Papel higiénico", category: "Suministros", location: "Almacén general", stock: 200, min: 300, max: 1000, unit: "cajas", cost: 85, status: "critical", lastOrder: "Feb 25" },
  { id: 10, name: "Cloro industrial", category: "Limpieza", location: "Almacén mantenimiento", stock: 30, min: 20, max: 60, unit: "litros", cost: 65, status: "ok", lastOrder: "Mar 6" },
];

const movements = [
  { type: "in", item: "Toallas de baño", qty: 200, date: "Mar 11 09:15", from: "Proveedor TextilPro" },
  { type: "out", item: "Shampoo amenidad", qty: 80, date: "Mar 11 08:30", from: "Almacén HK" },
  { type: "out", item: "Cerveza Nacional", qty: 15, date: "Mar 11 07:45", from: "Bar La Palapa" },
  { type: "in", item: "Filete de res", qty: 25, date: "Mar 10 16:00", from: "Proveedor CarnesMX" },
  { type: "return", item: "Sábanas King", qty: 12, date: "Mar 10 14:30", from: "Lavandería" },
];

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  ok: { color: "text-success", bg: "bg-success/10", label: "Normal" },
  low: { color: "text-warning", bg: "bg-warning/10", label: "Bajo" },
  critical: { color: "text-danger", bg: "bg-danger/10", label: "Crítico" },
};

export default function InventoryPage() {
  const [category, setCategory] = useState("all");
  const categories = ["all", ...new Set(inventoryItems.map((i) => i.category))];
  const filtered = category === "all" ? inventoryItems : inventoryItems.filter((i) => i.category === category);

  const critical = inventoryItems.filter((i) => i.status === "critical").length;
  const low = inventoryItems.filter((i) => i.status === "low").length;
  const totalValue = inventoryItems.reduce((s, i) => s + i.stock * i.cost, 0);

  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar />
      <main className="ml-[240px] pt-16">
        <div className="p-6 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold">Inventarios</h1>
              <p className="text-sm text-text-secondary mt-0.5">Control de almacenes, alimentos, bebidas y suministros</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark">
                <Plus size={16} /> Requisición
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl border p-4" style={{ borderColor: "var(--color-border)" }}>
              <div className="flex items-center gap-2 mb-2">
                <Package size={14} className="text-primary" />
                <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">Total productos</span>
              </div>
              <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)" }}>{inventoryItems.length}</div>
            </div>
            <div className="bg-danger/5 rounded-xl border border-danger/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={14} className="text-danger" />
                <span className="text-xs text-danger font-medium uppercase tracking-wider">Stock crítico</span>
              </div>
              <div className="text-2xl font-bold text-danger" style={{ fontFamily: "var(--font-mono)" }}>{critical}</div>
            </div>
            <div className="bg-warning/5 rounded-xl border border-warning/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown size={14} className="text-warning" />
                <span className="text-xs text-warning font-medium uppercase tracking-wider">Stock bajo</span>
              </div>
              <div className="text-2xl font-bold text-warning" style={{ fontFamily: "var(--font-mono)" }}>{low}</div>
            </div>
            <div className="bg-white rounded-xl border p-4" style={{ borderColor: "var(--color-border)" }}>
              <div className="text-xs text-text-secondary font-medium uppercase tracking-wider mb-2">Valor inventario</div>
              <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)" }}>${(totalValue / 1000).toFixed(0)}K</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Inventory list */}
            <div className="col-span-2">
              {/* Category filter */}
              <div className="flex items-center gap-2 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      category === cat ? "bg-primary text-white" : "bg-white border text-text-secondary hover:bg-hover"
                    }`}
                    style={category !== cat ? { borderColor: "var(--color-border)" } : {}}
                  >
                    {cat === "all" ? "Todos" : cat}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "var(--color-border)" }}>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase">Producto</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase">Ubicación</th>
                      <th className="text-right px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase">Stock</th>
                      <th className="text-right px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase">Mín/Máx</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-text-secondary uppercase">Estatus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) => {
                      const sc = statusConfig[item.status];
                      const pct = Math.min(100, (item.stock / item.max) * 100);
                      return (
                        <tr key={item.id} className="border-b hover:bg-hover/30 cursor-pointer" style={{ borderColor: "var(--color-border)" }}>
                          <td className="px-4 py-3">
                            <div className="text-sm font-medium">{item.name}</div>
                            <div className="text-[11px] text-text-secondary">{item.category}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-text-secondary">{item.location}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="text-sm font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
                              {item.stock} <span className="text-text-secondary text-xs">{item.unit}</span>
                            </div>
                            <div className="w-16 h-1.5 bg-hover rounded-full overflow-hidden ml-auto mt-1">
                              <div className={`h-full rounded-full ${item.status === "critical" ? "bg-danger" : item.status === "low" ? "bg-warning" : "bg-success"}`}
                                style={{ width: `${pct}%` }} />
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right text-xs text-text-secondary" style={{ fontFamily: "var(--font-mono)" }}>
                            {item.min}/{item.max}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center text-[11px] font-medium rounded-full px-2.5 py-1 ${sc.bg} ${sc.color}`}>
                              {sc.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent movements */}
            <div className="bg-white rounded-xl border p-5" style={{ borderColor: "var(--color-border)" }}>
              <h3 className="text-sm font-semibold mb-4">Movimientos recientes</h3>
              <div className="space-y-3">
                {movements.map((mov, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-hover/50 transition-colors">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      mov.type === "in" ? "bg-success/10" : mov.type === "out" ? "bg-danger/10" : "bg-primary/10"
                    }`}>
                      {mov.type === "in" ? <ArrowDown size={14} className="text-success" /> :
                       mov.type === "out" ? <ArrowUp size={14} className="text-danger" /> :
                       <RotateCcw size={14} className="text-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{mov.item}</div>
                      <div className="text-[11px] text-text-secondary">{mov.from}</div>
                      <div className="text-[10px] text-text-secondary mt-0.5">{mov.date}</div>
                    </div>
                    <span className={`text-xs font-bold ${
                      mov.type === "in" ? "text-success" : mov.type === "out" ? "text-danger" : "text-primary"
                    }`} style={{ fontFamily: "var(--font-mono)" }}>
                      {mov.type === "in" ? "+" : mov.type === "out" ? "-" : ""}{mov.qty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
