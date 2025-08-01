import { useRef, useEffect } from "react";
import { Animated, View, Text, TouchableOpacity } from "react-native";
import { Task } from "@/types/task";
import Icon from 'react-native-vector-icons/Ionicons';

export default function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  // 🎯 Animate task appearance: fade in + slide from bottom
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // 🗑 Animate task removal: fade out + slide upward
  const handleDelete = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -20,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDelete();
    });
  };

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        opacity,
        margin: 8,
        backgroundColor: "#FFFFFF",
        padding: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          onPress={onToggle}
          style={{
            flex: 1,
            fontSize: 16,
            color: task.completed ? "#C1C1C1" : "#1E1E1E",
            textDecorationLine: task.completed ? "line-through" : "none",
          }}
        >
          {task.text}
        </Text>
        <TouchableOpacity onPress={onDelete}>
          <Icon name="trash-outline" size={22} color="#FF4C4C" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
