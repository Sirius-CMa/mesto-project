import { openPopup, popupDeleteCard, openPopupPhoto } from "./popups.js";
import { likeCard } from "./cards.js";

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
}


initCardElement();


