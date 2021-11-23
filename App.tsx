import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, useColorScheme} from 'react-native';
import {Provider} from "react-redux"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from 'pages/Landing';
import SignUp from 'pages/SignUp';
import store from 'util/redux/store';
import LoginPage from 'pages/Login';
import ProfilePage from 'pages/Profile';
import FindProducts from 'pages/FindProducts';
import CartPage from 'pages/Cart';
import PostProductPage from 'pages/PostProduct';
import ProductDetailPage from 'pages/ProductDetail';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Stack.Navigator initialRouteName="Landing" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="AddProduct" component={PostProductPage} />
            <Stack.Screen name="Profile" component={ProfilePage} />
            <Stack.Screen name="Search" component={FindProducts} />
            <Stack.Screen name="Cart" component={CartPage} />
            <Stack.Screen name="ProductDetail" component={ProductDetailPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
    // <SafeAreaView style={backgroundStyle}>
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <View />
    //   </ScrollView>
    // </SafeAreaView>
  );
};

export default App;
