import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import axios from 'axios';
import api from "../APIs/API";
import { Rating , Icon } from "react-native-elements";


const { height: h, width: w } = Dimensions.get("window");

const EventFeedbackScreen = ({route, navigation})=>{
    const {event} = route.params;
    const [allReviews, setAllReviews] = useState([]);

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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Write Review</Text>
      </TouchableOpacity>
    </View>
}



const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { height: h * 0.12, backgroundColor : '#040051', justifyContent: 'flex-start', paddingHorizontal: 20, display: 'flex', flexDirection:'row', alignItems : 'flex-end', paddingBottom : 10 },
    headerText: { color: '#fff', fontSize: 24 },
    title: { fontSize: 22, padding: 20 },
    summaryContainer: { left: 0 ,flexDirection: 'row', padding: 20 },
    averageScore: { marginRight: 20 },
    averageText: { fontSize: 34 },
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
  });


export default EventFeedbackScreen;


