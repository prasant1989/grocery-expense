import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	SafeAreaView,
	ActivityIndicator,
	ScrollView,
	RefreshControl,
	TouchableOpacity,
	Alert,
	View,
	Text,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
export default function Catalogpage() {
	const [refreshing, setRefreshing] = React.useState(false);
	const [dataLoading, finishLoading] = useState(true);
	const [allCatalogData, setAllCatalogData] = useState([]);
	const tableHead = ["Item", "Unit", "Price", "Edit", "Delete"];

	useEffect(() => {
		fetch("http://192.168.43.91:3000/catalogs")
			.then((response) => response.json())
			.then((json) => setAllCatalogData(json.catalogs))
			.catch((error) => console.error(error))
			.finally(() => finishLoading(false));
	}, []);

	const alertIndex = (index) => Alert.alert(`This is row ${index + 1}`);

	const edit_catalog = (data, index) => (
		<TouchableOpacity onPress={() => alertIndex(index)}>
			<View style={styles.btn}>
				<Text style={styles.btnText}>Edit</Text>
			</View>
		</TouchableOpacity>
	);

	const delete_catalog = (data, index) => (
		<TouchableOpacity onPress={() => alertIndex(index)}>
			<View style={styles.btn}>
				<Text style={styles.btnText}>Delete</Text>
			</View>
		</TouchableOpacity>
	);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetch("http://192.168.43.91:3000/catalogs")
			.then((response) => response.json())
			.then((json) => setAllCatalogData(json.catalogs))
			.catch((error) => console.error(error))
			.finally(() => setRefreshing(false));
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
					<Table
						borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}
					>
						<Row
							data={tableHead}
							style={styles.head}
							textStyle={styles.text}
						/>
						<Rows
							data={allCatalogData.map(function (catalog, index) {
								return [
									catalog.name,
									catalog.unit,
									catalog.price,
									edit_catalog(catalog.id, index),
									delete_catalog(catalog.id, index),
								];
							})}
							textStyle={styles.text}
						/>
					</Table>
				</ScrollView>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		paddingTop: 20,
		backgroundColor: "#fff",
	},
	head: { height: 30, backgroundColor: "#808B97" },
	text: { margin: 6 },
	row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
	btn: { width: 45, height: 18, backgroundColor: "#78B7BB", borderRadius: 2 },
	btnText: { textAlign: "center", color: "#fff" },
});
