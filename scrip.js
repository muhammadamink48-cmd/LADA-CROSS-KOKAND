// ==========================================
// 1. UMUMIY SAHIFA FUNKSIYALARI (Qidiruv va Havolalar)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    // Yopish tugmasi
    const closeButton = document.querySelector(".lada-top-right button");
    if (closeButton) {
        closeButton.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }

    // Tashqi havolalarni yangi oynada ochish
    const externalLinks = document.querySelectorAll('.lada-top-center a');
    externalLinks.forEach(function (link) {
        const href = link.getAttribute('href');
        if (href && (href.startsWith('http') || href.startsWith('https'))) {
            link.setAttribute('target', '_blank');
        }
    });

    // Oldin saqlangan e'lonlarni chiqarish
    loadSavedAds();
});


// ==========================================
// 2. QIDIRUV Tizimi (Search)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const closeBtn = document.getElementById("close-btn");

    function performSearch() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const cards = document.querySelectorAll(
            ".lada-bottom-left, .lada-bottom-center, .lada-bottom-right, .lada-bottom-priora, .lada-bottom-granta, .l09, .dynamic-car-card"
        );

        cards.forEach(card => {
            const titleElement = card.querySelector("h2") || card.querySelector("h3");
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

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            alert("Do'kon hozirda yopiq yoki ish vaqti tugagan.");
        });
    }
});


// ==========================================
// 3. MAHSULOT SOTIB OLISH VA TELEGRAM BOT (Buyurtma Modal)
// ==========================================
const BOT_TOKEN = "8853754694:AAFA6rYGa4NHLDSXIwiDc4bP5LJQy6UVHnI"; 
const ADMIN_CHAT_ID = "8673898827"; 

let selectedProduct = "";
let currentStockElement = null;
let orderType = "pickup";

document.addEventListener("DOMContentLoaded", function () {
    const buyButtons = document.querySelectorAll(".buy-btn");
    
    buyButtons.forEach(btn => {
        btn.onclick = function (e) {
            e.preventDefault();
            const card = this.closest('.card');
            
            currentStockElement = card.querySelector('.count');
            let currentStock = currentStockElement ? parseInt(currentStockElement.textContent) : 0;

            if (currentStock <= 0) {
                alert("Kechirasiz, ushbu mahsulot tugagan!");
                return;
            }

            const titleElement = card.querySelector('h3');
            selectedProduct = titleElement ? titleElement.textContent : "Zapchast";

            const modalTitle = document.getElementById('modalTitle');
            if (modalTitle) modalTitle.textContent = selectedProduct + " - Buyurtma";
            
            const orderModal = document.getElementById('orderModal');
            if (orderModal) orderModal.style.display = 'flex';
        };
    });
});

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    if (modal) modal.style.display = 'none';
}

function selectType(type) {
    orderType = type;
    const pickupBtn = document.getElementById('btnPickup');
    const deliveryBtn = document.getElementById('btnDelivery');
    const deliveryFields = document.querySelectorAll('.delivery-only');

    if (!pickupBtn || !deliveryBtn) return;

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

    const nameInput = document.getElementById('custName');
    const phoneInput = document.getElementById('custPhone');
    
    const name = nameInput ? nameInput.value : "";
    const phone = phoneInput ? phoneInput.value : "";

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
        const surname = document.getElementById('custSurname')?.value || "";
        const email = document.getElementById('custEmail')?.value || "";
        const card = document.getElementById('custCard')?.value || "";
        const receiptFile = document.getElementById('custReceipt')?.files[0];

        const msg = `🚚 NEW ORDER (YETKAZIB BERISH)\nMahsulot: ${selectedProduct}\nIsm-Familiya: ${name} ${surname}\nEmail: ${email}\nTel: ${phone}\nKarta: ${card}`;
        
        if (receiptFile) {
            sendTelegramPhotoWithButton(receiptFile, msg);
        } else {
            sendTelegramMessage(msg);
        }

        alert("Buyurtmangiz qabul qilindi! Admin chekni va ma'lumotlarni tekshirib chiqadi.");
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
    }).catch(err => console.log("Xatolik:", err));
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
    }).catch(err => console.log("Xatolik:", err));
}


// ==========================================
// 4. MASHINA E'LONINI QO'YISH TIZIMI (Modal va LocalStorage)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const btnAd = document.querySelector(".btn-ad");
    if (btnAd) {
        btnAd.addEventListener("click", (e) => {
            e.preventDefault();
            
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
                                <input type="text" id="car-title" placeholder="Masalan: Lada Vesta Cross" required style="width:100%; padding:11px; border:1px solid #ddd; border-radius:8px; font-size:14px; outline:none;">
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

                            <button type="submit" style="width:100%; background:linear-gradient(135deg, #ff6b00, #ff8c00); color:#fff; border:none; padding:13px; font-weight:bold; border-radius:8px; cursor:pointer; font-size:16px; margin-top:5px; box-shadow:0 4px 10px rgba(255,107,0,0.3);">
                                🚀 Saytga E'lon Qo'shish
                            </button>
                        </form>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML("beforeend", modalHtml);

            document.getElementById("close-modal").onclick = () => {
                document.getElementById("car-ad-modal").remove();
            };

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

                        saveCarToStorage(carData);
                        appendCarCard(carData);

                        const messageText = `🚗 YANGI E'LON VA RASM/CHEK!\n\n` +
                                            `📌 Mashina: ${carData.title} (${carData.year})\n` +
                                            `💰 Narxi: ${carData.price}\n` +
                                            `📞 Tel: ${carData.phone}\n` +
                                            `📝 Ma'lumot: ${carData.desc}\n\n` +
                                            `To'lov: +998916957959 raqamiga 5000 so'm to'landi.`;

                        const telegramUrl = `https://t.me/muhammadamin_0330?text=${encodeURIComponent(messageText)}`;
                        
                        window.open(telegramUrl, '_blank');
                        document.getElementById("car-ad-modal").remove();
                        alert("E'loningiz muvaffaqiyatli saytga qo'shildi!");
                    };
                    reader.readAsDataURL(file);
                }
            };
        });
    }
});

// E'lon kartasini HTML ga chiroyli qilib qo'shish
function appendCarCard(car) {
    const marketSection = document.querySelector(".car-market");
    if (!marketSection) return;
    
    const cardHtml = `
        <div class="dynamic-car-card" style="background:white; border-radius:15px; overflow:hidden; box-shadow:0 6px 15px rgba(0,0,0,0.08); margin:20px 0; border:1px solid #eee; display:flex; flex-direction:column; max-width:100%;">
            ${car.image ? `<img src="${car.image}" style="width:100%; height:250px; object-fit:cover;" alt="Mashina rasmi">` : ''}
            <div style="padding:20px; text-align:left;">
                <h2 style="margin:0 0 10px 0; color:#222; font-size:20px;">${car.title} <span style="color:#777; font-size:16px;">(${car.year})</span></h2>
                <p style="color:#28a745; font-weight:bold; font-size:20px; margin:5px 0 12px 0;">${car.price}</p>
                <p style="color:#555; font-size:14px; line-height:1.5; margin-bottom:15px;">${car.desc}</p>
                <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #f0f0f0; padding-top:12px;">
                    <span style="font-size:14px; color:#666;">Aloqa:</span>
                    <a href="tel:${car.phone}" style="background:#28a745; color:white; padding:8px 15px; border-radius:6px; text-decoration:none; font-weight:bold; font-size:14px;">📞 ${car.phone}</a>
                </div>
            </div>
        </div>
    `;
    
    marketSection.insertAdjacentHTML("beforebegin", cardHtml);
}

// LocalStoragega saqlash
function saveCarToStorage(car) {
    let cars = JSON.parse(localStorage.getItem("userCars")) || [];
    cars.push(car);
    localStorage.setItem("userCars", JSON.stringify(cars));
}

// Saqlanganlarni o'qish
function loadSavedAds() {
    let cars = JSON.parse(localStorage.getItem("userCars")) || [];
    cars.forEach(car => {
        appendCarCard(car);
    });
}
// Lug'at bazasi (Har bir til uchun matnlar)
const translations = {
    uz: {
        searchPlaceholder: "Mashina yoki e'lonlarni qidirish...",
        searchBtn: "Qidirish",
        adBtn: "🚗 Mashina E'lonini Joylash",
        buyBtn: "Sotib olish",
        carTitlePlaceholder: "Masalan: Lada Vesta Cross",
        successAlert: "E'loningiz muvaffaqiyatli qo'shildi!"
    },
    ru: {
        searchPlaceholder: "Поиск машин или объявлений...",
        searchBtn: "Поиск",
        adBtn: "🚗 Подать объявление",
        buyBtn: "Купить",
        carTitlePlaceholder: "Например: Lada Vesta Cross",
        successAlert: "Ваше объявление успешно добавлено!"
    },
    en: {
        searchPlaceholder: "Search cars or ads...",
        searchBtn: "Search",
        adBtn: "🚗 Post Car Ad",
        buyBtn: "Buy",
        carTitlePlaceholder: "Example: Lada Vesta Cross",
        successAlert: "Your ad has been successfully added!"
    },
    tr: {
        searchPlaceholder: "Araba veya ilan ara...",
        searchBtn: "Ara",
        adBtn: "🚗 Araç İlanı Ver",
        buyBtn: "Satın Al",
        carTitlePlaceholder: "Örnek: Lada Vesta Cross",
        successAlert: "İlanınız başarıyla eklendi!"
    },
    ar: {
        searchPlaceholder: "البحث عن سيارات أو إعلانات...",
        searchBtn: "بحث",
        adBtn: "🚗 نشر إعلان سيارة",
        buyBtn: "شراء",
        carTitlePlaceholder: "مثال: لادا فيستا كروس",
        successAlert: "تم إضافة إعلانك بنجاح!"
    }
};

// Tilni o'zgartirish funksiyasi
function changeLanguage(lang) {
    // Tanlangan tilni xotirada saqlab qo'yamiz
    localStorage.setItem("selectedLang", lang);

    // Arab tili uchun sahifani o'ngdan chapga (RTL) o'zgartiramiz, qolganlariga chapdan o'ngga (LTR)
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }

    const t = translations[lang];
    if (!t) return;

    // Qidiruv input placeholderini o'zgartirish
    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.placeholder = t.searchPlaceholder;

    // Qidiruv tugmasini o'zgartirish
    const searchBtn = document.getElementById("search-btn");
    if (searchBtn) searchBtn.textContent = t.searchBtn;

    // E'lon berish tugmasini o'zgartirish
    const btnAd = document.querySelector(".btn-ad");
    if (btnAd) btnAd.textContent = t.adBtn;
}

// Sahifa yuklanganda oldin tanlangan tilni avtomatik yoqish
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("selectedLang") || "uz";
    changeLanguage(savedLang);
});
