import { View, Text, StyleSheet } from "react-native";

export default function NotificacionesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>

      <View style={styles.box}>
        <Text style={styles.boxTitle}>Mensajes de Notificación</Text>
        <Text> Mensaje de prueba 1</Text>
        <Text> Mensaje de prueba 2</Text>
        <Text> Mensaje de prueba 3</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.boxTitle}>Tareas Pendientes</Text>
        <Text> Tarea 1 pendiente</Text>
        <Text> Tarea 2 pendiente</Text>
        <Text> Tarea 3 pendiente</Text>
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
