import React from "react";
import { TextInput, View } from "react-native";

interface EmailInputProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  textColor: string;
  placeholderColor: string;
  borderColor: string;
}

export default function EmailInput({
  email,
  setEmail,
  textColor,
  placeholderColor,
  borderColor,
}: EmailInputProps) {
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
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="username"
        placeholderTextColor={placeholderColor}
        style={{ color: textColor, fontSize: 16 }}
      />
    </View>
  );
}
