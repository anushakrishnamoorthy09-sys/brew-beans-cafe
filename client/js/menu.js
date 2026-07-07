const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    menuCards.forEach((card) => {
      const category = card.dataset.category;

      if (filter === "all" || category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});