"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const currentUrl = window.location.href;
const urlParams = new URLSearchParams(new URL(currentUrl).search);
const id = urlParams.get("id");
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
        let product = await this.loadData(`https://dummyjson.com/products/${id}`);
        const discountPrice = (product.price -
            (product.price * product.discountPercentage) / 100).toFixed(2);
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
        <div class=" p-4  " >
          <img src="${product.thumbnail}" alt="${product.title}" width="500" class=" object-cover rounded-lg shadow-md bg-black" />
        </div>
        <div class="w-1/2 p-4">
            <div class="flex items-center justify-between mb-5">
              <h2 class="text-3xl font-bold text-gray-800 ">
                ${product.title}
              </h2>
            </div>
        
          <p class="text-gray-600 mb-4 text-base underline">${product.description}</p>
          <div class="flex items-center justify-between mb-4">
                <div>
                  <span class="text-xl font-bold text-gray-800 ">
                    $${discountPrice}
                  </span>
                  <span class="text-gray-600 mr-1">/</span>
                  <span class="text-lg font-bold text-red-500 line-through ">
                    $${product.price}
                  </span>
                </div>
                <span class="text-sm text-gray-500">
                  ${product.availabilityStatus}
                </span>
            </div> 
             <div class="text-gray-700 mb-4 flex flex-col gap-2 ">
              <div>
                <strong>Category:</strong> ${product.category}
              </div>
              <div>
                <strong>Brand:</strong> ${product.brand}
              </div>
              <div>
                <strong>Stock:</strong> ${product.stock}
              </div>
              <div>
                <strong>Warranty:</strong> ${product.warrantyInformation}
              </div>
              <div>
                <strong>Shipping:</strong> ${product.shippingInformation}
              </div>
              <div>
                <strong>Return Policy:</strong> ${product.returnPolicy}
              </div>
              <div>
                <strong>Minimum Order Quantity:</strong>
                ${product.minimumOrderQuantity}
              </div>
              <div class="mt-4">
                <strong>Rating: <span class="text-yellow-500 mr-2">${product.rating}</span></strong>
                (<span  class="underline ">${product.reviews?.length} reviews</span>)
              </div>
            </div>
            <div class="flex items-center justify-between">
              <button>
            </div>
        </div>  
      `;
        categoriesContent.appendChild(div);
    }
}
new Render().renderProducts();
new Render().renderCategories();
