export default class Popup {
  constructor(selector) {
    this._selector = selector
    this._popup = document.querySelector(this._selector);
    // console.log('попап -', this._popup)
    this._closeButton = this._popup.querySelector('.popup__close-button')
    // console.log('кнопка -', this._closeButton);
    this._handlePressEscape = this._handlePressEscape.bind(this);
    this._handleClickCloseButton = this._handleClickCloseButton.bind(this);
    this._handleClickOnOverley = this._handleClickOnOverley.bind(this);
  }

  open() {
    this._setListeners()
    this._popup.classList.add('popup_opened')
  }
  close() {
    this._removeListeners()
    this._popup.classList.remove('popup_opened')

  }
  _setListeners() {
    document.addEventListener('keydown', this._handlePressEscape);
    this._closeButton.addEventListener('click', this._handleClickCloseButton);
    this._popup.addEventListener('click', this._handleClickOnOverley);

  }
  _removeListeners() {
    document.removeEventListener('keydown', this._handlePressEscape);
    this._closeButton.removeEventListener('click', this._handleClickCloseButton);
    this._popup.removeEventListener('click', this._handleClickOverley);

  }
  _handleClickCloseButton() {
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

}
// _handleEscButton(evt) {
//   if (evt.key === 'Escape') {
//     evt.preventDefault();
//     this.close();
//   }
// }

// _handleCloseButton() {
//   this.close();
// }

// _handleClickOverley(evt) {
//   if (evt.target.classList.contains('popup_opened')) {
//     this.close();
//   }
// }
