//PerfilScreen.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  TextInput,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useApp } from '../context/AppContext';

type PerfilScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Perfil'>;

const EditModal = ({ 
  visible, 
  onClose, 
  title, 
  value, 
  onChangeText, 
  onSave, 
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  isDark = false
}: any) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="slide"
    onRequestClose={onClose}
  >
    <TouchableOpacity 
      style={styles.modalOverlay}
      activeOpacity={1}
      onPress={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity 
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={[styles.modalContent, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
            <Text style={[styles.modalTitle, { color: isDark ? '#fff' : '#333' }]}>{title}</Text>
            <TextInput
              style={[
                styles.modalInput,
                { 
                  backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                  color: isDark ? '#fff' : '#333',
                  borderColor: isDark ? '#3a3a3a' : '#e0e0e0'
                }
              ]}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor={isDark ? '#666' : '#999'}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={onSave}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonCancel, { backgroundColor: isDark ? '#3a3a3a' : '#f5f5f5' }]}
                onPress={onClose}
              >
                <Text style={[styles.modalButtonTextCancel, { color: isDark ? '#999' : '#666' }]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={onSave}
              >
                <Text style={styles.modalButtonTextSave}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  </Modal>
);

export default function PerfilScreen() {
  const navigation = useNavigation<PerfilScreenNavigationProp>();
  const { settings } = useApp();
  const isDark = settings.darkMode;
  
  const [userName, setUserName] = useState('Usuario');
  const [userEmail, setUserEmail] = useState('usuario@ejemplo.com');
  const [userPhone, setUserPhone] = useState('+57 300 123 4567');
  
  const [showNameModal, setShowNameModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  const [tempName, setTempName] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [tempPhone, setTempPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const savedName = await AsyncStorage.getItem('userName');
        const savedEmail = await AsyncStorage.getItem('userEmail');
        const savedPhone = await AsyncStorage.getItem('userPhone');
        
        if (savedName) setUserName(savedName);
        if (savedEmail) setUserEmail(savedEmail);
        if (savedPhone) setUserPhone(savedPhone);
      } catch (error) {
        console.log('Error cargando datos:', error);
      }
    };
    
    loadData();
  }, []);

  const handleSaveName = async () => {
    if (tempName.trim()) {
      setUserName(tempName);
      await AsyncStorage.setItem('userName', tempName);
      setShowNameModal(false);
      Alert.alert('Éxito', 'Nombre actualizado correctamente');
    } else {
      Alert.alert('Error', 'El nombre no puede estar vacío');
    }
  };

  const handleSaveEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(tempEmail)) {
      setUserEmail(tempEmail);
      await AsyncStorage.setItem('userEmail', tempEmail);
      setShowEmailModal(false);
      Alert.alert('Éxito', 'Correo actualizado correctamente');
    } else {
      Alert.alert('Error', 'Por favor ingresa un correo válido');
    }
  };

  const handleSavePhone = async () => {
    if (tempPhone.trim()) {
      setUserPhone(tempPhone);
      await AsyncStorage.setItem('userPhone', tempPhone);
      setShowPhoneModal(false);
      Alert.alert('Éxito', 'Teléfono actualizado correctamente');
    } else {
      Alert.alert('Error', 'El teléfono no puede estar vacío');
    }
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    Alert.alert('Éxito', 'Contraseña actualizada correctamente');
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={isDark ? '#fff' : '#333'} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#333' }]}>Mi Perfil</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={[styles.profileSection, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.avatar}
            />
            <TouchableOpacity 
              style={styles.editAvatarButton}
              onPress={() => Alert.alert('Cambiar foto', 'Funcionalidad próximamente')}
            >
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.userName, { color: isDark ? '#fff' : '#333' }]}>{userName}</Text>
          <Text style={[styles.userEmail, { color: isDark ? '#999' : '#666' }]}>{userEmail}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFORMACIÓN PERSONAL</Text>
          
          <TouchableOpacity 
            style={[styles.option, { 
              backgroundColor: isDark ? '#2a2a2a' : '#fff',
              borderBottomColor: isDark ? '#3a3a3a' : '#f0f0f0'
            }]}
            onPress={() => {
              setTempName(userName);
              setShowNameModal(true);
            }}
          >
            <View style={[styles.iconBox, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="person" size={24} color="#2196F3" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionLabel, { color: isDark ? '#fff' : '#333' }]}>Nombre</Text>
              <Text style={[styles.optionValue, { color: isDark ? '#999' : '#666' }]}>{userName}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.option, { 
              backgroundColor: isDark ? '#2a2a2a' : '#fff',
              borderBottomColor: isDark ? '#3a3a3a' : '#f0f0f0'
            }]}
            onPress={() => {
              setTempEmail(userEmail);
              setShowEmailModal(true);
            }}
          >
            <View style={[styles.iconBox, { backgroundColor: '#F3E5F5' }]}>
              <Ionicons name="mail" size={24} color="#9C27B0" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionLabel, { color: isDark ? '#fff' : '#333' }]}>Correo Electrónico</Text>
              <Text style={[styles.optionValue, { color: isDark ? '#999' : '#666' }]}>{userEmail}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.option, { 
              backgroundColor: isDark ? '#2a2a2a' : '#fff',
              borderBottomColor: isDark ? '#3a3a3a' : '#f0f0f0'
            }]}
            onPress={() => {
              setTempPhone(userPhone);
              setShowPhoneModal(true);
            }}
          >
            <View style={[styles.iconBox, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="call" size={24} color="#4CAF50" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionLabel, { color: isDark ? '#fff' : '#333' }]}>Teléfono</Text>
              <Text style={[styles.optionValue, { color: isDark ? '#999' : '#666' }]}>{userPhone}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.option, { 
              backgroundColor: isDark ? '#2a2a2a' : '#fff',
              borderBottomColor: isDark ? '#3a3a3a' : '#f0f0f0'
            }]}
            onPress={() => setShowPasswordModal(true)}
          >
            <View style={[styles.iconBox, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="lock-closed" size={24} color="#FF9800" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionLabel, { color: isDark ? '#fff' : '#333' }]}>Contraseña</Text>
              <Text style={[styles.optionValue, { color: isDark ? '#999' : '#666' }]}>••••••••</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MIS ESTADÍSTICAS</Text>
          
          <View style={[styles.statsCard, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
            <View style={styles.statItem}>
              <View style={[styles.statIconBox, { backgroundColor: '#FFF9C4' }]}>
                <Ionicons name="trophy" size={28} color="#FBC02D" />
              </View>
              <Text style={[styles.statNumber, { color: isDark ? '#fff' : '#333' }]}>12</Text>
              <Text style={[styles.statLabel, { color: isDark ? '#999' : '#666' }]}>Logros</Text>
            </View>

            <View style={[styles.statDivider, { backgroundColor: isDark ? '#3a3a3a' : '#e0e0e0' }]} />

            <View style={styles.statItem}>
              <View style={[styles.statIconBox, { backgroundColor: '#FFCCBC' }]}>
                <Ionicons name="flame" size={28} color="#FF6B35" />
              </View>
              <Text style={[styles.statNumber, { color: isDark ? '#fff' : '#333' }]}>7</Text>
              <Text style={[styles.statLabel, { color: isDark ? '#999' : '#666' }]}>Días Racha</Text>
            </View>

            <View style={[styles.statDivider, { backgroundColor: isDark ? '#3a3a3a' : '#e0e0e0' }]} />

            <View style={styles.statItem}>
              <View style={[styles.statIconBox, { backgroundColor: '#C8E6C9' }]}>
                <Ionicons name="bar-chart" size={28} color="#2e7d32" />
              </View>
              <Text style={[styles.statNumber, { color: isDark ? '#fff' : '#333' }]}>85%</Text>
              <Text style={[styles.statLabel, { color: isDark ? '#999' : '#666' }]}>Progreso</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONFIGURACIÓN</Text>
          
          <TouchableOpacity 
            style={[styles.option, { 
              backgroundColor: isDark ? '#2a2a2a' : '#fff',
              borderBottomColor: isDark ? '#3a3a3a' : '#f0f0f0'
            }]}
            onPress={() => navigation.navigate('Privacidad')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#FCE4EC' }]}>
              <Ionicons name="shield-checkmark" size={24} color="#E91E63" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionLabel, { color: isDark ? '#fff' : '#333' }]}>Privacidad y Seguridad</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.option, { 
            backgroundColor: isDark ? '#2a2a2a' : '#fff',
            borderBottomColor: isDark ? '#3a3a3a' : '#f0f0f0'
          }]}>
            <View style={[styles.iconBox, { backgroundColor: '#E1F5FE' }]}>
              <Ionicons name="notifications" size={24} color="#03A9F4" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionLabel, { color: isDark ? '#fff' : '#333' }]}>Notificaciones</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.option, { 
            backgroundColor: isDark ? '#2a2a2a' : '#fff',
            borderBottomColor: isDark ? '#3a3a3a' : '#f0f0f0'
          }]}>
            <View style={[styles.iconBox, { backgroundColor: '#E8EAF6' }]}>
              <Ionicons name="language" size={24} color="#3F51B5" />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionLabel, { color: isDark ? '#fff' : '#333' }]}>Idioma</Text>
              <Text style={[styles.optionValue, { color: isDark ? '#999' : '#666' }]}>Español</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDark ? '#666' : '#999'} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.logoutButton, { 
            backgroundColor: isDark ? '#2a2a2a' : '#fff',
            borderColor: '#d32f2f'
          }]}
          onPress={() => {
            Alert.alert(
              'Cerrar Sesión',
              '¿Estás seguro de que quieres cerrar sesión?',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sí, cerrar sesión', onPress: () => navigation.navigate('Login') }
              ]
            );
          }}
        >
          <Ionicons name="log-out-outline" size={24} color="#d32f2f" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpace} />
      </ScrollView>

      <EditModal
        visible={showNameModal}
        onClose={() => setShowNameModal(false)}
        title="Editar Nombre"
        value={tempName}
        onChangeText={setTempName}
        onSave={handleSaveName}
        placeholder="Ingresa tu nombre"
        isDark={isDark}
      />

      <EditModal
        visible={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        title="Editar Correo"
        value={tempEmail}
        onChangeText={setTempEmail}
        onSave={handleSaveEmail}
        placeholder="Ingresa tu correo"
        keyboardType="email-address"
        isDark={isDark}
      />

      <EditModal
        visible={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        title="Editar Teléfono"
        value={tempPhone}
        onChangeText={setTempPhone}
        onSave={handleSavePhone}
        placeholder="Ingresa tu teléfono"
        keyboardType="phone-pad"
        isDark={isDark}
      />

      <Modal
        visible={showPasswordModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPasswordModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowPasswordModal(false)}
        >
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <TouchableOpacity 
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={[styles.modalContent, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
                <Text style={[styles.modalTitle, { color: isDark ? '#fff' : '#333' }]}>Cambiar Contraseña</Text>
                
                <TextInput
                  style={[styles.modalInput, { 
                    backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                    color: isDark ? '#fff' : '#333',
                    borderColor: isDark ? '#3a3a3a' : '#e0e0e0'
                  }]}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="Contraseña actual"
                  placeholderTextColor={isDark ? '#666' : '#999'}
                  secureTextEntry
                />
                
                <TextInput
                  style={[styles.modalInput, { 
                    backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                    color: isDark ? '#fff' : '#333',
                    borderColor: isDark ? '#3a3a3a' : '#e0e0e0'
                  }]}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Nueva contraseña"
                  placeholderTextColor={isDark ? '#666' : '#999'}
                  secureTextEntry
                />
                
                <TextInput
                  style={[styles.modalInput, { 
                    backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                    color: isDark ? '#fff' : '#333',
                    borderColor: isDark ? '#3a3a3a' : '#e0e0e0'
                  }]}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirmar contraseña"
                  placeholderTextColor={isDark ? '#666' : '#999'}
                  secureTextEntry
                />
                
                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.modalButtonCancel, { backgroundColor: isDark ? '#3a3a3a' : '#f5f5f5' }]}
                    onPress={() => {
                      setShowPasswordModal(false);
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                    }}
                  >
                    <Text style={[styles.modalButtonTextCancel, { color: isDark ? '#999' : '#666' }]}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.modalButtonSave]}
                    onPress={handleChangePassword}
                  >
                    <Text style={styles.modalButtonTextSave}>Guardar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  placeholder: { width: 34 },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2e7d32',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  userEmail: { fontSize: 16 },
  section: { marginTop: 20 },
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
  optionContent: { flex: 1 },
  optionLabel: { fontSize: 16, fontWeight: '600', marginBottom: 3 },
  optionValue: { fontSize: 14 },
  statsCard: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: { alignItems: 'center' },
  statIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statNumber: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  statLabel: { fontSize: 13 },
  statDivider: { width: 1, height: 60 },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  logoutText: {
    color: '#d32f2f',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  bottomSpace: { height: 100 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'smoothly ',
  },
  modalContent: {
    borderRadius: 20,
    padding: 24,
    width: '120%',
    maxWidth: 380,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    borderRadius: 12,
    padding: 16,
    fontSize: 17,
    marginBottom: 15,
    borderWidth: 1,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalButtonCancel: {},
  modalButtonSave: { backgroundColor: '#2e7d32' },
  modalButtonTextCancel: { fontSize: 16, fontWeight: '600' },
  modalButtonTextSave: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});