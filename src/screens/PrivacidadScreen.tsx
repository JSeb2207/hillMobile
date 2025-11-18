import { View, Text, Switch, StyleSheet } from "react-native";
import { useState } from "react";

export default function PrivacidadScreen() {
  const [ubicacion, setUbicacion] = useState(true);
  const [datos, setDatos] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacidad</Text>

      <View style={styles.row}>
        <Text>Compartir ubicación</Text>
        <Switch value={ubicacion} onValueChange={setUbicacion} />
      </View>

      <View style={styles.row}>
        <Text>Permitir análisis de datos</Text>
        <Switch value={datos} onValueChange={setDatos} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
});
