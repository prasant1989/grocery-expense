import React, { useEffect, useState, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
	StyleSheet,
	ImageBackground,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Image,
	ActivityIndicator,
	TextInput,
	Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import logo from "../assets/emptycart.png";

import Icon from "react-native-vector-icons/FontAwesome";

export default function CartItem({ navigation, route }) {
	const cartProducts = route.params?.items;
	const [cartItems, setCartItems] = useState([]);
	const [cartItemsIsLoading, setCartItemsIsLoading] = useState(false);
	const [selectAll, setSelectAll] = useState(false);

	React.useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			if (cartProducts != undefined) {
				setCartItems(cartProducts);
			}
		});
		return unsubscribe;
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
			newItems[index]["qty"] = value;
			setCartItems(newItems); // set new state
		} else {
			console.log("No Match");
			const newItems = [...cartItems]; // clone the array
			newItems[index]["qty"] = 0;
			setCartItems(newItems); // set new state
		}
	};

	const subtotalPrice = () => {
		if (cartItems) {
			return cartItems.reduce(
				(sum, item) =>
					sum + (item.checked == 1 ? item.qty * item.price : 0),
				0
			);
		}
		return 0;
	};

	return (
		<View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
			<View
				style={{
					flexDirection: "row",
					backgroundColor: "#fff",
					marginBottom: 10,
				}}
			>
				<View style={[styles.centerElement, { width: 50, height: 50 }]}>
					<Ionicons name="ios-cart" size={25} color="#000" />
				</View>
				<View style={[styles.centerElement, { height: 50 }]}>
					<Text style={{ fontSize: 18, color: "#000" }}>
						Shopping Cart
					</Text>
				</View>
				{cartItems.length > 0 ? (
					<View
						style={[
							styles.centerElement,
							{ height: 50, paddingLeft: "25%" },
						]}
					>
						<TouchableOpacity
							style={[
								styles.centerElement,
								{
									backgroundColor: "#0faf9a",
									width: 100,
									height: 25,
									borderRadius: 5,
								},
							]}
							onPress={() => console.log("test")}
						>
							<Text style={{ color: "#ffffff" }}>
								Place Order
							</Text>
						</TouchableOpacity>
					</View>
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
											{item.name.toUpperCase()}
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
													item.qty * item.price
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
												{item.qty}
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
});
