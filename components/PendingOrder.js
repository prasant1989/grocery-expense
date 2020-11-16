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
export default function PendingOrder({ navigation }) {
  const [selectedId, setSelectedId] = useState(null);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  let isRendered = useRef(false);

  useEffect(() => {
    setLoading(true);
    isRendered = true;
    apiRequest("/orders/pending", {})
      .then((json) => {
        if (isRendered) {
          setPendingOrders(json.orders);
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
    apiRequest("/orders", {})
      .then((json) => setPendingOrders(json.orders))
      .catch((error) => console.error(error))
      .finally(() => setRefreshing(false));
  }, []);

  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      button={true}
      onPress={() => navigation.navigate("OrderDetail", item)}
    >
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
      <ListItem.Chevron color="red" />
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
          data={pendingOrders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={selectedId}
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
