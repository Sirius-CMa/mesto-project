//import { dataCards } from "./datacard.js";
import { popupAddingPlace, closePopup } from "./popups.js";
import { saveCard, idProfile, deleteCardServer, addLike, removeLike } from "./api.js";

const elements = document.querySelector('.elements');





export function postCard() {
  const nameCard = popupAddingPlace.querySelector('#input-title').value;
  const linkCard = popupAddingPlace.querySelector('#input-link').value;
  saveCard(nameCard, linkCard)
  closePopup(popupAddingPlace);
};



const initButtonHeart = (likes) => likes.find(like => like._id === idProfile._id)

export const createElement = (card) => {

  const formTemplate = document.querySelector('#forms').content;
  const elementForm = formTemplate.querySelector('.element').cloneNode(true);
  const imageElement = elementForm.querySelector('.element__image');
  const likesElement = elementForm.querySelector('.element__likes');
  const deleteElement = elementForm.querySelector('.element__button-delete');
  const buttonHeart = elementForm.querySelector('.element__button-heart');

  initButtonHeart(card.likes)
    ? buttonHeart.classList.add('element__button-heart_active')
    : ''

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


export const deleteCard = (evt) =>
  evt.target.closest('.element').remove();


export const handleLike = (card, evt) => {
  let numberLikes = evt.target.parentNode.querySelector('.element__likes');
  initButtonHeart(card.likes)
    ? (evt.target.classList.add('element__button-heart_active'), numberLikes.textContent = card.likes.length)
    : (evt.target.classList.remove('element__button-heart_active'), numberLikes.textContent = card.likes.length)
}



export const likeCard = (id, evt) =>
  evt.target.classList.contains('element__button-heart_active')
    ? removeLike(id, evt)
    : addLike(id, evt)


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
