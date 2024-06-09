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

// Elements

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modalCloseButton = document.querySelector("#modal-close-button");
const profileHeader = document.querySelector(".profile__header");
const profileParagraph = document.querySelector(".profile__paragraph");
const profileHeaderInput = document.querySelector(".modal__form-header");
const profileParagraphInput = document.querySelector(".modal__form-paragraph");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardsList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector(".card-template").content.firstElementChild;

// Functions

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  return cardElement;
}

// Event Handler

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileHeader.textContent = profileHeaderInput.value;
  profileParagraph.textContent = profileParagraphInput.value;
  closePopup();
  console.log("form submitted");
}

// Event Listeners

profileEditButton.addEventListener("click", () => {
  profileHeaderInput.value = profileHeader.textContent;
  profileParagraphInput.value = profileParagraph.textContent;
  profileEditModal.classList.add("modal_opened");
});

modalCloseButton.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
});
