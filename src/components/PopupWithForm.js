import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ callback }, popupSelector) {
    super(popupSelector)
    // console.log('1 -', this._popup)
    super(popupSelector);
    this._handleSubmit = callback;
    this._popupForm = this._popup.querySelector('.form');
    this._popupInputs = this._popupForm.querySelectorAll('.popup__input');
    this._saveButton = this._popupForm.querySelector('.popup__save-button');

    this._handleClickSaveButton = this._handleClickSaveButton.bind(this);

    this._dataInputs = {};
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  _getInputValues() {
    this._popupInputs.forEach(input => this._dataInputs[input.name] = input.value)
    console.log(this._dataInputs)
    return this._dataInputs
  }

  _handleClickSaveButton(evt) {
    evt.preventDefault();
    this._handleSubmit(this._getInputValues())

  }

  _setListeners() {
    super._setListeners();
    this._popupForm.addEventListener('submit', this._handleClickSaveButton);
  }

  _removeListeners() {
    super._removeListeners();
    this._popupForm.removeEventListener('submit', this._handleClickSaveButton);
  }


  setTextSaveButton(status) {
    status
      ? this._saveButton.textContent = 'Сохраняю...'
      : this._saveButton.textContent = 'Сохранить'
  }
}
