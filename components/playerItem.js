import { View, Text, Image } from "react-native";
import React from "react";
import styles from "../styles";

export default function PlayerItem({ sleeperId, playersData }) {
  const positionColors = {
    QB: "indianred",
    RB: "palegreen",
    WR: "deepskyblue",
    TE: "sandybrown",
    K: "thistle",
    default: "grey",
  };

  const playerName = playersData[sleeperId]?.name || "Unknown Player";
  const playerPos = playersData[sleeperId]?.position || "Unknown Position";
  const playerFirstName = playersData[sleeperId]?.firstName || "Unknown";
  var playerLastName = playersData[sleeperId]?.lastName || "Player";
  playerLastName = playerLastName.toUpperCase();

  // console.log(playerLastName);

  return playerName == "Unknown Player" ? (
    <View></View>
  ) : (
    <View style={[styles.individualItem]}>
      <View>
        <Image
          source={{
            uri: `https://sleepercdn.com/content/nfl/players/thumb/${sleeperId}.jpg`,
          }}
          style={{ width: 100, aspectRatio: 1 }}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          backgroundColor: positionColors[playerPos] || positionColors.default,
          borderRadius: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: 100,
            padding: 5,
            gap: 5,
          }}
        >
          <View
            style={{
              flexDirection: "col",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                fontSize: 10,
                fontFamily: "Progress",
              }}
            >
              {playerFirstName}
            </Text>
            <Text
              style={{
                textAlign: "left",
                fontSize: 15,
                fontFamily: "Dash-Horizon",
              }}
            >
              {playerLastName}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              // backgroundColor: "white",
            }}
          >
            <Text
              style={{
                textAlign: "right",
                fontSize: 18,
                fontFamily: "Captain-America",
              }}
            >
              {playerPos}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
