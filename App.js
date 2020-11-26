import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Homepage from "./components/Home";
import { Platform } from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import OrderDetail from "./components/OrderDetail";
import { navigationRef } from "./components/RootNavigation";
import CartItem from "./components/CartItem";
import About from "./components/About";
import Product from "./components/Product";
import Order from "./components/Order";
import Catalogpage from "./components/Catalog";
import Icon from "react-native-vector-icons/FontAwesome";
// Import Screens
import SplashScreen from "./Screen/SplashScreen";
import LoginScreen from "./Screen/LoginScreen";
import RegisterScreen from "./Screen/RegisterScreen";

const BottomStack = createBottomTabNavigator();
const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: "Register", //Set Header Title
          headerStyle: {
            backgroundColor: "green", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const BottomTab = () => {
  return (
    <BottomStack.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarButton: ["CartItem", "OrderDetail"].includes(route.name)
          ? () => {
              return null;
            }
          : undefined,
      })}
    >
      <BottomStack.Screen
        name="Home"
        component={Homepage}
        options={{
          tabBarIcon: (tabInfo) => (
            <Icon name="home" size={18} color={tabInfo.tintColor} />
          ),
        }}
      />
      <BottomStack.Screen name="CartItem" component={CartItem} />
      <BottomStack.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: (tabInfo) => (
            <Icon name="book" size={18} color={tabInfo.tintColor} />
          ),
        }}
      />
      <BottomStack.Screen
        name="Product"
        component={Product}
        options={{
          tabBarIcon: (tabInfo) => (
            <Icon name="product-hunt" size={18} color={tabInfo.tintColor} />
          ),
        }}
      />
      <BottomStack.Screen
        name="Order"
        component={Order}
        options={{
          tabBarIcon: (tabInfo) => (
            <Icon name="list-alt" size={18} color={tabInfo.tintColor} />
          ),
        }}
      />
      <BottomStack.Screen
        name="Catalog"
        component={Catalogpage}
        options={{
          tabBarIcon: (tabInfo) => (
            <Icon name="gift" size={18} color={tabInfo.tintColor} />
          ),
        }}
      />
      <BottomStack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{
          tabBarIcon: (tabInfo) => (
            <Icon name="gift" size={18} color={tabInfo.tintColor} />
          ),
        }}
      />
    </BottomStack.Navigator>
  );
};
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
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
        ref={navigationRef}
      >
        <Stack.Navigator initialRouteName="SplashScreen">
          {/* SplashScreen which will come once for 5 Seconds */}
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            // Hiding header for Splash Screen
            options={{ headerShown: false }}
          />
          {/* Auth Navigator: Include Login and Signup */}
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false }}
          />
          {/* Navigation Drawer as a landing page */}
          <Stack.Screen
            name="HomeScreen"
            component={BottomTab}
            // Hiding header for Navigation Drawer
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
