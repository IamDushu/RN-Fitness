import * as Crypto from "expo-crypto";
import { WorkoutWithExercises } from "@/types/models";
import { getExerciseTotalWeight } from "./exerciseService";

export const getWorkoutTotalWeight = (workout: WorkoutWithExercises) => {
  return workout.exercises.reduce((total, exercise) => {
    return total + getExerciseTotalWeight(exercise);
  }, 0);
};

export const newWorkout = () => {
  const newWorkout: WorkoutWithExercises = {
    id: Crypto.randomUUID(),
    createdAt: new Date(),
    finishedAt: null,
    exercises: [],
  };

  return newWorkout;
};

export const finishWorkout = (workout: WorkoutWithExercises) => {
  const finishedWorkout = {
    ...workout,
    finishedAt: new Date(),
  };

  return finishedWorkout;
};
