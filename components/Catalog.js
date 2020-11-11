import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
  View,
  Text,
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "./Header";
import apiRequest from "../api_request";
export default function Catalogpage({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [allCatalogData, setAllCatalogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const tableHead = ["Item", "Unit", "Price", "Action"];

  let isRendered = useRef(false);
  useEffect(() => {
    setLoading(true);
    isRendered = true;
    apiRequest("/catalogs?page=all", {})
      .then((json) => {
        if (isRendered) {
          setAllCatalogData(json.catalogs);
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

  const alertIndex = (data, type) =>
    Alert.alert(
      `Item - ${data.name}`,
      `Id - ${data.id}\nName - ${data.name}\n`,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: type,
          onPress: () =>
            type === "edit" ? editCatalog(data) : deleteCatalog(data.id),
        },
      ],
      { cancelable: false }
    );

  const catalog_data = (data) => (
    <TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <Icon
            onPress={() => alertIndex(data, "edit")}
            padding={30}
            size={30}
            color="black"
            name="pencil-square"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Icon
            padding={30}
            size={30}
            color="red"
            name="minus-circle"
            onPress={() => alertIndex(data, "delete")}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  const editCatalog = (data) => {
    navigation.navigate("Product", data);
  };

  const deleteCatalog = (id) => {
    setLoading(true);
    let data = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    return apiRequest(`/catalogs/` + id, data)
      .then(
        (result) => {
          onRefresh();
        },
        (error) => {
          console.log("Error: ", error);
        }
      )
      .catch((catchError) => {
        console.log("Catch: ", catchError);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    apiRequest("/catalogs?page=all")
      .then((json) => setAllCatalogData(json.catalogs))
      .catch((error) => console.error(error))
      .finally(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header headerDisplay="Catalog" />
      {loading ? (
        <ActivityIndicator size="large" color="#3A773F" />
      ) : (
        <ScrollView
          scrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
            <Rows
              data={allCatalogData.map(function (catalog, index) {
                return [
                  catalog.name,
                  catalog.unit,
                  <View>
                    <Icon name="inr" color="#9C27B0">
                      <Text>{catalog.price}/-</Text>
                    </Icon>
                  </View>,
                  catalog_data({
                    id: catalog.id,
                    name: catalog.name,
                    price: catalog.price,
                    unit: catalog.unit,
                  }),
                ];
              })}
              textStyle={styles.text}
            />
          </Table>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 20,
    backgroundColor: "#fcf9e8",
  },
  head: { height: 30, backgroundColor: "#78B7BB" },
  text: { margin: 6, textAlign: "left", color: "#9C27B0" },
  absolute: {
    width: 100,
    height: 100,
    position: "absolute",
  },
});
