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

//export const btnSaveAvatar = document.querySelector('.edit-avatar__create-button')
// export const btnSaveProfile = document.querySelector('.edit-avatar__create-button')
// export const btnSaveAvatar = document.querySelector('.edit-avatar__create-button')
// export const btnSaveAvatar = document.querySelector('.edit-avatar__create-button')

// export function checkButton() {
//   const buttons = document.querySelectorAll('.submit')
//   buttons.forEach(btn => {
//     btn.textContent === "Сохранить"
//       ? (btn.textContent = "Сохраняю...", console.log(34))
//       : (setTimeout(() => btn.textContent = "Сохранить", 2000), console.log(56))
//   })
// }


export function checkButton(evt) {
  const textBtn = evt.target.querySelector('.submit')
  console.log('Текст - ', textBtn.textContent)
  textBtn.textContent != 'Сохраняю...'
    ? textBtn.textContent = 'Сохраняю...'
    : setTimeout(() => textBtn.textContent = 'Сохранить', 1500)

}





// : "кнопка" сохранения данных профиля !!!
formEditingProfile.addEventListener('submit', (evt) => {
  evt.preventDefault(),
    editProfile(inputFormName.value, inputFormProfession.value, evt);
});

// : "кнопка" создания элемента !!!
formAddingPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  saveNewCard()
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
  deleteCard(popupDeleteCard.dataset.deleteCard)
});
