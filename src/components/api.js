// : Токен: 3BmSRqjRZYsE2r3pW6NrQ
// : Идентификатор группы: plus-cohort-22


export default class Api {
  constructor(dataServer) {
    this._baseUrl = dataServer.baseUrl;
    this._headers = dataServer.headers
  }
  _onResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status}`)
  }

  getContentServer() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._onResponse)
  }

  getDataProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._onResponse)
  }

  saveDataProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._onResponse)
  }

  saveAvatarProfile(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._onResponse)
  }

  saveNewCardServer(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._onResponse)
  }

  deleteCardServer(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._onResponse)
  }

  addLikeServer(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._onResponse)
  }

  removeLikeServer(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._onResponse)
  }
};


















