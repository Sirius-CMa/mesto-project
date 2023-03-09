import { createProfile, createAvatar } from "../profile";
import { postCard } from "../cards"
import { saveProfile } from "../api";


// : формы
const formEditingProfile = document.getElementById('edit-profile');
const formAddingPlace = document.getElementById('add-place');
const formEditingAvatar = document.getElementById('edit-avatar')
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
