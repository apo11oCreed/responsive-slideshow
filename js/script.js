const respSlideshow = document.getElementById("responsive_slideshow");
const data = "../data/data.json";

let request = new XMLHttpRequest();
request.open("GET", data);
request.responseType = "json";
request.send();
request.onload = function() {
  let slideInstancesObject = request.response;
  let slideInstancesList = slideInstancesObject.slideshow;

  for (let i = 0; i < slideInstancesList.length; i++) {
    let sliderContainer = document.createElement("div");
    respSlideshow.appendChild(sliderContainer).setAttribute("id", "slide" + i);
  }
};
