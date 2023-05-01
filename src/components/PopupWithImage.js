import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._$image = document.querySelector('.popup__photo');
    this._$capture = document.querySelector('.popup__caption');
  }

  open(dataImage) {
    this._$image.src = dataImage.link;
    this._$capture.textContent = dataImage.name;
    this._$image.alt = dataImage.name
    super.open()
  }
};
