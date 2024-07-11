import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import Task from "./components/Task";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task) {
      // task state'i doluysa ekleme işlemi yap
      setTaskItems([...taskItems, task]);
      setTask(null);
    }
  };

  const deleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <GestureHandlerRootView>
      <ImageBackground
        source={require("./assets/todo-bg.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          {/* Günün Yapılacakları */}
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Günün yapılacakları</Text>
            <View style={styles.items}>
              {/* Yapılacaklar listesi buraya gelecek */}
              {taskItems.map((item, index) => (
                <Task
                  key={index}
                  text={item}
                  onDelete={() => deleteTask(index)}
                />
              ))}
            </View>
          </View>

          {/* Yapılacaklar listesine ekleme yapmak */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.writeTaskWrapper}
          >
            <TextInput
              style={styles.input}
              placeholder={"Yapmayı planladığınız bir şey yazın"}
              onChangeText={(text) => setTask(text)}
              value={task}
            />
            <TouchableOpacity onPress={handleAddTask}>
              <View style={styles.addWrapper}>
                <Text style={styles.addText}>+</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#F5F5F5",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  addText: {},
});
