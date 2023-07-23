const BASE_URL = `https://api.exchangerate.host`;
let $inputCurrenciesList = document.querySelector("#inputCurrencyList");
let $outputCurrenciesList = document.querySelector("#outputCurrencyList");
let $convertButton = document.querySelector("#convertButton");
let $amountField = document.querySelector("#amountToConvert");
let $resultAlert = document.querySelector("#result")
let $paragraphInput = document.querySelector("#inputAmountAndCurrency");
let $paragraphOutput = document.querySelector("#outputAmountAndCurrency");
let $paragraphDate = document.querySelector("#date");
let inputCurrency = "USD";
let outputCurrency = "USD";

async function queryCurrencies() {
    await fetch(`${BASE_URL}/lastest`)
        .then(response => response.json())
        .then(jsonResponse => Object.keys(jsonResponse.rates))
        .then(currencies => handleCurrencies(currencies))
        .catch(error => handleError(error))
}
async function queryConvertion(inputCurrency, outputCurrency, amount) {
    await fetch(`${BASE_URL}/convert?from=${inputCurrency}&to=${outputCurrency}&amount=${amount}`)
        .then(response => response.json())
        .then(jsonResponse => jsonResponse.result)
        .then(result => handleResult(inputCurrency, outputCurrency, amount, result))
        .catch(error => handleError(error))
}
function handleCurrencies(currencies) {
    currencies.forEach(currency => {
        addListItem($inputCurrenciesList, currency);
        addListItem($outputCurrenciesList, currency);
    });
}
function addListItem($list, itemContent) {
    var $li = document.createElement("a");
    $li.appendChild(document.createTextNode(itemContent));
    $li.classList.add("dropdown-item");
    $li.href = "#";
    $list.appendChild($li);
}
function pickInputCurrency(e) {
    inputCurrency = e.target.textContent;
    changeElementText((e.target.parentNode.parentNode.children[0]), inputCurrency);
};
function pickOutputCurrency(e) {
    outputCurrency = e.target.textContent;
    changeElementText((e.target.parentNode.parentNode.children[0]), outputCurrency);
};
function changeElementText($element, text) {
    $element.value = text;
    $element.textContent = text;
}
function convertRequest(e) {
    amount = $amountField.value;
    queryConvertion(inputCurrency, outputCurrency, amount);
}
function changeVisibility($element,visible){
    if (visible){
        $element.classList.remove("hidden");
    }else{
        $element.classList.add("hidden");
    }
}
function getDate() {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    rawDate = new Date;
    return (rawDate.toLocaleDateString("en-US", options));
}
function handleError(error) {
    console.log("ERROR: " + error);
    $convertButton.onclick = {};
    $inputCurrenciesList.onclick = {};
    $outputCurrenciesList.onclick = {};
    return ("ERROR: " + error);
}
function handleResult(inputCurrency, outputCurrency, amount, result) {
    resultNumber = (Math.trunc(result * 100) / 100);
    inputText = `${amount} ${inputCurrency}`;
    outputText = `${resultNumber} ${outputCurrency}`;
    thisTimeDate = getDate();
    changeVisibility($resultAlert, true);
    $paragraphInput.textContent = inputText;
    $paragraphOutput.textContent = outputText;
    $paragraphDate.textContent = thisTimeDate;
    return (inputText + " = " + outputText);
}

$convertButton.onclick = convertRequest;
$inputCurrenciesList.onclick = pickInputCurrency;
$outputCurrenciesList.onclick = pickOutputCurrency;

queryCurrencies();
console.log(queryConvertion("ARS", "USD", 300));
