"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, CalendarDays, BedDouble, ClipboardList, UtensilsCrossed,
  Users, TrendingUp, Sparkles, Building2, ChevronLeft, ChevronRight,
  BookOpen, UserCircle, Receipt, Package, Settings,
} from "lucide-react";

const navGroups = [
  {
    label: "Principal",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/reservations", label: "Reservaciones", icon: BookOpen },
      { href: "/availability", label: "Disponibilidad", icon: CalendarDays },
      { href: "/room-rack", label: "Room Rack", icon: BedDouble },
      { href: "/check-in", label: "Check-in", icon: ClipboardList },
    ],
  },
  {
    label: "Operaciones",
    items: [
      { href: "/pos", label: "POS", icon: UtensilsCrossed },
      { href: "/housekeeping", label: "Housekeeping", icon: Sparkles },
      { href: "/groups", label: "Grupos & Eventos", icon: Users },
      { href: "/inventory", label: "Inventarios", icon: Package },
    ],
  },
  {
    label: "Comercial",
    items: [
      { href: "/revenue", label: "Revenue", icon: TrendingUp },
      { href: "/guests", label: "CRM / Huéspedes", icon: UserCircle },
      { href: "/billing", label: "Facturación", icon: Receipt },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-40 flex flex-col transition-all duration-300 ${
        collapsed ? "w-[68px]" : "w-[240px]"
      }`}
      style={{ backgroundColor: "var(--color-bg-sidebar)" }}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Building2 size={18} className="text-white" />
          </div>
          {!collapsed && (
            <span className="text-white font-bold text-lg tracking-tight">Hotelia</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            {!collapsed && (
              <div className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                {group.label}
              </div>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-slate-400 hover:text-white hover:bg-white/8"
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon size={18} className="shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Settings + Collapse */}
      <div className="border-t border-white/10">
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors ${
            pathname === "/settings"
              ? "bg-primary text-white"
              : "text-slate-400 hover:text-white hover:bg-white/8"
          }`}
          title={collapsed ? "Configuración" : undefined}
        >
          <Settings size={18} className="shrink-0" />
          {!collapsed && <span>Configuración</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full h-10 text-slate-500 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
}
