import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as RootNavigation from "./RootNavigation";

export default function Footer() {
	return (
		<View style={styles.footer}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => RootNavigation.navigate("Mohanty")}
			>
				<Text>Home</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.button}
				onPress={() => RootNavigation.navigate("About")}
			>
				<Text>About</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.button}
				onPress={() =>
					RootNavigation.navigate("Product", { refresh: false })
				}
			>
				<Text>Product</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.button}
				onPress={() => RootNavigation.navigate("Catalog")}
			>
				<Text>Catalog</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	footer: {
		// backgroundColor: "#778899",
		width: "100%",
		height: 70,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "center",
	},
	button: {
		padding: 20,
	},
});
