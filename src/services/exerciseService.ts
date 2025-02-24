import * as Crypto from "expo-crypto";
import { ExerciseWithSets } from "@/types/models";
import { cleanSets, createSet, getSetTotalWeight } from "./setService";

export const getExerciseTotalWeight = (exercise: ExerciseWithSets) => {
  return exercise.sets.reduce((total, set) => {
    return total + getSetTotalWeight(set);
  }, 0);
};

export const createExercise = (name: string, workoutId: string) => {
  const newExercise: ExerciseWithSets = {
    id: Crypto.randomUUID(),
    workoutId,
    name,
    sets: [],
  };

  // add one empty set
  newExercise.sets.push(createSet(newExercise.id));

  return newExercise;
};

export const cleanExercise = (exercise: ExerciseWithSets) => {
  const cleanedSets = cleanSets(exercise.sets);

  if (cleanedSets.length === 0) {
    return null;
  }

  return {
    ...exercise,
    sets: cleanedSets,
  };
};
