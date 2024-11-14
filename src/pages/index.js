// Import files
import "./index.css";
import { initialCards, config, variables } from "../utils/constants.js";
import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

//Variables

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
  variables.profileHeaderInput,
  variables.profileParagraphInput,
  variables.profileImage
);

const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);

function openEditProfileModal() {
  const profileHeaderText =
    document.querySelector(".profile__header").textContent;
  const profileParagraphText = document.querySelector(
    ".profile__paragraph"
  ).textContent;

  variables.profileHeaderInput.value = profileHeaderText;
  variables.profileParagraphInput.value = profileParagraphText;

  editProfileModal.open();
}

document
  .getElementById("profile-edit-button")
  .addEventListener("click", openEditProfileModal);

variables.profileEditButton.addEventListener("click", () => {
  formValidators.profileEdit.resetValidation();
  const user = userInfo.getUserInfo();
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

function handleProfileFormSubmit() {
  const name = variables.profileHeaderInput.value;
  const info = variables.profileParagraphInput.value;

  userInfo.setUserInfo(name, info);

  document.querySelector(".profile__header").textContent = name;
  document.querySelector(".profile__paragraph").textContent = info;

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
