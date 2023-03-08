//import { dataCards } from "./datacard.js";
import { popupAddingPlace, closePopup } from "./popups.js";
import { saveCard, idProfile, deleteCardServer } from "./api.js";

const elements = document.querySelector('.elements');





export function postCard() {
  const nameCard = popupAddingPlace.querySelector('#input-title').value;
  const linkCard = popupAddingPlace.querySelector('#input-link').value;
  // addElement(createElement(nameCard, linkCard));
  // saveCard(nameCard, linkCard)
  //addElement(createElement(saveCard(nameCard, linkCard)))
  saveCard(nameCard, linkCard)
  closePopup(popupAddingPlace);
};






export const createElement = (card) => {

  const formTemplate = document.querySelector('#forms').content;
  const elementForm = formTemplate.querySelector('.element').cloneNode(true);
  const imageElement = elementForm.querySelector('.element__image');
  const likesElement = elementForm.querySelector('.element__likes');
  const deleteElement = elementForm.querySelector('.element__button-delete')
  console.log(card)
  elementForm.dataset.id = card._id

  card.owner._id === idProfile._id ? '' : deleteElement.classList.add('element__button-delete_disabled')

  likesElement.textContent = card.likes.length === 0 ? '' : card.likes.length
  elementForm.querySelector('.element__title').textContent = card.name;
  imageElement.src = card.link;
  imageElement.textContent = card.name;
  return elementForm;
};

// : ф добавления "element"
export const addElement = (elementForm) => {
  elements.prepend(elementForm);
};


export const deleteCard = (evt) => {
  let element = evt.target.closest('.element')
  deleteCardServer(element.dataset.id)
  element.remove();
};
export const likeCard = (evt) =>
  evt.target.classList.toggle('element__button-heart_active');

export const initialCard = (data) => data.forEach(card => {
  addElement(createElement(card));
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
