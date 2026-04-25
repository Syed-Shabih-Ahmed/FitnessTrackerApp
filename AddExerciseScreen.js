import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar,
  TouchableOpacity, TextInput, ScrollView, Alert,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useExercises } from '../context/ExerciseContext';

const categoryOptions = ['Strength', 'Cardio', 'Legs', 'Core', 'Flexibility', 'Other'];
const levelOptions = ['Beginner', 'Intermediate', 'Advanced'];

export default function AddExerciseScreen({ navigation }) {
  const { addWorkout } = useExercises();

  const [workoutName, setWorkoutName] = useState('');
  const [workoutDesc, setWorkoutDesc] = useState('');
  const [chosenCategory, setChosenCategory] = useState('');
  const [chosenLevel, setChosenLevel] = useState('');
  const [workoutDuration, setWorkoutDuration] = useState('');
  const [workoutCalories, setWorkoutCalories] = useState('');

  const saveWorkout = () => {
    if (!workoutName.trim()) {
      Alert.alert('Missing Field', 'Please enter a workout name.');
      return;
    }
    if (!chosenCategory) {
      Alert.alert('Missing Field', 'Please select a category.');
      return;
    }
    if (!chosenLevel) {
      Alert.alert('Missing Field', 'Please select a difficulty level.');
      return;
    }

    addWorkout({
      name: workoutName.trim(),
      description: workoutDesc.trim() || 'Custom workout added by Shabih.',
      category: chosenCategory,
      difficulty: chosenLevel,
      duration: workoutDuration.trim() || '3 sets',
      calories: parseInt(workoutCalories) || 100,
      emoji: '🏃',
      color: '#1565C0',
      tips: ['Stay consistent', 'Breathe properly', 'Rest between sets'],
      muscleGroups: [chosenCategory],
    });

    Alert.alert('Added!', `"${workoutName}" has been saved.`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>

        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.goBack}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>New Workout</Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollArea}>

          <Text style={styles.fieldLabel}>Workout Name *</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="e.g. Jumping Jacks"
            value={workoutName}
            onChangeText={setWorkoutName}
          />

          <Text style={styles.fieldLabel}>Description</Text>
          <TextInput
            style={[styles.inputBox, styles.multiLine]}
            placeholder="How to do this workout..."
            value={workoutDesc}
            onChangeText={setWorkoutDesc}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          <Text style={styles.fieldLabel}>Category *</Text>
          <View style={styles.optionGroup}>
            {categoryOptions.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[styles.optBtn, chosenCategory === opt && styles.optBtnOn]}
                onPress={() => setChosenCategory(opt)}
              >
                <Text style={[styles.optLabel, chosenCategory === opt && styles.optLabelOn]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.fieldLabel}>Difficulty *</Text>
          <View style={styles.optionGroup}>
            {levelOptions.map((lvl) => (
              <TouchableOpacity
                key={lvl}
                style={[styles.optBtn, chosenLevel === lvl && styles.optBtnOn]}
                onPress={() => setChosenLevel(lvl)}
              >
                <Text style={[styles.optLabel, chosenLevel === lvl && styles.optLabelOn]}>
                  {lvl}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.twoCol}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.fieldLabel}>Duration</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="3 sets x 12 reps"
                value={workoutDuration}
                onChangeText={setWorkoutDuration}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.fieldLabel}>Calories</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="120"
                value={workoutCalories}
                onChangeText={setWorkoutCalories}
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={saveWorkout}>
            <Text style={styles.saveBtnText}>Save Workout</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
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
  fieldLabel: { fontSize: 13, fontWeight: 'bold', color: '#444', marginBottom: 6, marginTop: 14 },
  inputBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 11,
    borderWidth: 1,
    borderColor: '#BBDEFB',
    fontSize: 14,
    color: '#222',
  },
  multiLine: { height: 80, paddingTop: 11 },
  twoCol: { flexDirection: 'row', marginTop: 4 },
  optionGroup: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#90CAF9',
  },
  optBtnOn: { backgroundColor: '#1565C0', borderColor: '#1565C0' },
  optLabel: { fontSize: 13, color: '#1565C0' },
  optLabelOn: { color: '#fff', fontWeight: 'bold' },
  saveBtn: {
    backgroundColor: '#1565C0',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 24,
  },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
