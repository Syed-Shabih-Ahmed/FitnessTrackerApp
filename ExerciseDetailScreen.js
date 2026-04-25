import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
} from 'react-native';
import { useExercises } from '../context/ExerciseContext';

export default function ExerciseDetailScreen({ navigation, route }) {
  const { exercise } = route.params;
  const { toggleDone, isDone } = useExercises();
  const isFinished = isDone(exercise.id);

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.goBack}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Workout Detail</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea}>

        <View style={styles.heroBox}>
          <Text style={styles.heroEmoji}>{exercise.emoji}</Text>
          <Text style={styles.heroName}>{exercise.name}</Text>
          <Text style={styles.heroCat}>{exercise.category}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCell}>
            <Text style={styles.statLabel}>Duration</Text>
            <Text style={styles.statValue}>{exercise.duration}</Text>
          </View>
          <View style={styles.statCell}>
            <Text style={styles.statLabel}>Calories</Text>
            <Text style={styles.statValue}>{exercise.calories} cal</Text>
          </View>
          <View style={styles.statCell}>
            <Text style={styles.statLabel}>Level</Text>
            <Text style={styles.statValue}>{exercise.difficulty}</Text>
          </View>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.blockHeading}>About</Text>
          <Text style={styles.blockText}>{exercise.description}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.blockHeading}>Muscles Worked</Text>
          <View style={styles.tagWrap}>
            {exercise.muscleGroups.map((m) => (
              <View key={m} style={styles.muscleTag}>
                <Text style={styles.muscleTagText}>{m}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.blockHeading}>Key Tips</Text>
          {exercise.tips.map((tip, i) => (
            <Text key={i} style={styles.tipLine}>• {tip}</Text>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.markBtn, isFinished && styles.markBtnDone]}
          onPress={() => toggleDone(exercise.id)}
        >
          <Text style={[styles.markBtnText, isFinished && styles.markBtnTextDone]}>
            {isFinished ? '✓ Mark as Incomplete' : 'Mark as Completed'}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#F0F4FF' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#1565C0',
  },
  goBack: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  screenTitle: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  scrollArea: { padding: 16, paddingBottom: 40 },
  heroBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  heroEmoji: { fontSize: 50, marginBottom: 8 },
  heroName: { fontSize: 22, fontWeight: 'bold', color: '#222', marginBottom: 4 },
  heroCat: { fontSize: 13, color: '#888' },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  statCell: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  statLabel: { fontSize: 11, color: '#999', marginBottom: 4 },
  statValue: { fontSize: 13, fontWeight: 'bold', color: '#1565C0', textAlign: 'center' },
  infoBlock: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  blockHeading: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  blockText: { fontSize: 14, color: '#555', lineHeight: 22 },
  tagWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  muscleTag: {
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#90CAF9',
  },
  muscleTagText: { fontSize: 13, color: '#1565C0' },
  tipLine: { fontSize: 14, color: '#555', marginBottom: 6, lineHeight: 20 },
  markBtn: {
    backgroundColor: '#1565C0',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 8,
  },
  markBtnDone: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#1565C0' },
  markBtnText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  markBtnTextDone: { color: '#1565C0' },
});
