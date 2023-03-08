import { openPopup } from "./popups.js";
import { deleteCard, likeCard } from "./cards.js";

function initCardElement() {
  const elements = document.querySelector('.elements');

  elements.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__button-heart')) {
      evt.stopPropagation();
      likeCard(evt);
    }
    if (evt.target.classList.contains('element__button-delete')) {
      evt.stopPropagation();
      deleteCard(evt);
    }
    if (evt.target.classList.contains('element__image')) {
      evt.stopPropagation();
      openPopupPhoto(evt);
    }
  }
  )

  // const deleteCard = (evt) => {
  //   evt.target.closest('.element').remove();
  // };
  // const likeCard = (evt) =>
  //   evt.target.classList.toggle('element__button-heart_active');
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


//export * from "./cardelements.js"
