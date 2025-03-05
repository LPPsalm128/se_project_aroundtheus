class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    // console.log(res);
    //console.log(res.json());
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  }

  _handleError(err) {
    console.error("API Error:", err);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  createCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  likeCard(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  setUserInfo({ name, info }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: info,
      }),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  setUserAvatar(avatar) {
    console.log(avatar);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }
}

export default Api;
