export default class Card {

  static _getDefualtCardTemplate(templateBlock, templateDefaultCard) {

    const $cardTemplate = document.querySelector(templateBlock) //(this._selectors.templateSelector)
      .content
      .querySelector(templateDefaultCard)//(this._selectors.cardSelector)
      .cloneNode(true);
    return $cardTemplate;
  }

  constructor(data, idProfile, selectors,
    {
      handleCardClick,
      deleteCard,
      addLike,
      removeLike
    }
  ) {
    this._data = data;
    this._name = data.name;
    this._image = data.link;
    this._idCard = data._id;
    //
    this._idUser = idProfile._id;
    //
    this._selectors = selectors;
    // функционал карточки
    this._addLike = addLike; // функция лайка
    this._removeLike = removeLike;
    this._deleteCard = deleteCard; // функция удалени
    this._openPopupImage = handleCardClick; // функция открытия попапа с изображением

  }



  createCardElement() {
    this._$cardElement = Card._getDefualtCardTemplate(this._selectors.templateSelector, this._selectors.cardSelector);
    this._$cardElement.querySelector(this._selectors.image).src = this._image;
    this._$cardElement.querySelector(this._selectors.titleCard).textContent = this._name;
    this._$cardElement.querySelector(this._selectors.image).alt = this._name;

    this._$likeButton = this._$cardElement.querySelector(this._selectors.buttonHeart);
    this._$numderLikes = this._$cardElement.querySelector(this._selectors.likes);
    this._$buttonDelete = this._$cardElement.querySelector(this._selectors.buttonDelete);

    this._checkButtonHeart(this._data) && this._$likeButton.classList.add(this._selectors.activeModifierButtonHeart)
    this._$numderLikes.textContent = this._countLikes(this._data)

    // this._data.owner._id === this._idUser
    //   && this._$cardElement
    //     .querySelector(this._selectors.buttonDelete)
    //     .classList.remove(this._selectors.disablingModifierButtonDelete);

    this._data.owner._id === this._idUser
      ? this._$buttonDelete.addEventListener('click', () => this._deleteCard())
      : this._$buttonDelete.classList.add('element__button-delete_disabled');

    this._setEventListeners();

    return this._$cardElement;
  }

  _setEventListeners() {
    this._$cardElement.querySelector(this._selectors.buttonHeart).addEventListener('click', () => this._handleLikeCard());
    // this._$cardElement.querySelector(this._selectors.buttonDelete).addEventListener('click', () => this._deleteCard());
    this._$cardElement.querySelector(this._selectors.image).addEventListener('click', () => this._openPopupImage({ name: this._name, link: this._image }));
  }

  deleteCard() {
    this._$cardElement.remove();
    this._$cardElement = null;
  }

  getIdCard() {
    return this._idCard;
  }

  _handleLikeCard() {
    this._$likeButton.classList.contains(this._selectors.activeModifierButtonHeart)
      ? this._removeLike()
      : this._addLike()
  }

  _checkButtonHeart(card) { // : проверка собственника
    return card.likes.find(like => like._id === this._idUser)
  }

  _countLikes(data) {  // : заполнение количества лайков
    return data.likes.length === 0
      ? ''
      : data.likes.length
  }

  indicateLike(card) {         // : отображение лайка на странице
    this._$numderLikes.textContent = this._countLikes(card);
    this._checkButtonHeart(card)
      ? this._$likeButton.classList.add(this._selectors.activeModifierButtonHeart)
      : this._$likeButton.classList.remove(this._selectors.activeModifierButtonHeart)
  }

};












// import { openFullsizeImage, popupConfirmationDeletion } from "../index.js"
// import { checkButton } from "./utils.js";
// import { deleteCardServer, addLikeServer, removeLikeServer } from "./Api.js";
// import { openPopup } from "./modal.js";
// import { idProfile } from "../utils/constants.js";

// const formTemplate = document.querySelector('#forms').content;
// const elements = document.querySelector('.elements');


// const checkButtonHeart = (likes) => likes.find(like => like._id === idProfile._id);

// function deleteCardOnPage(id) {            // : удаление карточки из блока elements
//   document.querySelector(`[data-id='${id}']`).remove();
// };

// function startPreparingDeletion(evt) {
//   popupConfirmationDeletion.dataset.deleteCard = evt.target.closest('.element').dataset.id;
//   openPopup(popupConfirmationDeletion);
// };

// function countLikes(card) {
//   return card.likes.length === 0
//     ? ''
//     : card.likes.length
// };

// export const createElement = (card) => {    // : Ф создания блока "element"
//   const cardElement = formTemplate.querySelector('.element').cloneNode(true);
//   const imageElement = cardElement.querySelector('.element__image');
//   const likesElement = cardElement.querySelector('.element__likes');
//   const deleteElement = cardElement.querySelector('.element__button-delete');
//   const buttonHeart = cardElement.querySelector('.element__button-heart');

//   cardElement.dataset.id = card._id;

//   checkButtonHeart(card.likes) && buttonHeart.classList.add('element__button-heart_active');

//   card.owner._id === idProfile._id
//     ? cardElement.querySelector('.element__button-delete').addEventListener('click', startPreparingDeletion)
//     : deleteElement.classList.add('element__button-delete_disabled');

//   likesElement.textContent = countLikes(card);

//   cardElement.querySelector('.element__title').textContent = card.name;
//   imageElement.src = card.link;
//   imageElement.alt = card.name;

//   cardElement.querySelector('.element__button-heart').addEventListener('click', handleLike);
//   imageElement.addEventListener('click', () => { openFullsizeImage({ name: card.name, link: card.link }) });

//   return cardElement;
// };

// export const addCardInBlockElements = (cardElement) => {     // : ф добавления "element"
//   elements.prepend(cardElement);
// };



// export function deleteCard(id, evt) {     // : удаление карточки
//   checkButton(evt, 'Удаляется...')
//   api.deleteCardServer(id)
//     .then(() => {
//       deleteCardOnPage(id);
//     })
//     .catch(err => console.log(err))
//     .finally(() => checkButton(evt, 'Да'))
// };

// const indicateLike = (card, evt) => {         // : отображение лайка на странице
//   const numberLikes = evt.target.parentNode.querySelector('.element__likes');
//   numberLikes.textContent = countLikes(card);
//   checkButtonHeart(card.likes)
//     ? evt.target.classList.add('element__button-heart_active')
//     : evt.target.classList.remove('element__button-heart_active')
// }

// function handleLike(evt) {                // : обработка лайка
//   const id = evt.target.closest('.element').dataset.id;
//   if (evt.target.classList.contains('element__button-heart_active')) {
//     api.removeLikeServer(id)
//       .then(res => indicateLike(res, evt))
//       .catch(err => console.log(err))
//   }
//   else {
//     api.addLikeServer(id)
//       .then(res => indicateLike(res, evt))
//       .catch(err => console.log(err))
//   };
// };
