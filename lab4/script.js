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
      cardsArray
        .filter((e) => {
          e.publicID = e.getCardId();
          e.publicPin = e.isCardPinned();
          return e.isCardSaved() === true;
        })
        .sort((a, b) => {
          return a.getCardId() - b.getCardId();
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
  console.log("THIS");
  const footer = document.querySelector(`#card-${id} > .card-footer`);
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  editButton.addEventListener("click", () => {
    getCardById(id)?.editCardData();
  });

  footer.replaceChild(editButton, footer.childNodes[0]);
};

const replaceEditBtnWithSaveBtn = (id) => {
  const footer = document.querySelector(`#card-${id} > .card-footer`);
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";

  saveButton.addEventListener("click", () => {
    getCardById(id)?.saveCardData();
  });

  footer.replaceChild(saveButton, footer.childNodes[0]);
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
    console.log("111");
    if (this.#isSaved) return;
    this.#isSaved = true;
    this.transformCardToSave();

    saveToLocalstorage();

    return this.#isSaved;
  };

  editCardData = () => {
    if (!this.#isSaved) return;
    this.#isSaved = !this.#isSaved;
    console.log(this.#id);
    this.transformCardToEdit();
    saveToLocalstorage();
    return this.#isSaved;
  };

  transformCardToSave = () => {
    convertCardInputsIntoParagraphs(this.#id);
    replaceSaveBtnWithEditBtn(this.#id);

    const thisCard = getCardById(this.#id);
    thisCard.color = document.querySelector(
      `#card-${this.#id}`
    ).style.backgroundColor;

    const colorpicker = document.querySelector(
      `#card-${this.#id} > .card-colorpick`
    );
    colorpicker.remove();
  };

  transformCardToEdit = () => {
    convertCardParagraphsIntoInputs(this.#id);
    replaceEditBtnWithSaveBtn(this.#id);

    const cardColorpickWrapper = document.createElement("div");
    cardColors.map((e) => {
      let tempButton = document.createElement("button");
      tempButton.style = `background-color: ${e}; padding: 15px; margin-left:5px`;
      tempButton.addEventListener("click", () => {
        colorPick(this.#id, e);
      });
      cardColorpickWrapper.appendChild(tempButton);
    });
    cardColorpickWrapper.classList.add("card-colorpick");
    const footer = document.querySelector(`#card-${this.#id} > .card-footer`);
    document
      .querySelector(`#card-${this.#id}`)
      .insertBefore(cardColorpickWrapper, footer);
  };

  removeCard = () => {
    cardsArray.splice(
      cardsArray.findIndex((e) => {
        return e.getCardId() === this.#id;
      }),
      1
    );

    const domCard = document.querySelector(`#card-${this.#id}`);
    if (!this.#isPinned) appWrapper.removeChild(domCard);
    else document.querySelector("#pinned-cards").removeChild(domCard);
    saveToLocalstorage();
  };

  pinCard = () => {
    const domCard = document.querySelector(`#card-${this.#id}`);
    const domCardFooter = document.querySelector(
      `#card-${this.#id} .card-footer`
    );

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

    appWrapper.appendChild(domCard);

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
      cardsArray.length
        ? cardsArray
            .sort((a, b) => {
              return a.getCardId() - b.getCardId();
            })
            .slice(-1)[0]
            ?.getCardId() + 1
        : 0
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
      if (e.publicPin) getCardById(e.publicID).pinCard();
    });
};

window.addEventListener("load", generateCardsFromStorage);

//refactor
