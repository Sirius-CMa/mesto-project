function forms() {
  console.log('hhh');
  const btns = document.querySelector('.popup__save-button')
  const form = document.querySelector('.page')

  form.addEventListener('keydown', (evt) => {
    console.log('1-', evt.key);
    if (evt.code === 'KeyZ') { console.log('jjjj') }
    // if (evt.target.classList.contains('popup__save-button')) {
    btns.classList.toggle('popup__save-button_disabled')
    // }
  })
  console.log(btns);
}




forms();



export * from './forms.js'
