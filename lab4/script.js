const cardsArray = [];

const appWrapper = document.querySelector("#app-wrapper");

const convertCardInputsIntoParagraphs = (id) => {
  const header = document.querySelector(`#card-${id} > .card-header`);
  const body = document.querySelector(`#card-${id} > .card-body`);

  const newHeaderText = document.createElement("p");
  const newBodyText = document.createElement("p");

  newHeaderText.innerHTML = body.childNodes[0].value;
  newBodyText.innerHTML = header.childNodes[0].value;

  header.innerHTML = "";
  body.innerHTML = "";

  header.appendChild(newHeaderText);
  body.appendChild(newBodyText);
};

const replaceSaveBtnWithEditBtn = (id) => {
  const footer = document.querySelector(`#card-${id} > .card-footer`);
  const editButton = document.createElement("button");
  editButton.innerHTML = "Edit";
  footer.replaceChild(editButton, footer.childNodes[0]);
};

const transformCard = (id) => {
  convertCardInputsIntoParagraphs(id);
  replaceSaveBtnWithEditBtn(id);
};

class Card {
  #isSaved = false;

  constructor(id) {
    this.id = id;
    this.header;
    this.body;
  }

  getCardState = () => {
    return this.#isSaved;
  };

  saveCardData = () => {
    this.#isSaved = !this.#isSaved;
    transformCard(this.id);

    return this.#isSaved;
  };

  removeCard = () => {
    appWrapper.removeChild(document.querySelector(`#card-${this.id}`));
    cardsArray.splice(this.id, 1);
  };
}

const createCard = () => {
  const cardObject = new Card(cardsArray.length);

  const cardWrapper = document.createElement("div");
  const cardHeaderWrapper = document.createElement("div");
  const cardBodyWrapper = document.createElement("div");
  const cardFooterWrapper = document.createElement("div");
  const cardHeaderInput = document.createElement("input");
  const cardBodyTextarea = document.createElement("textarea");
  const cardFooterSaveBtn = document.createElement("button");
  const cardFooterRemoveBtn = document.createElement("button");

  cardWrapper.classList.add("card");
  cardWrapper.id = `card-${cardObject.id}`;
  cardHeaderWrapper.classList.add("card-header");
  cardBodyWrapper.classList.add("card-body");
  cardFooterWrapper.classList.add("card-footer");

  cardFooterSaveBtn.innerHTML = "Save";
  cardFooterRemoveBtn.innerHTML = "Remove";

  cardFooterSaveBtn.addEventListener("click", () => {
    cardObject.saveCardData();
  });
  cardFooterRemoveBtn.addEventListener("click", () => {
    cardObject.removeCard();
  });

  cardHeaderInput.required = true;
  cardBodyTextarea.required = true;

  cardHeaderWrapper.appendChild(cardHeaderInput);
  cardBodyWrapper.appendChild(cardBodyTextarea);
  cardFooterWrapper.appendChild(cardFooterSaveBtn);
  cardFooterWrapper.appendChild(cardFooterRemoveBtn);

  cardWrapper.appendChild(
    cardHeaderWrapper,
    cardBodyWrapper,
    cardFooterWrapper
  );
  cardWrapper.appendChild(cardBodyWrapper);
  cardWrapper.appendChild(cardFooterWrapper);

  cardsArray.push(cardObject);
  appWrapper.appendChild(cardWrapper);

  console.log(cardsArray);

  return true;
};

const btnCreate = document.querySelector("#btn-create");
btnCreate.addEventListener("click", createCard);
