import React, { useState } from "react";
import { HStack, Box, IconButton, Icon, Image, useDisclose, Pressable, Spinner } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Keyboard, TextInput } from "react-native";
import { recipeCopy } from "@/components/features/recipe/copy";
import { pickImageUri } from "@/utils/imagePicker";
import RecipeActionsheet from "@/components/features/recipe/form/RecipeActionsheet";

interface StepInputProps {
  step: { id: number; text: string; image: string | null };
  index: number;
  onChange: (text: string, id: number) => void;
  onPickImage: (uri: string | null) => void;
  color: string;
  colorPlaceholder: string;
  borderColor: string;
}

export const StepInput: React.FC<StepInputProps> = ({
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
  const pickImage = async (source: "camera" | "library") => {
    setIsImageLoading(true);
    const imageUri = await pickImageUri(source);
    if (imageUri) {
      onPickImage(imageUri);
    }
    setIsImageLoading(false);
  };

  const handlePickImage = (source: "camera" | "library" | null) => {
    if (source === null) {
      onPickImage(null);
      return;
    }
    void pickImage(source);
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
            icon={<Icon as={AntDesign} name="camera" color={colorPlaceholder} />}
            onPress={handleOpenActionSheet}
          />
        )}
      </HStack>
      <RecipeActionsheet
        isOpen={isOpen}
        onClose={onClose}
        image={step.image ?? ""}
        onPickImage={handlePickImage}
      />
    </Box>
  );
};
