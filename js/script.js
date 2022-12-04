let body = document.querySelector('.body');
let page = body.querySelector('.page');

let content = page.querySelector('.content');
let elements = content.querySelector('.elements');

let profile = content.querySelector('.profile');
let nameProfile = profile.querySelector('.profile__name');
let professionProfile = profile.querySelector('.profile__profession');

let popup = page.querySelector('.popup');
let popupContent = popup.querySelector('.popup__content');
const FormTemplate = document.querySelector('#forms').content;

// :блок редактирования профиля

let editButton = profile.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => {
  const inputForm = FormTemplate.querySelector('.edit-profile').cloneNode(true);
  inputForm.querySelector('#name').value = profile.querySelector('.profile__name').textContent;
  inputForm.querySelector('#profession').value = profile.querySelector('.profile__profession').textContent;

  const saveButton = inputForm.querySelector('.edit-profile__save-button');
  saveButton.addEventListener('click', () => {
    nameProfile.textContent = inputForm.querySelector('#name').value;
    professionProfile.textContent = inputForm.querySelector('#profession').value;
    closeModal();
  });

  popupContent.append(inputForm);

  openModal();
});


// :блок добавления элемента 

const addButton = profile.querySelector('.profile__add-button');
addButton.addEventListener('click', () => {
  const addForm = FormTemplate.querySelector('.add-place').cloneNode(true);
  const createButton = addForm.querySelector('.add-place__create-button');
  createButton.addEventListener('click', () => {
    let nameCard = addForm.querySelector('#title').value;
    let linkCard = addForm.querySelector('#link').value;
    createElement(nameCard, linkCard);
    closeModal();
  });

  popupContent.append(addForm);

  openModal();
});


// :кнопка закрытия формы
const closeButton = popup.querySelector('.popup__close-button');
closeButton.addEventListener('click', () => {
  closeModal();
});



function closeModal() {
  popup.classList.remove('popup_opened');
  setTimeout(() => { popupContent.lastChild.remove(); }, 2000);
};

function openModal() {
  popup.classList.add('popup_opened');
};

const popupOverlay = page.querySelector('.overlay');
popupOverlay.addEventListener('click', (evt) => {
  if (evt.target === popupOverlay) {
    closeModal();
  }
}
);




/* https://gohtml.ru/images/news/151--15-10-03--21-21-00.jpg */




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



for (let a = 0; a < initialCards.length; a++) {
  createElement(initialCards[a].name, initialCards[a].link);
};


function createElement(nameCard, linkCard) {
  const elementForm = FormTemplate.querySelector('.element').cloneNode(true);
  elementForm.querySelector('.element__title').textContent = nameCard;
  elementForm.querySelector('.element__image').src = linkCard;
  elementForm.querySelector('.element__button-heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button-heart_active');
  });
  const deleteButton = elementForm.querySelector('.element__button-delete');
  deleteButton.addEventListener('click', () => {
    deleteButton.closest('.element').remove();
  });
  content.querySelector('.elements').prepend(elementForm);
};