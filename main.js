
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[data-page]");
  const pages = document.querySelectorAll(".page");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.page;

      pages.forEach((page) => {
        page.classList.toggle("active", page.id === target);
      });

      buttons.forEach((item) => {
        item.classList.toggle("active", item === button);
      });
    });
  });
});
