import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen() {
  // 그냥 평범한 화면
  return (
    <View style={[styles.basic, styles.border]}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function DetailScreen() {
  return (
    <View style={[styles.basic, styles.border]}>
      <Text>Detail Screen</Text>
    </View>
  );
}

function App() {
  return (
    // createStackNavigator() 는 프로퍼티 'Screen', 'Navigator'를 포함
    // Navigator : Screen요소 자식으로 포함
    // Screen att : options / screenOptions -> 뭘까?

    // NavigationContainer : navi tree, navi state 관리, 모든 navigator 구조를 감쌈
    // 보토 앱의 root서 렌더링 多 -> App.js

    <NavigationContainer>
      <Stack.Navigator>
        {/* route 설정 */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "overview" }}>
          {/* prop 전달 방법: 입력 ㄱ
          {props => <HomeScreen {...props} extraProps={"extraprops"} />} */}
        </Stack.Screen>
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  basic: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  border: {
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    backgroundColor: "pink",
  },
});
