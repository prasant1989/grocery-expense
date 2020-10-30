import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	ScrollView,
	Button,
} from "react-native";

import DropDownPicker from "react-native-dropdown-picker";

export default function Product() {
	const [name, setName] = useState("");
	const [unit, setUnit] = useState("");
	const [price, setPrice] = useState("");
	const [submitError, setError] = useState(false);
	const [submitted, trySubmit] = useState(false);

	const postMessage = () => {
		if (!name | !unit) {
			setError(true);
		} else {
			let data = {
				method: "POST",
				body: JSON.stringify({
					catalog: { name: name, unit: unit, price: price },
				}),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			};
			return fetch("http://192.168.43.91:3000/catalogs", data)
				.then((response) => response.json())
				.then((json) => setError(false));
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				{submitError ? (
					<Text style={styles.status}>
						Entered info in incorrect !
					</Text>
				) : (
					<Text style={styles.status}>
						Please enter the requested information
					</Text>
				)}
				{submitted ? (
					<Text>
						Name: {name}, Unit: {unit}
					</Text>
				) : (
					<Text style={styles.req}>* required</Text>
				)}

				<Text style={styles.label}>Unit *</Text>
				<DropDownPicker
					items={[
						{ label: "KG", value: "KG" },
						{ label: "Litre", value: "L" },
						{ label: "Unit", value: "UNIT" },
					]}
					containerStyle={{ height: 40 }}
					style={{ backgroundColor: "#fafafa" }}
					dropDownStyle={{ backgroundColor: "#fafafa", marginTop: 2 }}
					onChangeItem={(item) => setUnit(item.value)}
					placeholder="Select an unit"
					placeholderStyle={{ fontWeight: "bold" }}
				/>
				<Text style={styles.label}>Name *</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => setName(text)}
					value={name}
				/>

				<Text style={styles.label}>Price</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => setPrice(text)}
					value={price}
				/>

				<Button
					style={styles.button}
					title="Submit Product"
					onPress={() => postMessage()}
				/>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: "#fff",
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
	input: {
		height: 40,
		borderColor: "black",
		borderWidth: 1,
		fontSize: 26,
		fontFamily: "OpenSans",
		width: 250,
	},
	label: {
		fontSize: 18,
		fontFamily: "OpenSans",
		paddingTop: 20,
	},
	req: {
		fontFamily: "OpenSans",
		paddingTop: 10,
		fontStyle: "italic",
	},
	button: {
		marginLeft: "auto",
		marginRight: "auto",
		paddingTop: 10,
		paddingBottom: 10,
	},
	status: {
		paddingTop: 10,
		paddingBottom: 15,
	},
});
