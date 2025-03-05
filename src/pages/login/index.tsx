import React, { useState } from "react";
import { styles } from "./styles";
// import Logo from "../../assets/logo.png";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Text, View, Image, Alert } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { MaterialIcons, Octicons } from "@expo/vector-icons";

export default function Login() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [email, setEmail] = useState("luiz");
  const [password, setPassword] = useState("12345");
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  async function getLogin() {
    try {
      setLoading(true);

      if (!email || !password) {
        return Alert.alert("Anteção", "Informe os campos obrigatórios!");
      }

      if (email === "luiz" && password === "12345") {
        return navigation.reset({ routes: [{ name: "BottomRoutes" }] });
      }

      Alert.alert("Atenção", "E-mail ou senha invalida!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxTop}>
        {/* <Image source={Logo} style={styles.logo} resizeMode="contain" /> */}
        <Text style={styles.text}>Login</Text>
      </View>
      <View style={styles.boxMid}>
        <Input
          title="Endereço de e-mail"
          value={email}
          onChangeText={setEmail}
          IconRigth={MaterialIcons}
          iconRightName="email"
          onIconRigthPress={() => console.log("OLA")}
          keyboardType="email-address"
        />
        <Input
          title="Senha"
          value={password}
          onChangeText={setPassword}
          IconRigth={Octicons}
          iconRightName={showPassword ? "eye-closed" : "eye"}
          onIconRigthPress={() => setShowPassword(!showPassword)}
          secureTextEntry={true}
          multiline={false}
          keyboardType="default"
        />
      </View>
      <View style={styles.boxBottom}>
        <Button text="ENTRAR" loading={loading} onPress={() => getLogin()} />
      </View>
      <Text style={styles.textBottom}>
        Não tem conta? <Text style={styles.textBottomCreate}>Crie agora</Text>
      </Text>
    </View>
  );
}
