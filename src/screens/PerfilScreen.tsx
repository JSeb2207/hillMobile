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
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type PerfilScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Perfil'>;

export default function PerfilScreen() {
  const navigation = useNavigation<PerfilScreenNavigationProp>();
  
  // Estados para los datos del usuario
  const [userName, setUserName] = useState('Usuario');
  const [userEmail, setUserEmail] = useState('usuario@ejemplo.com');
  const [userPhone, setUserPhone] = useState('+57 300 123 4567');
  
  // Estados para los modales
  const [showNameModal, setShowNameModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  // Estados temporales para edición
  const [tempName, setTempName] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [tempPhone, setTempPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Funciones para guardar cambios
  const handleSaveName = () => {
    if (tempName.trim()) {
      setUserName(tempName);
      setShowNameModal(false);
      Alert.alert('Éxito', 'Nombre actualizado correctamente');
    } else {
      Alert.alert('Error', 'El nombre no puede estar vacío');
    }
  };

  const handleSaveEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(tempEmail)) {
      setUserEmail(tempEmail);
      setShowEmailModal(false);
      Alert.alert('Éxito', 'Correo actualizado correctamente');
    } else {
      Alert.alert('Error', 'Por favor ingresa un correo válido');
    }
  };

  const handleSavePhone = () => {
    if (tempPhone.trim()) {
      setUserPhone(tempPhone);
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
    // Aquí iría la lógica para cambiar la contraseña
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    Alert.alert('Éxito', 'Contraseña actualizada correctamente');
  };

  // Componente Modal reutilizable
  const EditModal = ({ 
    visible, 
    onClose, 
    title, 
    value, 
    onChangeText, 
    onSave, 
    placeholder,
    keyboardType = 'default',
    secureTextEntry = false
  }: any) => (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <TextInput
            style={styles.modalInput}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoFocus
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.modalButtonCancel]}
              onPress={onClose}
            >
              <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.modalButtonSave]}
              onPress={onSave}
            >
              <Text style={styles.modalButtonTextSave}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mi Perfil</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Foto de perfil */}
        <View style={styles.profileSection}>
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
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>

        {/* Opciones del perfil */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFORMACIÓN PERSONAL</Text>
          
          <TouchableOpacity 
            style={styles.option}
            onPress={() => {
              setTempName(userName);
              setShowNameModal(true);
            }}
          >
            <View style={[styles.iconBox, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="person" size={24} color="#2196F3" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionLabel}>Nombre</Text>
              <Text style={styles.optionValue}>{userName}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.option}
            onPress={() => {
              setTempEmail(userEmail);
              setShowEmailModal(true);
            }}
          >
            <View style={[styles.iconBox, { backgroundColor: '#F3E5F5' }]}>
              <Ionicons name="mail" size={24} color="#9C27B0" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionLabel}>Correo Electrónico</Text>
              <Text style={styles.optionValue}>{userEmail}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.option}
            onPress={() => {
              setTempPhone(userPhone);
              setShowPhoneModal(true);
            }}
          >
            <View style={[styles.iconBox, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="call" size={24} color="#4CAF50" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionLabel}>Teléfono</Text>
              <Text style={styles.optionValue}>{userPhone}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.option}
            onPress={() => setShowPasswordModal(true)}
          >
            <View style={[styles.iconBox, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="lock-closed" size={24} color="#FF9800" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionLabel}>Contraseña</Text>
              <Text style={styles.optionValue}>••••••••</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Estadísticas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MIS ESTADÍSTICAS</Text>
          
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <View style={[styles.statIconBox, { backgroundColor: '#FFF9C4' }]}>
                <Ionicons name="trophy" size={28} color="#FBC02D" />
              </View>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Logros</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <View style={[styles.statIconBox, { backgroundColor: '#FFCCBC' }]}>
                <Ionicons name="flame" size={28} color="#FF6B35" />
              </View>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Días Racha</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <View style={[styles.statIconBox, { backgroundColor: '#C8E6C9' }]}>
                <Ionicons name="bar-chart" size={28} color="#2e7d32" />
              </View>
              <Text style={styles.statNumber}>85%</Text>
              <Text style={styles.statLabel}>Progreso</Text>
            </View>
          </View>
        </View>

        {/* Configuración */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CONFIGURACIÓN</Text>
          
          <TouchableOpacity 
            style={styles.option}
            onPress={() => navigation.navigate('Privacidad')}
          >
            <View style={[styles.iconBox, { backgroundColor: '#FCE4EC' }]}>
              <Ionicons name="shield-checkmark" size={24} color="#E91E63" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionLabel}>Privacidad y Seguridad</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <View style={[styles.iconBox, { backgroundColor: '#E1F5FE' }]}>
              <Ionicons name="notifications" size={24} color="#03A9F4" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionLabel}>Notificaciones</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <View style={[styles.iconBox, { backgroundColor: '#E8EAF6' }]}>
              <Ionicons name="language" size={24} color="#3F51B5" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionLabel}>Idioma</Text>
              <Text style={styles.optionValue}>Español</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Cerrar sesión */}
        <TouchableOpacity 
          style={styles.logoutButton}
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

      {/* Modales de Edición */}
      <EditModal
        visible={showNameModal}
        onClose={() => setShowNameModal(false)}
        title="Editar Nombre"
        value={tempName}
        onChangeText={setTempName}
        onSave={handleSaveName}
        placeholder="Ingresa tu nombre"
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
      />

      {/* Modal de Cambio de Contraseña */}
      <Modal
        visible={showPasswordModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPasswordModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cambiar Contraseña</Text>
            
            <TextInput
              style={styles.modalInput}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Contraseña actual"
              secureTextEntry
            />
            
            <TextInput
              style={styles.modalInput}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Nueva contraseña"
              secureTextEntry
            />
            
            <TextInput
              style={styles.modalInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirmar contraseña"
              secureTextEntry
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => {
                  setShowPasswordModal(false);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}
              >
                <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={handleChangePassword}
              >
                <Text style={styles.modalButtonTextSave}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 34,
  },
  profileSection: {
    backgroundColor: '#fff',
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
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
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
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  optionValue: {
    fontSize: 14,
    color: '#666',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: '#e0e0e0',
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
    height: 100,
  },
  // Estilos del Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
  modalButtonCancel: {
    backgroundColor: '#f5f5f5',
  },
  modalButtonSave: {
    backgroundColor: '#2e7d32',
  },
  modalButtonTextCancel: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  modalButtonTextSave: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});