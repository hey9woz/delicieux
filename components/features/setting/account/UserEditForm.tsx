import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { VStack, FormControl, Button, useToast } from "native-base";
import useAuth from "@/hooks/useAuth";
import { fetchUserByUserId } from "@/services/userService";
import { useThemeDisplayColor, useThemeBtnColor, useThemeTextColor } from "@/hooks/useThemeColor";
import { Keyboard } from 'react-native';
import { User } from "@/types/interface";
import EmailInput from "@/components/common/input/Email";
import DefaultInput from "@/components/common/input/Default";
import PasswordInput from "@/components/common/input/Password";

export default function UserEditForm() {
  const { updateUserData, user } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const {
    displayTextPrimaryColor,
    displayPlaceholderColor,
  } = useThemeDisplayColor();
  const { borderColor } = useThemeTextColor();

  const { btnTextColor, btnBackgroundColor } = useThemeBtnColor();

  useEffect(() => {
    const fetchUser = async (id: string) => {
      setIsLoading(true);
      try {
        const userData = await fetchUserByUserId(id);
        if(userData?.id){
          setUserData(userData);
        } else {
          setUserData(null);
          toast.show({
            description: "User data was not found.",
            // status: "success",
            duration: 3000,
          });
        }
      } catch (error) {
        toast.show({
          description: "An error occurred while fetching user data.",
          // status: "success",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if(user?.id){
      fetchUser(user.id);
    }
  }, [user?.id]);

  const handleUpdate = async () => {
    Keyboard.dismiss(); // キーボードを閉じる
    setIsLoading(true);
    try {
      if(user?.id){
        await updateUserData(user?.id, email, password, userName);
        toast.show({
          description: "User data updated successfully.",
          // status: "success",
          duration: 3000,
        });
      }else{
        throw Error;
      }
    } catch (error) {
      toast.show({
        description: "Failed to update user data.",
        // status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      scrollEnabled={true}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
      <VStack space={4} alignItems="center" mb="10">
        <FormControl>
          <FormControl.Label>Email: {userData?.email}</FormControl.Label>
          <EmailInput
            email={email}
            setEmail={setEmail}
            textColor={displayTextPrimaryColor}
            placeholderColor={displayPlaceholderColor}
            borderColor={borderColor}
          />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>Username: {userData?.userName}</FormControl.Label>
          <DefaultInput
            placeholder="Enter your new username"
            state={userName}
            setState={setUserName}
            textColor={displayTextPrimaryColor}
            placeholderColor={displayPlaceholderColor}
            borderColor={borderColor}
          />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>Password</FormControl.Label>
          <PasswordInput
            password={password}
            setPassword={setPassword}
            textColor={displayTextPrimaryColor}
            placeholderColor={displayPlaceholderColor}
            borderColor={borderColor}
          />
        </FormControl>
        <Button
          mt="5"
          bgColor={btnBackgroundColor}
          color={btnTextColor}
          isLoading={isLoading}
          onPress={handleUpdate}
        >
          Update Account
        </Button>
      </VStack>
    </KeyboardAwareScrollView>
  );
}
