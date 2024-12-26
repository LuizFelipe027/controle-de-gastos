import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const styles = StyleSheet.create({
  
  titleInput: {
    marginLeft: 5,
    color: themas.colors.gray,
    marginTop: 20
  },
  boxInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: themas.colors.lightGray,
    borderColor: themas.colors.lightGray
  },
  input: {
    height: '100%',
    width: '90%',
    borderRadius: 10,

  },
  icon: {
    width: "100%",
  },
  button: {
    width: '10%'
  }
});