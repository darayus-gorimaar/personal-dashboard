import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import PlayerItem from "../components/playerItem";
import styles from "../styles";

export default function Fantasy() {
  //   const starters = [
  //     {
  //       id: 1,
  //       firstName: "Puka",
  //       lastName: "Nacua",
  //       position: "WR",
  //     },
  //     {
  //       id: 2,
  //       firstName: "Garrett",
  //       lastName: "Wilson",
  //       position: "WR",
  //     },
  //     {
  //       id: 3,
  //       firstName: "Breece",
  //       lastName: "Hall",
  //       position: "RB",
  //     },
  //     {
  //       id: 4,
  //       firstName: "Bijan",
  //       lastName: "Robinson",
  //       position: "RB",
  //     },
  //     {
  //       id: 5,
  //       firstName: "Bryce",
  //       lastName: "Young",
  //       position: "QB",
  //     },
  //     {
  //       id: 6,
  //       firstName: "Kyler",
  //       lastName: "Murray",
  //       position: "QB",
  //     },
  //     {
  //       id: 7,
  //       firstName: "Tucker",
  //       lastName: "Kraft",
  //       position: "TE",
  //     },
  //     {
  //       id: 8,
  //       firstName: "Cameron",
  //       lastName: "Dicker",
  //       position: "K",
  //     },
  //   ];

  const [rosters, setRosters] = useState([]);
  const [nflState, setNflState] = useState([]);

  const fetchPlayers = async () => {
    const storedData = localStorage.getItem("nflPlayers");

    if (storedData) {
      //   console.log("Using cached players data.");
      return JSON.parse(storedData); // Use stored data if available
    }

    try {
      const response = await fetch("https://api.sleeper.app/v1/players/nfl");
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const fullData = await response.json();

      const reducedData = Object.fromEntries(
        Object.entries(fullData).map(([id, player]) => [
          id,
          {
            name: player.full_name,
            position: player.position,
            firstName: player.first_name,
            lastName: player.last_name,
          },
        ])
      );

      localStorage.setItem("nflPlayers", JSON.stringify(reducedData)); // Store reduced data
      //   console.log("Stored reduced player data!");
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const fetchSleeperInfo = async (leagueId) => {
    const rosterUrl = `https://api.sleeper.app/v1/league/${leagueId}/rosters`;
    const nflStateUrl = `https://api.sleeper.app/v1/state/nfl`;

    try {
      const response = await fetch(rosterUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRosters(data);
    } catch (error) {
      console.error("Error fetching rosters:", error);
    }
    try {
      const response = await fetch(nflStateUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const nflStateData = await response.json();
      setNflState(nflStateData);
    } catch (error) {
      console.error("Error fetching NFL state:", error);
    }

    fetchPlayers();
  };

  useEffect(() => {
    const leagueId = "1181833854536986624";
    fetchSleeperInfo(leagueId);
  }, []);

  //Data processing
  const starters = rosters.length > 0 ? rosters[1].starters : [];
  const displayWeek = nflState?.displayWeek;
  const season = nflState?.season;

  const playersData = JSON.parse(localStorage.getItem("nflPlayers"));
  // console.log(playersData);
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingBottom: 20,
          justifyContent: "center",
        }}
      >
        <Text
          style={[
            styles.widgetText,
            {
              textAlign: "center",
              fontSize: 24,
              fontFamily: "Roboto_500Medium",
            },
          ]}
        >
          Fantasy Football Lineup
        </Text>
      </View>

      <Text
        style={[
          styles.widgetText,
          {
            fontSize: 20,
            fontFamily: "Roboto_500Medium",
            paddingBottom: 5,
          },
        ]}
      >
        {displayWeek}
        {season} Season
      </Text>
      <FlatList
        horizontal={true}
        data={starters}
        renderItem={({ item }) => (
          <PlayerItem sleeperId={item} playersData={playersData} />
        )}
        // keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      />
    </View>
  );
}
