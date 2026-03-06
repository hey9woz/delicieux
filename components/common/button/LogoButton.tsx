import { IconButton, Icon } from "native-base";
import * as Linking from "expo-linking";
import Ripple from "react-native-material-ripple";
import { Ionicons } from "@expo/vector-icons";
import { useThemeIconColor } from "@/hooks/useThemeColor";

export default function SourceViewButton() {
  const { iconPrimaryColor } = useThemeIconColor();
  const openSourcePublicPage = () => {
    Linking.openURL("https://github.com/sanflat/delicieux");
  };

  return (
    <Ripple
      rippleColor={iconPrimaryColor}
      rippleCentered
      onPress={openSourcePublicPage}
      style={{ cursor: "pointer" }}
    >
      <IconButton
        icon={<Icon as={Ionicons} name="logo-github" size="xl" color={iconPrimaryColor} />}
        background="transparent"
        style={{ cursor: "pointer" }}
      />
    </Ripple>
  );
}
