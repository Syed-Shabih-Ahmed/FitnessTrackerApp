import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { useExercises } from '../context/ExerciseContext';

const filterList = ['All', 'Strength', 'Cardio', 'Legs', 'Core'];

export default function HomeScreen({ navigation }) {
  const { exerciseList, isDone } = useExercises();
  const [activeFilter, setActiveFilter] = useState('All');
  const [keyword, setKeyword] = useState('');

  const visibleItems = exerciseList.filter((ex) => {
    const filterMatch = activeFilter === 'All' || ex.category === activeFilter;
    const keywordMatch = ex.name.toLowerCase().includes(keyword.toLowerCase());
    return filterMatch && keywordMatch;
  });

  const doneCount = exerciseList.filter((ex) => isDone(ex.id)).length;

  const countByCategory = (cat) => {
    if (cat === 'All') return exerciseList.length;
    return exerciseList.filter((ex) => ex.category === cat).length;
  };

  const renderItem = ({ item }) => {
    const completed = isDone(item.id);
    return (
      <TouchableOpacity
        style={[styles.card, completed && styles.cardCompleted]}
        onPress={() => navigation.navigate('ExerciseDetail', { exercise: item })}
      >
        <Text style={styles.cardEmoji}>{item.emoji}</Text>
        <View style={styles.cardBody}>
          <Text style={[styles.cardTitle, completed && styles.cardTitleDone]}>{item.name}</Text>
          <Text style={styles.cardMeta}>{item.category} • {item.duration}</Text>
          <Text style={styles.cardMeta}>{item.difficulty} • {item.calories} cal</Text>
        </View>
        {completed && <Text style={styles.checkIcon}>✓</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />

      <View style={styles.topBar}>
        <View>
          <Text style={styles.welcomeText}>Hello, Shabih 👋</Text>
          <Text style={styles.appTitle}>My Workout Plan</Text>
        </View>
        <View style={styles.badgeBox}>
          <Text style={styles.badgeNum}>{doneCount}</Text>
          <Text style={styles.badgeLabel}>Done</Text>
        </View>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search workout..."
        value={keyword}
        onChangeText={setKeyword}
      />

      <View style={styles.filterRow}>
        {filterList.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, activeFilter === f && styles.filterBtnOn]}
            onPress={() => setActiveFilter(f)}
          >
            <Text style={[styles.filterLabel, activeFilter === f && styles.filterLabelOn]}>
              {f} ({countByCategory(f)})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={visibleItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listArea}
        ListEmptyComponent={<Text style={styles.noResult}>No workouts found</Text>}
      />

      <TouchableOpacity
        style={styles.addWorkoutBtn}
        onPress={() => navigation.navigate('AddExercise')}
      >
        <Text style={styles.addWorkoutLabel}>+ Add New Workout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#F0F4FF' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1565C0',
  },
  welcomeText: { fontSize: 13, color: '#BBDEFB', marginBottom: 2 },
  appTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  badgeBox: {
    backgroundColor: '#0D47A1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
  },
  badgeNum: { fontSize: 20, fontWeight: 'bold', color: '#64B5F6' },
  badgeLabel: { fontSize: 11, color: '#BBDEFB' },
  searchBar: {
    margin: 12,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 14,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 6,
    marginBottom: 8,
  },
  filterBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#90CAF9',
  },
  filterBtnOn: { backgroundColor: '#1565C0', borderColor: '#1565C0' },
  filterLabel: { fontSize: 12, color: '#1565C0' },
  filterLabelOn: { color: '#fff', fontWeight: 'bold' },
  listArea: { paddingHorizontal: 12, paddingBottom: 80 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  cardCompleted: { backgroundColor: '#E3F2FD', borderColor: '#90CAF9' },
  cardEmoji: { fontSize: 30, marginRight: 12 },
  cardBody: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#222', marginBottom: 2 },
  cardTitleDone: { textDecorationLine: 'line-through', color: '#999' },
  cardMeta: { fontSize: 12, color: '#777', marginTop: 1 },
  checkIcon: { fontSize: 20, color: '#1565C0', fontWeight: 'bold' },
  noResult: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 15 },
  addWorkoutBtn: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#1565C0',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  addWorkoutLabel: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});
