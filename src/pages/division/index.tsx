import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, TouchableOpacity, Modal, TextInput } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Division() {
  const [salario, setSalario] = useState(4000.0);
  const [fatura, setFatura] = useState(1812.48);
  const [faturados, setFaturados] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newValueWage, setNewValueWage] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    calculate(salario);
  }, []);

  async function getTaskList() {
    try {
      setLoading(true);
      const storedData = await AsyncStorage.getItem("taskList");
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Erro ao obter tarefas:", error);
      return [];
    } finally {
      setLoading(false);
    }
  }

  const calcularFaturados = (fatura, currentTaskList) => {
    const calcularTotal = (flag) =>
      currentTaskList
        .filter((item) => item.flag === flag && item.accounted)
        .reduce((total, item) => total + parseFloat(item.valueRecord.replace(",", ".")), 0);

    const despesasFixas = calcularTotal("fixo");
    const despesasParceladas = calcularTotal("parcelado");
    const receitas = calcularTotal("receita");

    const diasRestantes = 30 - new Date().getDate();
    const semanasRestantes = Math.ceil(diasRestantes / 7);
    const gastoRealFatura = Math.max(fatura - despesasFixas - despesasParceladas - receitas, 0);

    return {
      gastoRealFatura: gastoRealFatura.toFixed(2),
      gastoPorDia: (gastoRealFatura / diasRestantes).toFixed(2),
      gastoPorSemana: (gastoRealFatura / semanasRestantes).toFixed(2),
      despesasFixas: despesasFixas.toFixed(2),
      receitas: receitas.toFixed(2),
      despesasParceladas: despesasParceladas.toFixed(2),
      totalGeral: (despesasFixas + despesasParceladas).toFixed(2),
    };
  };

  const calculate = async (salario) => {
    const currentTaskList = await getTaskList();
    const faturados = calcularFaturados(
      fatura,
      currentTaskList.filter((item) => item.accounted)
    );
    setFaturados(faturados);

    const calcularPorcentagem = (percent: number): number => {
      return (percent / 100) * salario;
    };

    const totalFixedExpenses = currentTaskList
      .filter((item) => ["fixo", "parcelado"].includes(item.flag))
      .reduce((total, item) => total + parseFloat(item.valueRecord.replace(",", ".")), 0);

    const totalInvested = currentTaskList
      .filter((item) => item.flag === "invest")
      .reduce((total, item) => total + parseFloat(item.valueRecord.replace(",", ".")), 0);

    const totalDispensableExpenses = parseFloat(faturados.gastoRealFatura);

    setResult({
      fixedExpenses: {
        amountToSpend: calcularPorcentagem(50),
        totalFixedExpenses: totalFixedExpenses,
        leftToSpend: calcularPorcentagem(50) - totalFixedExpenses,
      },
      dispensableExpenses: {
        amountToSpend: calcularPorcentagem(40),
        totalDispensableExpenses: totalDispensableExpenses,
        leftToSpend: calcularPorcentagem(40) - totalDispensableExpenses,
      },
      invest: {
        amountToSpend: calcularPorcentagem(10),
        totalInvested: totalInvested,
        leftToInvest: calcularPorcentagem(10) - totalInvested,
      },
    });
  };

  const prepareNewWage = () => {
    setSalario(newValueWage);
    calculate(newValueWage);
    setModalVisible(false);
  };

  const handleChangeText = (text) => {
    const numericValue = text.replace(/\D/g, "");
    setNewValueWage(parseFloat((Number(numericValue) / 100).toFixed(2)));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.greeting}>Salário</Text>
        <View style={styles.row}>
          <Text style={styles.value}>R$ {salario.toFixed(2)}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialIcons name="edit" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {result && (
        <View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>💰 Gastos Fixos - 50%</Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>💸 Valor a gastar:</Text>
              <Text style={styles.resultValue}>{formatCurrency(result.fixedExpenses.amountToSpend)}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>📉 Valor já gasto:</Text>
              <Text style={styles.resultValue}>{formatCurrency(result.fixedExpenses.totalFixedExpenses)}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>🛒 Restante disponível:</Text>
              <Text style={styles.resultValue}>{formatCurrency(result.fixedExpenses.leftToSpend)}</Text>
            </View>
          </View>

          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>🛍️ Gastos Dispensáveis - 40%</Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>🎯 Valor a gastar:</Text>
              <Text style={styles.resultValue}>{formatCurrency(result.dispensableExpenses.amountToSpend)}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>📉 Valor já gasto:</Text>
              <Text style={styles.resultValue}>{formatCurrency(result.dispensableExpenses.totalDispensableExpenses)}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>💵 Restante disponível:</Text>
              <Text style={styles.resultValue}>{formatCurrency(result.dispensableExpenses.leftToSpend)}</Text>
            </View>
          </View>

          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>📈 Investimentos - 10%</Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>🏦 Valor recomendado:</Text>
              <Text style={styles.resultValue}>{formatCurrency(result.invest.amountToSpend)}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>💼 Valor já investido:</Text>
              <Text style={styles.resultValue}>{formatCurrency(result.invest.totalInvested)}</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>📊 Restante a investir:</Text>
              <Text style={styles.resultValue}>{formatCurrency(result.invest.leftToInvest)}</Text>
            </View>
          </View>
        </View>
      )}

      <Modal visible={isModalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Salário</Text>
            <TextInput style={styles.modalInput} keyboardType="numeric" value={newValueWage.toString()} onChangeText={handleChangeText} />
            <TouchableOpacity style={styles.modalButton} onPress={prepareNewWage}>
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
