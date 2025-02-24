import * as Crypto from "expo-crypto";
import { WorkoutWithExercises } from "@/types/models";
import { cleanExercise, getExerciseTotalWeight } from "./exerciseService";

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
  const cleanedWorkout = cleanupWorkout(workout);

  const finishedWorkout = {
    ...cleanedWorkout,
    finishedAt: new Date(),
  };

  return finishedWorkout;
};

const cleanupWorkout = (workout: WorkoutWithExercises) => {
  const cleanedExercises = workout.exercises
    .map((e) => cleanExercise(e))
    .filter((e) => !!e);
  // same as .filter(e => e !== null) we are removing null values from the resultant map

  return {
    ...workout,
    exercises: cleanedExercises,
  };
};
