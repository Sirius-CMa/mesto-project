export const dataServer = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
  headers: {
    authorization: '639adf4e-3336-4963-8d2d-dff255a402e3',
    'Content-Type': 'application/json'
  }
};

export const dataUser = {};

export const popupElements = {
  inputSelector: '.popup__input',
  buttonSubmitSelector: '.popup__save-button',
  disablingModifierSubmitButton: 'popup__save-button_disabled',
  modifierInputError: 'popup__input_error', // красная линия
  modifierTextError: 'popup__input-error_active' // текст ошибки
};

export const popupSelectors = {
  editProfile: '.popup-edit-profile',
  addingPlace: '.popup-add-place',
  confirmationDeletion: '.popup-delete-card',
  editingAvatar: '.popup-edit-avatar',
  fullSizeImage: '.popup-photo-fullsize',
  invalidLink: '.popup-error-link'
};

export const defaultCardElementsSelectors = {
  //templateSelector: '#forms',
  cardSelector: '.element',
  image: '.element__image',
  blockNumderLikes: '.element__likes',
  buttonDelete: '.element__button-delete',
  buttonHeart: '.element__button-heart',
  activeModifierButtonHeart: 'element__button-heart_active',
  disablingModifierButtonDelete: 'element__button-delete_disabled',
  titleCard: '.element__title'
}

// : селекторы
export const blockElementsSelector = '.elements';
export const templateBlockSelector = '#forms';



export const $formsList = [...document.forms];

export const $buttonEditAvatar = document.querySelector('.profile__button-edit-avatar');
export const $buttonEditProfile = document.querySelector('.profile__button-edit-profile');
export const $buttonAddCard = document.querySelector('.profile__button-add-card');

export const $nameProfile = document.querySelector('.profile__name');
export const $aboutProfile = document.querySelector('.profile__profession');
export const $avatarProfile = document.querySelector('.profile__avatar');

// export const professionProfile = document.querySelector('.profile__profession');

const $formEditingProfile = document.getElementById('edit-profile');
export const $inputFormName = $formEditingProfile.querySelector('#input-name');
export const $inputFormAbout = $formEditingProfile.querySelector('#input-profession');
