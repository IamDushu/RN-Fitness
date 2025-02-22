import { useLocalSearchParams } from "expo-router";
import { View, Text } from "@/components/general/Themed";

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1 }}>
      <Text>Workout : {id}</Text>
    </View>
  );
}
