import { dataCards } from "./datacard.js";
import { popupAddingPlace, closePopup } from "./popups.js";
import { initialContent } from "./api.js";

const elements = document.querySelector('.elements');


export function postCard() {
  const nameCard = popupAddingPlace.querySelector('#input-title').value;
  const linkCard = popupAddingPlace.querySelector('#input-link').value;
  addElement(createElement(nameCard, linkCard));
  closePopup(popupAddingPlace);
};


const createElement = (nameCard, linkCard) => {
  const formTemplate = document.querySelector('#forms').content;
  const elementForm = formTemplate.querySelector('.element').cloneNode(true);
  const imageElement = elementForm.querySelector('.element__image');
  elementForm.querySelector('.element__title').textContent = nameCard;
  imageElement.src = linkCard;
  imageElement.textContent = nameCard;
  return elementForm;
};

// : ф добавления "element"
const addElement = (elementForm) => {
  elements.prepend(elementForm);
};

export const initialCard = (data) => data.forEach(card => {
  addElement(createElement(card.name, card.link));
});





// const initialContent = () =>
//   new Promise(function (resolve, reject) {
//     fetch('https://nomoreparties.co/v1/plus-cohort-20/cards', {
//       headers: {
//         authorization: '639adf4e-3336-4963-8d2d-dff255a402e3'
//       }
//     })
//       .then(res => res.json())
//       .then((result) => {
//         result.forEach(item => {
//           addElement(createElement(item.name, item.link))

//         });
//       });
//   })








//initialContent2();
