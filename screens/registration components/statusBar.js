import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function StatusBar() {
  return (
    <View style={styles.statusBarContainer}>
      <Text style={styles.timeText}>9:41</Text>
      <View style={styles.iconContainer}>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/b7b650aa3c564f178973ced616a3bbb2/d4b9461cd93978e897a6a072585d792b71736851a300faf55cb2206da6152f5b?apiKey=b7b650aa3c564f178973ced616a3bbb2&",
          }}
          style={styles.cellularIcon}
          resizeMode="contain"
          accessibilityLabel="Cellular signal indicator"
        />
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/b7b650aa3c564f178973ced616a3bbb2/404cce91a50422ccb3f6aea0084970dad72b24772ba5bb939ade4f601d7e9ead?apiKey=b7b650aa3c564f178973ced616a3bbb2&",
          }}
          style={styles.wifiIcon}
          resizeMode="contain"
          accessibilityLabel="WiFi indicator"
        />
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/b7b650aa3c564f178973ced616a3bbb2/ca468157457dc0b7fafcefa0eb68bcbe707bc116ed86d965a60a6977bc9bccdb?apiKey=b7b650aa3c564f178973ced616a3bbb2&",
          }}
          style={styles.batteryIcon}
          resizeMode="contain"
          accessibilityLabel="Battery indicator"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBarContainer: {
    display: "flex",
    width: "100%",
    maxWidth: 326,
    alignItems: "stretch",
    gap: 20,
    justifyContent: "space-between",
  },
  timeText: {
    color: "rgba(25, 25, 26, 1)",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: -0.3,
    textAlign: "center",
  },
  iconContainer: {
    display: "flex",
    marginTop: "auto",
    marginBottom: "auto",
    gap: 5,
    flexDirection: "row",
  },
  cellularIcon: {
    width: 17,
    aspectRatio: 1.7,
  },
  wifiIcon: {
    width: 15,
    aspectRatio: 1.36,
  },
  batteryIcon: {
    width: 25,
    aspectRatio: 2.08,
  },
});
