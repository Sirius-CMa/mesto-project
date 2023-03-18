import { openFullsizeImage } from "../index.js"

const formTemplate = document.querySelector('#forms').content;
const elements = document.querySelector('.elements');

export function deleteCard(evt) {
  evt.target.closest('.element').remove();
};

export function likeCard(evt) {
  evt.target.classList.toggle('element__button-heart_active');
};

// : Ф создания блока "element"
export const createElement = (nameCard, linkCard) => {
  const elementForm = formTemplate.querySelector('.element').cloneNode(true);
  const imageElement = elementForm.querySelector('.element__image');
  elementForm.querySelector('.element__title').textContent = nameCard;
  imageElement.src = linkCard;
  imageElement.textContent = nameCard;
  elementForm.querySelector('.element__button-heart').addEventListener('click', likeCard);
  elementForm.querySelector('.element__button-delete').addEventListener('click', deleteCard);
  imageElement.addEventListener('click', openFullsizeImage);
  return elementForm;
};


// : ф добавления "element"
export const addElement = (elementForm) => {
  elements.prepend(elementForm);
};


