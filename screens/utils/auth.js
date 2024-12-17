import AsyncStorage from '@react-native-async-storage/async-storage';


const storeAttendee = async (token, attendee) => {
    try{
        await AsyncStorage.setItem('attendee', JSON.stringify(attendee))
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
      

      navigation.replace("HomePage"); 
    } catch (error) {
      console.error("Error ending session:", error);
    }
  };



export {
    getAttendee,storeAttendee, deleteAttendee, endSession
}