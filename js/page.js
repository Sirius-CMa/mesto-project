import { openPopupEditingProfile, popupAddingPlace, openPopup, popupEditingAvatar } from "./popups.js";

export const profile = document.querySelector('.profile');

// : кнопка редактирования профиля
const editingButton = profile.querySelector('.profile__edit-button');
editingButton.addEventListener('click',
  openPopupEditingProfile
);

// : кнопка открытия формы добавления элемента
const addingButton = profile.querySelector('.profile__add-button');
addingButton.addEventListener('click', () => {
  openPopup(popupAddingPlace);
});

// : кнопка редактирования аватара
const editingAvatarButton = profile.querySelector('.profile__button-edit')
editingAvatarButton.addEventListener('click', () =>
  openPopup(popupEditingAvatar))
