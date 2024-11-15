import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeedbackAndReview = () => {
  return (
    <View style={styles.container}>
      <Text>FeedbackAndReview Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeedbackAndReview;