import React, { useState } from "react";
import { View, Text, Pressable, Image, TextInput } from "react-native";
import { navigate, navigationRef } from "../RootNavigation";
import { CommonActions } from "@react-navigation/native";
import icBack from "../assets/icon/icBack.png";
import ButtonFill from "../components/ButtonFill";
import { isEmptyString } from "../utils/common";
import BottomModalPopup from "../components/BottomModalPopup";
import { addItem, clearAppData, editItem } from "../utils/store";
import { FormScreenProps } from "../navigation/stackParamList";
import { item } from "../model/item";

interface IForm {
  title: string;
  name: string;
}

export default function Form({ route }: FormScreenProps) {
  const idParam = route.params.id;
  const titleParam = route.params.title;
  const nameParam = route.params.name;
  const completedParam = route.params.completed
  const initFormValue: IForm = {
    title: titleParam ? titleParam : "",
    name: nameParam ? nameParam : "",
  };

  const [form, setForm] = useState<IForm>(initFormValue);
  const [isError, setIsError] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (isEmptyString(form.title)) {
      setIsError(true);
      setIsErrorMessage("Must fill the title input");
    } else if (isEmptyString(form.name)) {
      setIsError(true);
      setIsErrorMessage("Must fill the name input");
    } else {
      if (isEmptyString(idParam)) {
        //add item
        await addItem(form.title, form.name);
      } else {
        //edit item
        const newItem: item = {
          id: idParam,
          title: form.title,
          name: form.name,
          completed: completedParam
        };
        await editItem(newItem);
      }
      navigate("home");
    }
  };
  return (
    <View className="bg-white flex-1">
      {/* error */}
      <BottomModalPopup
        isVisible={isError}
        caption={isErrorMessage}
        setIsVisible={setIsError}
        type="danger"
      />
      {/* Header */}
      <View className="bg-white px-4 pt-10 pb-4 flex flex-row justify-between">
        <View className="flex flex-row items-center">
          <Pressable
            onPress={() => {
              if (navigationRef.isReady()) {
                navigationRef.dispatch(CommonActions.goBack());
              }
            }}
          >
            <Image source={icBack} className="w-4 h-4 mr-1 lg:w-6 lg:h-6" />
          </Pressable>
          <Text className="font-bold text-lg mx-2 lg:text-2xl">ToDo</Text>
        </View>
      </View>
      <View className="border border-gray-200"></View>
      {/* Body */}
      <View className="px-4">
        <View className="relative">
          <View className="mt-2 mb-2">
            <Text className="text-gray-500 text-sm font-bold">Title :</Text>
          </View>
          <TextInput
            className="border rounded-xl border-gray-300 p-2 mb-2"
            placeholder={form.title}
            value={form.title}
            onChangeText={(text) => {
              setForm({ ...form, title: text });
            }}
          />
        </View>
        <View className="relative">
          <View className="mb-2">
            <Text className="text-gray-500 text-sm font-bold">Name :</Text>
          </View>
          <TextInput
            className="border rounded-xl border-gray-300 p-2 mb-2"
            placeholder={form.name}
            value={form.name}
            onChangeText={(text) => {
              setForm({ ...form, name: text });
            }}
          />
        </View>
        <View className="mt-4">
          <ButtonFill
            title="Save"
            bgColor="#24A19C"
            fontColor="#FFFFFF"
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </View>
  );
}
