import { useState, useCallback, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Recipe, Ingredient, Step } from "@/types/interface";
import useAuth from "@/hooks/useAuth";
import { saveRecipeWithImage, updateRecipeWithImage } from "@/services/saveRecipeWithImage";
import { Keyboard } from 'react-native';
import { useStackNavigation } from "@/hooks/useStackNavigation";
import { recipeCopy } from "@/components/features/recipe/copy";
import { pickImageUri } from "@/utils/imagePicker";
import { logger } from "@/utils/logger";

type Props = {
  recipe?: Recipe;
}

export function useRecipeForm(recipe: Props) {
  const { navigation } = useStackNavigation();
  const { user } = useAuth();

  // レシピ名
  const [recipeName, setRecipeName] = useState(recipe?.recipe?.name || "");
  // レシピのメイン画像
  const [mainImage, setMainImage] = useState(recipe?.recipe?.image || "");
  // 材料（材料名と数量）
  const [ingredients, setIngredients] = useState<Ingredient[]>(recipe?.recipe?.ingredients || [{ id: 1, text: "", quantity: "" }]);
  // 手順（手順と画像）
  const [steps, setSteps] = useState<Step[]>(recipe?.recipe?.steps || [{ id: 1, text: "", image: "" }]);
  // レシピに関するメモ
  const [recipeMemo, setRecipeMemo] = useState(recipe?.recipe?.memo || "");
  // メイン画像のローディング
  const [isImageLoading, setIsImageLoading] = useState(false);
  // アクティブシートの開閉
  const [isOpen, setOpen] = useState(false);

  // カメラとフォトギャラリーへのアクセス権限を管理する
  const [permissionsGranted, setPermissionsGranted] = useState({ camera: false, gallery: false });

  useEffect(() => {
    (async () => {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermissionsGranted({
        camera: cameraPermission.status === 'granted',
        gallery: galleryPermission.status === 'granted'
      });
    })();
  }, []);

  const onOpen = () => {
    Keyboard.dismiss(); // キーボードを閉じる
    setOpen(true);
  };

  const onClose = () => setOpen(false);

  const handleSaveRecipe = useCallback(async () => {
    if (!user) {
      logger.info("ユーザーが認証されていません");
      return;
    }

    const userId = user.id;

    try {
      if (recipe?.recipe?.id) {
        await updateRecipeWithImage(
          recipe.recipe.id,
          userId,
          recipeName,
          ingredients,
          steps,
          recipeMemo,
          mainImage
        );
      } else {
        await saveRecipeWithImage(
          userId,
          recipeName,
          ingredients,
          steps,
          recipeMemo,
          mainImage
        );
      }
      navigation.goBack();
    } catch (error) {
      logger.error("レシピの保存に失敗しました:", error);
    }
  }, [
    user,
    recipe,
    recipeName,
    ingredients,
    steps,
    recipeMemo,
    mainImage,
    navigation,
  ]);

  const pickImage = useCallback(async (source: 'camera' | 'library' | null) => {
    if (source === null) {
      setMainImage("");
      return;
    }

    if (source === 'camera' && !permissionsGranted.camera || source === 'library' && !permissionsGranted.gallery) {
      alert(recipeCopy.imagePicker.permissionRequired);
      return;
    }

    setIsImageLoading(true);
    const imageUri = await pickImageUri(source);
    if (imageUri) {
      setMainImage(imageUri);
    }
    setIsImageLoading(false);
  }, [permissionsGranted.camera, permissionsGranted.gallery]);

  return {
    recipeName,
    setRecipeName,
    ingredients,
    setIngredients,
    steps,
    setSteps,
    recipeMemo,
    setRecipeMemo,
    mainImage,
    setMainImage,
    isImageLoading,
    setIsImageLoading,
    isOpen,
    onOpen,
    onClose,
    handleSaveRecipe,
    pickImage,
  };
}
