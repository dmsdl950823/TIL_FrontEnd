import * as React from "react";
import { Button, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function LogoTitle() {
  return <Text>로고로고</Text>;
}

function HomeScreen({ navigation }) {
  const [count, setCount] = React.useState(0);

  // 2. 옵션 변경
  navigation.setOptions({
    headerRight: () => (
      <Button onPress={() => setCount(c => c + 1)} title="Update count" />
    ),
  });

  return <Text>Count: {count}</Text>;
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen} // 1. 초기 요소 호출
          options={({ navigation, route }) => ({
            headerTitle: props => <LogoTitle {...props} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // *** Navigator 안에 navigator 또 호출 가능
  );
}

export default App;
