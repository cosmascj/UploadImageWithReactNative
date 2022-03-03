import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import client from "./apiService/client";
import axios, { Axios } from "axios";
import { launchImageLibrary } from "react-native-image-picker";

const App = (props) => {
  const BASEURL = axios.create({
    baseURL: "https://darot-image-upload-service.herokuapp.com/api/v1",
  });
  const url = "https://darot-image-upload-service.herokuapp.com/api/v1/upload";
  // const url = "https://clads-service.herokuapp.com/api/v1/customer/register";
  //const url = "https://jsonplaceholder.typicode.com/photos";

  const [profileImage, setProfileImage] = useState(" ");

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // const { status } = await ImagePicker.launchImageLibrary();

    // console.log(reponse);
    if (status !== "granted") {
      alert("sorry permission not granted");
      return;
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
      });
      console.log(response);
      if (!response.cancelled) {
        await setProfileImage(response.uri);

        // await console.log(profileImage);
      }
      // console.log(response);
      // console.log(profileImage);
    }
  };

  const pushData = async () => {
    const formData = new FormData();
    const newImageUri = "file:///" + profileImage.split("file:/").join("");

    // formData.append("file", {
    //   uri: profileImage,
    //   type: "image/jpeg",
    // });

    formData.append("file", {
      uri: profileImage,

      name: "image",

      type: "image/jpg",
    });

    // console.log(formData);
    //console.log(profileImage);

    // await axios
    //   .post(url, formData)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((error) => console.log(error));

    fetch(url, {
      method: "POST",

      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((r) => r.json())

      .then((data) => {
        console.log(data);
      })

      .catch((err) => console.log(err));
  };

  const upLoadProfileImage = async () => {
    const formData = new FormData();
    formData.append("fileId", {
      file: profileImage,
      fileType: "image/png",
    });
    console.log(profileImage);
    //console.log(formData);
    try {
      const res = await client.post("/api/v1/upload", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
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
                borderRadius: 50,
              }}
            />
          ) : (
            <Text style={styles.placeholderText}>Profile Image</Text>
          )}
        </TouchableOpacity>

        {profileImage ? (
          <TouchableOpacity
            style={{ marginTop: 20, backgroundColor: "green", borderRadius: 7 }}
            onPress={pushData}
          >
            <Text style={{ alignSelf: "center" }}>Upload</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

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
  placeholderText: {
    opacity: 0.5,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
export default App;
