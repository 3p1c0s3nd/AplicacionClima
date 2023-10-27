import { useState } from "react";

const WeatherCard = ({ weather, coord, grados }) => {
  const [mostrar, setMostrar] = useState(false);

  const botonMostrar = () => {
    setMostrar(!mostrar);
  };

  const clasediv = "p-4 bg-blue-100 rounded-lg shadow-md max-w-sm fondotransparente";
  const claseNameul = "p-4 border-solid border-b-8 border-blue-400";
  return (
    <>
      <div className={clasediv}>
        <p className="text-2xl font-bold "> {weather.name}, {weather.sys?.country}</p>
        <ul className={claseNameul}>
          <li>Latitud: {coord.lat}</li>
          <li>Longitud: {coord.lon}</li>
        </ul>

        <ul className={claseNameul}>
          <li>Pais: {weather.sys?.country}</li>
          <li>Condicion Clima: {weather.weather?.[0]?.description}</li>
          <li>Velocidad Viento: {weather.wind?.speed}</li>
          <li>Clouds: {weather.clouds?.all}%</li>
          <li>Presion Atmosferica: {weather?.main?.pressure}</li>
          <li>
            Temperatura Actual:
            {mostrar ? ` ${grados.celcius}°C` : ` ${grados.fahrenheit}°F`}
          </li>
        </ul>
        <div className="flex justify-center pt-4">
          <button
            onClick={botonMostrar}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
          >
            {mostrar ? "Change To °F" : "Change To °C"}
          </button>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
