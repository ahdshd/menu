// بيانات المنتجات والأقسام مع صورها الرئيسية
const menuData = {
    coffee: {
        title: "القهوة الساخنة",
        image: "img/cofe33.jpeg",
        items: [
            { name: "إسبريسو دبل", price: "4.000 د.ع", img: "img/cofe33.jpeg" },
            { name: "كابتشينو إيطالي", price: "6.000 د.ع", img: "img/cofe33.jpeg" },
            { name: "لاتيه سبانيش حار", price: "7.000 د.ع", img: "img/cofe33.jpeg" },
            { name: "قهوة تركية خاصة", price: "5.000 د.ع", img: "img/cofe33.jpeg" }
        ]
    },
    juices: {
        title: "عصائر فريش",
        image: "img/goos1.jpeg",
        items: [
            { name: "عصير برتقال طبيعي", price: "5.000 د.ع", img: "img/goos1.jpeg" },
            { name: "ليمون بالنعناع", price: "5.500 د.ع", img: "img/goos1.jpeg" },
            { name: "كوكتيل A2Z الملكي", price: "8.000 د.ع", img: "img/goos1.jpeg" }
        ]
    },
    desserts: {
        title: "الحلويات",
        image: "img/crosson1.jpeg",
        items: [
            { name: "كرواسون شوكولاتة", price: "5.000 د.ع", img: "img/crosson1.jpeg" },
            { name: "تشيز كيك لوتس", price: "7.500 د.ع", img: "img/teshscka1.jpeg" },
            { name: "سان سيباستيان", price: "8.000 د.ع", img: "img/crosson1.jpeg" }
        ]
    },
    moheto: {
        title: "الموهيتو",
        image: "img/moheto.jpeg",
        items: [
            { name: "موهيتو بلو أوشن", price: "6.000 د.ع", img: "img/moheto.jpeg" },
            { name: "موهيتو فراولة وتوت", price: "6.500 د.ع", img: "img/moheto.jpeg" },
            { name: "موهيتو باشن فروت", price: "7.000 د.ع", img: "img/moheto.jpeg" }
        ]
    }
};

const categoriesView = document.getElementById("categories-view");
const productsView = document.getElementById("products-view");
const sectionTitle = document.getElementById("section-title");
const heroImg = document.getElementById("hero-img");
const productsContainer = document.getElementById("products-container");
const backButton = document.getElementById("back-button");
const categoryButtons = document.querySelectorAll("[data-category]");

// فتح صفحة القسم وعرض الصورة الكبيرة والعنوان والآيتمات
function openCategoryPage(categoryKey, pushHistory = true) {
    const category = menuData[categoryKey];
    if (!category) return;

    sectionTitle.textContent = category.title;
    heroImg.src = category.image;
    heroImg.alt = category.title;

    productsContainer.innerHTML = "";
    category.items.forEach(item => {
        const card = document.createElement("article");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-info">
                <h3>${item.name}</h3>
                <strong class="product-price">${item.price}</strong>
            </div>
            <div class="product-image">
                <img src="${item.img}" alt="${item.name}">
            </div>
        `;
        productsContainer.appendChild(card);
    });

    categoriesView.hidden = true;
    productsView.hidden = false;
    window.scrollTo({ top: 0, behavior: "instant" });

    if (pushHistory) {
        history.pushState({ page: "products", category: categoryKey }, "", `#${categoryKey}`);
    }
}

function goBackToCategories() {
    productsView.hidden = true;
    categoriesView.hidden = false;
    window.scrollTo({ top: 0, behavior: "instant" });
}

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        const categoryKey = button.getAttribute("data-category");
        openCategoryPage(categoryKey, true);
    });
});

backButton.addEventListener("click", () => {
    if (location.hash) {
        history.back();
    } else {
        goBackToCategories();
    }
});

window.addEventListener("popstate", (event) => {
    if (event.state && event.state.page === "products") {
        openCategoryPage(event.state.category, false);
    } else {
        goBackToCategories();
    }
});
const welcomeScreen = document.getElementById("welcome-screen");
const enterMenuButton = document.getElementById("enter-menu");

enterMenuButton.addEventListener("click", function () {
    welcomeScreen.classList.add("hide-welcome");
});