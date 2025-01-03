import React from "react";
import { styles } from "./styles";
import { Text, View } from "react-native";
type Props = {
  caption: string;
  color: string;
  selected?: boolean;
};
export function Flag({ ...rest }: Props) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: rest?.color },
        rest?.selected && { borderWidth: 2 },
      ]}
    >
      <Text style={styles.caption}>{rest.caption}</Text>
    </View>
  );
}
