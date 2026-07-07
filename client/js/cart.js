console.log("Cart JS Loaded");

window.cart =
  JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  window.cart.push({
    name,
    price
  });

  localStorage.setItem(
    "cart",
    JSON.stringify(window.cart)
  );

  updateCart();

  alert(`${name} added to cart`);
}

function updateCart() {
  const cartItems =
    document.getElementById("cartItems");

  const total =
    document.getElementById("total");

  if (!cartItems || !total) {
    console.log("Cart elements not found");
    return;
  }

  cartItems.innerHTML = "";

  let totalPrice = 0;

  window.cart.forEach((item) => {
    cartItems.innerHTML += `
      <li>${item.name} - ₹${item.price}</li>
    `;

    totalPrice += item.price;
  });

  total.innerText = totalPrice;
}

window.addToCart = addToCart;

updateCart();