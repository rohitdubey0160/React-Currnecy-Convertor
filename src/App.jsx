import { useState ,useEffect} from 'react'
import { InputBox } from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [tocurrency, setToCurrency] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState("");

  const currencyInfo = useCurrencyInfo(fromCurrency);

  const options = Object.keys(currencyInfo);
  const swap = ()=>{
    setFromCurrency(tocurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }

  const convert = () => {
  if (!amount) {
    setConvertedAmount("");
    return;
  }

  setConvertedAmount(
    (Number(amount) * currencyInfo[tocurrency]).toFixed(2)
  );
};

    
  useEffect(() => {
  if (amount === "") {
    setConvertedAmount("");
  }
}, [amount]);


  return (
  <div
    className="w-full min-h-screen flex items-center justify-center bg-cover bg-center"
    style={{
      backgroundImage: `url('src/assets/background-image.png')`,
    }}
  >
    <div className="w-full max-w-md mx-auto px-4">
      <div className="rounded-2xl p-6 backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl transition-all duration-300">

        <h1 className="text-2xl font-bold text-white text-center mb-6 tracking-wide">
          Currency Converter
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="mb-4">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrenyChange={(currency) => setFromCurrency(currency)}
              selectCurrency={fromCurrency}
              onAmountChange={(amount) => setAmount(amount)}
            />
          </div>

          <div className="relative flex justify-center items-center my-4">
            <button
              type="button"
              onClick={swap}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
            >
              🔄
            </button>
          </div>

          <div className="mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrenyChange={(currency) => setToCurrency(currency)}
              selectCurrency={tocurrency}
              onAmountChange={(value) => setConvertedAmount(value)}
            />
          </div>

          {/* Exchange Rate Display */}
          {currencyInfo[tocurrency] && (
            <p className="text-center text-white text-sm mb-3">
              1 {fromCurrency.toUpperCase()} ={" "}
              {currencyInfo[tocurrency]} {tocurrency.toUpperCase()}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold tracking-wide shadow-lg hover:scale-105 transition-all duration-300"
          >
            Convert {fromCurrency.toUpperCase()} → {tocurrency.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  </div>
);
}

export default App
