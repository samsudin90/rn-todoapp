import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [data, setData] = useState()
  const [task, setTask] = useState([])

  const addTask = () => {
    Keyboard.dismiss()
    setTask([...task, data])
    setData(null)
  }

  const deleteTask = (index) => {
    let cp = [...task]
    cp.splice(index, 1)
    setTask(cp)
  }

  return (
    <View style={styles.container}>
      {/* title */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.item}>
          {
            task.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={(index) => deleteTask(index)} >
                  <Task text={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
      {/* input */}
      {/* keyboard avoid untuk dinamis ketika keybord akrif */}
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.wrapInput}>
        <TextInput style={styles.input} placeholder='masukan' value={data} onChangeText={text => setData(text)} />
        <TouchableOpacity onPress={() => addTask()} >
          <View style={styles.wrapAdd} >
            <Text style={styles.add} >+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed'
  },
  taskWrapper: {
    paddingTop: 80,
    margin: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  item: {
    marginTop: 20
  },
  wrapInput: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#c0c0c0',
    width: 250
  },
  wrapAdd: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0c0c0',
    borderWidth:1
  },
  add: {
    fontSize: 32
  }
});
