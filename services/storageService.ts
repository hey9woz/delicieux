import { Step } from '@/types/interface';
import { uploadStubImage, uploadStubStepImages } from "@/services/stubStorage";

/**
 * 指定されたURIから画像をアップロードし、そのダウンロードURLを返す非同期関数（スタブ）
 * @param {string} uri 画像のURI
 * @param {string} recipeId レシピID
 * @returns {Promise<string>} 画像のダウンロードURL
 */
export async function uploadImage(uri: string, recipeId: string): Promise<string> {
  return uploadStubImage(uri, recipeId);
}

/**
 * 手順情報のリストをループし、手順画像をStorageにアップロードする（スタブ）
 */
export async function uploadStepImages(steps: Step[], recipeId: string): Promise<Step[]> {
  return uploadStubStepImages(steps, recipeId);
}
