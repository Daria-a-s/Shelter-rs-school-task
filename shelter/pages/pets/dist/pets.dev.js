"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _pets = _interopRequireDefault(require("../main/pets.js"));

var Main = _interopRequireWildcard(require("../main/main.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var menu = document.querySelector("#burger-menu");
menu.style.display = "none";
var col = 0;
var pages = 0;

function colCards() {
  var wid = screen.width;

  if (wid > 1279) {
    pages = 6;
    return col = 8;
  } else if (wid < 1280 && wid >= 768) {
    pages = 8;
    return col = 6;
  } else if (wid < 768) {
    pages = 16;
    return col = 3;
  }
}

colCards();
var begin = document.querySelector("#begin");
var prev = document.querySelector("#prev");
var next = document.querySelector("#next");
var end = document.querySelector("#end");
var active = document.querySelector(".main-paginations__button_active");
var pageNum = 0;
var Images = []; //shuffle

function shuffle() {
  _pets["default"].sort(function () {
    return Math.random() - 0.5;
  });

  return _pets["default"];
}

var intersect = function intersect(arr1, arr2) {
  return arr1.filter(function (n) {
    return arr2.indexOf(n) !== -1;
  });
};

var a = "1";
var m5 = [];
var m55 = [];
var tail = 0;
shuffle(_pets["default"]); //GENERATOR

function generateImg() {
  for (var i = 0; i < 6; i++) {
    a = '1';

    for (var j = 0; j < 8; j++) {
      Images.push(_pets["default"][j]);
    }

    tail = Images.length % 6;

    if (tail > 0) {
      for (var k = 0; k < tail; k++) {
        m5.push(_pets["default"][_pets["default"].length - k - 1]);
      }

      while (a.length !== 0) {
        shuffle(_pets["default"]);

        for (var l = 0; l < col - tail; l++) {
          m55.push(_pets["default"][l]);
        }

        a = intersect(m5, m55);
        m55 = [];
      }
    } else shuffle(_pets["default"]);

    m5 = [];
    m55 = [];
  }

  return Images;
}

generateImg(); //START CARDS

for (var j = 0; j < 8; j++) {
  document.querySelector(".pets-card:nth-child(1)").remove();
}

for (var i = 0; i < col; i++) {
  document.querySelector(".main-pets-cards").insertAdjacentElement("beforeend", Main.getPet(i, Images));
}

begin.addEventListener("click", function () {
  active.innerHTML = 1;
  pageNum = 0;
  prev.setAttribute("disabled", true);
  prev.disabled = true;
  begin.setAttribute("disabled", true);
  begin.disabled = true;
  next.removeAttribute("disabled");
  next.disabled = false;
  end.removeAttribute("disabled");
  end.disabled = false;

  for (var _j = 0; _j < col; _j++) {
    document.querySelector(".pets-card:nth-child(1)").remove();
  }

  for (var _i = 0; _i < col; _i++) {
    document.querySelector(".main-pets-cards").insertAdjacentElement("beforeend", Main.getPet(_i, Images));
  }

  setTimeout(function () {
    return Main.loadPop('.overlay-popup');
  }, 500);
});
end.addEventListener("click", function () {
  active.innerHTML = "".concat(pages);
  pageNum = pages - 1;
  next.setAttribute("disabled", true);
  next.disabled = true;
  end.setAttribute("disabled", true);
  end.disabled = true;
  prev.removeAttribute("disabled");
  prev.disabled = false;
  begin.removeAttribute("disabled");
  begin.disabled = false;

  for (var _j2 = 0; _j2 < col; _j2++) {
    document.querySelector(".pets-card:nth-child(1)").remove();
  }

  for (var _i2 = col * pageNum; _i2 < col * pageNum + col; _i2++) {
    document.querySelector(".main-pets-cards").insertAdjacentElement("beforeend", Main.getPet(_i2, Images));
  }

  setTimeout(function () {
    return Main.loadPop('.overlay-popup');
  }, 500);
});
next.addEventListener("click", function () {
  pageNum++;
  prev.removeAttribute("disabled");
  prev.disabled = false;
  begin.removeAttribute("disabled");
  begin.disabled = false;

  if (pageNum == pages - 1) {
    next.setAttribute("disabled", true);
    next.disabled = true;
    end.setAttribute("disabled", true);
    end.disabled = true;
    prev.removeAttribute("disabled");
    prev.disabled = false;
    begin.removeAttribute("disabled");
    begin.disabled = false;
  }

  active.innerHTML = "".concat(pageNum + 1);
  document.querySelectorAll(".pets-card").forEach(function (e) {
    return e.remove();
  });

  for (var _i3 = col * pageNum; _i3 < col * pageNum + col; _i3++) {
    document.querySelector(".main-pets-cards").insertAdjacentElement("beforeend", Main.getPet(_i3, Images));
  }

  setTimeout(function () {
    return Main.loadPop('.overlay-popup');
  }, 500);
});
prev.addEventListener("click", function () {
  pageNum--;
  next.removeAttribute("disabled");
  next.disabled = false;
  end.removeAttribute("disabled");
  end.disabled = false;

  if (pageNum == 0) {
    prev.setAttribute("disabled", true);
    prev.disabled = true;
    begin.setAttribute("disabled", true);
    begin.disabled = true;
    next.removeAttribute("disabled");
    next.disabled = false;
    end.removeAttribute("disabled");
    end.disabled = false;
  }

  active.innerHTML = "".concat(pageNum + 1);
  document.querySelectorAll(".pets-card").forEach(function (e) {
    return e.remove();
  });

  for (var _i4 = col * pageNum; _i4 < col * pageNum + col; _i4++) {
    document.querySelector(".main-pets-cards").insertAdjacentElement("beforeend", Main.getPet(_i4, Images));
  }

  setTimeout(function () {
    return Main.loadPop('.overlay-popup');
  }, 500);
});
Main.loadPop('.overlay-popup');