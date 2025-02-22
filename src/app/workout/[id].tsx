import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Workout : {id}</Text>
    </View>
  );
}
