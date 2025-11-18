import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";

export default function NotificacionesScreen() {
  const notificaciones = [
    { title: "Entrenamiento completado", desc: "45 min de cardio 🔥" },
    { title: "Nuevo reto disponible", desc: "Reto semanal listo 💪" },
    { title: "Hidratación baja", desc: "Toma más agua 💧" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Notificaciones</Text>

        {notificaciones.map((n, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.cardTitle}>{n.title}</Text>
            <Text style={styles.cardDesc}>{n.desc}</Text>
          </View>
        ))}
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
    elevation: 5,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardDesc: { color: "gray", marginTop: 5 },
});
