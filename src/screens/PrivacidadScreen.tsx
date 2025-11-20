import { View, Text, Switch, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useApp } from "../context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PrivacidadScreen() {
  const { settings, updateSettings } = useApp(); // ✅ AHORA TAMBIÉN USAR updateSettings
  const isDark = settings.darkMode;
  const navigation = useNavigation();
  
  // ✅ CAMBIO CLAVE: Leer del Context en lugar de useState local
  const ubicacion = settings.ubicacionEnabled;
  const datos = settings.datosEnabled;

  // ✅ FUNCIONES QUE GUARDAN EN EL CONTEXT
  const handleUbicacionChange = (value: boolean) => {
    updateSettings({ ubicacionEnabled: value });
  };

  const handleDatosChange = (value: boolean) => {
    updateSettings({ datosEnabled: value });
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDark ? '#fff' : '#333'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#333' }]}>Privacidad y Seguridad</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Sección de Privacidad */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRIVACIDAD</Text>
          
          <View style={[styles.card, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
            <View style={styles.row}>
              <View style={styles.rowContent}>
                <View style={[styles.iconBox, { backgroundColor: '#E3F2FD' }]}>
                  <Ionicons name="location" size={24} color="#2196F3" />
                </View>
                <View style={styles.textContent}>
                  <Text style={[styles.rowTitle, { color: isDark ? '#fff' : '#333' }]}>
                    Compartir ubicación
                  </Text>
                  <Text style={[styles.rowDescription, { color: isDark ? '#999' : '#666' }]}>
                    Permite acceso a tu ubicación
                  </Text>
                </View>
              </View>
              <Switch 
                value={ubicacion} 
                onValueChange={handleUbicacionChange} // ✅ USAR LA FUNCIÓN DEL CONTEXT
                trackColor={{ false: '#e0e0e0', true: '#81C784' }}
                thumbColor={ubicacion ? '#2e7d32' : '#f4f3f4'}
              />
            </View>

            <View style={[styles.divider, { backgroundColor: isDark ? '#3a3a3a' : '#f0f0f0' }]} />

            <View style={styles.row}>
              <View style={styles.rowContent}>
                <View style={[styles.iconBox, { backgroundColor: '#F3E5F5' }]}>
                  <Ionicons name="analytics" size={24} color="#9C27B0" />
                </View>
                <View style={styles.textContent}>
                  <Text style={[styles.rowTitle, { color: isDark ? '#fff' : '#333' }]}>
                    Análisis de datos
                  </Text>
                  <Text style={[styles.rowDescription, { color: isDark ? '#999' : '#666' }]}>
                    Ayuda a mejorar la app
                  </Text>
                </View>
              </View>
              <Switch 
                value={datos} 
                onValueChange={handleDatosChange} // ✅ USAR LA FUNCIÓN DEL CONTEXT
                trackColor={{ false: '#e0e0e0', true: '#81C784' }}
                thumbColor={datos ? '#2e7d32' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* Sección de Seguridad */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SEGURIDAD</Text>
          
          <TouchableOpacity 
            style={[styles.card, styles.optionCard, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}
            activeOpacity={0.7}
          >
            <View style={[styles.iconBox, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="lock-closed" size={24} color="#FF9800" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.rowTitle, { color: isDark ? '#fff' : '#333' }]}>
                Cambiar contraseña
              </Text>
              <Text style={[styles.rowDescription, { color: isDark ? '#999' : '#666' }]}>
                Actualiza tu contraseña
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, styles.optionCard, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}
            activeOpacity={0.7}
          >
            <View style={[styles.iconBox, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.rowTitle, { color: isDark ? '#fff' : '#333' }]}>
                Autenticación de dos factores
              </Text>
              <Text style={[styles.rowDescription, { color: isDark ? '#999' : '#666' }]}>
                Agrega una capa extra de seguridad
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, styles.optionCard, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}
            activeOpacity={0.7}
          >
            <View style={[styles.iconBox, { backgroundColor: '#E1F5FE' }]}>
              <Ionicons name="fingerprint" size={24} color="#03A9F4" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.rowTitle, { color: isDark ? '#fff' : '#333' }]}>
                Biometría
              </Text>
              <Text style={[styles.rowDescription, { color: isDark ? '#999' : '#666' }]}>
                Usa huella o Face ID
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>
        </View>

        {/* Sección de Datos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TUS DATOS</Text>
          
          <TouchableOpacity 
            style={[styles.card, styles.optionCard, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}
            activeOpacity={0.7}
          >
            <View style={[styles.iconBox, { backgroundColor: '#FFF9C4' }]}>
              <Ionicons name="download" size={24} color="#FBC02D" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.rowTitle, { color: isDark ? '#fff' : '#333' }]}>
                Descargar datos
              </Text>
              <Text style={[styles.rowDescription, { color: isDark ? '#999' : '#666' }]}>
                Obtén una copia de tu información
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, styles.optionCard, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}
            activeOpacity={0.7}
          >
            <View style={[styles.iconBox, { backgroundColor: '#FCE4EC' }]}>
              <Ionicons name="trash" size={24} color="#E91E63" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.rowTitle, { color: isDark ? '#fff' : '#333' }]}>
                Eliminar cuenta
              </Text>
              <Text style={[styles.rowDescription, { color: isDark ? '#999' : '#666' }]}>
                Borra permanentemente tu cuenta
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
    paddingHorizontal: 20,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  card: {
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  textContent: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  rowDescription: {
    fontSize: 13,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionContent: {
    flex: 1,
  },
  bottomSpace: {
    height: 100,
  },
});
