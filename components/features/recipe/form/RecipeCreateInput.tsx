import React, { useState } from "react";
import { HStack, Box, Input, IconButton, Icon, Image, Actionsheet, useDisclose, Pressable, Spinner } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Ingredient } from "@/types/interface";
import { Keyboard, TextInput } from 'react-native';
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
const IngredientInput: React.FC<IngredientInputProps> = ({
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

interface StepInputProps {
  step: { id: number; text: string; image: string | null };
  index: number;
  onChange: (text: string, id: number) => void;
  onPickImage: (uri: string | null) => void;
  color: string;
  colorPlaceholder: string;
  borderColor: string;
}

const StepInput: React.FC<StepInputProps> = ({
  step,
  index,
  onChange,
  onPickImage,
  color,
  colorPlaceholder,
  borderColor,
}) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleOpenActionSheet = () => {
    Keyboard.dismiss();
    onOpen();
  };
  const pickImage = async (source: 'camera' | 'library') => {
    setIsImageLoading(true);
    let result: ImagePicker.ImagePickerResult;
    if (source === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      const imageUri = (result as ImagePicker.ImagePickerSuccessResult).assets[0].uri;
      onPickImage(imageUri);
    }
    setIsImageLoading(false);
  };

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
          placeholder={recipeCopy.form.stepPlaceholder(index)}
          placeholderTextColor={colorPlaceholder}
          value={step.text}
          onChangeText={(text) => onChange(text, step.id)}
          multiline
        />
        {isImageLoading ? (
          <Spinner size="lg" />
        ) : step.image ? (
          <Pressable onPress={handleOpenActionSheet}>
            <Image source={{ uri: step.image }} alt={`Step ${index + 1} Image`} w="20%" size="sm" borderColor={borderColor} borderWidth={1} borderRadius="lg" />
          </Pressable>
        ) : (
          <IconButton
            w="20%"
            icon={<Icon as={AntDesign} name="camera" color={colorPlaceholder}/>}
            onPress={handleOpenActionSheet}
          />
        )}
      </HStack>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          {step.image ? (
            <>
              <Actionsheet.Item onPress={() => pickImage('library')}>{recipeCopy.imagePicker.actionsheet.change}</Actionsheet.Item>
              <Actionsheet.Item onPress={() => onPickImage(null)}>{recipeCopy.imagePicker.actionsheet.remove}</Actionsheet.Item>
            </>
          ) : (
            <>
              <Actionsheet.Item onPress={() => pickImage('library')}>{recipeCopy.imagePicker.actionsheet.chooseFromLibrary}</Actionsheet.Item>
              <Actionsheet.Item onPress={() => pickImage('camera')}>{recipeCopy.imagePicker.actionsheet.takePhoto}</Actionsheet.Item>
            </>
          )}
          <Actionsheet.Item onPress={onClose}>{recipeCopy.imagePicker.actionsheet.cancel}</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

interface TodoInputProps {
  todo: { id: number; text: string | undefined };
  index: number;
  onChange: (text: string, id: number) => void;
  color: string;
  colorPlaceholder: string;
  borderColor: string;
}

const TodoInput: React.FC<TodoInputProps> = ({
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
          icon={<Icon as={AntDesign} name="camera" color={colorPlaceholder}/>}
          onPress={onOpen}
        />
      </HStack>
    </Box>
  );
};

const ButtonControl = ({
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

export { IngredientInput, StepInput, TodoInput, ButtonControl };
