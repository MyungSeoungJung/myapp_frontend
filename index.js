const input = document.querySelectorAll("input");

input.forEach((item) => {
  item.addEventListener("focus", function () {
    this.style.boxShadow = "rgba(5, 102, 214, 0.3) 0px 0px 10px 5px";
    this.style.borderColor = "rgba(5, 102, 214, 0.6)";
  });

  item.addEventListener("blur", function () {
    this.style.boxShadow = "none";
    this.style.borderColor = "rgba(5, 102, 214, 0.6)";
  });
});
