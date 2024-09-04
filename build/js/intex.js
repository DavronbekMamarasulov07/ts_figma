"use strict";
const category_content = document.getElementById("category_content");
const products_content = document.getElementById("products_content");
const show_categories = document.getElementById("show_categories");
const arrow = document.getElementById("arrow");
const main = document.getElementById("main");
const categoroies = document.getElementById("categoroies");
const search_btn = document.getElementById("search_btn");
const search_form = document.getElementById("search_form");
const toTop = document.getElementById("to_top");
search_btn.addEventListener("click", () => {
    search_form.classList.add("show_input");
});
show_categories.addEventListener("click", () => {
    category_content.classList.toggle("show");
    arrow.classList.toggle("rotate");
    main.classList.toggle("main");
});
toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
async function loadData(URL) {
    try {
        const res = await fetch(URL);
        const data = await res.json();
        const products = data.products;
        renderProducts(products);
        console.log(products);
    }
    catch (error) {
        console.log(error);
    }
}
loadData("https://dummyjson.com/products");
async function loadCategories(URL) {
    try {
        const res = await fetch(URL);
        const data = await res.json();
        renderCategories(data);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        console.log("finished fetching");
    }
}
loadCategories("https://dummyjson.com/products/categories");
function renderProducts(data) {
    if (data.length === 0)
        return;
    data.forEach((product) => {
        const div = document.createElement("div");
        div.className = "product";
        const stars = Array.from({ length: Math.floor(product.rating) }, (_, index) => {
            return `<img src="./images/starFill.svg" alt="Star" class="star" >`;
        }).join("");
        div.innerHTML = `
          <div class="product_img">
          <img width="200" height="400" src="${product.thumbnail}" alt="${product.title}"/></div>
          <div class="product_rating">${stars}</div>
          <h3>${product.title}</h3>
          <div class="product_price">
            <span class="text-xl font-bold text-gray-800">$${(product.price -
            (product.price * product.discountPercentage) / 100).toFixed(2)}
            </span>
            <span class="text-lg font-bold text-red-500 line-through ">$${product.price}</span>
          </div>
          `;
        products_content.appendChild(div);
    });
}
function renderCategories(data) {
    if (data.length === 0)
        return;
    data.forEach((category) => {
        const div = document.createElement("div");
        div.className = "categories";
        div.innerHTML = `
         <a  href="../pages/categories.html?category=${category.slug}" class="category">${category.name}</a>
      `;
        categoroies.appendChild(div);
    });
}
