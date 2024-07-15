import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";

import Addition from "./Addition";
import ScaleMultiply from "./ScaleMultiply";
import Subtract from "./Subtract";
import TwoXA from "./TwoXA";
import TwoXB from "./TwoXB";
import TwoXAXB from "./TwoXAXB";
import Multiply from "./Multiply";

import CustomButton from "../Components/CustomButton";
import Cryptography from "./Cryptography";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="Addition" component={Addition} />
      <Stack.Screen name="Subtract" component={Subtract} />
      <Stack.Screen name="ScaleMultiply" component={ScaleMultiply} />
      <Stack.Screen name="TwoXA" component={TwoXA} />
      <Stack.Screen name="TwoXB" component={TwoXB} />
      <Stack.Screen name="TwoXAXB" component={TwoXAXB} />
      <Stack.Screen name="Multiply" component={Multiply} />
      <Stack.Screen name="Cryptography" component={Cryptography} />
    </Stack.Navigator>
  );
}

function MainScreen({ navigation }) {
  const HandleAdd = () => {
    navigation.navigate("Addition");
  };
  const HandleSub = () => {
    navigation.navigate("Subtract");
  };
  const HandleScale = () => {
    navigation.navigate("ScaleMultiply");
  };
  const HandleTwoXA = () => {
    navigation.navigate("TwoXA");
  };
  const HandleTwoXB = () => {
    navigation.navigate("TwoXB");
  };
  const HandleTwoXAXB = () => {
    navigation.navigate("TwoXAXB");
  };
  const HandleMultiply = () => {
    navigation.navigate("Multiply");
  };
  const HandleCryptography = () => {
    navigation.navigate("Cryptography");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="rgba(255,255,255,.0)" translucent />
      <View style={styles.ItemContainer}>
        <View style={styles.ContainerTitle}>
          <Text style={styles.TextTitle}>Matrix</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.ButtonContainer}>
            <CustomButton OnPress={HandleAdd} title={"Addition"} />
            <CustomButton OnPress={HandleSub} title={"Subtraction"} />
            <CustomButton OnPress={HandleScale} title={"ScaleMultiplication"} />
            <CustomButton OnPress={HandleTwoXA} title={"ScaleMultiply 2(A)"} />
            <CustomButton OnPress={HandleTwoXB} title={"ScaleMultiply 2(B)"} />
            <CustomButton
              OnPress={HandleTwoXAXB}
              title={"ScaleMultiply 2(A), 2(B)"}
            />
            <CustomButton OnPress={HandleMultiply} title={"Multiplication"} />
            <CustomButton OnPress={HandleCryptography} title={"Cryptography"} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a4164",
  },
  ItemContainer: {
    width: 300,
    height: 500,
    elevation: 5,
    backgroundColor: "#476683",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 20,
  },
  ContainerTitle: {
    // borderWidth: 1,
    width: 250,
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  TextTitle: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 25,
  },
  ButtonContainer: {
    paddingVertical: 10,
    // borderWidth: 1,
    width: 250,
    // height: 330,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
