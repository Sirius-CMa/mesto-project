import { initialCards } from "./datacard";
import { popupAddingPlace, closePopup, formAddingPlace } from "./modal";
import { switchingSaveButto, popupElements } from "./validate";

const elements = document.querySelector('.elements');


export function postData(evt) {
  evt.preventDefault();
  const nameCard = formAddingPlace.querySelector('#input-title').value;// nameCardForm.value;
  const linkCard = formAddingPlace.querySelector('#input-link').value //linkCardForm.value;

  if (linkCard === "") {
    alert('Поле "Ссылка на изображение" должно быть заполнено!');
  }
  else {
    addElement(createElement(nameCard, linkCard));
    closePopup(popupAddingPlace);
  }
};

export function deleteCard(evt) {
  evt.target.closest('.element').remove();
};

export function likeCard(evt) {
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
