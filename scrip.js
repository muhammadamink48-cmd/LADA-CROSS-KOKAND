// Closed tugmasini bosganda orqaga qaytarish
const closeButton = document.querySelector(".lada-top-right button");

if (closeButton) {
    closeButton.addEventListener("click", function () {
        if (window.history.length > 1) {
            window.history.back(); // Avvalgi sahifaga qaytaradi
        } else {
            window.close(); // Oynani yopadi
        }
    });
}
