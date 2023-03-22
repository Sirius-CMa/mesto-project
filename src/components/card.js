import { openFullsizeImage, idProfile, popupConfirmationDeletion } from "../index.js"
import { checkButton } from "./utils.js";
import { deleteCardServer, addLikeServer, removeLikeServer } from "./api.js";
import { openPopup } from "./modal.js";

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
};

export const createElement = (card) => {    // : Ф создания блока "element"
  const cardElement = formTemplate.querySelector('.element').cloneNode(true);
  const imageElement = cardElement.querySelector('.element__image');
  const likesElement = cardElement.querySelector('.element__likes');
  const deleteElement = cardElement.querySelector('.element__button-delete');
  const buttonHeart = cardElement.querySelector('.element__button-heart');

  cardElement.dataset.id = card._id;

  checkButtonHeart(card.likes) && buttonHeart.classList.add('element__button-heart_active');

  card.owner._id === idProfile._id
    ? cardElement.querySelector('.element__button-delete').addEventListener('click', startPreparingDeletion)
    : deleteElement.classList.add('element__button-delete_disabled');

  likesElement.textContent = countLikes(card);

  cardElement.querySelector('.element__title').textContent = card.name;
  imageElement.src = card.link;
  imageElement.alt = card.name;

  cardElement.querySelector('.element__button-heart').addEventListener('click', handleLike);
  imageElement.addEventListener('click', openFullsizeImage);

  return cardElement;
};

export const addCardInBlockElements = (cardElement) => {     // : ф добавления "element"
  elements.prepend(cardElement);
};



export function deleteCard(id, evt) {     // : удаление карточки
  checkButton(evt, 'Удаляется...')
  deleteCardServer(id)
    .then(() => {
      deleteCardOnPage(id);
    })
    .catch(err => console.log(err))
    .finally(() => checkButton(evt, 'Да'))
};

const indicateLike = (card, evt) => {         // : отображение лайка на странице
  const numberLikes = evt.target.parentNode.querySelector('.element__likes');
  numberLikes.textContent = countLikes(card);
  checkButtonHeart(card.likes)
    ? evt.target.classList.add('element__button-heart_active')
    : evt.target.classList.remove('element__button-heart_active')
}

function handleLike(evt) {                // : обработка лайка
  const id = evt.target.closest('.element').dataset.id;
  if (evt.target.classList.contains('element__button-heart_active')) {
    removeLikeServer(id)
      .then(res => indicateLike(res, evt))
      .catch(err => console.log(err))
  }
  else {
    addLikeServer(id)
      .then(res => indicateLike(res, evt))
      .catch(err => console.log(err))
  };
};
