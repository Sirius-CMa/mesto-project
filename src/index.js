import '../pages/index.css';
import './components/index.js'
import './components/validate.js'
import './components/utils.js'
import './components/modal.js'
import './components/card.js'
import './components/datacard.js'

import { inputFormName, inputFormProfession, closePopup, popupEditingProfile } from './components/modal.js'

export const profile = document.querySelector('.profile');
export const nameProfile = profile.querySelector('.profile__name');
export const professionProfile = profile.querySelector('.profile__profession');


// : Ф сохранения данных из формы ввода
export function saveProfile(evt) {
  nameProfile.textContent = inputFormName.value;
  professionProfile.textContent = inputFormProfession.value;
  closePopup(popupEditingProfile);
};

