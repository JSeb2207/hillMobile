import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function OpcionesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Opciones</Text>

      <View style={styles.box}>
        <Text style={styles.label}>Nombre de usuario</Text>
        <TextInput style={styles.input} placeholder="User_Name1" />

        <Text style={styles.label}>Cambiar contraseña</Text>
        <TextInput 
          style={styles.input} 
          secureTextEntry={true} 
          placeholder="Nueva contraseña" 
        />

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Guardar cambios</Text>
        </TouchableOpacity>
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
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
  box: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  label: {
    marginTop: 10,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  btn: {
    backgroundColor: "#2e7d32",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});