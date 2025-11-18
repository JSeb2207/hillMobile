import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";

export default function ProgresoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Tu progreso</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Peso actual: 95 kg</Text>
          <Text style={styles.cardDesc}>Meta: 80 kg</Text>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "60%" }]} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Calorías esta semana</Text>
          <Text style={styles.bigNumber}>2,350 kcal</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#2e7d32", marginBottom: 20 },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardDesc: { color: "gray" },
  progressBar: {
    height: 12,
    backgroundColor: "#e0e0e0",
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2e7d32",
  },
  bigNumber: { fontSize: 32, fontWeight: "bold", marginTop: 10, color: "#2e7d32" },
});

