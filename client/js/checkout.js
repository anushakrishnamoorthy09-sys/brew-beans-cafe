const checkoutForm = document.getElementById("checkoutForm");
const orderMessage = document.getElementById("orderMessage");

checkoutForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  if (window.cart.length === 0) {
    orderMessage.innerText = "Your cart is empty!";
    return;
  }

  // Calculate Total
  let totalAmount = 0;

  window.cart.forEach((item) => {
    totalAmount += item.price * item.quantity;
  });

  // Order Data
  const orderData = {
    customer_name: document.getElementById("customerName").value,
    customer_email: document.getElementById("customerEmail").value,
    items: window.cart,
    total_amount: totalAmount
  };

  try {

    const response = await fetch(
      "https://brew-beans-api.onrender.com/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      }
    );

    const data = await response.json();

    if (response.ok) {

      const receiptModal =
        document.getElementById("receiptModal");

      const receiptContent =
        document.getElementById("receiptContent");

      receiptContent.innerHTML = `

        <h2 style="text-align:center;">
          ☕ Brew & Beans
        </h2>

        <hr>

        <h3 style="text-align:center;">
          Order Receipt
        </h3>

        <p>
          <strong>Receipt No:</strong>
          BB${Math.floor(Math.random() * 9000 + 1000)}
        </p>

        <p>
          <strong>Date:</strong>
          ${new Date().toLocaleString()}
        </p>

        <p>
          <strong>Customer:</strong>
          ${orderData.customer_name}
        </p>

        <hr>

        ${window.cart.map(item => `

          <p>
            ${item.name} × ${item.quantity}
            <span style="float:right;">
              ₹${item.price * item.quantity}
            </span>
          </p>

        `).join("")}

        <hr>

        <h3>
          Total
          <span style="float:right;">
            ₹${totalAmount}
          </span>
        </h3>

        <br>

        <p>
          💵 <strong>Payment:</strong> Pay at the Counter
        </p>

        <p>
          ⏱ <strong>Estimated Time:</strong> 10–15 Minutes
        </p>

        <br>

        <p style="text-align:center;">
          ❤️ Thank You for Visiting Brew & Beans ❤️
        </p>

      `;

      receiptModal.style.display = "block";

      // Clear Cart
      window.cart = [];
      localStorage.removeItem("cart");
      updateCart();
      checkoutForm.reset();

    } else {

      orderMessage.innerText = data.message;

    }

  } catch (error) {

    console.error(error);
    orderMessage.innerText = "❌ Server Error";

  }

});

// Close Receipt
document.getElementById("closeReceipt").onclick = function () {
  document.getElementById("receiptModal").style.display = "none";
};

// Print Receipt
document.getElementById("printReceipt").onclick = function () {
  window.print();
};