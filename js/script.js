const data = "/responsive-slideshow/data/data-php.json";
//const data = "/responsive-slideshow/data/data.json";

let respSlideshowContainer = document.querySelector(".container.slideshow"),
  respSlideshow = document.getElementById("responsive_slideshow"),
  respPageButtons = document.querySelector(".container.pagination"),
  previousButton = document.querySelectorAll("button.previous"),
  nextButton = document.querySelectorAll("button.next"),
  slideInstancesList,
  sliderContainerWidth,
  marginLeftPosition,
  img,
  highlightIndex,
  imgWidthRuleUnitValue,
  imgWidthRuleUnit,
  request = new XMLHttpRequest();

respSlideshow.style.marginLeft = "0vw";

request.open("GET", data);
request.responseType = "json";
request.send();
request.onload = function() {
  slideInstancesList = request.response;

  renderSlides(slideInstancesList, respSlideshow, function() {
    let respSlideshowNew = document.getElementById("responsive_slideshow"),
      img = respSlideshowNew.querySelectorAll("img"),
      imgWidthProps = GetStyle(".imgWidth"),
      imgWidthsArray = [];

    imgWidthRuleUnitValue = imgWidthProps.replace(/[^0-9]{1,}/g, "");

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
    slidesList +=
      '<img id="img_' +
      i +
      '" class="slide" src="' +
      slides[i].src +
      '" alt="' +
      slides[i].name +
      '" />';
    pageList +=
      '<button id="slide_' + i + '" class="page">' + (i + 1) + "</button>";
  }
  container.innerHTML += slidesList;
  respPageButtons.innerHTML += pageList;
  callback();
}

function calcSlideShowWidth(slideArray, callback) {
  respSlideshow.style.width = slideArray.length * imgWidthRuleUnitValue + "vw";
  callback();
}

function controlsBuilder() {
  let respSlideshow = document.getElementById("responsive_slideshow");
  let pageButtons = document.querySelectorAll("button");
  let respSlideshowCurrentMargin;
  img = respSlideshow.querySelectorAll("img");

  pageButtons.forEach(function(currentValue, index, arr) {
    currentValue.addEventListener("click", function() {
      if (currentValue.classList.contains("page")) {
        respSlideshow.style.marginLeft =
          "-" + (index - 2) * imgWidthRuleUnitValue + "vw";
        marginLeftPosition = respSlideshow.style.marginLeft;
      } else if (currentValue.classList.contains("previous")) {
        respSlideshowCurrentMargin = respSlideshow.style.marginLeft;
        if (respSlideshowCurrentMargin != "0vw") {
          respSlideshow.style.marginLeft =
            (
              Number(respSlideshowCurrentMargin.replace(/[vw]/g, "")) +
              Number(imgWidthRuleUnitValue)
            ).toString() + "vw";
          marginLeftPosition = respSlideshow.style.marginLeft;
        } else {
          respSlideshow.style.marginLeft =
            "-" + (img.length - 1) * imgWidthRuleUnitValue + "vw";
          marginLeftPosition = respSlideshow.style.marginLeft;
        }
      } else {
        if (currentValue.classList.contains("next")) {
          respSlideshowCurrentMargin = respSlideshow.style.marginLeft;
          if (
            respSlideshowCurrentMargin !=
            "-" + ((img.length - 1) * imgWidthRuleUnitValue).toString() + "vw"
          ) {
            respSlideshow.style.marginLeft =
              (
                Number(respSlideshowCurrentMargin.replace(/[vw]/g, "")) -
                imgWidthRuleUnitValue
              ).toString() + "vw";
            marginLeftPosition = respSlideshow.style.marginLeft;
          } else {
            respSlideshow.style.marginLeft = "0vw";
            marginLeftPosition = respSlideshow.style.marginLeft;
          }
        }
      }
      if (marginLeftPosition) {
        marginLeftPosition = marginLeftPosition.replace(/[-vw]/g, "");
        highlightIndex = marginLeftPosition / imgWidthRuleUnitValue + 2;
        highlighterIndex(highlightIndex);
      }
    });
  });
}

function highlighterIndex(element) {
  let respPageButtons = document.getElementsByClassName("page");
  for (let z = 0; z < respPageButtons.length; z++) {
    if (respPageButtons[z].innerHTML == element - 1) {
      respPageButtons[z].style.backgroundColor = "blue";
    } else {
      respPageButtons[z].style.backgroundColor = "#e4e4e4";
    }
  }
}

//https://stackoverflow.com/questions/324486/how-do-you-read-css-rule-values-with-javascript
function GetStyle(CLASSname) {
  var styleSheets = document.styleSheets;
  var styleSheetsLength = styleSheets.length;
  for (var i = 0; i < styleSheetsLength; i++) {
    if (styleSheets[i].rules) {
      var classes = styleSheets[i].rules;
    } else {
      try {
        if (!styleSheets[i].cssRules) {
          continue;
        }
      } catch (e) {
        //Note that SecurityError exception is specific to Firefox.
        if (e.name == "SecurityError") {
          console.log("SecurityError. Cant readd: " + styleSheets[i].href);
          continue;
        }
      }
      var classes = styleSheets[i].cssRules;
    }
    for (var x = 0; x < classes.length; x++) {
      if (classes[x].selectorText == CLASSname) {
        var ret = classes[x].cssText
          ? classes[x].cssText
          : classes[x].style.cssText;
        if (ret.indexOf(classes[x].selectorText) == -1) {
          ret = classes[x].selectorText + "{" + ret + "}";
        }
        return ret;
      }
    }
  }
}

//https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
function handleStart() {}

function handleMove() {}
