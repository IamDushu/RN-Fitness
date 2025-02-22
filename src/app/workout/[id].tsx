import { useLocalSearchParams } from "expo-router";
import { View, Text } from "@/components/general/Themed";
import WorkoutExerciseItem from "@/components/workouts/WorkoutExerciseItem";
import dummyWorkouts from "@/data/dummyWorkouts";
import { FlatList, StyleSheet } from "react-native";
import dayjs from "dayjs";

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();

  const workout = dummyWorkouts.find((w) => w.id === id);

  if (!workout) {
    return <Text>Workout not found</Text>;
  }

  return (
    <FlatList
      data={workout.exercises}
      renderItem={({ item }) => <WorkoutExerciseItem exercise={item} />}
      ListHeaderComponent={
        <View style={{ marginBottom: 20, backgroundColor: "transparent" }}>
          <Text style={styles.title}>Workout Details</Text>
          <Text style={styles.date}>
            {dayjs(workout.createdAt).format("hh:mm a, dddd D MMM")}
          </Text>
        </View>
      }
      contentContainerStyle={{ padding: 20, gap: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: "bold", letterSpacing: 0.8 },
  date: { fontSize: 16, marginTop: 8, letterSpacing: 1 },
});
