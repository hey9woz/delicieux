import React from "react";
import { TextInput, View } from "react-native";

interface PasswordInputProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  textColor: string;
  placeholderColor: string;
  borderColor: string;
}

export default function PasswordInput({
  password,
  setPassword,
  textColor,
  placeholderColor,
  borderColor,
}: PasswordInputProps) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor,
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
      }}
    >
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
        placeholderTextColor={placeholderColor}
        style={{ color: textColor, fontSize: 16 }}
      />
    </View>
  );
}
