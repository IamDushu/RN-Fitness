import { ExerciseSet, ExerciseWithSets } from "@/types/models";
import * as Crypto from "expo-crypto";

export const getSetTotalWeight = (set: ExerciseSet) => {
  return (set.weight || 0) * (set.reps || 0);
};

export const getBestSet = (sets: ExerciseSet[]) => {
  const bestSet = sets.reduce((bestSet: ExerciseSet | null, set) => {
    return (set?.oneRM || 0) > (bestSet?.oneRM || 0) ? set : bestSet;
  }, null);

  if (bestSet) {
    return bestSet;
  }

  return getBestSetRep(sets);
};

const getBestSetRep = (sets: ExerciseSet[]) => {
  return sets.reduce((bestSet: ExerciseSet | null, set) => {
    return (set?.reps || 0) > (bestSet?.reps || 0) ? set : bestSet;
  }, null);
};

export const createSet = (exerciseId: string) => {
  const newSet: ExerciseSet = {
    id: Crypto.randomUUID(),
    exerciseId: exerciseId,
  };

  return newSet;
};

export const updateSet = (
  set: ExerciseSet,
  updatedFields: Pick<ExerciseSet, "reps" | "weight">
) => {
  const updatedSet = { ...set };

  if (updatedFields.reps !== undefined) {
    updatedSet.reps = updatedFields.reps;
  }

  if (updatedFields.weight !== undefined) {
    updatedSet.weight = updatedFields.weight;
  }

  if (updatedSet.weight && updatedSet.reps) {
    updatedSet.oneRM = updatedSet.weight * (36.0 / (37.0 - updatedSet.reps));
  }

  return updatedSet;
};

const isSetComplete = (set: ExerciseSet) => {
  if (set.reps) {
    return true;
  }
};

export const cleanSets = (sets: ExerciseSet[]) => {
  const completeSets = sets.filter((set) => isSetComplete(set));
  return completeSets;
};
