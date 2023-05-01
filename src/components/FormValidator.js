

export default class FormValidator {
  constructor(
    {
      inputSelector,
      saveButtonSelector,
      disablingModifierButton,
      inputErrorModifier,
      textErrorModifier
    },
    formElement) {
    this._$form = formElement;
    this._inputSelector = inputSelector;
    this._saveButtonSelector = saveButtonSelector;
    this._disablingModifierButton = disablingModifierButton;
    this._inputErrorModifier = inputErrorModifier;
    this._textErrorModifier = textErrorModifier;

    this._$inputsList = [...this._$form.querySelectorAll(this._inputSelector)];
    this._$saveButtonForm = this._$form.querySelector(this._saveButtonSelector);

  }

  initiateValidation() {
    this._$form.addEventListener('submit', (evt) => evt.preventDefault())
    this._setEventListener();
  }

  _setEventListener() {
    this._$form.addEventListener('reset', () => {
      this._$saveButtonForm.classList.add(this._disablingModifierButton)
      this._$saveButtonForm.disabled = true
      this._$inputsList.forEach($inputElement => {
        this._hideInputError($inputElement)
      })
    })

    this._$inputsList.forEach(($inputElement) => {
      $inputElement.addEventListener('input', () => {
        this._isValid($inputElement);
        this._switchSaveButton();
      });
    });
  }

  _showInputError($inputElement) {
    const $err = this._$form.querySelector(`.${$inputElement.id}-error`)
    $inputElement.classList.add(this._inputErrorModifier);
    $err.classList.add(this._textErrorModifier)
    $err.textContent = $inputElement.validationMessage
  }

  _hideInputError($inputElement) {
    const $err = this._$form.querySelector(`.${$inputElement.id}-error`)
    $inputElement.classList.remove(this._inputErrorModifier)
    $err.classList.remove(this._textErrorModifier)
  }

  _isValid($inputElement) {
    $inputElement.validity.patternMismatch
      ? $inputElement.setCustomValidity($inputElement.dataset.errorMessageType)//console.log('не правильно')
      : $inputElement.setCustomValidity('')//console.log('правильно ')

    !$inputElement.validity.valid
      ? this._showInputError($inputElement)
      : this._hideInputError($inputElement)
  }

  _checkFields($inputs) {
    return $inputs.some(($input) => {
      return !$input.validity.valid
    })
  }

  _switchSaveButton() {
    this._checkFields(this._$inputsList)
      ? (this._$saveButtonForm.classList.add(this._disablingModifierButton),
        this._$saveButtonForm.disabled = true)

      : (this._$saveButtonForm.classList.remove(this._disablingModifierButton),
        this._$saveButtonForm.disabled = false)
  }

};
