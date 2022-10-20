import { useEffect, useState } from "react";
import {
  IoMdSearch,
} from "react-icons/io";
import {
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";
import cloudsDay from "./assets/videos/cloudsDay.mp4";
import cloudsNight from "./assets/videos/cloudsNight.mp4";
import hazeDay from "./assets/videos/hazeDay.mp4";
import rainDay from "./assets/videos/rainDay.mp4";
import rainNight from "./assets/videos/rainNight.mp4";
import clearDay from "./assets/videos/clearDay.mp4";
import clearNight from "./assets/videos/clearNight.mp4";
import snowDay from "./assets/videos/snowDay.mp4";
import snowNight from "./assets/videos/snowNight.mp4";
import thunderstorm from "./assets/videos/thunderstorm.mp4";

function App() {
  const [location, setLocation] = useState("Moncton");
  const [data, setData] = useState(null);
  const [dataTime, setDataTime] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const APIkey = "8f80eaaf3a80a46e0aef2c9c9d5468d2";
  let icon;
  let backgroundName;
  let moth;

const multiply = (a,b) => {
  let result = 0
  const positivo = Math.abs(a) === a
  for (let i = 0; i < Math.abs(a); i++) {
    result = positivo ? result + b : result - b
  }return(result)
}
const a = multiply(10,-4)

//console.log(a)

const getBiggest = (array) => array.reduce((acc, el) => acc > el ? acc : el)
const b = getBiggest([1,2,3,0,5,6,7,8,9,10])
//console.log(b)

const clean = (array) => array.reduce((acc, el) => {
  if (el){
    acc.push(el)
  }return(acc)
},[])

const c = clean([1,,3,0,,6,7,8,null,10])
//console.log(c)

const arr = [[1,2], [[3,4], [1,[]]] ]

const flattent = (array) => arr.reduce((acc, el) => acc.concat(el),[])

const d = flattent(arr)
//console.log(d)

const repited = (str) =>{
  const lowered = str.toLowerCase()
  const splitted = lowered.split(" ")
  const reduced = splitted.reduce((acc, el) => {
    if (acc[el]){
      acc[el]++
    }else{
      acc[el] = 1
    }
    return(acc)
  },{})
  return Object.entries(reduced).reduce((acc,el) => acc[1] > el[1] ? acc : el)
}

const e = repited("This is a Repited word word Test this is a a")

//console.log(e)

const isPalindrome = (str) => {
  str = str.replace(/\s/g, "")
  const lowered = str.toLowerCase()
  const splitted = lowered.split("")
  const reversed = splitted.reverse()
  const joined = reversed.join("")
  return lowered === joined
}

const f = isPalindrome("Luz azul")
console.log(f)

const GetMaxMin = (array) => array.reduce((acc, el, index) =>{
  if(index === 0){
    acc.max = el
    acc.min = el
  }
  if (acc.max < el) {
    acc.max = el
  }
  if (acc.min > el) {
    acc.min = el
  }
  return acc
},{max:0,min:0})

const z = GetMaxMin([1,2,-3,10,5,6,7,8,9,10])
// console.log(z)

  
  const handleSearch = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      setLocation(inputValue);
    }
    if (inputValue === "") {
      setAnimate(true);
      setErrorMsg("Please enter a city name");
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
    setLoading(true);
    setInputValue("");
    setTimeout(() => {
      setLoading(false);
    }, 500);
    // cleaning the input
    const input = document.querySelector("input");
    input.value = "";
  };

  useEffect(() => {
    let lang = "en";
    const FEATURED_API = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}&lang=${lang}`;

    async function getData(API) {
      const response = await fetch(API);
      if (response.ok) {
        let data = await response.json();
        const FEATURED_APITime = `https://api.timezonedb.com/v2.1/get-time-zone?key=XR4MCKPS4TRB&format=json&by=position&lat=${data.coord.lat}&lng=${data.coord.lon}`;
        setData(data);
        getDataTime(FEATURED_APITime);
      }
      if (!response.ok) {
        setErrorMsg("City not found");
      }
    }
    
    getData(FEATURED_API);
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  async function getDataTime(API) {
    const response = await fetch(API);
    if (response.ok) {
      let data = await response.json();
      let time = {
        year: data.formatted.slice(0, 4),
        month: data.formatted.slice(5, 7),
        day: data.formatted.slice(8, 10),
        hour:data.formatted.slice(11, 13),
        minute: data.formatted.slice(14, 16),
        countryName: data.countryName,
      };
      if (time.hour > 12) {
        time.hour = time.hour - 12;
        time.meridiem = "PM";
      } else {
        time.meridiem = "AM";
      }
      setDataTime(time);
    }
    if (!response.ok) {
      setErrorMsg("City not found");
    }
  }

  // if data is false, return loading
  if (!data || !dataTime) {
    return (
      <div className="loading w-full min-h-screen bg-gray-800 bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
        <ImSpinner8 className="loading-icon text-5xl animate-spin text-white" />
      </div>
    );
  }
  icon = data.sys.country
  // set the month base on the number
  switch (dataTime.month) {
    case "01":
      moth = "January";
      break;
    case "02":
      moth = "February";
      break;
    case "03":
      moth = "March";
      break;
    case "04":
      moth = "April";
      break;
    case "05":
      moth = "May";
      break;
    case "06":
      moth = "June";
      break;
    case "07":
      moth = "July";
      break;
    case "08":
      moth = "August";
      break;
    case "09":
      moth = "September";
      break;
    case "10":
      moth = "October";
      break;
    case "11":
      moth = "November";
      break;
    case "12":
      moth = "December";
      break;
    default:
      moth = dataTime.month;
  }

  // set the background based on the weather
  switch (data.weather[0].main) {
    case "Clouds":
      if (dataTime.meridiem === "AM" && dataTime.hour > 6 && dataTime.hour < 12 ) {
        backgroundName = cloudsDay;
      }

      if (dataTime.meridiem === "AM" && dataTime.hour > 0 && dataTime.hour <= 6 ) {
        backgroundName = cloudsNight;
      }

      if (dataTime.meridiem === "PM" && dataTime.hour > 6 && dataTime.hour < 12 ) {
        backgroundName = cloudsNight;
      }
      if (dataTime.meridiem === "PM" && dataTime.hour > 0 && dataTime.hour <= 6 ) {
        backgroundName = cloudsDay;
      }
      break;
    case "Haze":
      backgroundName = hazeDay;
      break;
    case "Rain":

      if (dataTime.meridiem === "AM" && dataTime.hour > 6 && dataTime.hour < 12 ) {
        backgroundName = rainDay;
      }

      if (dataTime.meridiem === "AM" && dataTime.hour > 0 && dataTime.hour <= 6 ) {
        backgroundName = rainNight;
      }

      if (dataTime.meridiem === "PM" && dataTime.hour > 6 && dataTime.hour < 12 ) {
        backgroundName = rainNight;
      }
      if (dataTime.meridiem === "PM" && dataTime.hour > 0 && dataTime.hour <= 6 ) {
        backgroundName = rainDay;
      }
      break;
    case "Clear":
      if (dataTime.meridiem === "AM" && dataTime.hour > 6 && dataTime.hour < 12 ) {
        backgroundName = clearDay;
      }

      if (dataTime.meridiem === "AM" && dataTime.hour > 0 && dataTime.hour <= 6 ) {
        backgroundName = clearNight;
      }

      if (dataTime.meridiem === "PM" && dataTime.hour > 6 && dataTime.hour < 12 ) {
        backgroundName = clearNight;
      }
      if (dataTime.meridiem === "PM" && dataTime.hour > 0 && dataTime.hour <= 6 ) {
        backgroundName = clearDay;  
      }
      break;
    case "Drizzle":
      if (dataTime.meridiem === "AM" && dataTime.hour > 6 && dataTime.hour < 12 ) {
        backgroundName = rainDay;
      }

      if (dataTime.meridiem === "AM" && dataTime.hour > 0 && dataTime.hour <= 6 ) {
        backgroundName = rainNight;
      }

      if (dataTime.meridiem === "PM" && dataTime.hour > 6 && dataTime.hour < 12 ) {
        backgroundName = rainNight;
      }
      if (dataTime.meridiem === "PM" && dataTime.hour > 0 && dataTime.hour <= 6 ) {
        backgroundName = rainDay;  
      }
      break;
    case "Snow":
      if (dataTime.meridiem === "AM" && dataTime.hour > 6 && dataTime.hour < 12 ) {
        backgroundName = snowDay;
      }

      if (dataTime.meridiem === "AM" && dataTime.hour > 0 && dataTime.hour <= 6 ) {
        backgroundName = snowNight;
      }

      if (dataTime.meridiem === "PM" && dataTime.hour > 6 && dataTime.hour < 12 ) {
        backgroundName = snowNight;
      }
      if (dataTime.meridiem === "PM" && dataTime.hour > 0 && dataTime.hour <= 6 ) {
        backgroundName = snowDay;  
      }
      break;
    case "Thunderstorm":
      backgroundName = thunderstorm;
      break;
    default:
      if (dataTime.meridiem === "AM" && dataTime.hour > 6 && dataTime.hour < 12 ) {
        backgroundName = cloudsDay;
      }

      if (dataTime.meridiem === "AM" && dataTime.hour > 0 && dataTime.hour <= 6 ) {
        backgroundName = cloudsNight;
      }

      if (dataTime.meridiem === "PM" && dataTime.hour > 6 && dataTime.hour < 12 ) {
        backgroundName = cloudsNight;
      }
      if (dataTime.meridiem === "PM" && dataTime.hour > 0 && dataTime.hour <= 6 ) {
        backgroundName = cloudsDay;  
      }
  }
  return (
    <div className="App">
      <div className="w-full min-h-screen flex flex-col items-center justify-center lg:px-0">
      <video className="w-full min-h-screen object-cover" src={backgroundName} autoPlay loop muted defaultMuted playsInline />
        <div className="absolute w-full min-h-screen flex flex-col items-center justify-center px-4 lg:px-0">
        {errorMsg && (
          <div className="text-white w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] p-4 capitalize rounded-md">
            {errorMsg}
          </div>
        )}
          {/* Form */}
        <form
          className={`${
            animate ? "animate-shake" : "animate-none"
          } h-16 bg-slate-600/50  w-full max-w-[450px]
          rounded-full backdrop-blur-1xl mb-8`}
        >
          <div className=" min-h-full relative flex items-center justify-between p-2">
            <input
              onChange={(e) => handleSearch(e)}
              className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-base font-light pl-6 min-h-full"
              type="text"
              placeholder="Search by city..."
            />
            <button
              onClick={(e) => handleSubmit(e)}
              className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition"
            >
              <IoMdSearch className="text-2xl text-white" />
            </button>
          </div>
        </form>
        {/* Card */}
        <div className="card w-full max-w-[450px] min-h-[584px] bg-slate-600/50 text-white backdrop-blur-1xl rounded-3xl py-12 px-6">
          {loading ? (
            <div className="w-full min-h-full flex justify-center items-center">
              <ImSpinner8 className="loading-icon text-white text-5xl animate-spin" />
            </div>
          ) : (
            <>
              {/* Card top */}
              <div className="card-top flex items-center gap-x-5">
                <div className="icon w-1/2 shadow-2xl"><img src={`https://countryflagsapi.com/png/${icon}`} alt="Country flag"/></div>
                <div className="flex-col">
                  <div className="city text-2xl font-bold">{`${data.name}, ${dataTime.countryName}`}</div>
                  <div className="date text-md font-semibold">{`${moth} ${dataTime.day}, ${dataTime.year}`}</div>
                  <div className="time text-md font-semibold">{`${dataTime.hour}:${dataTime.minute} ${dataTime.meridiem} `}</div>
                </div>
              </div>

              {/* Card body */}
              <div className="card-body my-20">
                <div className="flex justify-center">
                  <div className=" text-9xl leading-none font-bold">
                    {parseInt(data.main.temp)}
                  </div>
                  <div className="celsius-icon text-4xl font-bold">
                    <TbTemperatureCelsius />
                  </div>
                </div>
                <div className="weather-desc capitalize text-center">
                  {data.weather[0].description}
                </div>
              </div>

              {/* Card bottom */}
              <div className="card-bottom max-w-[378px] mx-auto flex flex-col gap-y-6">
                <div className="flex justify-between">
                  <div className="flex items-center gap-x-2">
                    <div className="icon-visibility text-xl">
                      <BsEye />
                    </div>
                    <div>{`Visibility: ${data.visibility / 1000} km`}</div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <div className="icon text-xl">
                      <BsThermometer />
                    </div>
                    <div className="flex ml-2">
                      {`Feels like: ${parseInt(data.main.feels_like)}`}{" "}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-x-2">
                    <div className="icon-visibility text-xl">
                      <BsWater />
                    </div>
                    <div>{`Humidity: ${data.main.humidity}%`}</div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <div className="icon text-xl">
                      <BsWind />
                    </div>
                    <div className="flex ml-2">
                      {`Wind: ${data.wind.speed} m/s`}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
