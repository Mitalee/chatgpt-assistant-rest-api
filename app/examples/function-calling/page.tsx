"use client";

import React, { useState } from "react";
import styles from "../shared/page.module.css";
import Chat from "../../components/chat";
import WeatherWidget from "../../components/weather-widget";
import { getWeather, getWeatherAPI } from "../../utils/weather";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";

interface WeatherData {
  location?: string;
  temperature?: number;
  conditions?: string;
}

const FunctionCalling = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({});
  const isEmpty = Object.keys(weatherData).length === 0;

  const functionCallHandler = async (call: RequiredActionFunctionToolCall) => {
    // Log when the function handler is invoked
    console.log("Function call handler invoked in FUNCTION CALLING page.tsx.");
    
    // Log the call object to inspect what OpenAI sent
    console.log("OpenAI Tool Call Received:", call);
    if (call?.function?.name !== "get_weather") {
      console.log("Function name does not match 'get_weather'. Ignoring call.");
      return;
    }
    const args = JSON.parse(call.function.arguments);
    console.log("Function Arguments (location):", args);
    // Call the API and log that we're hitting the API
    console.log("Calling getWeatherAPI...");
    // const data = await getWeatherAPI(args.location);
    const data = getWeather(args.location);
    // Log the response from the API
    console.log("Weather API Response:", data);
    // Update the state with weather data
    setWeatherData(await data);
    console.log("Weather data set to state.");
    return JSON.stringify(data);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          <WeatherWidget
            location={weatherData.location || "---"}
            temperature={weatherData.temperature?.toString() || "---"}
            conditions={weatherData.conditions || "Sunny"}
            isEmpty={isEmpty}
          />
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat functionCallHandler={functionCallHandler} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;
