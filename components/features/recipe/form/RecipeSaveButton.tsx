import { Box, Button, Text } from 'native-base';
import { recipeCopy } from "@/components/features/recipe/copy";

interface RecipeSaveButtonProps {
  onPress: () => void;
  bgColor: string;
  color: string;
  borderColor: string;
  isCreate?: boolean;
}

const RecipeSaveButton: React.FC<RecipeSaveButtonProps> = ({
  onPress,
  bgColor,
  color,
  borderColor,
  isCreate,
}) => (
  <Box width="85%" mt={3}>
    <Button bgColor={bgColor} onPress={onPress} borderRadius="10px" h="50px" borderWidth={1} borderColor={borderColor}>
      <Text color={color} fontWeight="bold">
        { isCreate ? recipeCopy.form.saveButton.create : recipeCopy.form.saveButton.saveChanges}
      </Text>
    </Button>
  </Box>
);

export default RecipeSaveButton;
