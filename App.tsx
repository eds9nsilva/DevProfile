import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './src/pages/Home';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { Signin } from './src/pages/Signin';
import { SignUp } from './src/pages/SignUp';

const App: React.FunctionComponent = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <SignUp />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
