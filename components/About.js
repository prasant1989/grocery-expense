import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import imageB from "../assets/our-story-image-2.jpg";
import imageC from "../assets/our-story-image-3.jpg";
import Header from "./Header";
const welcome = "Welcome to Mohanty Store...";

const about = "Shopping is Fun with us ...";

export default function About() {
  return (
    <View style={styles.container}>
      <Header headerDisplay="Mohanty Store" />
      <ScrollView>
        <Image source={imageC} style={{ height: 300, width: "100%" }} />
        <Text style={styles.text}>{welcome}</Text>
        <Image source={imageB} style={{ width: "100%", height: 300 }} />
        <Text style={styles.heading}>
          Shop like Never Before at Mohanty Store{" "}
        </Text>
        <Text style={styles.text}>{about}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    position: "relative",
  },
  heading: {
    fontFamily: "OpenSans",
    fontWeight: "bold",
    paddingTop: 5,
  },
  text: {
    fontFamily: "OpenSans",
  },
});
