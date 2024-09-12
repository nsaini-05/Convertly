import { useEffect, useRef } from "react";
import { currencyFormats } from "../CurrencyFormats";
import { useKey } from "../hooks/useKey";

export const CurrencyInput = ({
  amount,
  changeAmount,
  currencyFormat,
  changeCurrencyFormat,
  placeHolder,
  disabled = false,
}) => {
  const inputEl = useRef();
  const handleOptionChange = (selectedCurrecyLabel) => {
    changeCurrencyFormat(selectedCurrecyLabel);
  };

  useKey(disabled, "Enter", inputEl, changeAmount);

  return (
    <div className="input-container">
      <input
        type="number"
        className="input-fields"
        placeholder={placeHolder}
        value={amount}
        onChange={(e) => changeAmount(e.target.value)}
        disabled={disabled}
        ref={inputEl}
      />
      <select
        id="options"
        name="options"
        className="options-field"
        value={currencyFormat}
        onChange={(e) => handleOptionChange(e.target.value)}
      >
        {currencyFormats.map((currencyFormat) => {
          return (
            <option value={currencyFormat.label} key={currencyFormat.label}>
              {currencyFormat.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
