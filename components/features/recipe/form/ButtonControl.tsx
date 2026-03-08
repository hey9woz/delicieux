import React from "react";
import { HStack, IconButton, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";

export const ButtonControl = ({
  color,
  colorPlaceholder,
  borderColor,
  addItem,
  removeItem,
}: {
  color: string;
  colorPlaceholder: string;
  borderColor: string;
  addItem: () => void;
  removeItem: () => void;
}) => (
  <>
    <HStack space={5}>
      <IconButton
        marginTop={2}
        size="md"
        variant="outline"
        color={color}
        borderColor={borderColor}
        icon={<Icon color={color} as={AntDesign} name="plus" />}
        onPress={addItem}
      />
      <IconButton
        marginTop={2}
        size="md"
        variant="outline"
        color={color}
        borderColor={borderColor}
        icon={<Icon color={color} as={AntDesign} name="minus" />}
        onPress={removeItem}
      />
    </HStack>
  </>
);

