import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Keyboard,
  Platform,
  ScrollView,
  View,
} from "react-native";
import DisplayView from "@/components/layout/DisplayView";
import MainArea from "@/components/layout/MainArea";
import CustomFab from "@/components/common/button/CustomFab";
import TodoListHeader from "@/components/common/header/TodoListHeader";
import { subscribeToTasks, addTodo } from "@/services/todoService";
import TodoList from "@/components/features/todo/list/TodoList";
import { ToDo } from "@/types/interface";
import useAuth from "@/hooks/useAuth";
import { useThemeDisplayColor } from "@/hooks/useThemeColor";
import { logger } from "@/utils/logger";

export default function TodoListScreen() {
  const [data, setData] = useState<ToDo[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [shouldScrollToEnd, setShouldScrollToEnd] = useState(false);
  const { user } = useAuth();
  const { displayBackground } = useThemeDisplayColor();
  const scrollRef = useRef<ScrollView>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const unsubscribe = subscribeToTasks(user.id, setData);
    return unsubscribe;
  }, [user?.id]);

  const handleAddTodo = useCallback(async () => {
    if (!user?.id) {
      return;
    }

    const userId = user.id;
    const nextUserIds = Array.from(new Set([...userIds, userId]));
    setUserIds(nextUserIds);
    const newTodo = {
      text: "",
      userIds: nextUserIds,
      done: false,
    };

    try {
      const addedTodoId = await addTodo(
        newTodo.text,
        newTodo.userIds,
        newTodo.done
      );

      if (addedTodoId) {
        setData((prevData) => {
          if (prevData.some((todo) => todo.id === addedTodoId)) return prevData;
          // 新しい Todo を配列の最後に追加
          return [...prevData, { ...newTodo, id: addedTodoId }];
        });
        setEditingItemId(addedTodoId);
        setShouldScrollToEnd(true);
      }
    } catch (error) {
      logger.error("Failed to add todo:", error);
    }
  }, [user?.id, userIds]);

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    const showSub = Keyboard.addListener(showEvent, (event) => {
      setIsKeyboardVisible(true);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      setIsKeyboardVisible(false);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    if (!shouldScrollToEnd) return;
    const timer = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
      setShouldScrollToEnd(false);
    }, 80);
    return () => clearTimeout(timer);
  }, [shouldScrollToEnd, data.length, isKeyboardVisible]);

  const handleRemoveTodo = useCallback((todoId: string) => {
    setData((prev) => prev.filter((t) => t.id !== todoId));
  }, []);

  const handleFinishEditing = () => {
    setEditingItemId(null);
  };

  const handlePressLabel = (itemId: string) => {
    setEditingItemId(itemId);
    setShouldScrollToEnd(false);
  };

  return (
    <DisplayView header={<TodoListHeader />}>
      <View style={{ flex: 1, backgroundColor: displayBackground }}>
        <ScrollView
          ref={scrollRef}
          style={{ backgroundColor: displayBackground }}
          automaticallyAdjustKeyboardInsets={Platform.OS === "ios"}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: isKeyboardVisible ? 24 : 220,
            backgroundColor: displayBackground,
          }}
        >
          <MainArea>
            <TodoList
              data={data}
              editingItemId={editingItemId}
              onFinishEditing={handleFinishEditing}
              onPressLabel={handlePressLabel}
              onRemove={handleRemoveTodo}
            />
          </MainArea>
        </ScrollView>
      </View>

      {!isKeyboardVisible && editingItemId === null && (
        <CustomFab
          icon="plus"
          onPress={handleAddTodo}
          iconType="MaterialCommunityIcons"
        />
      )}
    </DisplayView>
  );
}
