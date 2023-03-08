import { createProfile } from "../profile";
import { postCard } from "../cards"


// : формы
const formEditingProfile = document.getElementById('edit-profile');
const formAddingPlace = document.getElementById('add-place');
const inputFormName = document.querySelector('#input-name');
const inputFormProfession = document.querySelector('#input-profession');

// : сохранения данных профиля
formEditingProfile.addEventListener('submit', (evt) => {
  evt.preventDefault(),
    createProfile(inputFormName.value, inputFormProfession.value)
}
);



// : "кнопка" создания элемента
formAddingPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  postCard();
  evt.target.reset();
});
