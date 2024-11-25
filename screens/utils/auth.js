import AsyncStorage from '@react-native-async-storage/async-storage';


const storeAttendee = async (token, attendee) => {
    try{
        await AsyncStorage.setItem('attendee_id', attendee.attendee_id.toString())
        await AsyncStorage.setItem('email', attendee.email)
        await AsyncStorage.setItem('token', token)
    }catch(error){
        console.error('Error in storing ', error)
    }
}

const getAttendee = async () => {
    try{
        const token = await AsyncStorage.getItem('token')
        return token
    }catch(error){
        console.error('Error retrieving token:', error);
    }
}

const deleteAttendee = async () =>{
    try{
        await AsyncStorage.clear()
    }catch(error){
        console.error('Error in clearing ', error)
    }
}

const endSession = async (navigation) => {
    try {
      // Clear all session-related data
      await AsyncStorage.clear();
      console.log("Session ended. User data cleared.");
      
      // Navigate to the Login or Welcome screen
      navigation.replace("HomeScreen"); // or navigation.navigate("Login")
    } catch (error) {
      console.error("Error ending session:", error);
    }
  };

export {
    getAttendee,storeAttendee, deleteAttendee, endSession
}