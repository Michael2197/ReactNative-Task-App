import { View, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function TaskInput({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState('');

  return (
    <View style={{ flexDirection: 'row' }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Add Task"
        style={{ flex: 1, borderWidth: 1, margin: 8 }}
      />
      <Button title="Add" onPress={() => { onAdd(text); setText(''); }} />
    </View>
  );
}