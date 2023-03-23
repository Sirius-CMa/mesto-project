
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

function closeOpenedPopupByEsc(evt) {
  if (evt.code === 'Escape') {
    closePopup(findOpenedPopup())
  }
}

const setListenerOnEscape = () => document.addEventListener('keydown', closeOpenedPopupByEsc);
const removeListenerOnEscape = () => document.removeEventListener('keydown', closeOpenedPopupByEsc);

