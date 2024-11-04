import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FormField from "./formField";

export default function RegistrationForm() {
  const formFields = [
    {
      number: "1",
      label: "Please enter your full name.",
      inputType: "text",
    },
    {
      number: "2",
      label: "What is your email address?",
      inputType: "email",
    },
    {
      number: "3",
      label: "Have you attended a hackathon before? (Yes/No)",
      inputType: "select",
    },
    {
      number: "4",
      label: "Do you have any dietary restrictions?",
      inputType: "text",
    },
  ];

  return (
    <View style={styles.formContainer}>
      {formFields.map((field, index) => (
        <FormField
          key={index}
          number={field.number}
          label={field.label}
          inputType={field.inputType}
        />
      ))}
      <TouchableOpacity
        style={styles.submitButton}
        accessibilityRole="button"
        accessibilityLabel="Submit registration form"
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    borderRadius: 20,
    borderColor: "rgba(88, 200, 66, 1)",
    borderWidth: 2,
    marginTop: 19,
    paddingBottom: 11,
  },
  submitButton: {
    borderRadius: 10,
    backgroundColor: "rgba(72, 103, 183, 1)",
    alignSelf: "center",
    marginTop: 15,
    width: 146,
    paddingVertical: 12,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Nunito, sans-serif",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1,
  },
});
