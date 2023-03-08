import { openPopup } from "./popups.js";
import { deleteCard, likeCard } from "./cards.js";
import { deleteCardServer } from "./api.js";

function initCardElement() {
  const elements = document.querySelector('.elements');

  elements.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__button-heart')) {
      evt.stopPropagation();

      likeCard(evt.target.closest('.element').dataset.id, evt);
    }
    if (evt.target.classList.contains('element__button-delete')) {
      evt.stopPropagation();
      deleteCardServer(evt.target.closest('.element').dataset.id, evt)

    }
    if (evt.target.classList.contains('element__image')) {
      evt.stopPropagation();
      openPopupPhoto(evt);
    }
  }
  )

}
const popupFullsizeImage = document.querySelector('.popup-photo-fullsize');
const popupPhoto = popupFullsizeImage.querySelector('.popup__photo');
const popupCaption = popupFullsizeImage.querySelector('.popup__caption');

const openPopupPhoto = (evt) => {
  popupPhoto.src = evt.target.src;
  popupPhoto.alt = evt.target.textContent;
  popupCaption.textContent = evt.target.textContent;
  openPopup(popupFullsizeImage);
};

initCardElement();

