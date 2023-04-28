import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = document.querySelector('.popup__photo');
    this._capture = document.querySelector('.popup__caption');
  }

  open(dataImage) {
    this._image.src = dataImage.link;
    this._capture.textContent = dataImage.name;
    this._image.alt = dataImage.name
    super.open()
  }
};
