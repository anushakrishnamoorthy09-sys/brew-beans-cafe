const galleryButtons = document.querySelectorAll(".gallery-btn");
const galleryCards = document.querySelectorAll(".gallery-card");

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {

    // Remove active class
    galleryButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class
    button.classList.add("active");

    const filter = button.dataset.filter;

    galleryCards.forEach((card) => {
      const category = card.dataset.category;

      if (filter === "all" || category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});