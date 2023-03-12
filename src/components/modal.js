import { switchingSaveButton, cleareInputs, popupElements } from "./validate";


export const popupAddingPlace = document.querySelector('.popup-add-place');
export const popupEditingProfile = document.querySelector('.popup-edit-profile');
export const popupEditingAvatar = document.querySelector('.popup-edit-avatar')
export const popupErrorAvatar = document.querySelector('.popup-error-avatar')
export const popupDeleteCard = document.querySelector('.popup-delete-card')
const popupFullsizeImage = document.querySelector('.popup-photo-fullsize');

// : Ф открытия формы редактирования профиля
export function openPopupEditingProfile() {
  const saveButton = popupEditingProfile.querySelector(popupElements.saveButton);
  const nameProfile = document.querySelector('.profile__name');
  const professionProfile = document.querySelector('.profile__profession');
  const inputFormName = document.querySelector('#input-name');
  const inputFormProfession = document.querySelector('#input-profession');
  inputFormName.value = nameProfile.textContent;
  inputFormProfession.value = professionProfile.textContent;
  switchingSaveButton([inputFormName, inputFormProfession], saveButton, popupElements);
  openPopup(popupEditingProfile);
};

// :кнопка закрытия формы
const closingButtons = document.querySelectorAll('.popup__close-button');
closingButtons.forEach(closingBtn => {
  closingBtn.addEventListener('click', () => {
    cleareInputs(popupElements);
    closePopup(closingBtn.closest('.overlay'));
  })
});

// : "кнопка" закрытия модального окна по клику на overlay
const popupOverlay = document.querySelectorAll('.overlay');
popupOverlay.forEach(overlayBtn => {
  if (overlayBtn.classList.contains('overlay')) {
    overlayBtn.addEventListener('click', (evt) => {
      if (evt.target === overlayBtn) {
        evt.stopPropagation();
        cleareInputs(popupElements);
        closePopup(overlayBtn);
      }
    });
  }
});


const createPopupFullsizePhoto = (evt) => {
  const popupPhoto = popupFullsizeImage.querySelector('.popup__photo');
  const popupCaption = popupFullsizeImage.querySelector('.popup__caption');
  popupPhoto.src = evt.target.src;
  popupPhoto.alt = evt.target.textContent;
  popupCaption.textContent = evt.target.textContent;
}

export const openPopupPhoto = (evt) => {
  createPopupFullsizePhoto(evt)
  openPopup(popupFullsizeImage);
};

function findOpenedPopup() {
  return document.querySelector('.popup_opened');
}

// :открытие и закрытие модального окна
export function openPopup(targetPopup) {
  targetPopup.classList.add('popup_opened');
};

export function closePopup(targetPopup) {
  targetPopup.classList.remove('popup_opened');
};

export const closeOpenedPopupByEsc = () => {
  closePopup(findOpenedPopup());
  cleareInputs(popupElements);
};
