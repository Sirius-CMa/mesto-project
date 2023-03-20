// Спасибо за ревью.
// С предыдущими ревьюерами тоже не было проблем,
// но иногда не хватало объяснения, почему так , а не иначе надо делать,
// а это самое интересное.



import '../pages/index.css';
import './components/validate.js'
import './components/utils.js'
import './components/modal.js'
import './components/card.js'
import './components/datacard.js'
import './components/api.js'

import { initialCards } from './components/datacard.js';
import { closePopup, openPopup } from './components/modal.js'
import { addElement, createElement, deleteCard, saveNewCard } from './components/card.js';
import { switchingSaveButton, initForms, prepareForm } from './components/validate.js';
import { getContentServer, getDataProfile, saveAvatarProfile, saveDataProfile } from './components/api.js';
import { loadImage, checkButton } from './components/utils.js';

export const idProfile = {};
export const popupElements = {
  form: '.form',
  input: '.popup__input',
  saveButton: '.popup__save-button',
  disablingModifierButton: 'popup__save-button_disabled',
  inputErrorModifier: 'popup__input_error', // красная линия
  textErrorModifier: 'popup__input-error_active' // текст ошибки
};


export const profile = document.querySelector('.profile');

// : попапы
const popupFullsizeImage = document.querySelector('.popup-photo-fullsize');
const popupAddingPlace = document.querySelector('.popup-add-place');
const popupEditingProfile = document.querySelector('.popup-edit-profile');
const popupEditingAvatar = document.querySelector('.popup-edit-avatar')
const popupErrorAvatar = document.querySelector('.popup-error-avatar')
// export const popupDeleteCard = document.querySelector('.popup-delete-card')
export const popupConfirmationDeletion = document.querySelector('.popup-delete-card')

// : формы
const formEditingProfile = document.getElementById('edit-profile');
const formAddingPlace = document.getElementById('add-place');
const formEditingAvatar = document.getElementById('edit-avatar');
const formConfirmationDeletion = document.getElementById('delete-card')
const saveBtnAddPlace = formAddingPlace.querySelector(popupElements.saveButton)

// : профиль
const inputFormName = formEditingProfile.querySelector('#input-name');
const inputFormProfession = formEditingProfile.querySelector('#input-profession');
const nameProfile = profile.querySelector('.profile__name');
const professionProfile = profile.querySelector('.profile__profession');
const avatarProfile = document.querySelector('.profile__avatar')

// : карточки
export const nameCardForm = formAddingPlace.querySelector('#input-title');
export const linkCardForm = formAddingPlace.querySelector('#input-link');

const saveButtonFormProfile = popupEditingProfile.querySelector(popupElements.saveButton);

const popupPhoto = popupFullsizeImage.querySelector('.popup__photo');
const popupCaption = popupFullsizeImage.querySelector('.popup__caption');

const closingButtons = document.querySelectorAll('.popup__close-button');
const popupOverlayBtns = document.querySelectorAll('.overlay');

const addingButton = document.querySelector('.profile__add-button');
const editingButton = document.querySelector('.profile__edit-button');


export function preparePopupEditingProfile() {
  inputFormName.value = nameProfile.textContent;
  inputFormProfession.value = professionProfile.textContent;
  switchingSaveButton([inputFormName, inputFormProfession], saveButtonFormProfile, popupElements);
};


export function prepareDataPopupPhoto(evt) {
  popupPhoto.src = evt.target.src;
  popupPhoto.alt = evt.target.textContent;
  popupCaption.textContent = evt.target.textContent;
};

export function openFullsizeImage(evt) {
  prepareDataPopupPhoto(evt);
  openPopup(popupFullsizeImage);
};


function handleDataProfile() {
  nameProfile.textContent = inputFormName.value;
  professionProfile.textContent = inputFormProfession.value;
};



// function handleDataCard() {
//   const nameCard = nameCardForm.value;
//   const linkCard = linkCardForm.value;
//   addElement(createElement(nameCard, linkCard));
// };



// : кнопка редактирования профиля
editingButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  prepareForm(formEditingProfile, popupElements);
  preparePopupEditingProfile();
  openPopup(popupEditingProfile);
});

// : сохранения данных профиля
formEditingProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleDataProfile();
  closePopup(popupEditingProfile);
});

// : кнопка открытия формы добавления элемента
addingButton.addEventListener('click', () => {
  prepareForm(formAddingPlace, popupElements);
  openPopup(popupAddingPlace);
});

// : "кнопка" создания элемента
formAddingPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // handleDataCard();
  saveNewCard(evt);
  closePopup(popupAddingPlace);
});

popupOverlayBtns.forEach(overlayBtn => {
  overlayBtn.addEventListener('click', (evt) => {
    if (evt.target === overlayBtn) {
      evt.stopPropagation();
      closePopup(overlayBtn);
    }
  });
}
);

closingButtons.forEach(closingBtn => {
  const targetPopup = closingBtn.closest('.popup');
  closingBtn.addEventListener('click', () => {
    closePopup(targetPopup);
  })
});

// : кнопка редактирования аватара
const editingAvatarButton = profile.querySelector('.profile__button-edit-avatar')
editingAvatarButton.addEventListener('click', () => {
  prepareForm(formEditingAvatar, popupElements);
  openPopup(popupEditingAvatar)
})



const linkFormAvatar = document.getElementById('input-link-avatar')

// : кнопка сохранения аватара
formEditingAvatar.addEventListener('submit', (evt) => {
  (evt.stopPropagation(),
    evt.preventDefault(),
    console.log(linkFormAvatar.value),
    editAvatar(linkFormAvatar.value, evt))

});

// : сохранения данных профиля
formEditingProfile.addEventListener('submit', (evt) => {
  evt.preventDefault()
  editProfile(inputFormName.value, inputFormProfession.value, evt);
});

// : кнопка подтверждения удаления
formConfirmationDeletion.addEventListener('submit', (evt) => {
  evt.preventDefault();
  deleteCard(id, evt);
})




// : загрузка картинок
function initialCard() {
  getContentServer()
    .then(data => {
      data.forEach(card => {
        loadImage(card.link)
          .then(() => {
            addElement(createElement(card))
          })
          .catch(err => console.error(err))
      })
    })
    .catch(err => console.log(err))
};

// : сщздание и редактирование данных профиля
function initialProfile() {
  getDataProfile()
    .then((res) => {
      // idProfile._id = res._id
      createProfile(res);
    })
    .catch(err => console.log(err))
};

function createProfile(data) {
  console.log('function createProfile: \n Профиль - \n', data)
  idProfile._id = data._id
  nameProfile.textContent = data.name;
  professionProfile.textContent = data.about;
  avatarProfile.src = data.avatar;
  avatarProfile.alt = data.name
};

function editAvatar(link, evt) {
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
      checkButton(evt, 'Сохранить')
    })

};

function editProfile(name, about, evt) {
  checkButton(evt, 'Сохраняю...')
  saveDataProfile(name, about)
    .then(res => {
      createProfile(res);
      closePopup(popupEditingProfile);
      checkButton(evt, 'Сохранить');
    })
    .catch(err => {
      console.log(err)
      checkButton(evt, 'Сохранить')
    })
};






// : активация данных

initialProfile();
initialCard();
initForms(popupElements);
