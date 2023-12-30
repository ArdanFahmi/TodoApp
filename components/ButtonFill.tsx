import React from "react";
import { View, Text, Pressable } from "react-native";

interface ButtonFillProps {
  title: string;
  bgColor: string;
  onPress: any;
  fontColor: string;
}

const ButtonFill: React.FC<ButtonFillProps> = ({
  title,
  bgColor,
  onPress,
  fontColor,
}) => {
  return (
    <View
      className="p-2 rounded-lg"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <Pressable onPress={onPress}>
        <Text
          className="text-base text-center font-bold my-1"
          style={{
            color: fontColor,
          }}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  );
};
export default ButtonFill;