import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { Link } from "expo-router";
import Watching from "./watching";
import Weather from "./weather";
import Fantasy from "./fantasy";
import Listening from "./listening";
import { BlurView } from "expo-blur";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";
import {
  Oswald_200ExtraLight,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from "@expo-google-fonts/oswald";

export default function Home() {
  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
    Oswald_200ExtraLight,
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
  });
  return (
    <ImageBackground
      source={{
        uri: "https://depositphotos-blog.s3.eu-west-1.amazonaws.com/uploads/2017/07/Soothing-nature-backgrounds-2.jpg",
      }}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      resizeMode="cover" // or 'contain' based on your needs
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
          // backgroundColor: "black",
        }}
      >
        <Text
          style={{
            color: "red",
            fontSize: 72,
            fontFamily: "Roboto_900Black",
            textShadowColor: "black",
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 4,
          }}
        >
          Darayus's Dashboard
        </Text>
        {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 400 }}>
        <Weather />
        <Listening />
      </View> */}
        <BlurView
          intensity={80}
          style={{ borderRadius: 20, overflow: "hidden" }}
        >
          <Weather />
        </BlurView>

        <BlurView
          intensity={80}
          style={{ borderRadius: 20, overflow: "hidden" }}
        >
          <Watching />
        </BlurView>

        <BlurView
          intensity={80}
          style={{ borderRadius: 20, overflow: "hidden" }}
        >
          <Fantasy />
        </BlurView>
      </View>
    </ImageBackground>
  );
}
