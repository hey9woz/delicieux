import { Box, FormControl } from 'native-base';
import React from "react";
import { TextInput } from "react-native";

interface RecipeMemoControlProps {
  memo: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  colorPlaceholder: string;
  borderColor: string;
}

const RecipeMemoControl: React.FC<RecipeMemoControlProps> = ({
  memo,
  onChange,
  color,
  colorPlaceholder,
  borderColor
}) => (
  <Box width="100%" borderBottomColor={borderColor} borderBottomWidth={1}>
    <FormControl mt="2">
      <TextInput
        style={{
          width: "100%",
          color,
          fontSize: 16,
          fontWeight: "700",
          paddingVertical: 10,
        }}
        placeholder="メモ"
        placeholderTextColor={colorPlaceholder}
        value={memo}
        onChangeText={onChange}
        multiline
      />
    </FormControl>
  </Box>
);

export default RecipeMemoControl;
