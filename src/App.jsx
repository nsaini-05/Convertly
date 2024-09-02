import "./App.css";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon } from "@heroicons/react/16/solid";

function App() {
  return (
    <div className="hero-container">
      <h1 className="primary-heading">Currency Converter</h1>
      <p className="tag-line">
        Need to make an international business payment? Take a look at our live
        foreign exchange rates.
      </p>
      <div className="card">
        <h2 className="secondary-heading">
          Make fast and affordable<br></br> international business payments
        </h2>
        <p className="card-tagline">
          Send secure international business payments in XX currencies, all at
          competitive rates with no hidden fees.
        </p>
        <div className="fields-container">
          <div className="input-container">
            <input
              type="number"
              className="input-fields"
              placeholder="Enter Amount "
            />
            <select id="options" name="options" className="options-field">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </select>
          </div>
          <button className="icon-btn">
            <ArrowsRightLeftIcon className="size-6 text-blue-500" />
          </button>
          <div className="input-container">
            <input
              type="number"
              className="input-fields"
              placeholder="Enter Amount "
            />
            <select id="options" name="options" className="options-field">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </select>
          </div>
          <p className="standard-rate-description">
            <span>1.00 USD = 0.8875 GBP </span>
            <span>
              <InformationCircleIcon className="size-1" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
