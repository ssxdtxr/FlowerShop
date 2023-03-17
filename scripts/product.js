const id = location.search.replace("?id=", "");

const productsStorage = localStorage.getItem(PRODUCTS_STORAGE);
const products = JSON.parse(productsStorage);

const product = products.find((item) => item.id === Number(id));

const imgProduct = document.getElementsByClassName("img_product");
const nameProduct = document.getElementsByClassName("name_product");
const saleProduct = document.getElementsByClassName("sale_product");
const priceProduct = document.getElementsByClassName("old_price");
const categoryIdProduct = document.getElementsByClassName("categoryId_product");
const newPriceProduct = document.getElementsByClassName("new_price");

imgProduct[0].src = product.img;
nameProduct[0].innerHTML = product.name;
saleProduct[0].innerHTML = product.sale !== 0 ? `Скидка: ${product.sale}%` : "";
priceProduct[0].innerHTML = `Цена: <del> <span>${product.price}P</span></del>`;
newPriceProduct[0].innerHTML = `${
  product.price - product.price * (product.sale / 100)
}P`;
