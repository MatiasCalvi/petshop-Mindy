let contenedorCards = document.getElementById("contenedor-cards");
let contenedorSelect = document.getElementById("contenedor-select");
let searchBar = document.getElementById("searchBar");
let select = document.getElementById("pet-items-select");
let aplicado = {};

function htmlCarta(array) {
  contenedorCards.innerHTML += `
     <div class="card" style="width: 16rem" data-aos="fade-up">
        <img
          src="${array.imagen}"
          class="card-img-top images"
          alt="${array.nombre}"
        />
        <div class="category-div">
          <span class="tag tag-teal">${array.tipo}</span>
        </div>
        <div class="card-body">
          <h5 class="titlee">${array.nombre}</h5>
          <p>Price: ${array.precio}</p>
          <p class="card-text">
            ${array.descripcion}
          </p>
          <button class="btn-comprar card-button">
            <img
              class="btn-comprar-img"
              src="../assets/img/carritoBtn.png"
              height="30px"
              alt="huellita"
            />
          </button>
          <a href=""><button class="movile-button">   <img
          class="btn-comprar-img"
          src="../assets/img/carritoBtn.png"
          height="30px"
          alt="huellita"
        /></button></a>
        </div>
      </div> 
      `;
}

function htmlCartaPocoStock(array) {
  contenedorCards.innerHTML += `
    <div class="card" style="width: 16rem" data-aos="fade-up">
       <img
         src="${array.imagen}"
         class="card-img-top images"
         alt="${array.nombre}"
       />
       <div class="category-div">
         <span class="tag tag-teal">${array.tipo}</span>
       </div>
       <div class="card-body">
         <h5 class="titlee shop-item-title">${array.nombre}</h5>
         <p>Price: ${array.precio}</p>
         <p class="card-text">
           POCO STOCK
         </p>
         <button id="${array._id}" onClick="agregarProducto('${array._id}') class="btn-comprar card-button">
           <img
             class="btn-comprar-img"
             src="../assets/img/carritoBtn.png"
             height="30px"
             alt="huellita"
           />
         </button>
         <a href=""><button class="movile-button"><img
         class="btn-comprar-img"
         src="../assets/img/carritoBtn.png"
         height="30px"
         alt="huellita"
       /></button></a>
       </div>
     </div> 
     `;
}

function imprimir(arraySuperior, arrayInferior) {
  arraySuperior.forEach((e) => htmlCarta(e));
  arrayInferior.forEach((e) => htmlCartaPocoStock(e));
}

function condicionPocoStock(array) {
  array = array.filter((e) => e.stock <= 3);
  return array;
}

function condicionStockMayor(array) {
  array = array.filter((e) => e.stock > 3);
  return array;
}

function searchBarfn(evento, array) {
  contenedorCards.innerHTML = "";
  array = array.filter((event) =>
    event.name.toLowerCase().includes(evento.target.value.toLowerCase())
  );
}

function filtrarFn(especialidad, valor, array) {
  
  aplicado[especialidad] = valor;

  contenedorCards.innerHTML = "";

  for (let dato in aplicado) {
    if (dato === "datoPorSearchBar") {
      array = array.filter((card) =>
        card.nombre.toLowerCase().includes(aplicado[dato].toLowerCase())
      );
    }

    if (dato === "datoPorSelect") {
      if (aplicado["datoPorSelect"] == 1) {
        array = array.filter((card) => card.precio <= 500);
      } 
      if(aplicado["datoPorSelect"] == 2){
        array = array.filter((card) => card.precio > 500);
      }
      if(aplicado["datoPorSelect"] == 3){
         return array
      }
    }
    if(array.length=== 0){
      contenedorCards.innerHTML= contenedorCards.innerHTML =` 
      <div style="min-height:50vh;">
         <img class="error"  height="400"width="350" src="../assets/img/404.png" alt="page not found">
      </div>
      `
    }
  }
  return array;
}

async function capturar() {
  try {
    let api = await fetch("https://apipetshop.herokuapp.com/api/articulos");
    var data = await api.json();
    data = data.response;
    let juguetes = data.filter((e) => e.tipo === "Juguete");
    imprimir(condicionStockMayor(juguetes), condicionPocoStock(juguetes));
    searchBar.addEventListener("keyup", (evento) => {
      let escribir = filtrarFn("datoPorSearchBar",evento.target.value,juguetes);
      escribir.forEach(e=>(e.stock<=3)?htmlCartaPocoStock(e):htmlCarta(e))
      console.log(escribir)
    });
    select.addEventListener("change", (evento) => {
      let seleccionar = filtrarFn("datoPorSelect",evento.target.value,juguetes);
      seleccionar.forEach(e=>(e.stock<=3)?htmlCartaPocoStock(e):htmlCarta(e))
    });
  } catch (error) {
    console.log(error);
  }
}
capturar();
/* 
  let addToCartButtons = document.getElementsByClassName('btn-comprar')
  for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
  }

  function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    console.log(title)
  }


  console.log(juguetes) */


  const clickButton = document.getElementsByClassName('btn-comprar').forEach((x)=>{
    x.addEventListener('click', console.log('se apreto porfa dime'))
  })
