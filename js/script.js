let respSlideshowContainer = document.querySelector(".container.slideshow");
let respSlideshow = document.getElementById("responsive_slideshow");
let respPageButtons = document.querySelector(".container.pagination");
let previousButton = document.querySelectorAll("button.previous");
let nextButton = document.querySelectorAll("button.next");
respSlideshow.style.marginLeft = "0px";
//const data = "../responsive-slideshow/data/data.json";
const data = "/responsive-slideshow/data/data.json";

let slideInstancesList;
let sliderContainerWidth;
let sliderContainerHeight;
let img;

let request = new XMLHttpRequest();
request.open("GET", data);
request.responseType = "json";
request.send();

request.onload = function() {
  slideInstancesList = request.response.slideshow;

  renderSlides(slideInstancesList, respSlideshow, function() {
    let respSlideshowNew = document.getElementById("responsive_slideshow");
    img = respSlideshowNew.querySelectorAll("img");
    let imgWidthsArray = [];
    let imgHeightsArray = [];

    let pageButtons = document.querySelectorAll(".page");

    for (var i = 0; i < img.length; i++) {
      imgWidthsArray.push(img[i].clientWidth);
      imgHeightsArray.push(img[i].clientHeight);
    }
    calcSlideShowWidth(imgWidthsArray, controlsBuilder);
    calcSlideShowHeight(imgHeightsArray);
  });
};

function renderSlides(slides, container, callback) {
  let slidesList = "";
  let pageList = "";
  for (let i = 0; i < slides.length; i++) {
    slidesList += '<img id="img_' + i + '" class="slide" src="' + slides[i].src + '" alt="' + slides[i].name + '" />';
    pageList += '<button id="slide_' + i + '" class="page">' + (i + 1) + '</button>';
  }
  container.innerHTML += slidesList;
  respPageButtons.innerHTML += pageList;
  callback();
}

function calcSlideShowWidth(slideArray, callback) {
  sliderContainerWidth = slideArray.reduce((a, b) => a + b, 0);
  respSlideshowContainer.style.width = slideArray[0] / 16 + "rem";
  respSlideshow.style.width = (sliderContainerWidth / 16) + "rem";
  callback();
}

function calcSlideShowHeight(slideArray) {
  respSlideshowContainer.style.height = slideArray[0] / 16 + "rem";
}

function controlsBuilder() {
  let respSlideshow = document.getElementById("responsive_slideshow");
  let pageButtons = document.querySelectorAll(".page");
  pageButtons.forEach(function(currentValue, index, arr) {
    currentValue.addEventListener('click', function() {
      respSlideshow.style.marginLeft = "-" + index * img[0].clientWidth + "px";
    });
  });


  previousButton.forEach(function(currentValue, index, arr) {
    currentValue.addEventListener('click', function() {
      var respSlideshowCurrentMargin = respSlideshow.style.marginLeft;
      if (respSlideshowCurrentMargin && respSlideshowCurrentMargin != "0px") {
        respSlideshow.style.marginLeft = (parseInt(respSlideshowCurrentMargin) + 400).toString() + "px";
        console.log(respSlideshow.style.marginLeft);
      }
    });
  })

  nextButton.forEach(function(currentValue, index, arr) {
    currentValue.addEventListener('click', function() {
      var respSlideshowCurrentMargin = respSlideshow.style.marginLeft;
      if (respSlideshowCurrentMargin != "-" + (parseInt(sliderContainerWidth) - 400).toString() + "px") {
        respSlideshow.style.marginLeft = (parseInt(respSlideshowCurrentMargin) - 400).toString() + "px";
        console.log(respSlideshow.style.marginLeft);
      }
    });
  })
}
