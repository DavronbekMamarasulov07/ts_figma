import { IProducts, TCategories } from "./types";
const category_content = document.getElementById(
  "category_content"
) as HTMLDivElement;
const products_content = document.getElementById(
  "products_content"
) as HTMLDivElement;
const show_categories = document.getElementById(
  "show_categories"
) as HTMLButtonElement;
const arrow = document.getElementById("arrow") as HTMLImageElement;
const main = document.getElementById("main") as HTMLDivElement;
const categoroies = document.getElementById("categoroies") as HTMLDivElement;
const search_btn = document.getElementById("search_btn") as HTMLButtonElement;
const search_form = document.getElementById("search_form") as HTMLInputElement;
const toTop = document.getElementById("to_top") as HTMLDivElement;

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

class FetchData {
  async loadData(URL: string) {
    try {
      const res: Response = await fetch(URL);
      const data = await res.json();
      return data || [];
    } catch (error: any) {
      console.log(error);
    }
  }
}

class Render extends FetchData {
  async renderCategories() {
    let data = await this.loadData("https://dummyjson.com/products/categories");
    if (data?.length === 0) return;

    data?.forEach((category: TCategories) => {
      const div = document.createElement("div");
      div.className = "categories";
      div.innerHTML = `
      <a href="../pages/categories.html?category=${category.slug}" class="category">${category.name}</a>
    `;

      categoroies.appendChild(div);
    });
  }

  async renderProducts() {
    let data = await this.loadData("https://dummyjson.com/products");

    if (data?.products?.length === 0) return;

    data?.products?.slice(0, 20).map((product: IProducts) => {
      const div = document.createElement("div");
      div.className = "product";

      const stars = Array.from(
        { length: Math.floor(product.rating) },
        (_, index) =>
          `<img src="../images/starFill.svg" alt="Star" class="star">`
      ).join("");

      div.innerHTML = `
      <div class="product_img">
          <img width="200" class="h-[200px]"  src="${product.thumbnail}" alt="${
        product.title
      }" />
        
      </div>
      <div class="product_rating">${stars}</div>
      <h3>${product.title}</h3>
      <div class="flex items-center justify-between gap-3 mt-2">
          <div class="product_price">
            <span class="text-xl font-bold text-gray-800">$${(
              product.price -
              (product.price * product.discountPercentage) / 100
            ).toFixed(2)}</span>
            <span class="text-lg font-bold text-red-500 line-through">$${
              product.price
            }</span>
            </div>
            <span class="text-base cursor-pointer font-normal  px-2 underline  text-yellow-500">
              <span class=" ">${
                product.discountPercentage
              } </span> % off
              </span>
          </div>
      <a class="mx-auto" href="../pages/ProductDetails.html?id=${
        product.id
      }"><button  class=" w-full py-2 mt-8 mb-4 px-14    bg-black text-white rounded-sm transition-transform active:scale-95">View Details</button></a>
    `;

      products_content.appendChild(div);
    });
  }
}

new Render().renderProducts();
new Render().renderCategories();
