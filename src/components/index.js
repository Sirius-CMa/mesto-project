import { openPopupEditingProfile, profile, formEditingProfile, formAddingPlace, openPopup, popupAddingPlace, popupEditingProfile } from "./modal";
import { postData } from "./card";



// : кнопка редактирования профиля
const editingButton = profile.querySelector('.profile__edit-button');
editingButton.addEventListener('click', (evt) => {
  openPopupEditingProfile(evt);
});

// : сохранения данных профиля
formEditingProfile.addEventListener('submit', (evt) => {
  saveProfile(evt);
});

// : кнопка открытия формы добавления элемента
const addingButton = profile.querySelector('.profile__add-button');
addingButton.addEventListener('click', () => {
  openPopup(popupAddingPlace);
});

// : "кнопка" создания элемента
formAddingPlace.addEventListener('submit', (evt) => {
  postData(evt);
  evt.target.reset();
});




// : Ф сохранения данных из формы ввода
function saveProfile(evt) {
  evt.preventDefault();
  if (inputFormName.value === "") {
    alert("У Вас должно быть имя!");
  }
  else {
    nameProfile.textContent = inputFormName.value;
    professionProfile.textContent = inputFormProfession.value;
    closePopup(popupEditingProfile);
  }
};

// : Ф сохранения данных формы редактирования профиля







