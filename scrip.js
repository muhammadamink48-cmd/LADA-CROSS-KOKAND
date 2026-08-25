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
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const closeBtn = document.getElementById("close-btn");

    // Sahifa ochilganda oldin saqlangan e'lonlarni chiqarish
    loadSavedAds();

    // ------------------- QIDIRUV FUNKSIYASI -------------------
    function performSearch() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const cards = document.querySelectorAll(
            ".lada-bottom-left, .lada-bottom-center, .lada-bottom-right, .lada-bottom-priora, .lada-bottom-granta, .l09, .dynamic-car-card"
        );

        cards.forEach(card => {
            const titleElement = card.querySelector("h2");
            const textElement = card.querySelector("p");
            
            const title = titleElement ? titleElement.textContent.toLowerCase() : "";
            const text = textElement ? textElement.textContent.toLowerCase() : "";

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

    // ------------------- MASHINA E'LONINI QO'YISH FORMASI -------------------
    const btnAd = document.querySelector(".btn-ad");
    if (btnAd) {
        btnAd.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Premium va chiroyli Modal Dizayni
            const modalHtml = `
                <div id="car-ad-modal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.75); backdrop-filter: blur(5px); display:flex; align-items:center; justify-content:center; z-index:9999; overflow-y:auto; padding:20px;">
                    <div style="background:#ffffff; padding:35px; border-radius:20px; max-width:550px; width:100%; box-shadow:0 15px 35px rgba(0,0,0,0.3); position:relative; max-height:90vh; overflow-y:auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                        
                        <span id="close-modal" style="position:absolute; right:22px; top:18px; cursor:pointer; font-size:26px; font-weight:bold; color:#aaa; transition:0.2s;">&times;</span>
                        
                        <div style="text-align:center; margin-bottom:20px;">
                            <h2 style="color:#ff6b00; margin:0 0 5px 0; font-size:24px;">🚗 Mashina E'lonini Joylash</h2>
                            <p style="font-size:13px; color:#555; background:#fff8f3; padding:10px; border-radius:8px; border:1px dashed #ffb380; margin:10px 0 0 0;">
                                To'lov narxi: <b>5 000 so'm</b><br>Karta raqami: <span style="color:#d9534f; font-weight:bold; font-size:15px;">+998916957959</span>
                            </p>
                        </div>

                        <form id="car-form" style="display:flex; flex-direction:column; gap:14px; text-align:left;">
                            
                            <div>
                                <label style="font-size:13px; font-weight:600; display:block; margin-bottom:5px; color:#333;">Mashina nomi va rusumi:</label>
                                <input type="text" id="car-title" placeholder="Masalan: Lada Vesta Cross" required style="width:100%; padding:11px; border:1px solid #ddd; border-radius:8px; font-size:14px; outline:none; transition:0.3s;">
                            </div>

                            <div style="display:flex; gap:12px;">
                               <div style="flex:1;">
                                    <label style="font-size:13px; font-weight:600; display:block; margin-bottom:5px; color:#333;">Yili:</label>
                                    <input type="text" id="car-year" placeholder="2022 yil" required style="width:100%; padding:11px; border:1px solid #ddd; border-radius:8px; font-size:14px; outline:none;">
                                </div>
                                <div style="flex:1;">
                                    <label style="font-size:13px; font-weight:600; display:block; margin-bottom:5px; color:#333;">Narxi:</label>
                                    <input type="text" id="car-price" placeholder="12 000 $" required style="width:100%; padding:11px; border:1px solid #ddd; border-radius:8px; font-size:14px; outline:none;">
                                </div>
                            </div>

                            <div>
                                <label style="font-size:13px; font-weight:600; display:block; margin-bottom:5px; color:#333;">Telefon raqamingiz:</label>
                                <input type="tel" id="car-phone" value="+998" required style="width:100%; padding:11px; border:1px solid #ddd; border-radius:8px; font-size:14px; outline:none;">
                            </div>

                            <div>
                                <label style="font-size:13px; font-weight:600; display:block; margin-bottom:5px; color:#333;">Mashina haqida ma'lumot:</label>
                                <textarea id="car-desc" rows="3" placeholder="Holati, kraskasi, yurgani..." required style="width:100%; padding:11px; border:1px solid #ddd; border-radius:8px; font-size:14px; outline:none; resize:vertical;"></textarea>
                            </div>

                            <div>
                                <label style="font-size:13px; font-weight:600; display:block; margin-bottom:5px; color:#333;">Mashina rasmi yoki To'lov cheki:</label>
                                <input type="file" id="car-image" accept="image/*" required style="width:100%; padding:8px; border:1px dashed #ccc; border-radius:8px; background:#fafafa; font-size:13px; cursor:pointer;">
                            </div>

                            <button type="submit" style="width:100%; background:linear-gradient(135deg, #ff6b00, #ff8c00); color:#fff; border:none; padding:13px; font-weight:bold; border-radius:8px; cursor:pointer; font-size:16px; margin-top:5px; box-shadow:0 4px 10px rgba(255,107,0,0.3); transition:0.3s;">
                                🚀 Pryamoy Saytga Qo'shish
                            </button>
                        </form>

                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML("beforeend", modalHtml);

            document.getElementById("close-modal").onclick = () => {
                document.getElementById("car-ad-modal").remove();
            };

            // Form yuborilganda ishlash jarayoni
            document.getElementById("car-form").onsubmit = (event) => {
                event.preventDefault();

                const imageInput = document.getElementById("car-image");
                const file = imageInput.files[0];

                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const imageUrl = e.target.result;

                        const carData = {
                            title: document.getElementById("car-title").value,
                            year: document.getElementById("car-year").value,
                            price: document.getElementById("car-price").value,
                            phone: document.getElementById("car-phone").value,
                            desc: document.getElementById("car-desc").value,
                            image: imageUrl
                        };

                        // 1. Saytga chiqarish va xotiraga saqlash
                        saveCarToStorage(carData);
                        appendCarCard(carData);

                        // 2. Telegram orqali adminga xabar yuborish uchun tayyorlash
                        const messageText = `🚗 YANGI E'LON VA RASM/CHEK!\n\n` +
                                            `📌 Mashina: ${carData.title} (${carData.year})\n` +
                                            `💰 Narxi: ${carData.price}\n` +
                                            `📞 Tel: ${carData.phone}\n` +
                                            `📝 Ma'lumot: ${carData.desc}\n\n` +
                                            `To'lov: +998916957959 raqamiga 5000 so'm to'landi.`;

                        const telegramUrl = `https://t.me/muhammadamin_0330?text=${encodeURIComponent(messageText)}`;
                        
                        window.open(telegramUrl, '_blank');
                        document.getElementById("car-ad-modal").remove();
                        alert("E'loningiz muvaffaqiyatli saytga qo'shildi! Shuningdek, ma'lumotlarni tasdiqlash uchun Telegram ochildi.");
                    };
                    reader.readAsDataURL(file);
                }
            };
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            alert("Do'kon hozirda yopiq.");
        });
    }
});

// Chiroyli e'lon kartasini HTML ga qo'shish funksiyasi
function appendCarCard(car) {
    const marketSection = document.querySelector(".car-market");
    if (!marketSection) return;
    
    const cardHtml = `
        <div class="dynamic-car-card" style="background:white; border-radius:15px; overflow:hidden; box-shadow:0 6px 15px rgba(0,0,0,0.08); margin:20px 0; border:1px solid #eee; display:flex; flex-direction:column; max-width:100%; transition: 0.3s;">
            ${car.image ? `<img src="${car.image}" style="width:100%; height:250px; object-fit:cover;" alt="Mashina rasmi">` : ''}
            <div style="padding:20px; text-align:left;">
                <h2 style="margin:0 0 10px 0; color:#222; font-size:20px;">${car.title} <span style="color:#777; font-size:16px;">(${car.year})</span></h2>
                <p style="color:#28a745; font-weight:bold; font-size:20px; margin:5px 0 12px 0;">${car.price}</p>
                <p style="color:#555; font-size:14px; line-height:1.5; margin-bottom:15px;">${car.desc}</p>
                <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #f0f0f0; pt-10; padding-top:12px;">
                    <span style="font-size:14px; color:#666;">Aloqa:</span>
                    <a href="tel:${car.phone}" style="background:#28a745; color:white; padding:8px 15px; border-radius:6px; text-decoration:none; font-weight:bold; font-size:14px; box-shadow:0 3px 6px rgba(40,167,69,0.3);">📞 ${car.phone}</a>
                </div>
            </div>
        </div>
    `;
    
    marketSection.insertAdjacentHTML("beforebegin", cardHtml);
}

// Brauzer xotirasiga (LocalStorage) saqlash
function saveCarToStorage(car) {
    let cars = JSON.parse(localStorage.getItem("userCars")) || [];
    cars.push(car);
    localStorage.setItem("userCars", JSON.stringify(cars));
}

// Saqlangan e'lonlarni o'qib chiqarish
function loadSavedAds() {
    let cars = JSON.parse(localStorage.getItem("userCars")) || [];
    cars.forEach(car => {
        appendCarCard(car);
    });
}
