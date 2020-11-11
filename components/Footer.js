import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as RootNavigation from "./RootNavigation";
import Icon from "react-native-vector-icons/AntDesign";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => RootNavigation.navigate("Home")}
      >
        <Icon name="home" size={30} color="blue"></Icon>
        <Text>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => RootNavigation.navigate("About")}
      >
        <Icon name="rocket1" size={30} color="blue"></Icon>
        <Text>About</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => RootNavigation.navigate("Product", { refresh: false })}
      >
        <Icon name="addfile" size={30} color="blue"></Icon>
        <Text>Add </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => RootNavigation.navigate("Order")}
      >
        <Icon name="gift" size={30} color="blue"></Icon>
        <Text>Order </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => RootNavigation.navigate("Catalog")}
      >
        <Icon name="gift" size={30} color="blue"></Icon>
        <Text>Catalog </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    // backgroundColor: "#778899",
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // margin: 1,
  },
  button: {
    padding: 20,
  },
});
