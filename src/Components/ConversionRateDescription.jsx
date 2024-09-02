import { InformationCircleIcon } from "@heroicons/react/16/solid";

export const ConversionRateDescription = ({ conversionRate }) => {
  return (
    <>
      {conversionRate.rate && (
        <p className="standard-rate-description">
          <span>
            {`1.00 ${conversionRate.inputCurrency} = ${conversionRate.rate} ${conversionRate.outputCurrency}`}
          </span>
          <span>
            <InformationCircleIcon className="size-1" />
          </span>
        </p>
      )}
    </>
  );
};
