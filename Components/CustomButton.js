import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const CustomButton = ({ title, OnPress }) => {
  const [isPress, setIsPress] = useState(false);

  const HandlePressIn = () => {
    setIsPress(true);
  };
  const HandlePressOut = () => {
    setIsPress(false);
  };
  const Clicked = {
    ...styles.Bottons,
    backgroundColor: isPress ? "#e8ecef" : "rgb(255,255,255)",
  };

  return (
    <TouchableOpacity
      onPress={() => OnPress()}
      onPressIn={HandlePressIn}
      onPressOut={HandlePressOut}
      activeOpacity={0.9}
    >
      <View style={Clicked}>
        <Text style={styles.TextButton}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  Bottons: {
    // borderWidth: 1,
    width: 225,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 9,
    borderRadius: 10,
    margin: 5,
  },
  TextButton: {
    color: "#0d2032",
    fontWeight: "500",
    fontSize: 15,
  },
});
