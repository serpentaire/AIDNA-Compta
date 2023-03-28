function ScrollDown() {
  if (window.innerWidth < 768) {
    const element = document.getElementById("cible");
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export default ScrollDown;
