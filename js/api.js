// : Токен: 639adf4e-3336-4963-8d2d-dff255a402e3
// : Идентификатор группы: plus-cohort-20


function onResponse(res) {
  return res.ok
    ? res.json()
    : Promise.reject(`Ошибка: ${res.status}`)
}

export const dataServer = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-20',
  headers: {
    authorization: '639adf4e-3336-4963-8d2d-dff255a402e3',
    'Content-Type': 'application/json'
  }
}

export function getContentServer() {
  return fetch(`${dataServer.baseUrl}/cards`, {
    headers: dataServer.headers
  })
    .then(onResponse)
}

export function getDataProfile() {
  return fetch(`${dataServer.baseUrl}/users/me`, {
    headers: dataServer.headers
  })
    .then(onResponse)
}

export function saveDataProfile(name, about) {
  return fetch(`${dataServer.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: dataServer.headers,
    body: JSON.stringify({
      name,
      about
    })
  })
    .then(onResponse)

}

export function saveAvatarProfile(avatar) {
  return fetch(`${dataServer.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: dataServer.headers,
    body: JSON.stringify({
      avatar
    })
  })
    .then(onResponse)
}

export function saveNewCardServer(name, link) {
  return fetch(`${dataServer.baseUrl}/cards`, {
    method: 'POST',
    headers: dataServer.headers,
    body: JSON.stringify({
      name,
      link
    })
  })
    .then(onResponse)
}

export function deleteCardServer(id) {
  return fetch(`${dataServer.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: dataServer.headers
  })
    .then(onResponse)
}

export function addLike(id) {
  return fetch(`${dataServer.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: dataServer.headers
  })
    .then(onResponse)
}

export function removeLike(id) {
  return fetch(`${dataServer.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: dataServer.headers
  })
    .then(onResponse)
}
