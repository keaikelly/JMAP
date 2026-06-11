import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/JMAPLOGO.png")}
        style={{ width: 200, height: 200, marginBottom: 0, marginTop: -50 }}
      />
      <Text style={styles.logo}>JMAP</Text>

      <Text style={styles.subtitle}>흩어진 대화를 계획으로</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>새 계획 만들기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F6F0",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#0B3D3F",
    marginTop: -30,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },

  button: {
    marginTop: 40,
    backgroundColor: "#0B3D3F",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
