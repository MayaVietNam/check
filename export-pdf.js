// export-pdf.js

async function exportToPDF() {
    // 1. Lấy thông tin khách hàng
    const companyName = document.getElementById('sender-company').value || ".......................................................";
    const customerName = document.getElementById('sender-name').value || ".......................................................";
    
    let rowsHtml = '';
    let totalSub = 0;
    let validCount = 0;
    
    // 2. Thu thập dữ liệu từ các đơn
    const requests = document.querySelectorAll('.rental-request');

    requests.forEach((req, index) => {
        const country = req.querySelector('.choices-country').value;
        const pkg = req.querySelector('.package-select').value;
        const days = parseInt(req.querySelector('.days-input').value) || 0;
        const hasInsurance = req.querySelector('.insurance-checkbox').checked;
        const fromDateStr = req.querySelector('.date-from').value;
        const toDateStr = req.querySelector('.date-to').value;
        
        // Bỏ qua nếu đơn chưa điền đủ
        if (!country || !pkg || days <= 0) return; 
        
        validCount++;
        
        // Tính toán giá
        let unitPrice = 0;
        if (typeof getPriceForUnit === 'function') {
            unitPrice = getPriceForUnit(UNIT_NAME, country, pkg);
        }
        
        const rentalFee = unitPrice * days;
        const insuranceFee = hasInsurance ? (INSURANCE_FEE_PER_DAY * days) : 0;
        const lineTotal = rentalFee + insuranceFee;
        totalSub += lineTotal;

        // Định dạng ngày
        const fd = new Date(fromDateStr).toLocaleDateString('vi-VN');
        const td = new Date(toDateStr).toLocaleDateString('vi-VN');
        
        rowsHtml += `
            <tr>
                <td style="border: 1px solid #333; padding: 10px; text-align: center;">${index + 1}</td>
                <td style="border: 1px solid #333; padding: 10px;">${country}</td>
                <td style="border: 1px solid #333; padding: 10px;">${pkg}</td>
                <td style="border: 1px solid #333; padding: 10px; text-align: center;">1</td>
                <td style="border: 1px solid #333; padding: 10px; text-align: center; font-size: 12px;">${fd}<br>~<br>${td}</td>
                <td style="border: 1px solid #333; padding: 10px; text-align: center;">${days}</td>
                <td style="border: 1px solid #333; padding: 10px; text-align: right;">${formatMoney(unitPrice)}</td>
                <td style="border: 1px solid #333; padding: 10px; text-align: right;">${formatMoney(insuranceFee)}<br><span style="font-style: italic; color: #555; font-size: 11px;">${hasInsurance ? 'Insurance' : ''}</span></td>
                <td style="border: 1px solid #333; padding: 10px; text-align: right; font-weight: bold; color: #1e3a8a;">${formatMoney(lineTotal)}</td>
            </tr>
        `;
    });

    if (validCount === 0) {
        alert(currentLang === 'vi' ? "Vui lòng chọn Quốc gia, Gói cước và Ngày sử dụng trước khi xuất báo giá!" : "Please fill in Country, Package, and Dates to export quote.");
        return;
    }

    const vat = totalSub * 0.1;
    const grandTotal = totalSub + vat;
    const dateNow = new Date();
    const dateStr = `${String(dateNow.getDate()).padStart(2, '0')}/${String(dateNow.getMonth() + 1).padStart(2, '0')}/${dateNow.getFullYear()}`;
    const quoteNo = `${String(dateNow.getDate()).padStart(2, '0')}${String(dateNow.getMonth() + 1).padStart(2, '0')}${dateNow.getFullYear()}/MV`;

    // 3. Tạo vùng chứa (Container) vững chắc trên giao diện (nhưng giấu đi)
    let container = document.getElementById('pdf-export-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'pdf-export-container';
        // Đẩy container này ra khỏi tầm nhìn màn hình
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.width = '800px'; 
        container.style.backgroundColor = '#ffffff';
        container.style.color = '#000000';
        document.body.appendChild(container);
    }

    // 4. Bơm giao diện HTML vào Container
    container.innerHTML = `
        <div style="font-family: 'Times New Roman', Times, serif; font-size: 15px; line-height: 1.5; padding: 30px; box-sizing: border-box;">
            <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #1e3a8a; padding-bottom: 20px; margin-bottom: 25px;">
                <div>
                    <h2 style="margin: 0 0 5px 0; font-size: 18px; color: #1e3a8a;">CÔNG TY TNHH MAYA VIETNAM</h2>
                    <h2 style="margin: 0 0 5px 0; font-size: 18px; color: #1e3a8a;">MAYA VIETNAM CO., LTD</h2>
                    <p style="margin: 2px 0;">Tầng 3, Tòa nhà ACM, 96 Cao Thắng, Phường Bàn Cờ, HCM</p>
                    <p style="margin: 2px 0;">3rd Floor, ACM Building, 96 Cao Thang, Ban Co Ward, HCM</p>
                    <p style="margin: 2px 0;">SĐT / TEL: 096 200 0650</p>
                </div>
                <div style="text-align: right;">
                    <h1 style="margin: 0 0 5px 0; font-size: 24px; color: #dc2626;">BÁO GIÁ THUÊ WIFI<br><span style="font-size: 18px;">WIFI RENTAL QUOTATION</span></h1>
                    <p style="margin: 5px 0 2px 0; font-style: italic;">Ngày/Date: ${dateStr}</p>
                    <p style="margin: 2px 0; font-style: italic;">Số/No.: ${quoteNo}</p>
                </div>
            </div>

            <div style="margin-bottom: 25px; font-size: 16px;">
                Kính gửi / Bill to: <strong style="font-size: 18px;">${companyName}</strong><br>
                Người liên hệ / Contact: <strong>${customerName}</strong>
            </div>

            <div style="margin-bottom: 25px; font-style: italic;">
                MAYA VIETNAM xin chân thành cảm ơn Quý khách hàng đã quan tâm đến sản phẩm và dịch vụ của công ty chúng tôi!<br>
                Chúng tôi xin gửi đến Quý khách bảng Báo giá với các thông tin chi tiết như sau:
                <span style="color: #555; display: block; margin-top: 4px;">MAYA VIETNAM would like to give a sincere thanks for your interest in our product and service!<br>We would like to send you the Quotation with the following details:</span>
            </div>

            <div style="font-weight: bold; font-size: 16px; margin: 20px 0 5px 0; text-decoration: underline;">1. Bảng giá dịch vụ cho thuê thiết bị wifi:</div>
            <div style="font-style: italic; color: #555; margin-bottom: 15px;">Price list for rental of wifi equipment:</div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px;">
                <thead>
                    <tr>
                        <th style="background-color: #f3f4f6; text-align: center; font-weight: bold; border: 1px solid #333; padding: 10px;" width="5%">STT</th>
                        <th style="background-color: #f3f4f6; text-align: center; font-weight: bold; border: 1px solid #333; padding: 10px;" width="15%">Quốc gia</th>
                        <th style="background-color: #f3f4f6; text-align: center; font-weight: bold; border: 1px solid #333; padding: 10px;" width="15%">Gói cước</th>
                        <th style="background-color: #f3f4f6; text-align: center; font-weight: bold; border: 1px solid #333; padding: 10px;" width="5%">SL</th>
                        <th style="background-color: #f3f4f6; text-align: center; font-weight: bold; border: 1px solid #333; padding: 10px;" width="15%">Thời gian</th>
                        <th style="background-color: #f3f4f6; text-align: center; font-weight: bold; border: 1px solid #333; padding: 10px;" width="5%">Ngày</th>
                        <th style="background-color: #f3f4f6; text-align: center; font-weight: bold; border: 1px solid #333; padding: 10px;" width="15%">Đơn giá</th>
                        <th style="background-color: #f3f4f6; text-align: center; font-weight: bold; border: 1px solid #333; padding: 10px;" width="10%">Phí khác</th>
                        <th style="background-color: #f3f4f6; text-align: center; font-weight: bold; border: 1px solid #333; padding: 10px;" width="15%">Thành tiền</th>
                    </tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
            </table>

            <table style="width: 50%; float: right; margin-bottom: 40px; border: none; font-size: 15px;">
                <tr><td style="text-align: right; font-weight: bold; padding: 6px;">Cộng tiền / Subtotal:</td><td style="text-align: right; padding: 6px;">${formatMoney(totalSub)}</td></tr>
                <tr><td style="text-align: right; font-weight: bold; padding: 6px;">VAT (10%):</td><td style="text-align: right; padding: 6px;">${formatMoney(vat)}</td></tr>
                <tr><td style="text-align: right; font-weight: bold; color: #dc2626; padding: 6px; border-top: 2px solid #333;">TỔNG (ĐÃ GỒM THUẾ)<br><span style="font-style: italic; color: #dc2626; font-size: 13px;">TOTAL (INC. TAX)</span></td><td style="text-align: right; font-weight: bold; color: #dc2626; font-size: 18px; padding: 6px; border-top: 2px solid #333;">${formatMoney(grandTotal)}</td></tr>
            </table>
            <div style="clear: both;"></div>

            <div style="margin-top: 20px;">
                <strong>Lưu ý / Note:</strong>
                <ul style="padding-left: 20px; margin: 5px 0 20px 0;">
                    <li style="margin-bottom: 8px;">Thời gian thuê không tính ngày Giao và Trả thiết bị.</li>
                    <li style="margin-bottom: 8px;">Phí giao nhận thiết bị phụ thuộc vào biểu phí của của đơn vị vận chuyển.</li>
                    <li style="margin-bottom: 8px;">Trường hợp sử dụng thiết bị wifi tại nhiều quốc gia trong 1 ngày, phí sử dụng tính theo quốc gia có phí cao nhất.</li>
                </ul>
            </div>

            <div style="font-weight: bold; font-size: 16px; margin: 20px 0 10px 0; text-decoration: underline;">2. Thanh toán / Payment method:</div>
            <table style="width: 80%; border: none; margin-bottom: 30px;">
                <tr><td style="padding: 5px; font-weight: bold;" width="40%">Người thụ hưởng:</td><td style="padding: 5px;">CONG TY TNHH MAYA VIETNAM</td></tr>
                <tr><td style="padding: 5px; font-weight: bold;">Số tài khoản:</td><td style="padding: 5px;">0071001226890</td></tr>
                <tr><td style="padding: 5px; font-weight: bold;">Ngân hàng:</td><td style="padding: 5px;">Ngân hàng Ngoại thương Việt Nam (Vietcombank)</td></tr>
                <tr><td style="padding: 5px; font-weight: bold;">Chi nhánh:</td><td style="padding: 5px;">Chi nhánh thành phố Hồ Chí Minh</td></tr>
            </table>

            <div style="text-align: center; margin-top: 40px; font-style: italic; font-weight: bold; font-size: 16px;">
                Xin chân thành cảm ơn Quý khách hàng đã tin tưởng sử dụng dịch vụ của chúng tôi!
            </div>
            
            <div style="display: flex; justify-content: flex-end; margin-top: 50px; text-align: center;">
                <div style="width: 250px;">
                    <p style="font-weight: bold; margin: 0; font-size: 16px;">Người lập</p>
                    <p style="font-style: italic; color: #555; font-size: 13px; margin: 2px 0 0 0;">Prepared by</p>
                    <div style="height: 100px;"></div>
                    <p style="font-weight: bold; margin: 0; font-size: 16px;">ĐỒNG QUANG HUY</p>
                </div>
            </div>
        </div>
    `;

    document.getElementById('loadingOverlay').classList.add('active');

    // 5. Đợi 500ms để trình duyệt thực sự vẽ HTML ra DOM rồi mới tiến hành "chụp ảnh"
    setTimeout(() => {
        const opt = {
            margin:       [10, 10, 15, 10], 
            filename:     `Bao_Gia_WIFI_${companyName.replace(/[^a-z0-9]/gi, '_')}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, logging: true }, // scale: 2 giúp chữ nét
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(container).save().then(() => {
            document.getElementById('loadingOverlay').classList.remove('active');
            // Dọn dẹp DOM
            document.body.removeChild(container);
        }).catch(err => {
            console.error(err);
            document.getElementById('loadingOverlay').classList.remove('active');
            alert("Có lỗi xảy ra khi tạo PDF!");
        });
    }, 500); 
}
