import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, FileDown, Wifi, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import CustomerInfo from "@/components/quotation/CustomerInfo";
import RentalRow from "@/components/quotation/RentalRow";
import PriceSummary from "@/components/quotation/PriceSummary";
import { exportQuotationPDF } from "@/lib/exportPdf";

const emptyItem = () => ({
  country: "",
  pkg: "",
  fromDate: "",
  toDate: "",
  hasInsurance: false,
  days: 0,
  unitPrice: 0,
  rentalFee: 0,
  insuranceFee: 0,
  lineTotal: 0,
});

export default function Quotation() {
  const [companyName, setCompanyName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([emptyItem()]);
  const [isExporting, setIsExporting] = useState(false);

  const handleItemChange = useCallback((index, updatedItem) => {
    setItems((prev) => prev.map((item, i) => (i === index ? updatedItem : item)));
  }, []);

  const addRow = () => setItems((prev) => [...prev, emptyItem()]);

  const removeRow = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.lineTotal || 0), 0);
  const vat = subtotal * 0.1;
  const grandTotal = subtotal + vat;

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportQuotationPDF({ companyName, customerName, items });
      toast.success("Xuất PDF thành công!");
    } catch (err) {
      toast.error(err.message || "Có lỗi xảy ra khi tạo PDF");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Wifi className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">MAYA VIETNAM</h1>
              <p className="text-xs text-muted-foreground">Báo giá thuê WiFi / WiFi Rental Quotation</p>
            </div>
          </div>
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileDown className="w-4 h-4" />
            )}
            {isExporting ? "Đang xuất..." : "Xuất PDF"}
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Customer Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="overflow-hidden">
            <div className="bg-primary/5 px-6 py-3 border-b">
              <h2 className="text-sm font-semibold text-primary">Thông tin khách hàng / Customer Information</h2>
            </div>
            <CardContent className="p-6">
              <CustomerInfo
                companyName={companyName}
                setCompanyName={setCompanyName}
                customerName={customerName}
                setCustomerName={setCustomerName}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Rental Requests */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-primary">Chi tiết đơn thuê / Rental Details</h2>
            <Button variant="outline" size="sm" onClick={addRow} className="gap-1.5">
              <Plus className="w-4 h-4" />
              Thêm đơn
            </Button>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <RentalRow
                    item={item}
                    index={index}
                    onChange={handleItemChange}
                    onRemove={removeRow}
                    canRemove={items.length > 1}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Price Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <PriceSummary subtotal={subtotal} vat={vat} grandTotal={grandTotal} />
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs text-muted-foreground bg-muted/50 rounded-xl p-4 space-y-1"
        >
          <p className="font-medium">Lưu ý / Note:</p>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>Thời gian thuê không tính ngày Giao và Trả thiết bị.</li>
            <li>Phí giao nhận thiết bị phụ thuộc vào biểu phí của đơn vị vận chuyển.</li>
            <li>Trường hợp sử dụng thiết bị wifi tại nhiều quốc gia trong 1 ngày, phí sử dụng tính theo quốc gia có phí cao nhất.</li>
          </ul>
        </motion.div>
      </main>
    </div>
  );
}
