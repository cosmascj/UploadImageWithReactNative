import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import AppButton from "./components/Button";
import * as ImagePicker from "expo-image-picker";

export default function App(props) {
  const [profileImage, SetProfileImage] = useState("");

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // console.log(reponse);
    if (status !== "granted") {
      alert("sorry permission not granted");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!response.cancelled) {
        SetProfileImage(response.uri);
      }
      console.log(response);
    }
  };

  const upLoadProfileImage = () => {
    console.log(profileImage);
  };
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.ButtonView} onPress={openImageLibrary}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{
                height: "100%",
                width: "100%",
                // resizeMode: "contain",
                borderRadius: 50,
              }}
            />
          ) : (
            <Text style={styles.innerText}>Profile Image</Text>
          )}
        </TouchableOpacity>

        {profileImage ? (
          <TouchableOpacity
            style={{ marginTop: 20, backgroundColor: "green", borderRadius: 7 }}
            onPress={upLoadProfileImage}
          >
            <Text style={{ alignSelf: "center" }}>Upload</Text>
          </TouchableOpacity>
        ) : null}
      </View>
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
  button: {
    marginBottom: 0,
  },
  ButtonView: {
    width: 125,
    height: 125,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 125 / 2,
    borderStyle: "dashed",
    // backgroundColor: "orange",
    borderWidth: 0.9,
    overflow: "hidden",
  },
  innerText: {
    opacity: 0.5,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
