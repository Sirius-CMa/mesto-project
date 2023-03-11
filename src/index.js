import { initialProfile } from './components/profile.js';
import { initialCard } from './components/cards.js';

import '../pages/index.css';
import './components/index.js'
import './components/cardelements.js'
import './components/forms/valid-input.js'
import './components/popups.js'
import './components/profile.js'
import './components/cards.js'
import './components/page.js'
import './components/forms/forms.js'
import './components/api.js'
import './components/image.js'





const loadContent = () => {
  initialProfile()
  initialCard()
}

loadContent()

