import '../pages/index.css';
import './components/index.js'
import './components/validate.js'
import './components/utils.js'
import './components/modal.js'
import './components/card.js'
import './components/datacard.js'

import { closePopup, openPopup } from './components/modal.js'
import { postData, deleteCard, likeCard } from './components/card.js';
import { popupElements, isValid, switchingSaveButton, initForms, prepareForm } from './components/validate.js';

export const profile = document.querySelector('.profile');
export const nameProfile = profile.querySelector('.profile__name');
export const professionProfile = profile.querySelector('.profile__profession');

// : попапы
const popupFullsizeImage = document.querySelector('.popup-photo-fullsize');
export const popupAddingPlace = document.querySelector('.popup-add-place');
export const popupEditingProfile = document.querySelector('.popup-edit-profile');

// : формы
export const formEditingProfile = document.getElementById('edit-profile');
export const formAddingPlace = document.getElementById('add-place');
export const saveBtnAddPlace = formAddingPlace.querySelector(popupElements.saveButton)

// : переменные редактирования профиля
export const inputFormName = formEditingProfile.querySelector('#input-name');
export const inputFormProfession = formEditingProfile.querySelector('#input-profession');

// : Ф открытия формы редактирования профиля
export function openPopupEditingProfile() {
  const saveButton = popupEditingProfile.querySelector(popupElements.saveButton);
  inputFormName.value = nameProfile.textContent;
  inputFormProfession.value = professionProfile.textContent;
  switchingSaveButton([inputFormName, inputFormProfession], saveButton, popupElements)
  openPopup(popupEditingProfile);
};


// : Ф открытие модального окна с полноразмерным изображением
const popupPhoto = popupFullsizeImage.querySelector('.popup__photo');
const popupCaption = popupFullsizeImage.querySelector('.popup__caption');

export function enterDataPopupPhoto(evt) {
  popupPhoto.src = evt.target.src;
  popupPhoto.alt = evt.target.textContent;
  popupCaption.textContent = evt.target.textContent;
  openPopup(popupFullsizeImage);
};


// : Ф сохранения данных из формы ввода
export function saveProfile(evt) {
  nameProfile.textContent = inputFormName.value;
  professionProfile.textContent = inputFormProfession.value;
  closePopup(popupEditingProfile);
};


export function setListenerInputs(formPopup, popupElements) {
  const saveBtn = formPopup.querySelector(popupElements.saveButton)
  const inputs = [...formPopup.querySelectorAll(popupElements.input)]
  switchingSaveButton(inputs, saveBtn, popupElements)
  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      isValid(input, formPopup, popupElements);
      switchingSaveButton(inputs, saveBtn, popupElements);
    })
  })
}

// :кнопка закрытия формы
const closingButtons = document.querySelectorAll('.popup__close-button');
closingButtons.forEach(closingBtn => {
  const targetPopup = closingBtn.closest('.popup');
  closingBtn.addEventListener('click', () => {
    closePopup(targetPopup);
  })
});


// : "кнопка" закрытия модального окна по клику на overlay
const popupOverlay = document.querySelectorAll('.overlay');
popupOverlay.forEach(overlayBtn => {
  overlayBtn.addEventListener('click', (evt) => {
    if (evt.target === overlayBtn) {
      evt.stopPropagation();
      closePopup(overlayBtn);
    }
  });
}
);


function installListener() {
  const elements = document.querySelector('.elements');

  elements.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__button-heart')) {
      evt.stopPropagation();

      // likeCard(evt.target.closest('.element').dataset.id, evt);
      likeCard(evt);
    }
    if (evt.target.classList.contains('element__button-delete')) {
      evt.stopPropagation();
      // popupDeleteCard.dataset.deleteCard = evt.target.closest('.element').dataset.id;
      // openPopup(popupDeleteCard)
      deleteCard(evt);

    }

    if (evt.target.classList.contains('element__image')) {
      evt.stopPropagation();
      enterDataPopupPhoto(evt);
    }
  }
  )

  // : кнопка редактирования профиля
  const editingButton = document.querySelector('.profile__edit-button');
  editingButton.addEventListener('click', (evt) => {
    evt.preventDefault()
    openPopupEditingProfile();
  });

  // : сохранения данных профиля
  formEditingProfile.addEventListener('submit', (evt) => {
    evt.preventDefault()
    saveProfile(evt);
  });

  // : кнопка открытия формы добавления элемента
  const addingButton = document.querySelector('.profile__add-button');
  addingButton.addEventListener('click', () => {
    prepareForm(formAddingPlace, popupElements)
    openPopup(popupAddingPlace);
  });

  // : "кнопка" создания элемента
  formAddingPlace.addEventListener('submit', (evt) => {
    evt.preventDefault()
    postData(evt);
    // const values = getDataForm(evt, popupElements);
    // switchingSaveButton(values.inputs, values.saveBtn, popupElements);
  });



};









installListener()

initForms(popupElements);
