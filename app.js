const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"

const dropdowns = document.querySelectorAll(".dropDown select");
const exBtn = document.querySelector(".exchange-btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const swapIcon = document.querySelector("i");



for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if ( select.name === "from" && currCode === "USD-US Dollar"){
            newOption.selected = "selected";
        } else  if ( select.name === "to" && currCode === "INR-Indian Rupee"){
            newOption.selected = "selected";
        }
        select.append(newOption);

        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    }
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value= "1";
    }
    
    // console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase().substring(0, 3)}/${toCurr.value.toLowerCase().substring(0, 3)}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase().substring(0, 3)];
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}
 
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

exBtn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    updateExchangeRate();

});

swapIcon.addEventListener("click", performSwap);

function performSwap() {
    const fromValue = fromCurr.value;
    const toValue = toCurr.value;
  
    // Swap values in the dropdowns
    fromCurr.value = toValue;
    toCurr.value = fromValue;
  
    // Update flags to reflect the swapped currencies
    updateFlag(fromCurr);
    updateFlag(toCurr);
  
    // Trigger the exchange calculation to display updated results
    exBtn.click();
}
  


window.addEventListener("load", () => {
    updateExchangeRate();
});