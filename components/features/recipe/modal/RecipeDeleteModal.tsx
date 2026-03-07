import {
  Modal,
  HStack,
  Icon,
  Text,
  VStack,
  Button,
  useToast
} from "native-base";
import { deleteRecipe } from "@/services/recipeService";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeTextColor } from "@/hooks/useThemeColor";
import { useStackNavigation } from "@/hooks/useStackNavigation";
import { recipeCopy } from "@/components/features/recipe/copy";

type Props = {
  deleteId: string;
  deleteModal: boolean;
  setDeleteModal: (show: boolean) => void;
};

export function RecipeDeleteModal({
  deleteId,
  deleteModal,
  setDeleteModal,
}: Props) {
  const toast = useToast();
  const { navigation } = useStackNavigation();
  const {
    textPrimaryColor,
    textBackground,
  } = useThemeTextColor();

  const handleDelete = async () => {
    try {
      setDeleteModal(false); // モーダルを閉じる
      await deleteRecipe(deleteId); // レシピの削除を試みる
      toast.show({
        description: recipeCopy.recipeDelete.toast.success,
        colorScheme: "success", // 成功のステータス
        duration: 3000, // 表示時間
      });
      navigation.navigate("RecipeList");
    } catch (error) {
      console.error("Failed to delete recipe:", error);
      toast.show({
        description: recipeCopy.recipeDelete.toast.failure,
        colorScheme: "error", // エラーのステータス
        duration: 3000, // 表示時間
      });
    }
  };

  return (
    <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)}>
      <Modal.Content bgColor={textBackground} width="90%">
        <Modal.CloseButton />
        <Modal.Header bgColor={textBackground} borderColor="transparent">
          <HStack space={2} alignItems="center">
            <Icon as={MaterialIcons} name="delete" color={textPrimaryColor} />
            <Text textAlign="center" color={textPrimaryColor}>
              {recipeCopy.recipeDelete.headerTitle}
            </Text>
          </HStack>
        </Modal.Header>
        <Modal.Body>
          <VStack space={4} alignItems="center" justifyContent="center">
            <Text fontSize="md" color={textPrimaryColor} textAlign="center">
              {recipeCopy.recipeDelete.confirmMessage}
            </Text>
          </VStack>
        </Modal.Body>
        <Modal.Footer bgColor={textBackground} borderColor="transparent">
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setDeleteModal(false);
              }}
            >
              {recipeCopy.recipeDelete.buttons.cancel}
            </Button>
            <Button onPress={handleDelete}>{recipeCopy.recipeDelete.buttons.delete}</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
