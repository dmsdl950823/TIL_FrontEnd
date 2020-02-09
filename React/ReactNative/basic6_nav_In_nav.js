import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function SettingsScreen({ navigation }) {
  // 2. First(Setting) 화면에 표시됨
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings Screen</Text>
      <Button // 3. 클릭시 "Profile" 이동
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
}

function ProfileScreen({ navigation }) {
  // 5. Profile 페이지 랜더링
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
        // 6. 다시 2.(Setting) 으로 이동.
      />
    </View>
  );
}

function HomeScreen({ navigation }) {
  // 3. Home 화면 랜더링
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
        // 4. Detail 페이지 이동 버튼 클릭('name: "Details"')
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  // 6. Detail 화면 랜더링
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Details")}
      />
    </View>
  );
}

// 하단에 탭2개 생성
const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();
const HomeStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="First">
          {/* 1. First 탭 클릭시, 특정(Tab) Stack 실행 */}
          {() => (
            <SettingsStack.Navigator>
              <SettingsStack.Screen
                name="Settings"
                component={SettingsScreen}
              />
              <SettingsStack.Screen
                name="Profile" // 4. ProfileScreen 페이지 전달
                component={ProfileScreen}
              />
            </SettingsStack.Navigator>
          )}
        </Tab.Screen>

        <Tab.Screen name="Second">
          {/* 1. Second 탭 클릭시, 특정(HomeStack) Stack 실행 */}
          {() => (
            <HomeStack.Navigator>
              <HomeStack.Screen
                // 2. Home 페이지 렌더링 시도
                name="Home"
                component={HomeScreen}
              />
              <HomeStack.Screen
                // 5. Detail 페이지 랜더링 시도
                name="Details"
                component={DetailsScreen}
              />
            </HomeStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
