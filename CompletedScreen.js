import React from 'react';
import {
  View, Text, FlatList, StyleSheet,
  SafeAreaView, StatusBar, TouchableOpacity,
} from 'react-native';
import { useExercises } from '../context/ExerciseContext';

export default function CompletedScreen({ navigation }) {
  const { exerciseList, isDone, toggleDone } = useExercises();
  const finishedWorkouts = exerciseList.filter((ex) => isDone(ex.id));
  const burnedCalories = finishedWorkouts.reduce((total, ex) => total + ex.calories, 0);

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />

      <View style={styles.topBar}>
        <Text style={styles.screenTitle}>Completed Workouts</Text>
      </View>

      <View style={styles.summaryArea}>
        <View style={styles.summaryCell}>
          <Text style={styles.summaryNum}>{finishedWorkouts.length}</Text>
          <Text style={styles.summaryLabel}>Workouts Done</Text>
        </View>
        <View style={styles.summaryCell}>
          <Text style={styles.summaryNum}>{burnedCalories}</Text>
          <Text style={styles.summaryLabel}>Calories Burned</Text>
        </View>
      </View>

      {finishedWorkouts.length === 0 ? (
        <View style={styles.emptyArea}>
          <Text style={styles.emptyIcon}>🎯</Text>
          <Text style={styles.emptyHeading}>Nothing completed yet</Text>
          <Text style={styles.emptyMsg}>Go finish some workouts and come back!</Text>
          <TouchableOpacity style={styles.goBtn} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.goBtnText}>View Workouts</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={finishedWorkouts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listArea}
          renderItem={({ item }) => (
            <View style={styles.workoutCard}>
              <Text style={styles.workoutEmoji}>{item.emoji}</Text>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{item.name}</Text>
                <Text style={styles.workoutMeta}>{item.category} • {item.calories} cal</Text>
              </View>
              <TouchableOpacity style={styles.undoBtn} onPress={() => toggleDone(item.id)}>
                <Text style={styles.undoLabel}>Undo</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#F0F4FF' },
  topBar: { padding: 16, backgroundColor: '#1565C0' },
  screenTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  summaryArea: { flexDirection: 'row', padding: 12, gap: 10 },
  summaryCell: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  summaryNum: { fontSize: 24, fontWeight: 'bold', color: '#1565C0' },
  summaryLabel: { fontSize: 12, color: '#888', marginTop: 2 },
  listArea: { paddingHorizontal: 12, paddingBottom: 30 },
  workoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#90CAF9',
  },
  workoutEmoji: { fontSize: 28, marginRight: 12 },
  workoutInfo: { flex: 1 },
  workoutName: { fontSize: 15, fontWeight: 'bold', color: '#222' },
  workoutMeta: { fontSize: 12, color: '#777', marginTop: 2 },
  undoBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#90CAF9',
  },
  undoLabel: { color: '#1565C0', fontSize: 12, fontWeight: 'bold' },
  emptyArea: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyIcon: { fontSize: 50, marginBottom: 12 },
  emptyHeading: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  emptyMsg: { fontSize: 14, color: '#888', marginBottom: 20, textAlign: 'center' },
  goBtn: { backgroundColor: '#1565C0', borderRadius: 10, paddingHorizontal: 24, paddingVertical: 12 },
  goBtnText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});
