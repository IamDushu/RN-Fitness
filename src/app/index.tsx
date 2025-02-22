import { Link } from "expo-router";
import { View } from "@/components/general/Themed";
import WorkoutListItem from "@/components/workouts/WorkoutListItem";
import { FlatList } from "react-native";
import workouts from "@/data/dummyWorkouts";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        gap: 10,
        padding: 10,
      }}
    >
      <FlatList
        data={workouts}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => {
          const workoutWithDates = {
            ...item,
            createdAt: new Date(item.createdAt),
            finishedAt: new Date(item.finishedAt),
          };
          return <WorkoutListItem workout={workoutWithDates} key={item.id} />;
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
