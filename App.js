import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homepage from "./components/Home";
import { Platform } from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { navigationRef } from "./components/RootNavigation";
import CartItem from "./components/CartItem";
import About from "./components/About";
import Product from "./components/Product";
import Catalogpage from "./components/Catalog";
// global.API_URL = "http://192.168.43.91:3000/";

const Stack = createStackNavigator();
export default function App() {
	let [fontsLoaded] = useFonts({
		OpenSans: require("./assets/fonts/OpenSans-Regular.ttf"),
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<NavigationContainer
				style={{
					paddingTop:
						Platform.OS === "android" ? StatusBar.currentHeight : 0,
				}}
				ref={navigationRef}
			>
				<Stack.Navigator
					initialRouteName="About"
					headerMode="screen"
					screenOptions={{
						headerStyle: { backgroundColor: "green" },
					}}
				>
					<Stack.Screen
						name="Mohanty"
						component={Homepage}
						options={{
							header: () => (
								<Header headerDisplay="Mohanty Store" />
							),
						}}
					/>
					<Stack.Screen
						name="CartItem"
						component={CartItem}
						options={{
							header: () => <Header headerDisplay="Cart" />,
							title: "Shopping Cart",
						}}
					/>
					<Stack.Screen
						name="About"
						component={About}
						options={{
							header: () => (
								<Header headerDisplay="Mohanty Store" />
							),
						}}
					/>
					<Stack.Screen
						name="Product"
						component={Product}
						options={{
							header: () => (
								<Header headerDisplay="Add a Product" />
							),
						}}
					/>
					<Stack.Screen
						name="Catalog"
						component={Catalogpage}
						options={{
							header: () => <Header headerDisplay="Catalog" />,
						}}
					/>
				</Stack.Navigator>
				<Footer />
			</NavigationContainer>
		);
	}
}
