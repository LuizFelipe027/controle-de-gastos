import React from "react";
import { styles } from "./styles";
import { View } from "react-native";
type Props = {
  color: string;
};
export function Ball({ ...rest }: Props) {
  return (
    <View
      style={[styles.ball, { borderColor: rest.color ? rest.color : "gray" }]}
    />
  );
}
