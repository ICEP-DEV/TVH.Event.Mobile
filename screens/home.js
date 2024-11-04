// HomeScreen.js
import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SearchBar, Card, Icon } from "react-native-elements";
import api from "../APIs/API";


const HomeScreen = ({ navigation }) => {
  const [eventData, setEventData] = useState([]);

  useState(() => {
    const getAllEvents = async () => {
      try {
        const events = await axios.get(api + "/event/all");
        setEventData(events.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getAllEvents();
  });

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
          {eventData.map((event, index) => (
            <TouchableOpacity 
              key={index}
              onPress={
                ()=>{
                  navigation.navigate('EventDetails', {event})
                  //print("Clicked")
                }
              }
              >
              <Card containerStyle={styles.largeCard} >
              <Image
                source={require("../assets/alx.jpg")}
                style={styles.largeEventImage}
              />
              <View style={styles.dateContainer}>
                {/*   
                <Text style={styles.dateText}>{event.start_date.split('T')[0]}</Text>
                */}
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventName}>{event.title}</Text>
                <Text style={styles.eventLocation}>{event.location}</Text>
                <Text style={{}}>{event.start_date.split('T')[0]}</Text>
                <Text style={{}}>{event.time.split('T')[1].split('.')[0]}</Text>
              </View>
            </Card>
            </TouchableOpacity>
            
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
    height: 240,
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
  dateContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    justifyContent: "center",
    backgroundColor: "rgba(240, 99, 90, 0.8)",
    borderRadius: 10,
    width: 55,
  },
  dateText: { fontSize: 11, color: "white", textAlign: "center" },
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
