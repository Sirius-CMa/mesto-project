import { popupEditingProfile, closePopup, openPopup, popupEditingAvatar, popupErrorAvatar } from "./popups.js";
import { saveProfile, saveAvatar } from "./api.js";
import { loadImage } from "./image.js";
import { profile } from "./page.js";

const page = document.querySelector('.page')
const nameProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');
const avatarProfile = document.querySelector('.profile__avatar')

// : Ф сохранения данных из формы ввода
// export function saveProfile() {


//   const inputFormName = document.querySelector('#input-name');
//   const inputFormProfession = document.querySelector('#input-profession');

//   nameProfile.textContent = inputFormName.value;
//   professionProfile.textContent = inputFormProfession.value;

// };

export function createProfile(data) {
  console.log('Из функции - ', data.name, data.about)
  nameProfile.textContent = data.name;
  professionProfile.textContent = data.about;
  avatarProfile.src = data.avatar;
  closePopup(popupEditingProfile);
}

export function createAvatar(link) {
  loadImage(link)
    .then(() => {
      saveAvatar(link)
      closePopup(popupEditingAvatar)
    })
    .catch(() => {
      closePopup(popupEditingAvatar)
      openPopup(popupErrorAvatar)
    })
}
