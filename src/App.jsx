import "./App.css";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import { CurrencyInput } from "./Components/CurrencyInput";
import { useEffect, useState } from "react";
import { currencyFormats } from "./CurrencyFormats";
import { Header } from "./Components/Header";
import { ConversionRateDescription } from "./Components/ConversionRateDescription";
import { Loader } from "./Components/Loader";
function App() {
  const [inputCurrencyAmount, setInputCurrencyAmount] = useState("");
  const [outputCurrencyAmount, setOutputCurrencyAmount] = useState("");
  const [inputCurrencyFormat, setInputCurrencyFormat] = useState(
    currencyFormats[1].label
  );
  const [outputCurrencyFormat, setOutputCurrencyFormat] = useState(
    currencyFormats[2].label
  );
  const [conversionRate, setConversionRate] = useState({
    inputCurrency: "",
    outputCurrency: "",
    rate: "",
  });
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

  useEffect(() => {
    const controller = new AbortController();
    getConvertedAmount(controller.signal);
    return function () {
      controller.abort();
    };
  }, [inputCurrencyAmount, inputCurrencyFormat, outputCurrencyFormat]);

  return (
    <div className="hero-container">
      <Header />
      <div className="card">
        <h2 className="secondary-heading">
          Make fast and affordable<br></br> international business payments
        </h2>
        <p className="card-tagline">
          Send secure international business payments in XX currencies, all at
          competitive rates with no hidden fees.
        </p>
        <div className="fields-container">
          <CurrencyInput
            amount={inputCurrencyAmount}
            changeAmount={setInputCurrencyAmount}
            currencyFormat={inputCurrencyFormat}
            changeCurrencyFormat={setInputCurrencyFormat}
            placeHolder="Enter Input Amount"
          />
          <button className="icon-btn">
            {!loading && (
              <ArrowsRightLeftIcon className="size-6 text-blue-500" />
            )}
            {loading && <Loader />}
          </button>
          <CurrencyInput
            amount={outputCurrencyAmount}
            changeAmount={setOutputCurrencyAmount}
            currencyFormat={outputCurrencyFormat}
            changeCurrencyFormat={setOutputCurrencyFormat}
            placeHolder="Output Amount"
            disabled={true}
          />
          <ConversionRateDescription conversionRate={conversionRate} />
        </div>
      </div>
    </div>
  );
}

export default App;
