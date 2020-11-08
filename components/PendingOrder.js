import React, { useState, useRef, useEffect } from "react";
import {
	FlatList,
	SafeAreaView,
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	ScrollView,
	RefreshControl,
} from "react-native";

export default function PendingOrder({ navigation }) {
	const [selectedId, setSelectedId] = useState(null);
	const [pendingOrders, setpendingOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	let isRendered = useRef(false);

	const Item = ({ item, onPress, style }) => (
		<TouchableOpacity onPress={onPress} style={[styles.item, style]}>
			<Text
				style={{
					fontStyle: "italic",
					fontWeight: "bold",
					fontSize: 16,
				}}
			>
				Order# - {item.id} - {item.order_date}
			</Text>

			<Text style={{ color: "#FFFF" }}>
				{item.order_details.map(
					(item, index) =>
						`${item.item_name}(${item.quantity} ${item.unit}) `
				)}
			</Text>
		</TouchableOpacity>
	);
	useEffect(() => {
		setLoading(true);
		isRendered = true;
		fetch("https://powerful-shelf-47496.herokuapp.com/orders")
			.then((response) => response.json())
			.then((json) => {
				if (isRendered) {
					setpendingOrders(json.orders);
				}
			})
			.catch((error) => console.error(error))
			.finally(() => {
				if (isRendered) {
					setLoading(false);
				}
			});
		return () => {
			isRendered = false;
		};
	}, []);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		fetch("https://powerful-shelf-47496.herokuapp.com/orders")
			.then((response) => response.json())
			.then((json) => setpendingOrders(json.orders))
			.catch((error) => console.error(error))
			.finally(() => setRefreshing(false));
	}, []);

	const renderItem = ({ item }) => {
		const backgroundColor = item.id === selectedId ? "#b7b3e3" : "#633689";

		return (
			<Item
				item={item}
				onPress={() => setSelectedId(item.id)}
				style={{ backgroundColor }}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			{loading ? (
				<ActivityIndicator size="large" color="#3A773F" />
			) : (
				<FlatList
					data={pendingOrders}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
					extraData={selectedId}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
				/>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: "5%",
	},
	item: {
		padding: 20,
		marginVertical: 5,
		marginHorizontal: 10,
	},
});
