import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export default function LogrosScreen() {
  const { settings } = useApp();
  const isDark = settings.darkMode;

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
    <View style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
        <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#333' }]}>
          Mis Logros
        </Text>
        <Text style={[styles.headerSubtitle, { color: isDark ? '#999' : '#666' }]}>
          {unlockedCount} de {logros.length} desbloqueados
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={[styles.progressContainer, { backgroundColor: isDark ? '#2a2a2a' : '#fff' }]}>
        <View style={[styles.progressBar, { backgroundColor: isDark ? '#3a3a3a' : '#e0e0e0' }]}>
          <View style={[styles.progressFill, { width: `${(unlockedCount / logros.length) * 100}%` }]} />
        </View>
        <Text style={[styles.progressText, { color: isDark ? '#999' : '#666' }]}>
          {Math.round((unlockedCount / logros.length) * 100)}% Completado
        </Text>
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
              { backgroundColor: isDark ? '#2a2a2a' : '#fff' },
              !logro.unlocked && styles.logroCardLocked
            ]}
            activeOpacity={0.7}
          >
            <View style={[
              styles.iconContainer,
              { backgroundColor: logro.unlocked ? logro.color : (isDark ? '#3a3a3a' : '#e0e0e0') }
            ]}>
              <Ionicons 
                name={logro.icon as any} 
                size={32} 
                color={logro.unlocked ? '#fff' : (isDark ? '#666' : '#999')} 
              />
            </View>
            <Text style={[
              styles.logroTitle,
              { color: isDark ? '#fff' : '#333' },
              !logro.unlocked && { color: isDark ? '#666' : '#999' }
            ]}>
              {logro.title}
            </Text>
            <Text style={[
              styles.logroDescription,
              { color: isDark ? '#999' : '#666' },
              !logro.unlocked && { color: isDark ? '#555' : '#aaa' }
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
                <Ionicons name="lock-closed" size={24} color={isDark ? '#666' : '#999'} />
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
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
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
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  logrosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    paddingBottom: 80,
  },
  logroCard: {
    width: '47%',
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
    textAlign: 'center',
    marginBottom: 6,
  },
  logroDescription: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
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