export const popupElements = {
  form: '.form',
  input: '.popup__input',
  saveButton: '.popup__save-button',
  disablingModifierButton: 'popup__save-button_disabled',
  inputErrorModifier: 'popup__input_error', // красная линия
  textErrorModifier: 'popup__input-error_active' // текст ошибки
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
  element.classList.add(popupElements.inputErrorModifier);
  err.classList.add(popupElements.textErrorModifier)
  err.textContent = element.validationMessage
};

const hideInputError = (element, formPopup, popupElements) => {
  const err = formPopup.querySelector(`.${element.id}-error`)
  element.classList.remove(popupElements.inputErrorModifier)
  err.classList.remove(popupElements.textErrorModifier)
};

const isValid = (input, formPopup, popupElements) => {
  // console.log(`Осталось ${200 - input.value.length} символов`)
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
    ? saveBtn.classList.add(popupElements.disablingModifierButton)
    : saveBtn.classList.remove(popupElements.disablingModifierButton)
}

export function cleareInputs(popupElements) {
  setTimeout(() => document.querySelectorAll(popupElements.input)
    .forEach(element => {
      element.value = ''
      const formPopup = element.closest('.form')
      hideInputError(element, formPopup, popupElements)
    }),
    1000)
};



initForms(popupElements);
