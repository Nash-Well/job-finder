import HomeNavigation from './app/navigation/HomeNavigation';
import { NavigationContainer } from '@react-navigation/native';

import { useFonts } from 'expo-font';

export default function App() {
  const [ fonts ] = useFonts({
    'DMRegular': require('./assets/fonts/DMSans-Bold.ttf'),
    'DMMedium':  require('./assets/fonts/DMSans-Medium.ttf'),
    'DMBold':    require('./assets/fonts/DMSans-Regular.ttf')
  })
  
  return fonts && (
    <NavigationContainer>
      <HomeNavigation/>
    </NavigationContainer>
  );
}
