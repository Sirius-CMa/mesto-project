export const popupAddingPlace = document.querySelector('.popup-add-place');
export const popupEditingProfile = document.querySelector('.popup-edit-profile');
const popupFullsizeImage = document.querySelector('.popup-photo-fullsize');

// : формы
export const formEditingProfile = document.getElementById('edit-profile');
export const formAddingPlace = document.getElementById('add-place');

export const profile = document.querySelector('.profile');

// : переменные редактирования профиля
export const nameProfile = profile.querySelector('.profile__name');
export const professionProfile = profile.querySelector('.profile__profession');
export const inputFormName = formEditingProfile.querySelector('#input-name');
export const inputFormProfession = formEditingProfile.querySelector('#input-profession');

// : Ф открытия формы редактирования профиля
export function openPopupEditingProfile(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  inputFormName.value = nameProfile.textContent;
  inputFormProfession.value = professionProfile.textContent;
  openPopup(popupEditingProfile);
};


// : Ф открытие модального окна с полноразмерным изображением
const popupPhoto = popupFullsizeImage.querySelector('.popup__photo');
const popupCaption = popupFullsizeImage.querySelector('.popup__caption');

export function openPopupPhoto(evt) {
  popupPhoto.src = evt.target.src;
  popupPhoto.alt = evt.target.textContent;
  popupCaption.textContent = evt.target.textContent;
  openPopup(popupFullsizeImage);
};

// :кнопка закрытия формы
const closingButtons = document.querySelectorAll('.popup__close-button');
closingButtons.forEach(closingBtn => {
  closingBtn.addEventListener('click', () => {
    closePopup(closingBtn.closest('.overlay'));
  })
});

// : "кнопка" закрытия модального окна по клику на overlay
const popupOverlay = document.querySelectorAll('.overlay');
popupOverlay.forEach(overlayBtn => {
  if (overlayBtn.classList.contains('overlay')) {
    overlayBtn.addEventListener('click', (evt) => {
      if (evt.target === overlayBtn) {
        evt.stopPropagation();
        closePopup(overlayBtn);
      }
    });
  }
});


// :открытие и закрытие модального окна
export function openPopup(targetPopup) {
  targetPopup.classList.add('popup_opened');
};

export function closePopup(targetPopup) {
  targetPopup.classList.remove('popup_opened');
};
