import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/hill.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Bienvenido a Hill</Text>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b6dfac",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#ffffff",
    padding: 14,
    width: 220,
    borderRadius: 10,
    marginVertical: 10,
  },
  btnText: {
    textAlign: "center",
    fontWeight: "600",
  },
});