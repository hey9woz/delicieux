import { ToDo } from "@/types/interface";
import { fetchUserRecipes } from "@/services/recipeService";
import { logger } from "@/utils/logger";

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

export const addStubTodo = async (text: string, userIds: string[], done: boolean): Promise<string> => {
  logger.info("タスクを追加しました（スタブ）:", text);
  const userId = userIds[0] ?? "unknown";
  await ensureSeeded(userId);

  const nextTodos = getTodos(userId);
  const taskId = `todo_${Math.random().toString(36).substring(2, 15)}`;
  setTodos(userId, [...nextTodos, { id: taskId, text, done, userIds }]);
  return taskId;
};

export const updateStubTodoShare = async (currentUserId: string, shareItemIds: string[], selectedUserIds: string[]) => {
  logger.info("タスクのシェア情報を更新しました（スタブ）:", shareItemIds, "共有ユーザー:", selectedUserIds);
};

export const resetStubTodoShare = async (currentUserId: string, shareItemIds: string[]) => {
  logger.info("タスクのシェア情報をリセットしました（スタブ）:", shareItemIds);
};

export const updateStubTodoText = async (text: string, id: string) => {
  logger.info("タスクのテキストを更新しました（スタブ）:", id, "新しいテキスト:", text);
  for (const [userId, todos] of todosByUserId.entries()) {
    const idx = todos.findIndex((t) => t.id === id);
    if (idx === -1) continue;
    const next = todos.slice();
    next[idx] = { ...next[idx], text };
    setTodos(userId, next);
    return;
  }
};

export const updateStubTodoDone = async (done: boolean, id: string) => {
  logger.info("タスクの完了状態を更新しました（スタブ）:", id, "完了状態:", done);
  for (const [userId, todos] of todosByUserId.entries()) {
    const idx = todos.findIndex((t) => t.id === id);
    if (idx === -1) continue;
    const next = todos.slice();
    next[idx] = { ...next[idx], done };
    setTodos(userId, next);
    return;
  }
};

export const deleteStubTodo = async (id: string) => {
  logger.info("タスクを削除しました（スタブ）:", id);
  for (const [userId, todos] of todosByUserId.entries()) {
    if (!todos.some((t) => t.id === id)) continue;
    setTodos(userId, todos.filter((t) => t.id !== id));
    return;
  }
};

export function subscribeToStubTasks(userId: string, callback: (todos: ToDo[]) => void) {
  logger.info("タスクデータを購読しました（スタブ）:", userId);
  void (async () => {
    await ensureSeeded(userId);
    callback(getTodos(userId));
  })();

  return () => logger.info("タスクデータの購読を解除しました");
}

