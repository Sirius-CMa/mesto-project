import { editAvatar, editProfile } from "../profile";
import { saveNewCard, deleteCard } from "../cards"
import { closePopup, openPopup, popupAddingPlace, popupEditingAvatar, popupErrorAvatar, popupDeleteCard } from "../popups";


// : формы
const formEditingProfile = document.getElementById('edit-profile');
const formAddingPlace = document.getElementById('add-place');
const formEditingAvatar = document.getElementById('edit-avatar')
const formErrorAvatar = document.getElementById('error-avatar')
const formDeleteCard = document.getElementById('delete-card')

const inputFormName = document.querySelector('#input-name');
const inputFormProfession = document.querySelector('#input-profession');
const inputLinkAvatar = document.querySelector('#input-link-avatar')

// : сохранения данных профиля !!!
formEditingProfile.addEventListener('submit', (evt) => {
  evt.preventDefault(),
    editProfile(inputFormName.value, inputFormProfession.value)
});

// : "кнопка" создания элемента !!!
formAddingPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  saveNewCard()
  evt.target.reset();
  closePopup(popupAddingPlace)
});

// : кнопка сохранения аватара
formEditingAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  editAvatar(inputLinkAvatar.value);
});

// : кнопка повторного редактирования аватара !!!
formErrorAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  closePopup(popupErrorAvatar)
  openPopup(popupEditingAvatar)
});

// : кнопка подтверждения удаления карточки !!!
formDeleteCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  closePopup(popupDeleteCard)
  deleteCard(popupDeleteCard.dataset.deleteCard)
});
