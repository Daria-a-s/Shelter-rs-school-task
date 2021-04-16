"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openBurgerMenu = openBurgerMenu;
exports.closeBurgerMenu = closeBurgerMenu;
exports.getPet = getPet;
exports.loadPop = loadPop;
exports.burgerButton = void 0;

var _pets = _interopRequireDefault(require("./pets.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var burgerButton = document.querySelector(".burger-btn");
exports.burgerButton = burgerButton;
var btn = true;
var menu = document.querySelector("#burger-menu");
menu.style.display = "none";

function openBurgerMenu() {
  menu.style.display = "block";
  if (document.querySelector(".header .logo") !== null) document.querySelector(".header .logo").style.visibility = "hidden";

  if (document.querySelector(".pets-header") !== null) {
    document.querySelector(".pets-header").style.visibility = "hidden";
    document.querySelector(".pets-header .logo").style.visibility = "hidden";
  }

  document.querySelector(".overlay").style.visibility = "visible";
  document.querySelector("html").style.overflow = "hidden";
  btn = !btn;
  setTimeout(function () {
    burgerButton.style.transform = "rotate(90deg)";
    burgerButton.style.transition = "transform 0.3s ease-in-out";
    menu.style.transform = "translate(-320px)";
    menu.style.transition = "transform 0.3s ease-in-out";
    menu.style.visibility = "visible";
  }, 100);
}

function closeBurgerMenu() {
  if (document.querySelector(".header .logo") !== null) document.querySelector(".header .logo").style.visibility = "visible";

  if (document.querySelector(".pets-header") !== null) {
    document.querySelector(".pets-header").style.visibility = "visible";
    document.querySelector(".pets-header .logo").style.visibility = "visible";
  }

  burgerButton.style.transform = "rotate(0deg)";
  burgerButton.style.transition = "transform 0.3s ease-in-out";
  menu.style.transform = "translate(0px)";
  menu.style.transition = "transform 0.3s ease-in-out";
  document.querySelector(".overlay").style.visibility = "hidden";
  document.querySelector("html").style.overflowY = "scroll";
  setTimeout(function () {
    menu.style.display = "none";
  }, 400);
  btn = !btn;
}

burgerButton.addEventListener("click", function () {
  btn ? openBurgerMenu() : closeBurgerMenu();
});
document.querySelector("#burger-menu .list__link__activated").addEventListener("click", function () {
  closeBurgerMenu();
});
document.querySelector(".overlay").addEventListener("click", function () {
  closeBurgerMenu();
  document.querySelector('.pets-pop-up').style.visibility = 'hidden';
});
var col = 3;
var btnR = document.querySelector('.slider-button_reverted');
var btnL = document.querySelector('.slider-button');
var buffer = []; //shuffle

function shuffle() {
  for (var i = 0; i < 3; i++) {
    buffer.push(_pets["default"][i]);
  }

  _pets["default"].splice(0, 3);

  _pets["default"].sort(function () {
    return Math.random() - 0.5;
  });

  for (var _i = 0; _i < 3; _i++) {
    _pets["default"].push(buffer[_i]);
  }

  buffer = [];
  return _pets["default"];
}

function getPet(ind, usingData) {
  var cardElement = document.createElement("div");
  cardElement.classList.add("pets-card");
  var contentElement = document.createElement("div");
  contentElement.classList.add("pets-card__content");
  var image = document.createElement("img");
  image.setAttribute("src", "../../assets/images/" + usingData[ind].name + ".png");
  image.setAttribute("alt", '"' + usingData[ind].name + '"');
  image.classList.add("pets-content__image");
  var titleElement = document.createElement("h4");
  titleElement.classList.add("pets-card__title");
  titleElement.textContent = "".concat(usingData[ind].name);
  var buttonElement = document.createElement("button");
  buttonElement.classList.add("pets-card__button");
  buttonElement.textContent = "Learn More";
  contentElement.appendChild(titleElement);
  contentElement.appendChild(buttonElement);
  cardElement.appendChild(image);
  cardElement.appendChild(contentElement);
  return cardElement;
}

var learnMore = document.getElementsByClassName('pets-card');
if (btnR) btnR.addEventListener("click", function () {
  btnR.disabled = true;
  document.querySelectorAll(".pets-card").forEach(function (e) {
    return e.classList.add('slideToRight');
  });
  setTimeout(function () {
    for (var i = 0; i < col; i++) {
      document.querySelector(".pets-cards").insertAdjacentElement("afterbegin", getPet(i, _pets["default"]));
    }

    for (var _i2 = 1; _i2 < col + 1; _i2++) {
      document.querySelector('.pets-card:nth-child(' + _i2 + ')').style.transform = 'translate(-400%)';
    }
  }, 400);
  setTimeout(function () {
    for (var i = 0; i < 3; i++) {
      document.querySelector('.pets-card:nth-child(4)').remove();
    }

    document.querySelectorAll(".pets-card").forEach(function (e) {
      return e.style.transform = "translate(0)";
    });
    document.querySelectorAll(".pets-card").forEach(function (e) {
      return e.style.transition = "transform 0.3s ease-in-out";
    });
  }, 450);
  setTimeout(function () {
    loadPop('.overlay');
    document.querySelectorAll(".pets-card").forEach(function (e) {
      return e.style = '';
    });
    document.querySelectorAll(".pets-card").forEach(function (e) {
      return e.classList.remove('slideToRight');
    });
    shuffle(_pets["default"]);
  }, 750);
  setTimeout(function () {
    btnR.disabled = false;
  }, 800);
});
if (btnL) btnL.addEventListener("click", function () {
  btnL.disabled = true;
  document.querySelectorAll(".pets-card").forEach(function (e) {
    return e.classList.add('slideToLeft');
  });
  setTimeout(function () {
    for (var i = 0; i < col; i++) {
      document.querySelector(".pets-cards").insertAdjacentElement('beforeend', getPet(i, _pets["default"]));
    }

    for (var _i3 = col + 1; _i3 < 2 * col + 1; _i3++) {
      document.querySelector('.pets-card:nth-child(' + _i3 + ')').style.transform = 'translate(400%)';
    }
  }, 400);
  setTimeout(function () {
    for (var i = 0; i < 3; i++) {
      document.querySelector('.pets-card:nth-child(1)').remove();
    }

    document.querySelectorAll(".pets-card").forEach(function (e) {
      return e.style.transform = "translate(0)";
    });
    document.querySelectorAll(".pets-card").forEach(function (e) {
      return e.style.transition = "transform 0.3s ease-in-out";
    });
  }, 450);
  setTimeout(function () {
    document.querySelectorAll(".pets-card").forEach(function (e) {
      return e.style = '';
    });
    document.querySelectorAll(".pets-card").forEach(function (e) {
      return e.classList.remove('slideToLeft');
    });
    shuffle(_pets["default"]);
    loadPop();
  }, 750);
  setTimeout(function () {
    btnL.disabled = false;
  }, 800);
}); //INFO

var btnExit = document.querySelector('.pets-pop-up-btn');
var cTitle;

function loadPop(nameOfOverlay) {
  learnMore = document.getElementsByClassName('pets-card');

  var _loop = function _loop(i) {
    learnMore[i].addEventListener("click", function () {
      document.querySelector("html").style.overflow = "hidden";
      cTitle = this.querySelector('.pets-card__title');
      var count = 0;

      for (var j = 0; j < 8; j++) {
        if (_pets["default"][j].name == cTitle.textContent) count = j;
      }

      document.querySelector('.pets-pop-up-type').innerText = _pets["default"][count].type;
      document.querySelector('.pets-pop-up-breed').innerText = _pets["default"][count].breed;
      document.querySelector('.pets-pop-up-description').innerText = _pets["default"][count].description;
      document.querySelector('.pets-pop-up-age').innerText = _pets["default"][count].age;
      document.querySelector('.pets-pop-up-inoculations').innerText = _pets["default"][count].inoculations;
      document.querySelector('.pets-pop-up-diseases').innerText = _pets["default"][count].diseases;
      document.querySelector('.pets-pop-up-parasites').innerText = _pets["default"][count].parasites;
      document.querySelector('.pets-pop-up-image img').setAttribute("src", "../../assets/images/" + _pets["default"][count].name + ".png");
      document.querySelector('.pets-pop-up-name').innerText = cTitle.textContent;
      document.querySelector("".concat(nameOfOverlay)).style.visibility = "visible";
      document.querySelector('.pets-pop-up').style.visibility = 'visible';
    });
    var overl = document.querySelector("".concat(nameOfOverlay));
    btnExit.addEventListener('click', function () {
      document.querySelector('.pets-pop-up').style.visibility = 'hidden';
      document.querySelector("".concat(nameOfOverlay)).style.visibility = "hidden";
      document.querySelector("html").style.overflowY = "scroll";
    });
    overl.addEventListener('mouseover', function (e) {
      btnExit.classList.add('btn-hover');
    });
    overl.addEventListener('mouseout', function (e) {
      btnExit.classList.remove('btn-hover');
    });
    overl.addEventListener('click', function () {
      overl.style.visibility = "hidden";
      document.querySelector('.pets-pop-up').style.visibility = 'hidden';
      document.querySelector("html").style.overflowY = "scroll";
    });
  };

  for (var i = 0; i < learnMore.length; i++) {
    _loop(i);
  }
}

loadPop('.overlay');