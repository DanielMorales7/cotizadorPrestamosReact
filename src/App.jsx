import { useState, useEffect } from "react";
import Header from "./components/Header";
import Button from "./components/Button";
import {formatearDinero, calcularTotalPagar, calcularPagoMensual} from "./helpers/"

function App() {

  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(6);
  const [total, setTotal] = useState(0)
  const [pagoMensual, setPagoMensual] = useState(0)

  useEffect(() =>{
    //el doble render aparece porque está en modo estricto en el maiin
    setTotal(calcularTotalPagar(cantidad, meses));
    setPagoMensual(calcularPagoMensual(total, meses))

  },[cantidad, meses, total]);


  const min = 0;
  const max = 20000;
  const step = 100;

  const handleChange = (e) =>{

    setCantidad(+e.target.value);

  }

  const handleButton = (direccion)=>{

    console.log(direccion)

    const valor = (direccion == "i" ? cantidad - step : cantidad + step)
    
    if(valor < min) {
      alert('cantidad no validad');
      return;
    }

    setCantidad(valor);

  }

  

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header/>

      <div className="flex justify-between my-6">
       
       
      <Button 
        accion='i'
        fn={e => handleButton("i")}
      />
      <Button 
        accion='d'
        fn={e => handleButton("d")}
      />

      </div>

      <input 
        type="range" 
        className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        value={cantidad}
      />

      <p className="text-center my-10 text-5xl font-extrabold text-indigo-600" >
        { formatearDinero(cantidad)}
      </p>

      <h2 className="text-2xl font-extrabold text-gray-500 text-center" >
        Elige un <span className="text-indigo-600" >Plazo</span> a pagar
      </h2>
      
      <select
        className="mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center
        text-xl font-bold text-gray-500"
        value={meses}
        onChange={e => setMeses(+e.target.value)}
      >
        <option value="6">6 Meses</option>  
        <option value="12">12 Meses</option>  
        <option value="24">24 Meses</option>  
      </select>

      <div className="my-5 space-y-3 bg-gray-50 p-5" >
        <h2 className="text-2xl font-extrabold text-gray-500 text-center" >
          Resumen <span className="text-indigo-600" >de pagos</span>
        </h2>

        <p className="text-xl text-gray-500 text-center font-bold" >Meses {meses} </p>
        <p className="text-xl text-gray-500 text-center font-bold" >Total a pagar { formatearDinero(total) } </p>
        <p className="text-xl text-gray-500 text-center font-bold" >Mensualidades { formatearDinero(pagoMensual) } </p>

      </div>

    </div>
  )
}

export default App
