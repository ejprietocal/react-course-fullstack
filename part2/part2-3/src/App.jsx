import { useState, useEffect } from "react"
import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY;


const findCountries = (objectCountries, nameFragment) =>{
  const countries = Object.values(objectCountries.data);
  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(nameFragment.toLowerCase())
  );
  const finCountries = filteredCountries.filter(countrie => countrie.name.common.toLowerCase().includes(nameFragment.toLowerCase()));
  return finCountries
  
}


const ShowInfo = ({nameCountry, fijarpais}) =>{
  return(
    <>
       <button 
          className="button-show"
          onClick={ () => fijarpais(nameCountry)}
      >
       Show
       </button>
    
    </>
  )

}
const ShowArreglo = ({ arreglo,setCountry,setCity }) => {
  const arregloOb = Object.values(arreglo);
  if(arregloOb.length > 10){
    return (
      <>
        <p>To Many matches, specify another filter</p>
      </>
    )
  }
  else if(arregloOb.length ===1){
    return(
      <>
        {arregloOb.map((arr, index) => (
          <div key={index}>
            <h1 className="name">{arr.name.common}</h1>
            <p className="capital">Capital: {arr.capital}</p>
            <p className="area">area {arr.area}</p>

            <h3>Languages</h3>
            <ul className="languages">
              {
                Object.values(arr.languages).map((lang, ind) => (
                  <li key={ind}>{lang}</li>
                ))
              }
            </ul>

            <img src={arr.flags.png} alt={arr.flags.alt} width="150px" height="150px" />
            <Wheater city={arr.capital} />
          </div>
        ))}
      </>
    )
  }
  return (
    <>
      {arregloOb.map((arr, index) => (
          <p key={index}>{arr.name.common} <ShowInfo fijarpais={setCountry} nameCountry={arr.name.common}/></p>
      ))}
    </>
  );
};

const Wheater = ({city}) =>{

  const [weather, setWeather] = useState('');
  useEffect( () =>{
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
    .then(response =>{
      console.log(response.data)
      setWeather(response.data)
    })  
    
  },[city]) 
  
  if (!weather) {
    return <p>Loading...</p>;
  }
  return(
    <>
      <h2>Wheater in {city}</h2>
      <p>Temperature: {weather.main.temp}</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} width="150px" height="150px" alt={weather.weather.description} />
      <p>wind: {weather.wind.speed} m/s</p>
    </>
  )
}

const App = () => {

  const [country, setContry] = useState(null)
  const [value, setValue] = useState('')
  const [countries, setContries] = useState({})
  useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          if (country) {
            setContries(findCountries(response,country))
          }
        })
        .catch(error=>{
          console.log(error)
          setContries('')
        })
    
  }, [country])

  const handleChange = (event) => {
    setValue(event.target.value)
    setContry(event.target.value)
  }


  return (
    <div>
        country: <input value={value} onChange={handleChange} />
        <ShowArreglo arreglo={countries} setCountry={setContry} />
    </div>
  )
}

export default App