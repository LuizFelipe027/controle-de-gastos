import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";


export const styles = StyleSheet.create({
  boxInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: themas.colors.lightGray,
    backgroundColor: themas.colors.bgScreen,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // paddingHorizontal:20
  },
  input: {
    // backgroundColor:'red',
    height: '100%',
    width: '100%',
    borderRadius: 40,
    // paddingHorizontal:20
  },
  titleInput: {
    marginLeft: 5,
    color: themas.colors.gray,
    marginTop: 20
  },
  button: {
    width: '10%',
  },
  icon: {
    width: '100%',
  }

})