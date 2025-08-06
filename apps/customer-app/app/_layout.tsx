import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >  
    <Stack.Screen name="index" options={{ animation: 'none' }} />
    <Stack.Screen name="landing" options={{ animation: 'none' }} />
    <Stack.Screen name="moving" options={{ animation: 'fade' , animationDuration: 100}} />
    <Stack.Screen name="cleaning" options={{ animation: 'fade' , animationDuration: 100}} />
    <Stack.Screen name="furniture-assembly" options={{ animation: 'fade',animationDuration: 100}} />
    <Stack.Screen name="home-improvement" options={{ animation: 'fade' , animationDuration: 100}} />
    <Stack.Screen name="running-errands" options={{ animation: 'fade' , animationDuration: 100}} />
    <Stack.Screen name="wall-mounting" options={{ animation: 'fade' , animationDuration: 100}} />
    <Stack.Screen name="booked-services" options={{ animation: 'fade' , animationDuration: 100}} />
    <Stack.Screen name="past-services" options={{ animation: 'fade' , animationDuration: 100}} />
    <Stack.Screen name="contact-support" options={{ animation: 'fade' , animationDuration: 100}} />
    <Stack.Screen name="user-guide" options={{ animation: 'fade' , animationDuration: 100}} />
    </Stack>
  );
}