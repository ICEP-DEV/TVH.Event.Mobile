import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal
} from 'react-native';
import axios from 'axios';
import api from "../APIs/API";
import { Rating , Icon } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';



const { height: h, width: w } = Dimensions.get("window");

const EventFeedbackScreen = ({route, navigation})=>{
    const {event} = route.params;
    const [allReviews, setAllReviews] = useState([]);
    const [modalVisible, setModalVisible] = useState(false)
    const [reviewRating, setReviewRating] = useState(0)
    const [reviewText, setReviewText] = useState("")
    const [errorMessage, SetErrorMessage] = useState(false)
    const [infoModal, setInfoModal] = useState(false)
    const [infoModalContent, setInfoModalContent] = useState("")

    useEffect(()=>{
        const getAllReviews = async()=>{
            await axios.get(
                api + "/reviews/event/" + event.event_id 
            ).then((response) =>{
                setAllReviews(response.data.results)
            }).catch((error) =>{
                console.log(error)
            })
        }

        getAllReviews();
    },[])

    const getAverage = () => {

        if(allReviews.length === 0){
            return 0;
        }
        let total = allReviews.reduce((sum, reviewer) => sum + reviewer.rating, 0);
        return (total / allReviews.length).toFixed(1);
    };
    const ReviewBar = ({ val }) => {
        let numbers = [0, 0, 0, 0, 0];
        allReviews.forEach((reviewer) => {
            numbers[reviewer.rating - 1]++;
        });
        const barWidth = `${(numbers[val - 1] / allReviews.length) * 100}%`
        return (
            <View style={styles.reviewBar}>
                <Text style={styles.barText}>{val}</Text>
                <View style={styles.barContainer}>
                    <View style={styles.barBackground} />
                    <View
                        style={{
                            ...styles.barForeground,
                            width: barWidth,
                        }}
                    />
                </View>
            </View>
        )
    };

    const ReviewWidget = ({ reviewer }) => (
        <View style={styles.reviewWidget}>
          <View style={styles.reviewerRow}>
            <View style={styles.initialCircle}>
              <Text style={styles.initialText}>{reviewer.first_name[0]}</Text>
            </View>
            <View style={styles.reviewerDetails}>
              <Text style={styles.reviewerName}>{reviewer.first_name} {reviewer.last_name}</Text>
              <Text style={styles.reviewDate}>{reviewer.submitted.split('T')[0]}</Text>
            </View>
            <Rating 
                type="custom"
                imageSize={16}
                readonly
                startingValue={reviewer.rating}
                style={styles.reviewScore}
            />
          </View>
          <Text style={styles.reviewText}>{reviewer.content}</Text>
        </View>
    );


    const submitReview = async()=>{
        
        try{
            if(reviewRating === 0){
                return SetErrorMessage(true)
            }
    
            let attendee = null;
            await AsyncStorage.getItem("attendee").then((response) =>{
                attendee = JSON.parse(response)
            });

            
            if(attendee === null){
                setInfoModalContent("Please log in first")
                return setInfoModal(true);
            }

            await axios.post(
                api + "/reviews/create",
                {
                    attendee_id : attendee.attendee_id,
                    event_id : event.event_id,
                    rating : reviewRating,
                    content : reviewText
                }
            ).then(()=>{
                setModalVisible(false)
                setReviewRating(0)
                setReviewText("")
                SetErrorMessage(false)
                setInfoModalContent("Thank you for sending your review.")
                setInfoModal(true)
            }).catch((error) =>{

                if(error.status === 404){
                    setModalVisible(false)
                    setReviewRating(0)
                    setReviewText("")
                    SetErrorMessage(false)
                    setInfoModalContent("Sorry,but only attendees who registered for the event can submit reviews for the event")
                    return setInfoModal(true);
                }
                console.log("error creating review : " + error)
            })
  
        }catch(error){
            console.error("Error creating review: ", error);
        }
    }


    return <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity 
                style={{paddingRight : w * 0.05}} onPress={()=>{
                    navigation.goBack();
                }}>
                <Icon 
                    name='arrow-back' type="material" color="#fff" size={30}
                />
            </TouchableOpacity>
            <Text style={styles.headerText}>{event.title}</Text>
        </View>
        <ScrollView>
            <Text style={styles.title}>What participants are saying</Text>
            <View style={styles.summaryContainer}>
                <View style={styles.averageScore}>
                    <Text style={styles.averageText}>{getAverage()}</Text>
                    <Text>{allReviews.length} reviewers</Text>
                    <Rating 
                        imageSize={12}
                        readonly
                        startingValue={getAverage()}
                        color= "#040051"
                    />
                </View>
                <View>
                    {[5, 4, 3, 2, 1].map((val) => (
                        <ReviewBar key={val} val={val} />
                    ))}
                </View>
            </View>
            {
                allReviews.map((review) => (
                    <ReviewWidget key={review.reviews_id} reviewer={review}/>
                ))
            }
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={()=>{setModalVisible(true)}}>
        <Text style={styles.buttonText}>Write Review</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Your word is important to us</Text>
                <Rating
                    imageSize={30}
                    startingValue={reviewRating}
                    onFinishRating={(rating) => setReviewRating(rating)}
                    style={styles.ratingInput}
                    //fractions={1}
                />
                {
                    errorMessage === true ? <Text style={{
                        ...styles.modalSubtitle,
                        color : "red"
                    }}>
                        Please use the stars to rate the event
                    </Text> : <></>
                }
                <Text style={styles.modalSubtitle}>
                    Please share your opinion about the event
                </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Your review"
                    multiline
                    value={reviewText}
                    onChangeText={(text) => setReviewText(text)}
                />  
                <TouchableOpacity
                    style={{
                        ...styles.submitButton,
                        backgroundColor : "#040051"
                    }}
                    onPress={()=>{submitReview()}}
                >
                    <Text style={styles.submitButtonText}>SEND REVIEW</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={{
                        ...styles.submitButton, backgroundColor : "#921"
                    }}
                    onPress={()=>{setModalVisible(false)}}
                >
                    <Text style={styles.submitButtonText}>CANCEL</Text>
                </TouchableOpacity>
                
            </View>
        </View>

      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={infoModal}
        onRequestClose={() => setInfoModal(false)}
      >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>{infoModalContent}</Text>
                <TouchableOpacity
                    style={{
                        ...styles.submitButton, backgroundColor : "#040051"
                    }}
                    onPress={()=>{setInfoModal(false)}}
                >
                    <Text style={styles.submitButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>

      </Modal>
    </View>
}



const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { height: h * 0.12, backgroundColor : '#040051', justifyContent: 'flex-start', paddingHorizontal: 20, display: 'flex', flexDirection:'row', alignItems : 'flex-end', paddingBottom : 10 },
    headerText: { color: '#fff', fontSize: 24 },
    title: { fontSize: 22, padding: 20 },
    summaryContainer: { left: 0 ,flexDirection: 'row', padding: 20 },
    averageScore: { marginRight: 20 },
    averageText: { fontSize: 34, textAlign:'center' },
    reviewBar: { flexDirection: 'row', alignItems: 'center', marginVertical: 5, width: w * 0.65 },
    barText: { width: 20, textAlign: 'center' },
    barContainer: { flex: 1, height: 10, backgroundColor: '#ccc', borderRadius: 5},
    barForeground: { height: "100%", backgroundColor: '#040051', borderRadius: 5 , zIndex: 1 , position :'absolute'},
    barBackground: { height: 10, backgroundColor: '#ccc', borderRadius: 5,zIndex: -1, width : "100%"},
    reviewWidget: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    reviewerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    initialCircle: { width: 40, height: 40, backgroundColor: '#040051', justifyContent: 'center', alignItems: 'center', borderRadius: 20 },
    initialText: { color: '#fff', fontSize: 18 },
    reviewerDetails: { marginLeft: 10 },
    reviewerName: { fontSize: 16 },
    reviewDate: { color: '#aaa' },
    reviewScore: { marginLeft: 'auto', fontSize: 16, },
    reviewText: { color: '#666' },
    button: { backgroundColor: '#040051', padding: 15, alignItems: 'center', margin: 20, borderRadius: 10 },
    buttonText: { color: '#fff', fontSize: 18 },
    // Modal styles
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
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15,
        alignItems: "center",
        marginBottom : 10
    },
    submitButtonText: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
  });


export default EventFeedbackScreen;


