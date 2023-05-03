import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ callback }, popupSelector) {
    super(popupSelector)
    this._handleSubmit = callback;

    this._$popupForm = this._$popup.querySelector('.form');
    this._$popupInputs = this._$popupForm.querySelectorAll('.popup__input');
    this._$buttonSubmit = this._$popupForm.querySelector('.popup__save-button');

    this._handleClickButtonSubmit = this._handleClickButtonSubmit.bind(this);

    this._dataInputs = {};
  }

  close() {
    super.close();
    this._$popupForm.reset();
  }

  _getInputValues() {
    this._$popupInputs.forEach($input => this._dataInputs[$input.name] = $input.value);
    return this._dataInputs
  }

  _handleClickButtonSubmit(evt) {
    evt.preventDefault();
    this._handleSubmit(this._getInputValues());
  }

  _setListeners() {
    super._setListeners();
    this._$popupForm.addEventListener('submit', this._handleClickButtonSubmit);
  }

  _removeListeners() {
    super._removeListeners();
    this._$popupForm.removeEventListener('submit', this._handleClickButtonSubmit);
  }


  setTextButtonSubmit(status) {
    status
      ? this._$buttonSubmit.textContent = 'Сохраняю...'
      : this._$buttonSubmit.textContent = 'Сохранить'
  }
  ;
}
