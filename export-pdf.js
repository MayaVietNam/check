async function exportToPDF() {
    const companyName = document.getElementById('sender-company').value || ".......................................................";
    const customerName = document.getElementById('sender-name').value || ".......................................................";

    let rowsHtml = '';
    let totalSub = 0;
    let validCount = 0;

    const requests = document.querySelectorAll('.rental-request');
    requests.forEach((req, index) => {
        const country = req.querySelector('.choices-country').value;
        const pkg = req.querySelector('.package-select').value;
        const days = parseInt(req.querySelector('.days-input').value) || 0;
        const hasInsurance = req.querySelector('.insurance-checkbox').checked;
        const fromDateStr = req.querySelector('.date-from').value;
        const toDateStr = req.querySelector('.date-to').value;

        if (!country || !pkg || days <= 0) return;
        validCount++;

        let unitPrice = 0;
        if (typeof getPriceForUnit === 'function') {
            unitPrice = getPriceForUnit(UNIT_NAME, country, pkg);
        }

        const rentalFee = unitPrice * days;
        const insuranceFee = hasInsurance ? (INSURANCE_FEE_PER_DAY * days) : 0;
        const lineTotal = rentalFee + insuranceFee;
        totalSub += lineTotal;

        const fd = new Date(fromDateStr).toLocaleDateString('vi-VN');
        const td = new Date(toDateStr).toLocaleDateString('vi-VN');

        rowsHtml += `
            <tr>
                <td style="border: 1px solid #333; padding: 8px; text-align: center;">${index + 1}</td>
                <td style="border: 1px solid #333; padding: 8px;">${country}</td>
                <td style="border: 1px solid #333; padding: 8px;">${pkg}</td>
                <td style="border: 1px solid #333; padding: 8px; text-align: center;">1</td>
                <td style="border: 1px solid #333; padding: 8px; text-align: center; font-size: 11px;">${fd} - ${td}</td>
                <td style="border: 1px solid #333; padding: 8px; text-align: center;">${days}</td>
                <td style="border: 1px solid #333; padding: 8px; text-align: right;">${formatMoney(unitPrice)}</td>
                <td style="border: 1px solid #333; padding: 8px; text-align: right;">${formatMoney(insuranceFee)}</td>
                <td style="border: 1px solid #333; padding: 8px; text-align: right; font-weight: bold; color: #1e3a8a;">${formatMoney(lineTotal)}</td>
            </tr>
        `;
    });

    if (validCount === 0) {
        alert(currentLang === 'vi' ? "Vui lòng chọn Quốc gia, Gói cước và Ngày sử dụng!" : "Please fill in Country, Package, and Dates!");
        return;
    }

    const vat = totalSub * 0.1;
    const grandTotal = totalSub + vat;
    const dateNow = new Date();
    const dateStr = `${String(dateNow.getDate()).padStart(2, '0')}/${String(dateNow.getMonth() + 1).padStart(2, '0')}/${dateNow.getFullYear()}`;
    const quoteNo = `${String(dateNow.getDate()).padStart(2, '0')}${String(dateNow.getMonth() + 1).padStart(2, '0')}${dateNow.getFullYear()}/MV`;

    // TRUYỀN THẲNG CHUỖI HTML VÀ DÙNG TABLE DÀN TRANG (100% KHÔNG BỊ CẮT CHỮ)
    const htmlString = `
        <div style="font-family: 'Times New Roman', Times, serif; font-size: 14px; color: #333; width: 750px; padding: 20px; background: white;">
            <table style="width: 100%; border-bottom: 2px solid #1e3a8a; margin-bottom: 20px; padding-bottom: 10px;">
                <tr>
                    <td style="vertical-align: top;">
                        <h2 style="margin: 0 0 5px 0; font-size: 18px; color: #1e3a8a;">CÔNG TY TNHH MAYA VIETNAM</h2>
                        <h2 style="margin: 0 0 5px 0; font-size: 18px; color: #1e3a8a;">MAYA VIETNAM CO., LTD</h2>
                        <p style="margin: 2px 0; font-size: 13px;">Tầng 3, Tòa nhà ACM, 96 Cao Thắng, Phường Bàn Cờ, HCM</p>
                        <p style="margin: 2px 0; font-size: 13px;">SĐT / TEL: 096 200 0650</p>
                    </td>
                    <td style="vertical-align: top; text-align: right;">
                        <h1 style="margin: 0 0 5px 0; font-size: 22px; color: #dc2626;">BÁO GIÁ THUÊ WIFI</h1>
                        <p style="margin: 2px 0; font-style: italic; font-size: 13px;">Ngày/Date: ${dateStr}</p>
                        <p style="margin: 2px 0; font-style: italic; font-size: 13px;">Số/No.: ${quoteNo}</p>
                    </td>
                </tr>
            </table>

            <div style="margin-bottom: 15px; font-size: 15px;">
                Kính gửi / Bill to: <strong style="font-size: 16px;">${companyName}</strong><br>
                Người liên hệ / Contact: <strong>${customerName}</strong>
            </div>

            <div style="margin-bottom: 20px; font-style: italic;">
                MAYA VIETNAM xin chân thành cảm ơn Quý khách hàng đã quan tâm đến sản phẩm và dịch vụ của công ty chúng tôi!<br>
                Chúng tôi xin gửi đến Quý khách bảng Báo giá với các thông tin chi tiết như sau:
            </div>

            <div style="font-weight: bold; font-size: 15px; margin: 15px 0 5px 0; text-decoration: underline;">1. Bảng giá dịch vụ cho thuê thiết bị wifi:</div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
                <thead>
                    <tr>
                        <th style="background-color: #f3f4f6; text-align: center; border: 1px solid #333; padding: 8px;">STT</th>
                        <th style="background-color: #f3f4f6; text-align: center; border: 1px solid #333; padding: 8px;">Quốc gia</th>
                        <th style="background-color: #f3f4f6; text-align: center; border: 1px solid #333; padding: 8px;">Gói cước</th>
                        <th style="background-color: #f3f4f6; text-align: center; border: 1px solid #333; padding: 8px;">SL</th>
                        <th style="background-color: #f3f4f6; text-align: center; border: 1px solid #333; padding: 8px;">Thời gian</th>
                        <th style="background-color: #f3f4f6; text-align: center; border: 1px solid #333; padding: 8px;">Ngày</th>
                        <th style="background-color: #f3f4f6; text-align: center; border: 1px solid #333; padding: 8px;">Đơn giá</th>
                        <th style="background-color: #f3f4f6; text-align: center; border: 1px solid #333; padding: 8px;">Bảo hiểm</th>
                        <th style="background-color: #f3f4f6; text-align: center; border: 1px solid #333; padding: 8px;">Thành tiền</th>
                    </tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
            </table>

            <table style="width: 50%; float: right; margin-bottom: 30px; border: none; font-size: 14px;">
                <tr><td style="text-align: right; font-weight: bold; padding: 4px;">Cộng tiền:</td><td style="text-align: right; padding: 4px;">${formatMoney(totalSub)}</td></tr>
                <tr><td style="text-align: right; font-weight: bold; padding: 4px;">VAT (10%):</td><td style="text-align: right; padding: 4px;">${formatMoney(vat)}</td></tr>
                <tr><td style="text-align: right; font-weight: bold; color: #dc2626; padding: 4px; border-top: 2px solid #333;">TỔNG THANH TOÁN:</td><td style="text-align: right; font-weight: bold; color: #dc2626; font-size: 16px; padding: 4px; border-top: 2px solid #333;">${formatMoney(grandTotal)}</td></tr>
            </table>
            <div style="clear: both;"></div>

            <div style="margin-top: 10px;">
                <strong>Lưu ý / Note:</strong>
                <ul style="padding-left: 20px; margin: 5px 0 15px 0; font-size: 13px;">
                    <li>Thời gian thuê không tính ngày Giao và Trả thiết bị.</li>
                    <li>Phí giao nhận thiết bị phụ thuộc vào biểu phí của của đơn vị vận chuyển.</li>
                </ul>
            </div>

            <div style="font-weight: bold; font-size: 15px; margin: 15px 0 5px 0; text-decoration: underline;">2. Thanh toán / Payment method:</div>
            <table style="width: 80%; border: none; margin-bottom: 20px; font-size: 13px;">
                <tr><td style="padding: 3px; font-weight: bold;" width="30%">Người thụ hưởng:</td><td style="padding: 3px;">CONG TY TNHH MAYA VIETNAM</td></tr>
                <tr><td style="padding: 3px; font-weight: bold;">Số tài khoản:</td><td style="padding: 3px;">0071001226890</td></tr>
                <tr><td style="padding: 3px; font-weight: bold;">Ngân hàng:</td><td style="padding: 3px;">Vietcombank - Chi nhánh HCM</td></tr>
            </table>
            
            <table style="width: 100%; margin-top: 30px;">
                <tr>
                    <td style="width: 60%;"></td>
                    <td style="width: 40%; text-align: center;">
                        <p style="font-weight: bold; margin: 0; font-size: 15px;">Người lập</p>
                        <p style="font-style: italic; color: #555; font-size: 12px; margin: 0;">Prepared by</p>
                        <div style="height: 70px;"></div>
                        <p style="font-weight: bold; margin: 0; font-size: 15px;">ĐỒNG QUANG HUY</p>
                    </td>
                </tr>
            </table>
        </div>
    `;

    document.getElementById('loadingOverlay').classList.add('active');

    try {
        const opt = {
            margin:       10, 
            filename:     `Bao_Gia_WIFI_${companyName.replace(/[^a-z0-9]/gi, '_')}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(htmlString).save().then(() => {
            document.getElementById('loadingOverlay').classList.remove('active');
        }).catch(err => {
            document.getElementById('loadingOverlay').classList.remove('active');
            alert("Lỗi xuất PDF: " + err.message);
        });
    } catch(error) {
        document.getElementById('loadingOverlay').classList.remove('active');
        alert("Lỗi xử lý PDF: " + error.message);
    }
}
