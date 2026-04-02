import React, { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, ShieldCheck } from "lucide-react";
import { COUNTRIES, getAvailablePackages, getUnitPrice, formatMoney, calculateDays, INSURANCE_FEE_PER_DAY } from "@/lib/wifiPricing";

export default function RentalRow({ item, index, onChange, onRemove, canRemove }) {
  const days = calculateDays(item.fromDate, item.toDate);
  const unitPrice = getUnitPrice(item.country, item.pkg);
  const rentalFee = unitPrice * days;
  const insuranceFee = item.hasInsurance ? INSURANCE_FEE_PER_DAY * days : 0;
  const lineTotal = rentalFee + insuranceFee;

  const availablePackages = getAvailablePackages(item.country);

  useEffect(() => {
    onChange(index, { ...item, days, unitPrice, rentalFee, insuranceFee, lineTotal });
  }, [item.country, item.pkg, item.fromDate, item.toDate, item.hasInsurance]);

  const update = (field, value) => {
    if (field === "country") {
      onChange(index, { ...item, country: value, pkg: "", days: 0, unitPrice: 0, rentalFee: 0, insuranceFee: 0, lineTotal: 0 });
    } else {
      onChange(index, { ...item, [field]: value });
    }
  };

  return (
    <div className="bg-card rounded-xl border p-4 md:p-5 space-y-4 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
          #{index + 1}
        </span>
        {canRemove && (
          <Button variant="ghost" size="icon" onClick={() => onRemove(index)} className="text-muted-foreground hover:text-destructive">
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Quốc gia / Country</label>
          <Select value={item.country} onValueChange={(v) => update("country", v)}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Chọn quốc gia..." />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {COUNTRIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Gói cước / Package</label>
          <Select value={item.pkg} onValueChange={(v) => update("pkg", v)} disabled={!item.country}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Chọn gói..." />
            </SelectTrigger>
            <SelectContent>
              {availablePackages.map((p) => (
                <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Từ ngày / From</label>
          <Input type="date" value={item.fromDate} onChange={(e) => update("fromDate", e.target.value)} className="h-10" />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Đến ngày / To</label>
          <Input type="date" value={item.toDate} onChange={(e) => update("toDate", e.target.value)} className="h-10" />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t">
        <div className="flex items-center gap-2">
          <Checkbox
            id={`insurance-${index}`}
            checked={item.hasInsurance}
            onCheckedChange={(checked) => update("hasInsurance", !!checked)}
          />
          <label htmlFor={`insurance-${index}`} className="text-sm flex items-center gap-1.5 cursor-pointer">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Bảo hiểm / Insurance ({formatMoney(INSURANCE_FEE_PER_DAY)}/ngày)
          </label>
        </div>

        <div className="flex items-center gap-6 text-sm">
          {days > 0 && <span className="text-muted-foreground">{days} ngày</span>}
          {unitPrice > 0 && <span className="text-muted-foreground">{formatMoney(unitPrice)}/ngày</span>}
          <span className="font-bold text-primary text-base">{formatMoney(lineTotal)}</span>
        </div>
      </div>
    </div>
  );
}
