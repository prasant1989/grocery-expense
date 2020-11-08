import "react-native-gesture-handler";

import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PendingOrder from "./PendingOrder";
import FullfilledOrder from "./FullfilledOrder";
import Header from "./Header";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabStack() {
	return (
		<Tab.Navigator
			initialRouteName="Pending Order"
			tabBarOptions={{
				activeTintColor: "#FFFFFF",
				inactiveTintColor: "#F8F8F8",
				style: {
					backgroundColor: "#633689",
				},
				labelStyle: {
					textAlign: "center",
				},
				indicatorStyle: {
					borderBottomColor: "#87B56A",
					borderBottomWidth: 2,
				},
			}}
		>
			<Tab.Screen name="Fulfilled Order" component={FullfilledOrder} />
			<Tab.Screen name="Pending Order" component={PendingOrder} />
		</Tab.Navigator>
	);
}

function App() {
	return (
		<Stack.Navigator
			initialRouteName="Pending Order"
			screenOptions={{
				headerStyle: { backgroundColor: "#633689" },
				headerTintColor: "#fff",
				headerTitleStyle: { fontWeight: "bold" },
			}}
		>
			<Stack.Screen
				name="Mohanty"
				component={TabStack}
				options={{ title: "Mohanty Store" }}
			/>
		</Stack.Navigator>
	);
}

export default App;
