import { openFullsizeImage, idProfile, nameCardForm, linkCardForm, popupConfirmationDeletion, popupAddingPlace, popupElements, formAddingPlace, popupErrorLink } from "../index.js"
import { checkButton, loadImage } from "./utils.js";
import { saveNewCardServer, deleteCardServer, addLikeServer, removeLikeServer } from "./api.js";
import { closePopup, openPopup } from "./modal.js";

const formTemplate = document.querySelector('#forms').content;
const elements = document.querySelector('.elements');


const checkButtonHeart = (likes) => likes.find(like => like._id === idProfile._id);

function deleteCardOnPage(id) {            // : удаление карточки из блока elements
  document.querySelector(`[data-id='${id}']`).remove();
};

function startPreparingDeletion(evt) {
  popupConfirmationDeletion.dataset.deleteCard = evt.target.closest('.element').dataset.id;
  openPopup(popupConfirmationDeletion);
};

function countLikes(card) {
  return card.likes.length === 0
    ? ''
    : card.likes.length
}

export const createElement = (card) => {    // : Ф создания блока "element"
  const elementForm = formTemplate.querySelector('.element').cloneNode(true);
  const imageElement = elementForm.querySelector('.element__image');
  const likesElement = elementForm.querySelector('.element__likes');
  const deleteElement = elementForm.querySelector('.element__button-delete');
  const buttonHeart = elementForm.querySelector('.element__button-heart');

  elementForm.dataset.id = card._id;

  checkButtonHeart(card.likes)
    ? buttonHeart.classList.add('element__button-heart_active')
    : '';

  card.owner._id === idProfile._id
    ? elementForm.querySelector('.element__button-delete').addEventListener('click', startPreparingDeletion)
    : deleteElement.classList.add('element__button-delete_disabled');

  likesElement.textContent = countLikes(card);

  elementForm.querySelector('.element__title').textContent = card.name;
  imageElement.src = card.link;
  imageElement.alt = card.name;

  elementForm.querySelector('.element__button-heart').addEventListener('click', likeCard);
  imageElement.addEventListener('click', openFullsizeImage);

  return elementForm;
};

export const addElement = (elementForm) => {     // : ф добавления "element"
  elements.prepend(elementForm);
};

export function saveNewCard(evt) {     // : добавление карточки
  const nameCard = nameCardForm.value;
  const linkCard = linkCardForm.value;
  loadImage(linkCard)
    .then(() => {
      checkButton(evt, 'Создаётся...')
      saveNewCardServer(nameCard, linkCard)
        .then(res => {
          addElement(createElement(res));
          checkButton(evt, 'Создать');
        })
        .catch(err => {
          console.log(err);
          checkButton(evt, 'Создать');
        })
    })
    .catch(() => {
      popupErrorLink.dataset.targetPopup = popupAddingPlace.id
      console.log('Картинка - \n', popupErrorLink.dataset.targetPopup);
      checkButton(evt, 'Создать');
      closePopup(popupAddingPlace);
      openPopup(popupErrorLink);
    })
};

export function deleteCard(id, evt) {     // : удаление карточки
  checkButton(evt, 'Удаляется...')
  deleteCardServer(id)
    .then(() => {
      deleteCardOnPage(id);
      checkButton(evt, 'Да')
    })
    .catch(err => {
      console.log(err)
      checkButton(evt, 'Да')
    })
};

const handleLike = (card, evt) => {         // : отображение лайка на странице
  const numberLikes = evt.target.parentNode.querySelector('.element__likes');
  numberLikes.textContent = countLikes(card);
  checkButtonHeart(card.likes)
    ? evt.target.classList.add('element__button-heart_active')
    : evt.target.classList.remove('element__button-heart_active')
}

function likeCard(evt) {                // : обработка лайка
  const id = evt.target.closest('.element').dataset.id;
  if (evt.target.classList.contains('element__button-heart_active')) {
    removeLikeServer(id)
      .then(res => handleLike(res, evt))
      .catch(err => console.log(err))
  }
  else {
    addLikeServer(id)
      .then(res => handleLike(res, evt))
      .catch(err => console.log(err))
  };
};
