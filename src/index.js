import './pages/index.css';
import './components/utils.js'

import Api from './components/Api.js';
import Section from './components/Section.js'
import Popup from './components/Popup';
import PopupWithForm from './components/PopupWithForm';
import PopupWithImage from './components/PopupWithImage';
import FormValidator from './components/FormValidator';
import UserInfo from './components/UserInfo';
import Card from './components/Card.js';


// ANCHOR константы

import {
  dataServer,
  dataUser,
  // : данные для редактирования профиля
  $nameProfile,
  $aboutProfile,
  $avatarProfile,
  $inputFormName,
  $inputFormAbout,
  //
  $formsList, // : коллекция форм

  popupElements,

  // : кнопки
  $buttonAddCard,
  $buttonEditAvatar,
  $buttonEditProfile,
  // : селекторы
  defaultCardElementsSelectors,
  templateBlockSelector,
  popupSelectors,
  blockElementsSelector
} from './utils/constants.js';
import { loadImage } from './components/utils.js';



const api = new Api(dataServer);



//ANCHOR - профиль

const profileUser = new UserInfo(
  $nameProfile,
  $aboutProfile,
  $avatarProfile
);

const fillInIdProfile = (id) => dataUser._id = id;

const fillInDataPopupEditProfile = () => {
  const dataProfile = profileUser.getUserInfo();
  $inputFormName.value = dataProfile.name;
  $inputFormAbout.value = dataProfile.about;
};

function initiateProfile() {   // : загрузка данных профиля
  api
    .getDataProfile()
    .then((res) => {
      fillInIdProfile(res._id);
      profileUser.setUserInfo(res);
      return dataUser._id !== undefined;
    })
    .then((res) => {
      res
        ? (api.getContentServer().then(cards => blockElements.initiateCard(cards)))
        : console.log(`ERROR: ID Profile - ${idProfile._id}.`);
    })
    .catch(err => console.log(err))
};




//ANCHOR -  блок карточек

const blockElements = new Section(
  {
    render: dataCard => {
      const cardElement = createElement(dataCard, dataUser)
      const card = cardElement.createCardElement()
      return card
    }
  },
  blockElementsSelector
);


const createElement = (dataCard, dataUser) => {
  const card = new Card(
    dataCard,
    dataUser,
    defaultCardElementsSelectors,
    templateBlockSelector,
    {
      handleClickByCard: (dataImage) => popupImageFullSize.open(dataImage),
      addLike: () => {
        api.addLikeServer(card.getIdCard())
          .then((res) => {
            card.indicateLike(res)
          })
          .catch(err => console.log(err))
      },
      removeLike: () => {
        api.removeLikeServer(card.getIdCard())
          .then((res) => { card.indicateLike(res) })
          .catch(err => console.log(err))
      },
      deleteCard: () => {
        api.deleteCardServer(card.getIdCard())
          .then(() => card.deleteCard())
          .catch(err => console.log(err))
      }
    }
  )
  return card
};

// export const popupConfirmationDeletion = document.querySelector('.popup-delete-card');


//  ANCHOR -  превью
export function openFullsizeImage(data) {
  popupImageFullSize.open(data);
};

//ANCHOR - валидация

const initiateValidationForm = (formElement) => {

  const popupFormValidator = new FormValidator(popupElements, formElement);
  popupFormValidator.initiateValidation()
};

$formsList.forEach((formElement) => {
  initiateValidationForm(formElement)
});




//ANCHOR - попапы
const popupEditProfile = new PopupWithForm({
  callback: (data) => {
    popupEditProfile.setTextButtonSubmit(true)
    api.saveDataProfile(data)
      .then((res) => {
        profileUser.setUserInfo(res);
        popupEditProfile.close()
      }
      )
      .catch(err => console.log(err))
      .finally(() => {
        popupEditProfile.setTextButtonSubmit(false)
      })
  }
},
  popupSelectors.editProfile
);

const popupInvalidLink = new PopupWithForm({
  callback: () => {
    popupInvalidLink.close();
    dataUser.popup === 'avatar'
      ? popupEditAvatar.open()
      : popupAddCard.open();

  }
},
  popupSelectors.invalidLink);

const popupEditAvatar = new PopupWithForm({
  callback: (data) => {
    popupEditAvatar.setTextButtonSubmit(true)
    loadImage(data.avatar)
      .then(() => {
        api
          .saveAvatarProfile(data)
          .then((res) => {
            profileUser.setUserInfo(res)
            popupEditAvatar.close();
          })
          .catch(err => console.log(err))
          .finally(() => {
            popupEditAvatar.setTextButtonSubmit(false)
          })

      })
      .catch(() => {
        dataUser.popup = 'avatar';
        popupEditAvatar.close();
        popupEditAvatar.setTextButtonSubmit(false);
        popupInvalidLink.open();
      })
    // .finally(() => { })
  }
},
  popupSelectors.editingAvatar);


const popupAddCard = new PopupWithForm({
  callback: (data) => {

    popupAddCard.setTextButtonSubmit(true)
    loadImage(data.link)
      .then(() => {
        api
          .saveNewCardServer(data)
          .then((res) => {
            blockElements.addCardInBlockElements(res);
            popupAddCard.close();
          })
          .catch(err => console.log(err))
          .finally(() => popupEditProfile.setTextButtonSubmit(false))
      })
      .catch(() => {
        dataUser.popup = 'card';
        popupAddCard.close(),
          popupAddCard.setTextButtonSubmit(false),
          popupInvalidLink.open()
      })

  }
},
  popupSelectors.addingPlace);


const popupConfirmationDeletion2 = new PopupWithForm({ callback: () => { } }, popupSelectors.confirmationDeletion);
const popupImageFullSize = new PopupWithImage(popupSelectors.fullSizeImage);







// : кнопки секции profile
$buttonEditProfile.addEventListener('click', (evt) => {
  evt.preventDefault();
  fillInDataPopupEditProfile();

  popupEditProfile.open();

});

$buttonEditAvatar.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupEditAvatar.open();
})

$buttonAddCard.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupAddCard.open();
})


initiateProfile();
