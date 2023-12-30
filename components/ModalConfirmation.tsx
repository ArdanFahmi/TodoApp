import React from "react";
import { View, Text, Pressable } from "react-native";
import ButtonFill from "./ButtonFill";

interface ModalConfirmationProps {
  title: string;
  titleBtnYes: string;
  titleBtnNo: string;
  onPressBtnYes: any;
  onPressBtnNo: any;
}

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  title,
  titleBtnYes,
  titleBtnNo,
  onPressBtnYes,
  onPressBtnNo,
}) => {
  return (
    <View className="bg-white rounded-2xl">
      <View className="items-center my-5">
        <Text className="text-lg font-bold text-[#333333]">{title}</Text>
      </View>
      <View className="flex-row w-full mb-8">
        <View className="flex-1 ml-3 mr-1">
          <ButtonFill
            title={titleBtnNo}
            bgColor="#EC2028"
            fontColor="#FFFFFF"
            onPress={onPressBtnNo}
          />
        </View>
        <View className="flex-1 ml-1 mr-3">
          <ButtonFill
            title={titleBtnYes}
            bgColor="#24A19C"
            fontColor="#FFFFFF"
            onPress={onPressBtnYes}
          />
        </View>
      </View>
    </View>
  );
};
export default ModalConfirmation;
