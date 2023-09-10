import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import ExpandingGrid from "../components/FlowerGrid";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Button,
  TextInput,
} from "react-native";

const home = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [answer, setAnswer] = useState(""); // State to store the user's answer
  const [answer2, setAnswer2] = useState(""); // State to store the user's answer
  const gridData = [
    {
      id: "1",
      title: "Item 1",
      description: "Description 1",
      isExpanded: false,
    },
    {
      id: "2",
      title: "Item 2",
      description: "Description 2",
      isExpanded: false,
    },
    {
      id: "3",
      title: "Item 2",
      description: "Description 2",
      isExpanded: false,
    },
    {
      id: "4",
      title: "Item 2",
      description: "Description 2",
      isExpanded: false,
    },
    {
      id: "5",
      title: "Item 2",
      description: "Description 2",
      isExpanded: false,
    },

    // Add more items as needed
  ];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAnswerChange = (text) => {
    setAnswer(text);
  };

  const handleAnswerChange2 = (text) => {
    setAnswer2(text);
  };

  const submitAnswer = () => {
    // You can handle the submission logic here
    console.log("This is users plant type:", answer);
    console.log("This is users planting situation:", answer2);

    // Close the modal
    toggleModal();
  };

  return (
    <SafeAreaView>
      <View style={{ paddingHorizontal: 20, paddingVertical: 25 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 50,
              fontWeight: 800,
              color: COLORS.black,
              marginRight: 125,
            }}
          >
            Hi Kevin
          </Text>
          <TouchableOpacity onPress={toggleModal}>
            <Image
              source={require("../assets/shovel.png")}
              style={{
                width: 40,
                height: 40,
                borderRadius: 5,
              }} // Adjust the width and height as needed
            />
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {/* Add your questionnaire components here */}
                <Text>Question 1: What are you looking to plant/grow?</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleAnswerChange}
                  value={answer}
                  placeholder="Your answer"
                />
                <Text>Question 2: Describe your planting space.</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleAnswerChange2}
                  value={answer2}
                  placeholder="Your answer"
                />
                {/* Add input fields, radio buttons, checkboxes, etc. */}
                <Button title="Submit" onPress={submitAnswer} />
              </View>
            </View>
          </Modal>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
              marginVertical: 4,
            }}
          >
            Welcome to your personal gardening assistant
          </Text>
        </View>
        <ExpandingGrid data={gridData} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default home;
