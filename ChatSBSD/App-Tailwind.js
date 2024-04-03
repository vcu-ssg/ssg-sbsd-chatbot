import React from 'react';
import { withExpoSnack } from 'nativewind';

import { Text, View } from 'react-native';
import { styled } from 'nativewind';

import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const StyledView = styled(View)
const StyledText = styled(Text)

// const App = () => {
//   return (
//     <StyledView className="flex-1 items-center justify-center bg-red-100">
//       <StyledText className="text-slate-800 text-lg font-bold">
//         Try editing me! 🎉
//       </StyledText>
//     </StyledView>
//   );
// }

const App2 = () => {
  return (
    <View className="flex-1 items-center justify-center bg-red-100">
      <Text className="text-slate-800 text-xl font-bold">
        One text line
      </Text>
      <Text className="text-blue-900 text-sm">
        One text line
      </Text>
    </View>
  );

}

// This demo is using a external compiler that will only work in Expo Snacks.
// You may see flashes of unstyled content, this will not occur under normal use!
// Please see the documentation to setup your application

//export default withExpoSnack(App);
export default App2;


