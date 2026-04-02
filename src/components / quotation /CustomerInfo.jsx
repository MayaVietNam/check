import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, User } from "lucide-react";

export default function CustomerInfo({ companyName, setCompanyName, customerName, setCustomerName }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Building2 className="w-4 h-4 text-primary" />
          Công ty / Company
        </Label>
        <Input
          placeholder="Nhập tên công ty..."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="h-11"
        />
      </div>
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <User className="w-4 h-4 text-primary" />
          Người liên hệ / Contact
        </Label>
        <Input
          placeholder="Nhập tên người liên hệ..."
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="h-11"
        />
      </div>
    </div>
  );
}
