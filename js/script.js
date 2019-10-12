let respSlideshow = document.getElementById("responsive_slideshow");
const data = "../data/data.json";

let request = new XMLHttpRequest();
request.open("GET", data);
request.responseType = "json";
request.send();
request.onload = function() {
  let slideInstancesObject = request.response;
  let slideInstancesList = slideInstancesObject.slideshow;
  renderSlides(slideInstancesList, respSlideshow);
  getDimensions(slideInstancesList);
};

function renderSlides(slides,container){
for (let i = 0; i < slides.length; i++) {
  container.innerHTML += '<img id="img_' + i + '" src="' + slides[i].src + '" alt="' + slides[i].name + '" />';
}
}

function getDimensions(slides) {
  for (let i = 0; i < slides.length; i++) {
    var imgWidth = slides[i].src.naturalWidth;
    var imgHeight = slides[i].src.naturalHeight;
    console.log(imgWidth + " " + imgHeight);
  }
}
