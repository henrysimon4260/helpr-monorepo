import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function Layout() {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="landing" />
      </Stack>
    </>
  );
}