"use client";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import {
  DollarSign, TrendingUp, TrendingDown, AlertTriangle, FileText,
  CreditCard, Building2, Download, ChevronRight, Clock,
} from "lucide-react";

const invoices = [
  { id: "FAC-A-001234", guest: "Corp. Bimbo", amount: 1100000, status: "paid", date: "Mar 10", type: "CFDI", rfc: "GBI9906106P0" },
  { id: "FAC-A-001235", guest: "Grupo Boda García", amount: 445000, status: "partial", date: "Mar 8", type: "CFDI", rfc: "GARH880512" },
  { id: "FAC-A-001236", guest: "Fernández, Luis", amount: 196000, status: "pending", date: "Mar 11", type: "CFDI", rfc: "FERL900215" },
  { id: "FAC-A-001237", guest: "Viajes Premier", amount: 420000, status: "paid", date: "Mar 7", type: "CFDI", rfc: "VPR150310K58" },
  { id: "FAC-A-001238", guest: "García, María", amount: 61250, status: "pending", date: "Mar 11", type: "CFDI", rfc: "GAHM920408" },
  { id: "FAC-A-001239", guest: "Smith, John", amount: 39200, status: "overdue", date: "Mar 5", type: "Invoice", rfc: "N/A" },
];

const statusBadge: Record<string, { color: string; label: string }> = {
  paid: { color: "bg-success/10 text-success", label: "Pagada" },
  partial: { color: "bg-warning/10 text-warning", label: "Parcial" },
  pending: { color: "bg-blue-50 text-blue-600", label: "Pendiente" },
  overdue: { color: "bg-danger/10 text-danger", label: "Vencida" },
};

const cxcAging = [
  { range: "0-30 días", amount: 2450000, count: 28, color: "bg-success" },
  { range: "31-60 días", amount: 890000, count: 12, color: "bg-warning" },
  { range: "61-90 días", amount: 345000, count: 5, color: "bg-orange-500" },
  { range: "90+ días", amount: 120000, count: 3, color: "bg-danger" },
];

function formatCurrency(n: number) {
  return n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : `$${n.toLocaleString("es-MX")}`;
}

export default function BillingPage() {
  const totalCxC = cxcAging.reduce((s, a) => s + a.amount, 0);

  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar />
      <main className="ml-[240px] pt-16">
        <div className="p-6 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold">Facturación & Cuentas por Cobrar</h1>
              <p className="text-sm text-text-secondary mt-0.5">Control financiero, CFDI 4.0 y cobranza</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:bg-hover"
                style={{ borderColor: "var(--color-border)" }}>
                <Download size={14} /> Reporte USALI
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark">
                <FileText size={16} /> Nueva factura
              </button>
            </div>
          </div>

          {/* Financial KPIs */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {[
              { label: "Ingresos hoy", value: "$1,556,400", change: "+7.2%", positive: true, icon: DollarSign },
              { label: "CxC total", value: formatCurrency(totalCxC), change: "-3.1%", positive: true, icon: CreditCard },
              { label: "CxC vencidas", value: "$465K", change: "+2.8%", positive: false, icon: AlertTriangle },
              { label: "CFDI emitidos hoy", value: "23", change: null, positive: true, icon: FileText },
              { label: "Auditoría nocturna", value: "OK", change: "00:15", positive: true, icon: Clock },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white rounded-xl border p-4" style={{ borderColor: "var(--color-border)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <kpi.icon size={14} className="text-text-secondary" />
                  <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">{kpi.label}</span>
                </div>
                <div className="text-xl font-bold" style={{ fontFamily: "var(--font-mono)" }}>{kpi.value}</div>
                {kpi.change && (
                  <div className={`text-[11px] font-semibold mt-0.5 flex items-center gap-0.5 ${kpi.positive ? "text-success" : "text-danger"}`}>
                    {kpi.positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {kpi.change}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* CxC Aging */}
            <div className="bg-white rounded-xl border p-5" style={{ borderColor: "var(--color-border)" }}>
              <h3 className="text-sm font-semibold mb-4">Antigüedad de CxC</h3>
              <div className="space-y-3">
                {cxcAging.map((aging) => (
                  <div key={aging.range}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-text-secondary">{aging.range} ({aging.count})</span>
                      <span className="font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
                        {formatCurrency(aging.amount)}
                      </span>
                    </div>
                    <div className="h-2.5 bg-hover rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${aging.color}`}
                        style={{ width: `${(aging.amount / totalCxC) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t flex items-center justify-between text-sm font-semibold"
                style={{ borderColor: "var(--color-border)" }}>
                <span>Total CxC</span>
                <span style={{ fontFamily: "var(--font-mono)" }}>{formatCurrency(totalCxC)}</span>
              </div>
            </div>

            {/* Revenue by Department (USALI) */}
            <div className="col-span-2 bg-white rounded-xl border p-5" style={{ borderColor: "var(--color-border)" }}>
              <h3 className="text-sm font-semibold mb-4">Estado de Resultados USALI — Marzo MTD</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--color-border)" }}>
                    <th className="text-left py-2 text-[11px] font-semibold text-text-secondary uppercase">Departamento</th>
                    <th className="text-right py-2 text-[11px] font-semibold text-text-secondary uppercase">Ingresos</th>
                    <th className="text-right py-2 text-[11px] font-semibold text-text-secondary uppercase">Costos</th>
                    <th className="text-right py-2 text-[11px] font-semibold text-text-secondary uppercase">GOP</th>
                    <th className="text-right py-2 text-[11px] font-semibold text-text-secondary uppercase">Margen</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { dept: "Habitaciones", revenue: 8902000, cost: 1780400, gop: 7121600, margin: 80.0 },
                    { dept: "A&B", revenue: 4123000, cost: 1442050, gop: 2680950, margin: 65.0 },
                    { dept: "Eventos", revenue: 1568000, cost: 470400, gop: 1097600, margin: 70.0 },
                    { dept: "Spa", revenue: 542000, cost: 189700, gop: 352300, margin: 65.0 },
                    { dept: "Boutique", revenue: 284000, cost: 170400, gop: 113600, margin: 40.0 },
                    { dept: "Otros", revenue: 145000, cost: 58000, gop: 87000, margin: 60.0 },
                  ].map((row) => (
                    <tr key={row.dept} className="border-b hover:bg-hover/30" style={{ borderColor: "var(--color-border)" }}>
                      <td className="py-2.5 font-medium">{row.dept}</td>
                      <td className="py-2.5 text-right" style={{ fontFamily: "var(--font-mono)" }}>{formatCurrency(row.revenue)}</td>
                      <td className="py-2.5 text-right text-text-secondary" style={{ fontFamily: "var(--font-mono)" }}>{formatCurrency(row.cost)}</td>
                      <td className="py-2.5 text-right font-semibold" style={{ fontFamily: "var(--font-mono)" }}>{formatCurrency(row.gop)}</td>
                      <td className="py-2.5 text-right">
                        <span className={`text-xs font-semibold ${row.margin >= 70 ? "text-success" : row.margin >= 50 ? "text-warning" : "text-danger"}`}>
                          {row.margin}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50/70 font-semibold">
                    <td className="py-2.5">Total Operación</td>
                    <td className="py-2.5 text-right" style={{ fontFamily: "var(--font-mono)" }}>$15.6M</td>
                    <td className="py-2.5 text-right" style={{ fontFamily: "var(--font-mono)" }}>$4.1M</td>
                    <td className="py-2.5 text-right" style={{ fontFamily: "var(--font-mono)" }}>$11.5M</td>
                    <td className="py-2.5 text-right text-success">73.5%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Invoices table */}
          <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "var(--color-border)" }}>
              <h3 className="text-sm font-semibold">Últimas facturas emitidas</h3>
              <button className="text-xs text-primary font-medium hover:underline">Ver todas</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--color-border)" }}>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-text-secondary uppercase">Folio</th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-text-secondary uppercase">Cliente</th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-text-secondary uppercase">RFC</th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-text-secondary uppercase">Fecha</th>
                  <th className="text-right px-5 py-3 text-[11px] font-semibold text-text-secondary uppercase">Monto</th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-text-secondary uppercase">Tipo</th>
                  <th className="text-left px-5 py-3 text-[11px] font-semibold text-text-secondary uppercase">Estatus</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => {
                  const badge = statusBadge[inv.status];
                  return (
                    <tr key={inv.id} className="border-b hover:bg-hover/30 cursor-pointer" style={{ borderColor: "var(--color-border)" }}>
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-semibold text-primary" style={{ fontFamily: "var(--font-mono)" }}>{inv.id}</span>
                      </td>
                      <td className="px-5 py-3.5 text-sm font-medium">{inv.guest}</td>
                      <td className="px-5 py-3.5 text-xs text-text-secondary" style={{ fontFamily: "var(--font-mono)" }}>{inv.rfc}</td>
                      <td className="px-5 py-3.5 text-sm text-text-secondary">{inv.date}</td>
                      <td className="px-5 py-3.5 text-right text-sm font-semibold" style={{ fontFamily: "var(--font-mono)" }}>
                        {formatCurrency(inv.amount)}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-[11px] font-medium bg-gray-100 rounded px-2 py-0.5">{inv.type}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center text-[11px] font-medium rounded-full px-2.5 py-1 ${badge?.color}`}>
                          {badge?.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <ChevronRight size={14} className="text-text-secondary" />
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
