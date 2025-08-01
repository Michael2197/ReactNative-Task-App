import { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import TaskItem from '@/components/TaskItem'; // ✅ Connect to your animated task component

// ⚙️ Enable layout animations on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ExploreScreen() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [newTask, setNewTask] = useState('');

  // 🧠 Add a task
  const handleAddTask = () => {
    if (newTask.trim()) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  };

  // 🧠 Delete a task
  const handleDeleteTask = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setCompletedTasks(completedTasks.filter(i => i !== index));
  };

  // 🧠 Toggle completion state
  const toggleCompletion = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter(i => i !== index));
    } else {
      setCompletedTasks([...completedTasks, index]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Tasks</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a new task..."
          value={newTask}
          onChangeText={setNewTask}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <TaskItem
            task={{ text: item, completed: completedTasks.includes(index) }}
            onToggle={() => toggleCompletion(index)}
            onDelete={() => handleDeleteTask(index)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#F6F8FC',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    color: '#2c3e50',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DCE0EA',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  addButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 18,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 24,
  },
});