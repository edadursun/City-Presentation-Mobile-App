import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function KayıtButonuGirisSayfasi(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Text style={styles.kayitOl}>Kayıt ol</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5
  },
  kayitOl: {
    color: "#fff",
    fontSize: 17
  }
});

export default KayıtButonuGirisSayfasi;
