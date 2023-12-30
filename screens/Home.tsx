import { View, Text, FlatList, Modal, Image } from "react-native";
import React, { useEffect, useState } from "react";
import ButtonFill from "../components/ButtonFill";
import { navigate } from "../RootNavigation";
import { item } from "../model/item";
import { deleteItem, editItem, getItem } from "../utils/store";
import ListItem from "../components/ListItem";
import { useIsFocused } from "@react-navigation/native";
import ModalConfirmation from "../components/ModalConfirmation";
import icWarning from "../assets/icon/icWarning.png";

export default function Home() {
  const isFocused = useIsFocused();
  const [data, setData] = useState<Array<item>>([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const fetchTodos = async () => {
    getItem().then((items: item[]) => {
      console.log("item ", items);
      setData(items);
    });
  };

  const handleDeleteItem = async (dataItem: item) => {
    await deleteItem(dataItem);
    await fetchTodos();
  };

  const navigateForm = async (dataItem: item) => {
    navigate("form", {
      id: `${dataItem.id}`,
      title: `${dataItem.title}`,
      name: `${dataItem.name}`,
      completed: dataItem.completed,
    });
  };

  const handleToggleCheckBox = async (dataItem: item) => {
    const newItem: item = {
      id: dataItem.id,
      title: dataItem.title,
      name: dataItem.name,
      completed: !dataItem.completed,
    };
    await editItem(newItem);
    await fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, [isFocused]);

  return (
    <View className="bg-white h-full">
      <View className="pt-16 pb-10">
        <Text className="font-bold text-lg mx-2 lg:text-2xl text-center text-black">
          ToDos App
        </Text>
        <Text className="text-base lg:text-xl text-center text-[#828282]">
          This is your todo list!
        </Text>
      </View>
      <View className="px-4">
        <View>
          <ButtonFill
            title="Add Todo"
            bgColor="#24A19C"
            fontColor="#FFFFFF"
            onPress={() =>
              navigate("form", {
                id: "",
                title: "",
                name: "",
              })
            }
          />
        </View>
        <View className="mt-6">
          {data === null || data === undefined || data.length === 0 ? (
            <View className="items-center">
              <Image source={icWarning} className="w-36 h-36 lg:w-72 lg:h-72" />
              <Text className="text-base text-[#828282]">
                Your Todo is Empty...
              </Text>
            </View>
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ListItem
                  item={item}
                  doDeleteItem={(res) => handleDeleteItem(res)}
                  handleEdit={(res) => navigateForm(res)}
                  onToggleCheckBox={(res) => handleToggleCheckBox(res)}
                />
              )}
            />
          )}
        </View>
      </View>
      {/* Modal Confirmation */}
      <Modal visible={isModalVisible}>
        <ModalConfirmation
          title={"Are you sure want to delete?"}
          titleBtnYes={"Yes, delete"}
          titleBtnNo={"No, cancel"}
          onPressBtnYes={() => {}}
          onPressBtnNo={() => {}}
        />
      </Modal>
    </View>
  );
}
