if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // If the system is in dark mode
  // ...then use the .dark-theme class
  document.body.classList.add("dark-theme");
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newColorScheme = e.matches ? "dark" : "light";
  document.body.classList.toggle("dark-theme");

  // Let's say the theme is equal to light
  let theme = "light";
  // If the body contains the .dark-theme class...
  if (document.body.classList.contains("dark-theme")) {
    // ...then let's make the theme dark
    theme = "dark";
  }

  // Then save the choice in localStorage
  localStorage.setItem("theme", theme);
  // Listen for a click on the button
});
