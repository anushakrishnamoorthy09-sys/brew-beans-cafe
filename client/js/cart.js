console.log("Cart JS Loaded");

// Load cart from localStorage
window.cart = JSON.parse(localStorage.getItem("cart")) || [];

// ----------------------
// Add Item to Cart
// ----------------------
function addToCart(name, price) {

  const existingItem = window.cart.find(
    item => item.name === name
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    window.cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  localStorage.setItem(
    "cart",
    JSON.stringify(window.cart)
  );

  updateCart();

showToast(`${name} added to cart`);
}

// ----------------------
// Update Cart
// ----------------------
function updateCart() {

  const cartItems = document.getElementById("cartItems");
  const total = document.getElementById("total");

  if (!cartItems || !total) return;

  cartItems.innerHTML = "";

  let totalPrice = 0;

  window.cart.forEach((item, index) => {

    totalPrice += item.price * item.quantity;

    cartItems.innerHTML += `
      <li class="cart-item">

        <div class="cart-info">
          <strong>${item.name}</strong><br>
          ₹${item.price} × ${item.quantity}
        </div>

        <div class="cart-actions">

          <button onclick="decreaseQty(${index})">
            −
          </button>

          <button onclick="increaseQty(${index})">
            +
          </button>

          <button
            class="remove-btn"
            onclick="removeItem(${index})">
            🗑
          </button>

        </div>

      </li>
    `;

  });

  total.innerText = totalPrice;

  localStorage.setItem(
    "cart",
    JSON.stringify(window.cart)
  );

}

// ----------------------
// Remove Item
// ----------------------
function removeItem(index) {

  window.cart.splice(index, 1);

  localStorage.setItem(
    "cart",
    JSON.stringify(window.cart)
  );

  updateCart();

}

// ----------------------
// Increase Quantity
// ----------------------
function increaseQty(index) {

  window.cart[index].quantity++;

  localStorage.setItem(
    "cart",
    JSON.stringify(window.cart)
  );

  updateCart();

}

// ----------------------
// Decrease Quantity
// ----------------------
function decreaseQty(index) {

  if (window.cart[index].quantity > 1) {

    window.cart[index].quantity--;

  } else {

    removeItem(index);
    return;

  }

  localStorage.setItem(
    "cart",
    JSON.stringify(window.cart)
  );

  updateCart();

}

// ----------------------
// Make Functions Global
// ----------------------
window.addToCart = addToCart;
window.removeItem = removeItem;
window.increaseQty = increaseQty;
window.decreaseQty = decreaseQty;

// ----------------------
// Load Cart on Page Load
// ----------------------
updateCart();
function showToast(message){

const toast=document.getElementById("toast");

toast.innerText=message;

toast.style.display="block";

setTimeout(()=>{
toast.style.display="none";
},2000);

}