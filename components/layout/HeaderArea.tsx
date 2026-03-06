import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VStack } from 'native-base'

interface HeaderAreaProps {
    children: ReactNode;
}
  
const HeaderArea: React.FC<HeaderAreaProps> = ({ children　}) => {
  return (
    <SafeAreaView
      edges={['top']}
    >
      <VStack
        px="3"
        pb="1"
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        {children}
      </VStack>
    </SafeAreaView>
  )
}

export default HeaderArea
