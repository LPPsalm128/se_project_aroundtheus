// Import files
import "./index.css";
import { initialCards, config, variables } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

variables.profileEditButton = document.getElementById("profile-edit-button");
variables.profileHeaderInput = document.getElementById("header-input");
variables.profileParagraphInput = document.getElementById("paragraph-input");

// Api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c9e8eceb-7c53-4143-a948-54d7c6df66e6",
    "Content-Type": "application/json",
  },
});

// FormValidators
const formValidators = {};
const enableValidation = (config) => {
  const profileEditPopupForm = editProfileModal.getForm();
  formValidators.profileEdit = new FormValidator(config, profileEditPopupForm);
  formValidators.profileEdit.enableValidation();

  formValidators.addCard = new FormValidator(
    config,
    variables.addCardFormElement
  );
  formValidators.addCard.enableValidation();
  formValidators.avatarValidate = new FormValidator(
    config,
    variables.avatarEditForm
  );
  formValidators.avatarValidate.enableValidation();
};

// UserInfo
const userInfo = new UserInfo(
  ".profile__header",
  ".profile__paragraph",
  ".profile__avatar"
);

// PopupWithFrom
const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);

const addCardModal = new PopupWithForm(
  "#add-card-modal",
  handleProfileFormCreate
);

const avatarPopup = new PopupWithForm(
  "#avatar-picture-modal",
  handleAvatarFormSubmit
);

// PopupWithImage
const previewImagePopup = new PopupWithImage("#picture-modal");

// PopupWithConfirmation
const modalWithConfirm = new PopupWithConfirmation("#delete-card-modal");

// Section
let section;

api
  .getInitialCards()
  .then((cards) => {
    section = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const cardElement = createCard(cardData);
          renderCard(cardData);
          section.addItem(cardElement);
        },
      },
      ".cards__list"
    );
    console.log(cards);
    section.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });

// API

api
  .getUserInfo()
  .then((user) => {
    userInfo.setUserInfo({
      name: user.name,
      info: user.info,
      _id: user._id, // Pass the user ID here
    });
    userInfo.setUserAvatar(user.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

// Functions
function renderCard(cardElement) {
  variables.cardsWrap.append(cardElement);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    variables.cardSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteCard
  );
  return card.getView();
}

function handleProfileFormSubmit(inputValues) {
  const { name, info } = inputValues;
  editProfileModal.renderLoading(true);
  api
    .setUserInfo({ name, info })
    .then(() => {
      userInfo.setUserInfo({
        name: inputValues.name,
        info: inputValues.info,
      });
      editProfileModal.close();
    })
    .catch((err) => {
      console.error(`Form submission error: ${err}`);
    })
    .finally(() => editProfileModal.renderLoading(false));
}

function handleAvatarFormSubmit(avatar) {
  avatarPopup.renderLoading(true);
  api
    .setUserAvatar(avatar)
    .then((info) => {
      console.log(info);
      userInfo.setUserAvatar(info.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.error("Error updating avatar:", err);
    })
    .finally(() => avatarPopup.renderLoading(false));
}

function handleProfileFormCreate(inputData) {
  const { name, link } = inputData;
  console.log(inputData);
  addCardModal.renderLoading(true);
  api
    .createCard({ name, link })
    .then((newCard) => {
      renderCard(newCard);
      console.log(newCard);
      createCard(newCard);
      variables.addCardFormElement.reset();
      addCardModal.close();
      formValidators.addCard.resetValidation();
      formValidators.addCard.disableSubmitButton();
    })
    .catch((err) => {
      console.error("Error loading new card:", err);
    });
}

function handleImageClick(cardData) {
  previewImagePopup.open(cardData);
}

function handleDeleteCard(card) {
  modalWithConfirm.open();
  modalWithConfirm.setConfirmCallback(() => {
    modalWithConfirm.renderLoading(true);
    api
      .deleteCard(card.getId()) // <-- Pass only the card ID here
      .then(() => {
        modalWithConfirm.close();
        card.getView().remove(); // Optionally remove the card from the DOM
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      })
      .finally(() => {
        modalWithConfirm.renderLoading(false);
      });
  });
}

function handleLikeClick(card) {
  const isLiked = card.isLiked(userInfo.getUserId()); // You need to implement getUserId() in UserInfo
  const cardId = card.getId();

  api
    .likeCard(cardId, isLiked)
    .then((newCardData) => {
      card.updateLikes(newCardData.likes);
    })
    .catch((err) => {
      console.log("Failed to update card likes status:", err);
    });
}

// EventListeners
variables.profileEditButton.addEventListener("click", () => {
  console.log("Edit button clicked");
  formValidators.profileEdit.resetValidation();
  const user = userInfo.getUserInfo();
  console.log("User data:", user);
  variables.profileHeaderInput.value = user.name;
  variables.profileParagraphInput.value = user.info;
  editProfileModal.open();
});

variables.addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});

const deleteButton = document.querySelector(".modal_button-delete");
if (deleteButton) {
  deleteButton.addEventListener("click", () => {
    modalWithConfirm.close();
    cardElement.remove();
    cardElement = null;
  });
}

editProfileModal.setEventListeners();
addCardModal.setEventListeners();
previewImagePopup.setEventListeners();
avatarPopup.setEventListeners();
modalWithConfirm.setEventListeners();
variables.avatarEditButton.addEventListener("click", () => {
  avatarPopup.open();
  formValidators.avatarValidate.resetValidation();
});

enableValidation(config);
