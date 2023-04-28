import './pages/index.css';
import './components/validate.js'
import './components/utils.js'
import './components/modal.js'
import './components/card.js'
import './components/datacard.js'
import './components/api.js'

import Section from './components/Section.js'
import Popup from './components/Popup';
import PopupWithForm from './components/PopupWithForm';
import PopupWithImage from './components/PopupWithImage';
import FormValidator from './components/FormValidator';
import UserInfo from './components/UserInfo';


import { closePopup, openPopup } from './components/modal.js'
import { addCardInBlockElements, createElement, deleteCard } from './components/card.js';
import { switchSaveButton, initiateForms, prepareForm } from './components/validate.js';
import { getContentServer, getDataProfile, saveAvatarProfile, saveDataProfile, saveNewCardServer } from './components/api.js';
import { loadImage, checkButton } from './components/utils.js';

// ANCHOR константы

import {
  // : данные для редактирования профиля
  nameProfile,
  aboutProfile,
  avatarProfile,
  inputFormName,
  inputFormAbout,
  // : удалить потом
  professionProfile,
  // :
  popupSelectors,
  popupsList,
  popupElements,
  idProfile,
  buttonAddCard,
  buttonEditAvatar,
  buttonEditProfile,
  blockElementsSelector
} from './utils/constants.js';


const blockElements = new Section(
  {
    rendering: card => {
      const card2 = createElement(card)
      return card2
    }
  },
  blockElementsSelector
)




const profile = document.querySelector('.profile');

// : попапы

const popupAddingPlace = document.querySelector('.popup-add-place');
const popupEditingProfile = document.querySelector('.popup-edit-profile');
const popupEditingAvatar = document.querySelector('.popup-edit-avatar')
const popupErrorLink = document.querySelector('.popup-error-link');
export const popupConfirmationDeletion = document.querySelector('.popup-delete-card');

// : формы
const formEditingProfile = document.getElementById('edit-profile');
const formAddingPlace = document.getElementById('add-place');
const formEditingAvatar = document.getElementById('edit-avatar');
const formConfirmationDeletion = document.getElementById('delete-card');
const formPopupErrorLink = document.getElementById('error-link');

// : профиль
// const inputFormName = formEditingProfile.querySelector('#input-name');
const inputFormProfession = formEditingProfile.querySelector('#input-profession');


const linkFormAvatar = document.getElementById('input-link-avatar');

// : карточки
const nameCardForm = formAddingPlace.querySelector('#input-title');
const linkCardForm = formAddingPlace.querySelector('#input-link');

const saveButtonFormProfile = popupEditingProfile.querySelector(popupElements.saveButton);



const addingButton = document.querySelector('.profile__add-button');
const editingButton = document.querySelector('.profile__edit-button');


function preparePopupEditingProfile() {
  inputFormName.value = nameProfile.textContent;
  inputFormProfession.value = professionProfile.textContent;
  switchSaveButton([inputFormName, inputFormProfession], saveButtonFormProfile, popupElements);
};


//  ANCHOR -  превью
export function openFullsizeImage(data) {
  // prepareDataPopupPhoto(evt);
  // openPopup(popupFullsizeImage);
  popupImageFullSize.open(data);
};



// : кнопка открытия формы добавления элемента
addingButton.addEventListener('click', () => {
  prepareForm(formAddingPlace, popupElements);
  openPopup(popupAddingPlace);
});

// : "кнопка" создания элемента
formAddingPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  saveNewCard(evt);
});



// : кнопка редактирования аватара
const editingAvatarButton = profile.querySelector('.profile__button-edit-avatar')
editingAvatarButton.addEventListener('click', () => {
  prepareForm(formEditingAvatar, popupElements);
  openPopup(popupEditingAvatar)
});


// : кнопка сохранения аватара
formEditingAvatar.addEventListener('submit', (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  editAvatar(linkFormAvatar.value, evt);
});

// : сохранения данных профиля
formEditingProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  editProfile(inputFormName.value, inputFormProfession.value, evt);
});

// : кнопка подтверждения удаления
formConfirmationDeletion.addEventListener('submit', (evt) => {
  evt.preventDefault();
  deleteCard(popupConfirmationDeletion.dataset.deleteCard, evt);
  closePopup(popupConfirmationDeletion);
});

// : кнопка повторной попытки загрузить изображение
formPopupErrorLink.addEventListener('submit', (evt) => {
  evt.preventDefault();
  closePopup(popupErrorLink);
  const targetPopup = document.getElementById(popupErrorLink.dataset.targetPopup);
  const targetForm = document.querySelector(`.${popupErrorLink.dataset.targetPopup}__form`);
  prepareForm(targetForm, popupElements);
  openPopup(targetPopup);
});



//ANCHOR  : новая карточка

function saveNewCard(evt) {     // : добавление карточки
  const nameCard = nameCardForm.value;
  const linkCard = linkCardForm.value;
  loadImage(linkCard)
    .then(() => {
      checkButton(evt, 'Создаётся...')
      saveNewCardServer(nameCard, linkCard)
        .then(res => {
          closePopup(popupAddingPlace);
          addCardInBlockElements(createElement(res));
        })
        .catch(err => console.log(err))
        .finally(() => checkButton(evt, 'Создать'))
    })
    .catch(() => {
      popupErrorLink.dataset.targetPopup = popupAddingPlace.id
      closePopup(popupAddingPlace);
      openPopup(popupErrorLink);
    })
};


// : ======  создание и редактирование данных профиля ======


const fillInIdProfile = (id) => idProfile._id = id;

function fillInDataProfile(data) {     // : заполнение полей блока profile
  nameProfile.textContent = data.name;
  professionProfile.textContent = data.about;
  avatarProfile.src = data.avatar;
  avatarProfile.alt = data.name
};

function editAvatar(link, evt) {     // : редактирование аватара
  loadImage(link)
    .then(() => {
      checkButton(evt, 'Сохраняю...')
      saveAvatarProfile(link)
        .then(res => {
          fillInDataProfile(res);
          closePopup(popupEditingAvatar);
        })
        .catch(err => console.log(err))
        .finally(() => checkButton(evt, 'Сохранить'))
    })
    .catch(() => {
      popupErrorLink.dataset.targetPopup = popupEditingAvatar.id;
      closePopup(popupEditingAvatar);
      openPopup(popupErrorLink);
    })
};

function editProfile(name, about, evt) {   // : редактирование данных профиля
  checkButton(evt, 'Сохраняю...');
  saveDataProfile(name, about)
    .then(res => {
      fillInDataProfile(res);
      closePopup(popupEditingProfile);
    })
    .catch(err => console.log(err))
    .finally(() => checkButton(evt, 'Сохранить'));
};


function initiateCard() {      // : загрузка картинок
  getContentServer()
    .then(cards =>
      cards.reduceRight((_, card) => {
        loadImage(card.link)
          .then(() => {
            addCardInBlockElements(createElement(card))
          })
          .catch(err => console.error(err))
      },
        null)
    )
    .catch(err => console.log(err))
};


function initiateProfile() {   // : загрузка данных профиля
  getDataProfile()
    .then((res) => {
      fillInIdProfile(res._id);
      fillInDataProfile(res);
      return idProfile._id !== undefined;
    })
    .then((res) => {
      res
        // ? initiateCard()
        ? (getContentServer().then(cards => blockElements.initiateCard(cards)))
        : console.log(`ERROR: ID Profile - ${idProfile._id}.`);
    })
    .catch(err => console.log(err))
};




// : активация данных




initiateProfile();
// initiateForms(popupElements);

const profileUser = new UserInfo(
  nameProfile,
  aboutProfile,
  avatarProfile
)

// const initiateValidation = (element) => {
//   const popupFormValidator = new FormValidator(popupElements, element)
//   // popupFormValidator.enableValidation()
// };

// popupsList.forEach(element => initiateValidation(element));

const popupEditProfile = new PopupWithForm({
  callback: (data) => {
    popupEditProfile.setTextSaveButton(true)
    console.log('Класс попап ред профиль - ', data)
  }
},
  popupSelectors.editProfile);

//ANCHOR - попапы
const popupEditAvatar = new PopupWithForm({ callback: () => { } }, popupSelectors.editingAvatar);
const popupAddCard = new PopupWithForm({ callback: () => { } }, popupSelectors.addingPlace);
const popupConfirmationDeletion2 = new PopupWithForm({ callback: () => { } }, popupSelectors.confirmationDeletion);
const popupImageFullSize = new PopupWithImage(popupSelectors.fullSizeImage);





const fillInDataPopupEditProfile = () => {
  const dataProfile = profileUser.getUserInfo()
  inputFormName.value = dataProfile.name
  inputFormAbout.value = dataProfile.about
};

// : кнопки секции profile
buttonEditProfile.addEventListener('click', (evt) => {
  evt.preventDefault();
  fillInDataPopupEditProfile();
  popupEditProfile.open();

});

buttonEditAvatar.addEventListener('click', () => { })

buttonAddCard.addEventListener('click', () => { })


// : кнопка редактирования профиля
// editingButton.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   prepareForm(formEditingProfile, popupElements);
//   preparePopupEditingProfile();
//   openPopup(popupEditingProfile);
// });


// popupOverlayBtns.forEach(overlayBtn => {
//   overlayBtn.addEventListener('mousedown', (evt) => {
//     if (evt.target === overlayBtn) {
//       evt.stopPropagation();
//       closePopup(overlayBtn);
//     }
//   });
// }
// );

// closingButtons.forEach(closingBtn => {
//   const targetPopup = closingBtn.closest('.popup');
//   closingBtn.addEventListener('click', () => {
//     closePopup(targetPopup);
//   })
// });

// export const idProfile = {};
// const popupElements = {
//   form: '.form',
//   input: '.popup__input',
//   saveButton: '.popup__save-button',
//   disablingModifierButton: 'popup__save-button_disabled',
//   inputErrorModifier: 'popup__input_error', // красная линия
//   textErrorModifier: 'popup__input-error_active' // текст ошибки
// };

// const popupPhoto = popupFullsizeImage.querySelector('.popup__photo');
// const popupCaption = popupFullsizeImage.querySelector('.popup__caption');

// const closingButtons = document.querySelectorAll('.popup__close-button');
// const popupOverlayBtns = document.querySelectorAll('.overlay');

// function prepareDataPopupPhoto(evt) {
//   popupPhoto.src = evt.target.src;
//   popupCaption.textContent = evt.target.textContent;
// };
// const popupFullsizeImage = document.querySelector('.popup-photo-fullsize');
