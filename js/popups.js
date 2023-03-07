import { switchingSaveButton } from "./forms/valid-input.js";

export const popupAddingPlace = document.querySelector('.popup-add-place');
export const popupEditingProfile = document.querySelector('.popup-edit-profile');

// : Ф открытия формы редактирования профиля
export function openPopupEditingProfile() {
  const saveButton = popupEditingProfile.querySelector('.popup__save-button');
  const nameProfile = document.querySelector('.profile__name');
  const professionProfile = document.querySelector('.profile__profession');
  const inputFormName = document.querySelector('#input-name');
  const inputFormProfession = document.querySelector('#input-profession');
  inputFormName.value = nameProfile.textContent;
  inputFormProfession.value = professionProfile.textContent;
  switchingSaveButton([inputFormName, inputFormProfession], saveButton);
  openPopup(popupEditingProfile);
};

// :кнопка закрытия формы
const closingButtons = document.querySelectorAll('.popup__close-button');
closingButtons.forEach(closingBtn => {
  closingBtn.addEventListener('click', () => {
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
        closePopup(overlayBtn);
      }
    });
  }
});

// :открытие и закрытие модального окна
export function openPopup(targetPopup) {
  targetPopup.classList.add('popup_opened');
};

export function closePopup(targetPopup) {
  targetPopup.classList.remove('popup_opened');
};
