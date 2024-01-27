console.log("Hello world");

const appWrapper = document.querySelector("#app-wrapper");

const transformCard = (id) => {
  //   const headerValue = document.querySelector(
  //     `#card-${id} > .card-header > input`
  //   ).value;
  //   const textareaValue = document.querySelector(
  //     `#card-${id} > .card-body > textarea`
  //   ).value;
  const header = document.querySelector(`#card-${id} > .card-header`);
  //.childNodes[0].value;
  const body =
    //.childNodes[0]
    document.querySelector(`#card-${id} > .card-body`); //.value;

  const newHeaderText = document.createElement("p");
  const newBodyText = document.createElement("p");

  newHeaderText.innerHTML = body.childNodes[0].value;
  newBodyText.innerHTML = header.childNodes[0].value;

  header.innerHTML = "";
  header.appendChild(newHeaderText);
  body.innerHTML = "";
  body.appendChild(newBodyText);
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

  changeCardState = () => {
    this.#isSaved = !this.#isSaved;
    const thisCard = transformCard(this.id);

    return this.#isSaved;
  };
}

const cardsArray = [];

const saveCardData = (id) => {
  console.log("Card with id " + id + " is saved");
  cardsArray[id].changeCardState();
};

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
  cardFooterSaveBtn.addEventListener("click", () => {
    saveCardData(cardObject.id);
  });
  cardFooterRemoveBtn.innerHTML = "Remove";

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

// const lol1 = createCard();
// console.log(lol1)
