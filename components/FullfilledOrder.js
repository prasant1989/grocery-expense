import React, { useState, useRef, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { ListItem } from "react-native-elements";
import apiRequest from "../api_request";

export default function FulfilledOrder({ navigation }) {
  const [fulfilledOrders, setFulfilledOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  let isRendered = useRef(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      onRefresh();
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    setLoading(true);
    isRendered = true;
    apiRequest("/orders/fullfilled", {})
      .then((json) => {
        if (isRendered) {
          setFulfilledOrders(json.orders);
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
    apiRequest("/orders/fullfilled", {})
      .then((json) => setFulfilledOrders(json.orders))
      .catch((error) => console.error(error))
      .finally(() => setRefreshing(false));
  }, []);

  const renderItem = ({ item }) => (
    <ListItem bottomDivider button={true}>
      <ListItem.Content>
        <ListItem.Title>
          <Text style={{ fontWeight: "bold", color: "black" }}>
            Order# - {item.id} - Fullfilled on: {item.fullfilled_at}
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "bold", color: "black" }}>
            Fulfilled:{"\n"}
          </Text>
          <Text style={{ fontWeight: "bold", color: "green" }}>
            {item.order_details.fullfilled.map(
              (item, index) =>
                `\t${item.item_name}(${item.quantity} ${item.unit})\n`
            )}
          </Text>
          <Text style={{ color: "green" }}>Price: {item.price} /-</Text>
          <Text style={{ fontWeight: "bold", color: "black" }}>
            {"\n"}Rejected:{"\n"}
          </Text>
          <Text style={{ fontWeight: "bold", color: "red" }}>
            {item.order_details.rejected.map(
              (item, index) =>
                `\t${item.item_name}(${item.quantity} ${item.unit})\n`
            )}
          </Text>
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
  const itemSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          backgroundColor: "rgba(0,0,0,0.5)",
          marginLeft: 10,
          marginRight: 10,
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3A773F" />
      ) : (
        <FlatList
          data={fulfilledOrders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={itemSeparator}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
