import { popupEditingProfile, closePopup, openPopup, popupEditingAvatar, popupErrorAvatar, openPopupEditingProfile, popupAddingPlace } from "./popups.js";
import { saveDataProfile, saveAvatarProfile, getDataProfile } from "./api.js";
import { loadImage } from "./image.js";
import { cleareInputs } from "./forms/valid-input.js";
import { checkButton } from "./forms/forms.js";



export const profile = document.querySelector('.profile');

// : кнопка редактирования профиля
const editingButton = profile.querySelector('.profile__edit-button');
editingButton.addEventListener('click',
  openPopupEditingProfile
);

// : кнопка открытия формы добавления элемента
const addingButton = profile.querySelector('.profile__add-button');
addingButton.addEventListener('click', () => {
  openPopup(popupAddingPlace);
});

// : кнопка редактирования аватара
const editingAvatarButton = profile.querySelector('.profile__button-edit-avatar')
editingAvatarButton.addEventListener('click', () =>
  openPopup(popupEditingAvatar))



export const idProfile = {};

const nameProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');
const avatarProfile = document.querySelector('.profile__avatar')

export function createProfile(data) {
  idProfile._id = data._id
  nameProfile.textContent = data.name;
  professionProfile.textContent = data.about;
  avatarProfile.src = data.avatar;
  closePopup(popupEditingProfile);
}




export function editAvatar(link, evt) {
  checkButton(evt, 'Сохраняю...')
  loadImage(link)
    .then(() => {
      saveAvatarProfile(link)
        .then(res => {
          createProfile(res)
          closePopup(popupEditingAvatar)
          checkButton(evt, 'Сохранить', 1000)
        })
        .catch(err => console.log(err))

    })
    .catch(() => {
      closePopup(popupEditingAvatar)
      openPopup(popupErrorAvatar)
      checkButton(evt, 'Сохранить', 1000)
    })

};

export function editProfile(name, about, evt) {
  checkButton(evt, 'Сохраняю...')
  saveDataProfile(name, about)
    .then(res => {
      createProfile(res)
      checkButton(evt, 'Сохранить', 1000)
    })
    .catch(err => {
      console.log(err)
      checkButton(evt, 'Сохранить', 1000)
    })
  cleareInputs()
}

export function initialProfile() {
  getDataProfile()
    .then((res) => {
      // idProfile._id = res._id
      createProfile(res)
    })
    .catch(err => console.log(err))
};

// initialProfile()
// initialCard()
