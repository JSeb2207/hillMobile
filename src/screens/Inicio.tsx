import { SafeAreaView, ScrollView, Text, StyleSheet, View } from "react-native";
import { useApp } from "../context/AppContext"; // ✅ IMPORTAR

export default function HomeScreen() {
  const { settings } = useApp(); // ✅ OBTENER SETTINGS
  const isDark = settings.darkMode;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#2e7d32' }]}>
          ¡Bienvenido a NutriFitness! 💪
        </Text>

        <View style={[styles.card, { backgroundColor: isDark ? '#2a2a2a' : 'white' }]}>
          <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#333' }]}>
            Tu resumen de hoy
          </Text>
          <Text style={[styles.cardDesc, { color: isDark ? '#999' : 'gray' }]}>
            • 450 kcal quemadas
          </Text>
          <Text style={[styles.cardDesc, { color: isDark ? '#999' : 'gray' }]}>
            • 7,300 pasos
          </Text>
          <Text style={[styles.cardDesc, { color: isDark ? '#999' : 'gray' }]}>
            • 2 L de agua
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? '#2a2a2a' : 'white' }]}>
          <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#333' }]}>
            Recomendación
          </Text>
          <Text style={[styles.cardDesc, { color: isDark ? '#999' : 'gray' }]}>
            Haz 20 min de cardio suave 🏃‍♂️
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
    marginBottom: 15,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardDesc: { marginTop: 5 },
});