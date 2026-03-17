"use client";
import { Search, Bell, User, Building2 } from "lucide-react";
import { hotelInfo } from "@/lib/data";

export default function Topbar() {
  return (
    <header className="fixed top-0 right-0 left-[240px] h-16 bg-white border-b z-30 flex items-center justify-between px-6"
      style={{ borderColor: "var(--color-border)" }}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Building2 size={16} className="text-text-secondary" />
          <span className="font-semibold">{hotelInfo.name}</span>
          <span className="text-text-secondary">•</span>
          <span className="text-text-secondary">{hotelInfo.date}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Buscar huésped, reserva, habitación... (⌘K)"
            className="pl-10 pr-4 py-2 w-[360px] bg-hover rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20 placeholder-text-secondary"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-text-secondary bg-white border rounded px-1.5 py-0.5"
            style={{ borderColor: "var(--color-border)" }}>
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-hover transition-colors">
          <Bell size={20} className="text-text-secondary" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full"></span>
        </button>

        {/* User */}
        <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-hover transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User size={16} className="text-primary" />
          </div>
          <div className="text-left hidden lg:block">
            <div className="text-sm font-medium">Dir. General</div>
          </div>
        </button>
      </div>
    </header>
  );
}
