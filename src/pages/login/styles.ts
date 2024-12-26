import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxTop: {
    height: Dimensions.get('window').height / 3,
    width: '100%',
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxMid: {
    height: Dimensions.get('window').height / 4,
    width: '100%',
    paddingHorizontal: 37
  },
  boxBottom: {
    height: Dimensions.get('window').height / 3,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    marginTop: 40,
    fontSize: 18
  },
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
  button: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themas.colors.primary,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
  textButton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
  textBottom: {
    fontSize: 14,
    marginTop: 20,
    color: themas.colors.gray
  }
});