import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import HillLogo from "../components/HillLogo";

export default function LoginScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <HillLogo />

      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput placeholder="Correo electrónico" style={styles.input} />
      <TextInput placeholder="Contraseña" secureTextEntry style={styles.input} />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Tabs")}
      >
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
        <Text style={styles.link}>Crear una cuenta nueva</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b6dfac",
    justifyContent: "center",
    padding: 30,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 20,
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
  },
  btn: {
    backgroundColor: "#2e7d32",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "600",
  },
});
