import { SafeAreaView, ScrollView, Text, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>¡Bienvenido a NutriFitness! 💪</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tu resumen de hoy</Text>
          <Text style={styles.cardDesc}>• 450 kcal quemadas</Text>
          <Text style={styles.cardDesc}>• 7,300 pasos</Text>
          <Text style={styles.cardDesc}>• 2 L de agua</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recomendación</Text>
          <Text style={styles.cardDesc}>Haz 20 min de cardio suave 🏃‍♂️</Text>
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
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardDesc: { color: "gray", marginTop: 5 },
});
