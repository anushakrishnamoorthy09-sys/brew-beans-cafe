const checkoutForm =
  document.getElementById(
    "checkoutForm"
  );

const orderMessage =
  document.getElementById(
    "orderMessage"
  );

checkoutForm.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    if (window.cart.length === 0) {
      orderMessage.innerText =
        "Your cart is empty!";
      return;
    }

    let totalAmount = 0;

    window.cart.forEach((item) => {
      totalAmount += item.price;
    });

    const orderData = {
      customer_name:
        document.getElementById(
          "customerName"
        ).value,

      customer_email:
        document.getElementById(
          "customerEmail"
        ).value,

      items: window.cart,

      total_amount:
        totalAmount
    };

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/orders",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json"
            },
            body:
              JSON.stringify(
                orderData
              )
          }
        );

      const data =
        await response.json();

      if (response.ok) {

        orderMessage.innerText =
          "✅ Order placed successfully!";

        window.cart = [];

        localStorage.removeItem(
          "cart"
        );

        updateCart();

        checkoutForm.reset();

      } else {

        orderMessage.innerText =
          data.message;
      }

    } catch (error) {

      console.error(error);

      orderMessage.innerText =
        "❌ Server Error";
    }
  }
);