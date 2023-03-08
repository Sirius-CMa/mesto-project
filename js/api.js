// : Токен: 639adf4e-3336-4963-8d2d-dff255a402e3
// : Идентификатор группы: plus-cohort-20

import { initialCard } from "./cards"
import { createProfile } from "./profile.js"

const dataServer = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
  headers: {
    authorization: '639adf4e-3336-4963-8d2d-dff255a402e3',
    'Content-Type': 'application/json'
  }
}

// 'Content-Type': 'application/json'

export const initialContent = () =>
  new Promise(function (resolve, reject) {
    fetch(`${dataServer.baseUrl}/cards`, {
      headers: dataServer.headers
    })
      .then(res =>
        res.ok
          ? res.json()
          : Promise.reject(`Ошибка: ${res.status}`))
      .then(res => { console.log(res, res.length), initialCard(res) })
      .catch(err => console.log(err))

  })


export const initUserProfile = () =>
  new Promise(function (resolve, reject) {
    fetch(`${dataServer.baseUrl}/users/me`, {
      headers: dataServer.headers
    })
      .then(res =>
        res.ok
          ? res.json()
          : Promise.reject(`Ошибка: ${res.status}`))
      .then(res => createProfile(res.name, res.about))
      .catch(err => console.log(err))

  })

export const saveProfile = (name, profession) => {
  fetch(`${dataServer.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: dataServer.headers,
    body: JSON.stringify({
      name: name,
      about: profession
    })
  });
}


export const saveCard = (nameCard, linkCard) => {
  fetch(`${dataServer.baseUrl}/cards`, {
    method: 'POST',
    headers: dataServer.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard
    })
  });
}


initUserProfile()
  .then(initialContent())
