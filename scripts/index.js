const storageData = localStorage.getItem(PRODUCTS_STORAGE);
if (!storageData) {
  localStorage.setItem(PRODUCTS_STORAGE, JSON.stringify(products));
}
console.log(localStorage);

const btn = document.querySelector(".btn_search");
const btnShow = document.querySelector(".btn_show");
const btnBurger = document.getElementById("burger");
const search_input = document.getElementById("serch");
const dropDown = document.querySelector(".search_drop_down");

function maxPrice(products) {
  const productsClone = products;
  productsClone.sort(
    (productOne, productTwo) => productTwo.price - productOne.price
  );
  return productsClone[0].price;
}

function minPrice(products) {
  const productsClone = products;
  productsClone.sort(
    (productOne, productTwo) => productOne.price - productTwo.price
  );
  return productsClone[0].price;
}

const priceMax = maxPrice(products);
const priceMin = minPrice(products);

document.getElementById("price_up").value = priceMax;
document.getElementById("price_from").value = priceMin;

search_input.onblur = () => {
  dropDown.innerHTML = "";
  dropDown.classList.remove("open");
};

search_input.oninput = (event) => {
  const value = event.target.value;
  if (value !== "") {
    dropDown.innerHTML = "";
    dropDown.classList.add("open");
  }

  const resultProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(value.toLowerCase());
  });
  if (!resultProducts.length) {
    return (dropDown.innerHTML = "Ничегон не нашлось");
  }

  for (let i = 0; i < resultProducts.length; i++) {
    dropDown.innerHTML += `
    <button class="dropDown_item" onclick="(event)" => btnDropDown(${resultProducts[i].name}, event)">${resultProducts[i].name}</button>
    `;
  }

  if (value == "") {
    dropDown.innerHTML = "";
    dropDown.classList.remove("open");
  }
};

function btnDropDown(name, event) {
  event.stopPropagation();
  search_input.value = name;
}

function handleClickFunction() {
  // функция для настройки поиска
  const price_from = document.getElementById("price_from").value;
  const price_up = document.getElementById("price_up").value;
  const selectSort = document.getElementById("select_sort").value;

  const resultProducts = JSON.parse(productStorage).filter(
    (product) =>
      (product.price >= Number(price_from) &&
        product.price <= Number(price_up) &&
        Number(price_from) <= Number(price_up)) || // проверка, если цена от больше цены до = ошибка
      (product.price >= Number(price_from) && Number(price_up == 0)) || // можно вводить только цену от
      (product.price <= Number(price_up) && Number(price_from == 0)) // // можно вводить только цену до
  );

  if (selectSort == 0) {
    drawProducts(resultProducts);
  }

  if (selectSort == 1) {
    drawProducts(
      resultProducts.sort(
        (productOne, productTwo) => productOne.price - productTwo.price
      )
    );
    return drawProducts(resultProducts);
  }

  if (selectSort == 2) {
    drawProducts(
      resultProducts.sort(
        (productOne, productTwo) => productTwo.price - productOne.price
      )
    );
    return drawProducts(resultProducts);
  }
}

btnBurger.addEventListener("click", function () {
  document.getElementById("header").classList.toggle("open");
});

btn.addEventListener("click", handleClickFunction);

btnShow.addEventListener("click", () =>
  drawProducts(JSON.parse(productStorage))
);

function deleteProduct(id) {
  const productStorage = localStorage.getItem(PRODUCTS_STORAGE);
  const newStorage = JSON.parse(productStorage);
  const filteredStorage = newStorage.filter((item) => item.id !== id);
  localStorage.setItem(PRODUCTS_STORAGE, JSON.stringify(filteredStorage));
  drawProducts(filteredStorage);
}

function drawProducts(products) {
  const productsBlock = document.getElementById("products");
  productsBlock.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    productsBlock.innerHTML += `
    <div class="product_card">
      <a href="product.html?id=${products[i].id}">
          <div class="product_card_image">
              <img
                src=${products[i].img} 
                alt="${products[i].name}"
              > 
          </div>
      </a>
          <div class="product_card_content">
              <div class="top_line">
                <div class="content_name">
                    ${products[i].name}
                </div>
                  <button class="delete_btn" onclick="deleteProduct(${
                    products[i].id
                  })">
                    <span></span>
                    <span></span>
                  </button>
              </div>

              <div class="controls">
                  <a class="content_price">${products[i].price}Р</a>
                  ${
                    products[i].sale !== 0
                      ? `<div class="content_sale">-${products[i].sale}%</div>`
                      : ""
                  }
              </div>
          </div>
    </div>
      `; //innerHTML находится внутри дива // `` - шаблонные литералы(для динамических параметров) // alt нужен для обозначения картинки, если есть ошибка в пути
  }
}

const productStorage = localStorage.getItem(PRODUCTS_STORAGE);
drawProducts(JSON.parse(productStorage));
