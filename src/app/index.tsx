import { Link } from "expo-router";
import { View, Text } from "@/components/general/Themed";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        gap: 10,
      }}
    >
      <Link href="/workout/current">
        <Text> Go to Current workout</Text>
      </Link>
      <Link href="/workout/123">
        <Text>Go to workout 123</Text>
      </Link>
      <Text>Welcome</Text>
    </View>
  );
}
