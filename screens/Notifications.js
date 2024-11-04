import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";

const NotificationScreen = () => {
const notifications = [
  {
    id: "1",
    logo: require("../assets/alx.jpg"), // replace with correct logo path
    message:
      "ALX Hackathon 2024 is just around the corner! Join us on June 10th for an exciting day of coding and innovation.",
  },
  {
    id: "2",
    logo: require("../assets/alx.jpg"), // replace with correct logo path
    message:
      "Get ready for ALX Hackathon 2024! Sharpen your skills and prepare to collaborate with top developers.",
  },
  {
    id: "3",
    logo: require("../assets/alx.jpg"), // replace with correct logo path
    message:
      "Only two weeks left until the ALX Hackathon! Make sure to register and reserve your spot today.",
  },
  {
    id: "4",
    logo: require("../assets/alx.jpg"), // replace with correct logo path
    message:
      "ALX Hackathon 2024: Are you ready to compete and create? Don't miss this opportunity to showcase your talent.",
  },
  {
    id: "5",
    logo: require("../assets/alx.jpg"), // replace with correct logo path
    message:
      "The ALX Hackathon is your chance to solve real-world problems with code. Join us for an unforgettable event!",
  },
  {
    id: "6",
    logo: require("../assets/alx.jpg"), // replace with correct logo path
    message:
      "Collaborate, innovate, and win at the ALX Hackathon 2024. Register now and be part of the future!",
  },
  {
    id: "7",
    logo: require("../assets/alx.jpg"), // replace with correct logo path
    message:
      "Exciting prizes await at the ALX Hackathon 2024. Will you rise to the challenge? Join us on June 10th.",
  },
  {
    id: "8",
    logo: require("../assets/alx.jpg"), // replace with correct logo path
    message:
      "Mark your calendars for ALX Hackathon 2024! It's time to code, compete, and collaborate with top minds.",
  },
  {
    id: "9",
    logo: require("../assets/alx.jpg"), // replace with correct logo path
    message:
      "ALX Hackathon is just days away! Get ready for a day filled with innovation, teamwork, and problem-solving.",
  },
  {
    id: "10",
    logo: require("../assets/alx.jpg"), // replace with correct logo path
    message:
      "Are you prepared to build the future at ALX Hackathon 2024? June 10th is the date, don't miss it!",
  },
  {
    id: "11",
    logo: require("../assets/alx.jpg"), // replace with correct logo path
    message:
      "ALX Hackathon 2024 is a platform for creators and innovators. Be sure to join us and take on exciting challenges.",
  },
  {
    id: "12",
    logo: require("../assets/alx.jpg"), // replace with correct logo path
    message:
      "Join us at ALX Hackathon 2024 and be part of a collaborative experience with like-minded coders and developers.",
  },
  {
    id: "13",
    logo: require("../assets/alx.jpg"), // replace with correct logo path
    message:
      "The ALX Hackathon is more than just a competition; it's a chance to solve global problems with creative solutions.",
  },
  {
    id: "14",
    logo: require("../assets/alx.jpg"), // replace with correct logo path
    message:
      "Do you have what it takes to innovate and lead? Prove it at ALX Hackathon 2024! Sign up today.",
  },
  {
    id: "15",
    logo: require("../assets/gks.png"), // replace with correct logo path
    message:
      "ALX Hackathon 2024: A day of coding, collaboration, and competition awaits. Get ready to make your mark!",
  },
];


  const renderNotification = ({ item }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.notificationContainer}>
        <Image source={item.logo} style={styles.logo} />
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  card: {
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#E0F0FF",
  },
});

export default NotificationScreen;
