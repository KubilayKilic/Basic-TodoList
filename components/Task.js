import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const Task = ({ text, onDelete }) => {
  const [completed, setCompleted] = useState(false);
  const [isOpen, setIsOpen] = useState(null);

  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  const handleSwipeBegin = (index) => {
    setIsOpen(index);
  };

  const handleSwipeComplete = () => {
    setIsOpen(null);
  };

  const renderRightActions = (index) => (
    <TouchableOpacity
      onPress={() => onDelete(index)}
      style={styles.deleteButton}
    >
      <Text style={styles.deleteText}>Sil</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable
      renderRightActions={() => renderRightActions(text)}
      key={text}
      onSwipeableWillOpen={() => handleSwipeBegin(text)}
      onSwipeableClose={handleSwipeComplete}
    >
      <TouchableOpacity
        style={[
          styles.item,
          completed ? styles.completedItem : null,
          isOpen === text ? styles.swipingItem : null,
        ]}
        onPress={toggleCompleted}
      >
        <View style={styles.itemLeft}>
          <View style={styles.square}></View>
          <Text style={styles.itemText}>{text}</Text>
        </View>
        <View
          style={[styles.circular, completed ? styles.completedCircular : null]}
        ></View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#4EBDDC", // Deniz mavisi tonu
    borderRadius: 12, // Daha yuvarlatılmış köşeler
    marginRight: 15,
  },

  itemText: {
    maxWidth: "80%",
    fontSize: 16,
  },
  circular: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#55BCF6",
  },
  completedItem: {
    opacity: 0.6,
  },
  completedCircular: {
    backgroundColor: "#4CAF50", // Yeşil renk
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    justifyContent: "center",
    alignItems: "center",
    width: 52,
    height: 52,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
  swipingItem: {
    transform: [{ translateX: -52 }], // Swipe işlemi tamamlandığında öğeyi sola kaydır
  },
});

export default Task;
