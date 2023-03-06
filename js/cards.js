import { dataCards } from "./datacard";
import { popupAddingPlace } from "./index.js";
import { closePopup } from "./popups";

const elements = document.querySelector('.elements');


export function postCard() {
  const nameCard = popupAddingPlace.querySelector('#input-title').value;
  const linkCard = popupAddingPlace.querySelector('#input-link').value;
  addElement(createElement(nameCard, linkCard));
  closePopup(popupAddingPlace);
};


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

const initialContent = () => dataCards.forEach(card => {
  addElement(createElement(card.name, card.link));
});

initialContent();
