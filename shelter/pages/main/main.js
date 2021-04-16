import data from './pets.js';

export const burgerButton = document.querySelector(".burger-btn");
let btn = true;
const menu = document.querySelector("#burger-menu");
menu.style.display = "none";

export function openBurgerMenu() {
  menu.style.display = "block";
   if (document.querySelector(".header .logo") !== null)
   document.querySelector(".header .logo").style.visibility = "hidden";
   if (document.querySelector(".pets-header") !== null) {
     document.querySelector(".pets-header").style.visibility = "hidden";
     document.querySelector(".pets-header .logo").style.visibility = "hidden";
   }
  document.querySelector(".overlay").style.visibility = "visible";
  document.querySelector("html").style.overflow = "hidden";
  btn = !btn;

  setTimeout(() => {
    burgerButton.style.transform = "rotate(90deg)";
    burgerButton.style.transition = "transform 0.3s ease-in-out";
    menu.style.transform = "translate(-320px)";
    menu.style.transition = "transform 0.3s ease-in-out";
    menu.style.visibility = "visible";
  }, 100);
}

export function closeBurgerMenu() {
  if (document.querySelector(".header .logo") !== null)
  document.querySelector(".header .logo").style.visibility = "visible";
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
  setTimeout(() => {
    menu.style.display = "none";
  }, 400);
  btn = !btn;
}

burgerButton.addEventListener("click", () => {
  btn ? openBurgerMenu() : closeBurgerMenu();
});

document
  .querySelector("#burger-menu .list__link__activated")
  .addEventListener("click", function () {
    closeBurgerMenu();
  });

document.querySelector(".overlay").addEventListener("click", function () {
  closeBurgerMenu();
  document.querySelector('.pets-pop-up').style.visibility = 'hidden';
});

let col = 3;

const btnR = document.querySelector('.slider-button_reverted');
const btnL = document.querySelector('.slider-button');

let buffer = [];
//shuffle
function shuffle() {
  for (let i=0; i<3; i++) {
    buffer.push(data[i]);
  }
  data.splice(0,3);
  data.sort(() => Math.random() - 0.5);
  for (let i=0; i<3; i++) {
    data.push(buffer[i]);
  }
  buffer = [];
  return data;
}

export function getPet(ind, usingData) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("pets-card");

  const contentElement = document.createElement("div");
  contentElement.classList.add("pets-card__content");

  const image = document.createElement("img");
  image.setAttribute("src", "../../assets/images/" + usingData[ind].name + ".png");
  image.setAttribute("alt", '"' + usingData[ind].name + '"');
  image.classList.add("pets-content__image");

  const titleElement = document.createElement("h4");
  titleElement.classList.add("pets-card__title");
  titleElement.textContent = `${usingData[ind].name}`;

  const buttonElement = document.createElement("button");
  buttonElement.classList.add("pets-card__button");
  buttonElement.textContent = "Learn More";

  contentElement.appendChild(titleElement);
  contentElement.appendChild(buttonElement);
  cardElement.appendChild(image);
  cardElement.appendChild(contentElement);
  return cardElement;
}

let learnMore = document.getElementsByClassName('pets-card');

if (btnR)
btnR.addEventListener("click", function () {
  
  btnR.disabled = true;
    document.querySelectorAll(".pets-card").forEach((e) => (e.classList.add('slideToRight')));

    setTimeout(() => {
    for (let i = 0; i < col; i++) {
        document
        .querySelector(".pets-cards")
        .insertAdjacentElement("afterbegin", getPet(i, data));
      }
      for (let i = 1; i < col+1; i++) {
        document.querySelector('.pets-card:nth-child(' + i + ')').style.transform = 'translate(-400%)'; 
      } 
    }, 400);
    
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        document.querySelector('.pets-card:nth-child(4)').remove(); 
      } 

      document
        .querySelectorAll(".pets-card")
        .forEach((e) => (e.style.transform = "translate(0)"));
      document
        .querySelectorAll(".pets-card")
        .forEach((e) => (e.style.transition = "transform 0.3s ease-in-out"));
    }, 450);

    setTimeout(() => {
    loadPop('.overlay');

      document
      .querySelectorAll(".pets-card")
      .forEach((e) => (e.style = ''));
      document.querySelectorAll(".pets-card").forEach((e) => (e.classList.remove('slideToRight')));
      shuffle(data);
  
    }, 750);

    setTimeout(function() { 
      btnR.disabled = false;
     }, 800);
  });

if (btnL)
btnL.addEventListener("click", function () {
  
    btnL.disabled = true;
      
      document.querySelectorAll(".pets-card").forEach((e) => (e.classList.add('slideToLeft')));
  
      setTimeout(() => {
      for (let i = 0; i < col; i++) {
          document
          .querySelector(".pets-cards")
          .insertAdjacentElement('beforeend', getPet(i, data));
        }
  
        for (let i = col+1; i < 2*col+1; i++) {
          document.querySelector('.pets-card:nth-child(' + i + ')').style.transform = 'translate(400%)'; 
  
        } 
      }, 400);
      
      setTimeout(() => {
        for (let i = 0; i < 3; i++) {
          document.querySelector('.pets-card:nth-child(1)').remove(); 
        } 
  
        document
          .querySelectorAll(".pets-card")
          .forEach((e) => (e.style.transform = "translate(0)"));
        document
          .querySelectorAll(".pets-card")
          .forEach((e) => (e.style.transition = "transform 0.3s ease-in-out"));
      }, 450);
  
      setTimeout(() => {
        document
        .querySelectorAll(".pets-card")
        .forEach((e) => (e.style = ''));
      document.querySelectorAll(".pets-card").forEach((e) => (e.classList.remove('slideToLeft')));
        shuffle(data);
        loadPop();
      }, 750);
  
      setTimeout(function() { 
        btnL.disabled = false;
      }, 800);
    });

    //INFO

  const btnExit = document.querySelector('.pets-pop-up-btn');

let cTitle;

export function loadPop(nameOfOverlay) {

  learnMore = document.getElementsByClassName('pets-card');
  for (let i=0;i<learnMore.length;i++) {
    learnMore[i].addEventListener("click", function (){
      document.querySelector("html").style.overflow = "hidden";
      cTitle = this.querySelector('.pets-card__title');
      let count = 0;
      for(let j=0;j<8;j++) {
        if (data[j].name == cTitle.textContent) count=j;
      }
      document.querySelector('.pets-pop-up-type').innerText = data[count].type;
      document.querySelector('.pets-pop-up-breed').innerText = data[count].breed;
      document.querySelector('.pets-pop-up-description').innerText = data[count].description;
      document.querySelector('.pets-pop-up-age').innerText = data[count].age;
      document.querySelector('.pets-pop-up-inoculations').innerText = data[count].inoculations;
      document.querySelector('.pets-pop-up-diseases').innerText = data[count].diseases;
      document.querySelector('.pets-pop-up-parasites').innerText = data[count].parasites;
      document.querySelector('.pets-pop-up-image img').setAttribute("src", "../../assets/images/" + data[count].name + ".png");
      document.querySelector('.pets-pop-up-name').innerText = cTitle.textContent;
      document.querySelector(`${nameOfOverlay}`).style.visibility = "visible";
      document.querySelector('.pets-pop-up').style.visibility = 'visible';
    });

    let overl = document.querySelector(`${nameOfOverlay}`);
    btnExit.addEventListener('click', function() {
      document.querySelector('.pets-pop-up').style.visibility = 'hidden';
      document.querySelector(`${nameOfOverlay}`).style.visibility = "hidden";
      document.querySelector("html").style.overflowY = "scroll";
    })

    overl.addEventListener('mouseover',function (e) {
      btnExit.classList.add('btn-hover')
  });
  overl.addEventListener('mouseout',function (e) {
    btnExit.classList.remove('btn-hover')
  });
  overl.addEventListener('click', () => {
    overl.style.visibility = "hidden";
    document.querySelector('.pets-pop-up').style.visibility = 'hidden';
    document.querySelector("html").style.overflowY = "scroll";
  })

  }
}
loadPop('.overlay');