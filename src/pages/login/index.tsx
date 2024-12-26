import React from "react";
import { Text, View, Alert } from "react-native";
import { styles } from "./styles";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [email, setEmail] = React.useState("a");
  const [password, setPassword] = React.useState("a");
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(true);

  async function getLogin() {
    try {
      setLoading(true);

      if (!email || !password) {
        return Alert.alert("Atenção", "Preencha todos os campos");
      }

      navigation.reset({ routes: [{ name: "BottomRoutes" }] });

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
        <Input
          value={email}
          onChangeText={setEmail}
          title="Email"
          IconRight={MaterialIcons}
          iconRightName="email"
        />
        <Input
          value={password}
          onChangeText={setPassword}
          title="Senha"
          IconRight={Octicons}
          iconRightName={showPassword ? "eye-closed" : "eye"}
          secureTextEntry={showPassword}
          onIconRightPress={() => setShowPassword(!showPassword)}
        />
      </View>

      <View style={styles.boxBottom}>
        <Button text="Entrar" loading={loading} onPress={getLogin} />
      </View>

      <Text style={styles.textBottom}>Não tem conta? Cadastre-se!</Text>
    </View>
  );
}
