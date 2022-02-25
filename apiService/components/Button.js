import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, Button } from "react-native";

const AppButton = () => {
  return (
    <TouchableOpacity onPress={props.event}>
      <Text></Text>
    </TouchableOpacity>
  );
};

export default AppButton;
