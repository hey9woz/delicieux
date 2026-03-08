import { Actionsheet } from "native-base";
import { recipeCopy } from "@/components/features/recipe/copy";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  image: string | "";
  onPickImage: (source: "library" | "camera" | null) => void;
};

export default function RecipeActionsheet({
  isOpen,
  onClose,
  image,
  onPickImage,
}: Props) {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        {image ? (
          <>
            <Actionsheet.Item onPress={() => onPickImage("library")}>
              {recipeCopy.imagePicker.actionsheet.change}
            </Actionsheet.Item>
            <Actionsheet.Item onPress={() => onPickImage(null)}>
              {recipeCopy.imagePicker.actionsheet.remove}
            </Actionsheet.Item>
          </>
          ) : (
          <>
            <Actionsheet.Item onPress={() => onPickImage("library")}>
              {recipeCopy.imagePicker.actionsheet.chooseFromLibrary}
            </Actionsheet.Item>
            <Actionsheet.Item onPress={() => onPickImage("camera")}>
              {recipeCopy.imagePicker.actionsheet.takePhoto}
            </Actionsheet.Item>
          </>
        )}
        <Actionsheet.Item onPress={onClose}>{recipeCopy.imagePicker.actionsheet.cancel}</Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
