"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Search, Star, User, Mail, Phone, MapPin, Calendar, CreditCard, ChevronRight, Crown } from "lucide-react";

const guests = [
  { id: 1, name: "García Hernández, María", email: "maria.garcia@email.com", phone: "+52 744 123 4567", city: "CDMX", country: "México", visits: 8, totalSpent: 489500, tier: "platinum", lastVisit: "Mar 2026", status: "in_house", room: "301", preferences: ["Vista al mar", "Piso alto", "Almohada firme"], allergies: ["Mariscos"] },
  { id: 2, name: "Fernández Rojas, Luis", email: "lfernandez@corp.com", phone: "+52 55 1234 5678", city: "Monterrey", country: "México", visits: 15, totalSpent: 1245000, tier: "diamond", lastVisit: "Mar 2026", status: "arriving", room: "PH-01", preferences: ["Penthouse", "Early check-in", "Champagne en habitación"], allergies: [] },
  { id: 3, name: "Smith, John", email: "jsmith@gmail.com", phone: "+1 555 234 5678", city: "Los Angeles", country: "USA", visits: 3, totalSpent: 156800, tier: "gold", lastVisit: "Mar 2026", status: "in_house", room: "302", preferences: ["Vista jardín", "Cama king"], allergies: ["Gluten"] },
  { id: 4, name: "López Torres, Carlos", email: "carlos.lopez@bimbo.com", phone: "+52 55 9876 5432", city: "CDMX", country: "México", visits: 22, totalSpent: 2340000, tier: "diamond", lastVisit: "Mar 2026", status: "in_house", room: "304", preferences: ["Tarifa corporativa", "Factura empresa"], allergies: [] },
  { id: 5, name: "Martínez Vega, Ana", email: "ana.mtz@gmail.com", phone: "+52 33 5555 1234", city: "Guadalajara", country: "México", visits: 1, totalSpent: 24500, tier: "classic", lastVisit: "Mar 2026", status: "in_house", room: "306", preferences: [], allergies: [] },
  { id: 6, name: "Wilson, Emma", email: "emma.w@yahoo.com", phone: "+1 310 555 6789", city: "New York", country: "USA", visits: 5, totalSpent: 345600, tier: "gold", lastVisit: "Mar 2026", status: "in_house", room: "308", preferences: ["Habitación tranquila", "Late check-out"], allergies: [] },
  { id: 7, name: "Hernández Mora, Sofía", email: "sofia.hdz@email.com", phone: "+52 744 555 7890", city: "Acapulco", country: "México", visits: 12, totalSpent: 890200, tier: "platinum", lastVisit: "Mar 2026", status: "in_house", room: "401", preferences: ["Suite", "Vista mar", "Spa incluido"], allergies: ["Lácteos"] },
  { id: 8, name: "Johnson, Michael", email: "mjohnson@email.com", phone: "+1 415 555 3456", city: "San Francisco", country: "USA", visits: 2, totalSpent: 98400, tier: "classic", lastVisit: "Mar 2026", status: "in_house", room: "403", preferences: ["Gym cerca"], allergies: [] },
];

const tierConfig: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  classic: { color: "text-gray-600", bg: "bg-gray-100", icon: <User size={12} /> },
  gold: { color: "text-amber-600", bg: "bg-amber-50", icon: <Star size={12} /> },
  platinum: { color: "text-blue-600", bg: "bg-blue-50", icon: <Star size={12} className="fill-current" /> },
  diamond: { color: "text-violet-600", bg: "bg-violet-50", icon: <Crown size={12} /> },
};

function formatCurrency(n: number) {
  return n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : `$${n.toLocaleString("es-MX")}`;
}

export default function GuestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const filtered = searchTerm
    ? guests.filter((g) => g.name.toLowerCase().includes(searchTerm.toLowerCase()) || g.email.includes(searchTerm.toLowerCase()))
    : guests;

  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar />
      <main className="ml-[240px] pt-16">
        <div className="p-6 max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold">Huéspedes — CRM</h1>
              <p className="text-sm text-text-secondary mt-0.5">Perfiles, historial y programa de lealtad</p>
            </div>
          </div>

          {/* Tier summary */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { tier: "Diamond", count: 2, revenue: "$3.6M", color: "bg-violet-50 border-violet-200 text-violet-700" },
              { tier: "Platinum", count: 2, revenue: "$1.4M", color: "bg-blue-50 border-blue-200 text-blue-700" },
              { tier: "Gold", count: 2, revenue: "$502K", color: "bg-amber-50 border-amber-200 text-amber-700" },
              { tier: "Classic", count: 2, revenue: "$123K", color: "bg-gray-50 border-gray-200 text-gray-600" },
            ].map((t) => (
              <div key={t.tier} className={`rounded-xl border p-4 ${t.color}`}>
                <div className="text-xs font-medium uppercase tracking-wider mb-1">{t.tier}</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)" }}>{t.count}</div>
                  <div className="text-sm font-semibold" style={{ fontFamily: "var(--font-mono)" }}>{t.revenue}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, email, teléfono, ciudad..."
              className="w-full pl-11 pr-4 py-3 bg-white border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
              style={{ borderColor: "var(--color-border)" }}
            />
          </div>

          {/* Guest cards */}
          <div className="space-y-3">
            {filtered.map((guest) => {
              const tier = tierConfig[guest.tier];
              return (
                <div key={guest.id} className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow cursor-pointer"
                  style={{ borderColor: "var(--color-border)" }}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <User size={22} className="text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-base font-semibold">{guest.name}</h3>
                          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold rounded-full px-2.5 py-0.5 ${tier.bg} ${tier.color}`}>
                            {tier.icon}
                            {guest.tier.charAt(0).toUpperCase() + guest.tier.slice(1)}
                          </span>
                          {guest.status === "in_house" && (
                            <span className="text-[11px] font-medium bg-success/10 text-success rounded-full px-2 py-0.5">
                              In-house • Hab. {guest.room}
                            </span>
                          )}
                          {guest.status === "arriving" && (
                            <span className="text-[11px] font-medium bg-primary/10 text-primary rounded-full px-2 py-0.5">
                              Llega hoy • Hab. {guest.room}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-text-secondary">
                          <span className="flex items-center gap-1"><Mail size={13} /> {guest.email}</span>
                          <span className="flex items-center gap-1"><Phone size={13} /> {guest.phone}</span>
                          <span className="flex items-center gap-1"><MapPin size={13} /> {guest.city}, {guest.country}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-text-secondary mt-2" />
                  </div>

                  <div className="grid grid-cols-4 gap-6 mt-4 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
                    <div>
                      <div className="text-xs text-text-secondary mb-0.5">Visitas</div>
                      <div className="text-lg font-bold" style={{ fontFamily: "var(--font-mono)" }}>{guest.visits}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary mb-0.5">Gasto total</div>
                      <div className="text-lg font-bold" style={{ fontFamily: "var(--font-mono)" }}>{formatCurrency(guest.totalSpent)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary mb-0.5">Última visita</div>
                      <div className="text-sm font-medium">{guest.lastVisit}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary mb-0.5">Preferencias</div>
                      <div className="flex flex-wrap gap-1">
                        {guest.preferences.slice(0, 3).map((p) => (
                          <span key={p} className="text-[10px] bg-hover rounded px-1.5 py-0.5">{p}</span>
                        ))}
                        {guest.preferences.length > 3 && (
                          <span className="text-[10px] text-text-secondary">+{guest.preferences.length - 3}</span>
                        )}
                        {guest.allergies.length > 0 && (
                          <span className="text-[10px] bg-danger/10 text-danger rounded px-1.5 py-0.5">
                            Alergia: {guest.allergies.join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
