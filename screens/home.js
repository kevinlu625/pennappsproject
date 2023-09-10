import { View, Text, SafeAreaView } from "react-native";
import React, { useState, useEffect, useRef } from "react";
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
  FlatList,
  Animated,
} from "react-native";

const home = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [answer, setAnswer] = useState(""); // State to store the user's answer
  const [answer2, setAnswer2] = useState(""); // State to store the user's answer
  const [answer3, setAnswer3] = useState(""); // State to store the user's answer
  const [answer4, setAnswer4] = useState(""); // State to store the user's answer
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const typingAnimation = new Animated.Value(0);

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

  const handleAnswerChange3 = (text) => {
    setAnswer3(text);
  };

  const handleAnswerChange4 = (text) => {
    setAnswer4(text);
  };

  const [flowerData, setFlowerData] = useState(gridData);
  const flowerGridRef = useRef();

  const submitAnswer = () => {
    // You can handle the submission logic here
    console.log("This is users plant type:", answer);
    console.log("This is users planting situation:", answer2);

    const newEntry = {
      title: answer,
      description: answer2,
    };

    const url =
      "http://127.0.0.1:5000/recommend/${answer3}/${answer4}/${answer}/${answer2}";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Handle the JSON response data here
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Fetch error:", error);
      });

    // Add the new entry to the existing array
    flowerGridRef.current.addNewFlower(newEntry);

    if (answer.trim() === "") return;

    // Start the typing animation
    setIsTyping(true);

    // Simulate a bot response (you can replace this with actual bot logic)
    setTimeout(() => {
      const botResponse =
        "This is a bot response.asdfasdfasdfasdfasdfasdfasdfasdfadsfasdfasdfasdfadfasdfasdfasdfasdfasdfdasdfasdfasdfasdfadsfasdf";
      setMessages([...messages, { text: botResponse, isUser: false }]);
      setIsTyping(false); // Stop the typing animation
    }, 0); // Simulated delay for the bot response
  };

  useEffect(() => {
    if (isTyping) {
      Animated.timing(typingAnimation, {
        toValue: 1,
        duration: 20, // Typing speed
        useNativeDriver: false,
      }).start();
    } else {
      typingAnimation.setValue(0);
    }
  }, [isTyping]);

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
                <TouchableOpacity onPress={toggleModal}>
                  <Image
                    source={require("../assets/xicon.png")}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 5,
                      left: 280,
                      bottom: 15,
                    }} // Adjust the width and height as needed
                  />
                </TouchableOpacity>

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
                <Text>Question 3: What city & state are you in?</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleAnswerChange3}
                  value={answer3}
                  placeholder="Your answer"
                />
                <Text>Question 4: What season are you in?</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleAnswerChange4}
                  value={answer4}
                  placeholder="Your answer"
                />
                {/* Add input fields, radio buttons, checkboxes, etc. */}
                <Button title="Submit" onPress={submitAnswer} />
              </View>

              <FlatList
                data={messages}
                renderItem={({ item }) => (
                  <View
                    style={item.isUser ? styles.userMessage : styles.botMessage}
                  >
                    <Text style={styles.messageText}>{item.text}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
              {isTyping && (
                <View style={styles.typingContainer}>
                  <Animated.View
                    style={[
                      styles.typingIndicator,
                      {
                        opacity: typingAnimation,
                      },
                    ]}
                  />
                </View>
              )}
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
        <ExpandingGrid ref={flowerGridRef} data={flowerData} />
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
    paddingTop: 125,
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
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    padding: 8,
    marginVertical: 4,
    marginRight: 20,
    marginLeft: 20,
  },
  messageText: {
    fontSize: 16,
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  typingIndicator: {
    backgroundColor: "#EFEFEF",
    height: 8,
    width: 24,
    borderRadius: 4,
    marginRight: 8,
  },
});

export default home;
