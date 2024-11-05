import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function NavigationBar() {
  const navItems = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/b7b650aa3c564f178973ced616a3bbb2/800e28ef369ab114661e2712cac8e26c745ec70e6334a507448c87fb71b76931?apiKey=b7b650aa3c564f178973ced616a3bbb2&",
      label: "Home",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/b7b650aa3c564f178973ced616a3bbb2/4ca23fd885e4c2bc77c6af91b67e6f08452e73901d52127c06e9c1f523f0e31a?apiKey=b7b650aa3c564f178973ced616a3bbb2&",
      label: "Event",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/b7b650aa3c564f178973ced616a3bbb2/369135ad0bbe5cf9f8d026ad712a5214841bf462c94894ce4eb0973c8d683375?apiKey=b7b650aa3c564f178973ced616a3bbb2&",
      label: "Notifications",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/b7b650aa3c564f178973ced616a3bbb2/550eb74e99ab7f0b0ad5094fe7f6bf8732eef54c147744d0c0be2c21783a71ab?apiKey=b7b650aa3c564f178973ced616a3bbb2&",
      label: "Profile",
    },
  ];

  return (
    <View style={styles.navContainer}>
      <Image
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/b7b650aa3c564f178973ced616a3bbb2/e6c4daa278d7fb215a68e1e83a1660390430c3678245d75d5131e3ff7c38cb7a?apiKey=b7b650aa3c564f178973ced616a3bbb2&",
        }}
        style={styles.topIcon}
        resizeMode="contain"
      />
      <View style={styles.navItemsContainer}>
        {navItems.map((item, index) => (
          <View key={index} style={styles.navItem}>
            <Image
              source={{ uri: item.icon }}
              style={styles.navIcon}
              resizeMode="contain"
            />
            <Text style={styles.navLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    borderRadius: 48,
    borderColor: "rgba(72, 103, 183, 1)",
    borderWidth: 1,
    marginTop: 16,
    padding: 14,
    width: "100%",
  },
  topIcon: {
    width: 12,
    aspectRatio: 1.2,
    alignSelf: "center",
  },
  navItemsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navIcon: {
    width: 24,
    aspectRatio: 1,
  },
  navLabel: {
    fontSize: 12,
    color: "rgba(102, 102, 102, 1)",
    marginTop: 4,
  },
});
