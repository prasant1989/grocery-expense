import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import imageB from "../assets/our-story-image-2.jpg";
import imageC from "../assets/our-story-image-3.jpg";

const blockA = `
    Welcome to Mohanty Store
`;

const blockB = `
    We are the leaders of B2C 
`;

export default function AboutGlobo() {
	return (
		<View style={styles.container}>
			<ScrollView>
				<Image source={imageC} style={{ width: "100%", height: 300 }} />
				<Text style={styles.text}>{blockA}</Text>
				<Image source={imageB} style={{ width: "100%", height: 300 }} />
				<Text style={styles.heading}>Leaders in our field</Text>
				<Text style={styles.text}>{blockB}</Text>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
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
