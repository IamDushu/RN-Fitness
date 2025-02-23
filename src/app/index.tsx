import { Link } from "expo-router";
import { Text, View } from "@/components/general/Themed";
import WorkoutListItem from "@/components/workouts/WorkoutListItem";
import { FlatList } from "react-native";
import workouts from "@/data/dummyWorkouts";
import CustomButton from "@/components/general/CustomButton";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        gap: 10,
        padding: 10,
        backgroundColor: "transparent",
      }}
    >
      <Link href="/workout/current" asChild>
        <CustomButton title="Resume workout" />
      </Link>

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
