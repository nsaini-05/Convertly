import { currencyFormats } from "../CurrencyFormats";
export const CurrencyInput = ({
  amount,
  changeAmount,
  currencyFormat,
  changeCurrencyFormat,
  placeHolder,
  disabled = false,
}) => {
  const handleOptionChange = (selectedCurrecyLabel) => {
    changeCurrencyFormat(selectedCurrecyLabel);
  };
  return (
    <div className="input-container">
      <input
        type="number"
        className="input-fields"
        placeholder={placeHolder}
        value={amount}
        onChange={(e) => changeAmount(e.target.value)}
        disabled={disabled}
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
