const body = document.querySelector('.body');
const page = body.querySelector('.page');


const content = page.querySelector('.content');

const elements = content.querySelector('.elements');
const profile = content.querySelector('.profile');

const popup = page.querySelector('.popup');
const popupContent = popup.querySelector('.popup__content');
const popupAddingPlace = page.querySelector('.popup-add-place');
const popupEditingProfile = page.querySelector('.popup-edit-profile');
const popupFullsizeImage = page.querySelector('.popup-fullsize-image');




// :блок редактирования профиля

const FormEditingProfile = popupEditingProfile.querySelector('#edit-profile');
let inputFormName = FormEditingProfile.querySelector('#name');
let inputFormProfession = FormEditingProfile.querySelector('#profession');
let nameProfile = profile.querySelector('.profile__name');
let professionProfile = profile.querySelector('.profile__profession');


// : кнопка редактирования профиля
const editingButton = profile.querySelector('.profile__edit-button');
editingButton.addEventListener('click', () => {
  inputFormName.value = nameProfile.textContent;
  inputFormProfession.value = professionProfile.textContent;
  openModal(popupEditingProfile);
  /* handlerEditingForm.openModal();*/
});

// : кнопка соранения данных профиля
const savingButton = FormEditingProfile.querySelector('.edit-profile__save-button');
savingButton.addEventListener('click', () => {
  if (inputFormName.value === "") {
    alert("У Вас должно быть имя!");
  }
  else {
    nameProfile.textContent = inputFormName.value;
    professionProfile.textContent = inputFormProfession.value;
    closeModal(popupEditingProfile);
    /*handlerEditingForm.closeModal();*/
  }
});


// : кнопка добавления элемента
const addingButton = profile.querySelector('.profile__add-button');
addingButton.addEventListener('click', () => {
  openModal(popupAddingPlace);
  /*handlerAddingForm.openModal();*/
});

// : кнопка создания элемента
const creatingButton = popupAddingPlace.querySelector('.add-place__create-button');
creatingButton.addEventListener('click', function () {

  let nameCard = popupAddingPlace.querySelector('#title').value;
  let linkCard = popupAddingPlace.querySelector('#link').value;

  if (linkCard === "") {
    alert('Поле "Ссылка на изображение" должно быть заполнено!')
  }
  else {
    createElement(nameCard, linkCard)
    closeModal(popupAddingPlace);
    /*handlerAddingForm.closeModal();*/
  };


});


// : отправка по кнопке enter в поле ввода
const inputForms = document.querySelectorAll('.form');
inputForms.forEach(inputForm => {
  const inputStrings = inputForm.querySelectorAll('.enter');
  inputStrings.forEach(inputString => {
    inputString.addEventListener("keyup", function (evt) {
      if (evt.keyCode === 13) {
        inputForm.querySelector('.submit').click();
        evt.preventDefault();
      }
    })
  })
});



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


// : функция создания блока "element"
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


// : модальное окно с полноразмерным изображением
function imagePopup(linkImagePopup, titleImagePopup) {
  popupFullsizeImage.querySelector('.image-popup__image').src = linkImagePopup;
  popupFullsizeImage.querySelector('.image-popup__caption').textContent = titleImagePopup;
  openModal(popupFullsizeImage);
  /*handlerImageForm.openModal();*/
};

// : функция удаления элемента
function deleteElement(card) {
  card.closest('.element').remove();
};


// : функция добавления элемента
function addElement(elementForm) {
  elements.prepend(elementForm);
}

// :кнопка закрытия формы
const closingButtons = document.querySelectorAll('.popup__close-button');
closingButtons.forEach(closingBtn => {
  closingBtn.addEventListener('click', () => {
    closeModal(closingBtn.closest('.overlay'));
  })
});



// : закрытие модального окна по клику на overlay
const popupOverlay = document.querySelectorAll('.overlay');
popupOverlay.forEach(overlayBtn => {
  if (overlayBtn.classList.contains('overlay')) {
    overlayBtn.addEventListener('click', (evt) => {
      if (evt.target === overlayBtn) {
        evt.stopPropagation();
        closeModal(overlayBtn);
      }
    })
  }
});


// :открытие и закрытие модального окна
function openModal(targetPopup) {
  targetPopup.classList.add('popup_opened');
};

function closeModal(targetPopup) {
  targetPopup.classList.remove('popup_opened');
};



/* Это честно списано у наставника

const handlerAddingForm = initPopup('.popup-add-place');
const handlerEditingForm = initPopup('.popup-edit-profile')
const handlerImageForm = initPopup('.popup-fullsize-image')

function initPopup(popupName) {

  const targetPopup = document.querySelector(popupName);
  const openModal = () => {
    targetPopup.classList.add('popup_opened');
  };
  const closeModal = () => {
    targetPopup.classList.remove('popup_opened')
  };
  const close = targetPopup.querySelector('.popup__close-button');
  close.addEventListener('click', closeModal)

  if (targetPopup.className.includes('overlay')) {
    targetPopup.addEventListener('click', (evt) => {
      if (evt.target === targetPopup) {
        closeModal()
      }
    })
  }
  return { openModal, closeModal }
};

*/