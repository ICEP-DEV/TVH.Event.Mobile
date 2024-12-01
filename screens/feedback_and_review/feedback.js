import { max } from "date-fns";
import { React, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Card, Button, Rating } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { ProgressBar } from "react-native-paper";
import { Buffer } from "buffer";
import { Picker } from "@react-native-picker/picker";
import api from "../../APIs/API";
import axios from "axios";
import { subDays, isAfter, isSameDay, parseISO } from "date-fns";

const { height: h, width: w } = Dimensions.get("window");

const FeedbackAndReview = ({ route, navigation }) => {
  const { event } = route.params;

  const [allReviews, setAllReviews] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(1);

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

  const submitReview = () => {
    // Placeholder for submitting the review
    console.log("Review Submitted:", reviewRating, reviewText);
    setModalVisible(false); // Close the modal
    setReviewText(""); // Reset input
    setReviewRating(0); // Reset rating
  };

  useEffect(() => {
    const getAllReviews = async () => {
      try {
        const response = await axios.get(
          api + "/reviews/event/" + event.event_id
        );
        setAllReviews(response.data.results);
        if (response.data.results.length === 0) setTotalRatings(1);
        else setTotalRatings(response.data.results.length);
      } catch (error) {
        console.log(error);
      }
    };
    getAllReviews();
  }, []);

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

  const calculateRatingsSummary = (reviews) => {
    const summary = [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: reviews.filter((review) => review.rating === stars).length,
    }));
    return summary;
  };

  const ratingsSummary = calculateRatingsSummary(allReviews);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalScore = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalScore / reviews.length).toFixed(1); // Rounded to 1 decimal place
  };

  const averageRating = calculateAverageRating(allReviews);

  //const responseString = Buffer.from(feedback.responses.data).toString("utf-8");

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  const message = (data) => {
    return Buffer.from(data).toString("utf-8");
  };
  const [selectedEvent, setSelectedEvent] = useState("GKHack '24");
  const events = ["GKHack '24", "CodeFest '23", "TechExpo '22"];
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Feedback & Reviews</Text>
        {/* Dropdown for Event Title */}
        <Text style={styles.eventTitle}>{event.title}</Text>
      </View>

      {/* Rating Summary */}
      <View style={styles.ratingSummary}>
        <Text style={styles.averageRating}>{averageRating}</Text>
        <Rating
          imageSize={2}
          readonly
          startingValue={averageRating}
          style={styles.starRating}
        />
        <Text style={styles.totalRatings}>{allReviews.length} ratings</Text>

        {/* Progress Bars */}
        {ratingsSummary.map((item, index) => (
          <View key={index} style={styles.ratingRow}>
            <Text style={styles.ratingText}>{item.stars}★</Text>
            <ProgressBar
              progress={item.count / totalRatings}
              color="#4CAF50"
              style={styles.progressBar}
            />
            <Text style={styles.ratingCount}>{item.count}</Text>
          </View>
        ))}
      </View>

      {/* Reviews Section */}

      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewsCount}>{allReviews.length} reviews</Text>
        <ScrollView>
          {allReviews.map((item, index) => (
            <Card key={index} containerStyle={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewInfo}>
                  <Text style={styles.reviewerName}>
                    {capitalizeFirstLetter(item.first_name)}{" "}
                    {capitalizeFirstLetter(item.last_name)}
                  </Text>
                  <Rating
                    imageSize={15}
                    readonly
                    startingValue={item.rating}
                    style={styles.smallRating}
                  />
                </View>
                <Text style={styles.reviewDate}>
                  {formatDate(item.submitted)}
                </Text>
              </View>
              <Text style={styles.reviewText}>{item.content}</Text>
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* Write Review Button */}
      <TouchableOpacity
        style={styles.writeReviewButton}
        onPress={() => setModalVisible(true)} // Open modal
      >
        <Text style={styles.writeReviewText}>Write a review</Text>
      </TouchableOpacity>

      {/* Review Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back button
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>What is your review?</Text>

            {/* Rating */}
            <Rating
              imageSize={30}
              startingValue={reviewRating}
              onFinishRating={(rating) => setReviewRating(rating)}
              style={styles.ratingInput}
            />

            {/* Review Input */}
            <Text style={styles.modalSubtitle}>
              Please share your opinion about the hackathon
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your review"
              multiline
              value={reviewText}
              onChangeText={(text) => setReviewText(text)}
            />

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={submitReview}
            >
              <Text style={styles.submitButtonText}>SEND REVIEW</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    paddingTop: 70,
  },
  header: {
    marginBottom: 20,
    width: 200,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 40,
    color: "#4CAF50",
    textDecorationLine: "underline",
  },
  ratingSummary: {
    marginBottom: 20,
    
  },
  averageRating: {
    fontSize: 48,
    fontWeight: "bold",
  },
  starRating: {
    marginVertical: 8,
  },
  totalRatings: {
    fontSize: 14,
    color: "#757575",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    width: 20,
  },
  ratingText: {
    width: 30,
    fontSize: 14,
    color: "#757575",
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 8,
    width: h * 0.349,
  },
  ratingCount: {
    width: 30,
    textAlign: "right",
    fontSize: 14,
    color: "#757575",
  },
  reviewsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  reviewsCount: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  reviewCard: {
    borderRadius: 10,
    padding: 16,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  smallRating: {
    marginTop: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: "#757575",
  },
  reviewText: {
    fontSize: 14,
    color: "#424242",
    marginBottom: 8,
  },
  helpfulText: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  writeReviewButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 25,
    marginTop: 10,
  },
  writeReviewText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    color: "#757575",
  },
  ratingInput: {
    marginVertical: 10,
  },
  textInput: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default FeedbackAndReview;
