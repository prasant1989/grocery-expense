import React, { useEffect, useState } from "react";
import {
	SafeAreaView,
	View,
	FlatList,
	StyleSheet,
	Text,
	StatusBar,
} from "react-native";

const renderItem = ({ item }) => <Item title={item.name} />;
const Item = ({ title }) => (
	<View style={styles.item}>
		<Text style={styles.title}>{title}</Text>
	</View>
);
export default function CartItem({ route, navigation }) {
	const { items } = route.params;
	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={items}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight || 0,
	},
	item: {
		backgroundColor: "#f9c2ff",
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
});
