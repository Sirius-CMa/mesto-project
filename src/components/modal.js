import { setListenerOnEscape, removeListenerOnEscape } from "../index.js";

// :открытие и закрытие модального окна
export function openPopup(targetPopup) {
  setListenerOnEscape();
  targetPopup.classList.add('popup_opened');
};

export function closePopup(targetPopup) {
  removeListenerOnEscape();
  targetPopup.classList.remove('popup_opened');
};

function findOpenedPopup() {
  return document.querySelector('.popup_opened');
}

export function closeOpenedPopupByEsc(evt) {
  if (evt.code == 'Escape') {
    closePopup(findOpenedPopup())
  }
}

