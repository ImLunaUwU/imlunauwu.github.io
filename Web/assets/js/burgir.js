function ayoThePizzaHere() {

  const element = document.getElementById("menu");
  if (element.className == "menu-toggle open") {
    element.className = "menu-toggle closed";
  } else {
    element.className = "menu-toggle open";
  }
}