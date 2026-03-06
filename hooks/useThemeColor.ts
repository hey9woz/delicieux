import { useColorModeValue } from "native-base";
import theme from "@/themes/colors";

const useThemeProperty = (propertyPath :string[]) => {
  const lightValue = propertyPath.reduce((acc: { [x: string]: any; }, cur: string | number) => acc[cur], theme.colors.light);
  const darkValue = propertyPath.reduce((acc: { [x: string]: any; }, cur: string | number) => acc[cur], theme.colors.dark);
  return useColorModeValue(lightValue, darkValue);
};

export const useThemeNavigationColor = () => {
  const navActiveIconColor = useThemeProperty(['navigation', 'activeIcon']);
  const navInActiveIconColor = useThemeProperty(['navigation', 'inactiveIcon']);
  const navBackground = useThemeProperty(['navigation', 'background']);

  return {
    navActiveIconColor,
    navInActiveIconColor,
    navBackground
  };
};

export const useThemeStatusColor = () => {
  const dangerColor = useThemeProperty(['status', 'danger']);
  const spinnerColor = useThemeProperty(['status', 'spinner']);

  return {
    dangerColor,
    spinnerColor
  };
};

export const useThemeBtnColor = () => {
  const btnTextColor = useThemeProperty(['button', 'text']);
  const btnBackground = useThemeProperty(['button', 'background']);
  const btnPressedBackground = useThemeProperty(['button', 'pressed']);
  const btnBorder = useThemeProperty(['button', 'border']);

  return {
    btnTextColor,
    btnBackground,
    btnPressedBackground,
    // Backward-compatible alias (some components expect this key name)
    btnBackgroundColor: btnBackground,
    btnBorder,
  };
};

export const useThemeIconColor = () => {
  const iconPrimaryColor = useThemeProperty(['icon', 'primary']);
  const iconSecondaryColor = useThemeProperty(['icon', 'secondary']);

  return {
    iconPrimaryColor,
    iconSecondaryColor,
  };
};

export const useThemeDisplayColor = () => {
  const displayBackground = useThemeProperty(['display', 'background']);
  const displayTextPrimaryColor = useThemeProperty(['text', 'primary']);
  const displayTextSecondaryColor = useThemeProperty(['text', 'secondary']);
  const displayPlaceholderColor = useThemeProperty(['text', 'placeholder']);

  return {
    displayBackground,
    // Backward-compatible aliases (used by some components)
    displayBgColor: displayBackground,
    displayTextPrimaryColor,
    displayTextSecondaryColor,
    displayPlaceholderColor,
  };
};

export const useThemeTextColor = () => {
  const textBackground = useThemeProperty(['text', 'background']);
  const textPrimaryColor = useThemeProperty(['text', 'primary']);
  const textSecondaryColor = useThemeProperty(['text', 'secondary']);
  const placeholderColor = useThemeProperty(['text', 'placeholder']);
  const borderColor = useThemeProperty(['text', 'border']);
  const linkColor = useThemeProperty(['text', 'link']);

  return {
    textBackground,
    textPrimaryColor,
    textSecondaryColor,
    placeholderColor,
    borderColor,
    linkColor
  };
};
