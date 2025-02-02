import { Text, TextProps } from 'react-native';
import { Colors } from '@/constants/Colors';

export function ThemedText(props: TextProps) {
  const { style, ...otherProps } = props;

  return (
    <Text
      style={[
        { color: Colors.light.text },
        style
      ]}
      {...otherProps}
    />
  );
}
