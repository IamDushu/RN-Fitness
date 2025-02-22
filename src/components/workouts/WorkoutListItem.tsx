import { StyleSheet } from "react-native";
import Card from "../general/Card";
import { Text, View } from "../general/Themed";
import { FontAwesome5 } from "@expo/vector-icons";

export default function WorkoutListItem() {
  return (
    <Card title="15:08 Monday, 23 Sep">
      <View style={styles.row}>
        <Text style={styles.headingText}>Exercise</Text>
        <Text style={styles.headingText}>Best set</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.exerciseText}>3 x Barbell Row</Text>
        <Text style={styles.exerciseText}>7 x 75 kg</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.exerciseText}>3 x Barbell Row</Text>
        <Text style={styles.exerciseText}>7 x 75 kg</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.exerciseText}>3 x Barbell Row</Text>
        <Text style={styles.exerciseText}>7 x 75 kg</Text>
      </View>

      {/* Footer  */}
      <View style={styles.exerciseInfo}>
        <Text style={styles.infoText}>
          <FontAwesome5 name="clock" size={16} color="gray" /> 0:01
        </Text>
        <Text style={styles.infoText}>
          <FontAwesome5 name="weight-hanging" size={16} color="gray" /> 7035 kg
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
