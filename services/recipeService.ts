import {
  User,
  Recipe,
  Ingredient,
  Step,
  RecipeWithUserName,
} from "@/types/interface";
import {
  deleteStubRecipe,
  fetchStubRecipeByRecipeId,
  fetchStubUserRecipes,
  saveStubRecipe,
} from "@/services/recipe/stubRecipes";

/**
 * 特定のユーザーのレシピを非同期で取得します。
 * ユーザーがnullである場合は何もしません。
 *
 * @param {string} userId ログインしているユーザーのID
 * @return {Promise<Recipe[] | null>} 取得したレシピの配列またはユーザーがnullの場合はnullを返します。
 */
export const fetchUserRecipes = async (
  userId: string | null
): Promise<Recipe[] | null> => {
  if (!userId) return null; // ユーザー情報がなければ処理を中断

  return fetchStubUserRecipes(userId);
};

/**
 * 特定のレシピIDを使用してスタブデータからレシピを取得します。
 * @param {string} recipeId レシピのドキュメントID
 * @return {Promise<Recipe | null>} レシピのデータを返します。見つからない場合はnullを返します。
 */
export const fetchRecipeByRecipeId = async (
  recipeId: string
): Promise<Recipe | null> => {
  return fetchStubRecipeByRecipeId(recipeId);
};

/**
 * レシピデータの登録スタブ
 * @param userId ユーザーID
 * @param name レシピ名
 * @param ingredients 材料リスト
 * @param steps 手順リスト
 * @param memo メモ
 * @param image 画像URL
 * @returns 登録したレシピのIDを返します
 */
export async function saveRecipe(
  userId: string,
  name: string,
  ingredients: Ingredient[],
  steps: Step[],
  memo: string,
  image: string | null
): Promise<string> {
  return saveStubRecipe(userId, name, ingredients, steps, memo, image);
}

/**
 * 指定されたレシピの削除スタブ
 * @param {string} recipeId 削除するレシピのドキュメントID
 */
export const deleteRecipe = async (recipeId: string): Promise<void> => {
  return deleteStubRecipe(recipeId);
};
