import React, { useEffect, useRef } from 'react';
import { Text, Animated, Easing, StatusBar, StyleSheet } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import * as SplashScreenModule from 'expo-splash-screen'; // Renamed import to avoid conflict

export default function SplashComponent() { // Renamed from SplashScreen to SplashComponent
  const router = useRouter();
  const navigation = useNavigation<NavigationProp<any>>();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Prevent auto-hiding of the splash screen
    SplashScreenModule.preventAutoHideAsync().catch(console.warn);
      
    navigation.setOptions({
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 0 } }, // No open animation
              close: { animation: 'timing', config: { duration: 0 } }, // No close animation
            },
            cardStyleInterpolator: ({ current }: { current: { progress: { value: number } } }) => ({
              cardStyle: {
                opacity: current.progress.value, // Fade effect
              },
            }),
          });

   const timer = setTimeout(async () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(async () => {
        try {
          await SplashScreenModule.hideAsync();
          // Add a small delay to ensure transition is applied
          setTimeout(() => {
            router.push('/landing'); // Navigate after fade and delay
          }, 50); // 100ms delay
        } catch (error) {
          console.error('Error hiding splash screen:', error);
          router.push('/landing'); // Fallback navigation
        }
      });
    }, 1500); // Start fade after 1.5 seconds
    return () => clearTimeout(timer);
  }, [router, fadeAnim, navigation]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim}]}>
      <StatusBar hidden={true} />{/* Hides the status bar to match the screenshot */} 
      <Text style={styles.logo}>helpr</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c4309ff', // Dark green from the screenshot
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 72, // Matches the large text size in the screenshot
    color: '#FFFFFF', // White text
    fontWeight: 'bold',
  },
});