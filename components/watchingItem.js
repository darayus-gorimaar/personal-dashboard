import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../styles";
import OpenAI from "openai";
import { TMDB_API_KEY } from "@env";

export default function WatchingItem({ title }) {
  const [posterPath, setPosterPath] = useState("");
  const [yearInfo, setYearInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const tmdbApiKey = TMDB_API_KEY;
  // const openAiApiKey = REACT_APP_OPENAI_API_KEY;
  // const endpoint = "https://api.openai.com/v1/completions";
  // const openai = new OpenAI({
  //   apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  // });

  // const data = {
  //   model: "gpt-4", // or 'gpt-3.5-turbo'
  //   prompt: `What streaming services is breaking bad streaming on? return the result as a list of services separated by commas, and no other text`,
  //   max_tokens: 100,
  //   temperature: 0.5,
  // };

  // const headers = {
  //   "Content-Type": "application/json",
  //   Authorization: `Bearer ${openAiApiKey}`,
  // };

  const url = `https://api.themoviedb.org/3/search/multi?query=${title}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbApiKey}`,
    },
  };

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        // Accessing the poster_path
        const firstResult = json.results[0]; // Assuming you want the first result
        const posterPath = firstResult?.poster_path;
        const year = firstResult?.first_air_date
          ? firstResult.first_air_date.slice(0, 4)
          : firstResult?.release_date.slice(0, 4);
        setYearInfo(year);

        // console.log(json.results[0]);
        if (posterPath) {
          setPosterPath(posterPath); // Update state with the poster path
        }
        setLoading(false);
      })
      .catch((err) => console.error(err));

    //open api
    // try {
    //   const response = fetch(endpoint, {
    //     method: "POST",
    //     headers: headers,
    //     body: JSON.stringify(data),
    //   });
    //   // const result = response.json();
    //   // console.log("OpenAI Result:");
    //   // console.log(result);
    //   // setResponse(result.choices[0].text.trim());
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  }, [title]);

  if (loading) {
    return <Text>Loading...</Text>; // Show loading indicator until data is fetched
  }

  return (
    <View style={[styles.individualItem, { backgroundColor: "navy" }]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 5,
        }}
      >
        <Text
          style={[
            styles.widgetText,
            {
              color: "white",
              fontFamily: "Captain-America",
              fontSize: 16,
              letterSpacing: 1,
            },
          ]}
        >
          {title.toUpperCase()}
        </Text>
        <Text
          style={[
            styles.widgetText,
            { color: "lightgray", fontFamily: "Captain-America", fontSize: 16 },
          ]}
        >
          {yearInfo}
        </Text>
      </View>

      {posterPath ? (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${posterPath}`,
          }}
          style={{ width: 150, height: 225, borderRadius: 5 }}
        />
      ) : (
        <Text>Poster path: {posterPath}</Text>
      )}
      {/* <Text>Streaming On: </Text>
      <Text>{response}</Text> */}
    </View>
  );
}
