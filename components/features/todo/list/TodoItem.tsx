import React, { memo, useState, useEffect } from "react";
import {
  Box,
  HStack,
  Icon,
  Input,
} from "native-base";
import CustomCheckbox from "./CustomCheckbox";
import AnimatedTaskLabel from "./AnimatedTaskLabel";
import SwipableView from "./SwipableView";
import { Ionicons } from "@expo/vector-icons";
import {
  updateTodoText,
  updateTodoDone,
  deleteTodo,
} from "@/services/todoService";
import { ToDo } from "@/types/interface";
import { useThemeTextColor } from "@/hooks/useThemeColor";
import { logger } from "@/utils/logger";

interface TodoItemProps {
  data: ToDo;
  editingItemId: string | null;
  onFinishEditing: () => void;
  onPressLabel: (itemId: string) => void;
  onRemove: (itemId: string) => void;
}

const TodoItem = memo(
  ({ data, editingItemId, onFinishEditing, onPressLabel, onRemove }: TodoItemProps) => {
    const [text, setText] = useState(data.text);
    const [done, setDone] = useState(data.done);

    useEffect(() => {
      setText(data.text); // 変更されたら、ローカル状態も更新する
      setDone(data.done);
    }, [data.text, data.done]);

    const handleUpdateText = async () => {
      try {
        if (text !== data.text) {
          // 編集中のアイテムIDが存在し、テキストが更新されている場合のみ更新を実行
          await updateTodoText(text, data.id);
        }
        onFinishEditing();
      } catch (error) {
        logger.error("Failed to update task:", error);
      }
    };

    const handleToggleDone = async () => {
      const nextDone = !done;
      setDone(nextDone);
      try {
        await updateTodoDone(nextDone, data.id);
      } catch (error) {
        setDone(!nextDone);
        logger.error("Failed to update task:", error);
      }
    };

    const handleRemove = async (id: string) => {
      try {
        await deleteTodo(id);
        onRemove(id);
      } catch (error) {
        logger.error("Failed to update task:", error);
      }
    };

    const {
      textPrimaryColor,
      textBackground,
    } = useThemeTextColor();
    return (
      <SwipableView
        onSwipeLeft={() => handleRemove(data.id)}
        backView={
          <Box
            w="full"
            h="full"
            bg="red.500"
            alignItems="flex-end"
            justifyContent="center"
            pr={4}
          >
            <Icon color="white" as={<Ionicons name="trash-sharp" />} size="sm" />
          </Box>
        }
      >
        <HStack
          alignItems="center"
          w="full"
          h="40px"
          bg={textBackground}
        >
          <Box mr={2}>
            <CustomCheckbox
              checked={done}
              onPress={handleToggleDone}
              color={textPrimaryColor}
            />
          </Box>
          {data.id === editingItemId ? (
            <Input
              color={textPrimaryColor}
              placeholder="Todo text...."
              borderColor="transparent"
              borderWidth={0}
              value={text}
              onChangeText={setText}
              variant="unstyled"
              fontSize={16}
              px={1}
              py={0}
              autoFocus
              onBlur={handleUpdateText}
            />
          ) : (
            <AnimatedTaskLabel
              textColor={textPrimaryColor}
              inactiveTextColor={textPrimaryColor}
              strikethrough={done}
              onPress={() => onPressLabel(data.id)}
            >
              {text}
            </AnimatedTaskLabel>
          )}
        </HStack>
      </SwipableView>
    );
  }
);

export default TodoItem;
