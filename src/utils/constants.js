export const idProfile = {};

export const popupElements = {
  form: '.form',
  input: '.popup__input',
  saveButton: '.popup__save-button',
  disablingModifierButton: 'popup__save-button_disabled',
  inputErrorModifier: 'popup__input_error', // красная линия
  textErrorModifier: 'popup__input-error_active' // текст ошибки
};

export const popupSelectors = {
  editProfile: '.popup-edit-profile',
  addingPlace: '.popup-add-place',
  confirmationDeletion: '.popup-delete-card',
  editingAvatar: '.popup-edit-avatar',
  fullsizeImage: '.popup-photo-fullsize'
};

// : селекторы
export const blockElementsSelector = '.elements';


export const popupsList = [...document.querySelectorAll('.popup')]

export const buttonEditAvatar = document.querySelector('.profile__button-edit-avatar');
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddCard = document.querySelector('.profile__add-button');

export const nameProfile = document.querySelector('.profile__name');
export const aboutProfile = document.querySelector('.profile__profession');
export const avatarProfile = document.querySelector('.profile__avatar');

export const professionProfile = document.querySelector('.profile__profession');

const formEditingProfile = document.getElementById('edit-profile');
export const inputFormName = formEditingProfile.querySelector('#input-name');
export const inputFormAbout = formEditingProfile.querySelector('#input-profession');
