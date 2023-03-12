import { popupAddingPlace, openPopup, popupDeleteCard, openPopupPhoto } from "./modal.js";
import { saveNewCardServer, deleteCardServer, addLike, removeLike, getContentServer } from "./api.js";
import { idProfile } from "./profile.js";
import { checkButton, loadImage } from "./utils.js";

const elements = document.querySelector('.elements');

function initCardElement() {
  const elements = document.querySelector('.elements');

  elements.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__button-heart')) {
      evt.stopPropagation();

      likeCard(evt.target.closest('.element').dataset.id, evt);
    }
    if (evt.target.classList.contains('element__button-delete')) {
      evt.stopPropagation();
      popupDeleteCard.dataset.deleteCard = evt.target.closest('.element').dataset.id;
      openPopup(popupDeleteCard)
    }

    if (evt.target.classList.contains('element__image')) {
      evt.stopPropagation();
      openPopupPhoto(evt);
    }
  }
  )
};

const checkButtonHeart = (likes) => likes.find(like => like._id === idProfile._id);

export function saveNewCard(evt) {
  const nameCard = popupAddingPlace.querySelector('#input-title').value;
  const linkCard = popupAddingPlace.querySelector('#input-link').value;
  checkButton(evt, 'Создаётся...')
  saveNewCardServer(nameCard, linkCard)
    .then(res => {
      addElement(createElement(res))
      checkButton(evt, 'Создать', 1000)
    })
    .catch(err => {
      console.log(err)
      checkButton(evt, 'Создать', 1000)
    })
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


export function deleteCard(id, evt) {
  checkButton(evt, 'Удаляется...')
  deleteCardServer(id)
    .then(() => {
      document.querySelector(`[data-id='${id}']`).remove()
      checkButton(evt, 'Да', 1000)
    })
    .catch(err => {
      console.log(err)
      checkButton(evt, 'Да', 1000)
    })
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
      data.forEach(card => {
        loadImage(card.link)
          .then(() => {
            addElement(createElement(card))
          })
          .catch(err => console.error(err))
      })
    })
    .catch(err => console.log(err))
}


initCardElement();

// initialProfile()
// initialCard()





