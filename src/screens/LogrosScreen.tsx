import { View, Text, StyleSheet } from "react-native";

export default function LogrosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logros</Text>

      <View style={styles.box}>
        <Text style={styles.boxTitle}>Logros Obtenidos</Text>
        <Text> Primer inicio de sesión</Text>
        <Text> Primera tarea completada</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.boxTitle}>Todos los logros</Text>
        <Text> Completar 10 tareas</Text>
        <Text> Conectarte 7 días seguidos</Text>
        <Text> Registrar tu peso 5 veces</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b6dfac",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  box: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  boxTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
});
