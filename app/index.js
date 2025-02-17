import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { Link } from "expo-router";
import Watching from "./watching";
import Weather from "./weather";
import Fantasy from "./fantasy";
import Listening from "./listening";
import { BlurView } from "expo-blur";
import { useFonts } from "expo-font";

export default function Home() {
  let [fontsLoaded] = useFonts({
    "Dash-Horizon": require("../assets/fonts/Dashhorizon-eZ5wg.otf"),
    "Super-Brigade-Laser": require("../assets/fonts/SuperBrigadeLaser-j9V2l.otf"),
    Progress: require("../assets/fonts/ProgressPersonalUse-EaJdz.ttf"),
    Marvel: require("../assets/fonts/MarvelRegular-Dj83.ttf"),
    "Captain-America": require("../assets/fonts/AmericanCaptain-MdEY.otf"),
    "Scary-Movie": require("../assets/fonts/ScaryMovie-Zpw7K.otf"),
    "Angry-Birds": require("../assets/fonts/AngryBirdsMovie-BAqV.ttf"),
    "St-Plato": require("../assets/fonts/StPlatoSansDisplayDemoHeavy-PVGDr.otf"),
    "SF-Pro": require("../assets/fonts/SF-Pro.ttf"),
    Droid: require("../assets/fonts/Droid1997.otf"),
    "Electromagnetic-Lungs": require("../assets/fonts/ElectromagneticLungs-BVmx.ttf"),
    Konexy: require("../assets/fonts/KonexyPersonalUse.otf"),
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
            fontFamily: "Progress",
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
