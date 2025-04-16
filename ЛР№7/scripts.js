// Гортання товарів
let currentIndex = 0;
const productsWrapper = document.querySelector(".catalog-container");
const swipeLeft = document.querySelector(".swipe_left");
const swipeRight = document.querySelector(".swipe_right");

swipeLeft?.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    productsWrapper.scrollBy({ left: -290, behavior: "smooth" });
  }
});

swipeRight?.addEventListener("click", () => {
  if (currentIndex < 4) {
    currentIndex++;
    productsWrapper.scrollBy({ left: 290, behavior: "smooth" });
  }
});

// Збільшення зображення
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal-content");
const closeModal = document.querySelector(".modal-close");

productsWrapper?.addEventListener("click", function (e) {
  if (e.target.classList.contains("product-img")) {
    modal.style.display = "flex";
    modalImg.src = e.target.src;
  }
});

closeModal?.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});