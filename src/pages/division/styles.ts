import { StyleSheet, Dimensions } from "react-native";
import { themas } from "../../global/themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent:'center'
  },
  header: {
    width: '100%',
    height: Dimensions.get('window').height / 6,
    backgroundColor: themas.colors.primary,
    // alignItems:'center',
    justifyContent: 'center',
    paddingHorizontal: 20,

  },
  greeting: {
    fontSize: 20,
    color: '#FFF',
    marginTop: 20
  },
  boxInput: {
    width: '90%'
  },
  boxList: {
    flex: 1,
    width: '100%',
    // backgroundColor:'red'
  },
  card: {
    width: '100%',
    minHeight: 60,
    backgroundColor: '#FFF',
    marginTop: 6,
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: themas.colors.lightGray
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleCard: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  descriptionCard: {
    color: themas.colors.gray
  },
  rowCardLeft: {
    width: '70%',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  Button: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    marginVertical: 10,
    borderRadius: 10,
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  resultContainer: {
    width: 350,
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  resultLabel: {
    fontSize: 16,
    color: "#333",
  },
  resultValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    fontSize: 24,
    marginRight: 10,
    color: "#FFF",
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 18,
  },
  modalButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
})