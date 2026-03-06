import React from "react";
import { TextInput, View } from "react-native";

interface DefaultInputProps {
  placeholder: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  textColor: string;
  placeholderColor: string;
  borderColor: string;
}

export default function DefaultInput({
  placeholder,
  state,
  setState,
  textColor,
  placeholderColor,
  borderColor,
}: DefaultInputProps) {
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
        placeholder={placeholder}
        value={state}
        onChangeText={setState}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor={placeholderColor}
        style={{ color: textColor, fontSize: 16 }}
      />
    </View>
  );
}
