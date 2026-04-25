import React, { createContext, useContext, useState } from 'react';
import { exercises as defaultData } from '../data/exercises';

const WorkoutContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [exerciseList, setExerciseList] = useState(defaultData);
  const [finishedIds, setFinishedIds] = useState([]);

  const addWorkout = (workout) => {
    const newItem = {
      ...workout,
      id: Date.now().toString(),
      isCustom: true,
    };
    setExerciseList((prev) => [newItem, ...prev]);
  };

  const toggleDone = (id) => {
    setFinishedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isDone = (id) => finishedIds.includes(id);

  return (
    <WorkoutContext.Provider
      value={{ exerciseList, addWorkout, toggleDone, isDone, finishedIds }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useExercises = () => useContext(WorkoutContext);
