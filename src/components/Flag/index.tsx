import React from "react";
import { styles } from "./styles";
import { Text, View } from "react-native";
import { themas } from "../../global/themes";

type Props = {
  title: string;
  code: string;
  color: string;
  selected?: boolean;
};
export function Flag({ ...rest }: Props) {

  const flags = [
    { titleFlag: "Fixo", code: "fixo", color: themas.colors.blueLigth },
    { titleFlag: "Parcelado", code: "parcelado", color: themas.colors.red },
    { titleFlag: "Receita", code: "receita", color: themas.colors.green },
  ];

  const flag = flags.find((item) => item.code == rest.code);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: flag?.color },
        rest?.selected && { borderWidth: 2 },
      ]}
    >
      <Text style={styles.code}>{flag.titleFlag}</Text>
    </View>
  );
}
