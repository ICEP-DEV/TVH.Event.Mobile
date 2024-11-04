import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function FormField({ number, label, inputType }) {
  return (
    <View style={styles.fieldContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.numberText}>{number}.</Text>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <TextInput
        style={styles.input}
        accessibilityLabel={label}
        textContentType={inputType === "email" ? "emailAddress" : "none"}
        keyboardType={inputType === "email" ? "email-address" : "default"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    padding: 16,
  },
  labelContainer: {
    flexDirection: "row",
    gap: 11,
    marginBottom: 12,
  },
  numberText: {
    fontSize: 22,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
  },
  labelText: {
    fontSize: 14,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
    alignSelf: "center",
  },
  input: {
    borderRadius: 25,
    borderColor: "rgba(72, 103, 183, 1)",
    borderWidth: 1,
    height: 55,
    paddingHorizontal: 15,
  },
});
