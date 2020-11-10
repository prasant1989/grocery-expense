import React, { useEffect, useState, Fragment } from "react";
import {
	StyleSheet,
	ImageBackground,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
	TouchableHighlight,
	TextInput,
	Alert,
	Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import logo from "../assets/emptycart.png";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import Header from "./Header";

const API_HOST = "http://192.168.43.91:3000";

export default function OrderDetail({ navigation, route }) {
	const [cartItems, setCartItems] = useState([]);
	const [cartItemsIsLoading, setCartItemsIsLoading] = useState(false);
	const [selectAll, setSelectAll] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	useEffect(() => {
		setCartItemsIsLoading(true);
		fetch(`${API_HOST}/orders/${route.params.id}`)
			.then((res) => res.json())
			.then((json) => {
				setCartItemsIsLoading(false);
				setCartItems(json.order.order_details);
			})
			.catch((error) => console.error(error))
			.finally(() => setCartItemsIsLoading(false));
	}, [route.params]);

	const selectHandler = (index, value) => {
		const newItems = [...cartItems]; // clone the array

		newItems[index]["checked"] = value == 1 ? 0 : 1; // set the new value
		setCartItems(newItems); // set new state
	};

	const selectHandlerAll = (value) => {
		const newItems = [...cartItems]; // clone the array
		newItems.map((item, index) => {
			newItems[index]["checked"] = value == true ? 0 : 1; // set the new value
		});
		setCartItems(newItems);
		setSelectAll(value == true ? false : true);
	};

	const deleteHandler = (index) => {
		Alert.alert(
			"Are you sure you want to delete this item from your cart?",
			"",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
				{
					text: "Delete",
					onPress: () => {
						let updatedCart = [...cartItems]; /* Clone it first */
						updatedCart.splice(
							index,
							1
						); /* Remove item from the cloned cart state */
						setCartItems(updatedCart); /* Update the state */
					},
				},
			],
			{ cancelable: false }
		);
	};

	const quantityHandler = (value, index) => {
		if (value.match(/^[\d\.]+$/)) {
			const newItems = [...cartItems]; // clone the array
			newItems[index]["quantity"] = value;
			setCartItems(newItems); // set new state
		} else {
			console.log("No Match");
			const newItems = [...cartItems]; // clone the array
			newItems[index]["quantity"] = 0;
			setCartItems(newItems); // set new state
		}
	};

	const subtotalPrice = () => {
		if (cartItems) {
			return cartItems.reduce(
				(sum, item) =>
					sum + (item.checked == 1 ? item.quantity * item.price : 0),
				0
			);
		}
		return 0;
	};

	const placeOrder = () => {
		console.log("Placing Order");
	};

	const addItem = () => {
		setModalVisible(!modalVisible);
	};

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#f6f6f6",
			}}
		>
			<Header headerDisplay="Cart" />
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>Hello World!</Text>

						<Text style={styles.textStyle}>Hide Modal</Text>
						<Button
							title="Add New Item"
							onPress={() => setModalVisible(!modalVisible)}
							icon={
								<Icon
									name="plus-circle"
									size={15}
									color="white"
								/>
							}
							iconRight
						/>
					</View>
				</View>
			</Modal>
			<View
				style={{
					flexDirection: "row",
					backgroundColor: "#fff",
					marginBottom: 10,
					justifyContent: "space-between",
				}}
			>
				{cartItems.length > 0 ? (
					<Fragment>
						<Button
							title="Add Item"
							onPress={() => addItem()}
							icon={
								<Icon
									name="plus-circle"
									size={15}
									color="white"
								/>
							}
							iconRight
						/>

						<Button
							title="Fullfill"
							icon={
								<Icon
									name="check-square-o"
									size={15}
									color="white"
								/>
							}
							onPress={() => placeOrder()}
						/>
					</Fragment>
				) : (
					<View>
						<Text style={{ color: "#ffffff" }}>No Items</Text>
					</View>
				)}
			</View>

			{cartItemsIsLoading ? (
				<View style={[styles.centerElement, { height: 300 }]}>
					<ActivityIndicator size="large" color="#ef5739" />
				</View>
			) : (
				<ScrollView>
					{cartItems &&
						cartItems.map((item, i) => (
							<View
								key={i}
								style={{
									flexDirection: "row",
									backgroundColor: "#fff",
									marginBottom: 2,
									height: 120,
								}}
							>
								<View
									style={[
										styles.centerElement,
										{ width: 60 },
									]}
								>
									<TouchableOpacity
										style={[
											styles.centerElement,
											{ width: 32, height: 32 },
										]}
										onPress={() =>
											selectHandler(i, item.checked)
										}
									>
										<Ionicons
											name={
												item.checked == 1
													? "ios-checkmark-circle"
													: "ios-checkmark-circle-outline"
											}
											size={25}
											color={
												item.checked == 1
													? "#0faf9a"
													: "#aaaaaa"
											}
										/>
									</TouchableOpacity>
								</View>
								<View
									style={{
										flexDirection: "row",
										flexGrow: 1,
										flexShrink: 1,
										alignSelf: "center",
									}}
								>
									<View
										style={{
											flexGrow: 1,
											flexShrink: 1,
											alignSelf: "center",
										}}
									>
										<Text
											numberOfLines={1}
											style={{ fontSize: 15 }}
										>
											{item.item_name.toUpperCase()}
										</Text>
										<Text
											numberOfLines={1}
											style={{ color: "#8f8f8f" }}
										>
											{item.price
												? "Price: " +
												  item.price +
												  "/- Per " +
												  item.unit
												: ""}
										</Text>
										<Text
											numberOfLines={1}
											style={{
												color: "#333333",
												marginBottom: 10,
											}}
										>
											<Icon name="inr" color="#9C27B0">
												{" "}
												{(
													item.quantity * item.price
												).toFixed(2)}
											</Icon>
										</Text>
										<View style={{ flexDirection: "row" }}>
											<TextInput
												keyboardType="decimal-pad"
												onChangeText={(text) =>
													quantityHandler(text, i)
												}
												style={{
													borderWidth: 1,
													borderColor: "#cccccc",
													paddingHorizontal: 7,
													paddingTop: 3,
													color: "#bbbbbb",
													fontSize: 13,
												}}
											>
												{item.quantity}
											</TextInput>
										</View>
									</View>
								</View>
								<View
									style={[
										styles.centerElement,
										{ width: 60 },
									]}
								>
									<TouchableOpacity
										style={[
											styles.centerElement,
											{ width: 32, height: 32 },
										]}
										onPress={() => deleteHandler(i)}
									>
										<Ionicons
											name="md-trash"
											size={25}
											color="#ee4d2d"
										/>
									</TouchableOpacity>
								</View>
							</View>
						))}
				</ScrollView>
			)}

			{cartItems.length > 0 ? (
				<View
					style={{
						backgroundColor: "#fff",
						borderTopWidth: 2,
						borderColor: "#f6f6f6",
						paddingVertical: 5,
					}}
				>
					<View style={{ flexDirection: "row" }}>
						<View style={[styles.centerElement, { width: 60 }]}>
							<TouchableOpacity
								style={[
									styles.centerElement,
									{ width: 32, height: 32 },
								]}
								onPress={() => selectHandlerAll(selectAll)}
							>
								<Ionicons
									name={
										selectAll == true
											? "ios-checkmark-circle"
											: "ios-checkmark-circle-outline"
									}
									size={25}
									color={
										selectAll == true
											? "#0faf9a"
											: "#aaaaaa"
									}
								/>
							</TouchableOpacity>
						</View>
						<View
							style={{
								flexDirection: "row",
								flexGrow: 1,
								flexShrink: 1,
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Text>Select All</Text>
							<View
								style={{
									flexDirection: "row",
									paddingRight: 20,
									alignItems: "center",
								}}
							>
								<Text style={{ color: "#8f8f8f" }}>
									SubTotal:{" "}
								</Text>
								<Icon name="inr" color="#9C27B0" size={20} />
								<Text>{subtotalPrice().toFixed(2)}</Text>
							</View>
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-end",
							height: 30,
							paddingRight: 20,
							alignItems: "center",
						}}
					></View>
				</View>
			) : (
				<ImageBackground
					source={logo}
					style={{ width: "100%", height: "80%" }}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	centerElement: { justifyContent: "center", alignItems: "center" },
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
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
		marginBottom: 15,
		textAlign: "center",
	},
});
