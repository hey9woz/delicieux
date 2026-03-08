import React from "react";
import { HStack, Input } from "native-base";
import { Ingredient } from "@/types/interface";
import { recipeCopy } from "@/components/features/recipe/copy";

interface IngredientInputProps {
  color: string;
  colorPlaceholder: string;
  borderColor: string;
  ingredient: Ingredient;
  onChange: (text: string, id: number) => void;
  onQuantityChange: (text: string, id: number) => void;
  inputHeight?: string | number;
}

// IngredientInput Component in TSX
export const IngredientInput: React.FC<IngredientInputProps> = ({
  color,
  colorPlaceholder,
  borderColor,
  ingredient,
  onChange,
  onQuantityChange,
  inputHeight = "45px",
}) => (
  <HStack space={2} alignItems="center" marginTop={3} borderBottomColor={borderColor} borderBottomWidth={1}>
    <Input
      color={color}
      placeholderTextColor={colorPlaceholder}
      borderColor="transparent"
      borderWidth={0}
      height={inputHeight}
      flex={1}
      placeholder={recipeCopy.form.ingredientPlaceholder}
      value={ingredient.text}
      onChangeText={(text: string) => onChange(text, ingredient.id)}
      fontSize="md"
      fontWeight="bold"
    />
    <Input
      w="20%"
      color={color}
      textAlign="center"
      placeholderTextColor={colorPlaceholder}
      borderColor="transparent"
      borderWidth={0}
      height={inputHeight}
      placeholder={recipeCopy.form.quantityPlaceholder}
      value={ingredient.quantity}
      onChangeText={(text: string) => onQuantityChange(text, ingredient.id)}
      fontSize="md"
      fontWeight="bold"
    />
  </HStack>
);

