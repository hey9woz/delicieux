import React from "react";
import { LogBox } from "react-native";
import AppNavigator from "./AppNavigator";
import { AuthProvider } from "./contexts/AuthContext";
import "./utils/backHandlerCompat";

LogBox.ignoreLogs([
  "In React 18, SSRProvider is not necessary and is a noop.",
  '"" is not a valid color or brush',
]);

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
