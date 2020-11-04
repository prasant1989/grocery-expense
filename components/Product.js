import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	ActivityIndicator,
	Alert,
	ImageBackground,
} from "react-native";
import logo from "../assets/Bgcart.png";
import CatalogForm from "./CatalogForm.js";
export default function Product({ navigation, route }) {
	const edit_catalog = {
		id: route.params?.id?.toString() || "",
		price: route.params?.price?.toString() || "",
		name: route.params?.name || "",
		unit: route.params?.unit || "",
	};
	const [catalog, setCatalog] = useState({
		id: "",
		price: "",
		name: "",
		unit: "",
	});

	const [loading, setLoading] = useState(false);
	const [submitError, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	React.useEffect(() => {
		if (edit_catalog != undefined) {
			setCatalog(edit_catalog);
		}
	}, [route.params]);
	const errorMessageDetails = () => {
		if (!catalog.name) {
			setErrorMessage("Item name empty / invalid !");
		} else if (!catalog.unit) {
			setErrorMessage("Item unit empty / invalid !");
		} else if (!catalog.price) {
			setErrorMessage("Item price empty / invalid !");
		}
	};

	const handleNameChange = (name) => {
		setCatalog({ ...catalog, name: name });
	};

	const handlePriceChange = (price) => {
		setCatalog({ ...catalog, price: price });
	};

	const handleUnitChange = (unit) => {
		setCatalog({ ...catalog, unit: unit });
	};

	const onSuccess = (data) =>
		Alert.alert(
			`Saved Item - ${data.catalog.name}`,
			`Item - ${data.catalog.name}\nUnit - ${data.catalog.unit}\nItem - ${data.catalog.price}`,
			[
				{
					text: "New Catalog",
					onPress: () => {},
					style: "cancel",
				},
				{
					text: "View Catalog",
					onPress: () => navigation.navigate("Catalog"),
				},
			]
		);

	const submitCatalog = (type) => {
		let method = "POST";
		let url = "http://192.168.43.91:3000/catalogs";
		if (type == "edit") {
			method = "PUT";
			url = `http://192.168.43.91:3000/catalogs/${catalog.id}`;
		}
		if (!catalog.name | !catalog.unit | !catalog.price) {
			errorMessageDetails();
			setError(true);
		} else {
			setLoading(true);
			let data = {
				method: method,
				body: JSON.stringify({
					catalog: {
						name: catalog.name,
						unit: catalog.unit,
						price: catalog.price,
					},
				}),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			};
			return fetch(url, data)
				.then((response) => {
					if (response.status === 200 || response.status === 201) {
						return Promise.resolve(response.json());
					}
					return Promise.resolve(response.json()).then(
						(responseInJson) => {
							return Promise.reject(responseInJson.error);
						}
					);
				})
				.then(
					(result) => {
						console.log("Success: ", result);
						setError(false);
						setCatalog({ name: "", price: "", unit: "" });
						onSuccess(result);
					},
					(error) => {
						console.log("Error: ", error);
						setErrorMessage(error);
						setError(true);
					}
				)
				.catch((catchError) => {
					setErrorMessage(catchError);
					console.log("Catch: ", catchError);
					setError(true);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	return (
		<View style={styles.container}>
			<ImageBackground source={logo} style={{ width: 280, height: 900 }}>
				<ScrollView>
					{submitError ? (
						<Text style={styles.status}>{errorMessage}</Text>
					) : (
						<Text style={styles.status}>
							Please enter the Catalog Details
						</Text>
					)}
					{loading ? (
						<ActivityIndicator size="large" color="#0000ff" />
					) : (
						<CatalogForm
							catalog={catalog}
							handleNameChange={handleNameChange}
							handlePriceChange={handlePriceChange}
							handleUnitChange={handleUnitChange}
							submitCatalog={submitCatalog}
						/>
					)}
				</ScrollView>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	input: {
		height: 30,
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
		paddingTop: 100,
		paddingBottom: 100,
	},
	status: {
		paddingTop: 10,
		paddingBottom: 15,
		color: "red",
		fontWeight: "bold",
	},
});
