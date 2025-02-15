import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    // flexDirection: "col", // Horizontal layout
    // justifyContent: "space-between", // Space out elements
    // alignItems: "center", // Vertically center elements
    backgroundColor: "transparent", // Light background
    borderRadius: 20, // Rounded corners
    padding: 12, // Padding inside the container
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.1, // Shadow intensity
    shadowRadius: 8, // Shadow blur
    elevation: 4, // Elevation for Android
  },
  widgetText: {
    // fontSize: 16,
    fontFamily: "Roboto_400Regular",
    color: "black", // Text color
    // fontWeight: "bold",
  },
  individualItem: {
    fontSize: 14, // Smaller text for individual item
    color: "#555", // Lighter text color
    fontStyle: "italic", // Italicize this item
    padding: 5, // Add some padding to the item
    backgroundColor: "#d0d0f0", // Light background for the item
    borderRadius: 10, // Rounded corners for the item
  },
});

export default styles;
