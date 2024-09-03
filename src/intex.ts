

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
  search_form.classList.toggle("show_input");
});

show_categories.addEventListener("click", () => {
  category_content.classList.toggle("show");
  arrow.classList.toggle("rotate");
  main.classList.toggle("main");
});

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
})



  interface IProducts {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  tags: string[];
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
}

  type TCategories = {
  slug: string;
  name: string;
  url: string;
};

async function loadData(URL: string) {
  try {
    const res: Response = await fetch(URL);
    const data = await res.json();
    const products: IProducts[] = data.products;
    renderProducts(products);
    console.log(products);
  } catch (error: any) {
    console.log(error);
  }
}

loadData("https://dummyjson.com/products");


async function loadCategories(URL: string) {
  try {
    const res: Response = await fetch(URL);
    const data: TCategories[] = await res.json();
    renderCategories(data);
  } catch (error: any) {
    console.log(error);
  } finally {
    console.log("finished fetching");
  }
}

loadCategories("https://dummyjson.com/products/categories");

function renderProducts(data: IProducts[]) {
  if (data.length === 0) return;

  data.forEach((product: IProducts) => {
    const div = document.createElement("div");
    div.className = "product";

    const stars = Array.from(
      { length: Math.floor(product.rating) },
      (_, index) => {
        return `<img src="./images/starFill.svg" alt="Star" class="star" >`;
      }
    ).join("");

    div.innerHTML = `
          <div class="product_img">
          <img width="200" height="400" src="${product.thumbnail}" alt="${
      product.title
    }"/></div>
          <div class="product_rating">${stars}</div>
          <h3>${product.title}</h3>
          <div class="product_price">
            <span class="text-xl font-bold text-gray-800">$${(
              product.price -
              (product.price * product.discountPercentage) / 100
            ).toFixed(2)}
            </span>
            <span class="text-lg font-bold text-red-500 line-through ">$${
              product.price
            }</span>
          </div>
          `;

    products_content.appendChild(div);
  });
}

function renderCategories(data: TCategories[]) {
  if (data.length === 0) return;

  data.forEach((category: TCategories) => {
    const div = document.createElement("div");
    div.className = "categories";
    div.innerHTML = `
         <a  href="../pages/categories.html?category=${category.slug}" class="category">${category.name}</a>
      `;

    categoroies.appendChild(div);
  });
}
