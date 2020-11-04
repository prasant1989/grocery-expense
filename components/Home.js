import React, { useState, useEffect, Fragment } from "react";
import {
	StyleSheet,
	Text,
	View,
	Modal,
	RefreshControl,
	SafeAreaView,
	FlatList,
	TextInput,
	TouchableHighlight,
	Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

const API_ENDPOINT = "http://192.168.43.91:3000/catalogs?page=all";

export default function Homepage() {
	const [search, setSearch] = useState("");
	const [refreshing, setRefreshing] = useState(false);
	const [filteredDataSource, setFilteredDataSource] = useState([]);
	const [masterDataSource, setMasterDataSource] = useState([]);
	const [cart, setCart] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		fetch(API_ENDPOINT)
			.then((response) => response.json())
			.then((responseJson) => {
				setFilteredDataSource(responseJson.catalogs);
				setMasterDataSource(responseJson.catalogs);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const searchFilterFunction = (text) => {
		// Check if searched text is not blank
		if (text) {
			// Inserted text is not blank
			// Filter the masterDataSource
			// Update FilteredDataSource
			const newData = masterDataSource.filter(function (item) {
				const itemData = item.name
					? item.name.toUpperCase()
					: "".toUpperCase();
				const textData = text.toUpperCase();
				return itemData.indexOf(textData) > -1;
			});
			setFilteredDataSource(newData);
			setSearch(text);
		} else {
			// Inserted text is blank
			// Update FilteredDataSource with masterDataSource
			setFilteredDataSource(masterDataSource);
			setSearch(text);
		}
	};

	const ItemView = ({ item }) => {
		return (
			// Flat List Item
			<View style={styles.fixToText}>
				<Text style={styles.itemStyle}>
					{item.name.toUpperCase()}({" "}
					<Icon name="rupee">
						<Text>{item.price}/- )</Text>
					</Icon>
				</Text>
				<Icon
					onPress={() => {
						let found = cart.some(
							(cart_item) =>
								cart_item.name === item.name &&
								cart_item.unit === item.unit
						);
						setCart(cart.concat(item));
						if (found) {
							Alert.alert(
								`${item.name} is already present in cart`
							);
						} else {
							setCart(cart.concat(item));
						}
					}}
					name="cart-plus"
					size={30}
					color="brown"
				/>
			</View>
			// <View>

			// 	<View style={{ flex: 1 }}>

			// 	</View>
			// </View>
		);
	};

	const ItemSeparatorView = () => {
		return (
			<View
				style={{
					height: 0.5,
					width: "100%",
					backgroundColor: "#C8C8C8",
				}}
			/>
		);
	};

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		setCart([]);
		fetch("http://192.168.43.91:3000/catalogs?page=all")
			.then((response) => response.json())
			.then((json) => {
				setFilteredDataSource(json.catalogs);
				setMasterDataSource(json.catalogs);
			})
			.catch((error) => console.error(error))
			.finally(() => setRefreshing(false));
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Icon
				name="cart-plus"
				size={30}
				color="brown"
				style={{ textAlign: "right" }}
				onPress={() => {
					setModalVisible(true);
				}}
			>
				<Text>{cart.length}</Text>
			</Icon>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				propagateSwipe={true}
			>
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<View style={styles.modalView}>
						{cart.map((item, index) => (
							<Text key={index} style={styles.modalText}>
								{item.name}
							</Text>
						))}

						<TouchableHighlight
							style={{
								...styles.openButton,
								backgroundColor: "#2196F3",
							}}
							onPress={() => {
								setModalVisible(!modalVisible);
							}}
						>
							<Text style={styles.textStyle}>Submit</Text>
						</TouchableHighlight>
					</View>
				</ScrollView>
			</Modal>

			<View style={styles.container}>
				<TextInput
					style={styles.textInputStyle}
					onChangeText={(text) => searchFilterFunction(text)}
					value={search}
					underlineColorAndroid="transparent"
					placeholder="Search your product Here"
				/>
				<FlatList
					data={filteredDataSource}
					keyExtractor={(item, index) => index.toString()}
					ItemSeparatorComponent={ItemSeparatorView}
					renderItem={ItemView}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#f0f8ff",
		// borderWidth: 1,
		flex: 1,
	},
	itemStyle: {
		padding: 10,
		flex: 1,
	},
	textInputStyle: {
		height: 40,
		borderWidth: 1,
		paddingLeft: 20,
		margin: 5,
		borderColor: "#009688",
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
	},
	fixToText: {
		flexDirection: "row",
		paddingEnd: 20,
		paddingStart: 10,
	},
	contentContainer: {
		paddingVertical: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	modalView: {
		margin: 50,
		backgroundColor: "white",
		borderRadius: 20,
		padding: "25%",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	openButton: {
		backgroundColor: "#F194FF",
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 10,
		// textAlign: "center",
	},
});
