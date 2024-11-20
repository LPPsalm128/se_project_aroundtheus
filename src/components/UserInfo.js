class UserInfo {
  constructor(userName, userInfo, profileImage) {
    this._userNameEl = document.querySelector(userName);
    this._userInfoEl = document.querySelector(userInfo);
    this._profileImageEl = document.querySelector(profileImage);
  }

  getUserInfo() {
    return {
      name: this._userNameEl.textContent,
      info: this._userInfoEl.textContent,
    };
  }

  setUserInfo({ name, info }) {
    if (name) this._userNameEl.textContent = name;
    if (info) this._userInfoEl.textContent = info;
  }

  setImg(avatar) {
    if (avatar) this._profileImageEl.src = avatar;
  }
}

export default UserInfo;
