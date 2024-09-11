import { useState, useEffect } from "react";
export function useGetConvertedAmount(
  inputCurrencyFormat,
  outputCurrencyFormat
) {
  const [inputCurrencyAmount, setInputCurrencyAmount] = useState("");
  const [outputCurrencyAmount, setOutputCurrencyAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const getConvertedAmount = async (signal) => {
    if (!inputCurrencyAmount || !inputCurrencyFormat) {
      setInputCurrencyAmount("");
      setOutputCurrencyAmount("");
      return;
    }
    if (inputCurrencyFormat === outputCurrencyFormat) {
      setOutputCurrencyAmount(inputCurrencyAmount);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${inputCurrencyAmount}&from=${inputCurrencyFormat}&to=${outputCurrencyFormat}`,
        { signal: signal }
      );
      const data = await response.json();
      setOutputCurrencyAmount(data.rates[outputCurrencyFormat]);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    getConvertedAmount(controller.signal);
    return function () {
      controller.abort();
    };
  }, [inputCurrencyAmount, inputCurrencyFormat, outputCurrencyFormat]);

  return {
    inputCurrencyAmount,
    setInputCurrencyAmount,
    loading,
    outputCurrencyAmount,
    setOutputCurrencyAmount,
  };
}
