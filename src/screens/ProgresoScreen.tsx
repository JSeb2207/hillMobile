import { View, Text, StyleSheet } from "react-native";

export default function ProgresoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progreso</Text>

      <View style={styles.box}>
        <Text style={styles.boxTitle}>Peso Kg</Text>
        <Text>Último peso registrado: 95 Kg</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.boxTitle}>Estadísticas</Text>
        <Text>Días activos: 30</Text>
        <Text>Tareas completadas: 57</Text>
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
