import React from "react";
import { formatMoney } from "@/lib/wifiPricing";
import { Separator } from "@/components/ui/separator";

export default function PriceSummary({ subtotal, vat, grandTotal }) {
  return (
    <div className="bg-card rounded-xl border p-6 max-w-sm ml-auto">
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Cộng tiền / Subtotal</span>
          <span className="font-medium">{formatMoney(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">VAT (10%)</span>
          <span className="font-medium">{formatMoney(vat)}</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <div>
            <span className="font-bold text-accent">TỔNG CỘNG</span>
            <span className="block text-xs text-muted-foreground italic">Total (inc. tax)</span>
          </div>
          <span className="text-xl font-bold text-accent">{formatMoney(grandTotal)}</span>
        </div>
      </div>
    </div>
  );
}
