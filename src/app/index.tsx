import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function index() {
  return (
    <View style={{ flex: 1, alignItems: "center", gap: 10 }}>
      <Link href="/workout/current">Go to Current workout</Link>
      <Link href="/workout/123">Go to workout 123</Link>
      <Text>Welcome</Text>
    </View>
  );
}
