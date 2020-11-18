import "react-native-gesture-handler";

import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PendingOrder from "./PendingOrder";
import FullfilledOrder from "./FullfilledOrder";
import CancelledOrder from "./CancelledOrder";

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
      <Tab.Screen name="Fullfilled Order" component={FullfilledOrder} />
      <Tab.Screen name="Cancelled Order" component={CancelledOrder} />
      <Tab.Screen name="Pending Order" component={PendingOrder} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <Stack.Navigator
      initialRouteName="Pending Order"
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "gray",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="Mohanty"
        component={TabStack}
        options={{
          title: "Order History",
        }}
      />
    </Stack.Navigator>
  );
}

export default App;
