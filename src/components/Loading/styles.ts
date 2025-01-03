import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";


export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
    backgroundColor: themas.colors.blackTransparent,
    alignItems: 'center',
    justifyContent: 'center'
  }
})