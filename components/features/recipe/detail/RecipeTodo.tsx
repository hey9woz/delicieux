import React, { useCallback, useState } from "react";
import { addTodo } from "@/services/todoService";
import {
  useToast,
  HStack,
  Input,
  Icon,
  Text,
  IconButton,
  VStack,
} from "native-base";
import {
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import useAuth from "@/hooks/useAuth";
import Ripple from "react-native-material-ripple";

type Props = {
  iconColor: string;
  btnTextColor: string;
  btnBorderColor: string;
  linkColor: string;
}

const RecipeTodo = ({
  iconColor,
  btnTextColor,
  btnBorderColor,
  linkColor
}:Props) => {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [userIds, setUserIds] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const toast = useToast();

  const handleSaveTodo = useCallback(async () => {
    if (!user?.id) {
      return;
    }
    const userId = user.id;
    const nextUserIds = Array.from(new Set([...userIds, userId]));
    setUserIds(nextUserIds);
    const newTodo = {
      text: text,
      userIds: nextUserIds,
      done: false,
    };

    try {
      await addTodo(
        newTodo.text,
        newTodo.userIds,
        newTodo.done
      );
	      setIsVisible(false);
	      toast.show({
	        description: "Added.",
	        colorScheme: "success",
	        duration: 3000,
	      });
	    } catch (error) {
	      console.error("Failed to save todo:", error);
	      toast.show({
	        description: "Failed to save todo.",
	        colorScheme: "error",
	        duration: 3000,
	      });
	    }
	  }, [text, toast, user?.id, userIds]);

  return (
    <>
      {isVisible ? (
        <VStack alignItems="center">
          <Input
            placeholder="Todo"
            width="85%"
            px="0"
            fontSize="sm"
            onChangeText={setText}
            InputLeftElement={
              <Icon
                ml="3"
                mr="3"
                size="md"
                color={iconColor}
                as={
                  <MaterialCommunityIcons name="checkbox-marked-circle-plus-outline" />
                }
              />
            }
          />
          <HStack alignItems="center" space={5}>
            <IconButton
              marginTop={2}
              size="md"
              variant="outline"
              color={btnTextColor}
              borderColor={btnBorderColor}
              icon={<Icon color={iconColor} as={AntDesign} name="plus" />}
              onPress={handleSaveTodo}
            />
            <IconButton
              marginTop={2}
              size="md"
              variant="outline"
              color={btnTextColor}
              borderColor={btnBorderColor}
              icon={
                <Icon color={iconColor} as={MaterialCommunityIcons} name="close" />
              }
              onPress={toggleVisibility}
            />
          </HStack>
        </VStack>
      ) : (
        <HStack alignItems="center" space={2}>
          <Icon
            background="transparent"
            as={MaterialCommunityIcons}
            name="checkbox-marked-circle-plus-outline"
            color={iconColor}
            size="lg"
          />
          <Ripple
            rippleColor={iconColor}
            rippleCentered={true}
            onPress={toggleVisibility}
          >
	            <Text color={linkColor} fontSize="md">
	              Add Todo
	            </Text>
	          </Ripple>
	        </HStack>
	      )}
	    </>
	  );
};

export default RecipeTodo;
