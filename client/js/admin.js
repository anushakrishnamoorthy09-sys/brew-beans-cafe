async function loadReservations() {
  const response = await fetch(
    "http://localhost:5000/api/reservations"
  );

  const reservations =
    await response.json();

  const tableBody =
    document.getElementById("tableBody");

  const total =
    document.getElementById("totalReservations");

  tableBody.innerHTML = "";

  total.innerText =
    reservations.length;

  reservations.forEach((r) => {
    tableBody.innerHTML += `
      <tr>
        <td>${r.name}</td>
        <td>${r.email}</td>
        <td>${r.phone}</td>
        <td>${r.reservation_date}</td>
        <td>${r.reservation_time}</td>
        <td>${r.guests}</td>
        <td>
          <button
            onclick="deleteReservation(${r.id})">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}
async function deleteReservation(id) {

  const response =
    await fetch(
      `http://localhost:5000/api/reservations/${id}`,
      {
        method: "DELETE"
      }
    );

  if (response.ok) {
    loadReservations();
  }
}

loadReservations();
document
  .getElementById("search")
  .addEventListener(
    "input",
    function () {

      const search =
        this.value.toLowerCase();

      const rows =
        document.querySelectorAll(
          "#tableBody tr"
        );

      rows.forEach((row) => {
        const name =
          row.children[0]
            .textContent
            .toLowerCase();

        row.style.display =
          name.includes(search)
            ? ""
            : "none";
      });
    }
  );