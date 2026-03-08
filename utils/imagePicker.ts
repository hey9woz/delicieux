import * as ImagePicker from "expo-image-picker";

export type ImagePickSource = "camera" | "library";

export async function pickImageUri(source: ImagePickSource): Promise<string | null> {
  let result: ImagePicker.ImagePickerResult;

  if (source === "camera") {
    result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  } else {
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  }

  if (result.canceled) {
    return null;
  }

  return (result as ImagePicker.ImagePickerSuccessResult).assets[0].uri;
}

