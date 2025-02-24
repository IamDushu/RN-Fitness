import {
  ExerciseSet,
  ExerciseWithSets,
  WorkoutWithExercises,
} from "@/types/models";
import { create } from "zustand";
import * as Crypto from "expo-crypto";
import { finishWorkout, newWorkout } from "@/services/workoutService";
import { createExercise } from "@/services/exerciseService";
import { immer } from "zustand/middleware/immer";
import { createSet, updateSet } from "@/services/setService";
import { current } from "immer";

type State = {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
};

type Actions = {
  startWorkout: () => void;
  finishWorkout: () => void;
  addExercise: (name: string) => void;
  addSet: (exerciseId: string) => void;
  updateSet: (
    setId: string,
    updatedFields: Pick<ExerciseSet, "reps" | "weight">
  ) => void;
  deleteSet: (setId: string) => void;
};

export const useWorkouts = create<State & Actions>()(
  immer((set, get) => ({
    currentWorkout: null,
    workouts: [],
    startWorkout: () => {
      const workout = newWorkout();

      set({ currentWorkout: workout });
    },
    finishWorkout: () => {
      const { currentWorkout } = get();

      if (!currentWorkout) {
        return;
      }

      const finishedWorkout = finishWorkout(currentWorkout);

      set((prev) => {
        prev.currentWorkout = null;
        prev.workouts.unshift(finishedWorkout);
      });
    },
    addExercise: (name: string) => {
      const { currentWorkout } = get();

      if (!currentWorkout) {
        return;
      }

      const newExercise = createExercise(name, currentWorkout?.id);

      set(({ currentWorkout }) => {
        currentWorkout?.exercises.push(newExercise);
      });
    },
    addSet: (exerciseId) => {
      const newSet = createSet(exerciseId);

      set(({ currentWorkout }) => {
        const exercise = currentWorkout?.exercises.find(
          (e) => e.id === exerciseId
        );

        exercise?.sets.push(newSet);
      });
    },
    updateSet: (setId, updatedFields) => {
      set(({ currentWorkout }) => {
        let setToUpdate = currentWorkout?.exercises
          ?.flatMap((e) => e.sets)
          .find((s) => s.id === setId);

        if (!setToUpdate) {
          return;
        }

        // this is wrong in immer
        // setToUpdate = updateSet(current(setToUpdate), updatedFields);

        Object.assign(
          setToUpdate,
          updateSet(current(setToUpdate), updatedFields)
        );
      });
    },
    deleteSet: (setId) => {
      set(({ currentWorkout }) => {
        const exercise = currentWorkout?.exercises?.find((exercise) =>
          exercise.sets.some((set) => set.id === setId)
        );

        if (!exercise) {
          return;
        }

        exercise.sets = exercise?.sets.filter((s) => s.id !== setId);
      });
    },
  }))
);
