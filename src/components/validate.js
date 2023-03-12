export const popupElements = {
  form: '.form',
  input: '.popup__input',
  saveButton: '.popup__save-button',
  disableModifier: '.popup__save-button_disabled',
  textError: '.popup__input-error',
  inputModifier: '.popup__input_error'
}



const initInputs = (formPopup, popupElements) => {
  const saveBtn = formPopup.querySelector(popupElements.saveButton)
  const inputs = [...formPopup.querySelectorAll(popupElements.input)]
  switchingSaveButton(inputs, saveBtn, popupElements)
  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      isValid(input, formPopup, popupElements);
      switchingSaveButton(inputs, saveBtn, popupElements);
    })
  })
}

function initForms(popupElements) {
  const forms = [...document.querySelectorAll(popupElements.form)]
  forms.forEach((formPopup) => {
    formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault()
    });
    initInputs(formPopup, popupElements);
  });
}

const showInputError = (element, formPopup, popupElements) => {
  const err = formPopup.querySelector(`.${element.id}-error`)
  element.classList.add(popupElements.textError);
  err.classList.add(popupElements.inputModifier)
  err.textContent = element.validationMessage
};

const hideInputError = (element, formPopup, popupElements) => {
  const err = formPopup.querySelector(`.${element.id}-error`)
  element.classList.remove(popupElements.textError)
  err.classList.remove(popupElements.inputModifier)
};

const isValid = (input, formPopup, popupElements) => {
  console.log(`Осталось ${200 - input.value.length} символов`)
  input.validity.patternMismatch
    ? input.setCustomValidity(input.dataset.errorMessageType)//console.log('не правильно')
    : input.validity.tooShort
      ? input.setCustomValidity(input.dataset.errorMessageLength)
      : input.setCustomValidity('')//console.log('правильно ')

  !input.validity.valid
    ? showInputError(input, formPopup, popupElements)
    : hideInputError(input, formPopup, popupElements)
};

function checkFields(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid
  })
};

export function switchingSaveButton(inputs, saveBtn, popupElements) {
  checkFields(inputs)
    ? saveBtn.classList.add(popupElements.disableModifier)
    : saveBtn.classList.remove(popupElements.disableModifier)
}

export function cleareInputs(popupElements) {
  setTimeout(() => document.querySelectorAll(popupElements.input)
    .forEach(element => element.value = ''), 1000)
}



initForms(popupElements);
