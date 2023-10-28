import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

function App() {
  //ESTADOS
  const [coordenadas, setCoordenadas] = useState(0); //Creamos un estado para guardar las coordenadas
  const [weather, setWeather] = useState(0);
  const [haserror, setHasError] = useState(false);
  const [erroPermitir, setErroPermitir] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [grados, setGrados] = useState(0);
  const [background, setBackground] = useState("./lluvioso.png");

  //VARIABLES
  const APIKEY = "b8bc4e9f57488332f6de27229f14f443";
  const objcoord = {
    lat: coordenadas.coords?.latitude ? coordenadas.coords?.latitude : 0,
    lon: coordenadas.coords?.longitude ? coordenadas.coords?.longitude : 0,
  };
  const imagenes = [
    "./lluvioso.png", //0
    "./nublado.png", //1
    "./soleado.png", //2
    "./clouds-449822_1920.jpg", //3
  ];

  const success = (position) => {
    setCoordenadas(position);
  };

  const error = () => {
    setErroPermitir(true);
  };

  //Evitar ciclos infinitos
  //Obtenemos las coordenadas con la api del navegador
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  //Obtenemos el clima
  useEffect(() => {
    setIsLoading(true);
    if (objcoord.lat === 0 || objcoord.lon === 0) return;
    const urlapi = `https://api.openweathermap.org/data/2.5/weather?lat=${objcoord?.lat}&lon=${objcoord?.lon}&appid=${APIKEY}`;
    axios
      .get(urlapi)
      .then((response) => {
        const celcius = (response.data.main.temp - 273.15).toFixed(1);
        const fahrenheit = ((celcius * 9) / 5 + 32).toFixed(1);
        setGrados({ celcius, fahrenheit });
        setWeather(response.data);
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [coordenadas]);

  const ciudad = useRef();

  const handleSubmit = (event) => {
    event.preventDefault(); //previene que la pagina se vuelva a cargar
    const city = ciudad.current.value;
    setErroPermitir(false);
    const urlapi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;
    axios
      .get(urlapi)
      .then((response) => {
        const celcius = (response.data.main.temp - 273.15).toFixed(1);
        const fahrenheit = ((celcius * 9) / 5 + 32).toFixed(1);
        setGrados({ celcius, fahrenheit });
        setWeather(response.data);
        setHasError(false);
        //setBackground('./clouds-449822_1920.jpg');
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
    //setBackground('./clouds-449822_1920.jpg');
  };

  return (
    <>
      <div
        className="flex justify-center items-center p-16 text-white principal"
        style={{ backgroundImage: `url('${imagenes[3]}')` }}
      >
        <div className="container mx-auto flex justify-center items-center flex-col ">
          <h1 className="text-4xl font-bold pb-4">Weather App</h1>
          <img
            src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
            alt=""
          />
          {erroPermitir ? (
            <div className="p-4 bg-red-100 rounded-lg shadow-md max-w-sm">
              <p className="text-red-500">
                ingresa una ciudad o debes activar la geolocalización en su
                navegador
              </p>
            </div>
          ) : isLoading ? (
            <div className="p-4 bg-blue-100 rounded-lg shadow-md max-w-sm">
              <p>Cargando...</p>
            </div>
          ) : haserror ? (
            <div className="p-4 bg-red-100 rounded-lg shadow-md max-w-sm">
              <p className="text-red-500">Error al obtener el clima</p>
            </div>
          ) : (
            <WeatherCard weather={weather} coord={objcoord} grados={grados} />
          )}
          <form className="pt-4" onSubmit={handleSubmit}>
            <input
              className="p-2 rounded-md text-black"
              type="text"
              placeholder="Ciudad"
              ref={ciudad}
            />
            <button
              className="m-4 p-6 rounded-md bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 active:bg-indigo-700 desabled:opacity-50"
              type="submit"
              value="Buscar"
              placeholder="Buscar Por Ciudad"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
