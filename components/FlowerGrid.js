import { View, Text } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity, FlatList, StyleSheet } from "react-native";

const FlowerGrid = ({ data }) => {
  const [gridData, setGridData] = useState(data);
  const renderItem = ({ item }) => {
    const toggleExpansion = (itemId) => {
      setGridData((prevData) =>
        prevData.map((item) => {
          if (item.id === itemId) {
            return { ...item, isExpanded: !item.isExpanded };
          }
          return item;
        })
      );
    };

    return (
      <TouchableOpacity onPress={toggleExpansion}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          {item.isExpanded && (
            <Text style={styles.cardDescription}>{item.description}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white", // Background color of the card
    borderRadius: 10, // Border radius to create rounded corners
    padding: 16, // Padding inside the card
    marginBottom: 10, // Spacing between cards
    marginRight: 15,
    borderWidth: 2, // Border width
    borderColor: "#ccc", // Border color
    shadowColor: "rgba(0,0,0,0.2)", // Shadow color (if you want to add shadows)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.8, // Shadow opacity
    shadowRadius: 2, // Shadow radius
    elevation: 3, // Elevation for Android (if you want to add elevation)]
    width: 185,
    height: 250,
  },
  cardTitle: {
    fontSize: 45,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default FlowerGrid;
