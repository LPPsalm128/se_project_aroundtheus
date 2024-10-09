class UserInfo {
  constructor({ userName, userJob, userImg }, userImgEl) {
    this.userName = document.querySelector(userName);
    this.userJob = document.querySelector(userJob);
    this.userImg = userImg;
    this._userImgEl = userImgEl;
  }
  getUserInfo() {
    this._userInfo = {
      userName: this.userName.textContent,
      userJob: this.userJob.textContent,
      userImg: this.userImg,
    };
    return this._userInfo;
  }

  setUserInfo({ userName, userJob, userImg }) {
    this.userName.textContent = userName;
    this.userJob.textContent = userJob;
    this._userImgEl.src = userImg;
  }
}

export default UserInfo;
