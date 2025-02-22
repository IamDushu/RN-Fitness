import { ExerciseWithSets } from "@/types/models";
import { getSetTotalWeight } from "./setService";

export const getExerciseTotalWeight = (exercise: ExerciseWithSets) => {
  return exercise.sets.reduce((total, set) => {
    return total + getSetTotalWeight(set);
  }, 0);
};
