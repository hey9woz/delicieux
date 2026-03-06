import React, { useEffect, useState } from "react";
import { NativeBaseProvider } from "native-base";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import useAuth from "@/hooks/useAuth";
import "react-native-reanimated";
import theme from "@/themes/colors";

import SignInScreen from "@/app/screens/auth/sign-in";
import SignUpScreen from "@/app/screens/auth/sign-up";
import TabsNavigator from "@/navigation/TabsNavigator";

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Tabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { user, loading } = useAuth();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      try {
        if (!loading) {
          await SplashScreen.hideAsync();
          setAppReady(true);
        }
      } catch (error) {
        console.error("An error occurred while preparing the app:", error);
      }
    }

    prepareApp();
  }, [loading]);

  if (loading || !appReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          {user ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Tabs" component={TabsNavigator} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
