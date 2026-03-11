"use client";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import {
  kpis, departmentRevenue, todayMovement, alerts, occupancyData,
} from "@/lib/data";
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Info,
  XCircle, ArrowUpRight, BedDouble, LogIn, LogOut, Users, Footprints
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend,
} from "recharts";

function formatCurrency(n: number) {
  return n >= 1000000
    ? `$${(n / 1000000).toFixed(1)}M`
    : `$${n.toLocaleString("es-MX")}`;
}

function KpiCard({ label, value, change, prefix = "", suffix = "" }: {
  label: string; value: number; change: number; prefix?: string; suffix?: string;
}) {
  const isPositive = change >= 0;
  return (
    <div className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow"
      style={{ borderColor: "var(--color-border)" }}>
      <div className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">{label}</div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-mono)" }}>
          {prefix}{typeof value === "number" && value > 10000 ? formatCurrency(value) : value.toLocaleString("es-MX")}{suffix}
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? "text-success" : "text-danger"}`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {isPositive ? "+" : ""}{change}%
        </div>
      </div>
      <div className="text-[11px] text-text-secondary mt-1">vs ayer</div>
    </div>
  );
}

const alertIcons: Record<string, React.ReactNode> = {
  warning: <AlertTriangle size={14} className="text-warning shrink-0" />,
  danger: <XCircle size={14} className="text-danger shrink-0" />,
  success: <CheckCircle size={14} className="text-success shrink-0" />,
  info: <Info size={14} className="text-info shrink-0" />,
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar />
      <main className="ml-[240px] pt-16">
        <div className="p-6 max-w-[1600px] mx-auto">
          {/* KPIs */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <KpiCard label={kpis.occupancy.label} value={kpis.occupancy.value} change={kpis.occupancy.change} suffix="%" />
            <KpiCard label={kpis.adr.label} value={kpis.adr.value} change={kpis.adr.change} prefix="$" />
            <KpiCard label={kpis.revpar.label} value={kpis.revpar.value} change={kpis.revpar.change} prefix="$" />
            <KpiCard label={kpis.trevpar.label} value={kpis.trevpar.value} change={kpis.trevpar.change} prefix="$" />
            <KpiCard label={kpis.revenue.label} value={kpis.revenue.value} change={kpis.revenue.change} prefix="$" />
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Occupancy Chart */}
            <div className="col-span-2 bg-white rounded-xl border p-5" style={{ borderColor: "var(--color-border)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Ocupación — Marzo 2026</h3>
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary"></span>Real</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary/30"></span>Forecast</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-warning/40"></span>Presupuesto</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-text-secondary/30"></span>Año anterior</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={occupancyData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} interval={1} />
                  <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
                    formatter={(value) => value != null ? `${value}%` : "—"}
                  />
                  <Bar dataKey="actual" fill="#2563eb" radius={[3, 3, 0, 0]} maxBarSize={16} />
                  <Bar dataKey="forecast" fill="#2563eb" opacity={0.25} radius={[3, 3, 0, 0]} maxBarSize={16} />
                  <Line type="monotone" dataKey="budget" stroke="#d97706" strokeWidth={2} strokeDasharray="6 3" dot={false} />
                  <Line type="monotone" dataKey="lastYear" stroke="#9ca3af" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue by Department */}
            <div className="bg-white rounded-xl border p-5" style={{ borderColor: "var(--color-border)" }}>
              <h3 className="text-sm font-semibold mb-4">Ingresos por Departamento</h3>
              <div className="space-y-3">
                {departmentRevenue.map((dept) => (
                  <div key={dept.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-sm font-medium w-24">{dept.name}</div>
                      <div className="flex-1 h-2 bg-hover rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${dept.pct}%`, opacity: 0.3 + dept.pct / 100 }}
                        />
                      </div>
                    </div>
                    <div className="text-sm font-semibold ml-4" style={{ fontFamily: "var(--font-mono)" }}>
                      {formatCurrency(dept.amount)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between text-sm font-bold"
                style={{ borderColor: "var(--color-border)" }}>
                <span>Total</span>
                <span style={{ fontFamily: "var(--font-mono)" }}>$1,556,400</span>
              </div>
            </div>
          </div>

          {/* Movement + Alerts */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            {/* Today's Movement */}
            <div className="bg-white rounded-xl border p-5" style={{ borderColor: "var(--color-border)" }}>
              <h3 className="text-sm font-semibold mb-4">Movimiento de hoy</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: LogIn, label: "Llegadas", value: todayMovement.arrivals, color: "text-success" },
                  { icon: LogOut, label: "Salidas", value: todayMovement.departures, color: "text-warning" },
                  { icon: BedDouble, label: "In-house", value: todayMovement.inHouse, color: "text-primary" },
                  { icon: Footprints, label: "Walk-ins", value: todayMovement.walkIns, color: "text-info" },
                  { icon: XCircle, label: "No shows", value: todayMovement.noShows, color: "text-danger" },
                  { icon: Users, label: "Grupos", value: todayMovement.activeGroups, color: "text-info" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="text-center p-3 rounded-lg bg-hover/50">
                    <Icon size={18} className={`${color} mx-auto mb-1.5`} />
                    <div className="text-xl font-bold" style={{ fontFamily: "var(--font-mono)" }}>{value}</div>
                    <div className="text-[11px] text-text-secondary">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="col-span-2 bg-white rounded-xl border p-5" style={{ borderColor: "var(--color-border)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Alertas activas</h3>
                <span className="text-xs text-text-secondary">{alerts.length} alertas</span>
              </div>
              <div className="space-y-2">
                {alerts.map((alert, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-hover/50 transition-colors cursor-pointer"
                  >
                    {alertIcons[alert.type]}
                    <span className="text-sm flex-1">{alert.message}</span>
                    <span className="text-[11px] text-text-secondary bg-hover rounded-full px-2.5 py-0.5">{alert.module}</span>
                    <ArrowUpRight size={14} className="text-text-secondary" />
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
