import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Controller } from "react-hook-form";
import React, { useState } from "react";
// import * as Icon from "@expo/vector-icons";

export default function CustomInput({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  keyboardType = "default",
  OnMeSize,
  HeighSize,
  WidhtSize,
  HaveContent,
  getContent,
  enabCheck,
}) {
  const ChangeSizeBox = {
    ...styles.Box,
    width: OnMeSize ? WidhtSize : 375,
    height: OnMeSize ? HeighSize : 50,
  };
  const ChangeSize = {
    width: OnMeSize ? WidhtSize : 375,
    height: OnMeSize ? HeighSize : 50,
    padding: 10,
    // borderWidth: 1,
  };

  const handleGetData = (pass) => {
    getContent(pass);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View>
          <View
            style={[
              ChangeSizeBox,
              {
                borderColor: error ? "red" : "#1a4164",
                borderWidth: 1.3,
              },
            ]}
          >
            <TextInput
              value={value}
              onChangeText={(text) => {
                onChange(text); // Call the original onChange function
                handleGetData(text); // Call your custom handlePass function
              }}
              onBlur={onBlur}
              placeholder={placeholder}
              style={ChangeSize}
              //   secureTextEntry={Showpass}
              //   autoCorrect={false}
              autoCapitalize="words"
              //   autoComplete="off"
              keyboardType={keyboardType}
            />
          </View>
          {error && (
            <Text
              style={{
                paddingLeft: 8,
                fontSize: 11,
                // alignSelf: "stretch",
                color: "#DC143C",
                // borderWidth: 1,
                width: WidhtSize,
              }}
            >
              {error.message || "This field is required."}
            </Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  Box: {
    borderRadius: 15,
    backgroundColor: "#e8ecef",
    alignItems: "flex-start",
    justifyContent: "center",
    // padding: 10,
    margin: 5,
    flexDirection: "row",
  },
  icon: {
    // borderWidth: 1,
    bottom: 1,
    margin: 6,
    width: 20,
    color: "gray",
  },
  iconeye: {
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    width: 40,
    height: 50,
  },
});
