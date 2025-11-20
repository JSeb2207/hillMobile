import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useApp } from '../context/AppContext';

type OpcionesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function OpcionesScreen() {
  const navigation = useNavigation<OpcionesScreenNavigationProp>();
  const { settings, updateSettings } = useApp();
  
  const isDark = settings.darkMode;

  // Estilos dinámicos según el tema
  const dynamicStyles = {
    container: { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' },
    header: { backgroundColor: isDark ? '#2a2a2a' : '#fff' },
    text: { color: isDark ? '#fff' : '#333' },
    subtext: { color: isDark ? '#999' : '#666' },
    option: { 
      backgroundColor: isDark ? '#2a2a2a' : '#fff',
      borderBottomColor: isDark ? '#3a3a3a' : '#f0f0f0'
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      {/* Header */}
      <View style={[styles.header, dynamicStyles.header]}>
        <Text style={[styles.headerTitle, dynamicStyles.text]}>Configuración</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Perfil */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CUENTA</Text>
          
          <TouchableOpacity 
            style={[styles.option, dynamicStyles.option]}
            onPress={() => navigation.navigate('Perfil')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="person" size={24} color="#2196F3" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, dynamicStyles.text]}>Editar Perfil</Text>
              <Text style={[styles.optionSubtitle, dynamicStyles.subtext]}>Nombre, foto y más</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.option, dynamicStyles.option]}
            onPress={() => navigation.navigate('Privacidad')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#F3E5F5' }]}>
              <Ionicons name="shield-checkmark" size={24} color="#9C27B0" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, dynamicStyles.text]}>Privacidad y Seguridad</Text>
              <Text style={[styles.optionSubtitle, dynamicStyles.subtext]}>Contraseña, datos</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>
        </View>

        {/* Notificaciones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREFERENCIAS</Text>
          
          <View style={[styles.option, dynamicStyles.option]}>
            <View style={[styles.iconBox, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="notifications" size={24} color="#FF9800" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, dynamicStyles.text]}>Notificaciones</Text>
              <Text style={[styles.optionSubtitle, dynamicStyles.subtext]}>Alertas y recordatorios</Text>
            </View>
            <Switch
              value={settings.notificationsEnabled}
              onValueChange={(value) => updateSettings({ notificationsEnabled: value })}
              trackColor={{ false: '#e0e0e0', true: '#81C784' }}
              thumbColor={settings.notificationsEnabled ? '#2e7d32' : '#f4f3f4'}
            />
          </View>

          <View style={[styles.option, dynamicStyles.option]}>
            <View style={[styles.iconBox, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="volume-high" size={24} color="#4CAF50" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, dynamicStyles.text]}>Sonidos</Text>
              <Text style={[styles.optionSubtitle, dynamicStyles.subtext]}>Efectos de sonido</Text>
            </View>
            <Switch
              value={settings.soundEnabled}
              onValueChange={(value) => updateSettings({ soundEnabled: value })}
              trackColor={{ false: '#e0e0e0', true: '#81C784' }}
              thumbColor={settings.soundEnabled ? '#2e7d32' : '#f4f3f4'}
            />
          </View>

          <View style={[styles.option, dynamicStyles.option]}>
            <View style={[styles.iconBox, { backgroundColor: isDark ? '#424242' : '#E0E0E0' }]}>
              <Ionicons name={isDark ? "moon" : "sunny"} size={24} color={isDark ? '#FFD700' : '#616161'} />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, dynamicStyles.text]}>Modo Oscuro</Text>
              <Text style={[styles.optionSubtitle, dynamicStyles.subtext]}>Tema de la aplicación</Text>
            </View>
            <Switch
              value={settings.darkMode}
              onValueChange={(value) => updateSettings({ darkMode: value })}
              trackColor={{ false: '#e0e0e0', true: '#81C784' }}
              thumbColor={settings.darkMode ? '#2e7d32' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity style={[styles.option, dynamicStyles.option]}>
            <View style={[styles.iconBox, { backgroundColor: '#E1F5FE' }]}>
              <Ionicons name="language" size={24} color="#03A9F4" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, dynamicStyles.text]}>Idioma</Text>
              <Text style={[styles.optionSubtitle, dynamicStyles.subtext]}>Español</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>
        </View>

        {/* Más */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MÁS</Text>
          
          <TouchableOpacity style={[styles.option, dynamicStyles.option]}>
            <View style={[styles.iconBox, { backgroundColor: '#FFF9C4' }]}>
              <Ionicons name="help-circle" size={24} color="#FBC02D" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, dynamicStyles.text]}>Ayuda y Soporte</Text>
              <Text style={[styles.optionSubtitle, dynamicStyles.subtext]}>Centro de ayuda</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.option, dynamicStyles.option]}>
            <View style={[styles.iconBox, { backgroundColor: '#E8EAF6' }]}>
              <Ionicons name="information-circle" size={24} color="#3F51B5" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, dynamicStyles.text]}>Acerca de</Text>
              <Text style={[styles.optionSubtitle, dynamicStyles.subtext]}>Versión 1.0.0</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.option, dynamicStyles.option]}>
            <View style={[styles.iconBox, { backgroundColor: '#FCE4EC' }]}>
              <Ionicons name="star" size={24} color="#E91E63" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, dynamicStyles.text]}>Calificar App</Text>
              <Text style={[styles.optionSubtitle, dynamicStyles.subtext]}>Déjanos tu opinión</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>
        </View>

        {/* Cerrar Sesión */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons name="log-out-outline" size={24} color="#d32f2f" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  optionSubtitle: {
    fontSize: 13,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d32f2f',
  },
  logoutText: {
    color: '#d32f2f',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  bottomSpace: {
    height: 20,
  },
});