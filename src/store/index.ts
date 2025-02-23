import { WorkoutWithExercises } from "@/types/models";
import { create } from "zustand";
import * as Crypto from "expo-crypto";
import { finishWorkout, newWorkout } from "@/services/workoutService";

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
    const workout = newWorkout();

    set({ currentWorkout: workout });
  },
  finishWorkout: () => {
    const { currentWorkout } = get();

    if (!currentWorkout) {
      return;
    }

    const finishedWorkout = finishWorkout(currentWorkout);

    set((prevState) => ({
      currentWorkout: null,
      workouts: [finishedWorkout, ...prevState.workouts],
    }));
  },
}));
