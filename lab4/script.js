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
  localStorage.setItem("cardsArray", JSON.stringify(cardsArray.filter((e)=>{return e.isCardSaved()===true})));
  console.log("TUTAJ")
  console.log(JSON.stringify(cardsArray.filter((e)=>{return e.isCardSaved()===true})))
  console.log(localStorage.getItem("cardsArray"))
}

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
  const newBodyInput = document.createElement("input");

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
  console.log(document.querySelector(`#card-${id}`).style.backgroundColor)


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

    return this.#isSaved;
  };

  removeCard = () => {
    cardsArray.splice(cardsArray.findIndex((e) => {
      return e.getCardId() === this.#id;
    }), 1)

    const domCard = document.querySelector(`#card-${this.#id}`);
    appWrapper.removeChild(domCard);
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
    appWrapper.insertBefore(domCard, appWrapper.childNodes[0]);

    cardsArray.splice(
      cardsArray.findIndex((e) => {
        return e.getCardId() === this.#id;
      }),
      1
    );

    cardsArray.unshift(this);
    this.#isPinned = true;
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
    appWrapper.removeChild(domCard);
    appWrapper.insertBefore(domCard, appWrapper.childNodes[0]);

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
  };
}

const createCard = () => {

  const cardObject = new Card(
    cardsArray.length ? cardsArray.slice(-1)[0]?.getCardId() + 1 : 0
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
  const cardPinBtn = document.createElement("button");

  cardColors.map((e) => {
    let tempButton = document.createElement("button");
    tempButton.style = `background-color: ${e}; padding: 15px; margin-left:5px`;
    tempButton.addEventListener("click", () => {
      colorPick(cardObject.getCardId(), e);
    });
    cardColorpickWrapper.appendChild(tempButton);
  });

  cardWrapper.classList.add("card");
  cardWrapper.id = `card-${cardObject.getCardId()}`;
  cardHeaderWrapper.classList.add("card-header");
  cardBodyWrapper.classList.add("card-body");
  cardColorpickWrapper.classList.add("card-colorpick");
  cardFooterWrapper.classList.add("card-footer");
  cardPinBtn.classList.add("card-btn-pin");

  cardFooterSaveBtn.textContent = "Save";
  cardFooterRemoveBtn.textContent = "Remove";
  cardPinBtn.textContent = "Pin";

  cardFooterSaveBtn.addEventListener("click", () => {
    cardObject.saveCardData();
  });
  cardFooterRemoveBtn.addEventListener("click", () => {
    cardObject.removeCard();
  });
  cardPinBtn.addEventListener("click", () => {
    cardObject.pinCard();
  });

  cardHeaderWrapper.appendChild(cardHeaderInput);
  cardBodyWrapper.appendChild(cardBodyTextarea);
  cardFooterWrapper.appendChild(cardFooterSaveBtn);
  cardFooterWrapper.appendChild(cardFooterRemoveBtn);
  cardFooterWrapper.appendChild(cardPinBtn);

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

  cardsArray;

  return true;
};

const btnCreate = document.querySelector("#btn-create");
btnCreate.addEventListener("click", createCard);
