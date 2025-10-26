/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/login/LoginScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* Pantalla inicial: Login */}
      <LoginScreen
        onLogin={(creds) => {
          // Manejar login: reemplaza con navegación o lógica real
          console.log('Login credentials:', creds);
        }}
      />
    </SafeAreaProvider>
  );
}



export default App;
