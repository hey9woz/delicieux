import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { useThemeTextColor } from "@/hooks/useThemeColor";

interface SearchInputProps {
  search: string;
  updateSearch: (searchValue: string) => void;
  secondaryIconColor: string;
}

export default function SearchInput({
  search,
  updateSearch,
  secondaryIconColor,
}: SearchInputProps) {
  const { textPrimaryColor, placeholderColor, borderColor, textBackground } =
    useThemeTextColor();

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        borderWidth: 1,
        borderColor,
        borderRadius: 20,
        paddingHorizontal: 12,
        backgroundColor: textBackground,
      }}
    >
      <MaterialIcons name="search" size={18} color={secondaryIconColor} />
      <TextInput
        value={search}
        onChangeText={updateSearch}
        placeholder="Search"
        placeholderTextColor={placeholderColor}
        style={{
          flex: 1,
          color: textPrimaryColor,
          fontSize: 14,
          paddingVertical: 10,
        }}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
    </View>
  );
}
