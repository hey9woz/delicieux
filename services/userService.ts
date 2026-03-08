import { User } from '@/types/interface';
import {
  createStubUserDocument,
  fetchStubUserByUserId,
  fetchStubUserNamesByIds,
  fetchStubUsers,
  updateStubUserDocument,
} from "@/services/stubUsers";

// userドキュメントの作成
export const createUserDocument = async (userId: string, email: string | null, userName: string | null) => {
  return createStubUserDocument(userId, email, userName);
};

/**
 * Firestoreのユーザードキュメントを更新します（存在する場合のみ）。
 * emailまたはuserNameがnullまたは空の場合、それらのフィールドは更新しません。
 * @param {string} userId ユーザーID
 * @param {string} email 新しいメールアドレス
 * @param {string} userName 新しいユーザー名
 */
export const updateUserDocument = async (userId: string, email: string, userName: string) => {
  return updateStubUserDocument(userId, email, userName);
};

/**
 * 特定のユーザーIDを使用してスタブデータからユーザー情報を取得します。
 * @param {string} userId ユーザーのドキュメントID
 * @return {Promise<User | null>} ユーザーのデータを返します。見つからない場合はnullを返します。
 */
export const fetchUserByUserId = async (userId: string ): Promise<User | null> => {
  return fetchStubUserByUserId(userId);
}

export const fetchUsers = async (): Promise<User[]> => {
  return fetchStubUsers();
};

export const fetchUserNamesByIds = async (userIds: string[]): Promise<string[]> => {
  return fetchStubUserNamesByIds(userIds);
};
