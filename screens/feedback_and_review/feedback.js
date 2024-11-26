import { max } from "date-fns";
import { React, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Card, Button, Rating } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { ProgressBar } from "react-native-paper";
import { Buffer } from "buffer";
import { Picker } from "@react-native-picker/picker";
import { Check, X, AlertCircle } from 'lucide-react';
import api from "../../APIs/API";
import axios from "axios";
import { subDays, isAfter, isSameDay, parseISO } from "date-fns";
import { useRoute, useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

// Review Feedback Modal Component
const ReviewFeedbackModal = ({ visible, onClose, success, message }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.feedbackModalOverlay}>
        <View style={styles.feedbackModalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#9E9E9E" />
          </TouchableOpacity>
          
          <View style={styles.iconContainer}>
            {success ? (
              <View style={[styles.iconCircle, styles.successCircle]}>
                <Check size={32} color="#fff" />
              </View>
            ) : (
              <View style={[styles.iconCircle, styles.errorCircle]}>
                <AlertCircle size={32} color="#fff" />
              </View>
            )}
          </View>
          
          <Text style={styles.feedbackMessage}>
            {message || (success ? 'Review sent successfully' : 'Failed to send review')}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const FeedbackAndReview = ({ route, navigation }) => {
  const { event } = route.params;

  const [allReviews, setAllReviews] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    
    const getAllEvents = async () => {
      try {
        const events = await axios.get(api + "/event/all");
        setEventData(events.data.results);
        setFilteredData(events.data.results);
      } catch (error) {
        console.log(error);
        setError("Failed to load events. Please try again later.");
      }
    };

    const x = async ()=>{
      const atte = await AsyncStorage.getItem('attendee_id')
      setAttendee(atte)
      await axios.get(
        api + '/register/get/attendee/' + 30
      ).then((response) => {
        console.log("Here 1 " + response.data["results"]["registration_id"])
      }).catch((error) =>{
        console.log("error here " + error)
      })
      
    }
    x()
    getAllEvents();
  }, []);

  const submitReview = async () => {
    try {
      // Your API call here
      await axios.post(api + "/feedback/submit", {
        rating: reviewRating,
        text: reviewText,
      });
      
      setModalVisible(false); // Close review modal
      setSubmitSuccess(true);
      setFeedbackModalVisible(true);
      setReviewText("");
      setReviewRating(0);
      
    } catch (error) {
      console.log(error);
      setSubmitSuccess(false);
      setFeedbackModalVisible(true);
    }
  };

  useEffect(() => {
    const getAllReviews = async () => {
      try {
        const response = await axios.get(api + "/reviews/event/" + event.event_id);
        setAllReviews(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    //getAllReviews();
  }, []);

  // Placeholder data for reviews
  const reviews = [
    {
      id: "1",
      name: "Lethabo Molefe",
      date: "June 5, 2019",
      rating: 4,
      feedback:
        "GKHack was well-organized with exciting challenges and helpful mentors. A fantastic event for learning and networking!",
      helpful: true,
    },
    // ... rest of your reviews array ...
  ];

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const calculateRatingsSummary = (reviews) => {
    const summary = [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: reviews.filter((review) => review.rating === stars).length,
    }));
    return summary;
  };

  const ratingsSummary = calculateRatingsSummary(allReviews);
  const totalRatings = allReviews.length;
  

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalScore = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalScore / reviews.length).toFixed(1);
  };
  const averageRating = calculateAverageRating(allReviews);
  const [selectedEvent, setSelectedEvent] = useState(event.title.toString());
  const [eventId, setEventId] = useState(event.event_id)
  const events = ["GKHack '24", "CodeFest '23", "TechExpo '22"];

  const currentDate = new Date();
  const fifteenDaysAgo = subDays(currentDate, 30);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Feedback & Reviews</Text>
        <Text style={styles.eventTitle}>{selectedEvent} + {eventId}</Text>
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
                  <Text style={styles.reviewerName}>{item.first_name} {item.last_name}</Text>
                  <Rating
                    imageSize={15}
                    readonly
                    startingValue={item.rating}
                    style={styles.smallRating}
                  />
                </View>
                <Text style={styles.reviewDate}>{formatDate(item.submitted)}</Text>
              </View>
              <Text style={styles.reviewText}>{item.content}</Text>
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* Write Review Button */}
      <TouchableOpacity
        style={styles.writeReviewButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.writeReviewText}>Write a review</Text>
      </TouchableOpacity>

      {/* Review Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>What is your review?</Text>

            <Rating
              imageSize={30}
              startingValue={reviewRating}
              onFinishRating={(rating) => setReviewRating(rating)}
              style={styles.ratingInput}
            />

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

            <TouchableOpacity
              style={styles.submitButton}
              onPress={submitReview}
            >
              <Text style={styles.submitButtonText}>SEND REVIEW</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Feedback Modal */}
      <ReviewFeedbackModal
        visible={feedbackModalVisible}
        success={submitSuccess}
        onClose={() => setFeedbackModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // ... your existing styles ...
  
  // New styles for feedback modal
  feedbackModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackModalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    maxWidth: 320,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  iconContainer: {
    marginVertical: 16,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCircle: {
    backgroundColor: '#4CAF50',
  },
  errorCircle: {
    backgroundColor: '#F44336',
  },
  feedbackMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginTop: 8,
  },
  // ... rest of your existing styles ...
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 20
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
    paddingLeft: 10,
    color: "#4CAF50",
    textDecorationLine: "underline",
  },
  ratingSummary: {
    marginBottom: 20,
    width: width * 0.5,
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
    width: 330,
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