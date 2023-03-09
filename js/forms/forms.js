import { createProfile, createAvatar } from "../profile";
import { postCard } from "../cards"
import { saveProfile, deleteCardServer } from "../api";
import { closePopup, openPopup, popupEditingAvatar, popupErrorAvatar, popupDeleteCard } from "../popups";


// : формы
const formEditingProfile = document.getElementById('edit-profile');
const formAddingPlace = document.getElementById('add-place');
const formEditingAvatar = document.getElementById('edit-avatar')
const formErrorAvatar = document.getElementById('error-avatar')
const formDeleteCard = document.getElementById('delete-card')
const inputFormName = document.querySelector('#input-name');
const inputFormProfession = document.querySelector('#input-profession');
const inputLinkAvatar = document.querySelector('#input-link-avatar')

// : сохранения данных профиля
formEditingProfile.addEventListener('submit', (evt) => {
  evt.preventDefault(),
    saveProfile(inputFormName.value, inputFormProfession.value)
}
);



// : "кнопка" создания элемента
formAddingPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  postCard();
  evt.target.reset();
});


// : кнопка сохранения аватара
formEditingAvatar.addEventListener('submit', (evt) => {
  console.log(1);
  evt.preventDefault();
  createAvatar(inputLinkAvatar.value);
})

// : кнопка повторного редактирования аватара
formErrorAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  closePopup(popupErrorAvatar)
  openPopup(popupEditingAvatar)
})

// : кнопка подтверждения удаления карточки
formDeleteCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  closePopup(popupDeleteCard)
  deleteCardServer(popupDeleteCard.dataset.deleteCard)

})
