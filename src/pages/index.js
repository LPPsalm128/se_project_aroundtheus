// Import files
import "./index.css";
import { initialCards, config, variables } from "../utils/constants.js";
import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

const formValidators = {};

const enableValidation = (config) => {
  const profileEditForm = document.querySelector("#edit-profile-form");
  formValidators.profileEdit = new FormValidator(config, profileEditForm);
  formValidators.profileEdit.enableValidation();

  const addCardValidator = new FormValidator(
    config,
    variables.addCardFormElement
  );
  addCardValidator.enableValidation();
};

const userInfo = new UserInfo(
  ".profile__header",
  ".profile__paragraph",
  ".profile__avatar"
);

const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);

const profileEditPopupForm = editProfileModal.getForm();

function openEditProfileModal() {
  const userData = userInfo.getUserInfo();

  document.querySelector("#header-input").value = userData.name;
  document.querySelector("#paragraph-input").value = userData.info;

  editProfileModal.open();
}

variables.profileEditButton = document.getElementById("profile-edit-button");
variables.profileHeaderInput = document.getElementById("header-input");
variables.profileParagraphInput = document.getElementById("paragraph-input");

variables.profileEditButton.addEventListener("click", () => {
  console.log("Edit button clicked");
  formValidators.profileEdit.resetValidation();
  const user = userInfo.getUserInfo();
  console.log("User data:", user);
  variables.profileHeaderInput.value = user.name;
  variables.profileParagraphInput.value = user.info;
  editProfileModal.open();
});

const addCardModal = new PopupWithForm(
  "#add-card-modal",
  handleProfileFormCreate
);

const previewImagePopup = new PopupWithImage("#picture-modal");

const section = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards__list"
);
section.renderItems();

function handleProfileFormSubmit(inputValues) {
  const name = inputValues.name;
  const info = inputValues.info;

  userInfo.setUserInfo({ name, info });

  editProfileModal.close();
}

function handleProfileFormCreate(inputValues) {
  const cardElement = createCard(inputValues);
  section.addItem(cardElement);
  addCardModal.close();
}

function handleImageClick(cardData) {
  previewImagePopup.open(cardData);
}

export function createCard(item) {
  const card = new Card(item, variables.cardSelector, handleImageClick);
  return card.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  wrapper.prepend(cardElement);
}

variables.addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});

editProfileModal.setEventListeners();
addCardModal.setEventListeners();
previewImagePopup.setEventListeners();

enableValidation(config);
