import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as Icon from "@expo/vector-icons";

export function AlertMessage({
  Title,
  Message,
  img,
  backColor,
  doShow,
  dohide,
}) {
  const colored = {
    ...styles.headerContainer,
    backgroundColor: backColor ? backColor : "firebrick",
  };

  return (
    <Modal
      visible={doShow}
      animationType="slide"
      transparent
      onRequestClose={dohide}
    >
      <TouchableOpacity style={styles.TouchSize} onPress={dohide} />
      <View style={styles.MainContainer}>
        <View style={styles.SubContainer}>
          <View style={colored}>
            <Text style={styles.textHeader}>{Title}</Text>
            <Icon.Ionicons
              name="ios-close-circle-outline"
              size={25}
              color={"#fff"}
              onPress={dohide}
            />
          </View>
          <View style={styles.MessageContainer}>
            <Image />
            <Text style={{ textAlign: "justify", width: 225, fontSize: 12.5 }}>
              {Message}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  TouchSize: {
    // backgroundColor: "pink",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  MainContainer: {
    position: "absolute",
    // borderWidth: 1,
    marginTop: 325,
    marginLeft: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0)",
  },
  SubContainer: {
    backgroundColor: "#fff",
    width: 280,
    height: 125,
    borderRadius: 20,
    elevation: 30,
  },
  headerContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  textHeader: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  MessageContainer: {
    // flexDirection: "column",
    // borderWidth: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
