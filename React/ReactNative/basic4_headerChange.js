import * as React from "react";
import { View, Text, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={
          () =>
            navigation.navigate("Profile", { name: "Custom profile header" })
          // 1. 클릭, Profile 페이지 + {name} param 전달
        }
      />
      <Button
        title="Let's update the Title"
        onPress={() => {
          // title option 변경
          navigation.setOptions({ title: "Updated Complete!" });
        }}
      />
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function LogoTitle() {
  return <Image style={{ width: 50, height: 50 }} />;
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      // ** header 스타일을 공유해야할때 Navigator에 입력
      // screenOptions={{
      //   headerStyle: {
      //     backgroundColor: "blue",
      //   },
      //   headerTintColor: "#fff",
      //   headerTitleStyle: {
      //     fontWeight: "bold",
      //   },
      //  ** 헤더에 이미지 등으로 대체
      //   headerTitle: props =? <LogoTitle />
      // }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "My home",
            // header style
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ route }) => ({ title: route.params.name })}
          // 2. param을 (route)로 받아서 title 로 입력
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
