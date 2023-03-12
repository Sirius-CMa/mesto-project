import { initialProfile, editAvatar, editProfile } from './components/profile.js';
import { initialCard, saveNewCard, deleteCard } from './components/cards.js';
import { closeOpenedPopupByEsc, closePopup, openPopup, popupAddingPlace, popupEditingAvatar, popupErrorAvatar, popupDeleteCard } from "./components/modal.js";


import '../pages/index.css';
import './components/validate.js'
import './components/modal.js'
import './components/profile.js'
import './components/cards.js'
import './components/api.js'


const page = document.querySelector('.page')

page.addEventListener('keydown', (evt) => {
  evt.stopPropagation()
  if (evt.code == 'Escape') {
    closeOpenedPopupByEsc()
  }
});


function InitialFormListener() {

  const formEditingProfile = document.getElementById('edit-profile');
  const formAddingPlace = document.getElementById('add-place');
  const formEditingAvatar = document.getElementById('edit-avatar');
  const formErrorAvatar = document.getElementById('error-avatar');
  const formDeleteCard = document.getElementById('delete-card');

  const inputFormName = document.querySelector('#input-name');
  const inputFormProfession = document.querySelector('#input-profession');
  const inputLinkAvatar = document.querySelector('#input-link-avatar');

  // : "кнопка" сохранения данных профиля !!!
  formEditingProfile.addEventListener('submit', (evt) => {
    evt.preventDefault(),
      editProfile(inputFormName.value, inputFormProfession.value, evt);
  });

  // : "кнопка" создания элемента !!!
  formAddingPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    saveNewCard(evt)
    evt.target.reset();
    closePopup(popupAddingPlace)
  });

  // : "кнопка" сохранения аватара
  formEditingAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    editAvatar(inputLinkAvatar.value, evt);
    evt.target.reset();

  });

  // : "кнопка" повторного редактирования аватара !!!
  formErrorAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    closePopup(popupErrorAvatar)
    openPopup(popupEditingAvatar)
  });

  // : "кнопка" подтверждения удаления карточки !!!
  formDeleteCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    closePopup(popupDeleteCard)
    deleteCard(popupDeleteCard.dataset.deleteCard, evt)
  });

};





const loadContent = () => {
  initialProfile()
  initialCard()
};

loadContent();
InitialFormListener();
