
//import { closeOpenedPopupByEsc } from "./components/modal.js";


import '../pages/index.css';
import './components/index.js'
import './components/validate.js'
import './components/utils.js'
import './components/modal.js'
import './components/card.js'




const page = document.querySelector('.page')

page.addEventListener('keydown', (evt) => {
  evt.stopPropagation()
  if (evt.code == 'Escape') {
    closeOpenedPopupByEsc()
  }
});

