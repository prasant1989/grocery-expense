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
	Button,
	ActivityIndicator,
} from "react-native";
import { Badge, withBadge } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import Header from "./Header";

// import { CommonActions } from "@react-navigation/native";
const API_ENDPOINT = `https://powerful-shelf-47496.herokuapp.com/catalogs?page=all`;

// export const resetStackAndNavigate = (navigation) => {
// 	navigation.dispatch(
// 		CommonActions.navigate({
// 			name: "Home",
// 		})
// 	);
// };
export default function Homepage({ navigation }) {
	const [search, setSearch] = useState("");
	const [refreshing, setRefreshing] = useState(false);
	const [filteredDataSource, setFilteredDataSource] = useState([]);
	const [masterDataSource, setMasterDataSource] = useState([]);
	const [cart, setCart] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const isFocused = useIsFocused();
	useEffect(() => {
		setRefreshing(true);
		fetch(API_ENDPOINT)
			.then((response) => response.json())
			.then((responseJson) => {
				setRefreshing(false);
				setFilteredDataSource(responseJson.catalogs);
				setMasterDataSource(responseJson.catalogs);
			})
			.catch((error) => {
				setRefreshing(false);
				console.error(error);
			});
	}, []);

	if (!isFocused && cart.length > 0) {
		setCart([]);
	}

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
						const found = cart.some(
							(cart_item) =>
								cart_item.name === item.name &&
								cart_item.unit === item.unit
						);

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
		fetch(`https://powerful-shelf-47496.herokuapp.com/catalogs?page=all`)
			.then((response) => response.json())
			.then((json) => {
				setFilteredDataSource(json.catalogs);
				setMasterDataSource(json.catalogs);
			})
			.catch((error) => console.error(error))
			.finally(() => setRefreshing(false));
	}, []);

	function deleteCartItem(item) {
		const found = cart.some(
			(cart_item) =>
				cart_item.name === item.name && cart_item.unit === item.unit
		);
		if (found) {
			const filteredCart = cart.filter(
				(cartItem) => cartItem.id !== item.id
			);
			if (filteredCart.length == 0) {
				setModalVisible(false);
			}
			setCart(filteredCart);
		}
	}
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header headerDisplay="Mohanty Store" />
			<Icon
				name="cart-plus"
				size={30}
				color="brown"
				style={{ textAlign: "right", paddingRight: 10 }}
				onPress={() => {
					if (cart.length != 0) {
						setModalVisible(true);
					}
				}}
			>
				{/* <Text>{cart.length}</Text> */}
			</Icon>
			<Badge
				value={cart.length}
				status="success"
				containerStyle={{
					// position: "absolute",
					paddingLeft: "90%",
					top: -30,
				}}
			/>

			<TextInput
				style={styles.textInputStyle}
				onChangeText={(text) => searchFilterFunction(text)}
				value={search}
				underlineColorAndroid="transparent"
				placeholder="Search from available product Here"
			/>
			{refreshing ? (
				<ActivityIndicator size="large" color="#3A773F" />
			) : (
				<View style={styles.container}>
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
			)}

			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				propagateSwipe={true}
			>
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<View style={styles.modalView}>
						{cart.map((item, index) => (
							<Text
								onPress={() => deleteCartItem(item)}
								key={index}
								style={styles.modalText}
							>
								{item.name}{" "}
								<Ionicons
									name="md-remove-circle"
									size={24}
									color="brown"
								/>
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
							<Text
								onPress={() => {
									setModalVisible(false);
									navigation.navigate("CartItem", {
										items: cart.map((cart) => ({
											...cart,
											quantity: 1,
											checked: 1,
										})),
									});
								}}
								style={styles.textStyle}
							>
								Submit
							</Text>
						</TouchableHighlight>
					</View>
				</ScrollView>
			</Modal>
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
		padding: 40,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		textAlign: "left",
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
		fontSize: 20,
		textAlign: "left",
	},
});
