// export const inputFormName = formEditingProfile.querySelector('#input-name');
// export const inputFormProfession = formEditingProfile.querySelector('#input-profession');
import { inputFormName, inputFormProfession, closePopup, popupEditingProfile } from './modal.js'

export const profile = document.querySelector('.profile');

export const nameProfile = profile.querySelector('.profile__name');
export const professionProfile = profile.querySelector('.profile__profession');

// : Ф сохранения данных из формы ввода
export function saveProfile(evt) {
  if (inputFormName.value === "") {
    alert("У Вас должно быть имя!");
  }
  else {
    nameProfile.textContent = inputFormName.value;
    professionProfile.textContent = inputFormProfession.value;
    closePopup(popupEditingProfile);
  }
};
