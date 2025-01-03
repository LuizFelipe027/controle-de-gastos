import React, { useState, useContext, useRef } from "react";
import { styles } from "./styles";
import { Ball } from "../../components/Ball";
import { Input } from "../../components/Input";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Flag } from "../../components/Flag";
import { themas } from "../../global/themes";
import { AuthContextList } from "../../context/authContext_list";
import { Text, View, StatusBar, FlatList } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { formatDateToBR } from "../../global/functions";

export default function List() {
  const { taskList, handleDelete, handleEdit, filter } =
    useContext<AuthContextType>(AuthContextList);

  const swipeableRefs = useRef([]);

  const renderRightActions = () => (
    <View style={styles.Button}>
      <AntDesign name="delete" size={20} color={"#FFF"} />
    </View>
  );
  const renderLeftActions = () => (
    <View style={[styles.Button, { backgroundColor: themas.colors.blueLigth }]}>
      <AntDesign name="edit" size={20} color={"#FFF"} />
    </View>
  );

  const handleSwipeOpen = (direction, item, index) => {
    if (direction === "right") {
      handleDelete(item);
      swipeableRefs.current[index]?.close();
    } else if (direction === "left") {
      handleEdit(item);
      swipeableRefs.current[index]?.close();
    }
  };

  const _renderCard = (item: PropCard, index: number) => {
    const color =
      item.flag == "opcional" ? themas.colors.blueLigth : themas.colors.red;
    return (
      <Swipeable
        ref={(ref) => (swipeableRefs.current[index] = ref)}
        key={item.item}
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        onSwipeableOpen={(direction) => handleSwipeOpen(direction, item, index)}
      >
        <View style={styles.card}>
          <View style={styles.rowCard}>
            <View style={styles.rowCardLeft}>
              <Ball color={color} />
              <View>
                <Text style={styles.titleCard}>{item.title}</Text>
                <Text style={styles.descriptionCard}>{item.description}</Text>
                <Text style={styles.descriptionCard}>
                  até {formatDateToBR(item.timeLimit)}
                </Text>
              </View>
            </View>
            <Flag caption={item.flag} color={color} />
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Bom dia, <Text style={{ fontWeight: "bold" }}>Luiz Felipe</Text>
        </Text>
        <View style={styles.boxInput}>
          <Input
            IconLeft={MaterialIcons}
            iconLeftName="search"
            onChangeText={(t) => filter(t)}
          />
        </View>
      </View>
      <View style={styles.boxList}>
        <FlatList
          data={taskList}
          style={{ marginTop: 40, paddingHorizontal: 30 }}
          keyExtractor={(item, index) => item.item.toString()}
          renderItem={({ item, index }) => {
            return _renderCard(item, index);
          }}
        />
      </View>
    </View>
  );
}
