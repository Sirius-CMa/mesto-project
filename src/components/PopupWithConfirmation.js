import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor({ callback }, popupSelector) {
    super(popupSelector)
    this._handleSubmit = callback;
    this._$popupForm = this._$popup.querySelector('.form');
    this._handleClickButtonSubmit = this._handleClickButtonSubmit.bind(this);
  }

  _handleClickButtonSubmit(evt) {
    evt.preventDefault();
    this._handleSubmit(this._id);
  }

  _setListeners() {
    super._setListeners();
    this._$popupForm.addEventListener('submit', this._handleClickButtonSubmit);
  }

  _removeListeners() {
    super._removeListeners();
    this._$popupForm.removeEventListener('submit', this._handleClickButtonSubmit);
  }

  open(id) {
    this._id = id;
    super.open()
  }
};
