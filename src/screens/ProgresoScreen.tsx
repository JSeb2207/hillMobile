import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import { useApp } from "../context/AppContext";

export default function ProgresoScreen() {
  const { settings } = useApp();
  const isDark = settings.darkMode;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#2e7d32' }]}>
          Tu progreso
        </Text>

        <View style={[styles.card, { backgroundColor: isDark ? '#2a2a2a' : 'white' }]}>
          <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#333' }]}>
            Peso actual: 95 kg
          </Text>
          <Text style={[styles.cardDesc, { color: isDark ? '#999' : 'gray' }]}>
            Meta: 80 kg
          </Text>

          <View style={[styles.progressBar, { backgroundColor: isDark ? '#3a3a3a' : '#e0e0e0' }]}>
            <View style={[styles.progressFill, { width: "60%" }]} />
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? '#2a2a2a' : 'white' }]}>
          <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#333' }]}>
            Calorías esta semana
          </Text>
          <Text style={[styles.bigNumber, { color: isDark ? '#81C784' : '#2e7d32' }]}>
            2,350 kcal
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  card: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardDesc: { marginTop: 5 },
  progressBar: {
    height: 12,
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2e7d32",
  },
  bigNumber: { fontSize: 32, fontWeight: "bold", marginTop: 10 },
});