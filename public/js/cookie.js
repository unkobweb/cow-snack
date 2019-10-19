document.querySelector(".denied").addEventListener("click", function() {
  window.close();
});

document.querySelector(".validRGPD").addEventListener("click", function(event) {
  event.target.parentElement.parentElement.parentElement.remove();
  $.post("/cookie", {}, () => {
    window.location.href("/");
  });
});
