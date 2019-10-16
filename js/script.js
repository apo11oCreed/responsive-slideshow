let respSlideshowContainer = document.querySelector(".container.slideshow");
let respSlideshow = document.getElementById("responsive_slideshow");
let respPageButtons = document.querySelector(".container.pagination");
let previousButton = document.querySelectorAll("button.previous");
let nextButton = document.querySelectorAll("button.next");
respSlideshow.style.marginLeft = "0px";
const data = "/responsive-slideshow/data/data.json";
//const data = "/responsive-slideshow/data/data.json";

let slideInstancesList;
let sliderContainerWidth;
let sliderContainerHeight;
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
    let imgWidthsArray = [];
    let imgHeightsArray = [];

    let pageButtons = document.querySelectorAll(".page");

    for (let i = 0; i < img.length; i++) {
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
  let pageButtons = document.querySelectorAll("button");

  pageButtons.forEach(function(currentValue, index, arr) {
    currentValue.addEventListener('click', function() {
      let marginLeftPosition;

      if (currentValue.classList.contains("page")) {
        respSlideshow.style.marginLeft = "-" + (index - 2) * img[0].clientWidth + "px";
        marginLeftPosition = respSlideshow.style.marginLeft;
      }
      else if (currentValue.classList.contains("previous")) {
        let respSlideshowCurrentMargin = respSlideshow.style.marginLeft;
        if (respSlideshowCurrentMargin && respSlideshowCurrentMargin != "0px") {
          respSlideshow.style.marginLeft = (parseInt(respSlideshowCurrentMargin) + 400).toString() + "px";
          marginLeftPosition = respSlideshow.style.marginLeft;

        }
      }
      else {
        if (currentValue.classList.contains("next")) {
          let respSlideshowCurrentMargin = respSlideshow.style.marginLeft;
          if (respSlideshowCurrentMargin != "-" + (parseInt(sliderContainerWidth) - 400).toString() + "px") {
            respSlideshow.style.marginLeft = (parseInt(respSlideshowCurrentMargin) - 400).toString() + "px";
            marginLeftPosition = respSlideshow.style.marginLeft;

          }
        }
      }
      marginLeftPosition = marginLeftPosition.replace(/[-px]/g, '');
      highlightIndex = (marginLeftPosition / img[0].clientWidth) + 2;
      highlighterIndex(highlightIndex);
    });
  });
}

function highlighterIndex(element) {
  let respPageButtons = document.getElementsByClassName("page");
  for (let z = 0; z < respPageButtons.length; z++) {
    console.log(respPageButtons[z] + " " + element);
    if (respPageButtons[z].innerHTML == element - 1) {
      (respPageButtons[z]).style.backgroundColor = "blue";
    }
    else {
      respPageButtons[z].style.backgroundColor = "#e4e4e4";
    }
  }
}
