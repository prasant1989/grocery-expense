import React, { Fragment, useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
export default function CatalogForm(props) {
  const {
    catalog,
    handleNameChange,
    handlePriceChange,
    handleUnitChange,
    submitCatalog,
  } = props;
  return (
    <Fragment>
      <Text style={styles.label}>Unit *</Text>
      <DropDownPicker
        items={[
          { label: "Kilogram", value: "KG" },
          { label: "Litre", value: "LTR" },
          { label: "Unit", value: "UNIT" },
        ]}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: "#fafafa" }}
        dropDownStyle={{
          backgroundColor: "#fafafa",
          marginTop: 2,
        }}
        onChangeItem={(item) => handleUnitChange(item.value)}
        placeholder="Select an unit"
        placeholderStyle={{ fontWeight: "bold" }}
        defaultValue={catalog.unit}
      />
      <Text style={styles.label}>Name *</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handleNameChange(text)}
        value={catalog.name}
        placeholder="Enter Item Name"
        clearTextOnFocus={true}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => handlePriceChange(text)}
        value={catalog.price}
        placeholder="Enter Item Price"
        keyboardType="decimal-pad"
      />
      <Text style={styles.label}></Text>
      <Button
        color="#00008b"
        style={styles.button}
        title={catalog.id != "" ? "Update Product" : "New Product"}
        onPress={() => submitCatalog(catalog.id != "" ? "edit" : "create")}
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    height: 30,
    borderWidth: 1,
    fontSize: 26,
    fontFamily: "OpenSans",
    width: 250,
    borderRadius: 5,
    backgroundColor: "#fafafa",
    color: "blue",
  },
  label: {
    fontSize: 18,
    fontFamily: "OpenSans",
    paddingTop: 20,
  },
  req: {
    fontFamily: "OpenSans",
    paddingTop: 10,
    fontStyle: "italic",
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 100,
    paddingBottom: 100,
  },
  status: {
    paddingTop: 10,
    paddingBottom: 15,
    color: "red",
    fontWeight: "bold",
  },
});
