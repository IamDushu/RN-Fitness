import { StyleSheet } from "react-native";
import Card from "../general/Card";
import { Text, View } from "../general/Themed";
import { ExerciseSet, ExerciseWithSets } from "@/types/models";
import { getBestSet } from "@/services/setService";
import Colors from "@/constants/Colors";

type WorkoutExerciseItem = {
  exercise: ExerciseWithSets;
};

export default function WorkoutExerciseItem({ exercise }: WorkoutExerciseItem) {
  const bestSet = getBestSet(exercise.sets);

  return (
    <Card title={exercise.name}>
      {exercise.sets.map((set, index) => (
        <View
          style={[
            styles.setRow,
            {
              backgroundColor:
                set.id === bestSet?.id
                  ? Colors.dark.tint + "50"
                  : "transparent",
            },
          ]}
          key={set.id}
        >
          <Text style={styles.setIndex}>{index + 1}</Text>
          <Text style={styles.setInfo}>
            {set.reps} {set.weight ? `x ${set.weight} kg` : "reps"}
          </Text>
          <Text style={styles.setOneRm}>{Math.floor(set.oneRM ?? 0)} kg</Text>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  setRow: {
    flexDirection: "row",
    gap: 15,
    padding: 8,
  },
  setIndex: {
    fontSize: 16,
    color: "gray",
  },
  setInfo: {
    fontSize: 16,
  },
  setOneRm: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: "auto",
  },
});
