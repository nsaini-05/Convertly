import "./App.css";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import { CurrencyInput } from "./Components/CurrencyInput";
import { useEffect, useState } from "react";
import { currencyFormats } from "./CurrencyFormats";
import { Header } from "./Components/Header";
import { ConversionRateDescription } from "./Components/ConversionRateDescription";
import { Loader } from "./Components/Loader";
import { useConversionRate } from "./hooks/useConversionRate";
import { useGetConvertedAmount } from "./hooks/useGetConvertedAmount";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
function App() {
  const [lastConversion, setLastConversion] = useLocalStorageState(
    {
      inputCurrencyFormat: currencyFormats[0].label,
      outputCurrencyFormat: currencyFormats[1].label,
    },
    "lastConversion"
  );

  const [inputCurrencyFormat, setInputCurrencyFormat] = useState(
    lastConversion.inputCurrencyFormat
  );
  const [outputCurrencyFormat, setOutputCurrencyFormat] = useState(
    lastConversion.outputCurrencyFormat
  );

  const { conversionRate } = useConversionRate(
    inputCurrencyFormat,
    outputCurrencyFormat
  );

  const {
    inputCurrencyAmount,
    setInputCurrencyAmount,
    loading,
    outputCurrencyAmount,
    setOutputCurrencyAmount,
  } = useGetConvertedAmount(inputCurrencyFormat, outputCurrencyFormat);

  useEffect(() => {
    setLastConversion({ inputCurrencyFormat, outputCurrencyFormat });
  }, [inputCurrencyFormat, outputCurrencyFormat]);

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
