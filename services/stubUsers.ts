import { User } from "@/types/interface";
import { logger } from "@/utils/logger";

const STUB_USER: User = {
  id: "stbUserId",
  email: "yohei.kano@rutenya.jp",
  userName: "Yohei Kano",
  password: "passeord",
};

const STUB_USERS: User[] = [
  {
    id: "stbUserId1",
    email: "user1@example.com",
    userName: "User One",
    password: "password1",
  },
  {
    id: "stbUserId2",
    email: "user2@example.com",
    userName: "User Two",
    password: "password2",
  },
];

export function fetchStubUserByUserId(userId: string): Promise<User | null> {
  return new Promise<User | null>((resolve) => {
    setTimeout(() => {
      if (__DEV__) {
        logger.info("ユーザーデータが見つかりました: ", STUB_USER.userName);
      }
      resolve(STUB_USER);
    }, 500); // 0.5秒後にレスポンスを模擬
  });
}

export async function fetchStubUsers(): Promise<User[]> {
  logger.info("全ユーザーデータを取得しました（スタブ）");
  return STUB_USERS;
}

export async function fetchStubUserNamesByIds(userIds: string[]): Promise<string[]> {
  logger.info("ユーザー名を取得しました（スタブ）:", userIds);
  return userIds.map((id) => `User Name for ${id}`);
}

// userドキュメントの作成（スタブ）
export const createStubUserDocument = async (userId: string, email: string | null, userName: string | null) => {
  logger.info('ユーザードキュメントを作成しました（スタブ）:', userId, email, userName);
};

/**
 * Firestoreのユーザードキュメントを更新します（存在する場合のみ）。（スタブ）
 * emailまたはuserNameがnullまたは空の場合、それらのフィールドは更新しません。
 * @param {string} userId ユーザーID
 * @param {string} email 新しいメールアドレス
 * @param {string} userName 新しいユーザー名
 */
export const updateStubUserDocument = async (userId: string, email: string, userName: string) => {
  logger.info('ユーザードキュメントを更新しました（スタブ）:', userId, email, userName);
};
