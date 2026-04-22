import { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrenyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) {
  const amountInputId = useId();

  return (
    <div
      className={`bg-white/80 backdrop-blur-md p-4 rounded-2xl text-sm flex shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
    >
      {/* Amount Section */}
      <div className="w-1/2 pr-2">
        <label
          htmlFor={amountInputId}
          className="text-gray-700 mb-2 inline-block font-semibold"
        >
          {label}
        </label>

        <input
          id={amountInputId}
          className="outline-none w-full bg-transparent py-2 text-lg font-medium placeholder-gray-400"
          type="number"
          inputMode="decimal"
          placeholder="Enter amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) => {
            const value = e.target.value;

            // Allow only numbers and decimal
            if (/^\d*\.?\d*$/.test(value)) {
              onAmountChange && onAmountChange(value);
            }
          }}
        />
      </div>

      {/* Currency Section */}
      <div className="w-1/2 flex flex-col justify-end items-end text-right pl-2">
        <p className="text-gray-600 mb-2 font-medium">Currency</p>

        <select
          className="rounded-xl px-3 py-2 bg-white shadow-md cursor-pointer outline-none hover:bg-gray-100 transition-all duration-200"
          value={selectCurrency}
          onChange={(e) =>
            onCurrenyChange && onCurrenyChange(e.target.value)
          }
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;