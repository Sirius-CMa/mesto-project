const body = document.querySelector('.body');
const page = body.querySelector('.page');


const content = page.querySelector('.content');
const elements = content.querySelector('.elements');
const profile = content.querySelector('.profile');

// : попапы
const popupAddingPlace = page.querySelector('.popup-add-place');
const popupEditingProfile = page.querySelector('.popup-edit-profile');
const popupFullsizeImage = page.querySelector('.popup-photo-fullsize');

// : формы
const formEditingProfile = document.getElementById('edit-profile');
const formAddingPlace = document.getElementById('add-place');

// : переменные редактирования профиля
const nameProfile = profile.querySelector('.profile__name');
const professionProfile = profile.querySelector('.profile__profession');
const inputFormName = formEditingProfile.querySelector('#name');
const inputFormProfession = formEditingProfile.querySelector('#profession');


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
function openPopup(targetPopup) {
  targetPopup.classList.add('popup_opened');
};

function closePopup(targetPopup) {
  targetPopup.classList.remove('popup_opened');
};



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
const nameCardForm = popupAddingPlace.querySelector('#title');
const linkCardForm = popupAddingPlace.querySelector('#link');

function postData(evt) {
  evt.preventDefault();
  const nameCard = nameCardForm.value;
  const linkCard = linkCardForm.value;

  if (linkCard === "") {
    alert('Поле "Ссылка на изображение" должно быть заполнено!');
  }
  else {
    addElement(createElement(nameCard, linkCard));
    closePopup(popupAddingPlace);
  }
};

// : Ф открытия формы редактирования профиля
function openPopupEditingProfile(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  inputFormName.value = nameProfile.textContent;
  inputFormProfession.value = professionProfile.textContent;
  openPopup(popupEditingProfile);
};

const deleteCard = () => {
  document.querySelector('.element__button-delete').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
};

const likeCard = () => {
  document.querySelector('.element__button-heart').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button-heart_active');
  });
};


// : Ф открытие модального окна с полноразмерным изображением
const popupPhoto = popupFullsizeImage.querySelector('.popup__photo');
const popupCaption = popupFullsizeImage.querySelector('.popup__caption');

const openPopupPhoto = () => {
  const image = document.querySelector('.element__image');
  image.addEventListener('click', () => {
    popupPhoto.src = image.src;
    popupPhoto.alt = image.alt;
    popupCaption.textContent = image.textContent;
    openPopup(popupFullsizeImage);
  });
};

// : Ф создания блока "element"
const createElement = (nameCard, linkCard) => {
  const formTemplate = document.querySelector('#forms').content;
  const elementForm = formTemplate.querySelector('.element').cloneNode(true);
  const imageElement = elementForm.querySelector('.element__image');
  elementForm.querySelector('.element__title').textContent = nameCard;
  imageElement.src = linkCard;
  imageElement.textContent = nameCard;
  return elementForm;
};

// : ф добавления "element"
const addElement = (elementForm) => {
  elements.prepend(elementForm);
  deleteCard();
  likeCard();
  openPopupPhoto();
};

// : цикл для считывания данных из массива карточек
initialCards.forEach(card => {
  addElement(createElement(card.name, card.link));
});
