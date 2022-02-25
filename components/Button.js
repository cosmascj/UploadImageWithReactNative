import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, Button } from "react-native";

const AppButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.ButtonView} onPress={props.event}>
        <Text style={styles.innerText}>{props.caption || "Button"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonView: {
    width: 125,
    height: 125,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 125 / 2,
    borderStyle: "dashed",
    // backgroundColor: "orange",
    borderWidth: 1,
  },
  innerText: {
    opacity: 0.5,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default AppButton;
