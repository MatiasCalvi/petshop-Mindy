let contenedorCards=document.getElementById("contenedor-cards")
let contenedorSelect=document.getElementById("contenedor-select")
let searchBar=document.getElementById("searchBar")

function htmlCard(array){
    contenedorCards.innerHTML+=`
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
          <a href=""><button class="movile-button"> <img
          class="btn-comprar-img"
          src="../assets/img/carritoBtn.png"
          height="30px"
          alt="huellita"
        /></button></a>
        </div>
      </div> 
      `
}

function htmlCardPocoStock(array){
    contenedorCards.innerHTML+=`
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
           POCO STOCK
         </p>
         <button class="btn-comprar card-button">
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
     `
}

function printHtml(arraySuperior,arrayInferior){
    arraySuperior.forEach((e)=> htmlCard(e));
    arrayInferior.forEach((e)=> htmlCardPocoStock(e))
}

function condicionPocoStock(array){
    array=array.filter(e=>e.stock<=3)
    return array
}

function condicionStockMayor(array){
    array=array.filter(e=>e.stock>3)
    return array
}

function searchBarfn(evento,array){
    contenedorCards.innerHTML=""
    array = array.filter((event) =>
        event.name.toLowerCase().includes(evento.target.value.toLowerCase())
    );
}

async function capturar(){
    try{
        let api= await fetch("https://apipetshop.herokuapp.com/api/articulos");
        var data= await api.json();
        data=data.response;
        let farmacia=data.filter(e=>e.tipo==="Medicamento")
        printHtml(condicionStockMayor(farmacia),condicionPocoStock(farmacia))
        searchBar.addEventListener("keyup",(evento)=>{
            let busqueda=farmacia.filter(card=>card.nombre.toLowerCase().includes(evento.target.value))
            contenedorCards.innerHTML=""
            busqueda.forEach(e=>htmlCard(e))
            if(busqueda.length === 0){
                contenedorCards.innerHTML =` 
                <div style="min-height:50vh;">
                   <img class="error"  height="400"width="350" src="../assets/img/404.png" alt="page not found">
                </div>
                `
            }
        })   
    }
    catch(error){
        console.log(error)
    }
}
capturar() 
