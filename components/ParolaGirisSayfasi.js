import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

function ParolaGirisSayfasi(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TextInput style={styles.inputStyle} placeholder= "Parola" secureTextEntry ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingLeft: 16
  },
  parola: {
    fontSize: 16,
    lineHeight: 16,
    paddingTop: 16,
    paddingBottom: 8,
    color: "#000",
    opacity: 0.5,
    alignSelf: "flex-start"
  },
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 25,
    paddingTop: 14,
    paddingBottom: 8,
    paddingLeft: 10
  }
});

export default ParolaGirisSayfasi;
