//buttonSubmit

// modifierTextError
export default class FormValidator {
  constructor(
    {
      inputSelector,
      buttonSubmitSelector,
      disablingModifierSubmitButton,
      modifierInputError,
      modifierTextError
    },
    formElement) {
    this._$form = formElement;
    this._inputSelector = inputSelector;
    this._buttonSubmitSelector = buttonSubmitSelector;
    this._disablingModifierSubmitButton = disablingModifierSubmitButton;
    this._modifierInputError = modifierInputError;
    this._modifierTextError = modifierTextError;

    this._$inputsList = [...this._$form.querySelectorAll(this._inputSelector)];
    this._$buttonSubmit = this._$form.querySelector(this._buttonSubmitSelector);

  }

  initiateValidation() {
    this._$form.addEventListener('submit', (evt) => evt.preventDefault())
    this._setEventListener();
  }

  _setEventListener() {
    this._$form.addEventListener('reset', () => {
      !this._$buttonSubmit.classList.contains('notdisabled') &&
        (this._$buttonSubmit.classList.add(this._disablingModifierSubmitButton),
          this._$buttonSubmit.disabled = true)
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
    const _$blockError = this._$form.querySelector(`.${$inputElement.id}-error`)
    $inputElement.classList.add(this._modifierInputError);
    _$blockError.classList.add(this._modifierTextError)
    _$blockError.textContent = $inputElement.validationMessage
  }

  _hideInputError($inputElement) {
    const _$blockError = this._$form.querySelector(`.${$inputElement.id}-error`)
    $inputElement.classList.remove(this._modifierInputError)
    _$blockError.classList.remove(this._modifierTextError)
  }

  _isValid($inputElement) {
    $inputElement.validity.patternMismatch
      ? $inputElement.setCustomValidity($inputElement.dataset.errorMessageType)//console.log('не правильно')
      : $inputElement.setCustomValidity('')//console.log('правильно ')

    !$inputElement.validity.valid
      ? this._showInputError($inputElement)
      : this._hideInputError($inputElement)
  }

  _checkFields($inputsList) {
    return $inputsList.some(($input) => {
      return !$input.validity.valid
    })
  }

  _switchSaveButton() {
    this._checkFields(this._$inputsList)
      ? (this._$buttonSubmit.classList.add(this._disablingModifierSubmitButton),
        this._$buttonSubmit.disabled = true)

      : (this._$buttonSubmit.classList.remove(this._disablingModifierSubmitButton),
        this._$buttonSubmit.disabled = false)
  }

};
