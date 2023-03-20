import { openFullsizeImage, idProfile } from "../index.js"

const formTemplate = document.querySelector('#forms').content;
const elements = document.querySelector('.elements');



const checkButtonHeart = (likes) => likes.find(like => like._id === idProfile._id);

export function deleteCard(evt) {
  evt.target.closest('.element').remove();
};

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
  elementForm.querySelector('.element__button-delete').addEventListener('click', deleteCard);
  imageElement.addEventListener('click', openFullsizeImage);

  return elementForm;
};


// : ф добавления "element"
export const addElement = (elementForm) => {
  elements.prepend(elementForm);
};


