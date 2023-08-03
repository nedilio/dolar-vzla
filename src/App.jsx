import { useEffect, useState } from "react";
import "./App.css";
import { getDolarPrice } from "./services";

function App() {
  // const [dolarPrice, setDolarPrice] = useState(0);
  const [dolarBCV, setDolarBCV] = useState(0);
  // const [bolivares, setBolivares] = useState(0);
  const [bolivaresBCV, setBolivaresBCV] = useState(0);
  const [fecha, setFecha] = useState("");

  const handleChange = (dolares) => {
    const numericDolares = dolares.replace(",", ".") * 1;
    // setBolivares(Math.ceil(numericDolares * dolarPrice));
    setBolivaresBCV(Math.ceil(numericDolares * dolarBCV));
  };

  const handleClear = () => {
    const input = document.querySelector("input");
    input.value = "";
    setBolivaresBCV(0);
  };

  useEffect(() => {
    getDolarPrice().then((res) => {
      const { rates, time_last_update_unix } = res;
      const { VES } = rates;
      setDolarBCV(VES);
      setFecha(time_last_update_unix);
    });
  }, []);

  return (
    <div className="App">
      <h1 className="title">Conversión Dolares a Bolívares</h1>
      {/* <h3>1 USD 🇺🇸 = {dolarPrice} Bs 🇻🇪 (Dolar Today)</h3> */}
      <h3>1 USD 🇺🇸 = {dolarBCV.toFixed(2)} Bs 🇻🇪 (BCV)</h3>
      <p>
        {new Date(fecha * 1000).toLocaleString("es-VE", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <label htmlFor="dolares"></label>
      <input
        type="text"
        name="dolares"
        min="0"
        inputmode="decimal"
        onChange={(e) => handleChange(e.target.value)}
      />
      {/* <h2>Precio en Bolivares Dolar today: {bolivares}</h2> */}
      <h2>Precio en Bolivares BCV: {bolivaresBCV}</h2>
      <button disabled={bolivaresBCV === 0} onClick={handleClear}>
        Borrar
      </button>
    </div>
  );
}

export default App;
