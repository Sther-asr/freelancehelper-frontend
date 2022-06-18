import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import NavegadorStack from './components/navigator/Stack';

export default function App() {
  return (
    <NavigationContainer>
      <NavegadorStack/>
    </NavigationContainer>
  );
}
