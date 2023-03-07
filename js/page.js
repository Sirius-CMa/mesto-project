import { openPopupEditingProfile, popupAddingPlace, openPopup } from "./popups.js";

const profile = document.querySelector('.profile');

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
