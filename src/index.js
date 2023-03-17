import '../pages/index.css';
import './components/validate.js'
import './components/utils.js'
import './components/modal.js'
import './components/card.js'
import './components/datacard.js'

import { initialCards } from './components/datacard.js';
import { closePopup, openPopup, closeOpenedPopupByEsc } from './components/modal.js'
import { addElement, createElement } from './components/card.js';
import { popupElements, isValid, switchingSaveButton, initForms, prepareForm } from './components/validate.js';

const body = document.querySelector('.body');
export const profile = document.querySelector('.profile');

// : попапы
const popupFullsizeImage = document.querySelector('.popup-photo-fullsize');
const popupAddingPlace = document.querySelector('.popup-add-place');
const popupEditingProfile = document.querySelector('.popup-edit-profile');

// : формы
const formEditingProfile = document.getElementById('edit-profile');
const formAddingPlace = document.getElementById('add-place');
const saveBtnAddPlace = formAddingPlace.querySelector(popupElements.saveButton)


const inputFormName = formEditingProfile.querySelector('#input-name');
const inputFormProfession = formEditingProfile.querySelector('#input-profession');
const nameCardForm = formAddingPlace.querySelector('#input-title');
const linkCardForm = formAddingPlace.querySelector('#input-link');
const nameProfile = profile.querySelector('.profile__name');
const professionProfile = profile.querySelector('.profile__profession');

const saveButtonFormProfile = popupEditingProfile.querySelector(popupElements.saveButton);

const popupPhoto = popupFullsizeImage.querySelector('.popup__photo');
const popupCaption = popupFullsizeImage.querySelector('.popup__caption');

const closingButtons = document.querySelectorAll('.popup__close-button');
const popupOverlayBtns = document.querySelectorAll('.overlay');

const addingButton = document.querySelector('.profile__add-button');
const editingButton = document.querySelector('.profile__edit-button');


export function preparePopupEditingProfile() {
  inputFormName.value = nameProfile.textContent;
  inputFormProfession.value = professionProfile.textContent;
  switchingSaveButton([inputFormName, inputFormProfession], saveButtonFormProfile, popupElements);
};


export function prepareDataPopupPhoto(evt) {
  popupPhoto.src = evt.target.src;
  popupPhoto.alt = evt.target.textContent;
  popupCaption.textContent = evt.target.textContent;
};

export function openFullsizeImage(evt) {
  prepareDataPopupPhoto(evt);
  openPopup(popupFullsizeImage);
};


function handleDataProfile() {
  nameProfile.textContent = inputFormName.value;
  professionProfile.textContent = inputFormProfession.value;
};



function handleDataCard() {
  const nameCard = nameCardForm.value;
  const linkCard = linkCardForm.value;
  addElement(createElement(nameCard, linkCard));
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
};


export const setListenerOnEscape = () => body.addEventListener('keydown', closeOpenedPopupByEsc);
export const removeListenerOnEscape = () => body.removeEventListener('keydown', closeOpenedPopupByEsc);


function setListeners() {

  // : кнопка редактирования профиля
  editingButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    preparePopupEditingProfile();
    openPopup(popupEditingProfile);
  });

  // : сохранения данных профиля
  formEditingProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleDataProfile();
    closePopup(popupEditingProfile);
  });

  // : кнопка открытия формы добавления элемента
  addingButton.addEventListener('click', () => {
    prepareForm(formAddingPlace, popupElements);
    openPopup(popupAddingPlace);
  });

  // : "кнопка" создания элемента
  formAddingPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleDataCard();
    closePopup(popupAddingPlace);
  });

  popupOverlayBtns.forEach(overlayBtn => {
    overlayBtn.addEventListener('click', (evt) => {
      if (evt.target === overlayBtn) {
        evt.stopPropagation();
        closePopup(overlayBtn);
      }
    });
  }
  );

  closingButtons.forEach(closingBtn => {
    const targetPopup = closingBtn.closest('.popup');
    closingBtn.addEventListener('click', () => {
      closePopup(targetPopup);
    })
  });

};




// : цикл для считывания данных из массива карточек
initialCards.forEach(card => {
  addElement(createElement(card.name, card.link));
});

setListeners()

initForms(popupElements);
