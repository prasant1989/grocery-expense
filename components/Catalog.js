import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ActivityIndicator,
	ScrollView,
} from "react-native";
import { Fragment } from "react/cjs/react.production.min";

export default function Catalogpage() {
	const [dataLoading, finishLoading] = useState(true);
	const [allCatalogData, setAllCatalogData] = useState([]);

	useEffect(() => {
		fetch("http://192.168.43.91:3000/catalogs")
			.then((response) => response.json())
			.then((json) => setAllCatalogData(json.catalogs))
			.catch((error) => console.error(error))
			.finally(() => finishLoading(false));
	}, []);

	return (
		<View style={styles.container}>
			{dataLoading ? (
				<ActivityIndicator />
			) : (
				<ScrollView>
					<FlatList
						nestedScrollEnabled
						data={allCatalogData}
						renderItem={({ item }) => (
							<Fragment>
								<Text style={styles.blurb}>
									{item.name}({item.unit})
								</Text>
							</Fragment>
						)}
						keyExtractor={(item) => item.name}
					/>
				</ScrollView>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		alignItems: "center",
	},
	button: {
		padding: 20,
		alignItems: "flex-start",
		justifyContent: "center",
	},
	buttontext: {
		fontFamily: "OpenSans",
		fontWeight: "bold",
	},
	storyimage: {
		height: 300,
		width: "100%",
	},
	title: {
		fontFamily: "OpenSans",
		fontWeight: "bold",
		fontSize: 20,
		padding: 20,
	},
	blurb: {
		fontFamily: "OpenSans",
		fontSize: 14,
		padding: 20,
		fontStyle: "italic",
	},
	content: {
		flex: 1,
		fontFamily: "OpenSans",
		fontSize: 16,
		paddingTop: 30,
		paddingBottom: 100,
		paddingLeft: 20,
		paddingRight: 20,
	},
});
