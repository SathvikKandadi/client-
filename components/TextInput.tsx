import { TextInput as RNTextInput, TextInputProps, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export function TextInput(props: TextInputProps) {
  return (
    <RNTextInput
      placeholderTextColor={Colors.light.text + '66'}
      style={[styles.input, props.style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    color: Colors.light.text,
    fontSize: 16,
  },
}); 