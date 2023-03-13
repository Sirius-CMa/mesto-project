import { initialCards } from "./datacard";
import { popupAddingPlace, openPopupPhoto, closePopup, openPopupEditingProfile } from "./modal";

const elements = document.querySelector('.elements');

const nameCardForm = popupAddingPlace.querySelector('#input-title');
const linkCardForm = popupAddingPlace.querySelector('#input-link');

export function postData(evt) {
  evt.preventDefault();
  const nameCard = nameCardForm.value;
  const linkCard = linkCardForm.value;

  if (linkCard === "") {
    alert('Поле "Ссылка на изображение" должно быть заполнено!');
  }
  else {
    addElement(createElement(nameCard, linkCard));
    closePopup(popupAddingPlace);
  }
};

function deleteCard(evt) {
  evt.target.closest('.element').remove();
};

function likeCard(evt) {
  evt.target.classList.toggle('element__button-heart_active');
};

// : Ф создания блока "element"
const createElement = (nameCard, linkCard) => {
  const formTemplate = document.querySelector('#forms').content;
  const elementForm = formTemplate.querySelector('.element').cloneNode(true);
  const imageElement = elementForm.querySelector('.element__image');
  elementForm.querySelector('.element__title').textContent = nameCard;
  imageElement.src = linkCard;
  imageElement.textContent = nameCard;
  elementForm.querySelector('.element__button-heart').addEventListener('click', likeCard);
  elementForm.querySelector('.element__button-delete').addEventListener('click', deleteCard);
  imageElement.addEventListener('click', openPopupPhoto);

  return elementForm;
};


// : ф добавления "element"
const addElement = (elementForm) => {
  elements.prepend(elementForm);
};

// : цикл для считывания данных из массива карточек
initialCards.forEach(card => {
  addElement(createElement(card.name, card.link));
});
