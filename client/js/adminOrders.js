const container =
  document.getElementById(
    "ordersContainer"
  );

const totalSales =
  document.getElementById(
    "totalSales"
  );

const searchInput =
  document.getElementById(
    "searchInput"
  );

let allOrders = [];

async function loadOrders() {
  try {

    const response =
      await fetch(
        "https://brew-beans-api.onrender.com/api/orders"
      );

    allOrders =
      await response.json();

    displayOrders(allOrders);

  } catch (error) {
    console.error(error);
  }
}

function displayOrders(orders) {

  container.innerHTML = "";

  let sales = 0;

  orders.forEach((order) => {

    sales += Number(
      order.total_amount
    );

    container.innerHTML += `
      <div class="order-card">

        <h3>
          ${order.customer_name}
        </h3>

        <p>
          Email:
          ${order.customer_email}
        </p>

       <p>Total: ₹${order.total_amount}</p>

<p>
  Status:
  <select
    onchange="changeStatus(
      ${order.id},
      this.value
    )"
  >
    <option
      value="Pending"
      ${
        order.status === "Pending"
          ? "selected"
          : ""
      }
    >
      Pending
    </option>

    <option
      value="Preparing"
      ${
        order.status === "Preparing"
          ? "selected"
          : ""
      }
    >
      Preparing
    </option>

    <option
      value="Completed"
      ${
        order.status === "Completed"
          ? "selected"
          : ""
      }
    >
      Completed
    </option>
  </select>
</p>

        <pre>
${JSON.stringify(
  order.items,
  null,
  2
)}
        </pre>

        <button
          onclick="deleteOrder(${order.id})"
        >
          Delete Order
        </button>

      </div>
    `;
  });

  totalSales.innerText =
    sales;
}

searchInput.addEventListener(
  "input",
  () => {

    const value =
      searchInput.value
        .toLowerCase();

    const filtered =
      allOrders.filter(
        (order) =>
          order.customer_name
            .toLowerCase()
            .includes(value)
      );

    displayOrders(filtered);
  }
);

async function deleteOrder(id) {

  try {

    await fetch(
      `https://brew-beans-api.onrender.com/api/orders/${id}`,
      {
        method: "DELETE"
      }
    );

    loadOrders();

  } catch (error) {
    console.error(error);
  }
}

loadOrders();
async function changeStatus(
  id,
  status
) {
  try {

    await fetch(
      `https://brew-beans-api.onrender.com/api/orders/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          status
        })
      }
    );

    loadOrders();

  } catch (error) {
    console.error(error);
  }
}