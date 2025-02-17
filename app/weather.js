import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../styles";
import { WEATHER_API_KEY } from "@env";

export default function Weather() {
  const weatherApiKey = WEATHER_API_KEY;
  const location = "Philadelphia";
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 60000); // Update every minute

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${location}`
        );
        const data = await response.json();
        // console.log("Data", data);
        setWeather(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          paddingHorizontal: 10,
          justifyContent: "center",
        }}
      >
        <Text
          style={[
            styles.widgetText,
            {
              flex: 1,
              textAlign: "left",
              fontFamily: "Konexy",
              letterSpacing: 0.8,
            },
          ]}
        >
          Currently living in:{" "}
        </Text>
        <Text
          style={[
            styles.widgetText,
            {
              textAlign: "right",
              fontFamily: "Konexy",
              color: "red",
              letterSpacing: 0.8,
              textShadowColor: "black",
              textShadowOffset: { width: 0.5, height: 0.5 },
              textShadowRadius: 1,
            },
          ]}
        >
          {weather?.location?.name}, {weather?.location?.region}
        </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              styles.widgetText,
              { fontSize: 72, fontFamily: "Captain-America" },
            ]}
          >
            {weather?.current?.temp_f}°F
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "col",
            backgroundColor: "transparent",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              styles.widgetText,
              { fontFamily: "Konexy", letterSpacing: 0.8 },
            ]}
          >
            {weather?.current?.condition?.text}
          </Text>
          {weather?.current?.condition?.icon && (
            <Image
              source={{ uri: `https:${weather?.current?.condition?.icon}` }}
              style={{ width: 64, height: 64 }}
            />
          )}
          <Text
            style={[
              styles.widgetText,
              { fontFamily: "Captain-America", fontSize: 24 },
            ]}
          >
            {time}
          </Text>
        </View>
      </View>
    </View>
  );
}
