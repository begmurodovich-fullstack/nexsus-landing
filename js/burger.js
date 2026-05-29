document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");
  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-open", open);
    // add class on toggle for hamburger -> X animation
    toggle.classList.toggle("open", open);
  });

  // Close when clicking a link
  nav
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeNav));

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar")) closeNav();
  });

  // Close when resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeNav();
  });

  // Prevent background scroll when nav is open (small devices)
  const observer = new MutationObserver(() => {
    if (nav.classList.contains("open")) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  });
  observer.observe(nav, { attributes: true, attributeFilter: ["class"] });
});
