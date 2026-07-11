document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector(".site-nav");
const header = document.querySelector("[data-header]");

function closeMenu() {
  if (!menuButton) return;
  menuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

menuButton?.addEventListener("click", () => {
  const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(willOpen));
  document.body.classList.toggle("menu-open", willOpen);
});

siteNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
    closeMenu();
    menuButton?.focus();
  }
});

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -5%" });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
