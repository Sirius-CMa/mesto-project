import { popupEditingProfile, closePopup, openPopup, popupEditingAvatar, popupErrorAvatar } from "./popups.js";
import { saveDataProfile, saveAvatarProfile, getDataProfile } from "./api.js";
import { loadImage } from "./image.js";
import { cleareInputs } from "./forms/valid-input.js";
import { btnSaveAvatar, checkButton } from "./forms/forms.js";

export const idProfile = {};

const nameProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');
const avatarProfile = document.querySelector('.profile__avatar')

export function createProfile(data) {
  nameProfile.textContent = data.name;
  professionProfile.textContent = data.about;
  avatarProfile.src = data.avatar;
  closePopup(popupEditingProfile);
}




export function editAvatar(link, evt) {
  checkButton(evt)
  loadImage(link)
    .then(() => {
      saveAvatarProfile(link)
        .then(res => {
          createProfile(res)
          closePopup(popupEditingAvatar)
          checkButton(evt)
        })
        .catch(err => console.log(err))

    })
    .catch(() => {
      closePopup(popupEditingAvatar)
      openPopup(popupErrorAvatar)
      checkButton(evt)
    })

};

export function editProfile(name, about, evt) {
  checkButton(evt)
  saveDataProfile(name, about)
    .then(res => {
      createProfile(res)
      checkButton(evt)
    })
    .catch(err => {
      console.log(err)
      checkButton(evt)
    })
  cleareInputs()
}

export function initialProfile() {
  getDataProfile()
    .then((res) => {
      console.log(res)
      idProfile._id = res._id
      createProfile(res)
    })
    .catch(err => console.log(err))
};

// initialProfile()
// initialCard()
