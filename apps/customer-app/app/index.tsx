import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router'; // For navigation

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
    }).start(() =>
      router.push('/landing')); // Navigate to landing screen after 2 seconds
    }, 1500); // 1500ms + 500ms wait = 2 seconds total
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [router,fadeAnim]);

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