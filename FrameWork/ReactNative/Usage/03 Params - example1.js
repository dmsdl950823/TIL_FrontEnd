import * as React from "react";
import { Text, TextInput, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen({ navigation, route }) {
  // 전달받은 route param
  // 현재 페이지의 정보를 param으로 전달받을 수 있음
  React.useEffect(() => {
    if (route.params?.post) {
      // post updated되면, route.params.post로 일을하라...
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Create post"
        onPress={() => navigation.navigate("CreatePost")}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      {/* 1. Craete Post 버튼 클릭 */}
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState("");

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // 입력된 parm을 home으로 전달 
          navigation.navigate("Home", { post: postText });
        }}
      />
    </>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        {/* 2. 페이지 route 이동, */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
