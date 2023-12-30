import React from "react";
import { Pressable, Text, View, Image } from "react-native";
import { item } from "../model/item";
import icTrash from "../assets/icon/icTrash.png";
import icPencil from "../assets/icon/icPencil.png";
import Checkbox from "expo-checkbox";

interface IProps {
  item: item;
  doDeleteItem?: (dataItem: item) => void;
  handleEdit?: (dataItem: item) => void;
  onToggleCheckBox?: (dataItem: item) => void;
}

const ListItem: React.FC<IProps> = ({
  item,
  doDeleteItem,
  handleEdit,
  onToggleCheckBox,
}) => (
  <>
    <View className="rounded-lg border border-[#F2F2F2] mb-4">
      <View className="px-2 py-2 bg-[#24A19C] rounded-t-lg">
        <Text className="font-bold text-base text-[#FFFFFF]">{item.title}</Text>
      </View>
      <View className="px-2 py-4 flex-row justify-between">
        <View>
          <Text>{item.name}</Text>
        </View>
        <View className="flex-row justify-between">
          <View>
            <Checkbox
              value={item.completed}
              onValueChange={() => {
                onToggleCheckBox ? onToggleCheckBox(item) : null;
              }}
              color={item.completed ? "#24A19C" : undefined}
            />
          </View>
          <View className="mx-3">
            <Pressable
              onPress={() => {
                handleEdit ? handleEdit(item) : null;
              }}
            >
              <Image source={icPencil} className="w-4 h-4 lg:w-6 lg:h-6" />
            </Pressable>
          </View>
          <View>
            <Pressable
              onPress={() => {
                doDeleteItem ? doDeleteItem(item) : null;
              }}
            >
              <Image source={icTrash} className="w-4 h-4 lg:w-6 lg:h-6" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  </>
);

export default ListItem;
