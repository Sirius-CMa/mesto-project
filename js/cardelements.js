import { openPopup } from "./index.js";

export function initCardElement() {
  const elements = document.querySelector('.elements');

  elements.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__button-heart')) {
      // evt.target.classList.toggle('element__button-heart_active')
      likeCard(evt)
    }
    if (evt.target.classList.contains('element__button-delete')) {
      deleteCard(evt)
    }
    if (evt.target.classList.contains('element__image')) {
      openPopupPhoto(evt)
    }
  }
  )

  const deleteCard = (evt) => {
    evt.target.closest('.element').remove();
  };
  const likeCard = (evt) =>
    evt.target.classList.toggle('element__button-heart_active');
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

export * from "./cardelements.js"
