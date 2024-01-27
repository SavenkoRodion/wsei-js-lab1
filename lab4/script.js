console.log("Hello world");

const appWrapper = document.querySelector("#app-wrapper");

class Card {
    constructor(id){
        this.id = id;
        this.header;
        this.body;
        this.isSaved = false;
    }
}

const cardsArray = [];



const saveCardData = (id) => {
    console.log("Card with id "+id+" is saved")
    cardsArray[id]; //Create method
}

const createCard = ()=>{
    const lol = new Card(cardsArray.length)

    const cardWrapper = document.createElement("div");
    const cardHeaderWrapper = document.createElement("div");
    const cardBodyWrapper = document.createElement("div");
    const cardFooterWrapper = document.createElement("div");
    const cardHeaderInput = document.createElement("input");
    const cardBodyTextarea = document.createElement("textarea");
    const cardFooterSaveBtn = document.createElement("button");
    const cardFooterRemoveBtn = document.createElement("button");
    
    cardWrapper.classList.add("card");
    cardWrapper.id="";
    cardHeaderWrapper.classList.add("card-header");
    cardBodyWrapper.classList.add("card-body");
    cardFooterWrapper.classList.add("card-footer");
    
    cardFooterSaveBtn.innerHTML="Save";
    cardFooterSaveBtn.addEventListener("click", () => { saveCardData(lol.id) });
    cardFooterRemoveBtn.innerHTML="Remove";

    cardHeaderInput.required = true;
    cardBodyTextarea.required = true;

    cardHeaderWrapper.appendChild(cardHeaderInput);
    cardBodyWrapper.appendChild(cardBodyTextarea);
    cardFooterWrapper.appendChild(cardFooterSaveBtn);
    cardFooterWrapper.appendChild(cardFooterRemoveBtn);


    cardWrapper.appendChild(cardHeaderWrapper, cardBodyWrapper, cardFooterWrapper);
    cardWrapper.appendChild(cardBodyWrapper);
    cardWrapper.appendChild(cardFooterWrapper);
    
    cardsArray.push(lol)
    appWrapper.appendChild(cardWrapper);

    console.log(cardsArray)

    return true;
}

const btnCreate = document.querySelector("#btn-create");
btnCreate.addEventListener("click", createCard)

// const lol1 = createCard();
// console.log(lol1)