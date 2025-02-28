import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';


import InitialScreen from '../screens/InitialScreen';
import WelcomeScreen from '~/screens/WelcomeScreen';


const Stack = createStackNavigator<RootStackParamList>();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="InitialScreen"
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="InitialScreen" component={InitialScreen} />
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
