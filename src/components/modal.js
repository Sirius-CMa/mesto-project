const page = document.querySelector('.page');



// :открытие и закрытие модального окна
export function openPopup(targetPopup) {
  page.addEventListener('keydown', closeOpenedPopupByEsc)
  targetPopup.classList.add('popup_opened');
};

export function closePopup(targetPopup) {
  page.removeEventListener('keydown', closeOpenedPopupByEsc)
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

