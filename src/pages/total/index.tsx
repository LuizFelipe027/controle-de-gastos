import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Função para formatar valores em Real (R$)
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export default function Total() {
  const [faturaTotal, setFaturaTotal] = useState(1812.48);
  const [faturados, setFaturados] = useState(null);
  const [totais, setTotais] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [novoValor, setNovoValor] = useState(0);

  // Estado para armazenar tarefas
  const [taskList, setTaskList] = useState([]);

  async function getTaskList() {
    try {
      const storedData = await AsyncStorage.getItem("taskList");
      const taskList = storedData ? JSON.parse(storedData) : [];
      setTaskList(taskList);
      return taskList;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const calcular = async (fatura) => {
    const currentTaskList = await getTaskList();
    const faturados = calcularFaturados(fatura, currentTaskList);
    setFaturados(faturados);

    const totais = calcularTotais(currentTaskList);
    setTotais(totais);
  };

  const calcularTotais = (currentTaskList) => {
    const categorias = ["fixo", "parcelado", "receita"];

    const totais = categorias.reduce((acc, flag) => {
      acc[flag] = currentTaskList
        .filter((item) => item.flag === flag)
        .reduce((total, item) => total + parseFloat(item.valueRecord.replace(",", ".")), 0);
      return acc;
    }, {});

    return {
      despesasFixas: formatCurrency(totais["fixo"]),
      despesasParceladas: formatCurrency(totais["parcelado"]),
      receitas: formatCurrency(totais["receita"]),
      totalGeral: formatCurrency(totais["fixo"] + totais["parcelado"]),
    };
  };

  const calcularFaturados = (fatura, currentTaskList) => {
    const categorias = ["fixo", "parcelado", "receita"];
    const hoje = new Date();
    const diasRestantes = 30 - hoje.getDate();
    const semanasRestantes = Math.ceil(diasRestantes / 7);
    const faturaValue = parseFloat(fatura) || 0;

    const valores = categorias.reduce((acc, flag) => {
      acc[flag] = currentTaskList
        .filter((item) => item.flag === flag && item.accounted)
        .reduce((total, item) => total + parseFloat(item.valueRecord.replace(",", ".")), 0);
      return acc;
    }, {});

    let gastoRealFatura = faturaValue - valores["fixo"] - valores["parcelado"] - valores["receita"];
    gastoRealFatura = Math.max(gastoRealFatura, 0);

    return {
      gastoRealFatura: formatCurrency(gastoRealFatura),
      gastoPorDia: formatCurrency(gastoRealFatura / diasRestantes),
      gastoPorSemana: formatCurrency(gastoRealFatura / semanasRestantes),
      despesasFixas: formatCurrency(valores["fixo"]),
      despesasParceladas: formatCurrency(valores["parcelado"]),
      receitas: formatCurrency(valores["receita"]),
    };
  };

  const handleChangeText = (text: string) => {
    const numericValue = text.replace(/\D/g, "");
    const formattedValue = (Number(numericValue) / 100).toFixed(2).replace(".", ",");
    setNovoValor(parseFloat(formattedValue));
  };

  const handleConfirmarValor = () => {
    setFaturaTotal(novoValor);
    calcular(novoValor);
    setModalVisible(false);
  };

  useEffect(() => {
    calcular(faturaTotal);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.greeting}>Valor Atual da Fatura</Text>
        <View style={styles.row}>
          <Text style={styles.value}>{formatCurrency(faturaTotal)}</Text>
          <TouchableOpacity
            onPress={() => {
              setNovoValor(faturaTotal);
              setModalVisible(true);
            }}
          >
            <MaterialIcons name="edit" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {faturados && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>📊 Resultado</Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>💸 Dispensáveis:</Text>
              <Text style={styles.resultValue}>{faturados.gastoRealFatura}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>📅 Gastar por Dia:</Text>
              <Text style={styles.resultValue}>{faturados.gastoPorDia}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>🗓️ Gastar por Semana:</Text>
              <Text style={styles.resultValue}>{faturados.gastoPorSemana}</Text>
            </View>
          </View>
        )}

        {faturados && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>💳 Faturado esse mês</Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>🏠 Despesas Fixas:</Text>
              <Text style={styles.resultValue}>{faturados.despesasFixas}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>📉 Despesas Parceladas:</Text>
              <Text style={styles.resultValue}>{faturados.despesasParceladas}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>💰 Receitas:</Text>
              <Text style={styles.resultValue}>{faturados.receitas}</Text>
            </View>
          </View>
        )}

        {totais && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>📌 Totais</Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>🏠 Despesas Fixas:</Text>
              <Text style={styles.resultValue}>{totais.despesasFixas}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>📉 Despesas Parceladas:</Text>
              <Text style={styles.resultValue}>{totais.despesasParceladas}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>💰 Receitas:</Text>
              <Text style={styles.resultValue}>{totais.receitas}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Valor da Fatura</Text>
            <TextInput style={styles.modalInput} keyboardType="numeric" value={novoValor.toString()} onChangeText={handleChangeText} />
            <TouchableOpacity style={styles.modalButton} onPress={handleConfirmarValor}>
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
