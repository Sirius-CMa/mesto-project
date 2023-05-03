export default class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._$popup = document.querySelector(this._selector);
    this._$buttonClose = this._$popup.querySelector('.popup__close-button');

    this._handlePressEscape = this._handlePressEscape.bind(this);
    this._handleClickButtonClose = this._handleClickButtonClose.bind(this);
    this._handleClickOnOverley = this._handleClickOnOverley.bind(this);
  }

  open() {
    this._setListeners();
    this._$popup.classList.add('popup_opened');
  }

  close() {
    this._$popup.classList.remove('popup_opened');
    this._removeListeners();
  }

  _handleClickButtonClose() {
    this.close();
  }

  _handleClickOnOverley(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  _handlePressEscape(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.close();
    }
  }

  _setListeners() {
    document.addEventListener('keydown', this._handlePressEscape);
    this._$buttonClose.addEventListener('click', this._handleClickButtonClose);
    this._$popup.addEventListener('click', this._handleClickOnOverley);
  }

  _removeListeners() {
    document.removeEventListener('keydown', this._handlePressEscape);
    this._$buttonClose.removeEventListener('click', this._handleClickButtonClose);
    this._$popup.removeEventListener('click', this._handleClickOverley);
  }
};
