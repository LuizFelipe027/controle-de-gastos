import React from "react";
import { styles } from "./styles";
import { ActivityIndicator, View } from "react-native";
type Props = {
  loading: boolean;
};
export function Loading({ ...rest }: Props) {
  if (!rest.loading) return <></>;
  return (
    <View style={styles.container}>
      <ActivityIndicator color={"white"} size={"large"} />
    </View>
  );
}
