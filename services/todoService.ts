import { ToDo } from "@/types/interface";
import { fetchUserRecipes } from "@/services/recipeService";

const todosByUserId = new Map<string, ToDo[]>();

const getTodos = (userId: string) => todosByUserId.get(userId) ?? [];
const setTodos = (userId: string, todos: ToDo[]) => {
  todosByUserId.set(userId, todos);
};

const makeIngredientTodoId = (recipeId: string, ingredientId: number) =>
  `recipe_${recipeId}_ingredient_${ingredientId}`;

async function ensureSeeded(userId: string) {
  if (todosByUserId.has(userId)) return;

  const recipes = (await fetchUserRecipes(userId)) ?? [];
  const baseRecipe = recipes[0];

  const seeded: ToDo[] = baseRecipe
    ? baseRecipe.ingredients.map((ing) => ({
        id: makeIngredientTodoId(baseRecipe.id, ing.id),
        text: `${ing.text} (${ing.quantity})`,
        done: false,
        userIds: [userId],
      }))
    : [];

  setTodos(userId, seeded);
}

/**
 * 新しいタスクを追加する非同期関数（スタブ）
 * @param {string} text タスクの内容
 * @param {string[]} userIds タスクに関連するユーザーIDのリスト
 * @param {boolean} done タスクの完了状態
 * @returns {Promise<string>} タスクIDを返します
 */
export const addTodo = async (text: string, userIds: string[], done: boolean): Promise<string> => {
  console.log('タスクを追加しました（スタブ）:', text);
  const userId = userIds[0] ?? "unknown";
  await ensureSeeded(userId);

  const nextTodos = getTodos(userId);
  const taskId = `todo_${Math.random().toString(36).substring(2, 15)}`;
  setTodos(userId, [...nextTodos, { id: taskId, text, done, userIds }]);
  return taskId;
};

export const updateTodoShare = async (currentUserId: string, shareItemIds: string[], selectedUserIds: string[]) => {
  console.log('タスクのシェア情報を更新しました（スタブ）:', shareItemIds, '共有ユーザー:', selectedUserIds);
};

export const resetTodoShare = async (currentUserId: string, shareItemIds: string[]) => {
  console.log('タスクのシェア情報をリセットしました（スタブ）:', shareItemIds);
};

export const updateTodoText = async (text: string, id: string) => {
  console.log('タスクのテキストを更新しました（スタブ）:', id, '新しいテキスト:', text);
  for (const [userId, todos] of todosByUserId.entries()) {
    const idx = todos.findIndex((t) => t.id === id);
    if (idx === -1) continue;
    const next = todos.slice();
    next[idx] = { ...next[idx], text };
    setTodos(userId, next);
    return;
  }
};

export const updateTodoDone = async (done: boolean, id: string) => {
  console.log('タスクの完了状態を更新しました（スタブ）:', id, '完了状態:', done);
  for (const [userId, todos] of todosByUserId.entries()) {
    const idx = todos.findIndex((t) => t.id === id);
    if (idx === -1) continue;
    const next = todos.slice();
    next[idx] = { ...next[idx], done };
    setTodos(userId, next);
    return;
  }
};

export const deleteTodo = async (id: string) => {
  console.log('タスクを削除しました（スタブ）:', id);
  for (const [userId, todos] of todosByUserId.entries()) {
    if (!todos.some((t) => t.id === id)) continue;
    setTodos(userId, todos.filter((t) => t.id !== id));
    return;
  }
};

/**
 * 指定したユーザーのタスクデータをリアルタイムに取得し、変更があるたびにコールバックを実行します。（スタブ）
 * @param userId 取得するタスクのユーザーID
 * @param callback タスクデータが更新されたときに実行されるコールバック関数
 * @returns 購読解除関数
 */
export function subscribeToTasks(userId: string, callback: (todos: ToDo[]) => void) {
  console.log('タスクデータを購読しました（スタブ）:', userId);
  void (async () => {
    await ensureSeeded(userId);
    callback(getTodos(userId));
  })();

  // 購読解除関数を返す
  return () => console.log('タスクデータの購読を解除しました');
}
