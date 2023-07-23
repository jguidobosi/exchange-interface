function validateHandleResult(inputCurrency, outputCurrency, amount, result){
    console.assert(handleResult(inputCurrency, outputCurrency, amount, result) === `${amount} ${inputCurrency} = ${result} ${outputCurrency}`, "Program failed to handle convertion results.");
}
validateHandleResult("USD", "ARS", 999, 111);
