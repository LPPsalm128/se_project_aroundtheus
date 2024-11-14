class UserInfo {
  constructor(profileHeaderInput, profileParagraphInput, profileImage) {
    this._userNameEl = profileHeaderInput;
    this._userInfoEl = profileParagraphInput;
    this._profileImageEl = profileImage;
  }
  getUserInfo() {
    return {
      name: this._userNameEl.value,
      info: this._userInfoEl.value,
    };
  }

  setUserInfo(name, info) {
    this._userNameEl.value = name;
    this._userInfoEl.value = info;
  }

  setImg(avatar) {
    this._profileImageEl.src = avatar;
  }
}

export default UserInfo;
