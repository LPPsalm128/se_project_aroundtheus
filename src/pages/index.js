// Import files
import "./index.css";
import { initialCards, config } from "../utils/constants.js";
import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

//Variables
const cardSelector = "#card-template";
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const addCardFormElement = document.querySelector("#add-card-modal");
const profileEditForm = profileEditModal.querySelector("#edit-profile-form");
const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();
const addCardValidator = new FormValidator(config, addCardFormElement);
addCardValidator.enableValidation();
const profileHeader = document.querySelector(".profile__header");
const profileParagraph = document.querySelector(".profile__paragraph");
const profileImage = ".profile__avatar";
const profileImageEl = document.querySelector(profileImage);
const profileHeaderInput = document.querySelector("#header-input");
const profileParagraphInput = document.querySelector("#paragraph-input");
const cardsWrap = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const pictureModal = document.querySelector("#picture-modal");
const modalImage = pictureModal.querySelector("#modal-image");
const modalImageCaption = pictureModal.querySelector("#modal-caption");
const imageModalCloseButton = pictureModal.querySelector("#modal-close-button");
const addCardModalCloseButton = addCardModal.querySelector(
  "#modal-close-button"
);
const cardTitleInput = addCardFormElement.querySelector("#title-input");
const cardLinkInput = addCardFormElement.querySelector("#link-input");
const modals = document.querySelectorAll(".modal");
const userInfo = new UserInfo(
  {
    userName: ".profile__header",
    userJob: ".profile__paragraph",
  },
  profileImageEl
);

const cardsList = new Section(
  {
    data: messageList,
    renderCard(cardData, wrapper) {
      const cardElement = createCard(cardData);
      cardsList.addItem(cardElement, wrapper);
    },

    const cardsList = new Section({
      data: initialCards,
      renderer: renderCard,
    })
  },
  ".cards__list"
);

cardsList.renderItems();

// Functions

function closePopupEsc(e) {
  if (e.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closePopup(modalOpened);
  }
}

function closePopupOverlay(e) {
  if (e.target === e.currentTarget) {
    closePopup(e.currentTarget);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closePopupEsc);
  modal.addEventListener("mousedown", closePopupOverlay);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closePopupEsc);
  modal.removeEventListener("mousedown", closePopupOverlay);
}

function createCard(item) {
  const card = new Card(item, cardSelector, handleImageClick);
  return card.getView();
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileHeader.textContent = profileHeaderInput.value;
  profileParagraph.textContent = profileParagraphInput.value;
  closePopup(profileEditModal);
  editFormValidator.resetValidation();
  editFormValidator.disableSubmitButton();
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardsWrap);
  e.target.reset();
  closePopup(addCardModal);
  addCardValidator.disableSubmitButton();
}

function handleImageClick(cardData) {
  modalImage.alt = cardData.name;
  modalImage.src = cardData.link;
  modalImageCaption.textContent = cardData.name;
  openModal(pictureModal);
}

// Event Listeners

imageModalCloseButton.addEventListener("click", () => closePopup(pictureModal));

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

profileEditButton.addEventListener("click", () => {
  editFormValidator.resetValidation();
  profileHeaderInput.value = profileHeader.textContent;
  profileParagraphInput.value = profileParagraph.textContent;
  openModal(profileEditModal);
});
profileModalCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//Initial render
initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
