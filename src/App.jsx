import { useEffect, useState } from "react";
import "./App.css";
import { getDolarPrice } from "./services";

function App() {
  const [dolarPrice, setDolarPrice] = useState(0);
  const [dolarBCV, setDolarBCV] = useState(0);
  const [bolivares, setBolivares] = useState(0);
  const [bolivaresBCV, setBolivaresBCV] = useState(0);
  const [fecha, setFecha] = useState("");

  const handleChange = (dolares) => {
    const numericDolares = dolares.replace(",", ".") * 1;
    setBolivares(Math.ceil(numericDolares * dolarPrice));
    setBolivaresBCV(Math.ceil(numericDolares * dolarBCV));
  };

  const handleClear = () => {
    const input = document.querySelector("input");
    input.value = "";
  };

  useEffect(() => {
    getDolarPrice().then((res) => {
      setDolarBCV(res.USD.sicad2);
      setDolarPrice(res.USD.promedio);
      setFecha(res._timestamp.fecha);
    });
  }, []);

  return (
    <div className="App">
      <h1 className="title">Conversión Dolares a Bolívares</h1>
      <h3>1 USD 🇺🇸 = {dolarPrice} Bs 🇻🇪 (Dolar Today)</h3>
      <h3>1 USD 🇺🇸 = {dolarBCV} Bs 🇻🇪 (BCV)</h3>
      <p>{fecha}</p>
      <input
        type="text"
        min="0"
        inputmode="decimal"
        onChange={(e) => handleChange(e.target.value)}
      />
      <h2>Precio en Bolivares Dolar today: {bolivares}</h2>
      <h2>Precio en Bolivares BCV: {bolivaresBCV}</h2>
      <button disabled={bolivares === 0} onClick={handleClear}>
        Borrar
      </button>
    </div>
  );
}

export default App;
