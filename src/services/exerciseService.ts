import * as Crypto from "expo-crypto";
import { ExerciseWithSets } from "@/types/models";
import { getSetTotalWeight } from "./setService";

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

  return newExercise;
};
