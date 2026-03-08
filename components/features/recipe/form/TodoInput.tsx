import React from "react";
import { HStack, Box, IconButton, Icon, useDisclose } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native";

interface TodoInputProps {
  todo: { id: number; text: string | undefined };
  index: number;
  onChange: (text: string, id: number) => void;
  color: string;
  colorPlaceholder: string;
  borderColor: string;
}

export const TodoInput: React.FC<TodoInputProps> = ({
  todo,
  index,
  onChange,
  color,
  colorPlaceholder,
  borderColor,
}) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <Box>
      <HStack space={2} alignItems="center" marginTop={3} borderBottomColor={borderColor} borderBottomWidth={1}>
        <TextInput
          style={{
            flex: 1,
            color,
            fontSize: 16,
            fontWeight: "700",
            paddingVertical: 10,
          }}
          placeholder=""
          placeholderTextColor={colorPlaceholder}
          value={todo.text ?? ""}
          onChangeText={(text) => onChange(text, todo.id)}
          multiline
        />
        <IconButton
          w="20%"
          icon={<Icon as={AntDesign} name="camera" color={colorPlaceholder} />}
          onPress={onOpen}
        />
      </HStack>
    </Box>
  );
};

