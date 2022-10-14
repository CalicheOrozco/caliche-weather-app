import { useEffect, useState } from "react";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
  IoMdArrowRoundUp,
  IoMdArrowRoundDown,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

function App() {
  const [location, setLocation] = useState("Moncton");
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const date = new Date();
  const APIkey = "bcf2048bc3be154bded8f277f580ba2e";
  let icon;

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
    setTimeout(() => {
      setLoading(false);
    }, 500);
    // cleaning the input
    const input = document.querySelector("input");
    input.value = "";
  };

  useEffect(() => {
    const FEATURED_API = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    getData(FEATURED_API);
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  async function getData(API) {
    const response = await fetch(API);
    if (response.ok) {
      let data = await response.json();
      setData(data);
    }
    if (!response.ok) {
      setErrorMsg("City not found");
    }
  }

  // if data is false, return loading
  if (!data) {
    return (
      <div className="loading w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
        <ImSpinner8 className="loading-icon text-5xl animate-spin text-white" />
      </div>
    );
  }

  // set the icon based on the weather
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-[#31cafb]" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#31cafb]" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
    default:
      icon = <IoMdCloudy />;
  }
  return (
    <div className="App">
      <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
        {errorMsg && (
          <div className="text-white w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] p-4 capitalize rounded-md">
            {errorMsg}
          </div>
        )}
        {/* Form */}
        <form
          className={`${
            animate ? "animate-shake" : "animate-none"
          } h-16 bg-black/30 w-full max-w-[450px]
          rounded-full backdrop-blur-1xl mb-8`}
        >
          <div className=" h-full relative flex items-center justify-between p-2">
            <input
              onChange={(e) => handleSearch(e)}
              className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-base font-light pl-6 h-full"
              type="text"
              placeholder="Search by city or country"
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
        <div className="card w-full max-w-[450px] min-h-[584px] bg-black/20 text-white backdrop-blur-1xl rounded-3xl py-12 px-6">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <ImSpinner8 className="loading-icon text-white text-5xl animate-spin" />
            </div>
          ) : (
            <>
              {/* Card top */}
              <div className="card-top flex items-center gap-x-5">
                <div className="icon text-8xl">{icon}</div>
                <div className="flex-col">
                  <div className="city text-2xl font-semibold">{`${data.name}, ${data.sys.country}`}</div>
                  <div className="date">{`${date.getUTCDate()}/${
                    date.getUTCMonth() + 1
                  }/${date.getUTCFullYear()}`}</div>
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
                <div className="flex justify-between">
                  <div className="flex items-center gap-x-2">
                    <div className="icon-visibility text-xl">
                      <IoMdArrowRoundUp />
                    </div>
                    <div className="flex ml-2">
                      {`Max: ${parseInt(data.main.temp_max)}`}{" "}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <div className="icon text-xl">
                      <IoMdArrowRoundDown />
                    </div>
                    <div className="flex ml-2">
                      {`Min: ${parseInt(data.main.temp_min)}`}{" "}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
