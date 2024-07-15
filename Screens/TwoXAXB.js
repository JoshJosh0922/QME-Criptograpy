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

export default function TwoXAXB() {
  const [AHolder, SetAHolder] = useState("");
  const [BHolder, SetBHolder] = useState("");
  const [ANewContent, setANewContent] = useState([]);
  const [BNewContent, setBNewContent] = useState([]);
  const [AGetContent, setAGetContent] = useState([]);
  const [BGetContent, setBGetContent] = useState([]);
  const [Answer, setAnswer] = useState([]);
  const [isPress, setPress] = useState(false);
  const [ShowAlert, SetShowAlert] = useState(false);
  const [formatNum, setFormatNum] = useState(2);
  const [Operation, setOperation] = useState("+");
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
      setAnswer(AddComputationA(AContent, BContent));
    } else {
      setAnswer(AddComputationA(AContent, BContent));
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

  const AddComputationA = (datasA, datasB) => {
    const Compute = [];
    const minLength = Math.min(datasA.length, datasB.length);
    const Aset = datasA;
    const Bset = datasB;
    const NewA = [];
    const NewB = [];

    switch (Operation) {
      case "+":
        for (let i = 0; i < minLength; i++) {
          Compute.push(2 * datasA[i] + 2 * datasB[i]);
          NewA.push(2 * datasA[i]);
          NewB.push(2 * datasB[i]);
        }
        setANewContent(NewA);
        setBNewContent(NewB);
        break;
      case "-":
        for (let i = 0; i < minLength; i++) {
          Compute.push(2 * datasA[i] - 2 * datasB[i]);
          NewA.push(2 * datasA[i]);
          NewB.push(2 * datasB[i]);
        }
        setANewContent(NewA);
        setBNewContent(NewB);
        break;
      case "*":
        for (let i = 0; i < minLength; i++) {
          NewA.push(2 * datasA[i]);
          NewB.push(2 * datasB[i]);
        }

        if (formatNum !== 3) {
          for (let a = 0; a < 2; a++) {
            for (let b = 0; b < 2; b++) {
              Compute.push(
                2 * Aset[a] * 2 * Bset[b * 2] +
                  2 * Aset[a + 2] * 2 * Bset[b * 2 + 1]
              );

              console.log(
                "-> ",
                Aset[a],
                " ",
                Bset[b * 2],
                " ",
                Aset[a + 2],
                " ",
                Bset[b * 2 + 1]
              );
            }
          }
        } else {
          for (let a = 0; a < 3; a++) {
            for (let b = 0; b < 3; b++) {
              Compute.push(
                2 * Aset[a] * 2 * Bset[b * 3] +
                  2 * Aset[a + 3] * 2 * Bset[b * 3 + 1] +
                  2 * Aset[a + 6] * 2 * Bset[b * 3 + 2]
              );
            }
          }
        }

        setANewContent(NewA);
        setBNewContent(NewB);
        break;
    }

    return Compute;
  };

  if (errors.AHolder && errors.BHolder) {
    height = 420;
    BackColors = "firebrick";
  } else if (errors.AHolder) {
    height = 400;
    BackColors = "firebrick";
  } else if (errors.BHolder) {
    height = 400;
    BackColors = "firebrick";
  } else {
    height = "auto";
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

  const OperationButton1 = {
    ...styles.ButtonFormat,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Operation === "+" ? "#2b4861" : "#d0d6dc",
  };

  const OperationButton2 = {
    ...styles.ButtonFormat,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Operation === "-" ? "#2b4861" : "#d0d6dc",
  };

  const OperationButton3 = {
    ...styles.ButtonFormat,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Operation === "*" ? "#2b4861" : "#d0d6dc",
  };

  const FormatTextA = {
    ...styles.FormatText,
    color: formatNum === 2 ? "#fff" : "#000",
  };

  const FormatTextB = {
    ...styles.FormatText,
    color: formatNum === 3 ? "#fff" : "#000",
  };

  const OperationText1 = {
    ...styles.FormatText,
    color: Operation === "+" ? "#fff" : "#000",
  };
  const OperationText2 = {
    ...styles.FormatText,
    color: Operation === "-" ? "#fff" : "#000",
  };
  const OperationText3 = {
    ...styles.FormatText,
    color: Operation === "*" ? "#fff" : "#000",
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
              <Text style={styles.TitleText}>ScaleMultiply 2(A), 2(B)</Text>
              {/* <Text style={styles.TitleText}>2(A) ? B</Text> */}
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
                  <View style={{ paddingVertical: 10 }}>
                    <Text
                      style={
                        (styles.TextAnswer,
                        { color: "black", fontWeight: "700" })
                      }
                    >
                      Operations:
                    </Text>
                  </View>
                  <View style={styles.OperationCotainer}>
                    <TouchableOpacity
                      onPress={() => [setOperation("+"), resets()]}
                      activeOpacity={0.9}
                    >
                      <View style={OperationButton1}>
                        <Text style={OperationText1}>+</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => [setOperation("-"), resets()]}
                      activeOpacity={0.9}
                    >
                      <View style={OperationButton2}>
                        <Text style={OperationText2}>-</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => [setOperation("*"), resets()]}
                      activeOpacity={0.9}
                    >
                      <View style={OperationButton3}>
                        <Text style={OperationText3}>x</Text>
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
                  <View>
                    <View style={styles.AValue}>
                      <View>
                        <Text>2(A) = </Text>
                      </View>
                      <View style={styles.ImageContainer}>
                        <Image
                          source={require("./../assets/leftBracket.png")}
                          style={styles.ImagStyle}
                        />
                      </View>
                      <View style={styles.AnsweredContainer}>
                        {formatNum === 3 ? (
                          <>
                            <Text>
                              2({AGetContent[0]}){", "}
                              2({AGetContent[3]}){", "}
                              2({AGetContent[6]})
                            </Text>
                            <Text>
                              2({AGetContent[1]}){", "}
                              2({AGetContent[4]}){", "}
                              2({AGetContent[7]})
                            </Text>
                            <Text>
                              2({AGetContent[2]}){", "}
                              2({AGetContent[5]}){", "}
                              2({AGetContent[8]})
                            </Text>
                          </>
                        ) : (
                          <>
                            <Text>
                              2({AGetContent[0]}){", "}
                              2({AGetContent[2]})
                            </Text>
                            <Text>
                              2({AGetContent[1]}){", "}
                              2({AGetContent[3]})
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
                        <Text>2(B) = </Text>
                      </View>
                      <View style={styles.ImageContainer}>
                        <Image
                          source={require("./../assets/leftBracket.png")}
                          style={styles.ImagStyle}
                        />
                      </View>
                      <View style={styles.AnsweredContainer}>
                        {formatNum === 3 ? (
                          <>
                            <Text>
                              2({BGetContent[0]}){", "}
                              2({BGetContent[3]}){", "}
                              2({BGetContent[6]})
                            </Text>
                            <Text>
                              2({BGetContent[1]}){", "}
                              2({BGetContent[4]}){", "}
                              2({BGetContent[7]})
                            </Text>
                            <Text>
                              2({BGetContent[2]}){", "}
                              2({BGetContent[5]}){", "}
                              2({BGetContent[8]})
                            </Text>
                          </>
                        ) : (
                          <>
                            <Text>
                              2({BGetContent[0]}){", "}
                              2({BGetContent[2]})
                            </Text>
                            <Text>
                              2({BGetContent[1]}){", "}
                              2({BGetContent[3]})
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

                <View style={styles.AnswerHeader}>
                  <Text style={styles.TextAnswer}>Answer: </Text>
                </View>
                <View>
                  <View style={styles.AValue}>
                    <View>
                      <Text>
                        2(A) {Operation === "*" ? "x" : Operation} 2(B) ={" "}
                      </Text>
                    </View>
                    <View style={styles.ImageContainer}>
                      <Image
                        source={require("./../assets/leftBracket.png")}
                        style={styles.ImagStyle}
                      />
                    </View>
                    <View
                      style={{
                        ...styles.computContainer,
                        width: formatNum === 2 ? "auto" : 175,
                      }}
                    >
                      {formatNum === 2 ? (
                        Operation === "*" ? (
                          <>
                            <Text>
                              {ANewContent[0]} * {BNewContent[0]} {" + "}
                              {AGetContent[2]} * {BNewContent[1]}
                              {",  "}
                              {ANewContent[0]} * {BNewContent[2]} {" + "}
                              {ANewContent[2]} * {BNewContent[3]}
                            </Text>
                            <Text>
                              {ANewContent[1]} * {BNewContent[0]} {" + "}
                              {ANewContent[3]} * {BNewContent[1]}
                              {",  "}
                              {ANewContent[1]} * {BNewContent[2]} {" + "}
                              {ANewContent[3]} * {BNewContent[3]}
                            </Text>
                          </>
                        ) : (
                          <>
                            <Text>
                              {ANewContent[0]} {Operation} {BNewContent[0]}
                              {",  "}
                              {ANewContent[1]} {Operation} {BNewContent[1]}
                            </Text>
                            <Text>
                              {ANewContent[2]} {Operation} {BNewContent[2]}
                              {",  "}
                              {ANewContent[3]} {Operation} {BNewContent[3]}
                            </Text>
                          </>
                        )
                      ) : Operation === "*" ? (
                        <>
                          <Text>
                            {ANewContent[0]} * {BNewContent[0]}
                            {" + "}
                            {ANewContent[3]} * {BNewContent[1]}
                            {" + "}
                            {ANewContent[6]} * {BNewContent[2]}
                            {",  "}
                            {ANewContent[0]} * {BNewContent[3]}
                            {" + "}
                            {ANewContent[3]} * {BNewContent[4]}
                            {" + "}
                            {ANewContent[6]} * {BNewContent[5]}
                            {",  "}
                            {ANewContent[0]} * {BNewContent[6]}
                            {" + "}
                            {ANewContent[3]} * {BNewContent[7]}
                            {" + "}
                            {ANewContent[6]} * {BNewContent[8]}
                          </Text>
                          <Text>
                            {ANewContent[1]} * {BNewContent[0]}
                            {" + "}
                            {ANewContent[4]} * {BNewContent[1]}
                            {" + "}
                            {ANewContent[7]} * {BNewContent[2]}
                            {",  "}
                            {ANewContent[1]} * {BNewContent[3]}
                            {" + "}
                            {ANewContent[4]} * {BNewContent[4]}
                            {" + "}
                            {ANewContent[7]} * {BNewContent[5]}
                            {",  "}
                            {ANewContent[1]} * {BNewContent[6]}
                            {" + "}
                            {ANewContent[4]} * {BNewContent[7]}
                            {" + "}
                            {ANewContent[7]} * {BNewContent[8]}
                          </Text>
                          <Text>
                            {ANewContent[2]} * {BNewContent[0]}
                            {" + "}
                            {ANewContent[5]} * {BNewContent[1]}
                            {" + "}
                            {ANewContent[8]} * {BNewContent[2]}
                            {",  "}
                            {ANewContent[2]} * {BNewContent[3]}
                            {" + "}
                            {ANewContent[5]} * {BNewContent[4]}
                            {" + "}
                            {ANewContent[8]} * {BNewContent[5]}
                            {",  "}
                            {ANewContent[2]} * {BNewContent[6]}
                            {" + "}
                            {ANewContent[5]} * {BNewContent[7]}
                            {" + "}
                            {ANewContent[8]} * {BNewContent[8]}
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text>
                            {ANewContent[0]} {Operation} {BGetContent[0]}
                            {",  "}
                            {ANewContent[1]} {Operation} {BGetContent[1]}
                            {",  "}
                            {ANewContent[2]} {Operation} {BGetContent[2]}
                          </Text>
                          <Text>
                            {ANewContent[3]} {Operation} {BGetContent[3]}
                            {",  "}
                            {ANewContent[4]} {Operation} {BGetContent[4]}
                            {",  "}
                            {ANewContent[5]} {Operation} {BGetContent[5]}
                          </Text>
                          <Text>
                            {ANewContent[6]} {Operation} {BGetContent[6]}
                            {",  "}
                            {ANewContent[7]} {Operation} {BGetContent[7]}
                            {",  "}
                            {ANewContent[8]} {Operation} {BGetContent[8]}
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
    height: "auto",
    // borderWidth: 1,
    alignItems: "center",
    // justifyContent: "",
    marginBottom: 10,
  },
  HeaderContainer: {
    width: 300,
    height: 140,
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
  OperationCotainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  AnswerContainer: {
    backgroundColor: "#fff",
    width: 350,
    borderRadius: 20,
    elevation: 0.9,
    marginTop: 10,
    // borderWidth: 1,
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
    width: 300,
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
  computContainer: {
    // borderWidth: 1,
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
