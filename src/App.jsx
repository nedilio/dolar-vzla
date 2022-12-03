import { useEffect, useState } from "react";
import "./App.css";
import { getDolarPrice } from "./services";

function App() {
  const [dolarPrice, setDolarPrice] = useState(0);
  const [bolivares, setBolivares] = useState(0);
  const [fecha, setFecha] = useState("");

  const handleChange = (dolares) => {
    const numericDolares = dolares.replace(",", ".") * 1;
    setBolivares(Math.ceil(numericDolares * dolarPrice));
  };

  const handleClear = () => {
    const input = document.querySelector("input");
    input.value = "";
  };

  useEffect(() => {
    getDolarPrice().then((res) => {
      setDolarPrice(res.USD.promedio);
      setFecha(res._timestamp.fecha);
    });
  }, []);

  return (
    <div className="App">
      <h1 className="title">Conversión Dolares a Bolívares</h1>
      <h3>1 USD 🇺🇸 = {dolarPrice} Bs 🇻🇪</h3>
      <p>{fecha}</p>
      <input
        type="text"
        min="0"
        inputmode="decimal"
        onChange={(e) => handleChange(e.target.value)}
      />
      <h2>Precio en Bolivares: {bolivares}</h2>
      <button disabled={bolivares === 0} onClick={handleClear}>
        Borrar
      </button>
    </div>
  );
}

export default App;
