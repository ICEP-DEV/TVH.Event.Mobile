import AsyncStorage from '@react-native-async-storage/async-storage';



const getAttendee = async () => {
    try{
        const attendee = await AsyncStorage.getItem('attendee')
        return attendee !== null ? attendee : null
    }catch(error){
        console.error('Error retrieving token:', error);
    }
}


export {
    getAttendee
}