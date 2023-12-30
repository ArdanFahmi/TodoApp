import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "./navigation/stackParamList";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Form from "./screens/Form";

export default function App() {
  const Stack = createNativeStackNavigator<AppStackParamList>();
  return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={() => ({
            headerShown: false,
          })}
        >
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="form" component={Form} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
