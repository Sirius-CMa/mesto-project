import { popupEditingProfile, closePopup } from "./popups.js";
import { saveProfile } from "./api.js";

const nameProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');


// : Ф сохранения данных из формы ввода
// export function saveProfile() {


//   const inputFormName = document.querySelector('#input-name');
//   const inputFormProfession = document.querySelector('#input-profession');

//   nameProfile.textContent = inputFormName.value;
//   professionProfile.textContent = inputFormProfession.value;

// };

export function createProfile(name, profession) {
  console.log('Из функции - ', name, profession)
  nameProfile.textContent = name;
  professionProfile.textContent = profession;
  saveProfile(name, profession)
  closePopup(popupEditingProfile);
}
