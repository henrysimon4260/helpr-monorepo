import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >  
    <Stack.Screen name="landing" options={{ animation: 'fade' }} />
    </Stack>
  );
}