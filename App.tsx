import React from 'react';
import { StatusBar, useColorScheme} from 'react-native';
import {Provider} from "react-redux"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from 'pages/Landing';
import SignUp from 'pages/SignUp';
import store from 'util/redux/store';

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator initialRouteName="SignUp" screenOptions={{headerShown: false}}>
          <Stack.Screen name="SignUp" component={SignUp}  />
          <Stack.Screen name="Landing" component={Landing}  />
        </Stack.Navigator>
      </NavigationContainer>
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
