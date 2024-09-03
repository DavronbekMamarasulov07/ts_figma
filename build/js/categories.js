"use strict";
const currentUrl = window.location.href;
const urlParams = new URLSearchParams(new URL(currentUrl).search);
const category = urlParams.get("category");
const arrowC = document.getElementById("arrow");
const loading = document.getElementById("loading");
const categoryContentC = document.getElementById("category_content");
const categoriesContent = document.getElementById("categories_content");
const showCategoriesC = document.getElementById("show_categories");
const mainC = document.getElementById("main");
const categoriesC = document.getElementById("categoroies");
const search_btnC = document.getElementById("search_btn");
const search_formC = document.getElementById("search_form");
search_btnC.addEventListener("click", () => {
    search_formC.classList.toggle("show_input");
});
showCategoriesC.addEventListener("click", () => {
    categoryContentC.classList.toggle("show");
    arrowC.classList.toggle("rotate");
    mainC.classList.toggle("main");
});
;
async function loadCategoriesData(URL) {
    try {
        const res = await fetch(URL);
        const data = await res.json();
        const products = data.products;
        renderCategoriesProducts(products);
        console.log(products);
    }
    catch (error) {
        console.error("Error loading category data:", error);
    }
}
if (category) {
    loadCategoriesData(`https://dummyjson.com/products/category/${category}`);
}
async function loadCategoriesC(URL) {
    try {
        loading.style.display = "block";
        const res = await fetch(URL);
        const data = await res.json();
        renderCategoriesC(data);
    }
    catch (error) {
        console.error("Error loading categories:", error);
    }
    finally {
        console.log("Finished fetching categories.");
        loading.style.display = "none";
    }
}
loadCategoriesC("https://dummyjson.com/products/categories");
function renderCategoriesProducts(data) {
    if (data.length === 0)
        return;
    data.forEach((product) => {
        const div = document.createElement("div");
        div.className = "product";
        const stars = Array.from({ length: Math.floor(product.rating) }, (_, index) => `<img src="../images/starFill.svg" alt="Star" class="star">`).join("");
        div.innerHTML = `
      <div class="product_img">
        <img width="200" height="400" src="${product.thumbnail}" alt="${product.title}" />
      </div>
      <div class="product_rating">${stars}</div>
      <h3>${product.title}</h3>
      <div class="product_price">
        <span class="text-xl font-bold text-gray-800">$${(product.price -
            (product.price * product.discountPercentage) / 100).toFixed(2)}</span>
        <span class="text-lg font-bold text-red-500 line-through">$${product.price}</span>
      </div>
    `;
        categoriesContent.appendChild(div);
    });
}
function renderCategoriesC(data) {
    if (data.length === 0)
        return;
    data.forEach((category) => {
        const div = document.createElement("div");
        div.className = "categories";
        div.innerHTML = `
      <a href="../pages/categories.html?category=${category.slug}" class="category">${category.name}</a>
    `;
        categoriesC.appendChild(div);
    });
}
