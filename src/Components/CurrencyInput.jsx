import { useEffect, useRef } from "react";
import { currencyFormats } from "../CurrencyFormats";

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
  useEffect(() => {
    if (disabled) return;
    const callback = (e) => {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        inputEl.current.focus();
        changeAmount("");
      }
    };
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener(callback);
    };
  }, []);

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
