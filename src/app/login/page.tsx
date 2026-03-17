"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0f1729] to-[#1e3a5f] flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Building2 size={22} />
          </div>
          <span className="font-bold text-2xl tracking-tight">Hotelia</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            La plataforma hotelera<br />de nueva generación
          </h1>
          <p className="text-lg text-blue-200/80 max-w-md">
            PMS + POS + CRS + ERP + CRM + Revenue Management unificados en una sola experiencia.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { value: "412", label: "Habitaciones" },
              { value: "87.3%", label: "Ocupación" },
              { value: "$3.8K", label: "TRevPAR" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {stat.value}
                </div>
                <div className="text-sm text-blue-200/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-blue-200/50">
          &copy; 2026 Hotelia. Plataforma Central Hotelera.
        </p>
      </div>

      {/* Right side - login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-bg">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Building2 size={22} className="text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight">Hotelia</span>
          </div>

          <h2 className="text-2xl font-bold mb-2">Iniciar sesión</h2>
          <p className="text-text-secondary mb-8">Ingresa tus credenciales para acceder al sistema</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@hotel.com"
                className="w-full px-4 py-3 bg-white border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                style={{ borderColor: "var(--color-border)" }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary pr-12"
                  style={{ borderColor: "var(--color-border)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <span className="text-text-secondary">Recordar sesión</span>
              </label>
              <button type="button" className="text-primary hover:underline font-medium">
                Olvidé mi contraseña
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs font-medium text-blue-700 mb-2">Demo — Acceso rápido:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { role: "Director General", email: "director@demo.com" },
                { role: "Front Desk", email: "front@demo.com" },
                { role: "Revenue Manager", email: "revenue@demo.com" },
                { role: "Ama de Llaves", email: "hk@demo.com" },
              ].map((demo) => (
                <button
                  key={demo.role}
                  onClick={() => { setEmail(demo.email); setPassword("demo123"); }}
                  className="text-left p-2 bg-white rounded-lg border border-blue-100 hover:border-primary/30 transition-colors"
                >
                  <div className="font-medium text-blue-800">{demo.role}</div>
                  <div className="text-blue-500">{demo.email}</div>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-text-secondary mt-6">
            Hotel Playa Diamante • Acapulco, Guerrero
          </p>
        </div>
      </div>
    </div>
  );
}
