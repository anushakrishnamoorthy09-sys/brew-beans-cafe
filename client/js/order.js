const addButtons = document.querySelectorAll(".add-btn");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const placeOrderBtn = document.getElementById("placeOrderBtn");
console.log("Order JS Loaded");

window.cart =
  JSON.parse(localStorage.getItem("cart")) || [];
updateCart();

// Display Cart
function displayCart() {
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");

    li.innerHTML = `
      ${item.name} - ₹${item.price}
      <button class="remove-btn" data-index="${index}">
        ❌
      </button>
    `;

    cartItems.appendChild(li);
  });

  totalPrice.textContent = total;

  localStorage.setItem("cart", JSON.stringify(cart));

  addRemoveEvents();
}

// Add Items
addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = {
      name: button.dataset.name,
      price: Number(button.dataset.price)
    };

    cart.push(item);
    displayCart();
  });
});

// Remove Items
function addRemoveEvents() {
  const removeButtons =
    document.querySelectorAll(".remove-btn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;

      cart.splice(index, 1);
      displayCart();
    });
  });
}

// Place Order
placeOrderBtn.addEventListener("click", () => {

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("🎉 Order placed successfully!");

  cart = [];
  displayCart();
});

// Load cart when page opens
displayCart();