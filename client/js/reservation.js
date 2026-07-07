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
    special_requests:
      document.getElementById("requests").value
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
      message.innerText =
        "✅ Reservation booked successfully!";
      form.reset();
    } else {
      message.innerText =
        data.message || "❌ Failed to book reservation.";
    }

  } catch (error) {
    console.error(error);
    message.innerText =
      "❌ Server Error. Please try again.";
  }
});