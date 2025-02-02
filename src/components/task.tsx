import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TaskDTO } from "../dto/task";

type TaskProps = TaskDTO & {
  handleDone: (task: TaskDTO) => void;
  handleDelete: (task: TaskDTO) => void;
};

export default function Task({
  task, 
  done = false, 
  handleDone, 
  handleDelete
}: TaskProps) {
  return (
    <View style={styles.container}>
       <Text style={[styles.title, { textDecorationLine: done ? "line-through" : "none" }]}>{task}</Text>

      <TouchableOpacity style={styles.button} onPress={() => handleDone({} as TaskDTO)}>
        <Feather name="check" size={28} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleDelete({} as TaskDTO)}>
        <Feather name="delete" size={28} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
  },
  title: {
    flex: 1,
    fontSize: 18,
  },
  button: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 6,
    padding: 5,
  },
});
