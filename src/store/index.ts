import { WorkoutWithExercises } from "@/types/models";
import { create } from "zustand";
import * as Crypto from "expo-crypto";
import { finishWorkout, newWorkout } from "@/services/workoutService";
import { createExercise } from "@/services/exerciseService";
import { immer } from "zustand/middleware/immer";

type State = {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
};

type Actions = {
  startWorkout: () => void;
  finishWorkout: () => void;
  addExercise: (name: string) => void;
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
  }))
);
