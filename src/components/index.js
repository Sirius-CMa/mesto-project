import { openPopupEditingProfile, openPopupPhoto, formEditingProfile, formAddingPlace, openPopup, popupAddingPlace, closeOpenedPopupByEsc } from "./modal";
import { postData, likeCard, deleteCard } from "./card";
import { saveProfile } from "./profile";
import { switchingSaveButton, popupElements } from "./validate";


function installListener() {
  const elements = document.querySelector('.elements');

  elements.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__button-heart')) {
      evt.stopPropagation();

      // likeCard(evt.target.closest('.element').dataset.id, evt);
      likeCard(evt);
    }
    if (evt.target.classList.contains('element__button-delete')) {
      evt.stopPropagation();
      // popupDeleteCard.dataset.deleteCard = evt.target.closest('.element').dataset.id;
      // openPopup(popupDeleteCard)
      deleteCard(evt);

    }

    if (evt.target.classList.contains('element__image')) {
      evt.stopPropagation();
      openPopupPhoto(evt);
    }
  }
  )

  // : кнопка редактирования профиля
  const editingButton = document.querySelector('.profile__edit-button');
  editingButton.addEventListener('click', (evt) => {
    evt.preventDefault()
    openPopupEditingProfile(evt);
  });

  // : сохранения данных профиля
  formEditingProfile.addEventListener('submit', (evt) => {
    evt.preventDefault()
    saveProfile(evt);
  });

  // : кнопка открытия формы добавления элемента
  const addingButton = document.querySelector('.profile__add-button');
  addingButton.addEventListener('click', () => {
    openPopup(popupAddingPlace);
  });

  // : "кнопка" создания элемента
  formAddingPlace.addEventListener('submit', (evt) => {
    evt.preventDefault()
    postData(evt);
    evt.target.reset();
    const values = getDataForm(evt);
    switchingSaveButton(values.inputs, values.saveBtn, popupElements);
  });



};


function getDataForm(evt) {
  const values = {}
  const targetForm = evt.target.closest('.form')
  values.saveBtn = targetForm.querySelector('.popup__save-button')
  values.inputs = [...targetForm.querySelectorAll('.popup__input')]
  return values
}





installListener()



