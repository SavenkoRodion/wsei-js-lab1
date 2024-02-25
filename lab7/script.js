const appWrapper = document.querySelector("#app-wrapper");
const citySearch = document.querySelector("#city-search");

citySearch.addEventListener("input", () => {
  citySearch.setCustomValidity("");
});

const getWeatherIcon = (iconName) => {
  const icon = document.createElement("img");
  icon.src = `http://openweathermap.org/img/w/${iconName}.png`;
  return icon;
};

const cardsArray = [];

const getDomCardById = (id) => {
  return document.querySelector(`#card-${id}`);
};

const getCardById = (id) => {
  if (!id && id !== 0) return null;
  cardsArray;
  return cardsArray.filter((e) => {
    return e.getCardId() === id;
  })[0];
};

const saveToLocalstorage = () => {
  localStorage.setItem(
    "weatherCardsArray",
    JSON.stringify(
      cardsArray
        .map((e) => {
          e.publicID = e.getCardId();
          e.publicPin = e.isCardPinned();
          return e;
        })
        .sort((a, b) => {
          return a.getCardId() - b.getCardId();
        })
    )
  );
  console.log(localStorage.getItem("weatherCardsArray"));
};

class Card {
  #isSaved = false;
  #isPinned = false;
  #id = null;

  constructor(id) {
    this.#id = id;
    this.city;
    this.remperature;
    this.humidity;
    this.weatherIcon;
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
    const pinBtn = document.querySelector(
      `#card-${this.#id} > .card-footer > .card-btn-pin`
    );

    if (!pinBtn) return;
    const btnClone = pinBtn.cloneNode(true);
    btnClone.textContent = "Unpin";
    btnClone.addEventListener("click", () => {
      this.unpinCard();
    });
    btnClone.className = "card-btn-unpin";

    domCard.querySelector(".card-footer").replaceChild(btnClone, pinBtn);
    document.querySelector("#pinned-cards").appendChild(domCard);

    this.#isPinned = true;
    saveToLocalstorage();
  };

  unpinCard = () => {
    const domCard = document.querySelector(`#card-${this.#id}`);
    const unpinBtn = document.querySelector(
      `#card-${this.#id} > .card-footer > .card-btn-unpin`
    );

    if (!unpinBtn) return;
    const btnClone = unpinBtn.cloneNode(true);
    btnClone.textContent = "Pin";
    btnClone.removeEventListener("click", () => {
      this.unpinCard();
    });
    btnClone.addEventListener("click", () => {
      this.pinCard();
    });
    btnClone.className = "card-btn-pin";

    domCard.querySelector(".card-footer").replaceChild(btnClone, unpinBtn);
    appWrapper.appendChild(domCard);

    this.#isPinned = false;
    domCard.id = `card-${this.#id}`;
    saveToLocalstorage();
  };
}

const createCardHeader = (headerText) => {
  const cardHeaderWrapper = document.createElement("div");
  cardHeaderWrapper.classList.add("card-header");

  const cardHeader = document.createElement("h4");
  if (headerText) cardHeader.textContent = headerText;

  cardHeaderWrapper.appendChild(cardHeader);

  return cardHeaderWrapper;
};

const createCardBody = (temp, humidity, iconName) => {
  const cardBodyWrapper = document.createElement("div");
  cardBodyWrapper.classList.add("card-body");

  const tempParagraph = document.createElement("p");
  const humidityParagraph = document.createElement("p");
  const weatherParagraph = document.createElement("p");

  tempParagraph.textContent = `Temperature: ${temp}`;
  humidityParagraph.textContent = `Humidity: ${humidity}`;
  weatherParagraph.innerHTML = `Weather: `;
  weatherParagraph.appendChild(getWeatherIcon(iconName));

  cardBodyWrapper.appendChild(tempParagraph);
  cardBodyWrapper.appendChild(humidityParagraph);
  cardBodyWrapper.appendChild(weatherParagraph);

  return cardBodyWrapper;
};

const createCardFooter = (cardObject) => {
  const cardFooterWrapper = document.createElement("div");
  cardFooterWrapper.classList.add("card-footer");

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

  cardFooterWrapper.appendChild(cardFooterRemoveBtn);
  cardFooterWrapper.appendChild(cardFooterPinBtn);

  return cardFooterWrapper;
};

const createCardDate = (cardObject) => {
  if (!cardObject.dateOfCreation) cardObject.dateOfCreation = new Date();

  const cardDatetimeWrapper = document.createElement("div");
  cardDatetimeWrapper.innerHTML = `Created: ${cardObject.dateOfCreation.toLocaleDateString(
    "en-GB"
  )} ${cardObject.dateOfCreation.toLocaleTimeString("en-GB")}`;

  return cardDatetimeWrapper;
};

const createCard = (cardDataObject, isGenerating = false) => {
  let cardObject;
  if (!isGenerating) {
    if (cardsArray?.length === 10) {
      citySearch.setCustomValidity("Max 10 cities allowed");
      citySearch.reportValidity();
      return;
    }
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
    cardObject = new Card(cardDataObject.publicID);
  }

  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card");
  cardWrapper.id = `card-${cardObject.getCardId()}`;

  const cardHeaderWrapper = createCardHeader(cardDataObject.name);
  const cardBodyWrapper = createCardBody(
    cardDataObject.main.temp,
    cardDataObject.main.humidity,
    cardDataObject.weather[0].icon
  );

  cardObject.city = cardDataObject.name;
  cardObject.temperature = cardDataObject.main.temp;
  cardObject.humidity = cardDataObject.main.humidity;
  cardObject.weatherIcon = cardDataObject.weather[0].icon;

  const cardFooterWrapper = createCardFooter(cardObject);
  const cardDatetimeWrapper = createCardDate(cardObject);

  cardWrapper.appendChild(cardHeaderWrapper);
  cardWrapper.appendChild(cardBodyWrapper);
  cardWrapper.appendChild(cardFooterWrapper);
  cardWrapper.appendChild(cardDatetimeWrapper);

  cardsArray.push(cardObject);

  appWrapper.appendChild(cardWrapper);

  saveToLocalstorage();
  return true;
};

const tryToCreateACard = async () => {
  if (!citySearch.value) {
    citySearch.reportValidity();
    return;
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&units=metric&appid=108dd9a67c96f23039937fe6f3c91963`
  );
  let resData = await res.json();
  if (resData.cod !== 200) {
    citySearch.setCustomValidity("City was not found");
    citySearch.reportValidity();
    return;
  }
  createCard(resData, false);
};

const btnCreate = document.querySelector("#btn-create");
btnCreate.addEventListener("click", tryToCreateACard);

const generateCardsFromStorage = async () => {
  const fromStorage = JSON.parse(localStorage.getItem("weatherCardsArray"));
  if (fromStorage?.length)
    fromStorage.map(async (e) => {
      console.log(e);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${e.city}&units=metric&appid=108dd9a67c96f23039937fe6f3c91963`
      );
      let resData = await res.json();
      createCard({ ...e, ...resData }, true);
      if (e.publicPin) {
        console.log(e);
        console.log(cardsArray);
        getCardById(e.publicID).pinCard();
      }
    });
};

window.addEventListener("load", generateCardsFromStorage);
