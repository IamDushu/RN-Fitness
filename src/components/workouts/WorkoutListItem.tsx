import { StyleSheet } from "react-native";
import Card from "../general/Card";
import { Text, View } from "../general/Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { WorkoutWithExercises } from "@/types/models";
import { getWorkoutTotalWeight } from "@/services/workoutService";
import { getBestSet } from "@/services/setService";
import { calculateDuration } from "@/utils/time";
import dayjs from "dayjs";

type WorkoutListItem = {
  workout: WorkoutWithExercises;
};

export default function WorkoutListItem({ workout }: WorkoutListItem) {
  return (
    <Card
      title={dayjs(workout.createdAt).format("hh:mm a, dddd D MMM")}
      href={`/workout/${workout.id}`}
    >
      <View style={styles.row}>
        <Text style={styles.headingText}>Exercise</Text>
        <Text style={styles.headingText}>Best set</Text>
      </View>
      {workout.exercises.map((exercise) => {
        const bestSet = getBestSet(exercise.sets);

        return (
          <View style={styles.row} key={exercise.id}>
            <Text style={styles.exerciseText}>
              {exercise.sets.length} x {exercise.name}
            </Text>
            <Text style={styles.exerciseText}>
              {bestSet?.reps}{" "}
              {bestSet?.weight ? `x ${bestSet.weight} kg` : "reps"}
            </Text>
          </View>
        );
      })}

      {/* Footer  */}
      <View style={styles.exerciseInfo}>
        <Text style={styles.infoText}>
          <FontAwesome5 name="clock" size={16} color="gray" />{" "}
          {calculateDuration(workout.createdAt, workout.finishedAt)}
        </Text>
        <Text style={styles.infoText}>
          <FontAwesome5 name="weight-hanging" size={16} color="gray" />{" "}
          {getWorkoutTotalWeight(workout)} kg
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  headingText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  exerciseText: {
    color: "gray",
    fontSize: 17,
    letterSpacing: 1,
  },
  exerciseInfo: {
    flexDirection: "row",
    gap: 20,
    paddingTop: 15,
    marginTop: 10,
    borderTopColor: "gray",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  infoText: {
    fontSize: 17,
  },
});
