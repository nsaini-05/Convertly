import { useState, useEffect } from "react";
export function useConversionRate(inputCurrencyFormat, outputCurrencyFormat) {
  const [conversionRate, setConversionRate] = useState({
    inputCurrency: "",
    outputCurrency: "",
    rate: "",
  });
  const getConversionRate = async (signal) => {
    if (inputCurrencyFormat === outputCurrencyFormat) {
      setConversionRate({
        inputCurrency: inputCurrencyFormat,
        outputCurrency: outputCurrencyFormat,
        rate: 1,
      });
      return;
    }
    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${1}&from=${inputCurrencyFormat}&to=${outputCurrencyFormat}`,
        { signal: signal }
      );
      const data = await response.json();
      setConversionRate({
        inputCurrency: inputCurrencyFormat,
        outputCurrency: outputCurrencyFormat,
        rate: data.rates[outputCurrencyFormat],
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    getConversionRate();
    return function () {
      controller.abort();
    };
  }, [inputCurrencyFormat, outputCurrencyFormat]);

  return { conversionRate };
}
