let contenedorCards = document.getElementById("contenedor-cards");
let contenedorSelect = document.getElementById("contenedor-select");
let searchBar = document.getElementById("searchBar");
let select = document.getElementById("pet-items-select");
let aplicado = {};

function htmlCarta(array) {
  contenedorCards.innerHTML += `
     <div class="card" data-aos="fade-up">
        <img src="${array.imagen}" class="card-img-top images" alt="${array.nombre}"/>
        <div class="category-div">
          <span class="tag tag-teal">${array.tipo}</span>
        </div>
        <div class="card-body">
          <h5 class="titlee">${array.nombre}</h5>
          <p>Price: ${array.precio}</p>
          <p class="card-description">
            ${array.descripcion}
          </p>
          <a><button class="btn-comprar card-button" onclick="apreta('${array._id}')">
            <img
              class="btn-comprar-img"
              src="../assets/img/carritoBtn.png"
              height="30px"
              alt="huellita"
            />
          </button></a>
          <a><button class="movile-button" onclick="apreta('${array._id}')"><img
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
    <div class="card" data-aos="fade-up">
       <img src="${array.imagen}" class="card-img-top images" alt="${array.nombre}"/>
       <div class="category-div">
         <span class="tag tag-teal">${array.tipo}</span>
       </div>
       <div class="card-body">
         <h5 class="titlee">${array.nombre}</h5>
         <p>Price: ${array.precio}</p>
         <p class="card-description"> ${array.descripcion}</p>
         <p class="card-text">
           ! Ultimas Unidades !
         </p>
         <a><button class="btn-comprar card-button" onclick="apreta('${array._id}')">
           <img
             class="btn-comprar-img"
             src="../assets/img/carritoBtn.png"
             height="30px"
             alt="huellita"
           />
         </button>
         <a><button class="movile-button" onclick="apreta('${array._id}')"><img
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
    let juguetes = data.filter((e) => e.tipo === "Medicamento");
    imprimir(condicionStockMayor(juguetes), condicionPocoStock(juguetes));
    searchBar.addEventListener("keyup", (evento) => {
      let escribir = filtrarFn("datoPorSearchBar",evento.target.value,juguetes);
      escribir.forEach(e=>(e.stock<=3)?htmlCartaPocoStock(e):htmlCarta(e))
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

let array=[]

function apreta(obj){

  async function capturar1(){
    try{
      let api = await fetch("https://apipetshop.herokuapp.com/api/articulos");
      let data = await api.json();
      data = data.response;
      array=array.concat(data.filter(e=>e._id.includes(obj)))
      localStorage.setItem("Medicamentos",JSON.stringify(array))
    }
    catch(error){
      console.log(error)
    }
  }
  capturar1()

  Toastify({
    text: "Agregado al carrito",
    className: "info",
    gravity: "top",
    position: "right",
    duration: 1500,
    close: true,
    style: {
      background: "linear-gradient(to left, #f28f16 0%, #eb466b 100%)",
    }
  }).showToast();
  
}
