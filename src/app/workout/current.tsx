import CustomButton from "@/components/general/CustomButton";
import SelectExerciseModal from "@/components/logger/SelectExerciseModal";
import WorkoutExerciseItem from "@/components/logger/WorkoutExerciseItem";
import WorkoutHeader from "@/components/logger/WorkoutHeader";
import { useWorkouts } from "@/store";
import { useHeaderHeight } from "@react-navigation/elements";
import { Redirect, router, Stack } from "expo-router";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";

export default function CurrentWorkoutScreen() {
  const headerHeight = useHeaderHeight();

  const finishWorkout = useWorkouts((state) => state.finishWorkout);
  const currentWorkout = useWorkouts((state) => state.currentWorkout);

  if (!currentWorkout) {
    return <Redirect href={"/"} />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <CustomButton
              title="Finish"
              onPress={() => finishWorkout()}
              style={{
                width: "auto",
                padding: 7,
                paddingHorizontal: 15,
              }}
            />
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={headerHeight}
      >
        <FlatList
          data={[1, 2, 3]}
          renderItem={() => <WorkoutExerciseItem />}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          ListHeaderComponent={<WorkoutHeader />}
          ListFooterComponent={
            <SelectExerciseModal
              onSelectExercise={(name) =>
                console.warn("Exercise seleted: ", name)
              }
            />
          }
        />
      </KeyboardAvoidingView>
    </>
  );
}
