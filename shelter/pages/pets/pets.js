import data from '../main/pets.js';
import * as Main from '../main/main.js'
const menu = document.querySelector("#burger-menu");
menu.style.display = "none";

let col = 0;
let pages = 0;
function colCards() {
  let wid = screen.width;
  if (wid > 1279) {
    pages = 6;
    return (col = 8);
  } else if (wid < 1280 && wid >=768) {
    pages = 8;
    return (col = 6);
  } else if (wid < 768) {
    pages = 16;
    return (col = 3);
  }
}
colCards();

const begin = document.querySelector("#begin");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const end = document.querySelector("#end");
const active = document.querySelector(".main-paginations__button_active");
let pageNum = 0;
let Images = [];
//shuffle
function shuffle() {
  data.sort(() => Math.random() - 0.5);
  return data;
}

const intersect = function (arr1, arr2) {
  return arr1.filter(function (n) {
    return arr2.indexOf(n) !== -1;
  });
};

let a = "1";
let m5 = [];
let m55 = [];
let tail = 0;
shuffle(data);
//GENERATOR
function generateImg() {
  for (let i = 0; i < 6; i++) {
    a='1';

    for (let j = 0; j < 8; j++) {
      Images.push(data[j]);
    }

    tail = Images.length % 6;

    if (tail > 0) {
      for (let k = 0; k < tail; k++) m5.push(data[data.length - k - 1]) ;

      while (a.length !== 0) {

        shuffle(data);
        for (let l = 0; l < col-tail; l++) m55.push(data[l]);

        a = intersect(m5, m55);
        m55 = [];
      }
    } else shuffle(data);
    
    m5 = [];
    m55 = [];
  }
  return Images;
}
generateImg();

//START CARDS
for (let j = 0; j < 8; j++)
  document.querySelector(".pets-card:nth-child(1)").remove();
for (let i = 0; i < col; i++) {
  document
    .querySelector(".main-pets-cards")
    .insertAdjacentElement("beforeend", Main.getPet(i, Images));
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

  for (let j = 0; j < col; j++)
    document.querySelector(".pets-card:nth-child(1)").remove();
  for (let i = 0; i < col; i++) {
    document
      .querySelector(".main-pets-cards")
      .insertAdjacentElement("beforeend", Main.getPet(i, Images));
  }

setTimeout(() => ( Main.loadPop('.overlay-popup')),500)
});

end.addEventListener("click", function () {

  active.innerHTML = `${pages}`;
  pageNum = pages - 1;
  next.setAttribute("disabled", true);
  next.disabled = true;
  end.setAttribute("disabled", true);
  end.disabled = true;
  prev.removeAttribute("disabled");
  prev.disabled = false;
  begin.removeAttribute("disabled");
  begin.disabled = false;

  for (let j = 0; j < col; j++)
    document.querySelector(".pets-card:nth-child(1)").remove();
  for (let i = col * pageNum; i < col * pageNum + col; i++) {
    document
      .querySelector(".main-pets-cards")
      .insertAdjacentElement("beforeend", Main.getPet(i, Images));
  }
setTimeout(() => ( Main.loadPop('.overlay-popup')),500)

});

next.addEventListener("click", function () {

  pageNum++;
  prev.removeAttribute("disabled");
  prev.disabled = false;
  begin.removeAttribute("disabled");
  begin.disabled = false;

  if (pageNum ==pages-1) {
    next.setAttribute("disabled", true);
    next.disabled = true;
    end.setAttribute("disabled", true);
    end.disabled = true;
    prev.removeAttribute("disabled");
    prev.disabled = false;
    begin.removeAttribute("disabled");
    begin.disabled = false;
  }
  active.innerHTML = `${pageNum+1}`;

    document.querySelectorAll(".pets-card").forEach((e) => (e.remove()));
  for (let i = col * pageNum; i < col * pageNum + col; i++) {
    document
      .querySelector(".main-pets-cards")
      .insertAdjacentElement("beforeend", Main.getPet(i, Images));
  }
setTimeout(() => ( Main.loadPop('.overlay-popup')),500)

});

prev.addEventListener("click", function () {

  pageNum--;
  next.removeAttribute("disabled");
  next.disabled = false;
  end.removeAttribute("disabled");
  end.disabled = false;

  if (pageNum ==0) {
    prev.setAttribute("disabled", true);
    prev.disabled = true;
    begin.setAttribute("disabled", true);
    begin.disabled = true;
    next.removeAttribute("disabled");
    next.disabled = false;
    end.removeAttribute("disabled");
    end.disabled = false;
  }
  active.innerHTML = `${pageNum+1}`;

    document.querySelectorAll(".pets-card").forEach((e) => (e.remove()));
  for (let i = col * pageNum; i < col * pageNum + col; i++) {
    document
      .querySelector(".main-pets-cards")
      .insertAdjacentElement("beforeend", Main.getPet(i, Images));
  }
setTimeout(() => ( Main.loadPop('.overlay-popup')),500)

});

Main.loadPop('.overlay-popup');