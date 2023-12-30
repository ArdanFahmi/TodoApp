import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { item } from "../model/item";

export type AppStackParamList = {
  home: undefined;
  form: item
}

export type FormScreenProps = NativeStackScreenProps<
  AppStackParamList,
  "form"
>;