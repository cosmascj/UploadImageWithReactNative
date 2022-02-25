import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import AppButton from "./components/Button";
import * as ImagePicker from "expo-image-picker";

export default function App(props) {
  const openImageLibrary = async () => {
    const reponse = await ImagePicker.requestMediaLibraryPermissionsAsync();

    console.log(reponse);
  };
  return (
    <View style={styles.container}>
      <AppButton event={openImageLibrary} caption="upload" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
