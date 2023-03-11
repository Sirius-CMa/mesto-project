import { closeOpenedPopupByEsc } from "./popups";


const page = document.querySelector('.page')

page.addEventListener('keydown', (evt) => {
  evt.stopPropagation()
  if (evt.code == 'Escape') {
    closeOpenedPopupByEsc()
  }
})








