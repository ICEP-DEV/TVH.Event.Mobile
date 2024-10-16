// HomeScreen.js
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SearchBar, Card, Icon } from "react-native-elements";

const HomeScreen = () => {

  const events = [
    {
      date: "10 JUNE",
      name: "ALX Hackathon",
      location: "Soshanguve South, PTA",
      imageSource: require("../assets/alx.jpg"),
    },
    {
      date: "28 OCT",
      name: "GKHack '23",
      location: "Sandton, JHB",
      imageSource: require("../assets/gks.png"),
    },
    {
      date: "16 Nov",
      name: "AWS Hackathon",
      location: "Sandton Convention Center, JHB",
      imageSource: require("../assets/aws heckathon.jpg"),
    },
    // Add more events as needed
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="What are you looking for?"
          lightTheme
          round
          containerStyle={styles.searchBar}
          inputContainerStyle={styles.searchInput}
        />
      </View>

      {/* Explore Events Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Explore our Events</Text>
        <Text style={styles.seeAllText}>See All</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          <Card containerStyle={styles.card}>
            <Image
              source={require("../assets/hero.jpg")}
              style={styles.eventImage}
            />
            <Text style={styles.cardTitle}>Hackathons</Text>
          </Card>
          <Card containerStyle={styles.card}>
            <Image
              source={require("../assets/sem.jpg")}
              style={styles.eventImage}
            />
            <Text style={styles.cardTitle}>Seminar</Text>
          </Card>
          <Card containerStyle={styles.card}>
            <Image
              source={require("../assets/Free Vector _ Hand drawn webinar concept with woman.jpg")}
              style={styles.eventImage}
            />
            <Text style={styles.cardTitle}>Webinar</Text>
          </Card>
        </ScrollView>
      </View>

      {/* Upcoming Events Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <Text style={styles.seeAllText}>See All</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {events.map((event, index) => (
            <Card containerStyle={styles.largeCard} key={index}>
              <Image
                source={event.imageSource}
                style={styles.largeEventImage}
              />
              <View style={styles.eventInfo}>
                <Text style={styles.eventDate}>{event.date}</Text>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventLocation}>{event.location}</Text>
              </View>
            </Card>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  searchContainer: {
    padding: 10,
    backgroundColor: "#F8F8F8",
  },
  searchBar: {
    backgroundColor: "#F8F8F8",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchInput: {
    backgroundColor: "#E8F0FE",
  },
  sectionContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  seeAllText: {
    position: "absolute",
    right: 15,
    fontSize: 14,
    color: "#007AFF",
    marginTop: 5,
  },
  horizontalScroll: {
    marginTop: 10,
  },
  card: {
    width: 100,
    borderRadius: 10,
    padding: 0,
    marginHorizontal: 5,
  },
  eventImage: {
    height: 60,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    textAlign: "center",
    paddingVertical: 10,
  },
  largeCard: {
    width: 200,
    borderRadius: 10,
    padding: 0,
    marginHorizontal: 5,
  },
  largeEventImage: {
    height: 100,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  eventInfo: {
    padding: 10,
  },
  eventDate: {
    color: "#E74C3C",
    fontSize: 12,
    fontWeight: "bold",
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  eventLocation: {
    fontSize: 12,
    color: "#8F8F8F",
  },
});

export default HomeScreen;
