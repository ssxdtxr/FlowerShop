const form = document.getElementById("form");
const formItems = document.getElementsByClassName("form_item");
const image = formItems[4];
let urlFile = "";
image.onchange = (event) => {
  const file = event.target.files[0];
  urlFile = URL.createObjectURL(file);
};

form.onsubmit = (event) => {
  event.preventDefault(); //останавливает дефолтное поведение (не обновляет страницу)

  const name = formItems[0];
  const sale = formItems[1];
  const price = formItems[2];
  const bestseller = formItems[3];
  const categoryId = formItems[5];

  if (!name.value) {
    return alert("не введено имя");
  }
  if (!price.value || Number(price.value) < 100) {
    return alert("введите другую цену");
  }
  if (categoryId.value == 0) {
    return alert("ошибка в категории id");
  }
  if (!urlFile) {
    return alert("Загрузите картинку!");
  }

  const storageData = localStorage.getItem(PRODUCTS_STORAGE);
  console.log(storageData);

  const product = {
    views: 0,
    id: storageData
      ? JSON.parse(storageData)[JSON.parse(storageData).length - 1].id + 1
      : 1,
    name: name.value,
    bestseller: bestseller.checked,
    price: Number(price.value),
    categoryId: Number(categoryId.value),
    sale: Number(sale.value),
    img: urlFile,
  };

  function clearState() {
    name.value = "";
    price.value = "";
    sale.value = "";
    bestseller.checked = false;
    categoryId.value = "0";
  }

  if (!storageData) {
    debugger;
    localStorage.setItem(PRODUCTS_STORAGE, JSON.stringify([product])); //stringify переводит строку
    clearState();
    return alert("Товар успешно создан");
  }

  const newProducts = JSON.parse(storageData);
  newProducts.push(product);
  localStorage.setItem(PRODUCTS_STORAGE, JSON.stringify(newProducts));
  clearState();
  alert("Товар успешно создан");
};
