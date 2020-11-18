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
import { ListItem } from "react-native-elements";
import apiRequest from "../api_request";
import { useIsFocused } from "@react-navigation/native";

export default function CancelledOrder({ navigation }) {
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  let isRendered = useRef(false);
  if (!isFocused && cancelledOrders.length > 0) {
    setCancelledOrders([]);
  }
  useEffect(() => {
    setLoading(true);
    isRendered = true;
    apiRequest("/orders/cancelled", {})
      .then((json) => {
        if (isRendered) {
          setCancelledOrders(json.orders);
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
    apiRequest("/orders/cancelled", {})
      .then((json) => setCancelledOrders(json.orders))
      .catch((error) => console.error(error))
      .finally(() => setRefreshing(false));
  }, []);

  const renderItem = ({ item }) => (
    <ListItem bottomDivider button={true}>
      <ListItem.Content>
        <ListItem.Title>
          <Text style={{ fontWeight: "bold" }}>
            Order# - {item.id} -{" "}
            {item.order_details.map(
              (item, index) =>
                `${item.item_name}(${item.quantity} ${item.unit}) `
            )}
          </Text>
        </ListItem.Title>
        <ListItem.Subtitle>
          <Text style={{ color: "#633689" }}> Date: {item.order_date}</Text>
        </ListItem.Subtitle>
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
          data={cancelledOrders}
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
