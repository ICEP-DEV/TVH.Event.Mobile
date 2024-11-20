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
} from "react-native";
import { Card, Button, Rating } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { ProgressBar } from "react-native-paper";
import { Buffer } from "buffer";
import api from "../../APIs/API";
import axios from "axios";

const FeedbackAndReview = ({ navigation }) => {
  const [allReviews, setAllReviews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

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
        const response = await axios.get(api + "/feedback/survey/1");
        setAllReviews(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getAllReviews();
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
    {
      id: "2",
      name: "Chun Lee",
      date: "June 5, 2019",
      rating: 4,
      feedback:
        "GKHack was well-organized with exciting challenges and helpful mentors. A fantastic event for learning and networking!",
      helpful: false,
    },
    {
      id: "3",
      name: "Amina Yusuf",
      date: "June 6, 2019",
      rating: 5,
      feedback:
        "I loved the energy and the opportunities to meet industry leaders. This was a great experience!",
      helpful: true,
    },
    {
      id: "4",
      name: "John Doe",
      date: "June 7, 2019",
      rating: 3,
      feedback:
        "The event was good, but I think the venue could have been better organized. Some sessions were hard to follow.",
      helpful: false,
    },
    {
      id: "5",
      name: "Emily Carter",
      date: "June 8, 2019",
      rating: 4,
      feedback:
        "Great event with an amazing lineup of speakers. I learned so much about innovation and teamwork.",
      helpful: true,
    },
    {
      id: "6",
      name: "Rajesh Kumar",
      date: "June 9, 2019",
      rating: 5,
      feedback:
        "This hackathon exceeded my expectations! The challenges were engaging, and the mentors were super helpful.",
      helpful: true,
    },
    {
      id: "7",
      name: "Fatima Ahmed",
      date: "June 10, 2019",
      rating: 2,
      feedback:
        "While the event had potential, I felt it lacked clear communication and better time management.",
      helpful: false,
    },
    {
      id: "8",
      name: "Liam O'Connor",
      date: "June 11, 2019",
      rating: 4,
      feedback:
        "Overall, an awesome event. The coding challenges were well-designed, but more snacks would have been nice!",
      helpful: true,
    },
    {
      id: "9",
      name: "Sophia Martinez",
      date: "June 12, 2019",
      rating: 5,
      feedback:
        "Amazing experience! I appreciated the diversity of ideas and the collaborative spirit throughout the event.",
      helpful: true,
    },
    {
      id: "10",
      name: "David Chen",
      date: "June 13, 2019",
      rating: 1,
      feedback:
        "The event was decent, but I think the workshops could have been more interactive. Still, I learned a lot.",
      helpful: false,
    },
    {
      id: "11",
      name: "Grace Kim",
      date: "June 14, 2019",
      rating: 4,
      feedback:
        "Well-executed event! I enjoyed the networking sessions and appreciated the attention to detail.",
      helpful: true,
    },
    {
      id: "12",
      name: "Michael Brown",
      date: "June 15, 2019",
      rating: 5,
      feedback:
        "One of the best hackathons I have attended! The team coordination activities were incredible.",
      helpful: true,
    },
  ];

  const calculateRatingsSummary = (reviews) => {
    const summary = [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: reviews.filter((review) => review.rating === stars).length,
    }));
    return summary;
  };

  const ratingsSummary = calculateRatingsSummary(reviews);

  const totalRatings = reviews.length;

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalScore = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalScore / reviews.length).toFixed(1); // Rounded to 1 decimal place
  };

  const averageRating = calculateAverageRating(reviews);

  //const responseString = Buffer.from(feedback.responses.data).toString("utf-8");

  const message = (data) => {
    return Buffer.from(data).toString("utf-8");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Feedback & Reviews</Text>
        <Text style={styles.eventTitle}>GKHack '24</Text>
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
        <Text style={styles.totalRatings}>{totalRatings} ratings</Text>

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
        <Text style={styles.reviewsCount}>{reviews.length} reviews</Text>
        <ScrollView>
          {reviews.map((item) => (
            <Card key={item.id} containerStyle={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewInfo}>
                  <Text style={styles.reviewerName}>{item.name}</Text>
                  <Rating
                    imageSize={15}
                    readonly
                    startingValue={item.rating}
                    style={styles.smallRating}
                  />
                </View>
                <Text style={styles.reviewDate}>{item.date}</Text>
              </View>
              <Text style={styles.reviewText}>{item.feedback}</Text>
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
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 18,
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
