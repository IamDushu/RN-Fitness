import { ExerciseSet } from "@/types/models";

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
