const body = document.querySelector('.body');
const page = body.querySelector('.page');


const content = page.querySelector('.content');
const elements = content.querySelector('.elements');
const profile = content.querySelector('.profile');

// : попапы
const popupAddingPlace = page.querySelector('.popup-add-place');
const popupEditingProfile = page.querySelector('.popup-edit-profile');
const popupFullsizeImage = page.querySelector('.popup-fullsize-image');

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
  editProfile(evt);
});

// : кнопка сохранения данных профиля
const savingButton = document.getElementById('edit-profile');
savingButton.addEventListener('submit', (evt) => {
  saveProfile(evt);
});


formEditingProfile.addEventListener("keyup", function (evt) {
  if (evt.key === 13) {
    formEditingProfile.querySelector('.submit').click();
    evt.stopPropagation();
  }
});

formAddingPlace.addEventListener("keyup", function (evt) {
  if (evt.key === 13) {
    formEditingProfile.querySelector('.submit').click();
    evt.stopPropagation();
  }
});

// : кнопка открытия формы добавления элемента
const addingButton = profile.querySelector('.profile__add-button');
addingButton.addEventListener('click', () => {
  openPopup(popupAddingPlace);
});

// : кнопка создания "элемента"
const creatingButton = document.getElementById('add-place');
creatingButton.addEventListener('submit', (evt) => {
  postData(evt);
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

// : Ф открытие модального окна с полноразмерным изображением
function imagePopup(linkImagePopup, titleImagePopup) {
  popupFullsizeImage.querySelector('.image-popup__image').src = linkImagePopup;
  popupFullsizeImage.querySelector('.image-popup__caption').textContent = titleImagePopup;
  openPopup(popupFullsizeImage);
};

// : Ф удаления элемента
function deleteElement(card) {
  card.closest('.element').remove();
};

// : Ф добавления элемента
function addElement(elementForm) {
  elements.prepend(elementForm);
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
function postData(evt) {
  evt.preventDefault();
  let nameCard = popupAddingPlace.querySelector('#title').value;
  let linkCard = popupAddingPlace.querySelector('#link').value;

  if (linkCard === "") {
    alert('Поле "Ссылка на изображение" должно быть заполнено!');
  }
  else {
    createElement(nameCard, linkCard);
    closePopup(popupAddingPlace);
  }
};

// : Ф открытия формы редактирования профиля
function editProfile(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  inputFormName.value = nameProfile.textContent;
  inputFormProfession.value = professionProfile.textContent;
  openPopup(popupEditingProfile);
};


// : Ф создания блока "element"
function createElement(nameCard, linkCard) {
  const FormTemplate = document.querySelector('#forms').content;
  const elementForm = FormTemplate.querySelector('.element').cloneNode(true);

  elementForm.querySelector('.element__title').textContent = nameCard;
  elementForm.querySelector('.element__image').src = linkCard;
  elementForm.querySelector('.element__image').textContent = nameCard;
  elementForm.querySelector('.element__button-heart').addEventListener('click', (evt) => {
    evt.stopPropagation();
    evt.target.classList.toggle('element__button-heart_active');
  });
  elementForm.querySelector('.element__button-delete').addEventListener('click', (evt) => {
    evt.stopPropagation();
    deleteElement(evt.target);
  });
  elementForm.querySelector('.element__image').addEventListener('click', () => {
    const linkImagePopup = elementForm.querySelector('.element__image').src;
    const titleImagePopup = elementForm.querySelector('.element__title').textContent;
    imagePopup(linkImagePopup, titleImagePopup);
  });

  addElement(elementForm);
};



/*  ссылка на тестовое изображение
https://gohtml.ru/images/news/151--15-10-03--21-21-00.jpg 
*/

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// : цикл для считывания данных из массива карточек
for (let a = 0; a < initialCards.length; a++) {
  createElement(initialCards[a].name, initialCards[a].link);
};
