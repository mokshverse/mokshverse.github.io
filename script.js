// 🌙 Dark Mode Toggle
const toggle = document.getElementById("darkToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Button text change
  if (document.body.classList.contains("dark")) {
    toggle.innerHTML = "☀️ Light Mode";
  } else {
    toggle.innerHTML = "🌙 Dark Mode";
  }
});

// 🎯 Scroll Reveal Animation
document.addEventListener("DOMContentLoaded", () => {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach((el) => io.observe(el));
});