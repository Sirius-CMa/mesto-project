export default class Card {

  static _getDefualtCardTemplate(templateBlockSelector, templateDefaultCard) {

    const $cardTemplate = document.querySelector(templateBlockSelector)
      .content
      .querySelector(templateDefaultCard)
      .cloneNode(true);
    return $cardTemplate;
  }

  constructor(dataCard, dataUser, defaultCardElementsSelectors, templateBlockSelector,
    {
      handleClickByCard,
      deleteCard,
      addLike,
      removeLike
    }
  ) {
    this._dataCard = dataCard;
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._idCard = dataCard._id;
    //
    this._idUser = dataUser._id;
    //
    this._selectors = defaultCardElementsSelectors;
    this._templateBlockSelector = templateBlockSelector;
    // функционал карточки
    this._addLike = addLike; // функция лайка
    this._removeLike = removeLike;
    this._deleteCard = deleteCard; // функция удалени
    this._openPopupImage = handleClickByCard; // функция открытия попапа с изображением

  }



  createCardElement() {
    this._$cardElement = Card._getDefualtCardTemplate(this._templateBlockSelector, this._selectors.cardSelector);
    this._$cardElement.querySelector(this._selectors.image).src = this._link;
    this._$cardElement.querySelector(this._selectors.titleCard).textContent = this._name;
    this._$cardElement.querySelector(this._selectors.image).alt = this._name;

    this._$buttonLike = this._$cardElement.querySelector(this._selectors.buttonHeart);
    this._$buttonDelete = this._$cardElement.querySelector(this._selectors.buttonDelete);
    this._$blockNumderLikes = this._$cardElement.querySelector(this._selectors.blockNumderLikes);

    this._checkButtonHeart(this._dataCard) && this._$buttonLike.classList.add(this._selectors.activeModifierButtonHeart);
    this._$blockNumderLikes.textContent = this._countLikes(this._dataCard);

    this._dataCard.owner._id === this._idUser
      ? this._$buttonDelete.addEventListener('click', () => this._deleteCard())
      : this._$buttonDelete.classList.add(this._selectors.disablingModifierButtonDelete);

    this._setEventListeners();

    return this._$cardElement;
  }

  _setEventListeners() {
    this._$cardElement.querySelector(this._selectors.buttonHeart).addEventListener('click', () => this._handleLikeCard());
    this._$cardElement.querySelector(this._selectors.image)
      .addEventListener('click', () => this._openPopupImage({ name: this._name, link: this._link }));
  }

  deleteCard() {
    this._$cardElement.remove();
    this._$cardElement = null;
  }

  getIdCard() {
    return this._idCard;
  }

  _handleLikeCard() {
    this._$buttonLike.classList.contains(this._selectors.activeModifierButtonHeart)
      ? this._removeLike()
      : this._addLike()
  }

  _checkButtonHeart(card) { // : проверка собственника
    return card.likes.find(like => like._id === this._idUser)
  }

  _countLikes(dataCard) {  // : заполнение количества лайков
    return dataCard.likes.length === 0
      ? ''
      : dataCard.likes.length
  }

  indicateLike(card) {         // : отображение лайка на странице
    this._$blockNumderLikes.textContent = this._countLikes(card);
    this._checkButtonHeart(card)
      ? this._$buttonLike.classList.add(this._selectors.activeModifierButtonHeart)
      : this._$buttonLike.classList.remove(this._selectors.activeModifierButtonHeart)
  }

};












// import { openFullsizeImage, popupConfirmationDeletion } from "../index.js"
// import { checkButton } from "./utils.js";
// import { deleteCardServer, addLikeServer, removeLikeServer } from "./Api.js";
// import { openPopup } from "./modal.js";
// import {dataUser } from "../utils/constants.js";

// const formTemplate = document.querySelector('#forms').content;
// const elements = document.querySelector('.elements');


// const checkButtonHeart = (likes) => likes.find(like => like._id ===dataUser._id);

// function deleteCardOnPage(id) {            // : удаление карточки из блока elements
//   document.querySelector(`[dataCard-id='${id}']`).remove();
// };

// function startPreparingDeletion(evt) {
//   popupConfirmationDeletion.dataCardset.deleteCard = evt.target.closest('.element').dataCardset.id;
//   openPopup(popupConfirmationDeletion);
// };

// function countLikes(card) {
//   return card.likes.length === 0
//     ? ''
//     : card.likes.length
// };

// export const createElement = (card) => {    // : Ф создания блока "element"
//   const cardElement = formTemplate.querySelector('.element').cloneNode(true);
//   const imageElement = cardElement.querySelector('.element__link');
//   const likesElement = cardElement.querySelector('.element__likes');
//   const deleteElement = cardElement.querySelector('.element__button-delete');
//   const buttonHeart = cardElement.querySelector('.element__button-heart');

//   cardElement.dataCardset.id = card._id;

//   checkButtonHeart(card.likes) && buttonHeart.classList.add('element__button-heart_active');

//   card.owner._id ===dataUser._id
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
//   const id = evt.target.closest('.element').dataCardset.id;
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
