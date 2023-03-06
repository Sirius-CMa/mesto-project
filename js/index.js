import { postCard } from "./cards";
import { saveProfile } from "./profile";


const body = document.querySelector('.body');
const page = body.querySelector('.page');




// : попапы
export const popupAddingPlace = page.querySelector('.popup-add-place');
export const popupEditingProfile = page.querySelector('.popup-edit-profile');
// const popupFullsizeImage = page.querySelector('.popup-photo-fullsize');//: перенесено в cardelements

// : формы
const formEditingProfile = document.getElementById('edit-profile');
const formAddingPlace = document.getElementById('add-place');




// : сохранения данных профиля
formEditingProfile.addEventListener('submit', (evt) => {
  evt.preventDefault(),
    saveProfile()
}
);



// : "кнопка" создания элемента
formAddingPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  postCard();
  evt.target.reset();
});









