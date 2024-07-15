import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import CustomInput from "../Components/CustomInput";
import { AlertMessage } from "../Components/PopUpMessage";
import * as Icon from "@expo/vector-icons";

export default function Subtract() {
  const [AHolder, SetAHolder] = useState("");
  const [BHolder, SetBHolder] = useState("");
  const [AGetContent, setAGetContent] = useState([]);
  const [BGetContent, setBGetContent] = useState([]);
  const [Answer, setAnswer] = useState([]);
  const [isPress, setPress] = useState(false);
  const [ShowAlert, SetShowAlert] = useState(false);
  const [formatNum, setFormatNum] = useState(2);
  const [DoShowRes, setDoShowRes] = useState(false);

  let height;
  let BackColors;

  // console.log("->> ", AHolder);
  // console.log("->> ", BHolder);
  // console.log("Content ->> ", AContent);
  // console.log("Content ->> ", BContent);
  // console.log("Answer ->> ", Answer);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      AHolder: "",
      BHolder: "",
    },
  });

  // console.log("-> ", errors);

  const HandlePressIn = () => {
    setPress(true);
  };

  const OnSubmit = (listData) => {
    setPress(false);
    const AContent = ConvertToArray(listData.AHolder);
    const BContent = ConvertToArray(listData.BHolder);

    setAGetContent(AContent);
    setBGetContent(BContent);

    if (formatNum === 2) {
      setAnswer(SubComputationA(AContent, BContent));
    } else {
      setAnswer(SubComputationA(AContent, BContent));
    }
  };

  const ConvertToArray = (datas) => {
    const Array = datas.split(",").map((data) => parseInt(data.trim(), 10));

    if (
      (formatNum === 3 && Array.length !== 9) ||
      (formatNum !== 3 && Array.length !== 4)
    ) {
      SetShowAlert(true);
      return [];
    }

    setDoShowRes(true);
    return Array;
  };

  const SubComputationA = (datasA, datasB) => {
    const Compute = [];
    const minLength = Math.min(datasA.length, datasB.length);

    for (let i = 0; i < minLength; i++) {
      Compute.push(datasA[i] - datasB[i]);
    }
    return Compute;
  };

  if (errors.AHolder && errors.BHolder) {
    height = 320;
    BackColors = "firebrick";
  } else if (errors.AHolder) {
    height = 300;
    BackColors = "firebrick";
  } else if (errors.BHolder) {
    height = 300;
    BackColors = "firebrick";
  } else {
    height = 290;
    BackColors = "#e7eaed";
  }

  const HandlePress = {
    ...styles.button,
    backgroundColor: isPress ? BackColors : "#d0d6dc",
  };

  const HandleContainer = {
    ...styles.InputContainer,
    height: height,
  };

  const FormatContainerA = {
    ...styles.ButtonFormat,
    backgroundColor: formatNum === 2 ? "#2b4861" : "#d0d6dc",
  };

  const FormatContainerB = {
    ...styles.ButtonFormat,
    backgroundColor: formatNum === 3 ? "#2b4861" : "#d0d6dc",
  };

  const FormatTextA = {
    ...styles.FormatText,
    color: formatNum === 2 ? "#fff" : "#000",
  };

  const FormatTextB = {
    ...styles.FormatText,
    color: formatNum === 3 ? "#fff" : "#000",
  };

  const resets = () => {
    setAnswer([]);
    // SetAHolder("");
    // SetBHolder("");
    setAGetContent([]);
    setBGetContent([]);
    setDoShowRes(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="rgba(255,255,255,.0)" translucent />
      <AlertMessage
        doShow={ShowAlert}
        dohide={() => SetShowAlert(false)}
        Title={"Invalid Input"}
        Message={
          "It should contain 9 or 4 array items. The required size of the array is 3x3 or 9 item and 2x2 or 4 item."
        }
      />
      <ScrollView
        style={styles.ScrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            height: "auto",
            width: 390,
            // paddingVertical: 30,
            // backgroundColor: "pink",
          }}
        >
          <View style={styles.ContentContainer}>
            <View style={styles.HeaderContainer}>
              <Text style={styles.TitleText}>Subtraction</Text>
            </View>
            <View style={styles.AinputContainer}>
              <View style={HandleContainer}>
                <View style={styles.MiniHeader}>
                  <Text style={styles.textWarning}>
                    Note: Please enter a 2x2 array by providing 4 numbers
                    separated by commas or a 3x3 array with 9 numbers, all
                    separated by commas, without spaces.
                  </Text>
                </View>
                <View>
                  <View style={styles.InputText}>
                    {AHolder && (
                      <View style={styles.TextDisplay}>
                        <Text>A =</Text>
                      </View>
                    )}
                    <CustomInput
                      control={control}
                      name="AHolder"
                      rules={{ required: true }}
                      placeholder="A=..."
                      OnMeSize={true}
                      HeighSize={50}
                      WidhtSize={250}
                      getContent={SetAHolder}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.InputText}>
                    {BHolder && (
                      <View style={styles.TextDisplay}>
                        <Text>B =</Text>
                      </View>
                    )}
                    <CustomInput
                      control={control}
                      name="BHolder"
                      rules={{ required: true }}
                      placeholder="B=..."
                      OnMeSize={true}
                      HeighSize={50}
                      WidhtSize={250}
                      getContent={SetBHolder}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => [setFormatNum(2), resets()]}
                        activeOpacity={0.9}
                      >
                        <View style={FormatContainerA}>
                          <Text style={FormatTextA}>2x2</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => [setFormatNum(3), resets()]}
                        activeOpacity={0.9}
                      >
                        <View style={FormatContainerB}>
                          <Text style={FormatTextB}>3x3</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPressIn={HandlePressIn}
                      onPressOut={handleSubmit(OnSubmit)}
                      activeOpacity={0.9}
                    >
                      <View style={HandlePress}>
                        <Text>Submit</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {DoShowRes && (
              <View style={styles.AnswerContainer}>
                <View style={styles.AnswerHeader}>
                  <Text style={styles.TextAnswer}>Given: </Text>
                </View>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={styles.AValue}>
                      <View>
                        <Text>A = </Text>
                      </View>
                      <View style={styles.ImageContainer}>
                        <Image
                          source={require("./../assets/leftBracket.png")}
                          style={styles.ImagStyle}
                        />
                      </View>
                      <View style={styles.AnsweredContainer}>
                        {formatNum === 2 ? (
                          <>
                            <Text>
                              {AGetContent[0]}
                              {", "}
                              {AGetContent[1]}
                            </Text>
                            <Text>
                              {AGetContent[2]}
                              {", "}
                              {AGetContent[3]}
                            </Text>
                          </>
                        ) : (
                          <>
                            <Text>
                              {AGetContent[0]}
                              {", "}
                              {AGetContent[1]}
                              {", "}
                              {AGetContent[2]}
                            </Text>
                            <Text>
                              {AGetContent[3]}
                              {", "}
                              {AGetContent[4]}
                              {", "}
                              {AGetContent[5]}
                            </Text>
                            <Text>
                              {AGetContent[6]}
                              {", "}
                              {AGetContent[7]}
                              {", "}
                              {AGetContent[8]}
                            </Text>
                          </>
                        )}
                      </View>
                      <View style={styles.ImageContainer}>
                        <Image
                          source={require("./../assets/RightBracket.png")}
                          style={styles.ImagStyle}
                        />
                      </View>
                    </View>
                    <View style={styles.AValue}>
                      <View>
                        <Text>B = </Text>
                      </View>
                      <View style={styles.ImageContainer}>
                        <Image
                          source={require("./../assets/leftBracket.png")}
                          style={styles.ImagStyle}
                        />
                      </View>
                      <View style={styles.AnsweredContainer}>
                        {formatNum === 2 ? (
                          <>
                            <Text>
                              {BGetContent[0]}
                              {", "}
                              {BGetContent[1]}
                            </Text>
                            <Text>
                              {BGetContent[2]}
                              {", "}
                              {BGetContent[3]}
                            </Text>
                          </>
                        ) : (
                          <>
                            <Text>
                              {BGetContent[0]}
                              {", "}
                              {BGetContent[1]}
                              {", "}
                              {BGetContent[2]}
                            </Text>
                            <Text>
                              {BGetContent[3]}
                              {", "}
                              {BGetContent[4]}
                              {", "}
                              {BGetContent[5]}
                            </Text>
                            <Text>
                              {BGetContent[6]}
                              {", "}
                              {BGetContent[7]}
                              {", "}
                              {BGetContent[8]}
                            </Text>
                          </>
                        )}
                      </View>
                      <View style={styles.ImageContainer}>
                        <Image
                          source={require("./../assets/RightBracket.png")}
                          style={styles.ImagStyle}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: "center" }}>
                  <View style={styles.AnswerHeader}>
                    <Text style={styles.TextAnswer}>Answer: </Text>
                  </View>
                  <View style={styles.AValue}>
                    <View>
                      <Text>A - B = </Text>
                    </View>
                    <View style={styles.ImageContainer}>
                      <Image
                        source={require("./../assets/leftBracket.png")}
                        style={styles.ImagStyle}
                      />
                    </View>
                    <View style={styles.AnsweredContainer}>
                      {formatNum === 2 ? (
                        <>
                          <Text>
                            {AGetContent[0]} - {BGetContent[0]}
                            {",  "}
                            {AGetContent[1]} - {BGetContent[1]}
                          </Text>
                          <Text>
                            {AGetContent[2]} - {BGetContent[2]}
                            {",  "}
                            {AGetContent[3]} - {BGetContent[3]}
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text>
                            {AGetContent[0]} - {BGetContent[0]}
                            {",  "}
                            {AGetContent[1]} - {BGetContent[1]}
                            {",  "}
                            {AGetContent[2]} - {BGetContent[2]}
                          </Text>
                          <Text>
                            {AGetContent[3]} - {BGetContent[3]}
                            {",  "}
                            {AGetContent[4]} - {BGetContent[4]}
                            {",  "}
                            {AGetContent[5]} - {BGetContent[5]}
                          </Text>
                          <Text>
                            {AGetContent[6]} - {BGetContent[6]}
                            {",  "}
                            {AGetContent[7]} - {BGetContent[7]}
                            {",  "}
                            {AGetContent[8]} - {BGetContent[8]}
                          </Text>
                        </>
                      )}
                    </View>
                    <View style={styles.ImageContainer}>
                      <Image
                        source={require("./../assets/RightBracket.png")}
                        style={styles.ImagStyle}
                      />
                    </View>
                  </View>
                  <View style={styles.AValue}>
                    <View>
                      <Text>Answer = </Text>
                    </View>
                    <View style={styles.ImageContainer}>
                      <Image
                        source={require("./../assets/leftBracket.png")}
                        style={styles.ImagStyle}
                      />
                    </View>
                    <View style={styles.AnsweredContainer}>
                      {formatNum === 2 ? (
                        <>
                          <Text>
                            {Answer[0]}
                            {",  "}
                            {Answer[1]}
                          </Text>
                          <Text>
                            {Answer[2]}
                            {",  "}
                            {Answer[3]}
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text>
                            {Answer[0]}
                            {",  "}
                            {Answer[1]}
                            {",  "}
                            {Answer[2]}
                          </Text>
                          <Text>
                            {Answer[3]}
                            {",  "}
                            {Answer[4]}
                            {",  "}
                            {Answer[5]}
                          </Text>
                          <Text>
                            {Answer[6]}
                            {",  "}
                            {Answer[7]}
                            {",  "}
                            {Answer[8]}
                          </Text>
                        </>
                      )}
                    </View>
                    <View style={styles.ImageContainer}>
                      <Image
                        source={require("./../assets/RightBracket.png")}
                        style={styles.ImagStyle}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a4164",
  },
  ScrollContainer: {
    // paddingVertical: 60,
    // width: "100%",
    // borderWidth: 1,
    // backgroundColor: "red",
    height: "100%",
  },
  ContentContainer: {
    flex: 1,
    height: 800,
    // borderWidth: 1,
    alignItems: "center",
    // justifyContent: "",
  },
  HeaderContainer: {
    width: 300,
    height: 130,
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  TitleText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#fff",
  },
  AinputContainer: {
    width: 350,
    height: "auto",
    alignItems: "center",
  },
  InputContainer: {
    // borderWidth: 1,
    width: 350,
    // height: 290,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 0.9,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 20,
  },
  MiniHeader: {
    // borderWidth: 1,
    width: 300,
    height: 70,
    alignItems: "center",
  },
  textWarning: {
    fontSize: 12,
    color: "firebrick",
  },
  TextDisplay: {
    width: 50,
    height: 50,
    // borderWidth: 1,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  InputText: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  buttonContainer: {
    // borderWidth: 1,
    width: 300,
    height: 70,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button: {
    // borderWidth: 1,
    width: 75,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
  },
  ButtonFormat: {
    // borderWidth: 1,
    margin: 3,
    borderRadius: 5,
    padding: 5,
    elevation: 0.9,
  },
  FormatText: {
    fontWeight: "700",
  },
  AnswerContainer: {
    backgroundColor: "#fff",
    width: 350,
    borderRadius: 20,
    elevation: 0.9,
    marginTop: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 20,
  },
  AnswerHeader: {
    // borderWidth: 1,
    width: 300,
    paddingVertical: 10,
  },
  TextAnswer: {
    color: "firebrick",
    fontWeight: "700",
    fontSize: 15,
  },
  AValue: {
    padding: 5,
    // borderWidth: 1,
    width: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  AnsweredContainer: {
    // borderWidth: 1,
    // width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  ImageContainer: {
    // borderWidth: 1,
  },
  ImagStyle: {
    width: 20,
    height: 65,
  },
});
