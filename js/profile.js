import { popupEditingProfile, closePopup, openPopup, popupEditingAvatar, popupErrorAvatar } from "./popups.js";
import { saveDataProfile, saveAvatarProfile, getDataProfile } from "./api.js";
import { loadImage } from "./image.js";

export const idProfile = {};

const page = document.querySelector('.page')
const nameProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');
const avatarProfile = document.querySelector('.profile__avatar')

export function createProfile(data) {
  nameProfile.textContent = data.name;
  professionProfile.textContent = data.about;
  avatarProfile.src = data.avatar;
  closePopup(popupEditingProfile);
}

export function editAvatar(link) {
  loadImage(link)
    .then(() => {
      saveAvatarProfile(link)
        .then(res => {
          createProfile(res)
          closePopup(popupEditingAvatar)
        })
        .catch(err => console.log(err))
    })
    .catch(() => {
      closePopup(popupEditingAvatar)
      openPopup(popupErrorAvatar)
    })
};

export function editProfile(name, about) {
  saveDataProfile(name, about)
    .then(res => createProfile(res))
    .catch(err => console.log(err))

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
