import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { AppProvider } from "./src/context";
import Routes from "./src/navigation";
import { colors } from "./src/styles/colors";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <Routes />
        <StatusBar style="light" backgroundColor={colors.primary} />
      </AppProvider>
    </GestureHandlerRootView>
  );
}
