import AsyncStorage from "@react-native-async-storage/async-storage";
import { item } from "../model/item";

const ITEMS_KEY = "TODOS";
type getItemsType = () => Promise<Array<item>>;

export const getItem: getItemsType = async () => {
  try {
    const listItem = (await AsyncStorage.getItem(ITEMS_KEY)) as string;
    const itemsArray: item[] = JSON.parse(listItem);
    return itemsArray;
  } catch (error) {
    console.error("failed fetch item ", error);
  }
  return [];
};

//add new Todo
export const addItem = async (itemTitle: string, itemName: string) => {
  const timeString = Date.now().toString();
  const item: item = {
    id: timeString,
    title: itemTitle,
    name: itemName,
    completed: false,
  };
  try {
    const listItem = (await AsyncStorage.getItem(ITEMS_KEY)) as string;
    const storedItems: item[] = JSON.parse(listItem);
    const itemsArray = storedItems || [];
    await AsyncStorage.setItem(
      ITEMS_KEY,
      JSON.stringify([...itemsArray, item])
    );
  } catch (err) {
    console.error("failed add item ", err);
  }
};

// remove an existing todo
export const deleteItem = async (item: item) => {
  try {
    const listItem = (await AsyncStorage.getItem(ITEMS_KEY)) as string;
    const storedItems: item[] = JSON.parse(listItem);
    const filteredItems = storedItems.filter(
      (selectedItem) => selectedItem.id !== item.id
    );
    await AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(filteredItems));
  } catch (error) {
    console.error("error delete item", error);
  }
};

// edit item
export const editItem = async (newItem: item) => {
  try {
    const listItem = (await AsyncStorage.getItem(ITEMS_KEY)) as string;
    const storedItems: item[] = JSON.parse(listItem);
    const updatedData = storedItems.map((item) => {
      if (item.id === newItem.id) {
        return { ...item, ...newItem };
      }
      return item;
    });
    await AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error("error edit item ", error);
  }
};

//clear ALL data
export const clearAppData = async function () {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error("Error clearing app data.");
  }
};
