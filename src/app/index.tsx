import { Link } from "expo-router";
import { View } from "@/components/general/Themed";
import WorkoutListItem from "@/components/workouts/WorkoutListItem";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        gap: 10,
        padding: 10,
      }}
    >
      <WorkoutListItem />
    </View>
  );
}
