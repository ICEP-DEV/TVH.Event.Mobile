import axios from "axios";
import React, { useState, useEffect } from "react";
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
import { deleteAttendee } from "./utils/auth";
import { subDays, isAfter, isSameDay, parseISO } from "date-fns";

const HomeScreen = ({ navigation }) => {
  const [eventData, setEventData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);

  const currentDate = new Date();
  const fifteenDaysAgo = subDays(currentDate, 16);

  const fromCurrent = (event) => {
    const eventDate = parseISO(event.start_date);
    const today = new Date();
    return isAfter(eventDate, today) || isSameDay(eventDate, today);
  };

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const events = await axios.get(api + "/event/all");
        setEventData(events.data.results);
        setFilteredData(events.data.results); // Set initial filtered data
      } catch (error) {
        console.log(error);
        setError("Failed to load events. Please try again later.");
      }
    };

    getAllEvents();
  }, []);

  const handleSearch = (query) => {
    setSearch(query);
    if (query) {
      const filtered = eventData.filter((event) =>
        event.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(eventData); // Reset to all events if query is empty
    }
  };

  const displayBlobAsImage = (blobData) => {
    // Convert the blob to a Base64 string
    const base64Image = `data:image/jpeg;base64,${blobData}`;
    return { uri: base64Image };
  };

  const formattedDate = (databaseDate) => {
    const date = new Date(databaseDate);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };

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
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      {/* Error Message */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Explore Events Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore our Events</Text>
        </View>

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
            <Text style={styles.cardTitle}>Seminars</Text>
          </Card>
          <Card containerStyle={styles.card}>
            <Image
              source={require("../assets/sem.jpg")}
              style={styles.eventImage}
            />
            <Text style={styles.cardTitle}>Webinars</Text>
          </Card>
        </ScrollView>
      </View>

      {/* Upcoming Events Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity onPress={() => navigation.navigate("AllEvents")}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {filteredData
            .filter((event) => {
              const eventDate = parseISO(event.start_date);
              const today = new Date();
              return isAfter(eventDate, today) || isSameDay(eventDate, today);
            })
            .slice(0, 6)
            .map((event, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("EventDetails", { event });
                }}
              >
                <Card containerStyle={styles.largeCard}>
                  <Image
                    source={displayBlobAsImage(event.image)}
                    style={styles.largeEventImage}
                  />
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>
                      {formattedDate(event.start_date)}
                    </Text>
                  </View>
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventName}>{event.title}</Text>
                    <View style={styles.locationContainer}>
                      <Image
                        resizeMode="contain"
                        source={require("../assets/pin.png")}
                        style={styles.locationIcon}
                      />
                      <Text style={styles.locationText}>{event.location}</Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>

      {/* Previous Events Section:
          This section will show events that have already ended. I will show evens from the past 15 days
      */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Previous Events</Text>
          <TouchableOpacity onPress={() => navigation.navigate("AllEvents")}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {filteredData
            .filter((event) => {
              const eventDate = new Date(event.end_date || event.start_date);
              return eventDate <= currentDate && eventDate >= fifteenDaysAgo;
            })
            .slice(0, 6)
            .map((event, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("EventDetails", { event });
                }}
              >
                <Card containerStyle={styles.largeCard}>
                  <Image
                    source={displayBlobAsImage(event.image)}
                    style={styles.largeEventImage}
                  />
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>
                      {formattedDate(event.start_date)}
                    </Text>
                  </View>
                  <View style={styles.eventInfo}>
                    <Text style={styles.eventName}>{event.title}</Text>
                    <View style={styles.locationContainer}>
                      <Image
                        resizeMode="contain"
                        source={require("../assets/pin.png")}
                        style={styles.locationIcon}
                      />
                      <Text style={styles.locationText}>{event.location}</Text>
                    </View>
                  </View>
                  <View>
                    <Image resizeMode="contain" source={require("../assets/feedback_icon.png")} style={styles.feedbackIcon}/>
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
    marginTop: 10,
  },
  seeAllText: {
    position: "absolute",
    right: 15,
    fontSize: 14,
    color: "#007AFF",
    marginTop: 0,
    marginBottom: 10,
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
    height: 220,
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
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 0,
    padding: 0,
    height: 40,
  },
  locationIcon: { width: 16, marginRight: 5 },
  locationText: {
    fontSize: 13,
    color: "rgba(43, 40, 73, 0.5)",
    fontWeight: "900",
  },
  feedbackIcon: {
    marginLeft: 20,
    height: 30,
    width: 30,
  }
});

export default HomeScreen;
