const initInputs = (form) => {
  const saveButton = form.querySelector('.popup__save-button')
  const inputs = [...form.querySelectorAll('.popup__input')]
  switchingSaveButton(inputs, saveButton)
  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      isValid(input, form);
      switchingSaveButton(inputs, saveButton);
    })
  })
}

function initForms() {
  const forms = [...document.querySelectorAll('.form')]
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    });
    initInputs(form);
  });
}

const showInputError = (element, form) => {
  const err = form.querySelector(`.${element.id}-error`)
  element.classList.add('popup__input_error');
  err.classList.add('popup__input-error_active')
  err.textContent = element.validationMessage
};

const hideInputError = (element, form) => {
  const err = form.querySelector(`.${element.id}-error`)
  element.classList.remove('popup__input_error')
  err.classList.remove('popup__input-error_active')
};

const isValid = (input, form) => {
  console.log(`Осталось ${200 - input.value.length} символов`)
  input.validity.patternMismatch
    ? input.setCustomValidity(input.dataset.errorMessageType)//console.log('не правильно')
    : input.validity.tooShort
      ? input.setCustomValidity(input.dataset.errorMessageLength)
      : input.setCustomValidity('')//console.log('правильно ')

  !input.validity.valid
    ? showInputError(input, form)
    : hideInputError(input, form)
};

function checkFields(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid
  })
};

export function switchingSaveButton(inputs, saveButton) {
  checkFields(inputs)
    ? saveButton.classList.add('popup__save-button_disabled')
    : saveButton.classList.remove('popup__save-button_disabled')
}

export function cleareInputs() {
  setTimeout(() => document.querySelectorAll('.popup__input')
    .forEach(element => element.value = ''), 1000)
}



initForms();

