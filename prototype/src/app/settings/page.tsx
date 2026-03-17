"use client";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Building2, Users, Shield, Globe, Bell, Palette, Database, Wifi } from "lucide-react";

const settingSections = [
  {
    title: "Propiedad",
    icon: Building2,
    items: [
      { label: "Información del hotel", description: "Nombre, dirección, contacto, logotipo", value: "Hotel Playa Diamante" },
      { label: "Tipos de habitación", description: "Configuración de categorías y tarifas base", value: "9 tipos" },
      { label: "Pisos y habitaciones", description: "Asignación de pisos, numeración, amenidades", value: "412 habitaciones" },
      { label: "Planes tarifarios", description: "AI, AIP, EP, MAP y paquetes personalizados", value: "5 planes" },
    ],
  },
  {
    title: "Usuarios y permisos",
    icon: Users,
    items: [
      { label: "Usuarios", description: "Gestión de cuentas de acceso al sistema", value: "42 activos" },
      { label: "Roles", description: "Perfiles de acceso y permisos por módulo", value: "8 roles" },
      { label: "Turnos", description: "Configuración de turnos operativos", value: "3 turnos" },
    ],
  },
  {
    title: "Fiscal y facturación",
    icon: Shield,
    items: [
      { label: "CFDI 4.0", description: "Configuración PAC, certificados, serie y folios", value: "Activo" },
      { label: "Cuentas contables", description: "Catálogo USALI y mapeo de cuentas", value: "120 cuentas" },
      { label: "Impuestos", description: "IVA, ISH, propinas y configuración fiscal", value: "3 impuestos" },
    ],
  },
  {
    title: "Canales y distribución",
    icon: Globe,
    items: [
      { label: "Channel Manager", description: "Conexión con OTAs y GDS", value: "4 canales" },
      { label: "Motor de reservas", description: "Booking engine en sitio web", value: "Activo" },
      { label: "Tarifas y restricciones", description: "Reglas de yield y disponibilidad", value: "12 reglas" },
    ],
  },
  {
    title: "Notificaciones",
    icon: Bell,
    items: [
      { label: "Alertas operativas", description: "Configurar alertas por módulo y prioridad", value: "15 activas" },
      { label: "Email", description: "Templates de confirmación, pre-arrival, post-stay", value: "8 templates" },
      { label: "WhatsApp", description: "Integración para comunicación con huéspedes", value: "Activo" },
    ],
  },
  {
    title: "Integraciones",
    icon: Wifi,
    items: [
      { label: "PMS Interfaces", description: "Cerraduras, PBX, TV, minibar, pasarela pago", value: "6 interfaces" },
      { label: "API", description: "Documentación OpenAPI y llaves de acceso", value: "v2.1" },
      { label: "Webhooks", description: "Configurar eventos y endpoints externos", value: "3 activos" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar />
      <main className="ml-[240px] pt-16">
        <div className="p-6 max-w-[1200px] mx-auto">
          <div className="mb-6">
            <h1 className="text-xl font-bold">Configuración</h1>
            <p className="text-sm text-text-secondary mt-0.5">Administración del sistema y la propiedad</p>
          </div>

          <div className="space-y-6">
            {settingSections.map((section) => (
              <div key={section.title} className="bg-white rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
                <div className="flex items-center gap-3 p-5 border-b" style={{ borderColor: "var(--color-border)" }}>
                  <section.icon size={18} className="text-primary" />
                  <h2 className="text-sm font-semibold">{section.title}</h2>
                </div>
                <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
                  {section.items.map((item) => (
                    <div key={item.label} className="flex items-center justify-between px-5 py-4 hover:bg-hover/50 transition-colors cursor-pointer">
                      <div>
                        <div className="text-sm font-medium">{item.label}</div>
                        <div className="text-xs text-text-secondary mt-0.5">{item.description}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-text-secondary" style={{ fontFamily: "var(--font-mono)" }}>{item.value}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary">
                          <polyline points="9,18 15,12 9,6" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
