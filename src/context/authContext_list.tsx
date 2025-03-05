import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { themas } from "../global/themes";
import { Flag } from "../components/Flag";
import { Input } from "../components/Input";
import { InputModal } from "../components/InputModal";
import { Modalize } from "react-native-modalize";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomDateTimePicker from "../components/CustomDateTimePicker";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Loading } from "../components/Loading";

export const AuthContextList: any = createContext({});

const flags = [
  { titleFlag: "Fixo", code: "fixo", color: themas.colors.blueLigth },
  { titleFlag: "Parcelado", code: "parcelado", color: themas.colors.red },
  { titleFlag: "Receita", code: "receita", color: themas.colors.green },
];

export const AuthProviderList = (props) => {
  const modalizeRef = useRef<Modalize>(null);
  const [description, setDescription] = useState("");
  const [valueRecord, setValueRecord] = useState("");
  const [accounted, setAccounted] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState(flags[0].code);
  const [taskList, setTaskList] = useState([]);
  const [taskListBackup, setTaskListBackup] = useState([]);
  const [item, setItem] = useState(0);
  const [loading, setLoading] = useState(false);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  useEffect(() => {
    initPageList();
  }, []);

  const getTaskList = async () => {
    const storedData = await AsyncStorage.getItem("taskList");
    let taskList = storedData ? JSON.parse(storedData) : [];

    const flagOrder = { receita: 1, parcelado: 2, fixo: 3 }; // Custom order for flags

    taskList.sort((a, b) => {
      // Primary sorting: by flag (based on custom order)
      if (flagOrder[a.flag] < flagOrder[b.flag]) return -1;
      if (flagOrder[a.flag] > flagOrder[b.flag]) return 1;

      // Secondary sorting: by accounted (true first)
      if (a.accounted === true && b.accounted === false) return -1;
      if (a.accounted === false && b.accounted === true) return 1;

      return 0; // Equal values remain in the same order
    });

    return taskList;
  };

  async function initPageList() {
    try {
      setLoading(true);

      let taskList = await getTaskList();

      setTaskList(taskList);
      setTaskListBackup(taskList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const filter = (t: string) => {
    if (taskList.length == 0) return;
    const array = taskListBackup;
    const campos = ["title", "description"];
    if (t) {
      const searchTerm = t.trim().toLowerCase();

      const filteredArr = array.filter((item) => {
        for (let i = 0; i < campos.length; i++) {
          if (item[campos[i].trim()].trim().toLowerCase().includes(searchTerm))
            return true;
        }
      });

      setTaskList(filteredArr);
    } else {
      setTaskList(array);
    }
  };

  const handleSave = async () => {
    const newItem = {
      item: item !== 0 ? item : Date.now(),
      description,
      valueRecord,
      accounted,
      flag: selectedFlag,
    };
    onClose();

    try {
      setLoading(true);

      let taskList = await getTaskList();

      // Verifica se o item já existe no array
      const itemIndex = taskList.findIndex(
        (task) => task.item === newItem.item
      );

      if (itemIndex >= 0) {
        // Substitui o item existente pelo novo
        taskList[itemIndex] = newItem;
      } else {
        // Adiciona o novo item ao array
        taskList.push(newItem);
      }

      await AsyncStorage.setItem("taskList", JSON.stringify(taskList));
      setTaskList(taskList);
      setTaskListBackup(taskList);
      setData();
    } catch (error) {
      console.error("Erro ao salvar o item:", error);
      onOpen();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (itemToEdit: PropCard) => {
    setDescription(itemToEdit.description);
    setValueRecord(itemToEdit.valueRecord);
    setAccounted(itemToEdit.accounted);
    setSelectedFlag(itemToEdit.flag);
    setItem(itemToEdit.item);

    onOpen();
  };

  const handleDelete = async (itemToDelete) => {
    try {
      setLoading(true);

      const taskList = await getTaskList();

      const updatedTaskList = taskList.filter(
        (item) => item.item !== itemToDelete.item
      );

      await AsyncStorage.setItem("taskList", JSON.stringify(updatedTaskList));
      setTaskList(updatedTaskList);
      setTaskListBackup(updatedTaskList);
    } catch (error) {
      console.error("Erro ao excluir o item:", error);
    } finally {
      setLoading(false);
    }
  };

  const _renderFlags = () => {
    return flags.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setSelectedFlag(item.code);
        }}
      >
        <Flag
          title={item.titleFlag}
          code={item.code}
          color={item.color}
          selected={item.code == selectedFlag}
        />
      </TouchableOpacity>
    ));
  };

  const setData = () => {
    setDescription("");
    setValueRecord("");
    setAccounted(false);
    setSelectedFlag(flags[0].code);
    setItem(0);
  };

  const handleChangeText = (text) => {
    // Remove todos os caracteres que não sejam números
    const numericValue = text.replace(/\D/g, "");

    // Converte o número para o formato "0,00"
    const formattedValue = (Number(numericValue) / 100)
      .toFixed(2) // Formata com 2 casas decimais
      .replace(".", ","); // Substitui ponto por vírgula

    setValueRecord(formattedValue);
  };

  const toggleCheckbox = () => {
    setAccounted(!accounted);
  };

  const handleSaveAll = async () => {

    console.log('saveAll')
    try {
      setLoading(true);

      const items = [
        {
          accounted: true,
          description: "Celular Keverson 4/10",
          flag: "parcelado",
          item: 1736027003001,
          valueRecord: "72,74",
        },
        {
          accounted: true,
          description: "Caixa de Som 2/12",
          flag: "parcelado",
          item: 1736027003002,
          valueRecord: "121,11",
        },
        {
          accounted: true,
          description: "Óleo 2/6",
          flag: "parcelado",
          item: 1736027003003,
          valueRecord: "51,66",
        },
        {
          accounted: true,
          description: "Teclado 2/12",
          flag: "parcelado",
          item: 1736027003004,
          valueRecord: "32,65",
        },
        {
          accounted: false,
          description: "Relógio e Fone 16/18",
          flag: "parcelado",
          item: 1736027003005,
          valueRecord: "198,53",
        },
        {
          accounted: false,
          description: "Compra do mês",
          flag: "fixo",
          item: 1736027003006,
          valueRecord: "200,00",
        },
        {
          accounted: false,
          description: "GymPass",
          flag: "fixo",
          item: 1736027003007,
          valueRecord: "85,95",
        },
        {
          accounted: false,
          description: "Google YouTubePremium",
          flag: "fixo",
          item: 1736027003008,
          valueRecord: "24,90",
        },
        {
          accounted: false,
          description: "Cartão de Keverson",
          flag: "fixo",
          item: 1736027003009,
          valueRecord: "35,00",
        },
        {
          accounted: false,
          description: "Conta de Luz",
          flag: "fixo",
          item: 1736027003010,
          valueRecord: "177,00",
        },
        {
          accounted: false,
          description: "Conta Vivo",
          flag: "fixo",
          item: 1736027003011,
          valueRecord: "50,00",
        },
        {
          accounted: false,
          description: "Mei - Das",
          flag: "fixo",
          item: 1736027003012,
          valueRecord: "168,38",
        },
        {
          accounted: false,
          description: "Gasolina Carro",
          flag: "fixo",
          item: 1736027003013,
          valueRecord: "300,00",
        },
        {
          accounted: false,
          description: "Internet",
          flag: "fixo",
          item: 1736027003014,
          valueRecord: "33,00",
        },
        {
          accounted: false,
          description: "Parcela do Carro",
          flag: "fixo",
          item: 1736027003015,
          valueRecord: "438,41",
        },
        {
          accounted: false,
          description: "Investimentos",
          flag: "fixo",
          item: 1736027003016,
          valueRecord: "270,00",
        },
      ];

      // Recupera a lista atual do AsyncStorage
      const taskList = await getTaskList();

      // Itera sobre os itens fornecidos e adiciona/substitui na lista
      items.forEach((newItem) => {
        const itemIndex = taskList.findIndex(
          (task) => task.item === newItem.item
        );

        if (itemIndex >= 0) {
          // Substitui o item existente pelo novo
          taskList[itemIndex] = newItem;
        } else {
          // Adiciona o novo item ao array
          taskList.push(newItem);
        }
      });

      // Salva a lista atualizada no AsyncStorage
      await AsyncStorage.setItem("taskList", JSON.stringify(taskList));
      setTaskList(taskList);
      setTaskListBackup(taskList);
      setData(); // Atualiza qualquer outro estado ou componente relacionado
    } catch (error) {
      console.error("Erro ao salvar os itens:", error);
      onOpen(); // Abre o modal ou exibe uma mensagem de erro
    } finally {
      setLoading(false);
    }
  };

  const _container = () => {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => onClose()}>
              <MaterialIcons name="close" size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>
              {item != 0 ? "Editar despesa" : "Criar despesa"}
            </Text>
            <TouchableOpacity onPress={handleSave}>
              <AntDesign name="check" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <InputModal
              title="Descrição:"
              IconLeft={MaterialIcons}
              iconLeftName="edit"
              keyboardType="default"
              placeholder="Digite uma descrição"
              value={description}
              onChangeText={setDescription}
            />
            <InputModal
              title="Valor:"
              IconLeft={MaterialIcons}
              iconLeftName="edit"
              keyboardType="numeric"
              placeholder="0,00"
              value={valueRecord}
              onChangeText={handleChangeText}
            />

            {/* <Input
              title="Valor:"
              labelStyle={styles.label}
              value={title}
              onChangeText={setTitle}
              keyboardType="numeric"
            />
            <Input
              title="Título:"
              labelStyle={styles.label}
              value={title}
              onChangeText={setTitle}
              keyboardType="default"
            /> */}
            {/* <Input
              title="Descrição:"
              numberOfLines={5}
              height={100}
              multiline
              labelStyle={styles.label}
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            /> */}
            {/* <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{ width: 200, zIndex: 999 }}
              >
                <Input
                  title="Data limite:"
                  labelStyle={styles.label}
                  editable={false}
                  value={selectedDate.toLocaleDateString()}
                  onPress={() => setShowDatePicker(true)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{ width: 100 }}
              >
                <Input
                  title="Hora limite:"
                  labelStyle={styles.label}
                  editable={false}
                  value={selectedTime.toLocaleTimeString()}
                  onPress={() => setShowTimePicker(true)}
                />
              </TouchableOpacity>
            </View> */}

            {/* <CustomDateTimePicker
              type="date"
              onDateChange={handleDateChange}
              show={showDatePicker}
              setShow={setShowDatePicker}
            />
            <CustomDateTimePicker
              type="time" // Mude para 'time' aqui
              onDateChange={handleTimeChange}
              show={showTimePicker} // Use showTimePicker aqui
              setShow={setShowTimePicker} // Use setShowTimePicker aqui
            /> */}

            <View style={styles.containerFlag}>
              <Text style={styles.flag}>Flags:</Text>
              <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                {_renderFlags()}
              </View>
            </View>

            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={toggleCheckbox}
              activeOpacity={0.8}
            >
              <Text style={styles.label}>Contabilizar na conta:</Text>
              <View style={[styles.checkbox, accounted && styles.checked]}>
                {accounted && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  return (
    <AuthContextList.Provider
      value={{
        onOpen,
        taskList,
        handleEdit,
        handleDelete,
        taskListBackup,
        filter,
      }}
    >
      <Loading loading={loading} />
      {props.children}
      <Modalize
        ref={modalizeRef}
        childrenStyle={{ height: 600 }}
        adjustToContentHeight={true}
      >
        {_container()}
      </Modalize>
    </AuthContextList.Provider>
  );
};

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    width: "100%",
    height: 40,
    paddingHorizontal: 40,
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    width: "100%",
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: "bold",
    color: "#000",
    marginRight: 5,
  },
  containerFlag: {
    width: "100%",
    padding: 10,
  },
  flag: {
    fontSize: 14,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#007BFF",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#007BFF",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  labelCheck: {
    fontSize: 16,
    color: "#333",
  },
});

export const useAuth = () => useContext(AuthContextList);
