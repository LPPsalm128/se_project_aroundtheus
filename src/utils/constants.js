const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const variables = {
  popupSelector: document.querySelector("#add-card-modal"),
  cardSelector: "#card-template",
  profileEditButton: document.getElementById("profile-edit-button"),
  profileModalCloseButton: document.querySelector("#modal-close-button"),
  addCardFormElement: document.querySelector("#add-card-modal"),
  profileHeader: document.querySelector(".profile__header"),
  profileParagraph: document.querySelector(".profile__paragraph"),
  cardsWrap: document.querySelector(".cards__list"),
  cardTemplate:
    document.querySelector("#card-template").content.firstElementChild,
  addNewCardButton: document.querySelector(".profile__add-button"),
  pictureModal: document.querySelector("#picture-modal"),
  modalImage: document.querySelector("#modal-image"),
  modalImageCaption: document.querySelector("#modal-caption"),
  imageModalCloseButton: document.querySelector("#modal-close-button"),
  addCardModalCloseButton: document.querySelector("#modal-close-button"),
  cardTitleInput: document.querySelector("#title-input"),
  cardLinkInput: document.querySelector("#link-input"),
  modals: document.querySelectorAll(".modal"),
  profileHeaderInput: document.querySelector("#header-input"),
  profileParagraphInput: document.querySelector("#paragraph-input"),
  //profileImage: document.querySelector(".profile__avatar"),
  avatarEditButton: document.querySelector(".profile__edit-icon"),
};

export { initialCards, config, variables };
