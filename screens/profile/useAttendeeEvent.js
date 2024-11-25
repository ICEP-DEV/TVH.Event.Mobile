import axios from 'axios';
import { useEffect, useState } from 'react';
import api from '../../APIs/API';

export default function useAttendeeEvents(attendeeId) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const getAttendeeEvents = async () => {
      try {
        // API call to fetch events
        const response = await axios.get(api + "/attendee/events/" + attendeeId);
        
        // Map the results to create menu items
        const events = response.data.results.map((event) => ({
          id: event.event_id,
          title: event.name, // Assuming 'name' is the event title
          onPress: () => console.log(`${event.name} Pressed`),
        }));
        
        // Update the menuItems state
        setMenuItems(events);
      } catch (error) {
        console.error("Error fetching attendee events:", error.message);
      }
    };

    getAttendeeEvents();
  }, [attendeeId]);

  return menuItems;
}
