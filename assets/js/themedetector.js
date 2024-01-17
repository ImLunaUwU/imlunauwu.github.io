// Function to set the theme class on the body element
function setTheme(theme) {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(theme + "-theme");
  }
  
  // Check for user preference and set the initial theme
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
  
  // Function to toggle between light and dark themes
  function toggleTheme() {
    const currentTheme = document.body.classList.contains("light-theme") ? "light" : "dark";
    const newTheme = currentTheme === "light" ? "dark" : "light";
  
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }
  
  // Listen for changes in the user's color scheme preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newColorScheme = e.matches ? "dark" : "light";
    setTheme(newColorScheme);
    localStorage.setItem("theme", newColorScheme);
  });
  
  // Call the toggleTheme function if you want to toggle the theme programmatically
  // toggleTheme();