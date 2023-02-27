
const initInputs = (form) => {
  const inputs = [...form.querySelectorAll('.popup__input')]
  inputs.forEach((input) => {
    input.addEventListener('input', function () { isValid(input, form) })
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


initForms();



export * from './forms.js'
