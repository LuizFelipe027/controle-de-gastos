import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { themas } from "../../global/themes";

export default ({ state, navigation }) => {

  const go = (screenName: string) => {
    navigation.navigate(screenName);
  }

  return (
    <View style={styles.tabArea}>
      <TouchableOpacity style={styles.tabItem} onPress={() => go("List")}>
        <AntDesign
          name="bars"
          style={{
            opacity: state.index === 0 ? 1 : 0.2,
            color: themas.colors.primary,
            fontSize: 32,
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItemButton}>
        <View style={{ width: "100%", left: 10, top: 4 }}>
          <Entypo name="plus" size={40} color="white" />
        </View>

        <View
          style={{
            flexDirection: "row-reverse",
            width: "100%",
            bottom: 10,
            right: 10,
          }}
        >
          <MaterialIcons name="edit" size={30} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} onPress={() => go("User")}>
        <FontAwesome name="user" style={{
            opacity: state.index === 1 ? 1 : 0.2,
            color: themas.colors.primary,
            fontSize: 32,
          }} />
      </TouchableOpacity>
    </View>
  );
};
