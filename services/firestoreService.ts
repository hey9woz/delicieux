import { Ingredient, Step } from "@/types/interface";

/**
 * NOTE:
 * このリポジトリはデモ/スタブとして動かす前提のため、
 * Firestore 実体（db 初期化等）に依存しない no-op/stub 実装にしています。
 * 本実装に切り替える場合は db 初期化・責務分離（hooks vs services）を行ってください。
 */

export const handleToggleCheckbox = (id: string, isDone: boolean) => async () => {
  console.log("タスクの完了ステータスをトグルしました（スタブ）:", { id, isDone });
};

/**
 * 特定のIDフィールド値に基づいてタスクのドキュメントIDを取得します。（スタブ）
 */
export const getDocumentIdByTaskId = async (id: string): Promise<string | null> => {
  console.log("タスクのドキュメントIDを取得しました（スタブ）:", { id });
  return null;
};

export const deleteTaskInFirestore = async (taskId: string) => {
  console.log("タスクを削除しました（スタブ）:", { taskId });
};

/**
 * 特定のタスクの subject を更新します。（スタブ）
 */
export const updateTaskSubjectInFirestore = async (taskId: string, newSubject: any) => {
  console.log("タスクの subject を更新しました（スタブ）:", { taskId, newSubject });
};

/**
 * レシピ情報を更新する非同期関数（スタブ）
 */
export async function updateRecipe(
  id: string,
  userId: string,
  name: string,
  ingredients: Ingredient[],
  steps: Step[],
  memo: string
): Promise<void> {
  console.log("レシピを更新しました（スタブ）:", { id, userId, name, ingredients, steps, memo });
}

/**
 * レシピのメインイメージを更新する非同期関数（スタブ）
 */
export async function updateRecipeMainImage(recipeId: string, imageUrl: string): Promise<void> {
  console.log("レシピのメインイメージを更新しました（スタブ）:", { recipeId, imageUrl });
}

/**
 * レシピの手順を更新する非同期関数（スタブ）
 */
export async function updateRecipeSteps(recipeId: string, steps: Step[]): Promise<void> {
  console.log("レシピの手順を更新しました（スタブ）:", { recipeId, steps });
}

export async function saveUserGroup(groupId: string, userIds: string[]): Promise<void> {
  console.log("ユーザーグループを保存しました（スタブ）:", { groupId, userIds });
}

export async function getUserGroup(id: string): Promise<string[]> {
  console.log("ユーザーグループを取得しました（スタブ）:", { id });
  return [];
}

export async function getUserGroupId(userId: string): Promise<string | null> {
  console.log("ユーザーのグループIDを取得しました（スタブ）:", { userId });
  return null;
}

