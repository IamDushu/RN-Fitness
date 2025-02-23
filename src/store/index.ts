import { WorkoutWithExercises } from "@/types/models";
import { create } from "zustand";
import * as Crypto from "expo-crypto";

type State = {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
};

type Actions = {
  startWorkout: () => void;
  finishWorkout: () => void;
};

export const useWorkouts = create<State & Actions>()((set, get) => ({
  currentWorkout: null,
  workouts: [],
  startWorkout: () => {
    const workout: WorkoutWithExercises = {
      id: Crypto.randomUUID(),
      createdAt: new Date(),
      finishedAt: null,
      exercises: [],
    };

    set({ currentWorkout: workout });
  },
  finishWorkout: () => {
    const { currentWorkout, workouts } = get();

    if (!currentWorkout) {
      return;
    }
    set({ currentWorkout: null, workouts: [currentWorkout, ...workouts] });
  },
}));
