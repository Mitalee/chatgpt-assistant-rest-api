const BASE_URL = "http://localhost:9000/api/weather";


const getWeather = (location) => {
  // chose a random temperature and condition
  const randomTemperature = Math.floor(Math.random() * (80 - 50 + 1)) + 50;
  const randomConditionIndex = Math.floor(Math.random() * 5);
  const conditions = ["Cloudy", "Sunny", "Rainy", "Snowy", "Windy"];

  return {
    location: location,
    temperature: randomTemperature,
    unit: "F",
    conditions: conditions[randomConditionIndex],
  };
};

// export { getWeather };

const getWeatherAPI = async (location: string) => {
  try {
    const response = await fetch(`${BASE_URL}?location=${location}`, {
      method: "GET",
    });
    console.log("API Called with URL:", `${BASE_URL}?location=${location}`);

    if (!response.ok) {
      console.error("API responded with error:", response.status);
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    console.log("Weather Data Received:", data);

    return {
      location: data.location,
      temperature: data.temperature,
      conditions: data.conditions,
      unit: "C",
    };
  } catch (error) {
    console.error("Error fetching weather from local API:", error);
    return {
      location,
      temperature: "0",
      conditions: "tried to hit the API but failed",
      unit: "M",
    };
  }
};


export { getWeather, getWeatherAPI };