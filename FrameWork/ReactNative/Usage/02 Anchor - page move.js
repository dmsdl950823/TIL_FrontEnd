import * as React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen({ navigation }) {
  // 그냥 평범한 화면
  return (
    <View style={[styles.basic, styles.border]}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
        // <a href="..">버튼</a>
      />
    </View>
    // navigation 변수: Screen에 prop 전달
    // navigate('') : ''의 이름의 루트로 이동(Screen name="" 이름과 같아야함)
  );
}

const Stack = createStackNavigator();

function DetailScreen({ navigation }) {
  return (
    <View style={[styles.basic, styles.border]}>
      <Text>Detail Screen</Text>
      <Button
        title="Got to Details...again"
        // onPress={() => navigation.navigate("Details")} // : 이미 Details 페이지에 있으면 활동 X
        onPress={() => navigation.push("Details")} // : 계속 같은 페이지 새로 로드
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button // stack에쌓여있는 제일 첫번째 스크린으로 이동
        title="Go Back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
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
