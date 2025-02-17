import { View, Text, FlatList } from "react-native";
import React from "react";
import WatchingItem from "../components/watchingItem";
import styles from "../styles";

export default function Watching() {
  //temp data
  const watching = [
    {
      id: 1,
      title: "Seinfeld",
    },
    {
      id: 2,
      title: "Altered Carbon",
    },
    {
      id: 3,
      title: "Invincible",
    },
    {
      id: 4,
      title: "Hellraiser",
    },
    {
      id: 5,
      title: "Breaking Bad",
    },
    {
      id: 6,
      title: "Squid Games",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 20, justifyContent: "center" }}>
        <Text
          style={[
            styles.widgetText,
            {
              textAlign: "center",
              fontSize: 36,
              fontFamily: "Progress",
              color: "red",
              textShadowColor: "black",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 4,
            },
          ]}
        >
          Currently Watching
        </Text>
      </View>
      <FlatList
        horizontal={true}
        data={watching}
        renderItem={({ item }) => <WatchingItem title={item.title} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      />
    </View>
  );
}
