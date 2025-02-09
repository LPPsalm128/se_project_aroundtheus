// Import files
import "./index.css";
import { initialCards, config, variables } from "../utils/constants.js";
import Card from "../components/card.js";
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
document.addEventListener("DOMContentLoaded", () => {
  modalWithConfirm.setEventListeners();
});

// Section
const section = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards__list"
);

// Api
api
  .getInitialCards()
  .then((item) => {
    console.log(item);
    section.renderItems(item);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getUserInfo()
  .then((user) => {
    userInfo.setUserInfo({
      name: user.name,
      info: user.info,
    }),
      userInfo.setUserAvatar(user.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

// Functions
export function createCard(item) {
  const card = new Card(
    item,
    variables.cardSelector,
    handleImageClick,
    handleDeleteCard
  );
  return card.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

function handleProfileFormSubmit(inputValues) {
  const { profile__name, profile__info } = inputValues;
  editProfileModal.renderLoading(true);
  api
    .setUserInfo({ name: profile__name, info: profile__info })
    .then(() => {
      userInfo.setUserInfo({
        name: inputValues.profile__name,
        info: inputValues.profile__info,
      });
      editProfileModal.close();
    })
    .catch((err) => {
      console.error(`Form submission error: ${err}`);
    })
    .finally(() => editProfileModal.renderLoading(false));
}

function handleAvatarFormSubmit(avatar) {
  if (!avatar || !avatar.profile__url) {
    console.error("Invalid avatar data");
    return;
  }

  avatarPopup.renderLoading(true);

  api
    .setUserAvatar(avatar.profile__url)
    .then((users) => {
      console.log(users);
      if (!users || !users.avatar) {
        throw new Error("Invalid response data");
      }
      userInfo.setUserAvatar(users.avatar);
      avatarPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => avatarPopup.renderLoading(false));
}

function handleProfileFormCreate(inputData) {
  const { card__title, card__url } = inputData;
  addCardModal.renderLoading(true);
  api.createCard({ name: card__title, link: card__url }).then((newCard) => {
    renderCard(newCard);
    console.log(newCard);
    addCardModal.close();
    formValidators.addCard.resetValidation();
    formValidators.addCard.disableSubmitButton();
    addCardFormElement.reset();
  });
}

function handleImageClick(cardData) {
  previewImagePopup.open(cardData);
}

function handleDeleteCard(cardElement, cardID) {
  modalWithConfirm.setConfirmCallback(() => {
    return api
      .deleteCard(cardID)
      .then(() => {
        cardElement.remove();
        modalWithConfirm.close();
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      });
  });
  modalWithConfirm.open();
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

document.querySelectorAll(".card__delete").forEach((button) => {
  button.addEventListener("click", (event) => {
    const cardElement = event.target.closest(".card");
    const cardID = cardElement.dataset.id;
    handleDeleteCard(cardElement, cardID);
    console.log("Button clicked");
  });
});

document.getElementById("modal-close-button").addEventListener("click", () => {
  modalWithConfirm.close();
});

editProfileModal.setEventListeners();
addCardModal.setEventListeners();
previewImagePopup.setEventListeners();
avatarPopup.setEventListeners();
variables.avatarEditButton.addEventListener("click", () => {
  avatarPopup.open();
  formValidators.avatarValidate.resetValidation();
});

enableValidation(config);
