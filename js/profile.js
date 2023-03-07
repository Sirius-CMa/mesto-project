import { popupEditingProfile, closePopup } from "./popups.js";


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

export function createProfile(data) {
  console.log('Из функции - ', data)
}
