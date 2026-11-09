const sectionHeadings = document.querySelectorAll("main h2");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!prefersReducedMotion.matches && "IntersectionObserver" in window) {
  const headingObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  });

  sectionHeadings.forEach((heading) => {
    heading.classList.add("scroll-reveal");
    headingObserver.observe(heading);
  });
}

const backToTopButton = document.createElement("button");
backToTopButton.className = "back-to-top";
backToTopButton.type = "button";
backToTopButton.setAttribute("aria-label", "返回頂部");
backToTopButton.setAttribute("aria-hidden", "true");
backToTopButton.tabIndex = -1;
backToTopButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6"/></svg>';
document.body.append(backToTopButton);

function updateBackToTopButton() {
  const isVisible = window.scrollY > 400;
  backToTopButton.classList.toggle("is-visible", isVisible);
  backToTopButton.setAttribute("aria-hidden", String(!isVisible));
  backToTopButton.tabIndex = isVisible ? 0 : -1;
}

window.addEventListener("scroll", updateBackToTopButton, { passive: true });
updateBackToTopButton();

backToTopButton.addEventListener("click", () => {
  const pageTitle = document.querySelector("main h1");
  pageTitle.setAttribute("tabindex", "-1");
  pageTitle.focus({ preventScroll: true });

  if (prefersReducedMotion.matches) {
    window.scrollTo(0, 0);
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
});
