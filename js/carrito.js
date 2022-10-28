let cartItemContainer = document.getElementsByClassName("cart-items")[0];
let cartRows = cartItemContainer.getElementsByClassName("cart-row");
let productosTienda = JSON.parse(localStorage.getItem("productos"));
let productosMedicamentos = JSON.parse(localStorage.getItem("Medicamentos"));

console.log(productosTienda);

function htmlCarta(array) {
  cartItemContainer.innerHTML += `<div class="cart-row d-flex">
    <div class="cart-item cart-column">
      <img class="cart-item-image" src="${array.imagen}" width="100" height="100">
      <span class="cart-item-title">${array.nombre}</span>
    </div>
    <span class="cart-price cart-column">${array.precio}</span>
    <div class="cart-quantity cart-column">
      <input max="${array.stock}" class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button" onclick="removeFromLocal('${array._id}')">REMOVE</button>
    </div>
  </div>`;
}

productosTienda.forEach((element) => htmlCarta(element));
productosMedicamentos.forEach((element) => htmlCarta(element));
updateCartTotal();

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  let removeCartItemButtons = document.getElementsByClassName("btn-danger");
  console.log(removeCartItemButtons);
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  let quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);

  }
  let purchaseButton = document.getElementById('btn-purchase')
  purchaseButton.addEventListener('click', purchaseCliked)

  let btnRemoveAll = document.getElementById('btn-remove-all')
  btnRemoveAll.addEventListener('click', removeAllItems)
  console.log(btnRemoveAll)

}

function purchaseCliked(){
    Swal.fire({
        title: 'Gracias!',
        text: 'Tu compra ayuda a muchos animales!',
        imageUrl: '../assets/img/bulldog-ingles-perro-pura-sangre-sobre-fondo-amarillo-copiar-espacio_666637-199.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
      let cartItems = document.getElementsByClassName('cart-items')[0]
      while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
      }
      localStorage.removeItem('productos')
      localStorage.removeItem('Medicamentos')
        updateCartTotal()
}

function removeAllItems(){
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
    }
    localStorage.removeItem('productos')
    localStorage.removeItem('Medicamentos')
      updateCartTotal()
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function removeFromLocal(id) {

    let index= productosTienda.findIndex((element) => element._id === id);
    let index2=productosMedicamentos.findIndex((element) => element._id === id);
    productosTienda.splice(index,1)
    productosMedicamentos.splice(index2,1)
    let borrado=JSON.stringify(productosTienda)
    let borrado2=JSON.stringify(productosMedicamentos)
    localStorage.setItem("productos",borrado)
    localStorage.setItem("Medicamentos",borrado2)
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function updateCartTotal() {
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    console.log(priceElement, quantityElement);
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}


