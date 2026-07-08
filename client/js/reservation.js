const form = document.getElementById("reservationForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const reservationData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    reservation_date: document.getElementById("date").value,
    reservation_time: document.getElementById("time").value,
    guests: document.getElementById("guests").value,
    special_requests: document.getElementById("requests").value
  };

  try {

    const response = await fetch(
      "https://brew-beans-api.onrender.com/api/reservations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reservationData)
      }
    );

    const data = await response.json();

    if (response.ok) {

      const reservationId =
        "BBR" + Math.floor(Math.random() * 9000 + 1000);

      message.innerHTML = `

      <div class="booking-success">

        <h2>🎉 Reservation Confirmed</h2>

        <hr>

        <p>
          <strong>Reservation ID:</strong>
          ${reservationId}
        </p>

        <p>
          <strong>Customer:</strong>
          ${reservationData.name}
        </p>

        <p>
          <strong>Date:</strong>
          ${reservationData.reservation_date}
        </p>

        <p>
          <strong>Time:</strong>
          ${reservationData.reservation_time}
        </p>

        <p>
          <strong>Guests:</strong>
          ${reservationData.guests}
        </p>

        <hr>

        <p>
          ✅ Your table has been successfully reserved.
        </p>

        <p>
          Please arrive 10 minutes before your reservation time.
        </p>

        <p>
          We look forward to serving you at
          <strong>Brew & Beans ☕</strong>
        </p>

      </div>

      `;

      form.reset();

    } else {

      message.innerHTML = `
      <div class="booking-error">
        ❌ ${data.message || "Failed to reserve table."}
      </div>
      `;

    }

  } catch (error) {

    console.error(error);

    message.innerHTML = `
    <div class="booking-error">
      ❌ Server Error. Please try again later.
    </div>
    `;

  }

});