import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.backButton}
        accessibilityLabel="Go back"
        accessibilityRole="button"
      >
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/b7b650aa3c564f178973ced616a3bbb2/3b28f4e43259dcaf00cb6f92bc4f5e49dcaf60539b281062b69203de380f51ed?apiKey=b7b650aa3c564f178973ced616a3bbb2&",
          }}
          style={styles.backIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.registrationText}>Registration</Text>
        <Text style={styles.hackathonText}>ALX Hackathon</Text>
        <View style={styles.divider} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    marginTop: 15,
    marginLeft: 11,
    gap: 21,
  },
  backButton: {
    borderRadius: 28,
    minHeight: 32,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 24,
    aspectRatio: 1,
  },
  titleContainer: {
    marginTop: 4,
    fontFamily: "Poppins, sans-serif",
  },
  registrationText: {
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
  },
  hackathonText: {
    fontSize: 24,
    lineHeight: 24,
    marginTop: 11,
    marginHorizontal: 17,
    fontWeight: "500",
  },
  divider: {
    height: 2,
    marginTop: 24,
  },
});
