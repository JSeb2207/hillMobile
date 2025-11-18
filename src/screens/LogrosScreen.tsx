import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function LogrosScreen() {
  const navigation = useNavigation();

  const logros = [
    { id: 1, title: 'Primer Paso', description: 'Completa tu primera tarea', icon: 'footsteps', color: '#4CAF50', unlocked: true },
    { id: 2, title: 'Racha de 7 días', description: 'Mantén una racha de 7 días consecutivos', icon: 'flame', color: '#FF6B35', unlocked: true },
    { id: 3, title: 'Madrugador', description: 'Completa una tarea antes de las 8 AM', icon: 'sunny', color: '#FFC107', unlocked: true },
    { id: 4, title: 'Nocturno', description: 'Completa una tarea después de las 10 PM', icon: 'moon', color: '#9C27B0', unlocked: false },
    { id: 5, title: 'Productivo', description: 'Completa 10 tareas en un día', icon: 'checkbox', color: '#2196F3', unlocked: true },
    { id: 6, title: 'Constante', description: 'Mantén una racha de 30 días', icon: 'calendar', color: '#E91E63', unlocked: false },
    { id: 7, title: 'Experto', description: 'Alcanza 100 tareas completadas', icon: 'star', color: '#FFD700', unlocked: false },
    { id: 8, title: 'Perfeccionista', description: 'Completa todas las tareas de la semana', icon: 'checkmark-circle', color: '#00BCD4', unlocked: true },
  ];

  const unlockedCount = logros.filter(l => l.unlocked).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Logros</Text>
        <Text style={styles.headerSubtitle}>{unlockedCount} de {logros.length} desbloqueados</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(unlockedCount / logros.length) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>{Math.round((unlockedCount / logros.length) * 100)}% Completado</Text>
      </View>

      {/* Logros Grid */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.logrosContainer}
        showsVerticalScrollIndicator={false}
      >
        {logros.map((logro) => (
          <TouchableOpacity
            key={logro.id}
            style={[
              styles.logroCard,
              !logro.unlocked && styles.logroCardLocked
            ]}
            activeOpacity={0.7}
          >
            <View style={[
              styles.iconContainer,
              { backgroundColor: logro.unlocked ? logro.color : '#e0e0e0' }
            ]}>
              <Ionicons 
                name={logro.icon as any} 
                size={32} 
                color={logro.unlocked ? '#fff' : '#999'} 
              />
            </View>
            <Text style={[
              styles.logroTitle,
              !logro.unlocked && styles.logroTitleLocked
            ]}>
              {logro.title}
            </Text>
            <Text style={[
              styles.logroDescription,
              !logro.unlocked && styles.logroDescriptionLocked
            ]}>
              {logro.description}
            </Text>
            {logro.unlocked && (
              <View style={styles.unlockedBadge}>
                <Ionicons name="checkmark" size={16} color="#fff" />
              </View>
            )}
            {!logro.unlocked && (
              <View style={styles.lockedOverlay}>
                <Ionicons name="lock-closed" size={24} color="#999" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  progressContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2e7d32',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  logrosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    paddingBottom: 80, // Espacio extra para el tab bar
  },
  logroCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    margin: '1.5%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  logroCardLocked: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logroTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 6,
  },
  logroTitleLocked: {
    color: '#999',
  },
  logroDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  logroDescriptionLocked: {
    color: '#aaa',
  },
  unlockedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4CAF50',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockedOverlay: {
    position: 'absolute',
    top: '35%',
    opacity: 0.3,
  },
});