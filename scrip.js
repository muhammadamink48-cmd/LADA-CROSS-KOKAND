// Closed tugmasi
const closeButton = document.querySelector(".lada-top-right button");

closeButton.addEventListener("click", function () {
    alert("Sayt oynasi yopildi!");
});


// Barcha zapchast linklari
const links = document.querySelectorAll(".lada-bottom-left a, .lada-bottom-center a, .lada-bottom-right a, .lada-bottom-priora a, .lada-bottom-granta a, .l09-right a");

links.forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        alert("Zapchastlar bo'limi tez orada ochiladi!");
    });
});


// Tepdagi linklar
const topLinks = document.querySelectorAll(".lada-top-center a");

topLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        const name = link.textContent;

        alert(name + " bo'limi tanlandi!");
    });
}); 