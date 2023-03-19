
export const popupElements = {
  form: '.form',
  input: '.popup__input',
  saveButton: '.popup__save-button',
  disablingModifierButton: 'popup__save-button_disabled',
  inputErrorModifier: 'popup__input_error', // красная линия
  textErrorModifier: 'popup__input-error_active' // текст ошибки
};

function setListenerInputs(formPopup, popupElements) {
  const saveBtn = formPopup.querySelector(popupElements.saveButton)
  const inputs = [...formPopup.querySelectorAll(popupElements.input)]
  switchingSaveButton(inputs, saveBtn, popupElements)
  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      isValid(input, formPopup, popupElements);
      switchingSaveButton(inputs, saveBtn, popupElements);
    })
  })
};


export function initForms(popupElements) {
  const forms = [...document.querySelectorAll(popupElements.form)]
  forms.forEach((formPopup) => {
    setListenerInputs(formPopup, popupElements);
  });
};

const showInputError = (element, formPopup, popupElements) => {
  const err = formPopup.querySelector(`.${element.id}-error`)
  element.classList.add(popupElements.inputErrorModifier);
  err.classList.add(popupElements.textErrorModifier)
  err.textContent = element.validationMessage
};

const hideInputError = (element, formPopup, popupElements) => {
  const err = formPopup.querySelector(`.${element.id}-error`)
  element.classList.remove(popupElements.inputErrorModifier)
  err.classList.remove(popupElements.textErrorModifier)
};

export const isValid = (input, formPopup, popupElements) => {
  input.validity.patternMismatch
    ? input.setCustomValidity(input.dataset.errorMessageType)//console.log('не правильно')
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
    ? (saveBtn.classList.add(popupElements.disablingModifierButton,
      saveBtn.disabled = true)
    )
    : saveBtn.classList.remove(popupElements.disablingModifierButton,
      saveBtn.disabled = false)
};

export function cleareInputs(inputs, form, popupElements) {
  inputs.forEach(element => {
    element.value = ''
    hideInputError(element, form, popupElements)
  })
};

export function prepareForm(form, popupElements) {
  const inputs = [...form.querySelectorAll(popupElements.input)];
  const saveBtn = form.querySelector(popupElements.saveButton)
  cleareInputs(inputs, form, popupElements);
  switchingSaveButton(inputs, saveBtn, popupElements)
};


