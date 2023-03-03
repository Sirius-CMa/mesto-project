
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
  !input.validity.valid
    ? showInputError(input, form)
    : hideInputError(input, form)
};

function checkFields(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid
  })

}


function switchingSaveButton(inputs, saveButton) {
  checkFields(inputs)
    ? saveButton.classList.add('popup__save-button_disabled')
    : saveButton.classList.remove('popup__save-button_disabled')
}


initForms();



export * from './forms.js'
