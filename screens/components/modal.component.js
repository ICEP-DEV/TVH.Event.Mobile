import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';


const CustomModal = ({ isVisible, onClose, title, content }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          {content}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
{/*

 const CustomModal = ({ isVisible, onClose, title, content }) => (
  <Modal visible={isVisible} transparent animationType="slide">
    <View style={modalStyles.modalContainer}>
      <View style={modalStyles.modalContent}>
        <Text style={modalStyles.modalTitle}>{title}</Text>
        <View>{content}</View>
        <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
          <Text style={modalStyles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);
 */}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    maxHeight : '75%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    //alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width : '40%',
    marginTop: 10
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign : 'center'
  },
});

export default CustomModal;
