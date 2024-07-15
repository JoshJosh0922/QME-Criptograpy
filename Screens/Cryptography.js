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
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import CustomInput from "../Components/CustomInput";
import { AlertMessage } from "../Components/PopUpMessage";
import * as Icon from "@expo/vector-icons";

export default function Cryptography() {
  const [ShowAlert, SetShowAlert] = useState(false);
  const [AHolder, SetAHolder] = useState("");
  const [BHolder, SetBHolder] = useState("");
  const [isPress, SetPress] = useState(false);
  const [formatNum, setFormatNum] = useState(1);
  const [ShowAns, SetShowAns] = useState(false);

  //Computation
  const [determin, setDetermin] = useState(0);
  const [AGiven, SetAGiven] = useState([]);
  const [BGiven, SetBGiven] = useState([]);
  const [Converted, setConverted] = useState([]);
  const [Encryp, setEncryp] = useState([]);
  const [Inv, SetInv] = useState([]);
  const [Adjutated, SetAdjutated] = useState([]);
  const [Joint, setJoint] = useState([]);
  const [DecryptedLette, SetDecryptedLette] = useState([]);
  const [DecryptNo, setDecryptNo] = useState([]);

  const Operations = ["+", "-", "+", "-", "+", "-", "+", "-", "+"];

  const LT2NO = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 10,
    K: 11,
    L: 12,
    M: 13,
    N: 14,
    O: 15,
    P: 16,
    Q: 17,
    R: 18,
    S: 19,
    T: 20,
    U: 21,
    V: 22,
    W: 23,
    X: 24,
    Y: 25,
    Z: 26,
    " ": 27,
  };
  const NO2LET = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
    8: "H",
    9: "I",
    10: "J",
    11: "K",
    12: "L",
    13: "M",
    14: "N",
    15: "O",
    16: "P",
    17: "Q",
    18: "R",
    19: "S",
    20: "T",
    21: "U",
    22: "V",
    23: "W",
    24: "X",
    25: "Y",
    26: "Z",
    27: " ",
  };

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

  {
    /***
  const OnSubmit = (data) => {
    SetPress(false);
    const Aholder =
      formatNum === 1
        ? ConvertToArray(data.AHolder)
        : ConvertToArrayL(data.AHolder.toUpperCase());
    const Bholder =
      formatNum === 1
        ? ConvertToArrayL(data.BHolder.toUpperCase())
        : ConvertToArray(data.BHolder);

    const Determin = getDetermin(formatNum === 1 ? Aholder : Bholder);

    SetAGiven(formatNum === 1 ? Aholder : data.AHolder.toUpperCase());
    SetBGiven(formatNum === 1 ? data.BHolder.toUpperCase() : Bholder);
    setConverted(Bholder);

    if (Aholder.length < 1 || Bholder.length < 1) {
      SetShowAns(false);
      SetShowAlert(true);
      return;
    }

    console.log("A = ", Aholder);
    console.log("B = ", Bholder);

    if (Determin === 1) {
      const Encrypted = Encrypt(
        formatNum === 1 ? Aholder : Bholder,
        formatNum === 2 ? Aholder : Bholder
      );
      const Inversed = Inverse(formatNum === 1 ? Aholder : Bholder);
      const Adjutated = getAdjutate(Inversed);
      const JointOper = JoinOperation(Adjutated);
      const DivToDet = DividedToDet(JointOper);
      const Decrypted = Decrypt(DivToDet, Encrypted);
      const ConvetedLetters = ConvertToLetter(Decrypted);

      setEncryp(Encrypted);
      SetInv(Inversed);
      SetAdjutated(Adjutated);
      setJoint(JointOper);
      setDecryptNo(Decrypted);
      SetDecryptedLette(ConvetedLetters);

      if (DecryptedLette.length === 18) {
        SetShowAns(true);
      }

      console.log("Encrypt -> ", Encrypted);
      console.log("inverse -> ", Inversed);
      console.log("Adjutated -> ", Adjutated);
      console.log("JointOper -> ", JointOper);
      console.log("Divided to Determin -> ", DivToDet);
      console.log("Decrypted -> ", Decrypted);
      console.log("Letter -> ", ConvetedLetters);
    } else {
      alert("The Determinant of Set A is not equal to 1.");
    }
  };
 */
  }

  const OnSubmit = (data) => {
    SetPress(false);

    const aHolderInput = data.AHolder.toUpperCase();
    const bHolderInput = data.BHolder.toUpperCase();

    const Aholder =
      formatNum === 1
        ? ConvertToArray(aHolderInput)
        : ConvertToArrayL(aHolderInput);
    const Bholder =
      formatNum === 1
        ? ConvertToArrayL(bHolderInput)
        : ConvertToArray(bHolderInput);

    const determinant = getDetermin(formatNum === 1 ? Aholder : Bholder);

    SetAGiven(formatNum === 1 ? Aholder : aHolderInput);
    SetBGiven(formatNum === 1 ? bHolderInput : Bholder);
    setConverted(Bholder);

    console.log("res  A = ", Aholder);
    console.log("res  B = ", Bholder);

    if (Aholder.length < 1 || Bholder.length < 1) {
      SetDecryptedLette([]);
      SetShowAns(false);
      SetShowAlert(true);
      return;
    }

    if (determinant === 1) {
      const Encrypted = Encrypt(
        formatNum === 1 ? Aholder : Bholder,
        formatNum === 2 ? Aholder : Bholder
      );

      const Inversed = Inverse(formatNum === 1 ? Aholder : Bholder);
      const Adjutated = getAdjutate(Inversed);
      const JointOper = JoinOperation(Adjutated);
      const DivToDet = DividedToDet(JointOper);
      const Decrypted = Decrypt(DivToDet, Encrypted);
      const ConvertedLetters = ConvertToLetter(Decrypted);

      setEncryp(Encrypted);
      SetInv(Inversed);
      SetAdjutated(Adjutated);
      setJoint(JointOper);
      setDecryptNo(Decrypted);
      SetDecryptedLette(ConvertedLetters);
    } else {
      alert("The Determinant of Set A is not equal to 1.");
    }
  };

  const DividedToDet = (Adj) => {
    const ComputedAset = Adj;
    const res = [];

    for (let a = 0; a < ComputedAset.length; a++) {
      res.push(ComputedAset[a] / determin);
    }

    console.log("A-1 1/1 -> ", res);

    return res;
  };

  const JoinOperation = (Adj) => {
    const CurrentAdj = Adj;

    const Ans = [];
    for (let a = 0; a < CurrentAdj.length; a++) {
      Ans.push(Operations[a] === "+" ? +1 * CurrentAdj[a] : -1 * CurrentAdj[a]);
    }

    return Ans;
  };

  const Encrypt = (Adata, Bdata) => {
    const Aset = Adata;
    const Bset = Bdata;

    const Ans = [];
    for (let a = 0; a < 3; a++) {
      for (let b = 0; b < 6; b++) {
        Ans.push(
          Aset[a] * Bset[b * 3] +
            Aset[a + 3] * Bset[b * 3 + 1] +
            Aset[a + 6] * Bset[b * 3 + 2]
        );
      }
    }

    return [
      Ans[0],
      Ans[6],
      Ans[12],

      Ans[1],
      Ans[7],
      Ans[13],

      Ans[2],
      Ans[8],
      Ans[14],

      Ans[3],
      Ans[9],
      Ans[15],

      Ans[4],
      Ans[10],
      Ans[16],

      Ans[5],
      Ans[11],
      Ans[17],
    ];
  };

  const Decrypt = (DivToDet, Bdata) => {
    const Aset = DivToDet;
    const Bset = Bdata;

    const Ans = [];
    for (let a = 0; a < 3; a++) {
      for (let b = 0; b < 6; b++) {
        Ans.push(
          Aset[a] * Bset[b * 3] +
            Aset[a + 3] * Bset[b * 3 + 1] +
            Aset[a + 6] * Bset[b * 3 + 2]
        );
      }
    }

    return [
      Ans[0],
      Ans[6],
      Ans[12],

      Ans[1],
      Ans[7],
      Ans[13],

      Ans[2],
      Ans[8],
      Ans[14],

      Ans[3],
      Ans[9],
      Ans[15],

      Ans[4],
      Ans[10],
      Ans[16],

      Ans[5],
      Ans[11],
      Ans[17],
    ];
  };

  const getAdjutate = (InvData) => {
    const adj = InvData;
    const Ans = [
      adj[4] * adj[8] - adj[7] * adj[5],
      adj[1] * adj[8] - adj[7] * adj[2],
      adj[1] * adj[5] - adj[4] * adj[2],
      adj[3] * adj[8] - adj[6] * adj[5],
      adj[0] * adj[8] - adj[6] * adj[2],
      adj[0] * adj[5] - adj[3] * adj[2],
      adj[3] * adj[7] - adj[6] * adj[4],
      adj[0] * adj[7] - adj[6] * adj[1],
      adj[0] * adj[4] - adj[3] * adj[1],
    ];

    return [
      Ans[0],
      Ans[3],
      Ans[6],
      Ans[1],
      Ans[4],
      Ans[7],
      Ans[2],
      Ans[5],
      Ans[8],
    ];
  };

  const Inverse = (Adata) => {
    const Aset = Adata;

    return [
      Aset[0],
      Aset[3],
      Aset[6],
      Aset[1],
      Aset[4],
      Aset[7],
      Aset[2],
      Aset[5],
      Aset[8],
    ];
  };

  const getDetermin = (Dset) => {
    const SetDet = Dset;

    const Ans =
      SetDet[0] * (SetDet[4] * SetDet[8] - SetDet[7] * SetDet[5]) -
      SetDet[3] * (SetDet[1] * SetDet[8] - SetDet[7] * SetDet[2]) +
      SetDet[6] * (SetDet[1] * SetDet[5] - SetDet[4] * SetDet[2]);
    setDetermin(Ans);
    return Ans;
  };

  const ConvertToArray = (datas) => {
    const Array = datas.split(",").map((data) => {
      // console.log("set a - ", data === "");
      if (data === "") {
        return 0;
      } else {
        const parsedData = parseInt(data.trim(), 10);
        return parsedData;
      }
    });

    let size = Array.length;
    console.log("-> ", Array);
    switch (size) {
      case 9:
        return Array;
      default:
        return [];
    }

    // setDoShowRes(true);
  };

  const ConvertToArrayL = (datas) => {
    const Array2 = datas;

    const NewArrayLetter = [];
    const LTNArray = [];

    for (let i = 0; i < Array2.length; i++) {
      NewArrayLetter.push(Array2[i]);
    }

    for (let i = 0; i < 18; i++) {
      console.log("Status -> ", LT2NO[NewArrayLetter[i]]);
      if (LT2NO[NewArrayLetter[i]] !== undefined) {
        LTNArray.push(LT2NO[NewArrayLetter[i]]);
      } else {
        LTNArray.push(27);
      }
    }
    console.log("Letter -> ", Array2);
    console.log("Number -> ", LTNArray);

    if (Array2.length > 0 && Array2.length <= 18) {
      return LTNArray;
    } else {
      return [];
    }
  };

  const ConvertToLetter = (data) => {
    const array = data;
    const ConvertedLetter = [];

    for (let a = 0; a < array.length; a++) {
      ConvertedLetter.push(NO2LET[array[a]]);
    }
    return ConvertedLetter;
  };

  const GetTheSize = (datas) => {
    let Array =
      datas !== "" &&
      datas.split(",").map((data) => {
        // console.log("set a - ", data === "");
        if (data === "") {
          return 0;
        } else {
          const parsedData = parseInt(data.trim(), 10);
          return parsedData;
        }
      });
    console.log("arr = ", Array);
    return Array === false ? "" : Array;
  };

  useEffect(() => {
    if (DecryptedLette.length > 0 && DecryptedLette.length <= 18) {
      SetShowAns(true);
    }
    // BHolder.length === 0 && SetShowAns(false);
  });

  //Style for button
  let height;
  let BackColors;
  let fontcolor;

  const HandlePressIn = () => {
    SetPress(true);
  };

  if (errors.AHolder && errors.BHolder) {
    height = 320;
    BackColors = "firebrick";
    fontcolor = "white";
  } else if (errors.AHolder) {
    height = 300;
    BackColors = "firebrick";
    fontcolor = "white";
  } else if (errors.BHolder) {
    height = 300;
    BackColors = "firebrick";
    fontcolor = "white";
  } else {
    height = "auto";
    BackColors = "#e7eaed";
    fontcolor = "black";
  }

  const computeBut = {
    ...styles.ButtonContainer,
    backgroundColor: isPress ? BackColors : "#d0d6dc",
  };

  const computeFont = {
    color: isPress ? fontcolor : "black",
  };

  const FontClickA = {
    ...styles.font,
    color: formatNum === 1 ? "#fff" : "#000",
  };
  const FontClickB = {
    ...styles.font,
    color: formatNum === 2 ? "#fff" : "#000",
  };
  const FormatContainerA = {
    ...styles.ButtonContainer,
    backgroundColor: formatNum === 1 ? "#2b4861" : "#d0d6dc",
  };

  const FormatContainerB = {
    ...styles.ButtonContainer,
    backgroundColor: formatNum === 2 ? "#2b4861" : "#d0d6dc",
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="rgba(255,255,255,.0)" translucent />
      <AlertMessage
        doShow={ShowAlert}
        dohide={() => SetShowAlert(false)}
        Title={"Invalid Input"}
        Message={
          "It should contain 9 or 18 array items. The required size of the Set A is 9 items and the set B is 18 items."
        }
      />
      <ScrollView style={styles.scrollview}>
        <View style={styles.MainContainer}>
          <Text style={styles.headerText}>Cryptography</Text>
          <View style={styles.header}>
            <View style={styles.miniHeader}>
              <Text style={styles.noteText}>
                Note: Enter two sets, A and B. Set A should have a size of 3x3
                or 9 items, and Set B should have a size of 3x6 or 18 items. In
                numerical input, separate the items using commas, and in the
                case of letter items, there's no need to use commas. You can use
                letters in Set B.
              </Text>
              {/* <Text style={styles.noteText}>
                Note: Enter A set size (3x3 or 3x6) and B set size (3x6 or 3x3)
                with 9 or 18 numbers each, separated by commas in numbers only.
                You can use a letter in the 3x6 array.
              </Text> */}
            </View>
            <View style={styles.inputContainer}>
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
                  keyboardType={formatNum === 1 ? "numeric" : "default"}
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
                  keyboardType={formatNum === 2 ? "numeric" : "default"}
                />
              </View>
              <View>
                <Text>Size of A set and B set</Text>
                <Text>
                  {"A = "}
                  {GetTheSize(AHolder).length}
                </Text>
                <Text>
                  {"B = "}
                  {BHolder.length}
                </Text>
              </View>
              <View style={styles.ButtonsCon}>
                <View style={styles.FormatContainer}>
                  <TouchableOpacity
                    onPress={() => setFormatNum(1)}
                    activeOpacity={0.9}
                  >
                    <View style={FormatContainerA}>
                      <Text style={FontClickA}>3x3 * 3x6</Text>
                    </View>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    onPress={() => setFormatNum(2)}
                    activeOpacity={0.9}
                  >
                    <View style={FormatContainerB}>
                      <Text style={FontClickB}>3x6 * 3x3</Text>
                    </View>
                  </TouchableOpacity> */}
                </View>

                <TouchableOpacity
                  onPressIn={HandlePressIn}
                  // onPressOut={HandlePressout}
                  onPressOut={handleSubmit(OnSubmit)}
                  // onPressOut={OnSubmit}
                  activeOpacity={0.9}
                >
                  <View style={computeBut}>
                    <Text style={computeFont}>Submit</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {ShowAns && (
            <View style={styles.header}>
              <View style={styles.titleGiven}>
                <Text style={styles.font}>Given</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "flex-start",
                }}
              >
                <View style={styles.givenContainer}>
                  <View style={styles.AValue}>
                    <View>
                      <Text>A = </Text>
                    </View>
                  </View>
                  <View style={styles.ImageContainer}>
                    <Image
                      source={require("./../assets/leftBracket.png")}
                      style={styles.ImagStyle}
                    />
                  </View>
                  <View style={styles.BracketContainer}>
                    <Text>
                      {AGiven[0]}
                      {",  "}
                      {AGiven[3]}
                      {",  "}
                      {AGiven[6]}
                    </Text>
                    <Text>
                      {AGiven[1]}
                      {",  "}
                      {AGiven[4]}
                      {",  "}
                      {AGiven[7]}
                    </Text>
                    <Text>
                      {AGiven[2]}
                      {",  "}
                      {AGiven[5]}
                      {",  "}
                      {AGiven[8]}
                    </Text>
                  </View>
                  <View style={styles.ImageContainer}>
                    <Image
                      source={require("./../assets/RightBracket.png")}
                      style={styles.ImagStyle}
                    />
                  </View>
                </View>
                <View style={styles.givenContainer}>
                  <View style={styles.AValue}>
                    <View>
                      <Text>B = </Text>
                    </View>
                  </View>
                  <View style={styles.ImageContainer}>
                    <Image
                      source={require("./../assets/leftBracket.png")}
                      style={styles.ImagStyle}
                    />
                  </View>
                  <View style={styles.BracketContainer}>
                    <Text>
                      {BGiven[0]}
                      {",  "}
                      {BGiven[3]}
                      {",  "}
                      {BGiven[6]}
                      {",  "}
                      {BGiven[9]}
                      {",  "}
                      {BGiven[12]}
                      {",  "}
                      {BGiven[15]}
                    </Text>
                    <Text>
                      {BGiven[1]}
                      {",  "}
                      {BGiven[4]}
                      {",  "}
                      {BGiven[7]}
                      {",  "}
                      {BGiven[10]}
                      {",  "}
                      {BGiven[13]}
                      {",  "}
                      {BGiven[16]}
                    </Text>
                    <Text>
                      {BGiven[2]}
                      {",  "}
                      {BGiven[5]}
                      {",  "}
                      {BGiven[8]}
                      {",  "}
                      {BGiven[11]}
                      {",  "}
                      {BGiven[14]}
                      {",  "}
                      {BGiven[17]}
                    </Text>
                  </View>
                  <View style={styles.ImageContainer}>
                    <Image
                      source={require("./../assets/RightBracket.png")}
                      style={styles.ImagStyle}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.titleGiven}>
                <Text style={styles.font}>Solutions</Text>
              </View>
              <View>
                <View
                  style={{
                    width: "100%",
                    // flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.givenContainer}>
                    <View style={styles.AValue}>
                      <View>
                        <Text>A = </Text>
                      </View>
                    </View>
                    <View style={styles.ImageContainer}>
                      <Image
                        source={require("./../assets/leftBracket.png")}
                        style={styles.ImagStyle}
                      />
                    </View>
                    <View style={styles.BracketContainer}>
                      <Text>
                        {AGiven[0]}
                        {",  "}
                        {AGiven[3]}
                        {",  "}
                        {AGiven[6]}
                      </Text>
                      <Text>
                        {AGiven[1]}
                        {",  "}
                        {AGiven[4]}
                        {",  "}
                        {AGiven[7]}
                      </Text>
                      <Text>
                        {AGiven[2]}
                        {",  "}
                        {AGiven[5]}
                        {",  "}
                        {AGiven[8]}
                      </Text>
                    </View>
                    <View style={styles.ImageContainer}>
                      <Image
                        source={require("./../assets/RightBracket.png")}
                        style={styles.ImagStyle}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      width: 300,
                      // borderWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      // borderWidth: 1,
                    }}
                  >
                    <Text
                      style={{ ...styles.font, color: "red", fontSize: 20 }}
                    >
                      x
                    </Text>
                  </View>
                  <View style={styles.givenContainer}>
                    <View style={styles.AValue}>
                      <View>
                        <Text>B = </Text>
                      </View>
                    </View>
                    <View style={styles.ImageContainer}>
                      <Image
                        source={require("./../assets/leftBracket.png")}
                        style={styles.ImagStyle}
                      />
                    </View>
                    <View style={styles.BracketContainer}>
                      <Text>
                        {Converted[0]}
                        {",  "}
                        {Converted[3]}
                        {",  "}
                        {Converted[6]}
                        {",  "}
                        {Converted[9]}
                        {",  "}
                        {Converted[12]}
                        {",  "}
                        {Converted[15]}
                      </Text>
                      <Text>
                        {Converted[1]}
                        {",  "}
                        {Converted[4]}
                        {",  "}
                        {Converted[7]}
                        {",  "}
                        {Converted[10]}
                        {",  "}
                        {Converted[13]}
                        {",  "}
                        {Converted[16]}
                      </Text>
                      <Text>
                        {Converted[2]}
                        {",  "}
                        {Converted[5]}
                        {",  "}
                        {Converted[8]}
                        {",  "}
                        {Converted[11]}
                        {",  "}
                        {Converted[14]}
                        {",  "}
                        {Converted[17]}
                      </Text>
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
              <View style={styles.titleGiven}>
                <Text style={styles.font}>Encryption</Text>
              </View>
              <View>
                <View style={styles.givenContainer}>
                  <View style={styles.AValue}>
                    <View>
                      <Text>Encrypted = </Text>
                    </View>
                  </View>
                  <View style={styles.ImageContainer}>
                    <Image
                      source={require("./../assets/leftBracket.png")}
                      style={styles.ImagStyle}
                    />
                  </View>
                  <View style={styles.BracketContainer}>
                    <Text>
                      {Encryp[0]}
                      {",  "}
                      {Encryp[3]}
                      {",  "}
                      {Encryp[6]}
                      {",  "}
                      {Encryp[9]}
                      {",  "}
                      {Encryp[12]}
                      {",  "}
                      {Encryp[15]}
                    </Text>
                    <Text>
                      {Encryp[1]}
                      {",  "}
                      {Encryp[4]}
                      {",  "}
                      {Encryp[7]}
                      {",  "}
                      {Encryp[10]}
                      {",  "}
                      {Encryp[13]}
                      {",  "}
                      {Encryp[16]}
                    </Text>
                    <Text>
                      {Encryp[2]}
                      {",  "}
                      {Encryp[5]}
                      {",  "}
                      {Encryp[8]}
                      {",  "}
                      {Encryp[11]}
                      {",  "}
                      {Encryp[14]}
                      {",  "}
                      {Encryp[17]}
                    </Text>
                  </View>
                  <View style={styles.ImageContainer}>
                    <Image
                      source={require("./../assets/RightBracket.png")}
                      style={styles.ImagStyle}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.titleGiven}>
                <Text style={styles.font}>Determinant</Text>
                <Text>|A| = {determin}</Text>
              </View>
              <View style={styles.titleGiven}>
                <Text style={styles.font}>Transpose with Cross Multiply</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "flex-start",
                }}
              >
                <View style={styles.givenContainer}>
                  <View style={styles.AValue}>
                    <View>
                      <Text>A-1= </Text>
                    </View>
                  </View>
                  <View style={styles.ImageContainer}>
                    <Image
                      source={require("./../assets/leftBracket.png")}
                      style={styles.ImagStyle}
                    />
                  </View>
                  <View style={styles.BracketContainer}>
                    <Text>
                      {Inv[0]}
                      {",  "}
                      {Inv[3]}
                      {",  "}
                      {Inv[6]}
                    </Text>
                    <Text>
                      {Inv[1]}
                      {",  "}
                      {Inv[4]}
                      {",  "}
                      {Inv[7]}
                    </Text>
                    <Text>
                      {Inv[2]}
                      {",  "}
                      {Inv[5]}
                      {",  "}
                      {Inv[8]}
                    </Text>
                  </View>
                  <View style={styles.ImageContainer}>
                    <Image
                      source={require("./../assets/RightBracket.png")}
                      style={styles.ImagStyle}
                    />
                  </View>
                </View>
                <View style={styles.givenContainer}>
                  <View style={styles.AValue}>
                    <View>
                      <Text>adj A = </Text>
                    </View>
                  </View>
                  <View style={styles.ImageContainer}>
                    <Image
                      source={require("./../assets/leftBracket.png")}
                      style={styles.ImagStyle}
                    />
                  </View>
                  <View style={styles.BracketContainer}>
                    <Text>
                      {Adjutated[0]}
                      {",  "}
                      {Adjutated[3]}
                      {",  "}
                      {Adjutated[6]}
                    </Text>
                    <Text>
                      {Adjutated[1]}
                      {",  "}
                      {Adjutated[4]}
                      {",  "}
                      {Adjutated[7]}
                    </Text>
                    <Text>
                      {Adjutated[2]}
                      {",  "}
                      {Adjutated[5]}
                      {",  "}
                      {Adjutated[8]}
                    </Text>
                  </View>
                  <View style={styles.ImageContainer}>
                    <Image
                      source={require("./../assets/RightBracket.png")}
                      style={styles.ImagStyle}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.titleGiven}>
                <Text style={styles.font}>Adjutated</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "flex-start",
                }}
              >
                <View style={styles.givenContainer}>
                  <View style={styles.AValue}>
                    <View>
                      <Text>adj A = </Text>
                    </View>
                  </View>
                  <View style={styles.ImageContainer}>
                    <Image
                      source={require("./../assets/leftBracket.png")}
                      style={styles.ImagStyle}
                    />
                  </View>
                  <View style={styles.BracketContainer}>
                    <Text>
                      {Adjutated[0]}
                      {",  "}
                      {Adjutated[3]}
                      {",  "}
                      {Adjutated[6]}
                    </Text>
                    <Text>
                      {Adjutated[1]}
                      {",  "}
                      {Adjutated[4]}
                      {",  "}
                      {Adjutated[7]}
                    </Text>
                    <Text>
                      {Adjutated[2]}
                      {",  "}
                      {Adjutated[5]}
                      {",  "}
                      {Adjutated[8]}
                    </Text>
                  </View>
                  <View style={styles.ImageContainer}>
                    <Image
                      source={require("./../assets/RightBracket.png")}
                      style={styles.ImagStyle}
                    />
                  </View>
                </View>
                <View style={{ height: 100, justifyContent: "center" }}>
                  <Text>+</Text>
                </View>
                <View style={styles.givenContainer}>
                  <View style={styles.ImageContainer}>
                    <Image
                      source={require("./../assets/leftBracket.png")}
                      style={styles.ImagStyle}
                    />
                  </View>
                  <View style={styles.BracketContainer}>
                    <Text>
                      {Operations[0]}
                      {",  "}
                      {Operations[3]}
                      {",  "}
                      {Operations[6]}
                    </Text>
                    <Text>
                      {Operations[1]}
                      {",  "}
                      {Operations[4]}
                      {",  "}
                      {Operations[7]}
                    </Text>
                    <Text>
                      {Operations[2]}
                      {",  "}
                      {Operations[5]}
                      {",  "}
                      {Operations[8]}
                    </Text>
                  </View>
                  <View style={styles.ImageContainer}>
                    <Image
                      source={require("./../assets/RightBracket.png")}
                      style={styles.ImagStyle}
                    />
                  </View>
                </View>
              </View>
              <View>
                <View style={styles.givenContainer}>
                  <View style={styles.AValue}>
                    <View>
                      <Text>adj A = </Text>
                    </View>
                  </View>
                  <View style={styles.ImageContainer}>
                    <Image
                      source={require("./../assets/leftBracket.png")}
                      style={styles.ImagStyle}
                    />
                  </View>
                  <View style={styles.BracketContainer}>
                    <Text>
                      {Joint[0]}
                      {",  "}
                      {Joint[3]}
                      {",  "}
                      {Joint[6]}
                    </Text>
                    <Text>
                      {Joint[1]}
                      {",  "}
                      {Joint[4]}
                      {",  "}
                      {Joint[7]}
                    </Text>
                    <Text>
                      {Joint[2]}
                      {",  "}
                      {Joint[5]}
                      {",  "}
                      {Joint[8]}
                    </Text>
                  </View>
                  <View style={styles.ImageContainer}>
                    <Image
                      source={require("./../assets/RightBracket.png")}
                      style={styles.ImagStyle}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.titleGiven}>
                <Text style={styles.font}>Decryption</Text>
              </View>
              <View>
                <View>
                  <View style={styles.givenContainer}>
                    <View style={styles.AValue}>
                      <View>
                        <Text>adj A = </Text>
                      </View>
                    </View>
                    <View style={styles.ImageContainer}>
                      <Image
                        source={require("./../assets/leftBracket.png")}
                        style={styles.ImagStyle}
                      />
                    </View>
                    <View style={styles.BracketContainer}>
                      <Text>
                        {Joint[0]}
                        {",  "}
                        {Joint[3]}
                        {",  "}
                        {Joint[6]}
                      </Text>
                      <Text>
                        {Joint[1]}
                        {",  "}
                        {Joint[4]}
                        {",  "}
                        {Joint[7]}
                      </Text>
                      <Text>
                        {Joint[2]}
                        {",  "}
                        {Joint[5]}
                        {",  "}
                        {Joint[8]}
                      </Text>
                    </View>
                    <View style={styles.ImageContainer}>
                      <Image
                        source={require("./../assets/RightBracket.png")}
                        style={styles.ImagStyle}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: 300,
                    // flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ ...styles.font, color: "red", fontSize: 20 }}>
                    x
                  </Text>
                </View>
                <View>
                  <View style={styles.givenContainer}>
                    <View style={styles.AValue}>
                      <View>
                        <Text>Encrypted = </Text>
                      </View>
                    </View>
                    <View style={styles.ImageContainer}>
                      <Image
                        source={require("./../assets/leftBracket.png")}
                        style={styles.ImagStyle}
                      />
                    </View>
                    <View style={styles.BracketContainer}>
                      <Text>
                        {Encryp[0]}
                        {",  "}
                        {Encryp[3]}
                        {",  "}
                        {Encryp[6]}
                        {",  "}
                        {Encryp[9]}
                        {",  "}
                        {Encryp[12]}
                        {",  "}
                        {Encryp[15]}
                      </Text>
                      <Text>
                        {Encryp[1]}
                        {",  "}
                        {Encryp[4]}
                        {",  "}
                        {Encryp[7]}
                        {",  "}
                        {Encryp[10]}
                        {",  "}
                        {Encryp[13]}
                        {",  "}
                        {Encryp[16]}
                      </Text>
                      <Text>
                        {Encryp[2]}
                        {",  "}
                        {Encryp[5]}
                        {",  "}
                        {Encryp[8]}
                        {",  "}
                        {Encryp[11]}
                        {",  "}
                        {Encryp[14]}
                        {",  "}
                        {Encryp[17]}
                      </Text>
                    </View>
                    <View style={styles.ImageContainer}>
                      <Image
                        source={require("./../assets/RightBracket.png")}
                        style={styles.ImagStyle}
                      />
                    </View>
                  </View>
                </View>
                <View>
                  <View style={styles.titleGiven}>
                    <Text style={styles.font}>Decrypted</Text>
                  </View>
                  <View>
                    <View style={styles.givenContainer}>
                      <View style={styles.AValue}>
                        <View>
                          <Text>Letters = </Text>
                        </View>
                      </View>
                      <View style={styles.ImageContainer}>
                        <Image
                          source={require("./../assets/leftBracket.png")}
                          style={styles.ImagStyle}
                        />
                      </View>
                      <View style={styles.BracketContainer}>
                        <Text>
                          {DecryptedLette[0]}
                          {",  "}
                          {DecryptedLette[3]}
                          {",  "}
                          {DecryptedLette[6]}
                          {",  "}
                          {DecryptedLette[9]}
                          {",  "}
                          {DecryptedLette[12]}
                          {",  "}
                          {DecryptedLette[15]}
                        </Text>
                        <Text>
                          {DecryptedLette[1]}
                          {",  "}
                          {DecryptedLette[4]}
                          {",  "}
                          {DecryptedLette[7]}
                          {",  "}
                          {DecryptedLette[10]}
                          {",  "}
                          {DecryptedLette[13]}
                          {",  "}
                          {DecryptedLette[16]}
                        </Text>
                        <Text>
                          {DecryptedLette[2]}
                          {",  "}
                          {DecryptedLette[5]}
                          {",  "}
                          {DecryptedLette[8]}
                          {",  "}
                          {DecryptedLette[11]}
                          {",  "}
                          {DecryptedLette[14]}
                          {",  "}
                          {DecryptedLette[17]}
                        </Text>
                      </View>
                      <View style={styles.ImageContainer}>
                        <Image
                          source={require("./../assets/RightBracket.png")}
                          style={styles.ImagStyle}
                        />
                      </View>
                    </View>
                    <View style={styles.givenContainer}>
                      <View style={styles.AValue}>
                        <View>
                          <Text>Numbers = </Text>
                        </View>
                      </View>
                      <View style={styles.ImageContainer}>
                        <Image
                          source={require("./../assets/leftBracket.png")}
                          style={styles.ImagStyle}
                        />
                      </View>
                      <View style={styles.BracketContainer}>
                        <Text>
                          {DecryptNo[0]}
                          {",  "}
                          {DecryptNo[3]}
                          {",  "}
                          {DecryptNo[6]}
                          {",  "}
                          {DecryptNo[9]}
                          {",  "}
                          {DecryptNo[12]}
                          {",  "}
                          {DecryptNo[15]}
                        </Text>
                        <Text>
                          {DecryptNo[1]}
                          {",  "}
                          {DecryptNo[4]}
                          {",  "}
                          {DecryptNo[7]}
                          {",  "}
                          {DecryptNo[10]}
                          {",  "}
                          {DecryptNo[13]}
                          {",  "}
                          {DecryptNo[16]}
                        </Text>
                        <Text>
                          {DecryptNo[2]}
                          {",  "}
                          {DecryptNo[5]}
                          {",  "}
                          {DecryptNo[8]}
                          {",  "}
                          {DecryptNo[11]}
                          {",  "}
                          {DecryptNo[14]}
                          {",  "}
                          {DecryptNo[17]}
                        </Text>
                      </View>
                      <View style={styles.ImageContainer}>
                        <Image
                          source={require("./../assets/RightBracket.png")}
                          style={styles.ImagStyle}
                        />
                      </View>
                    </View>
                    <View>
                      <Text style={{ ...styles.font, paddingVertical: 10 }}>
                        User-provided text:
                      </Text>
                      <Text>
                        {"B = "}
                        {DecryptedLette[0]}
                        {DecryptedLette[1]}
                        {DecryptedLette[2]}
                        {DecryptedLette[3]}
                        {DecryptedLette[4]}
                        {DecryptedLette[5]}
                        {DecryptedLette[6]}
                        {DecryptedLette[7]}
                        {DecryptedLette[8]}
                        {DecryptedLette[9]}
                        {DecryptedLette[10]}
                        {DecryptedLette[11]}
                        {DecryptedLette[12]}
                        {DecryptedLette[13]}
                        {DecryptedLette[14]}
                        {DecryptedLette[15]}
                        {DecryptedLette[16]}
                        {DecryptedLette[17]}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
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
  scrollview: {
    paddingTop: 50,
    paddingBottom: 50,
    height: "100%",
  },
  MainContainer: {
    height: "auto",
    width: 390,
    alignItems: "center",
    paddingBottom: 70,
    // paddingTop: 50,
  },
  headerText: {
    color: "white",
    fontWeight: "700",
    fontSize: 30,
    marginBottom: 10,
  },
  header: {
    margin: 5,
    backgroundColor: "white",
    width: 350,
    height: "auto",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  miniHeader: {
    // borderWidth: 1,
    width: 300,
    height: "auto",
    alignItems: "center",
  },
  noteText: {
    fontSize: 12,
    color: "firebrick",
    textAlign: "justify",
  },
  InputText: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  TextDisplay: {
    width: 50,
    height: 50,
    // borderWidth: 1,
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    // borderWidth: 1,
    paddingTop: 20,
  },
  ButtonsCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  FormatContainer: {
    // borderWidth: 1,
    // flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // height: 80,
  },
  ButtonContainer: {
    // borderWidth: 1,
    height: 30,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    // elevation: 10,
  },
  font: {
    fontWeight: "600",
  },
  titleGiven: {
    margin: 10,
    // borderWidth: 1,
    width: "100%",
  },
  givenContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ImageContainer: {
    // borderWidth: 1,
  },
  ImagStyle: {
    width: 15,
    height: 100,
  },
  BracketContainer: {
    // borderWidth: 1,
    // width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
