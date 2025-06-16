class UserInfo {
  constructor(userName, userInfo, profileImage) {
    this._userNameEl = document.querySelector(userName);
    this._userInfoEl = document.querySelector(userInfo);
    this._profileImageEl = document.querySelector(profileImage);
    this._userId = null; // Store user ID
  }

  getUserInfo() {
    return {
      name: this._userNameEl.textContent,
      info: this._userInfoEl.textContent,
      avatar: this._profileImageEl.src,
      id: this._userId,
    };
  }

  setUserInfo({ name, info, _id }) {
    if (name) this._userNameEl.textContent = name;
    if (info) this._userInfoEl.textContent = info;
    if (_id) this._userId = _id; // Set user ID if provided
  }

  setUserAvatar(avatar) {
    this._profileImageEl.src = avatar;
  }

  setUserId(id) {
    this._userId = id;
  }

  getUserId() {
    return this._userId;
  }
}

export default UserInfo;
