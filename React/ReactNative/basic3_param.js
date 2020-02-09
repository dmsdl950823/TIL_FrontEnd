import * as React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen({ navigation }) {
  return (
    <View style={[styles.basic, styles.border]}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate("Details", {
            itemOd: 86,
            otherParam: "anything you want here",
            // 1. Detalis 루트 이동시  param 함께 전달
          })
        }
      />
    </View>
  );
}

const Stack = createStackNavigator();

function DetailScreen({ route, navigation }) {
  // 2, 4. route param 전달 받음
  const { itemId } = route.params;
  const { otherParam } = route.params;
  return (
    <View style={[styles.basic, styles.border]}>
      {/* 전달받은 param 텍스트 표시 */}
      <Text>Detail Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>itemId: {JSON.stringify(otherParam)}</Text>

      <Button
        title="Go to Details...again"
        onPress={() =>
          navigation.push("Details", {
            // 3.클릭시 param 전달
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button
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
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          initialParams={{ itemId: 42 }}
          // route시 param을 안주었다면 초기 값 정해서 보낼 수 있음. 전달된 경우 덮어씌워줌
        />
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
