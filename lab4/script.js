const appWrapper = document.querySelector("#app-wrapper");

const cardColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "aqua",
  "violet",
  "silver",
  "white",
];

const cardsArray = [];

const getCardById = (id) => {
  if (!id && id !== 0) return null;
  cardsArray;
  return cardsArray.filter((e) => {
    return e.getCardId() === id;
  })[0];
};

const saveToLocalstorage = () => {
  localStorage.setItem(
    "cardsArray",
    JSON.stringify(
      cardsArray.filter((e) => {
        e.publicID = e.getCardId();
        e.publicPin = e.isCardPinned();
        return e.isCardSaved() === true;
      })
    )
  );
};

const colorPick = (id, color) => {
  const cardWrapper = document.querySelector(`#card-${id}`);
  cardWrapper.style = `background-color:${color}`;
};

const convertCardInputsIntoParagraphs = (id) => {
  const header = document.querySelector(`#card-${id} > .card-header`);
  const body = document.querySelector(`#card-${id} > .card-body`);

  const newHeaderText = document.createElement("p");
  const newBodyText = document.createElement("p");

  newHeaderText.textContent = header.childNodes[0].value;
  newBodyText.textContent = body.childNodes[0].value;

  const thisCard = getCardById(id);
  thisCard.header = header.childNodes[0].value;
  thisCard.body = body.childNodes[0].value;

  header.textContent = "";
  body.textContent = "";

  header.appendChild(newHeaderText);
  body.appendChild(newBodyText);
};

const convertCardParagraphsIntoInputs = (id) => {
  const header = document.querySelector(`#card-${id} > .card-header`);
  const body = document.querySelector(`#card-${id} > .card-body`);

  const newHeaderInput = document.createElement("input");
  const newBodyInput = document.createElement("textarea");

  newHeaderInput.value = header.childNodes[0].textContent;
  newBodyInput.value = body.childNodes[0].textContent;

  header.textContent = "";
  body.textContent = "";

  header.appendChild(newHeaderInput);
  body.appendChild(newBodyInput);
};

const replaceSaveBtnWithEditBtn = (id) => {
  const footer = document.querySelector(`#card-${id} > .card-footer`);
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  editButton.addEventListener("click", () => {
    getCardById(id).editCardData();
  });

  footer.replaceChild(editButton, footer.childNodes[0]);
};

const replaceEditBtnWithSaveBtn = (id) => {
  const footer = document.querySelector(`#card-${id} > .card-footer`);
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";

  saveButton.addEventListener("click", () => {
    getCardById(id).saveCardData();
  });

  footer.replaceChild(saveButton, footer.childNodes[0]);
};

const transformCardToSave = (id) => {
  convertCardInputsIntoParagraphs(id);
  replaceSaveBtnWithEditBtn(id);

  const thisCard = getCardById(id);
  thisCard.color = document.querySelector(`#card-${id}`).style.backgroundColor;
  console.log(document.querySelector(`#card-${id}`).style.backgroundColor);

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
      colorPick(id, e);
    });
    cardColorpickWrapper.appendChild(tempButton);
  });
  cardColorpickWrapper.classList.add("card-colorpick");
  const footer = document.querySelector(`#card-${id} > .card-footer`);
  document
    .querySelector(`#card-${id}`)
    .insertBefore(cardColorpickWrapper, footer);
};

class Card {
  #isSaved = false;
  #isPinned = false;
  #id = null;

  constructor(id) {
    this.#id = id;
    this.header;
    this.body;
    this.color;
    this.publicID;
    this.publicPin;
    this.dateOfCreation;
  }

  isCardSaved = () => {
    return this.#isSaved;
  };

  getCardId = () => {
    this.#id;
    return this.#id;
  };

  isCardPinned = () => {
    return this.#isPinned;
  };

  saveCardData = () => {
    if (this.#isSaved) return;
    this.#isSaved = true;
    transformCardToSave(this.#id);

    saveToLocalstorage();

    return this.#isSaved;
  };

  editCardData = () => {
    if (!this.#isSaved) return;
    this.#isSaved = !this.#isSaved;
    transformCardToEdit(this.#id);
    saveToLocalstorage();
    return this.#isSaved;
  };

  removeCard = () => {
    cardsArray.splice(
      cardsArray.findIndex((e) => {
        return e.getCardId() === this.#id;
      }),
      1
    );

    const domCard = document.querySelector(`#card-${this.#id}`);
    appWrapper.removeChild(domCard);
    saveToLocalstorage();
  };

  pinCard = () => {
    const domCard = document.querySelector(`#card-${this.#id}`);
    const domCardFooter = document.querySelector(
      `#card-${this.#id} .card-footer`
    );

    cardsArray.findIndex((e) => {
      e;
      return e.getCardId() === this.#id;
    });
    const unpinButton = document.createElement("button");
    unpinButton.textContent = "Unpin";
    unpinButton.addEventListener("click", this.unpinCard);
    unpinButton.classList.add("card-btn-unpin");
    domCardFooter.replaceChild(
      unpinButton,
      document.querySelector(`#card-${this.#id} .card-btn-pin`)
    );
    appWrapper.removeChild(domCard);
    document.querySelector("#pinned-cards").appendChild(domCard);

    cardsArray.splice(
      cardsArray.findIndex((e) => {
        return e.getCardId() === this.#id;
      }),
      1
    );

    cardsArray.unshift(this);
    this.#isPinned = true;
    saveToLocalstorage();
  };

  unpinCard = () => {
    const domCard = document.querySelector(`#card-${this.#id}`);
    const domCardFooter = document.querySelector(
      `#card-${this.#id} .card-footer`
    );

    const pinButton = document.createElement("button");
    pinButton.textContent = "Pin";
    pinButton.addEventListener("click", this.pinCard);
    pinButton.classList.add("card-btn-pin");

    domCardFooter.replaceChild(
      pinButton,
      document.querySelector(`#card-${this.#id} .card-btn-unpin`)
    );
    document.querySelector("#pinned-cards").removeChild(domCard);
    appWrapper.appendChild(domCard);

    cardsArray;
    this.#id = cardsArray.slice(-1)[0].getCardId() + 1;
    cardsArray.splice(
      cardsArray.findIndex((e) => {
        return e.id === this.#id;
      }),
      1
    );
    cardsArray.push(this);
    this.#isPinned = false;
    domCard.id = `card-${this.#id}`;
    saveToLocalstorage();
  };
}

const createCardHeader = (headerText = "") => {
  const cardHeaderWrapper = document.createElement("div");
  cardHeaderWrapper.classList.add("card-header");

  const cardHeaderInput = document.createElement("input");
  if (headerText) cardHeaderInput.value = headerText;

  cardHeaderWrapper.appendChild(cardHeaderInput);

  return cardHeaderWrapper;
};

const createCardBody = (bodyText = "") => {
  const cardBodyWrapper = document.createElement("div");
  cardBodyWrapper.classList.add("card-body");

  const cardBodyTextarea = document.createElement("textarea");
  if (bodyText) cardBodyTextarea.value = bodyText;

  cardBodyWrapper.appendChild(cardBodyTextarea);

  return cardBodyWrapper;
};

const createCardFooter = (cardObject) => {
  const cardFooterWrapper = document.createElement("div");
  cardFooterWrapper.classList.add("card-footer");

  const cardFooterSaveBtn = document.createElement("button");
  cardFooterSaveBtn.textContent = "Save";
  cardFooterSaveBtn.addEventListener("click", () => {
    cardObject.saveCardData();
  });

  const cardFooterRemoveBtn = document.createElement("button");
  cardFooterRemoveBtn.textContent = "Remove";
  cardFooterRemoveBtn.addEventListener("click", () => {
    cardObject.removeCard();
  });

  const cardFooterPinBtn = document.createElement("button");
  cardFooterPinBtn.textContent = "Pin";
  cardFooterPinBtn.className = "card-btn-pin";
  cardFooterPinBtn.addEventListener("click", () => {
    cardObject.pinCard();
  });

  cardFooterWrapper.appendChild(cardFooterSaveBtn);
  cardFooterWrapper.appendChild(cardFooterRemoveBtn);
  cardFooterWrapper.appendChild(cardFooterPinBtn);

  return cardFooterWrapper;
};

const createCardColorpick = (cardObject) => {
  const cardColorpickWrapper = document.createElement("div");
  cardColorpickWrapper.classList.add("card-colorpick");

  cardColors.map((e) => {
    let tempButton = document.createElement("button");
    tempButton.style = `background-color: ${e}; padding: 15px; margin-left:5px`;
    tempButton.addEventListener("click", () => {
      colorPick(cardObject.getCardId(), e);
    });
    cardColorpickWrapper.appendChild(tempButton);
  });

  return cardColorpickWrapper;
};

const createCardDate = (cardObject) => {
  console.log(cardObject.dateOfCreation);
  console.log(typeof cardObject.dateOfCreation);
  if (!cardObject.dateOfCreation) cardObject.dateOfCreation = new Date();

  const cardDatetimeWrapper = document.createElement("div");
  cardDatetimeWrapper.innerHTML = `Created: ${cardObject.dateOfCreation.toLocaleDateString(
    "en-GB"
  )} ${cardObject.dateOfCreation.toLocaleTimeString("en-GB")}`;

  return cardDatetimeWrapper;
};

const createCard = (localStorageCardObject, isGenerating = false) => {
  let cardObject;
  if (!isGenerating) {
    cardObject = new Card(
      cardsArray.length ? cardsArray.slice(-1)[0]?.getCardId() + 1 : 0
    );
  } else {
    cardObject = new Card(localStorageCardObject.publicID);
  }

  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card");
  cardWrapper.id = `card-${cardObject.getCardId()}`;

  if (isGenerating) {
    cardWrapper.style.backgroundColor = localStorageCardObject.color;
    cardObject.dateOfCreation = new Date(localStorageCardObject.dateOfCreation);
  }

  const cardHeaderWrapper = isGenerating
    ? createCardHeader(localStorageCardObject.header)
    : createCardHeader();
  const cardBodyWrapper = isGenerating
    ? createCardBody(localStorageCardObject.body)
    : createCardBody();

  const cardColorpickWrapper = createCardColorpick(cardObject);
  const cardFooterWrapper = createCardFooter(cardObject);
  const cardDatetimeWrapper = createCardDate(cardObject);

  cardWrapper.appendChild(cardHeaderWrapper);
  cardWrapper.appendChild(cardBodyWrapper);
  cardWrapper.appendChild(cardColorpickWrapper);
  cardWrapper.appendChild(cardFooterWrapper);
  cardWrapper.appendChild(cardDatetimeWrapper);

  cardsArray.push(cardObject);
  appWrapper.appendChild(cardWrapper);

  cardsArray;

  console.log(cardsArray);

  return true;
};

const btnCreate = document.querySelector("#btn-create");
btnCreate.addEventListener("click", createCard);

const generateCardsFromStorage = () => {
  const fromStorage = JSON.parse(localStorage.getItem("cardsArray"));
  console.log(fromStorage);
  if (fromStorage.length)
    fromStorage.map((e) => {
      createCard(e, true);
      getCardById(e.publicID).saveCardData();
    });
};

window.addEventListener("load", generateCardsFromStorage);

//zapis pinned notatek
//debugowanie
//poprawny zapis edited notatek
