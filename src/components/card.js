import { openFullsizeImage, idProfile, nameCardForm, linkCardForm, popupConfirmationDeletion } from "../index.js"
import { checkButton } from "./utils.js";
import { saveNewCardServer } from "./api.js";
import { openPopup } from "./modal.js";

const formTemplate = document.querySelector('#forms').content;
const elements = document.querySelector('.elements');



const checkButtonHeart = (likes) => likes.find(like => like._id === idProfile._id);

function deleteCardOnPage(evt) {
  document.querySelector(`[data-id='${id}']`).remove()
  // evt.target.closest('.element').remove();
};

function startPreparingDeletion(evt) {
  // evt.stopPropagation();
  popupConfirmationDeletion.dataset.deleteCard = evt.target.closest('.element').dataset.id;
  openPopup(popupConfirmationDeletion)
}


export function likeCard(evt) {
  evt.target.classList.toggle('element__button-heart_active');
};

// : Ф создания блока "element"
export const createElement = (card) => {
  const elementForm = formTemplate.querySelector('.element').cloneNode(true);
  const imageElement = elementForm.querySelector('.element__image');
  const likesElement = elementForm.querySelector('.element__likes');
  const deleteElement = elementForm.querySelector('.element__button-delete');
  const buttonHeart = elementForm.querySelector('.element__button-heart');

  elementForm.dataset.id = card._id;

  checkButtonHeart(card.likes)
    ? buttonHeart.classList.add('element__button-heart_active')
    : ''

  card.owner._id === idProfile._id
    ? ''
    : deleteElement.classList.add('element__button-delete_disabled')

  likesElement.textContent = card.likes.length === 0
    ? ''
    : card.likes.length

  elementForm.querySelector('.element__title').textContent = card.name;
  imageElement.src = card.link;
  imageElement.alt = card.name;

  elementForm.querySelector('.element__button-heart').addEventListener('click', likeCard);
  elementForm.querySelector('.element__button-delete').addEventListener('click', startPreparingDeletion);
  imageElement.addEventListener('click', openFullsizeImage);

  return elementForm;
};

// : ф добавления "element"
export const addElement = (elementForm) => {
  elements.prepend(elementForm);
};

// const nameCardForm = formAddingPlace.querySelector('#input-title');
// const linkCardForm = formAddingPlace.querySelector('#input-link');


export function saveNewCard(evt) {
  const nameCard = nameCardForm.value;
  const linkCard = linkCardForm.value;
  checkButton(evt, 'Создаётся...')
  saveNewCardServer(nameCard, linkCard)
    .then(res => {
      addElement(createElement(res))
      checkButton(evt, 'Создать')
    })
    .catch(err => {
      console.log(err)
      checkButton(evt, 'Создать')
    })
};

export function deleteCard(id, evt) {
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
