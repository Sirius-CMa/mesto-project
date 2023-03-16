import '../pages/index.css';
import './components/index.js'
import './components/validate.js'
import './components/utils.js'
import './components/modal.js'
import './components/card.js'
import './components/datacard.js'

import { inputFormName, inputFormProfession, closePopup, popupEditingProfile } from './components/modal.js'
import { popupElements, isValid, switchingSaveButton, initForms } from './components/validate.js';

export const profile = document.querySelector('.profile');
export const nameProfile = profile.querySelector('.profile__name');
export const professionProfile = profile.querySelector('.profile__profession');



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


initForms(popupElements);
