const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";

for (let i = 0; i < openEls.length; i++) {
  var el = openEls[i];
  el.addEventListener("click", function () {
    const modalId = this.getAttribute("data-open");
    document.getElementById(modalId).classList.add(isVisible);
  });
}

for (let i = 0; i < openEls.length; i++) {
  var el = openEls[i];
  el.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

document.addEventListener("click", (e) => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

document.addEventListener("keyup", (e) => {
  // if we press the ESC
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});
