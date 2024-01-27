console.log("Hello world");

const appWrapper = document.querySelector("#app-wrapper");

const createCard = ()=>{
    const cardWrapper = document.createElement("div");
    const cardHeader = document.createElement("div");
    const cardBody = document.createElement("div");
    const cardFooter = document.createElement("div");
    const cardHeaderInput = document.createElement("input");
    const cardBodyTextarea = document.createElement("textarea");
    const cardFooterSaveBtn = document.createElement("button");
    const cardFooterRemoveBtn = document.createElement("button");
    
    cardWrapper.classList.add("card");
    cardHeader.classList.add("card-header");
    cardBody.classList.add("card-body");
    cardFooter.classList.add("card-footer");
    
    cardFooterSaveBtn.innerHTML="Save";
    cardFooterRemoveBtn.innerHTML="Remove";

    cardHeader.appendChild(cardHeaderInput);
    cardBody.appendChild(cardBodyTextarea);
    cardFooter.appendChild(cardFooterSaveBtn);
    cardFooter.appendChild(cardFooterRemoveBtn);


    cardWrapper.appendChild(cardHeader, cardBody, cardFooter);
    cardWrapper.appendChild(cardBody);
    cardWrapper.appendChild(cardFooter);
    
    appWrapper.appendChild(cardWrapper);
    return true;
}

const btnCreate = document.querySelector("#btn-create");
btnCreate.addEventListener("click", createCard)

// const lol1 = createCard();
// console.log(lol1)