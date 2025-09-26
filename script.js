// 🎯 Scroll Reveal Animation
// This runs when the initial HTML document has been completely loaded and parsed.
document.addEventListener("DOMContentLoaded", () => {
  const els = document.querySelectorAll(".reveal");
  if (els.length > 0) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
  }

  // 🌙 Dark Mode Toggle
  const toggle = document.getElementById("darkToggle");
  const body = document.body;

  // Function to apply the theme based on the mode
  const applyTheme = (theme) => {
    if (theme === "dark") {
      body.classList.add("dark");
      toggle.innerHTML = "☀️ Light Mode";
    } else {
      body.classList.remove("dark");
      toggle.innerHTML = "🌙 Dark Mode";
    }
  };

  // Check for a saved theme in localStorage and apply it
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  // Event listener for the toggle button
  if (toggle) {
    toggle.addEventListener("click", () => {
      // Check if the body currently has the 'dark' class
      if (body.classList.contains("dark")) {
        // Switch to light mode
        localStorage.setItem("theme", "light");
        applyTheme("light");
      } else {
        // Switch to dark mode
        localStorage.setItem("theme", "dark");
        applyTheme("dark");
      }
    });
  }
});
