const PRICE_TABLE = {
  "Australia": { "1GB/ngày": 157500, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Fiji": { "1GB/ngày": 210000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 294000 },
  "Guam + Saipan": { "1GB/ngày": 210000, "5GB/ngày": 283500, "10GB/tháng": null, "20GB/tháng": null },
  "New Zealand": { "1GB/ngày": 210000, "5GB/ngày": 283500, "10GB/tháng": null, "20GB/tháng": null },
  "Ấn Độ": { "1GB/ngày": 136500, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 199500 },
  "Indonesia": { "1GB/ngày": 126000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 157500 },
  "Nhật Bản": { "1GB/ngày": null, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 80000 },
  "Malaysia": { "1GB/ngày": 105000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 136500 },
  "Philippines": { "1GB/ngày": 126000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 157500 },
  "Singapore": { "1GB/ngày": 105000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 126000 },
  "Đài Loan": { "1GB/ngày": null, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 105000 },
  "Thái Lan": { "1GB/ngày": 105000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 126000 },
  "Việt Nam": { "1GB/ngày": null, "5GB/ngày": null, "10GB/tháng": 600000, "20GB/tháng": null },
  "Cambodia": { "1GB/ngày": 105000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 136500 },
  "Trung Quốc (Không có VPN)": { "1GB/ngày": 105000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 126000 },
  "Trung Quốc (Cài đặt sẵn VPN)": { "1GB/ngày": 157500, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 294000 },
  "Hong Kong": { "1GB/ngày": 126000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 157500 },
  "Israel": { "1GB/ngày": 136500, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 199500 },
  "Hàn Quốc": { "1GB/ngày": null, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 105000 },
  "Lào": { "1GB/ngày": 136500, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 199500 },
  "Ma Cao": { "1GB/ngày": 136500, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 199500 },
  "Maldives": { "1GB/ngày": null, "5GB/ngày": 283500, "10GB/tháng": null, "20GB/tháng": null },
  "Sri Lanka": { "1GB/ngày": 136500, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 199500 },
  "Mông Cổ": { "1GB/ngày": 210000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 273000 },
  "Nepal": { "1GB/ngày": 136500, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 199500 },
  "Bangladesh": { "1GB/ngày": 210000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 273000 },
  "Bahrain": { "1GB/ngày": 210000, "5GB/ngày": 315000, "10GB/tháng": null, "20GB/tháng": null },
  "Brunei": { "1GB/ngày": 210000, "5GB/ngày": 315000, "10GB/tháng": null, "20GB/tháng": null },
  "Jordan": { "1GB/ngày": 136500, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 199500 },
  "Cô-oét": { "1GB/ngày": 241500, "5GB/ngày": 315000, "10GB/tháng": null, "20GB/tháng": null },
  "Kazakhstan": { "1GB/ngày": 105000, "5GB/ngày": 189000, "10GB/tháng": null, "20GB/tháng": null },
  "Oman": { "1GB/ngày": 241500, "5GB/ngày": 336000, "10GB/tháng": null, "20GB/tháng": null },
  "Pakistan": { "1GB/ngày": 105000, "5GB/ngày": 189000, "10GB/tháng": null, "20GB/tháng": null },
  "Qatar": { "1GB/ngày": 210000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 273000 },
  "Ả Rập Saudi": { "1GB/ngày": 136500, "5GB/ngày": 231000, "10GB/tháng": null, "20GB/tháng": null },
  "Tajikistan": { "1GB/ngày": 241500, "5GB/ngày": 346500, "10GB/tháng": null, "20GB/tháng": null },
  "UAE": { "1GB/ngày": 241500, "5GB/ngày": 336000, "10GB/tháng": null, "20GB/tháng": null },
  "Nga": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Thổ Nhĩ Kì": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Albania": { "1GB/ngày": 231000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 315000 },
  "Áo": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Quần đảo Aland": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Bosnia và Herzegovina": { "1GB/ngày": 168000, "5GB/ngày": 273000, "10GB/tháng": null, "20GB/tháng": null },
  "Bỉ": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Bulgaria": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Thụy Sĩ": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Đảo Síp": { "1GB/ngày": 168000, "5GB/ngày": 220500, "10GB/tháng": null, "20GB/tháng": null },
  "Cộng hòa Séc": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Đức": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Đan Mạch": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Estonia": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Tây Ban Nha": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Phần Lan": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Pháp": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Vương quốc Anh": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Đảo Guernsey": { "1GB/ngày": 168000, "5GB/ngày": 220500, "10GB/tháng": null, "20GB/tháng": null },
  "Gibraltar": { "1GB/ngày": 168000, "5GB/ngày": 220500, "10GB/tháng": null, "20GB/tháng": null },
  "Hy Lạp": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Croatia": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Hungary": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Ai-len": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Đảo Man": { "1GB/ngày": 168000, "5GB/ngày": 220500, "10GB/tháng": null, "20GB/tháng": null },
  "Iceland": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Ý": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Đảo Jersey": { "1GB/ngày": 168000, "5GB/ngày": 220500, "10GB/tháng": null, "20GB/tháng": null },
  "Liechtenstein": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Litva": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Luxembourg": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 315000 },
  "Latvia": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Monaco": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Montenegro": { "1GB/ngày": 168000, "5GB/ngày": 220500, "10GB/tháng": null, "20GB/tháng": null },
  "Cộng hòa Macedonia": { "1GB/ngày": 168000, "5GB/ngày": 220500, "10GB/tháng": null, "20GB/tháng": null },
  "Cộng hòa Malta": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Hà Lan": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Na Uy": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Ba Lan": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Bồ Đào Nha": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Rumani": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Serbia": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Thụy Điển": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Slovenia": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Slovakia": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "San Marino": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Ukraine": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Vatican": { "1GB/ngày": 168000, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Mỹ": { "1GB/ngày": 157500, "5GB/ngày": null, "10GB/tháng": null, "20GB/tháng": 210000 },
  "Mexico": { "1GB/ngày": 189000, "5GB/ngày": 262500, "10GB/tháng": null, "20GB/tháng": null },
  "Canada": { "1GB/ngày": 189000, "5GB/ngày": 262500, "10GB/tháng": null, "20GB/tháng": null },
  "Antigua và Barbuda": { "1GB/ngày": 294000, "5GB/ngày": 472500, "10GB/tháng": null, "20GB/tháng": null },
  "Anguilla": { "1GB/ngày": 367500, "5GB/ngày": 577500, "10GB/tháng": null, "20GB/tháng": null },
  "Aruba": { "1GB/ngày": 294000, "5GB/ngày": 472500, "10GB/tháng": null, "20GB/tháng": null },
  "Đảo Curacao": { "1GB/ngày": 294000, "5GB/ngày": 472500, "10GB/tháng": null, "20GB/tháng": null },
  "Grenada": { "1GB/ngày": 294000, "5GB/ngày": 472500, "10GB/tháng": null, "20GB/tháng": null },
  "Guadeloupe": { "1GB/ngày": 189000, "5GB/ngày": 262500, "10GB/tháng": null, "20GB/tháng": null },
  "Haiti": { "1GB/ngày": 294000, "5GB/ngày": 472500, "10GB/tháng": null, "20GB/tháng": null },
  "Jamaica": { "1GB/ngày": 294000, "5GB/ngày": 472500, "10GB/tháng": null, "20GB/tháng": null },
  "Quần đảo Cayman": { "1GB/ngày": 294000, "5GB/ngày": 472500, "10GB/tháng": null, "20GB/tháng": null },
  "Đảo Saint Martin": { "1GB/ngày": 189000, "5GB/ngày": 262500, "10GB/tháng": null, "20GB/tháng": null },
  "Martinique": { "1GB/ngày": 315000, "5GB/ngày": 388500, "10GB/tháng": null, "20GB/tháng": null },
  "Puerto Rico": { "1GB/ngày": 189000, "5GB/ngày": 262500, "10GB/tháng": null, "20GB/tháng": null },
  "Quần đảo Turks và Caicos": { "1GB/ngày": 294000, "5GB/ngày": 472500, "10GB/tháng": null, "20GB/tháng": null },
  "Cộng hòa Trinidad và Tobago": { "1GB/ngày": 294000, "5GB/ngày": 472500, "10GB/tháng": null, "20GB/tháng": null },
  "Saint Vincent và Grenadines": { "1GB/ngày": 367500, "5GB/ngày": 577500, "10GB/tháng": null, "20GB/tháng": null },
  "Quần đảo Virgin thuộc Anh": { "1GB/ngày": 367500, "5GB/ngày": 577500, "10GB/tháng": null, "20GB/tháng": null },
  "Nam Phi": { "1GB/ngày": 210000, "5GB/ngày": 262500, "10GB/tháng": null, "20GB/tháng": null },
  "Ai Cập": { "1GB/ngày": 189000, "5GB/ngày": 231000, "10GB/tháng": null, "20GB/tháng": null },
  "Angola": { "1GB/ngày": 367500, "5GB/ngày": 577500, "10GB/tháng": null, "20GB/tháng": null },
  "Algeria": { "1GB/ngày": 252000, "5GB/ngày": 315000, "10GB/tháng": null, "20GB/tháng": null },
  "Tây Sahara": { "1GB/ngày": 189000, "5GB/ngày": 231000, "10GB/tháng": null, "20GB/tháng": null },
  "Ghana": { "1GB/ngày": 252000, "5GB/ngày": 315000, "10GB/tháng": null, "20GB/tháng": null },
  "Kenya": { "1GB/ngày": 189000, "5GB/ngày": 231000, "10GB/tháng": null, "20GB/tháng": null },
  "Ma-rốc": { "1GB/ngày": 189000, "5GB/ngày": 231000, "10GB/tháng": null, "20GB/tháng": null },
  "Madagascar": { "1GB/ngày": 210000, "5GB/ngày": 262500, "10GB/tháng": null, "20GB/tháng": null },
  "Mô-ri-xơ (Mauritius)": { "1GB/ngày": 252000, "5GB/ngày": 315000, "10GB/tháng": null, "20GB/tháng": null },
  "Nigeria": { "1GB/ngày": 252000, "5GB/ngày": 315000, "10GB/tháng": null, "20GB/tháng": null },
  "Tunisia": { "1GB/ngày": 252000, "5GB/ngày": 315000, "10GB/tháng": null, "20GB/tháng": null },
  "Tanzania": { "1GB/ngày": 294000, "5GB/ngày": 441000, "10GB/tháng": null, "20GB/tháng": null },
  "Zambia": { "1GB/ngày": 252000, "5GB/ngày": 315000, "10GB/tháng": null, "20GB/tháng": null },
  "Argentina": { "1GB/ngày": 189000, "5GB/ngày": 252000, "10GB/tháng": null, "20GB/tháng": null },
  "Bolivia": { "1GB/ngày": 231000, "5GB/ngày": 315000, "10GB/tháng": null, "20GB/tháng": null },
  "Brazil": { "1GB/ngày": 189000, "5GB/ngày": 252000, "10GB/tháng": null, "20GB/tháng": null },
  "Chile": { "1GB/ngày": 189000, "5GB/ngày": 252000, "10GB/tháng": null, "20GB/tháng": null },
  "Colombia": { "1GB/ngày": 189000, "5GB/ngày": 252000, "10GB/tháng": null, "20GB/tháng": null },
  "Costa Rica": { "1GB/ngày": 189000, "5GB/ngày": 252000, "10GB/tháng": null, "20GB/tháng": null },
  "Cộng hòa Dominica": { "1GB/ngày": 189000, "5GB/ngày": 252000, "10GB/tháng": null, "20GB/tháng": null },
  "Ecuador": { "1GB/ngày": 189000, "5GB/ngày": 252000, "10GB/tháng": null, "20GB/tháng": null },
  "Guatemala": { "1GB/ngày": 189000, "5GB/ngày": 252000, "10GB/tháng": null, "20GB/tháng": null },
  "Guyana": { "1GB/ngày": 189000, "5GB/ngày": 252000, "10GB/tháng": null, "20GB/tháng": null },
  "Nicaragua": { "1GB/ngày": 189000, "5GB/ngày": 252000, "10GB/tháng": null, "20GB/tháng": null },
  "Panama": { "1GB/ngày": 189000, "5GB/ngày": 252000, "10GB/tháng": null, "20GB/tháng": null },
  "Peru": { "1GB/ngày": 189000, "5GB/ngày": 252000, "10GB/tháng": null, "20GB/tháng": null },
  "Suriname": { "1GB/ngày": 315000, "5GB/ngày": 525000, "10GB/tháng": null, "20GB/tháng": null },
  "El Salvador": { "1GB/ngày": 189000, "5GB/ngày": 252000, "10GB/tháng": null, "20GB/tháng": null },
  "Uruguay": { "1GB/ngày": 189000, "5GB/ngày": 252000, "10GB/tháng": null, "20GB/tháng": null },
  "Venezuela": { "1GB/ngày": 189000, "5GB/ngày": 252000, "10GB/tháng": null, "20GB/tháng": null }
}
