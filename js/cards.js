import { loadImage } from "./image.js";
import { popupAddingPlace, closePopup } from "./popups.js";
import { saveNewCardServer, deleteCardServer, addLike, removeLike, getContentServer } from "./api.js";
import { idProfile, initialProfile } from "./profile.js";

const elements = document.querySelector('.elements');

const checkButtonHeart = (likes) => likes.find(like => like._id === idProfile._id);

export function saveNewCard() {
  const nameCard = popupAddingPlace.querySelector('#input-title').value;
  const linkCard = popupAddingPlace.querySelector('#input-link').value;
  saveNewCardServer(nameCard, linkCard)
    .then(res => addElement(createElement(res)))
    .catch(err => console.log(err))
}

export const createElement = (card) => {
  const formTemplate = document.querySelector('#forms').content;
  const elementForm = formTemplate.querySelector('.element').cloneNode(true);
  const imageElement = elementForm.querySelector('.element__image');
  const likesElement = elementForm.querySelector('.element__likes');
  const deleteElement = elementForm.querySelector('.element__button-delete');
  const buttonHeart = elementForm.querySelector('.element__button-heart');

  checkButtonHeart(card.likes)
    ? buttonHeart.classList.add('element__button-heart_active')
    : ''

  elementForm.dataset.id = card._id

  card.owner._id === idProfile._id
    ? ''
    : deleteElement.classList.add('element__button-delete_disabled')

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


export function deleteCard(id) {
  deleteCardServer(id)
    .then(document.querySelector(`[data-id='${id}']`).remove())
    .catch(err => console.log(err))
}

export const handleLike = (card, evt) => {
  const numberLikes = evt.target.parentNode.querySelector('.element__likes');
  numberLikes.textContent = card.likes.length
  checkButtonHeart(card.likes)
    ? evt.target.classList.add('element__button-heart_active')
    : evt.target.classList.remove('element__button-heart_active')
}

export function likeCard(id, evt) {
  if (evt.target.classList.contains('element__button-heart_active')) {
    removeLike(id)
      .then(res => handleLike(res, evt))
      .catch(err => console.log(err))
  }
  else {
    addLike(id)
      .then(res => handleLike(res, evt))
      .catch(err => console.log(err))
  }
}








export function initialCard() {
  getContentServer()
    .then(data => {
      console.log(data)
      data.forEach(card => {
        loadImage(card.link)
          .then(() => {
            addElement(createElement(card))
          })
          .catch(console.log('Ошибка ссылки фото'))
      })
    })
    .catch(err => console.log(err))
}

initialProfile()
initialCard()





