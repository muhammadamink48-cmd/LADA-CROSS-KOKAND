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
