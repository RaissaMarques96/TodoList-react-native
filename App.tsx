import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './src/components/task';
import React, { useState } from 'react';
import { TaskDTO } from './src/dto/task';
import {Feather} from "@expo/vector-icons"

export default function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState<TaskDTO[]>([])

  function handleInsert(){
    if(task){
      setTasks([...tasks, {
        id: Math.random(),
        task,
        done: false
      }])
      setTask("")
    } else{
      Alert.alert("Atenção", "O campo precisa ser preenchido")
    }
  }
  function handleDelete(item: TaskDTO){
    const tasksFiltered = tasks.filter(task => task.id!==item.id)
    setTasks(tasksFiltered)
    Alert.alert("Sucesso", "Task deletada com sucesso")
  }
  function handleDone(item: TaskDTO){
    const tasksCopy = tasks
    const index = tasksCopy.indexOf(item)
    tasksCopy[index].done = !tasks[index].done
    setTasks(tasksCopy)
    Alert.alert("Marcou como concluída")
  }
  
  return (
    <SafeAreaView style={{flex:1}}>
    <View  style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
        value={task}
        onChangeText={setTask}
        style={styles.input}
        placeholder='Digite a task...'
        />

      <TouchableOpacity style={styles.button} onPress={handleInsert}>
        <Feather name='plus' size={28}/>
      </TouchableOpacity>    
    </View>
     <FlatList
     data={tasks}
     keyExtractor={item => String(item.id)}
     contentContainerStyle={{
      gap:10
     }}
     renderItem={({item}) => (
      <Task
      task={item.task}
      done={item.done}
      handleDone={() => handleDone(item)}
      handleDelete={() =>handleDelete(item)}
      />
      )}
      />
    </View>
    </SafeAreaView>
    
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 40,
    paddingHorizontal: 20,
  },
inputContainer:{
  flexDirection: "row",
  alignItems:"center",
  gap:5,
  marginBottom: 30,
},

  input:{
    height: 40,
    fontSize: 10,
    borderWidth: 1,
    borderColor: "#999",
    paddingHorizontal: 10,
    flex:1,
    borderRadius: 6
  },
  button: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 6,
    padding: 5,
  },
});
