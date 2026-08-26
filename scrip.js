// ==========================================
// 1. KENGAYTIRILGAN LUG'AT BAZASI (Kril, Lotin, Rus, Ingliz, Turk, Arab)
// ==========================================
const translations = {
    uz_lat: {
        title: "Lada Cross Zapchast & Mashina Bozori",
        logo: "🚗 AvtoMarket",
        lada_cross_title: "LADA Cross",
        search_placeholder: "Ehtiyot qismlarni yoki mashinalarni qidirish...",
        search_btn: "Qidirish",
        loc_shop: "Manzilni ko'rish",
        mgr_call: "Menejerga qo'ng'iroq",
        tg_chan: "Telegram kanal",
        mgr_tg: "Menejer Telegram",
        closed_btn: "Yopish / Holati",
        vesta_title: "Lada Vesta Cross",
        vesta_desc: "Lada Vesta ehtiyot qismlari uchun tugmani bosing",
        vesta_btn: "LADA Vesta zapchastlariga kirish",
        xray_title: "Lada X-RAY Cross",
        xray_desc: "Lada X-RAY ehtiyot qismlari uchun tugmani bosing",
        xray_btn: "LADA X-RAY zapchastlariga kirish",
        largus_title: "Lada Largus Cross",
        largus_desc: "Lada Largus ehtiyot qismlari uchun tugmani bosing",
        largus_btn: "LADA Largus zapchastlariga kirish",
        priora_title: "Lada Priora Cross",
        priora_desc: "Lada Priora ehtiyot qismlari uchun tugmani bosing",
        priora_btn: "LADA Priora zapchastlariga kirish",
        granta_title: "Lada Granta Cross",
        granta_desc: "Lada Granta ehtiyot qismlari uchun tugmani bosing",
        granta_btn: "LADA Granta zapchastlariga kirish",
        l09_title: "Lada 2109",
        l09_desc: "Lada 2109 ehtiyot qismlari uchun tugmani bosing",
        l09_btn: "LADA 2109 zapchastlariga kirish",
        market_main_title: "🚗 LADA va turli xil mashinalar bozori",
        market_main_desc: "O'z mashinangizni veb-sayt va Telegram botimizda reklama qiling!",
        price_title: "E'lon joylashtirish narxi",
        payment_text: "To'lovni ushbu raqamga amalga oshiring:",
        btn_goto_market: "🚗 Mashina Bozoriga O'tish",
        btn_admin_ad: "Mashina e'lonini joylash",
        btn_view_cars: "Mavjud mashinalarni ko'rish",
        carModalTitle: "🚗 Mashina E'lonini Joylash",
        carNameLabel: "Mashina nomi va rusumi:",
        carYearLabel: "Yili:",
        carPriceLabel: "Narxi:",
        carDescLabel: "Mashina haqida ma'lumot:",
        carImageLabel: "Mashina rasmi:",
        checkImageLabel: "To'lov cheki rasmi:",
        carSubmitBtn: "🚀 Saytga E'lon Qo'shish",
        successAlert: "E'loningiz muvaffaqiyatli qo'shildi!"
    },
    uz_kir: {
        title: "Лада Кросс Запчаст & Машина Бозори",
        logo: "🚗 АвтоМаркет",
        lada_cross_title: "ЛАДА Кросс",
        search_placeholder: "Эҳтиёт қисмларни ёки машиналарни қидириш...",
        search_btn: "Қидириш",
        loc_shop: "Манзилни кўриш",
        mgr_call: "Менежэрга қўнғироқ",
        tg_chan: "Телеграм канал",
        mgr_tg: "Менежер Телеграм",
        closed_btn: "Ёпиқ",
        vesta_title: "Лада Веста Кросс",
        vesta_desc: "Лада Веста эҳтиёт қисмлари учун тугмани босинг",
        vesta_btn: "ЛАДА Веста запчастларига кириш",
        xray_title: "Лада X-RAY Кросс",
        xray_desc: "Лада X-RAY эҳтиёт қисмлари учун тугмани босинг",
        xray_btn: "ЛАДА X-RAY запчастларига кириш",
        largus_title: "Лада Ларгус Кросс",
        largus_desc: "Лада Ларгус эҳтиёт қисмлари учун тугмани босинг",
        largus_btn: "ЛАДА Ларгус запчастларига кириш",
        priora_title: "Лада Приора Кросс",
        priora_desc: "Лада Приора эҳтиёт қисмлари учун тугмани босинг",
        priora_btn: "ЛАДА Приора запчастларига кириш",
        granta_title: "Лада Гранта Кросс",
        granta_desc: "Лада Гранта эҳтиёт қисмлари учун тугмани босинг",
        granta_btn: "ЛАДА Гранта запчастларига кириш",
        l09_title: "Лада 2109",
        l09_desc: "Лада 2109 эҳтиёт қисмлари учун тугмани босинг",
        l09_btn: "ЛАДА 2109 запчастларига кириш",
        market_main_title: "🚗 ЛАДА ва турли хил машиналар бозори",
        market_main_desc: "Ўз машинангизни веб-сайт ва Телеграм ботимизда реклама қилинг!",
        price_title: "Эълон жойлаштириш нархи",
        payment_text: "Тўловни ушбу рақамга амалга оширинг:",
        btn_goto_market: "🚗 Машина Бозорига Ўтиш",
        btn_admin_ad: "Машина эълонини жойлаш",
        btn_view_cars: "Мавжуд машиналарни кўриш",
        carModalTitle: "🚗 Машина Эълонини Жойлаш",
        carNameLabel: "Машина номи ва русуми:",
        carYearLabel: "Йили:",
        carPriceLabel: "Нархи:",
        carDescLabel: "Машина ҳақида маълумот:",
        carImageLabel: "Машина расми:",
        checkImageLabel: "Тўлов чеки расми:",
        carSubmitBtn: "🚀 Сайтга Эълон Қўшиш",
        successAlert: "Эълонингиз муваффақиятли қўшилди!"
    },
    ru: {
        title: "Lada Cross Запчасти и Авторынок",
        logo: "🚗 АвтоМаркет",
        lada_cross_title: "LADA Cross",
        search_placeholder: "Поиск запчастей или машин...",
        search_btn: "Поиск",
        loc_shop: "Адрес магазина",
        mgr_call: "Звонок менеджеру",
        tg_chan: "Телеграм канал",
        mgr_tg: "Менеджер Телеграм",
        closed_btn: "Закрыто",
        vesta_title: "Lada Vesta Cross",
        vesta_desc: "Нажмите кнопку для запчастей Lada Vesta",
        vesta_btn: "Войти в запчасти LADA Vesta",
        xray_title: "Lada X-RAY Cross",
        xray_desc: "Нажмите кнопку для запчастей Lada X-RAY",
        xray_btn: "Войти в запчасти LADA X-RAY",
        largus_title: "Lada Largus Cross",
        largus_desc: "Нажмите кнопку для запчастей Lada Largus",
        largus_btn: "Войти в запчасти LADA Largus",
        priora_title: "Lada Priora Cross",
        priora_desc: "Нажмите кнопку для запчастей Lada Priora",
        priora_btn: "Войти в запчасти LADA Priora",
        granta_title: "Lada Granta Cross",
        granta_desc: "Нажмите кнопку для запчастей Lada Granta",
        granta_btn: "Войти в запчасти LADA Granta",
        l09_title: "Lada 2109",
        l09_desc: "Нажмите кнопку для запчастей Lada 2109",
        l09_btn: "Войти в запчасти LADA 2109",
        market_main_title: "🚗 Авторынок LADA и различных автомобилей",
        market_main_desc: "Рекламируйте свой автомобиль на нашем сайте и в Telegram боте!",
        price_title: "Стоимость размещения объявления",
        payment_text: "Оплатите на этот номер:",
        btn_goto_market: "🚗 Перейти на авторынок",
        btn_admin_ad: "Разместить объявление",
        btn_view_cars: "Посмотреть авто",
        carModalTitle: "🚗 Подать объявление о машине",
        carNameLabel: "Марка и модель машины:",
        carYearLabel: "Год:",
        carPriceLabel: "Цена:",
        carDescLabel: "Информация о машине:",
        carImageLabel: "Фото машины:",
        checkImageLabel: "Чек об оплате:",
        carSubmitBtn: "🚀 Добавить на сайт",
        successAlert: "Ваше объявление успешно добавлено!"
    },
    en: {
        title: "Lada Cross Parts & Car Market",
        logo: "🚗 AutoMarket",
        lada_cross_title: "LADA Cross",
        search_placeholder: "Search spare parts or cars...",
        search_btn: "Search",
        loc_shop: "Store location",
        mgr_call: "Manager call",
        tg_chan: "Telegram channel",
        mgr_tg: "Manager Telegram",
        closed_btn: "Closed",
        vesta_title: "Lada Vesta Cross",
        vesta_desc: "Click the button for Lada Vesta parts",
        vesta_btn: "Enter LADA Vesta parts",
        xray_title: "Lada X-RAY Cross",
        xray_desc: "Click the button for Lada X-RAY parts",
        xray_btn: "Enter LADA X-RAY parts",
        largus_title: "Lada Largus Cross",
        largus_desc: "Click the button for Lada Largus parts",
        largus_btn: "Enter LADA Largus parts",
        priora_title: "Lada Priora Cross",
        priora_desc: "Click the button for Lada Priora parts",
        priora_btn: "Enter LADA Priora parts",
        granta_title: "Lada Granta Cross",
        granta_desc: "Click the button for Lada Granta parts",
        granta_btn: "Enter LADA Granta parts",
        l09_title: "Lada 2109",
        l09_desc: "Click the button for Lada 2109 parts",
        l09_btn: "Enter LADA 2109 parts",
        market_main_title: "🚗 LADA and Various Car Market",
        market_main_desc: "Advertise your car on our website and Telegram bot!",
        price_title: "Ad posting price",
        payment_text: "Make payment to this number:",
        btn_goto_market: "🚗 Go to Car Market",
        btn_admin_ad: "Post car ad",
        btn_view_cars: "View available cars",
        carModalTitle: "🚗 Post Car Advertisement",
        carNameLabel: "Car Model & Name:",
        carYearLabel: "Year:",
        carPriceLabel: "Price:",
        carDescLabel: "Car Information:",
        carImageLabel: "Car photo:",
        checkImageLabel: "Payment receipt:",
        carSubmitBtn: "🚀 Add to Website",
        successAlert: "Your ad has been successfully added!"
    },
    tr: {
        title: "Lada Cross Yedek Parça & Araç Pazarı",
        logo: "🚗 OtoMarket",
        lada_cross_title: "LADA Cross",
        search_placeholder: "Yedek parça veya araba ara...",
        search_btn: "Ara",
        loc_shop: "Mağaza konumu",
        mgr_call: "Yöneticiyi ara",
        tg_chan: "Telegram kanalı",
        mgr_tg: "Yönetici Telegram",
        closed_btn: "Kapalı",
        vesta_title: "Lada Vesta Cross",
        vesta_desc: "Lada Vesta parçaları için düğmeye tıklayın",
        vesta_btn: "LADA Vesta parçalarına git",
        xray_title: "Lada X-RAY Cross",
        xray_desc: "Lada X-RAY parçaları için düğmeye tıklayın",
        xray_btn: "LADA X-RAY parçalarına git",
        largus_title: "Lada Largus Cross",
        largus_desc: "Lada Largus parçaları için düğmeye tıklayın",
        largus_btn: "LADA Largus parçalarına git",
        priora_title: "Lada Priora Cross",
        priora_desc: "Lada Priora parçaları için düğmeye tıklayın",
        priora_btn: "LADA Priora parçalarına git",
        granta_title: "Lada Granta Cross",
        granta_desc: "Lada Granta parçaları için düğmeye tıklayın",
        granta_btn: "LADA Granta parçalarına git",
        l09_title: "Lada 2109",
        l09_desc: "Lada 2109 parçaları için düğmeye tıklayın",
        l09_btn: "LADA 2109 parçalarına git",
        market_main_title: "🚗 LADA ve Çeşitli Araç Pazarı",
        market_main_desc: "Aracınızı web sitemizde ve Telegram botumuzda tanıtın!",
        price_title: "İlan verme ücreti",
        payment_text: "Ödemeyi bu numaraya yapın:",
        btn_goto_market: "🚗 Araç Pazarına Git",
        btn_admin_ad: "Araç İlanı Ver",
        btn_view_cars: "Mevcut araçları gör",
        carModalTitle: "🚗 Araç İlanı Ver",
        carNameLabel: "Araç Adı ve Modeli:",
        carYearLabel: "Yıl:",
        carPriceLabel: "Fiyat:",
        carDescLabel: "Araç Hakkında Bilgi:",
        carImageLabel: "Araç Fotoğrafı:",
        checkImageLabel: "Ödeme Dekontu:",
        carSubmitBtn: "🚀 Siteye İlan Ekle",
        successAlert: "İlanınız başarıyla eklendi!"
    },
    ar: {
        title: "قطع غيار لادا كروس وسوق السيارات",
        logo: "🚗 سوق السيارات",
        lada_cross_title: "لادا كروس",
        search_placeholder: "بحث عن قطع الغيار أو السيارات...",
        search_btn: "بحث",
        loc_shop: "موقع المتجر",
        mgr_call: "اتصال بالمدير",
        tg_chan: "قناة تلغرام",
        mgr_tg: "تلغرام المدير",
        closed_btn: "مغلق",
        vesta_title: "لادا فيستا كروس",
        vesta_desc: "انقر فوق الزر لقطع غيار لادا فيستا",
        vesta_btn: "دخول قطع غيار لادا فيستا",
        xray_title: "لادا إكس راي كروس",
        xray_desc: "انقر فوق الزر لقطع غيار لادا إكس راي",
        xray_btn: "دخول قطع غيار لادا إكس راي",
        largus_title: "لادا لارجوس كروس",
        largus_desc: "انقر فوق الزر لقطع غيار لادا لارجوس",
        largus_btn: "دخول قطع غيار لادا لارجوس",
        priora_title: "لادا بريورا كروس",
        priora_desc: "انقر فوق الزر لقطع غيار لادا بريورا",
        priora_btn: "دخول قطع غيار لادا بريورا",
        granta_title: "لادا جرانتا كروس",
        granta_desc: "انقر فوق الزر لقطع غيار لادا جرانتا",
        granta_btn: "دخول قطع غيار لادا جرانتا",
        l09_title: "لادا 2109",
        l09_desc: "انقر فوق الزر لقطع غيار لادا 2109",
        l09_btn: "دخول قطع غيار لادا 2109",
        market_main_title: "🚗 سوق سيارات لادا ومختلف السيارات",
        market_main_desc: "أعلن عن سيارتك على موقعنا وفي بوت تلغرام!",
        price_title: "سعر نشر الإعلان",
        payment_text: "قم بالدفع على هذا الرقم:",
        btn_goto_market: "🚗 الذهاب إلى سوق السيارات",
        btn_admin_ad: "نشر إعلان سيارة",
        btn_view_cars: "عرض السيارات المتاحة",
        carModalTitle: "🚗 نشر إعلان سيارة",
        carNameLabel: "اسم السيارة وموديلها:",
        carYearLabel: "السنة:",
        carPriceLabel: "السعر:",
        carDescLabel: "معلومات حول السيارة:",
        carImageLabel: "صورة السيارة:",
        checkImageLabel: "إيصال الدفع:",
        carSubmitBtn: "🚀 إضافة إلى الموقع",
        successAlert: "تم إضافة إعلانك بنجاح!"
    }
};

// ==========================================
// 2. TILNI ALMASHTIRISH FUNKSIYASI
// ==========================================
function changeLanguage(lang) {
    localStorage.setItem("selectedLang", lang);

    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }

    const t = translations[lang];
    if (!t) return;

    document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    document.querySelectorAll("[data-translate-placeholder]").forEach(el => {
        const key = el.getAttribute("data-translate-placeholder");
        if (t[key]) {
            el.setAttribute("placeholder", t[key]);
        }
    });

    if (t.title) {
        document.title = t.title;
    }
}

// ==========================================
// 3. SAHIFA YUKLANGANDA ISHGA TUSHISHI
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const savedLang = localStorage.getItem("selectedLang") || "uz_lat";
    changeLanguage(savedLang);

    const closeButton = document.querySelector(".lada-top-right button");
    if (closeButton) {
        closeButton.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }

    const externalLinks = document.querySelectorAll('.lada-top-center a');
    externalLinks.forEach(function (link) {
        const href = link.getAttribute('href');
        if (href && (href.startsWith('http') || href.startsWith('https'))) {
            link.setAttribute('target', '_blank');
        }
    });

    loadSavedAds();
});

// ==========================================
// 4. QIDIRUV Tizimi (Search)
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
// 5. MASHINA E'LONINI QO'YISH TIZIMI
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const btnAd = document.querySelector(".btn-ad");
    if (btnAd) {
        btnAd.addEventListener("click", (e) => {
            e.preventDefault();
            
            const currentLang = localStorage.getItem("selectedLang") || "uz_lat";
            const t = translations[currentLang];
            
            const modalHtml = `
                <div id="car-ad-modal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.75); backdrop-filter: blur(5px); display:flex; align-items:center; justify-content:center; z-index:9999; overflow-y:auto; padding:20px;">
                    <div style="background:#ffffff; padding:35px; border-radius:20px; max-width:550px; width:100%; box-shadow:0 15px 35px rgba(0,0,0,0.3); position:relative; max-height:90vh; overflow-y:auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                        
                        <span id="close-modal" style="position:absolute; right:22px; top:18px; cursor:pointer; font-size:26px; font-weight:bold; color:#aaa; transition:0.2s;">&times;</span>
                        
                        <div style="text-align:center; margin-bottom:20px;">
                            <h2 style="color:#ff6b00; margin:0 0 5px 0; font-size:24px;">${t.carModalTitle}</h2>
                            <p style="font-size:13px; color:#555; background:#fff8f3; padding:10px; border-radius:8px; border:1px dashed #ffb380; margin:10px 0 0 0;">
                                To'lov narxi: <b>5 000 so'm</b><br>Karta raqami: <span style="color:#d9534f; font-weight:bold; font-size:15px;">+998916957959</span>
                            </p>
                        </div>

                        <form id="car-form" style="display:flex; flex-direction:column; gap:14px; text-align:left;">
                            <div>
                                <label style="font-size:13px; font-weight:600; display:block; margin-bottom:5px; color:#333;">${t.carNameLabel}</label>
                                <input type="text" id="car-title" placeholder="Masalan: Lada Vesta Cross" required style="width:100%; padding:11px; border:1px solid #ddd; border-radius:8px; font-size:14px; outline:none;">
                            </div>

                            <div style="display:flex; gap:12px;">
                                <div style="flex:1;">
                                    <label style="font-size:13px; font-weight:600; display:block; margin-bottom:5px; color:#333;">${t.carYearLabel}</label>
                                    <input type="text" id="car-year" placeholder="2022 yil" required style="width:100%; padding:11px; border:1px solid #ddd; border-radius:8px; font-size:14px; outline:none;">
                                </div>
                                <div style="flex:1;">
                                    <label style="font-size:13px; font-weight:600; display:block; margin-bottom:5px; color:#333;">${t.carPriceLabel}</label>
                                    <input type="text" id="car-price" placeholder="12 000 $" required style="width:100%; padding:11px; border:1px solid #ddd; border-radius:8px; font-size:14px; outline:none;">
                                </div>
                            </div>

                            <div>
                                <label style="font-size:13px; font-weight:600; display:block; margin-bottom:5px; color:#333;">Telefon raqamingiz:</label>
                                <input type="tel" id="car-phone" value="+998" required style="width:100%; padding:11px; border:1px solid #ddd; border-radius:8px; font-size:14px; outline:none;">
                            </div>

                            <div>
                                <label style="font-size:13px; font-weight:600; display:block; margin-bottom:5px; color:#333;">${t.carDescLabel}</label>
                                <textarea id="car-desc" rows="3" placeholder="Holati, kraskasi, yurgani..." required style="width:100%; padding:11px; border:1px solid #ddd; border-radius:8px; font-size:14px; outline:none; resize:vertical;"></textarea>
                            </div>

                            <!-- MASHINA RASMI -->
                            <div>
                                <label style="font-size:13px; font-weight:600; display:block; margin-bottom:5px; color:#333;">🚗 ${t.carImageLabel}</label>
                                <input type="file" id="car-image" accept="image/*" required style="width:100%; padding:8px; border:1px dashed #ccc; border-radius:8px; background:#fafafa; font-size:13px; cursor:pointer;">
                            </div>

                            <!-- TO'LOV CHEKI RASMI -->
                            <div>
                                <label style="font-size:13px; font-weight:600; display:block; margin-bottom:5px; color:#333;">💳 ${t.checkImageLabel}</label>
                                <input type="file" id="check-image" accept="image/*" required style="width:100%; padding:8px; border:1px dashed #ff9800; border-radius:8px; background:#fffaf0; font-size:13px; cursor:pointer;">
                            </div>

                            <button type="submit" style="width:100%; background:linear-gradient(135deg, #ff6b00, #ff8c00); color:#fff; border:none; padding:13px; font-weight:bold; border-radius:8px; cursor:pointer; font-size:16px; margin-top:5px; box-shadow:0 4px 10px rgba(255,107,0,0.3);">
                                ${t.carSubmitBtn}
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

                const carImageFile = document.getElementById("car-image").files[0];
                const checkImageFile = document.getElementById("check-image").files[0];

                if (carImageFile && checkImageFile) {
                    const readerCar = new FileReader();
                    readerCar.onload = function(e1) {
                        const carImageUrl = e1.target.result;

                        const readerCheck = new FileReader();
                        readerCheck.onload = function(e2) {
                            const checkImageUrl = e2.target.result;

                            const carData = {
                                title: document.getElementById("car-title").value,
                                year: document.getElementById("car-year").value,
                                price: document.getElementById("car-price").value,
                                phone: document.getElementById("car-phone").value,
                                desc: document.getElementById("car-desc").value,
                                image: carImageUrl,
                                checkImage: checkImageUrl
                            };

                            saveCarToStorage(carData);
                            appendCarCard(carData);

                            const messageText = `🚗 YANGI E'LON VA CHEK TASDIqi!\n\n` +
                                                `📌 Mashina: ${carData.title} (${carData.year})\n` +
                                                `💰 Narxi: ${carData.price}\n` +
                                                `📞 Tel: ${carData.phone}\n` +
                                                `📝 Ma'lumot: ${carData.desc}\n\n` +
                                                `⚠️ Eslatma: Foydalanuvchi mashina rasmi va to'lov chekini biriktirdi.`;

                            const telegramUrl = `https://t.me/muhammadamin_0330?text=${encodeURIComponent(messageText)}`;
                            
                            window.open(telegramUrl, '_blank');
                            document.getElementById("car-ad-modal").remove();
                            alert(t.successAlert);
                        };
                        readerCheck.readAsDataURL(checkImageFile);
                    };
                    readerCar.readAsDataURL(carImageFile);
                }
            };
        });
    }
});

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

function saveCarToStorage(car) {
    let cars = JSON.parse(localStorage.getItem("userCars")) || [];
    cars.push(car);
    localStorage.setItem("userCars", JSON.stringify(cars));
}

function loadSavedAds() {
    let cars = JSON.parse(localStorage.getItem("userCars")) || [];
    cars.forEach(car => {
        appendCarCard(car);
    });
}
