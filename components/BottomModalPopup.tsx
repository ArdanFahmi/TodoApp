import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Modal } from "react-native";
import { Pressable } from "react-native";
import Error from "../assets/icon/icInfoWhite.png";
import { Image } from "react-native";

interface BottomModalProps {
  isVisible?: boolean;
  caption: string;
  setIsVisible?: any;
  type?: string;
  withBackdrop?: boolean;
}

export default function BottomModalPopup({
  isVisible,
  setIsVisible,
  caption,
  type,
  withBackdrop = false,
}: BottomModalProps) {
  useEffect(() => {
    setIsVisible
      ? setTimeout(() => {
          setIsVisible(false);
        }, 4000)
      : null;
  }, [isVisible === true]);

  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      transparent={true}
      className="items-center"
    >
      {withBackdrop ? (
        <View className="flex-1 justify-center items-center bg-black/40"></View>
      ) : (
        <></>
      )}
      <View className="w-full h-full items-center">
        <View
          className={`${
            type === "danger" ? "bg-[#EC2028]" : "bg-[#333333]"
          } p-4 lg:p-8 m-2 lg:m-4 flex-row justify-between bottom-0 absolute items-center w-11/12 rounded-xl`}
        >
          <Image source={Error} className="w-4 h-4 lg:w-8 lg:h-8" />
          <Text className="text-white w-9/12 lg:w-5/6 lg:text-2xl">
            {caption}
          </Text>
          <Pressable
            onPress={() => {
              setIsVisible(false);
            }}
          >
            <Text className="text-white font-semibold lg:text-2xl">Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
