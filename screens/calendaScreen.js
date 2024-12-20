import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Agenda, Calendar } from 'react-native-calendars';
import axios from 'axios';
import api from '../APIs/API';


const { width: w, height : h } = Dimensions.get("window");

const CalendarScreen = () => {
    const [selected, setSelected] = useState('');
    const [allEvents, setAllEvents] = useState([])
    const [markedDates, setMarkedDates] = useState({})
    const [filteredEvents, setFilteredEvents] = useState([]);


    useEffect(()=>{
        const createMarkedDates = (events) =>{
            let temp = {}
            events.map((event) =>{
                const date = event.start_date.split('T')[0]
                temp[date] = {marked : true, selectedColor: '#007bff', selected:true}
            })
            setMarkedDates(temp);
        }
        
        const getAllEvents = async()=>{
            await axios.get(
                api + "/event/calendar"
            ).then((response) =>{
                setAllEvents(response.data.results)
                createMarkedDates(response.data.results)
            }).catch((error) =>{
                console.log("Error getting events : " + error)
            })
        }
        getAllEvents()
    }, [])


    useEffect(() => { 
        if (selected) { 
            const eventsForSelectedDate = allEvents.filter(
                event => event.start_date.split('T')[0] === selected); 
                setFilteredEvents(eventsForSelectedDate); 
            } 
        }, [selected, allEvents]);


    return <View style={styles.screenContainer}>
        <Text style={{fontSize:24, paddingTop : h * 0.05, textAlign:'center'}}>Events Calendar</Text>
        <Calendar
            onDayPress={day => {
                setSelected(day.dateString);
            }}
            markedDates={markedDates}
            style={styles.calendar}
        />

        <View style={styles.eventsContainer}> 
            
            {
                filteredEvents.length > 0 ? ( 
                    <View >
                        <Text style={{fontSize:24, marginBottom: '5%'}}>Events</Text>
                        {
                            filteredEvents.map((event) => (
                                <View key={event} style={styles.eventContainer}>
                                    <Text>{event.title}</Text>
                                </View>
                            ))
                        }
                    </View>
                ) : <></>
            } 
        </View>
    </View>
};

const styles = StyleSheet.create({
    screenContainer : {
        height : h,
        backgroundColor : "#fff",
    },
    calendar : {
        paddingHorizontal : w * 0.01
    },
    eventsContainer : {
        marginTop : h * 0.05,
        marginHorizontal : w * 0.05
    },
    eventContainer : {
        backgroundColor : '#eee',
        padding : '5%',
        borderRadius : 10,
        marginBottom : '2%'
    }
});

export default CalendarScreen;
