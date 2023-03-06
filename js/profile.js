import { closePopup } from "./popups";
import { popupEditingProfile } from "./index.js";




// : Ф сохранения данных из формы ввода
export function saveProfile() {

  const nameProfile = document.querySelector('.profile__name');
  const professionProfile = document.querySelector('.profile__profession');
  const inputFormName = document.querySelector('#input-name');
  const inputFormProfession = document.querySelector('#input-profession');

  nameProfile.textContent = inputFormName.value;
  professionProfile.textContent = inputFormProfession.value;
  closePopup(popupEditingProfile);
};
