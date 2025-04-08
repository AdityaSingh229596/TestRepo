
import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen, { PostDataTypes } from './src/screens/HomeScreen/HomeScreen'
import PostDetailScreen from './src/screens/PostDetailScreen/PostDetailScreen'

export type RootStackNavigation = {
  Home: undefined,
  PostDetail: {
    postId: number
  },
}

const App = () => {
    
  const Stack= createNativeStackNavigator<RootStackNavigation>()

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name={'Home'} component={HomeScreen}/>
        <Stack.Screen name={'PostDetail'} options={{headerShown:true}} component={PostDetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

