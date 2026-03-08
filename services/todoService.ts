import { ToDo } from "@/types/interface";
import {
  addStubTodo,
  updateStubTodoShare,
  resetStubTodoShare,
  updateStubTodoText,
  updateStubTodoDone,
  deleteStubTodo,
  subscribeToStubTasks,
} from "@/services/stubTodos";

/**
 * 新しいタスクを追加する非同期関数（スタブ）
 * @param {string} text タスクの内容
 * @param {string[]} userIds タスクに関連するユーザーIDのリスト
 * @param {boolean} done タスクの完了状態
 * @returns {Promise<string>} タスクIDを返します
 */
export const addTodo = async (text: string, userIds: string[], done: boolean): Promise<string> => {
  return addStubTodo(text, userIds, done);
};

export const updateTodoShare = async (currentUserId: string, shareItemIds: string[], selectedUserIds: string[]) => {
  return updateStubTodoShare(currentUserId, shareItemIds, selectedUserIds);
};

export const resetTodoShare = async (currentUserId: string, shareItemIds: string[]) => {
  return resetStubTodoShare(currentUserId, shareItemIds);
};

export const updateTodoText = async (text: string, id: string) => {
  return updateStubTodoText(text, id);
};

export const updateTodoDone = async (done: boolean, id: string) => {
  return updateStubTodoDone(done, id);
};

export const deleteTodo = async (id: string) => {
  return deleteStubTodo(id);
};

/**
 * 指定したユーザーのタスクデータをリアルタイムに取得し、変更があるたびにコールバックを実行します。（スタブ）
 * @param userId 取得するタスクのユーザーID
 * @param callback タスクデータが更新されたときに実行されるコールバック関数
 * @returns 購読解除関数
 */
export function subscribeToTasks(userId: string, callback: (todos: ToDo[]) => void) {
  return subscribeToStubTasks(userId, callback);
}
