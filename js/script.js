let respSlideshowContainer = document.querySelector(".container.slideshow");
let respSlideshow = document.getElementById("responsive_slideshow");
let respPageButtons = document.querySelector(".container.pagination");
let previousButton = document.querySelectorAll("button.previous");
let nextButton = document.querySelectorAll("button.next");
respSlideshow.style.marginLeft = "0vw";
const data = "/responsive-slideshow/data/data.json";
//const data = "/responsive-slideshow/data/data.json";

let slideInstancesList;
let sliderContainerWidth;
let marginLeftPosition;
let img;

var highlightIndex;

let request = new XMLHttpRequest();
request.open("GET", data);
request.responseType = "json";
request.send();

request.onload = function() {
  slideInstancesList = request.response.slideshow;

  renderSlides(slideInstancesList, respSlideshow, function() {
    let respSlideshowNew = document.getElementById("responsive_slideshow");
    img = respSlideshowNew.querySelectorAll("img");

    let pageButtons = document.querySelectorAll(".page");
    let imgWidthsArray = [];

    for (let i = 0; i < img.length; i++) {
      imgWidthsArray.push(img[i].clientWidth);
    }
    calcSlideShowWidth(imgWidthsArray, controlsBuilder);
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
  respSlideshow.style.width = slideArray.length * 100 + "vw";
  callback();
}

function controlsBuilder() {
  let respSlideshow = document.getElementById("responsive_slideshow");
  let pageButtons = document.querySelectorAll("button");
  let respSlideshowCurrentMargin;
  img = respSlideshow.querySelectorAll("img");

  pageButtons.forEach(function(currentValue, index, arr) {
    currentValue.addEventListener('click', function() {

      if (currentValue.classList.contains("page")) {
        respSlideshow.style.marginLeft = "-" + (index - 2) * 100 + "vw";
        marginLeftPosition = respSlideshow.style.marginLeft;
      }
      else if (currentValue.classList.contains("previous")) {
        respSlideshowCurrentMargin = respSlideshow.style.marginLeft;
        if (respSlideshowCurrentMargin && respSlideshowCurrentMargin != "0vw") {
          respSlideshow.style.marginLeft = (Number(respSlideshowCurrentMargin.replace(/[vw]/g, '')) + 100).toString() + "vw";
          marginLeftPosition = respSlideshow.style.marginLeft;

        }
      }
      else {
        if (currentValue.classList.contains("next")) {
          respSlideshowCurrentMargin = respSlideshow.style.marginLeft;
          if (respSlideshowCurrentMargin != "-" + (Number(respSlideshowCurrentMargin.replace(/[vw]/g, '')) + 100).toString() + "vw") {
            respSlideshow.style.marginLeft = (Number(respSlideshowCurrentMargin.replace(/[vw]/g, '')) - 100).toString() + "vw";
            marginLeftPosition = respSlideshow.style.marginLeft;

          }
        }
      }
      if (marginLeftPosition) {
        marginLeftPosition = marginLeftPosition.replace(/[-vw]/g, '');
        highlightIndex = marginLeftPosition / 100 + 2;
        highlighterIndex(highlightIndex);
      }
    });
  });
}

function highlighterIndex(element) {
  let respPageButtons = document.getElementsByClassName("page");
  for (let z = 0; z < respPageButtons.length; z++) {
    if (respPageButtons[z].innerHTML == element - 1) {
      (respPageButtons[z]).style.backgroundColor = "blue";
    }
    else {
      respPageButtons[z].style.backgroundColor = "#e4e4e4";
    }
  }
}
