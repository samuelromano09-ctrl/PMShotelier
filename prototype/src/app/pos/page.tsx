"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { posProducts } from "@/lib/data";
import { Search, Minus, Plus, Trash2, CreditCard, Banknote, BedDouble, Check, UtensilsCrossed } from "lucide-react";

type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  ai: string;
};

export default function POSPage() {
  const [activeCategory, setActiveCategory] = useState("Entradas");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: 1, name: "Ceviche de Camarón", price: 220, quantity: 1, ai: "included" },
    { id: 6, name: "Pescado a la Talla", price: 380, quantity: 2, ai: "included" },
    { id: 12, name: "Margarita", price: 180, quantity: 3, ai: "included" },
    { id: 5, name: "Filete de Res 300g", price: 520, quantity: 1, ai: "premium" },
  ]);
  const [guestPlan] = useState<"AI" | "EP">("AI");

  const filteredProducts = posProducts.items.filter(
    (p) => p.category === activeCategory
  );

  const addItem = (product: (typeof posProducts.items)[0]) => {
    const existing = orderItems.find((i) => i.id === product.id);
    if (existing) {
      setOrderItems(
        orderItems.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setOrderItems([
        ...orderItems,
        { id: product.id, name: product.name, price: product.price, quantity: 1, ai: product.ai },
      ]);
    }
  };

  const removeItem = (id: number) => {
    setOrderItems(orderItems.filter((i) => i.id !== id));
  };

  const updateQty = (id: number, delta: number) => {
    setOrderItems(
      orderItems
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const includedTotal = orderItems
    .filter((i) => i.ai === "included" && guestPlan === "AI")
    .reduce((sum, i) => sum + i.price * i.quantity, 0);
  const extraTotal = orderItems
    .filter((i) => i.ai !== "included" || guestPlan !== "AI")
    .reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = Math.round(extraTotal * 0.16);
  const tip = Math.round(extraTotal * 0.15);

  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar />
      <main className="ml-[240px] pt-16">
        <div className="flex h-[calc(100vh-64px)]">
          {/* Left: Order */}
          <div className="w-[380px] border-r flex flex-col bg-white" style={{ borderColor: "var(--color-border)" }}>
            {/* Guest info */}
            <div className="p-4 border-b" style={{ borderColor: "var(--color-border)" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed size={16} className="text-text-secondary" />
                  <span className="text-sm font-semibold">Rest. La Perla • Mesa 5</span>
                </div>
                <span className="text-[11px] text-text-secondary">19:45</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold">AI</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">Hab. 301 — García, María</div>
                  <div className="text-[11px] text-amber-700">All Inclusive • Adultos: 2</div>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-success bg-success/10 rounded-full px-2 py-0.5">
                  <Check size={12} /> Elegible
                </span>
              </div>
            </div>

            {/* Order items */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {orderItems.map((item) => {
                  const isIncluded = item.ai === "included" && guestPlan === "AI";
                  return (
                    <div key={item.id} className={`flex items-center gap-3 p-3 rounded-lg border ${
                      isIncluded ? "bg-success/5 border-success/20" : "bg-white border-gray-200"
                    }`}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium truncate">{item.name}</span>
                          {isIncluded ? (
                            <span className="shrink-0 text-[9px] font-bold text-success bg-success/10 rounded px-1.5 py-0.5">AI</span>
                          ) : item.ai === "premium" ? (
                            <span className="shrink-0 text-[9px] font-bold text-warning bg-warning/10 rounded px-1.5 py-0.5">PREMIUM</span>
                          ) : null}
                        </div>
                        <div className="text-[11px] text-text-secondary mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
                          {isIncluded ? (
                            <span className="line-through text-text-secondary">${item.price}</span>
                          ) : (
                            <span>${item.price}</span>
                          )}
                          {isIncluded && <span className="text-success ml-1">Incluido</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateQty(item.id, -1)}
                          className="w-6 h-6 rounded-md border flex items-center justify-center hover:bg-hover"
                          style={{ borderColor: "var(--color-border)" }}>
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, 1)}
                          className="w-6 h-6 rounded-md border flex items-center justify-center hover:bg-hover"
                          style={{ borderColor: "var(--color-border)" }}>
                          <Plus size={12} />
                        </button>
                        <button onClick={() => removeItem(item.id)}
                          className="w-6 h-6 rounded-md flex items-center justify-center text-text-secondary hover:text-danger ml-1">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Totals */}
            <div className="border-t p-4" style={{ borderColor: "var(--color-border)" }}>
              <div className="space-y-1.5 text-sm mb-4">
                <div className="flex justify-between text-success">
                  <span>Consumo incluido (AI)</span>
                  <span style={{ fontFamily: "var(--font-mono)" }}>${includedTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Consumo extra</span>
                  <span style={{ fontFamily: "var(--font-mono)" }}>${extraTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-text-secondary text-xs">
                  <span>IVA (16%)</span>
                  <span style={{ fontFamily: "var(--font-mono)" }}>${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-text-secondary text-xs">
                  <span>Propina sugerida (15%)</span>
                  <span style={{ fontFamily: "var(--font-mono)" }}>${tip.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t"
                  style={{ borderColor: "var(--color-border)" }}>
                  <span>Cargo a habitación</span>
                  <span style={{ fontFamily: "var(--font-mono)" }}>${(extraTotal + tax + tip).toLocaleString()}</span>
                </div>
              </div>

              {/* Payment buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors">
                  <BedDouble size={16} /> Cargo a Hab.
                </button>
                <button className="flex items-center justify-center gap-2 py-3 border rounded-lg font-medium text-sm hover:bg-hover transition-colors"
                  style={{ borderColor: "var(--color-border)" }}>
                  <Banknote size={16} /> Efectivo
                </button>
                <button className="flex items-center justify-center gap-2 py-3 border rounded-lg font-medium text-sm hover:bg-hover transition-colors"
                  style={{ borderColor: "var(--color-border)" }}>
                  <CreditCard size={16} /> Tarjeta
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-success text-white rounded-lg font-medium text-sm hover:bg-success/90 transition-colors">
                  <Check size={16} /> AI Incluido
                </button>
              </div>
            </div>
          </div>

          {/* Right: Products */}
          <div className="flex-1 flex flex-col bg-bg">
            {/* Search + Categories */}
            <div className="p-4 bg-white border-b" style={{ borderColor: "var(--color-border)" }}>
              <div className="relative mb-3">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  className="w-full pl-10 pr-4 py-2.5 bg-hover rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {posProducts.categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeCategory === cat
                        ? "bg-primary text-white"
                        : "bg-hover text-text-secondary hover:text-text"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-3 gap-3">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addItem(product)}
                    className="bg-white rounded-xl border p-4 text-left hover:shadow-md hover:border-primary/30 transition-all active:scale-95"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium leading-tight">{product.name}</span>
                      {product.ai === "included" ? (
                        <span className="shrink-0 text-[9px] font-bold text-success bg-success/10 rounded px-1.5 py-0.5 ml-2">AI</span>
                      ) : product.ai === "premium" ? (
                        <span className="shrink-0 text-[9px] font-bold text-warning bg-warning/10 rounded px-1.5 py-0.5 ml-2">$$</span>
                      ) : (
                        <span className="shrink-0 text-[9px] font-bold text-danger bg-danger/10 rounded px-1.5 py-0.5 ml-2">N/A</span>
                      )}
                    </div>
                    <div className="text-lg font-bold" style={{ fontFamily: "var(--font-mono)" }}>
                      ${product.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
