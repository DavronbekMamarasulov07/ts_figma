"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const currentUrl = window.location.href;
const urlParams = new URLSearchParams(new URL(currentUrl).search);
const category = urlParams.get("category");
const arrow = document.getElementById("arrow");
const loading = document.getElementById("loading");
const categoryContent = document.getElementById("category_content");
const categoriesContent = document.getElementById("categories_content");
const showCategories = document.getElementById("show_categories");
const main = document.getElementById("main");
const categories = document.getElementById("categoroies");
const search_btn = document.getElementById("search_btn");
const search_form = document.getElementById("search_form");
search_btn.addEventListener("click", () => {
    search_form.classList.add("show_input");
});
showCategories.addEventListener("click", () => {
    categoryContent.classList.toggle("show");
    arrow.classList.toggle("rotate");
    main.classList.toggle("main");
});
class FetchData {
    async loadData(URL) {
        try {
            loading.style.display = "block";
            const res = await fetch(URL);
            const data = await res.json();
            return data || [];
        }
        catch (error) {
            console.log(error);
        }
    }
}
class Render extends FetchData {
    async renderCategories() {
        let data = await this.loadData("https://dummyjson.com/products/categories");
        if (data?.length === 0) {
            return;
        }
        data?.forEach((category) => {
            const div = document.createElement("div");
            div.className = "categories";
            div.innerHTML = `
      <a href="../pages/categories.html?category=${category.slug}" class="category">${category.name}</a>
    `;
            categories.appendChild(div);
        });
    }
    async renderProducts() {
        let data = await this.loadData(`https://dummyjson.com/products/category/${category}`);
        console.log(data);
        if (data?.products?.length !== 0) {
            loading.style.display = "none";
        }
        data?.products?.map((product) => {
            const div = document.createElement("div");
            div.className = "product";
            const stars = Array.from({ length: Math.floor(product.rating) }, (_, index) => `<img src="../images/starFill.svg" alt="Star" class="star">`).join("");
            div.innerHTML = `
      <div class="product_img">
        <img width="200" class="h-[200px]"  src="${product.thumbnail}" alt="${product.title}" />
      </div>
      <div class="product_rating">${stars}</div>
      <h3>${product.title}</h3>
      <div class="flex items-center justify-between gap-3 mt-2">
          <div class="product_price">
            <span class="text-xl font-bold text-gray-800">$${(product.price -
                (product.price * product.discountPercentage) / 100).toFixed(2)}</span>
            <span class="text-lg font-bold text-red-500 line-through">$${product.price}</span>
            </div>
            <span class="text-sm font-normal bg-black px-2 rounded-sm  text-white">In stock:
              <span class="text-base text-green-500 font-bold">${product.stock}</span>
              </span>
          </div>
      <a class="mx-auto" href="../pages/ProductDetails.html?id=${product.id}"><button  class=" w-full py-2 mt-8 mb-4 px-14  bg-black text-white rounded-sm transition-transform active:scale-95">View Details</button></a>
    `;
            categoriesContent.appendChild(div);
        });
    }
}
new Render().renderProducts();
new Render().renderCategories();
