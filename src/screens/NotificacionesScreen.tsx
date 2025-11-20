import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import { useApp } from "../context/AppContext";

export default function NotificacionesScreen() {
  const { settings } = useApp();
  const isDark = settings.darkMode;

  const notificaciones = [
    { title: "Entrenamiento completado", desc: "45 min de cardio 🔥" },
    { title: "Nuevo reto disponible", desc: "Reto semanal listo 💪" },
    { title: "Hidratación baja", desc: "Toma más agua 💧" },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#2e7d32' }]}>
          Notificaciones
        </Text>

        {notificaciones.map((n, i) => (
          <View key={i} style={[styles.card, { backgroundColor: isDark ? '#2a2a2a' : 'white' }]}>
            <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#333' }]}>
              {n.title}
            </Text>
            <Text style={[styles.cardDesc, { color: isDark ? '#999' : 'gray' }]}>
              {n.desc}
            </Text>
          </View>
        ))}
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
    elevation: 5,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardDesc: { marginTop: 5 },
});