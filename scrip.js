document.addEventListener("DOMContentLoaded", function () {
    // 1. Closed tugmasi
    const closeButton = document.querySelector(".lada-top-right button");
    if (closeButton) {
        closeButton.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }

    // 2. Telegram va Telefon havolalarini yangi oynada to'g'ri ochish
    const externalLinks = document.querySelectorAll('.lada-top-center a');
    externalLinks.forEach(function (link) {
        const href = link.getAttribute('href');
        if (href && (href.startsWith('http') || href.startsWith('https'))) {
            link.setAttribute('target', '_blank');
        }
    });
});
<script>
    const BOT_TOKEN = "8853754694:AAFA6rYGa4NHLDSXIwiDc4bP5LJQy6UVHnI"; 
    const ADMIN_CHAT_ID = "8673898827"; 

    let selectedProduct = "";
    let currentStockElement = null;
    let orderType = "pickup";

    // Sayt yuklanganda barcha "Sotib olish" tugmalariga modalni ulash
    document.addEventListener("DOMContentLoaded", function () {
        const buyButtons = document.querySelectorAll(".buy-btn");
        
        buyButtons.forEach(btn => {
            btn.onclick = function (e) {
                e.preventDefault();
                const card = this.closest('.card');
                
                // Soni yozilgan tegni topish
                currentStockElement = card.querySelector('.count');
                let currentStock = currentStockElement ? parseInt(currentStockElement.textContent) : 0;

                if (currentStock <= 0) {
                    alert("Kechirasiz, ushbu mahsulot tugagan!");
                    return;
                }

                // Mahsulot nomini olish
                const titleElement = card.querySelector('h3');
                selectedProduct = titleElement ? titleElement.textContent : "Zapchast";

                document.getElementById('modalTitle').textContent = selectedProduct + " - Buyurtma";
                document.getElementById('orderModal').style.display = 'flex';
            };
        });
    });

    function closeOrderModal() {
        document.getElementById('orderModal').style.display = 'none';
    }

    function selectType(type) {
        orderType = type;
        const pickupBtn = document.getElementById('btnPickup');
        const deliveryBtn = document.getElementById('btnDelivery');
        const deliveryFields = document.querySelectorAll('.delivery-only');

        if (type === 'pickup') {
            pickupBtn.style.background = '#007bff';
            pickupBtn.style.color = '#fff';
            deliveryBtn.style.background = '#fff';
            deliveryBtn.style.color = '#007bff';
            deliveryFields.forEach(el => el.style.display = 'none');
        } else {
            deliveryBtn.style.background = '#007bff';
            deliveryBtn.style.color = '#fff';
            pickupBtn.style.background = '#fff';
            pickupBtn.style.color = '#007bff';
            deliveryFields.forEach(el => el.style.display = 'block');
        }
    }

    async function handleOrderSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('custName').value;
        const phone = document.getElementById('custPhone').value;

        // Ombordagi sonini 1 ga kamaytirish
        if (currentStockElement) {
            let currentStock = parseInt(currentStockElement.textContent);
            if (currentStock > 0) {
                currentStockElement.textContent = currentStock - 1;
            }
        }

        if (orderType === 'pickup') {
            const msg = `📦 NEW ORDER (O'ZIM OLIB KETAMAN)\nMahsulot: ${selectedProduct}\nIsm: ${name}\nTel: ${phone}`;
            sendTelegramMessage(msg);

            alert("Tasdiqlandi! Buyurtma 1 kun turadi va bekor bo'ladi.");
            closeOrderModal();
        } else {
            const surname = document.getElementById('custSurname').value;
            const email = document.getElementById('custEmail').value;
            const card = document.getElementById('custCard').value;
            const receiptFile = document.getElementById('custReceipt').files[0];

            const msg = `🚚 NEW ORDER (YETKAZIB BERISH)\nMahsulot: ${selectedProduct}\nIsm-Familiya: ${name} ${surname}\nEmail: ${email}\nTel: ${phone}\nKarta: ${card}`;
            
            if (receiptFile) {
                sendTelegramPhotoWithButton(receiptFile, msg);
            } else {
                sendTelegramMessage(msg);
            }

            alert("Buyurtmangiz qabul qilindi! Admin chekni va ma'lumotlarni tekshirib, telefoningizga tasdiqlash kodini yuboradi.");
            closeOrderModal();
        }
    }

    function sendTelegramMessage(text) {
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: ADMIN_CHAT_ID,
                text: text
            })
        });
    }

    function sendTelegramPhotoWithButton(file, captionText) {
        const formData = new FormData();
        formData.append('chat_id', ADMIN_CHAT_ID);
        formData.append('photo', file);
        formData.append('caption', captionText);
        
        const keyboard = {
            inline_keyboard: [[
                { text: "✅ Tasdiqlash (Kod Yuborish)", callback_data: "send_code" }
            ]]
        };
        formData.append('reply_markup', JSON.stringify(keyboard));

        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
            method: 'POST',
            body: formData
        });
    }
</script>
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const closeBtn = document.getElementById("close-btn");

    // Qidiruv funksiyasi
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        // Qidiriladigan barcha mashina kartochkalari
        const cards = document.querySelectorAll(
            ".lada-bottom-left, .lada-bottom-center, .lada-bottom-right, .lada-bottom-priora, .lada-bottom-granta, .l09"
        );

        cards.forEach(card => {
            const title = card.querySelector("h2").textContent.toLowerCase();
            const text = card.querySelector("p").textContent.toLowerCase();

            // Agar qidiruv so'zi sarlavha yoki matnda bo'lsa ko'rsatiladi, aks holda yashiriladi
            if (title.includes(query) || text.includes(query)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Qidiruv tugmasi bosilganda
    searchBtn.addEventListener("click", performSearch);

    // Klaviaturada Enter bosilganda qidirish
    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            performSearch();
        }
    });

    // Yozish davomida avtomoyik filtrlash
    searchInput.addEventListener("input", performSearch);

    // "Closed" tugmasi bosilganda xabar chiqarish
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            alert("Do'kon hozirda yopiq yoki ish vaqti tugagan.");
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const closeBtn = document.getElementById("close-btn");

    // ------------------- QIDIRUV FUNTSIYASI -------------------
    function performSearch() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const cards = document.querySelectorAll(
            ".lada-bottom-left, .lada-bottom-center, .lada-bottom-right, .lada-bottom-priora, .lada-bottom-granta, .l09"
        );

        cards.forEach(card => {
            const title = card.querySelector("h2").textContent.toLowerCase();
            const text = card.querySelector("p").textContent.toLowerCase();

            if (title.includes(query) || text.includes(query)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }

    if (searchBtn) searchBtn.addEventListener("click", performSearch);
    if (searchInput) {
        searchInput.addEventListener("keyup", (e) => {
            if (e.key === "Enter") performSearch();
        });
        searchInput.addEventListener("input", performSearch);
    }

    // ------------------- MASHINA BOZORI E'LON QO'YISH OYNASI -------------------
    const btnAd = document.querySelector(".btn-ad");
    if (btnAd) {
        btnAd.addEventListener("click", (e) => {
            e.preventDefault();
            
            // To'lov ko'rsatmalari va chek yuklash oynasi
            const modalHtml = `
                <div id="payment-modal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); display:flex; align-items:center; justify-content:center; z-index:9999;">
                    <div style="background:#fff; padding:25px; border-radius:12px; max-width:450px; width:90%; text-align:center; position:relative;">
                        <span id="close-modal" style="position:absolute; right:15px; top:10px; cursor:pointer; font-size:20px; font-weight:bold;">&times;</span>
                        <h3 style="color:#ff6b00; margin-bottom:15px;">🚗 Mashina e'lonini joylashtirish</h3>
                        <p style="font-size:14px; color:#555; margin-bottom:10px;">E'loningiz sayt va Telegram botda 30 kun davomida ko'rsatiladi.</p>
                        
                        <div style="background:#fff8f2; border:1px dashed #ff6b00; padding:12px; border-radius:8px; margin-bottom:15px;">
                            <p style="margin:0; font-size:13px; color:#333;"><strong>1-QADAM:</strong> Click / Payme / Uzcard orqali <strong>5 000 so'm</strong> to'lov qiling:</p>
                            <h2 style="color:#28a745; margin:8px 0;">+998 91 695 79 59</h2>
                        </div>

                        <div style="text-align:left; margin-bottom:15px;">
                            <label style="font-size:13px; font-weight:bold; display:block; margin-bottom:5px;">2-QADAM: To'lov chekini yuklang (Rasm/PDF):</label>
                            <input type="file" id="receipt-file" accept="image/*,.pdf" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px;">
                        </div>

                        <button id="send-receipt-btn" style="width:100%; background:#28a745; color:#fff; border:none; padding:12px; border-radius:6px; font-weight:bold; cursor:pointer;">Chekni Adminga Yuborish</button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML("beforeend", modalHtml);

            document.getElementById("close-modal").onclick = () => {
                document.getElementById("payment-modal").remove();
            };

            document.getElementById("send-receipt-btn").onclick = () => {
                const fileInput = document.getElementById("receipt-file");
                if (!fileInput.files.length) {
                    alert("Iltimos, avval to'lov chekini yuklang!");
                    return;
                }
                alert("Chekingiz admin (@muhammadaminga0330) ga yuborildi. Admin to'lovni tasdiqlaganidan so'ng, mashina ma'lumotlarini kiritish oynasi ochiladi!");
                document.getElementById("payment-modal").remove();
            };
        });
    }
});

// ------------------- ADMIN TASDIQLAGANDAN SO'NG E'LON BERISH (OQ VARAQ FORMASI) -------------------
// Bu funksiya admin "Tasdiqlash" tugmasini bosganida foydalanuvchi ekranida ochiladi:
function openCarAdForm() {
    const formHtml = `
        <div id="ad-form-modal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); display:flex; align-items:center; justify-content:center; z-index:10000; overflow-y:auto; padding:20px;">
            <div style="background:#ffffff; padding:30px; border-radius:15px; max-width:600px; width:100%; box-shadow: 0 10px 30px rgba(0,0,0,0.3); border:2px solid #28a745;">
                
                <div style="text-align:center; border-bottom:2px solid #f0f0f0; padding-bottom:15px; margin-bottom:20px;">
                    <h2 style="color:#28a745; margin:0;">✅ To'lov Tasdiqlandi!</h2>
                    <p style="color:#666; font-size:14px; margin-top:5px;">Mashinangiz reklama ma'lumotlarini quyidagi oq varaqqa to'liq kiriting:</p>
                </div>

                <form id="car-details-form" onsubmit="submitCarAd(event)">
                    <!-- Mashina Sarlavhasi / Modeli -->
                    <div style="margin-bottom:15px;">
                        <label style="display:block; font-weight:bold; margin-bottom:5px;">🚗 Mashina nomi va rusumi:</label>
                        <input type="text" placeholder="Masalan: Lada Vesta Cross 2022" required style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px;">
                    </div>

                    <!-- Telefon raqami -->
                    <div style="margin-bottom:15px;">
                        <label style="display:block; font-weight:bold; margin-bottom:5px;">📞 Aloqa uchun telefon raqamingiz:</label>
                        <input type="tel" value="+998" placeholder="+998901234567" required style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px;">
                    </div>

                    <!-- Rasmlar va Videolar -->
                    <div style="margin-bottom:15px;">
                        <label style="display:block; font-weight:bold; margin-bottom:5px;">🖼 Mashina Rasmlari yoki Videosi:</label>
                        <input type="file" accept="image/*,video/*" multiple style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px;">
                    </div>

                    <!-- Ovozli Xabar (Golos) -->
                    <div style="margin-bottom:15px;">
                        <label style="display:block; font-weight:bold; margin-bottom:5px;">🎙 Ovozli xabar (Golos audio fayl) yuklash:</label>
                        <input type="file" accept="audio/*" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:6px;">
                    </div>

                    <!-- Qo'shimcha Matn va Izoh -->
                    <div style="margin-bottom:20px;">
                        <label style="display:block; font-weight:bold; margin-bottom:5px;">📝 Mashina haqida to'liq ma'lumot va narxi:</label>
                        <textarea rows="4" placeholder="Yurgani, holati, kraskasi, narxi va qo'shimcha qulayliklari haqida yozing..." required style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px; resize:vertical;"></textarea>
                    </div>

                    <!-- Yuborish Tugmasi -->
                    <button type="submit" style="width:100%; background:#ff6b00; color:#fff; border:none; padding:14px; font-size:16px; font-weight:bold; border-radius:8px; cursor:pointer; transition:0.3s;">
                        🚀 Reklamani E'longa Joylashtirish
                    </button>
                </form>

            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", formHtml);
}

function submitCarAd(e) {
    e.preventDefault();
    alert("Tabriklaymiz! Mashina e'loningiz muvaffaqiyatli qabul qilindi va sayt hamda Telegram botda e'lon qilindi!");
    document.getElementById("ad-form-modal").remove();
}
