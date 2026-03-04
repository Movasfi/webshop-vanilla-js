let section = document.querySelector(".card-sec");
let hamMenu = document.querySelector(".ham");

let clothes = [];
let products = [];
let orderdData = [];

if (localStorage.getItem("clothesData") !== null) {
  clothes = JSON.parse(localStorage.getItem("clothesData"));
}

if (localStorage.getItem("orderdData") !== null) {
  orderdData = JSON.parse(localStorage.getItem("orderdData"));
}

if (localStorage.getItem("products") !== null) {
  products = JSON.parse(localStorage.getItem("products"));
}

const alertBuoght = () => {
  let alert = document.createElement("div");
  alert.className = "flex justify-center items-center alert-bought";
  alert.innerHTML = `
     <div class="flex flex-col backdrop-blur-2xl w-80  rounded-2xl justify-center items-center text-white">
        <div class="w-35 h-35 p-5 ml-5">
            <img src="../images/shopping-bag.svg" alt="">
        </div>
        <div class="flex gap-2 flex-col justify-center items-center  text-center p-2">
            <p class="text-3xl">Hi User</p>
            <p class="text-xl p-3">Uw aankoop zit in de wineklwagen</p>
        </div>
    </div>
    `;
  return alert;
};

const toggleHamMenu = () => {
  let dot1 = document.getElementById("dot-1");
  let dot2 = document.getElementById("dot-2");
  let dot3 = document.getElementById("dot-3");
  let menuDropDown = document.getElementById("menu");
  hamMenu.addEventListener("click", () => {
    menuDropDown.classList.toggle("translate-x-full");

    dot2.classList.toggle("scale-0");
    dot2.classList.toggle("scale-100");

    dot1.classList.toggle("translate-y-2.5");
    dot1.classList.toggle("-rotate-45");

    dot3.classList.toggle("-translate-y-2.5");
    dot3.classList.toggle("rotate-45");
  });
};

const fetchData = async () => {
  let fetchda = await fetch("https://fakestoreapi.com/products");
  let dataToJson = await fetchda.json();
  let sliced = dataToJson.slice(0, 6);
  console.log(sliced);
  return sliced;
};

const createCards = (data) => {
  let card = document.createElement("div");
  let price = Number(data.price).toFixed(2);
  card.className = "parent-card";
  card.innerHTML = `
        <div class="bg-strong-red w-70 telefoon:w-90  rounded-2xl flex flex-col justify-between items-center">
          <div class="w-full h-64  bg-gray-700 rounded-xl ">
            <img
              src="${data.image}"
              class=" w-full h-full  img object-contain p-6"
            />
          </div>
          <div class=" w-full flex justify-center items-center flex-col text-center p-8 gap-6">
            <h2 class="text-2xl title">${data.title.slice(0, 20)}</h2>
            <div class="flex justify-center items-center">
            <span>&euro;</span>
            <p class="price p-1  text-wrap">
             ${price}
            </p>
            </div>
              <div>
    <div>
        <label for="amount" class="block mb-2 text-white font-semibold">Choose quanitity</label>
        <select name="" id="amount"  class=" amount w-full bg-gray-100 border 
        border-gray-300 rounded-lg shadow-sm p-2 text-center text-gray-800 focus:outline-none
         focus:ring-2 focus:ring-blue-400 focus:border-blue-400">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        </select>
    </div>
            </div>
            <div class="w-full">
              <p class="buy w-full bg-slate-800 p-3 cursor-pointer rounded-xl">
                Buy Now
                </p>
            </div>
          </div>
        </div>
    `;
  return card;
};

const clearCart = () => {
  let clear = document.createElement("div");
  clear.className = "clear w-full h-20 flex justify-between items-center p-5";
  const aContainer = document.createElement("div");
  const terugHome = document.createElement("a");
  terugHome.href = "index.html";
  terugHome.textContent = "Terug";
  terugHome.className = "bg-strong-red p-3 text-sm text-white rounded-xl";
  const imgContainer = document.createElement("span");
  let trush = document.createElement("img");
  imgContainer.append(trush);
  trush.className = "w-6 h-6";
  trush.src = "../images/trash.svg";
  trush.style.width = "30px";
  trush.style.height = "30px";
  trush.style.cursor = "pointer";
  trush.addEventListener("click", () => {
    localStorage.removeItem("clothesData");
    clothes = [];
    let container = document.querySelector(".tabel-container");
    container.innerHTML = "";
  });
  aContainer.append(terugHome);
  clear.append(aContainer, imgContainer);
  return clear;
};

const CreateTabel = () => {
  let container = document.querySelector(".tabel-container");
  let data = JSON.parse(localStorage.getItem("clothesData"));
  if (data && container) {
    if (data.length === 0) {
      container.remove();
    } else {
      let headData = ["Title", "Price", "Aantal", "Total"];
      let tabel = document.createElement("table");
      tabel.className =
        "min-w-full border text-center  table-fixed text-[12px] sm:text-base tabel";
      let trThead = document.createElement("tr");

      headData.forEach((item) => {
        let th = document.createElement("th");
        th.className = "py-2 break-words max-w-[120px]";
        th.textContent = item;
        trThead.append(th);
      });

      trThead.className = "p-3";

      tabel.append(trThead);

      for (const item of data) {
        console.log(item);
        let prices = ["productPrice"];

        const trTbody = document.createElement("tr");

        const rowOrder = ["productTitel", "productPrice", "aantal", "total"];

        for (const key of rowOrder) {
          const td = document.createElement("td");
          td.className = "px-4 py-2 break-words";
          if (prices.includes(key)) {
            td.textContent = `€ ${item[key]}`;
          } else if (key === "aantal") {
            let aantalWaarde = document.createElement("span");
            aantalWaarde.textContent = item[key];

            let plus = document.createElement("button");
            plus.className = "p-2";
            plus.textContent = "+";
            plus.addEventListener("click", (e) => {
              let total = e.target.parentElement.nextSibling;
              let price = Number(item["productPrice"]);
              item[key]++;
              item["total"] = Number(item[key] * price).toFixed(2);

              localStorage.setItem("clothesData", JSON.stringify(data));

              aantalWaarde.textContent = item[key];
              total.textContent = Number(item["total"]).toFixed(2);
            });
            let min = document.createElement("button");
            min.className = "p-2";
            min.textContent = "-";
            min.addEventListener("click", (e) => {
              let total = e.target.parentElement.nextSibling;
              if (item[key] >= 1) {
                let price = Number(item["productPrice"]);
                item[key]--;
                item["total"] = Number(item[key] * price).toFixed(2);
                localStorage.setItem("clothesData", JSON.stringify(data));

                aantalWaarde.textContent = item[key];
                console.log(Number(item["total"]));
                total.textContent = Number(item["total"]).toFixed(2);
              }
              if (item[key] <= 0) {
                data = data.filter(
                  (clo) => clo.productIdFake !== item["productIdFake"],
                );
                trTbody.remove();
                localStorage.setItem("clothesData", JSON.stringify(data));

                aantalWaarde.textContent = item[key];
                console.log(Number(item["total"]));
                total.textContent = Number(item["total"]).toFixed(2);
              }
            });
            td.append(min, aantalWaarde, plus);
          } else if (key === "total") {
            console.log(Number(item[key]));

            td.textContent = item[key];
            console.log(td.innerText);
          } else {
            td.textContent = item[key];
          }
          trTbody.append(td);
        }
        tabel.append(trTbody);
      }
      container.append(clearCart());
      container.append(tabel);
      container.append(createOrderdButoon());
    }
  }
};

const buyEvent = async () => {
  let buyBtns = document.querySelectorAll(".buy");
  let data = JSON.parse(localStorage.getItem("products"));

  buyBtns.forEach((buyBtn, i) => {
    let parentCard = buyBtn.closest(".parent-card");

    let title = parentCard.querySelector(".title").textContent;
    let price = Number(parentCard.querySelector(".price").textContent);
    let id = data[i].id;
    let img = parentCard.querySelector(".img").src;
    console.log(img);

    buyBtn.addEventListener("click", () => {
      let amount = Number(parentCard.querySelector(".amount").value);
      const date = new Date().toLocaleString("nl-NL", {
        timeZone: "Europe/Amsterdam",
      });
      let vind = clothes.find((da) => da.productTitel === title);

      if (vind) {
        vind.productPrice = Number(vind.productPrice);
        vind.aantal += amount;
        vind.total = (vind.aantal * vind.productPrice).toFixed(2);
      } else {
        clothes.push({
          productTitel: title,
          productPrice: Number(price),
          aantal: amount,
          productId: crypto.randomUUID(),
          productImage: img,
          productIdFake: id,
          total: Number(price * amount).toFixed(2),
          purchasedDate: date,
        });
      }
      localStorage.setItem("clothesData", JSON.stringify(clothes));
      CreateTabel();

      const alertElement = alertBuoght();
      document.body.append(alertElement);
      alertElement.style.position = "fixed";
      alertElement.style.top = "50%";
      alertElement.style.left = "50%";
      alertElement.style.zIndex = "100";
      alertElement.style.transform = "translate(-50% , -50%)";

      setTimeout(() => {
        alertElement.remove();
      }, 1000);
    });
  });
};

const showCards = async () => {
  if (!section) {
    return;
  }

  if (!products || products.length === 0) {
    products = await fetchData();
    products.forEach((pro) => {
      pro.productId = crypto.randomUUID();
    });
    localStorage.setItem("products", JSON.stringify(products));
  }

  const fragment = document.createDocumentFragment();

  products.forEach((d) => {
    fragment.append(createCards(d));
  });

  section.append(fragment);

  buyEvent();
};

const createOrderdNotifiction = () => {
  let div = document.createElement("div");
  div.innerHTML = `

        <div
            class="flex flex-col justify-center text-white items-center 
            rounded-2xl bg-linear-65 from-strong-black to-strong-paars shadow-xs  px-4 py-2.5  gap-5">
            <div class="w-20 h-20">
                <img src="../images/orderd.svg" alt="" class="w-full h-full">
            </div>
            <div class="flex flex-col justify-center items-center ">
                <p class="font-semibold text-3xl px-4 py-2.5 ">Hi User</p>
                <p class="text-xl px-4 py-2.5 ">Your order has been placed</p>
                <div class="bg-strong-red px-4 py-2.5 rounded-2xl font-semibold">
                    <a href="index.html">Terug naar Home page</a>
                </div>
            </div>
        </div>

    `;
  return div;
};
const createOrderdButoon = () => {
  let order = document.createElement("div");
  order.className = "w-max rounded-3xl overflow-hidden mt-10 ";
  order.innerHTML = `
     <button class="flex items-center gap-4 px-6 py-3 bg-linear-to-r cursor-pointer 
     from-strong-black to-strong-paars shadow-md">
    <div class="w-8 h-8">
      <img src="../images/orderd.svg" alt="order icon" class="w-full h-full">
    </div>
    <span class="text-white font-semibold text-lg">Place Order</span>
  </button>
    
    `;

  order.addEventListener("click", () => {
    let container = document.querySelector(".tabel-container");

    let clear = document.querySelector(".clear");
    let tabel = container.querySelector(".tabel");
    order.remove();
    tabel.remove();
    clear.remove();
    tabel.innerHTML = "";
    const createOrder = createOrderdNotifiction();
    container.append(createOrder);
    createOrder.style.position = "fixed";
    createOrder.style.top = "50%";
    createOrder.style.left = "50%";
    createOrder.style.zIndex = "100";
    createOrder.style.transform = "translate(-50% , -50%)";
    let orderdData2 = JSON.parse(localStorage.getItem("clothesData"));

    let buyData = {
      orderId: Date.now(),
      orderDate: new Date().toLocaleString("nl-NL", {
        timeZone: "Europe/Amsterdam",
      }),
      items: orderdData2,
    };

    orderdData.push(buyData);
    localStorage.setItem("orderdData", JSON.stringify(orderdData));

    localStorage.removeItem("clothesData");
    clothes.length = 0;
    productsTabel();
  });
  return order;
};

const productsTabel = () => {
  let container = document.getElementById("tabel-admin");
  let data = JSON.parse(localStorage.getItem("orderdData"));

  if (data && container) {
    console.log(data.items);
    let headData = ["Titel", "Totaal", "Datu en Tijd"];
    let tabel = document.createElement("table");
    tabel.className =
      "min-w-full border text-center  table-fixed text-[12px] sm:text-base tabel";
    let trThead = document.createElement("tr");

    headData.forEach((item) => {
      let th = document.createElement("th");
      th.className = "px-4 py-2 break-words max-w-[120px]";
      th.textContent = item;
      trThead.append(th);
    });

    trThead.className = "p-3";

    tabel.append(trThead);

    for (const order of data) {
      let trThead = document.createElement("tr");
      let tdhead = document.createElement("td");
      tdhead.setAttribute("colspan", 3);
      tdhead.className =
        "text-left pt-5 sm:pl-10 pl-3 md:pl-20 lg:pl-52  font-semibold";
      tdhead.textContent = `Order id ${order.orderId}`;
      trThead.append(tdhead);
      tabel.append(trThead);
      for (const item of order.items) {
        let trTbody = document.createElement("tr");
        const rowOrder = ["productTitel", "total", "purchasedDate"];

        console.log(item);
        let prices = ["total"];

        rowOrder.forEach((key) => {
          let td = document.createElement("td");
          td.className = "px-4 py-2 break-words";

          let currency = "";
          if (prices.includes(key)) {
            currency = `€`;
            td.textContent = `${currency}${item[key]}`;
          } else {
            td.textContent = `${item[key]}`;
          }
          trTbody.append(td);
        });
        tabel.append(trTbody);
      }
      container.append(tabel);
    }
  }
};

const createJson = () => {
  let containerPlus = document.createElement("div");
  containerPlus.className =
    "flex justify-between items-center w-full px-10 py-10";
  containerPlus.innerHTML = `
            <div class="border-2 border-black p-3 rounded-2xl json cursor-pointer">Lees JSON</div>
            
        <div class="flex gap-6 justify-center items-center">
        <div class="w-10 h-10">
        <a href="addProducts.html" target="_blank">
            <img src="../../images/plus.svg" alt=""  class="w-full h-full cursor-pointer">
            </a>
         </div>
         <div class="">
        <a href="adminOrders.html" target="_blank" class="w-full h-full 
        font-semibold bg-strong-red text-white p-3 rounded-xl">Orders</a>
         </div>
        </div>
    `;
  return containerPlus;
};

const AddJson = async () => {
  let json = document.querySelector(".json");
  json.addEventListener("click", async () => {
    const data = await fetchData();
    data.forEach((pro) => {
      pro.productId = crypto.randomUUID();
    });
    localStorage.setItem("products", JSON.stringify(data));
    productsTabelPage();
  });
};

const productsTabelPage = () => {
  let tabel = document.createElement("table");
  let container = document.querySelector(".products-tabel");
  if (!container) {
    return;
  }
  container.innerHTML = "";
  let data = JSON.parse(localStorage.getItem("products"));
  if (data.length === 0) {
    tabel.remove();
    tabel.innerHTML = "";
  }
  console.log(data);

  const headNames = ["Title", "Naam", "Prijs", "Options"];
  tabel.className =
    "min-w-full  border  table-autos text-[12px] sm:text-base tabel";

  let trThead = document.createElement("tr");
  headNames.forEach((head) => {
    let th = document.createElement("th");
    th.className = "px-4 py-2 ";
    th.textContent = head;
    trThead.append(th);
  });
  trThead.className = "p-3";

  tabel.append(trThead);

  for (const item of data) {
    let trTbody = document.createElement("tr");

    const rowOrder = ["title", "title", "price"];
    rowOrder.forEach((key) => {
      let td = document.createElement("td");
      td.className = "px-4 py-2 break-words  text-left";
      if (key === "price") {
        td.className = " py-2";
        td.innerHTML = `<span>€</span> ${item[key].toFixed(2)}`;
      } else {
        td.textContent = item[key];
      }
      trTbody.append(td);
    });
    let tdActie = document.createElement("td");

    tdActie.className = "px-4 py-2 flex gap-2 justify-center ";
    let buttonRemove = document.createElement("button");
    buttonRemove.textContent = "Remove";
    buttonRemove.dataset.id = item.productId;
    buttonRemove.className =
      "remove p-5 py-1 bg-red-600 text-white rounded-lg cursor-pointer";
    tdActie.append(buttonRemove);

    tdActie.className = "px-4 py-2 flex gap-2 justify-center";
    let buttonEdit = document.createElement("p");
    buttonEdit.href = "editProducts.html";
    buttonEdit.textContent = "Edit";
    buttonEdit.dataset.id = item.productId;
    buttonEdit.className =
      "edit p-5 py-1 bg-blue-600 text-white rounded-lg cursor-pointer";
    tdActie.append(buttonEdit);

    trTbody.append(tdActie);

    tabel.append(trTbody);
  }

  tabel.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      const id = e.target.dataset.id;
      data = data.filter((da) => da.productId !== id);
      localStorage.setItem("products", JSON.stringify(data));
      productsTabelPage();
      showCards();
    }

    if (e.target.classList.contains("edit")) {
      const id = e.target.dataset.id;
      let editProduct = data.find((da) => da.productId === id);
      console.log(editProduct);

      localStorage.setItem("editProduct", JSON.stringify(editProduct));
      window.location.href = "editProducts.html";
    }
  });
  container.append(createJson());
  container.append(tabel);
  AddJson();
};

const addProducts = () => {
  let save = document.getElementById("save");
  if (!save) return;
  save.addEventListener("click", (e) => {
    e.preventDefault();
    let naam = document.getElementById("naam").value;
    let prijs = Number(document.getElementById("prijs").value);
    let img = document.getElementById("image").value;

    let data = JSON.parse(localStorage.getItem("products"));
    console.log(data);

    data.push({
      title: naam,
      price: prijs,
      image: img,
      id: data.length + 1,
      productId: crypto.randomUUID(),
    });
    console.log(data);
    localStorage.setItem("products", JSON.stringify(data));
    productsTabelPage();
    showCards();
    window.location.href = "index.html";
  });
  let previewContainer = document.getElementById("preview-img");

  let preview = document.getElementById("preview");
  preview.addEventListener("click", (e) => {
    previewContainer.innerHTML = "";
    let img2 = document.getElementById("image").value;
    let createImg = document.createElement("img");
    createImg.src = img2;
    previewContainer.append(createImg);
  });
};

const editProducts = () => {
  let naam = document.getElementById("naam-edit");
  let prijs = document.getElementById("prijs-edit");
  let img = document.getElementById("image-edit");
  let saveBtn = document.getElementById("save-edit");
  let previewBtn = document.getElementById("preview-edit");
  let previewContainer = document.getElementById("preview-img-edit");

  const product = JSON.parse(localStorage.getItem("products"));
  const pro = JSON.parse(localStorage.getItem("editProduct"));
  if (!pro) return;
  const index = product.findIndex((p) => p.productId === pro.productId);

  naam.value = product[index].title;
  prijs.value = product[index].price;
  img.value = product[index].image;

  previewBtn.addEventListener("click", () => {
    previewContainer.innerHTML = "";
    const createImg = document.createElement("img");
    createImg.src = img.value;
    createImg.className = "w-32 h-32 object-contain mt-2";
    previewContainer.append(createImg);
  });

  saveBtn.addEventListener("click", () => {
    product[index].title = naam.value;
    product[index].price = Number(prijs.value);
    product[index].image = img.value;

    localStorage.setItem("products", JSON.stringify(product));
    localStorage.removeItem("editProduct");
    window.location.href = "index.html";
  });
};
document.addEventListener("DOMContentLoaded", () => {
  showCards();
  productsTabelPage();
  CreateTabel();
  productsTabel();
  addProducts();
  toggleHamMenu();
});
document.addEventListener("DOMContentLoaded", () => {
  editProducts();
});
