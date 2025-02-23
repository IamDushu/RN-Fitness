import { Link } from "expo-router";
import { Text, View } from "@/components/general/Themed";
import WorkoutListItem from "@/components/workouts/WorkoutListItem";
import { FlatList } from "react-native";
import workouts from "@/data/dummyWorkouts";
import CustomButton from "@/components/general/CustomButton";
import { create } from "zustand";

type State = {
  count: number;
  name: string;
};

type Actions = {
  resetName: (name: string) => void;
  resetCount: () => void;
  increaseCount: () => void;
};

const useStore = create<State & Actions>()((set, get) => {
  return {
    count: 10,
    name: "Dushu",
    resetName: (name) => {
      set({ name: name });
    },
    resetCount: () => {
      set({ count: 0 });
    },
    increaseCount: () => {
      // const prevCount = get().count;
      // set({ count: prevCount + 1 });

      set((prev) => ({ count: prev.count + 1 }));
    },
  };
});

const CounterDisplay = () => {
  const count = useStore((state) => state.count); //selectors

  return <Text style={{ fontSize: 40 }}>Count: {count}</Text>;
};

const DisplayName = () => {
  const name = useStore((state) => state.name); //selectors

  return <Text style={{ fontSize: 40 }}>Name: {name}</Text>;
};

export default function HomeScreen() {
  //we need to be speecific on selectors
  const resetCount = useStore((state) => state.resetCount);
  const increaseCount = useStore((state) => state.increaseCount);
  const changeName = useStore((state) => state.resetName);

  return (
    <View style={{ flex: 1 }}>
      <CounterDisplay />
      <DisplayName />
      <CustomButton title="Increase" onPress={increaseCount} />
      <CustomButton title="Reset" onPress={resetCount} />
      <CustomButton
        title="Change Name"
        onPress={() => changeName("Dushyanth")}
      />
    </View>
  );

  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       gap: 10,
  //       padding: 10,
  //       backgroundColor: "transparent",
  //     }}
  //   >
  //     <Link href="/workout/current" asChild>
  //       <CustomButton title="Resume workout" />
  //     </Link>

  //     <FlatList
  //       data={workouts}
  //       contentContainerStyle={{ gap: 8 }}
  //       renderItem={({ item }) => {
  //         const workoutWithDates = {
  //           ...item,
  //           createdAt: new Date(item.createdAt),
  //           finishedAt: new Date(item.finishedAt),
  //         };
  //         return <WorkoutListItem workout={workoutWithDates} key={item.id} />;
  //       }}
  //       showsVerticalScrollIndicator={false}
  //     />
  //   </View>
  // );
}
