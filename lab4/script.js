const cardColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
  "white",
];

const cardsArray = [];

const getCardById = (id) => {
  if (!id && id !== 0) return null;

  return cardsArray.filter((e) => {
    return e.id === id;
  })[0];
};

const appWrapper = document.querySelector("#app-wrapper");

const colorPick = (id, color) => {
  const cardWrapper = document.querySelector(`#card-${id}`);
  cardWrapper.style = `background-color:${color}`;
};

const convertCardInputsIntoParagraphs = (id) => {
  const header = document.querySelector(`#card-${id} > .card-header`);
  const body = document.querySelector(`#card-${id} > .card-body`);

  const newHeaderText = document.createElement("p");
  const newBodyText = document.createElement("p");

  newHeaderText.innerHTML = header.childNodes[0].value;
  newBodyText.innerHTML = body.childNodes[0].value;

  header.innerHTML = "";
  body.innerHTML = "";

  header.appendChild(newHeaderText);
  body.appendChild(newBodyText);
};

const convertCardParagraphsIntoInputs = (id) => {
  const header = document.querySelector(`#card-${id} > .card-header`);
  const body = document.querySelector(`#card-${id} > .card-body`);

  const newHeaderInput = document.createElement("input");
  const newBodyInput = document.createElement("input");

  newHeaderInput.value = header.childNodes[0].innerHTML;
  newBodyInput.value = body.childNodes[0].innerHTML;

  header.innerHTML = "";
  body.innerHTML = "";

  header.appendChild(newHeaderInput);
  body.appendChild(newBodyInput);
};

const replaceSaveBtnWithEditBtn = (id) => {
  const footer = document.querySelector(`#card-${id} > .card-footer`);
  const editButton = document.createElement("button");
  editButton.innerHTML = "Edit";

  editButton.addEventListener("click", () => {
    getCardById(id).editCardData();
  });

  footer.replaceChild(editButton, footer.childNodes[0]);
};

const replaceEditBtnWithSaveBtn = (id) => {
  const footer = document.querySelector(`#card-${id} > .card-footer`);
  const saveButton = document.createElement("button");
  saveButton.innerHTML = "Save";

  saveButton.addEventListener("click", () => {
    getCardById(id).saveCardData();
  });

  footer.replaceChild(saveButton, footer.childNodes[0]);
};

const transformCardToSave = (id) => {
  convertCardInputsIntoParagraphs(id);
  replaceSaveBtnWithEditBtn(id);
  const colorpicker = document.querySelector(`#card-${id} > .card-colorpick`);
  colorpicker.remove();
};

const transformCardToEdit = (id) => {
  convertCardParagraphsIntoInputs(id);
  replaceEditBtnWithSaveBtn(id);

  const cardColorpickWrapper = document.createElement("div");
  cardColors.map((e) => {
    let tempButton = document.createElement("button");
    tempButton.style = `background-color: ${e}; padding: 15px; margin-left:5px`;
    tempButton.addEventListener("click", () => {
      colorPick(cardObject.id, e);
    });
    cardColorpickWrapper.appendChild(tempButton);
  });
  cardColorpickWrapper.classList.add("card-colorpick");
  document
    .querySelector(`#card-${id}`)
    .insertBefore(
      cardColorpickWrapper,
      document.querySelector(`#card-${id} > .card-footer`)
    );
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
    if (this.#isSaved) return;
    this.#isSaved = true;
    transformCardToSave(this.id);

    return this.#isSaved;
  };

  editCardData = () => {
    if (!this.#isSaved) return;
    this.#isSaved = !this.#isSaved;
    transformCardToEdit(this.id);

    return this.#isSaved;
  };

  removeCard = () => {
    console.log(
      cardsArray.findIndex((e) => {
        return e.id === this.id;
      })
    );
    appWrapper.removeChild(document.querySelector(`#card-${this.id}`));
    cardsArray.splice(
      cardsArray.findIndex((e) => {
        return e.id === this.id;
      }),
      1
    );
  };
}

const createCard = () => {
  console.log(cardsArray.slice(-1));
  const cardObject = new Card(
    cardsArray.length ? cardsArray.slice(-1)[0].id + 1 : 0
  );

  const cardWrapper = document.createElement("div");
  const cardHeaderWrapper = document.createElement("div");
  const cardBodyWrapper = document.createElement("div");
  const cardColorpickWrapper = document.createElement("div");
  const cardFooterWrapper = document.createElement("div");
  const cardHeaderInput = document.createElement("input");
  const cardBodyTextarea = document.createElement("textarea");
  const cardFooterSaveBtn = document.createElement("button");
  const cardFooterRemoveBtn = document.createElement("button");

  cardColors.map((e) => {
    let tempButton = document.createElement("button");
    tempButton.style = `background-color: ${e}; padding: 15px; margin-left:5px`;
    tempButton.addEventListener("click", () => {
      colorPick(cardObject.id, e);
    });
    cardColorpickWrapper.appendChild(tempButton);
  });

  cardWrapper.classList.add("card");
  cardWrapper.id = `card-${cardObject.id}`;
  cardHeaderWrapper.classList.add("card-header");
  cardBodyWrapper.classList.add("card-body");
  cardColorpickWrapper.classList.add("card-colorpick");
  cardFooterWrapper.classList.add("card-footer");

  cardFooterSaveBtn.innerHTML = "Save";
  cardFooterRemoveBtn.innerHTML = "Remove";

  cardFooterSaveBtn.addEventListener("click", () => {
    cardObject.saveCardData();
  });
  cardFooterRemoveBtn.addEventListener("click", () => {
    cardObject.removeCard();
  });

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
  cardWrapper.appendChild(cardColorpickWrapper);
  cardWrapper.appendChild(cardFooterWrapper);

  cardsArray.push(cardObject);
  appWrapper.appendChild(cardWrapper);

  console.log(cardsArray);

  return true;
};

const btnCreate = document.querySelector("#btn-create");
btnCreate.addEventListener("click", createCard);

//edit
//saving to localstorage
//fix removing
//pin
//color change
