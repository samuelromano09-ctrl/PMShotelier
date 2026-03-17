"use client";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { revenueMetrics } from "@/lib/data";
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LineChart, Line, Cell, PieChart, Pie } from "recharts";

const COLORS = ["#2563eb", "#7c3aed", "#8b5cf6", "#d97706", "#059669", "#6b7280"];

export default function RevenuePage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar />
      <main className="ml-[240px] pt-16">
        <div className="p-6 max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold">Revenue Management</h1>
            <p className="text-sm text-text-secondary mt-0.5">Análisis, forecast y control comercial — Marzo 2026</p>
          </div>

          {/* KPI Row */}
          <div className="grid grid-cols-6 gap-3 mb-6">
            {[
              { label: "OTB", value: "87.3%", sub: "Ocupación", trend: "+3.2%" },
              { label: "ADR", value: "$2,450", sub: "Tarifa promedio", trend: "+5.1%" },
              { label: "RevPAR", value: "$2,139", sub: "Revenue/HAD", trend: "+8.4%" },
              { label: "TRevPAR", value: "$3,891", sub: "Total Rev/HAD", trend: "+4.7%" },
              { label: "GOPPAR", value: "$1,823", sub: "GOP/HAD", trend: "+6.3%" },
              { label: "Pickup 7d", value: "+142", sub: "Room nights", trend: "+12%" },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white rounded-xl border p-4" style={{ borderColor: "var(--color-border)" }}>
                <div className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">{kpi.label}</div>
                <div className="text-xl font-bold mt-1" style={{ fontFamily: "var(--font-mono)" }}>{kpi.value}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] text-text-secondary">{kpi.sub}</span>
                  <span className="text-[11px] font-semibold text-success flex items-center gap-0.5">
                    <TrendingUp size={10} />{kpi.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Forecast Chart */}
            <div className="col-span-2 bg-white rounded-xl border p-5" style={{ borderColor: "var(--color-border)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Forecast de Ocupación — Marzo</h3>
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary"></span>OTB</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary/30"></span>Forecast</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-warning"></span>Budget</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-gray-400"></span>LY</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={revenueMetrics.forecast} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} interval={2} />
                  <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
                    formatter={(v) => `${v}%`} />
                  <Line type="monotone" dataKey="otb" stroke="#2563eb" strokeWidth={2.5} dot={{ fill: "#2563eb", r: 2 }} />
                  <Line type="monotone" dataKey="forecast" stroke="#2563eb" strokeWidth={1.5} strokeDasharray="6 3" dot={false} opacity={0.4} />
                  <Line type="monotone" dataKey="budget" stroke="#d97706" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                  <Line type="monotone" dataKey="lastYear" stroke="#9ca3af" strokeWidth={1} strokeDasharray="3 3" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Channel Mix */}
            <div className="bg-white rounded-xl border p-5" style={{ borderColor: "var(--color-border)" }}>
              <h3 className="text-sm font-semibold mb-4">Mix de Canales</h3>
              <div className="space-y-3">
                {revenueMetrics.channels.map((ch, i) => (
                  <div key={ch.name} className="flex items-center gap-3">
                    <div className="w-20 text-xs font-medium truncate">{ch.name}</div>
                    <div className="flex-1 h-3 bg-hover rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${ch.pct}%`, backgroundColor: COLORS[i % COLORS.length] }} />
                    </div>
                    <div className="w-10 text-right text-xs font-semibold" style={{ fontFamily: "var(--font-mono)" }}>{ch.pct}%</div>
                    {ch.trend === "up" ? <TrendingUp size={12} className="text-success" /> :
                     ch.trend === "down" ? <TrendingDown size={12} className="text-danger" /> :
                     <Minus size={12} className="text-text-secondary" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Segmentation table */}
          <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "var(--color-border)" }}>
              <h3 className="text-sm font-semibold">Producción por Segmento — Marzo MTD</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--color-border)" }}>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-text-secondary uppercase">Segmento</th>
                  <th className="text-right px-5 py-3 text-[11px] font-semibold text-text-secondary uppercase">Room Nights</th>
                  <th className="text-right px-5 py-3 text-[11px] font-semibold text-text-secondary uppercase">ADR</th>
                  <th className="text-right px-5 py-3 text-[11px] font-semibold text-text-secondary uppercase">Ingreso</th>
                  <th className="text-right px-5 py-3 text-[11px] font-semibold text-text-secondary uppercase">% Mix</th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-text-secondary uppercase w-[200px]">Contribución</th>
                </tr>
              </thead>
              <tbody>
                {revenueMetrics.segments.map((seg, i) => (
                  <tr key={seg.name} className="border-b hover:bg-hover/30" style={{ borderColor: "var(--color-border)" }}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[i] }}></span>
                        <span className="text-sm font-medium">{seg.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right text-sm" style={{ fontFamily: "var(--font-mono)" }}>
                      {seg.roomNights.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-right text-sm" style={{ fontFamily: "var(--font-mono)" }}>
                      ${seg.adr.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-right text-sm font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
                      ${(seg.revenue / 1000000).toFixed(1)}M
                    </td>
                    <td className="px-5 py-3.5 text-right text-sm" style={{ fontFamily: "var(--font-mono)" }}>
                      {seg.pct}%
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="h-2.5 bg-hover rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${seg.pct}%`, backgroundColor: COLORS[i] }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50/70 font-semibold">
                  <td className="px-5 py-3 text-sm">Total</td>
                  <td className="px-5 py-3 text-right text-sm" style={{ fontFamily: "var(--font-mono)" }}>
                    {revenueMetrics.segments.reduce((s, seg) => s + seg.roomNights, 0).toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-right text-sm" style={{ fontFamily: "var(--font-mono)" }}>$2,243</td>
                  <td className="px-5 py-3 text-right text-sm" style={{ fontFamily: "var(--font-mono)" }}>
                    ${(revenueMetrics.segments.reduce((s, seg) => s + seg.revenue, 0) / 1000000).toFixed(1)}M
                  </td>
                  <td className="px-5 py-3 text-right text-sm" style={{ fontFamily: "var(--font-mono)" }}>100%</td>
                  <td className="px-5 py-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Active restrictions */}
          <div className="mt-6 bg-white rounded-xl border p-5" style={{ borderColor: "var(--color-border)" }}>
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle size={14} className="text-warning" /> Restricciones activas
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { date: "Sáb 14 Mar", restriction: "Stop Sell", types: "STD-VJ, STD-VM", reason: "Sold out" },
                { date: "Sáb 14 Mar", restriction: "CTA", types: "JRS, STE", reason: "Solo checkout" },
                { date: "Vie-Dom 13-15", restriction: "MinLOS 3", types: "Todos", reason: "Fin de semana alto" },
                { date: "Mar-Jue 18-20", restriction: "CTA", types: "STD-VJ", reason: "Convención bloqueo" },
              ].map((r, i) => (
                <div key={i} className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                  <div className="text-xs font-semibold text-warning mb-1">{r.restriction}</div>
                  <div className="text-sm font-medium">{r.date}</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">{r.types}</div>
                  <div className="text-[11px] text-text-secondary">{r.reason}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
