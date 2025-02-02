import { View, ViewProps } from 'react-native';
import { Colors } from '@/constants/Colors';

export function ThemedView(props: ViewProps) {
  const { style, ...otherProps } = props;

  return (
    <View
      style={[
        { backgroundColor: Colors.light.background },
        style
      ]}
      {...otherProps}
    />
  );
}
