export default class UserInfo {
  constructor($name, $about, $avatar) {
    this._$name = $name;
    this._$about = $about;
    this._$avatar = $avatar;

  }

  getUserInfo() {
    return { name: this._$name.textContent, about: this._$about.textContent }
  }

  setUserInfo(user) {
    this._$name.textContent = user.name;
    this._$about.textContent = user.about;
    this._$avatar.alt = user.name;
    this._$avatar.src = user.avatar;
  }
}
