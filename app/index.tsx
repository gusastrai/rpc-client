import React, { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BASE_URL } from "../config";
import CustomButton from "@/components/CustomButton";

export default function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);
  const [resultLabel, setResultLabel] = useState("");

  // =========================================================== USING REST API ===========================================================

  // const callAddEndpoint = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/api/add`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ a: parseFloat(num1), b: parseFloat(num2) }),
  //     });
  //     const data = await response.json();
  //     setResult(data.result);
  //     setResultLabel("Hasil Penjumlahan:");
  //   } catch (error) {
  //     console.error(error);
  //     setResult("Error: Could not connect to server.");
  //   }
  // };

  // const callMultiplyEndpoint = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/api/multiply`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ a: parseFloat(num1), b: parseFloat(num2) }),
  //     });
  //     const data = await response.json();
  //     setResult(data.result);
  //     setResultLabel("Hasil Perkalian:");
  //   } catch (error) {
  //     console.error(error);
  //     setResult("Error: Could not connect to server.");
  //   }
  // };

  // =========================================================== USING RPC ===========================================================

  const callAddEndpoint = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "App.add",
          params: { a: parseFloat(num1), b: parseFloat(num2) },
          id: 1,
        }),
      });
      const data = await response.json();
      setResult(`${data.result}`);
      setResultLabel("Hasil Penjumlahan:");
    } catch (error) {
      console.error(error);
      setResult("Error: Could not connect to server.");
    }
  };

  const callMultiplyEndpoint = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "App.multiply",
          params: { a: parseFloat(num1), b: parseFloat(num2) },
          id: 2,
        }),
      });
      const data = await response.json();
      setResult(`${data.result}`);
      setResultLabel("Hasil Perkalian:");
    } catch (error) {
      console.error(error);
      setResult("Error: Could not connect to server.");
    }
  };

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="connect-without-contact"
        size={120}
        color="#4CAF50"
      />
      <Text style={styles.appName}>RPC Test</Text>

      <TextInput
        placeholder="Masukkan angka pertama"
        value={num1}
        onChangeText={setNum1}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Masukkan angka kedua"
        value={num2}
        onChangeText={setNum2}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <CustomButton title="Penjumlahan" onPress={callAddEndpoint} />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton title="Perkalian" onPress={callMultiplyEndpoint} />
      </View>

      {result !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>{resultLabel}</Text>
          <Text style={styles.resultNumber}>{result}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: "80%",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    width: "80%",
    marginVertical: 5,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultLabel: {
    fontSize: 18,
    color: "#333",
  },
  resultNumber: {
    fontSize: 64,
    color: "#4CAF50",
    fontWeight: "bold",
    marginTop: 20,
  },
});
