import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	SafeAreaView,
	FlatList,
	ActivityIndicator,
	ScrollView,
	RefreshControl,
} from "react-native";
import { Fragment } from "react/cjs/react.production.min";
export default function Catalogpage() {
	const [refreshing, setRefreshing] = React.useState(false);
	const [dataLoading, finishLoading] = useState(true);
	const [allCatalogData, setAllCatalogData] = useState([]);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetch("http://192.168.43.91:3000/catalogs")
			.then((response) => response.json())
			.then((json) => setAllCatalogData(json.catalogs))
			.catch((error) => console.error(error))
			.finally(() => setRefreshing(false));
	}, []);
	useEffect(() => {
		fetch("http://192.168.43.91:3000/catalogs")
			.then((response) => response.json())
			.then((json) => setAllCatalogData(json.catalogs))
			.catch((error) => console.error(error))
			.finally(() => finishLoading(false));
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			{dataLoading ? (
				<ActivityIndicator />
			) : (
				<ScrollView
					scrollEnabled={true}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
				>
					<FlatList
						data={allCatalogData}
						renderItem={({ item }) => (
							<Fragment>
								<Text style={styles.blurb}>
									{item.name}({item.unit}) - {item.price}/-
									{item.created_at}
								</Text>
							</Fragment>
						)}
						keyExtractor={(item) => item.name}
					/>
				</ScrollView>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
