import React from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { themas } from "../../global/themes";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function getLogin() {
    try {
      setLoading(true);

      if (!email || !password) {
        return Alert.alert("Atenção", "Preencha todos os campos");
      }

      console.log("email: ", email);
      console.log("password: ", password);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxTop}>
        <Text style={styles.text}> Login </Text>
      </View>

      <View style={styles.boxMid}>
        <Text style={styles.titleInput}> Endereço de Email </Text>
        <View style={styles.boxInput}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <MaterialIcons name="email" size={20} color={themas.colors.gray} />
        </View>

        <Text style={styles.titleInput}> Senha </Text>
        <View style={styles.boxInput}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <MaterialIcons
            name="remove-red-eye"
            size={20}
            color={themas.colors.gray}
          />
        </View>
      </View>

      <View style={styles.boxBottom}>
        <TouchableOpacity style={styles.button} onPress={getLogin}>
          {loading ? (
            <ActivityIndicator color={themas.colors.secondary} size={'small'}/>
          ) : (
            <Text style={styles.textButton}> Entrar </Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.textBottom}>Não tem conta? Cadastre-se!</Text>
    </View>
  );
}
