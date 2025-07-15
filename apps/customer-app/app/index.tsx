import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useRouter } from 'expo-router'; // For navigation

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/landing'); // Navigate to landing screen after 2 seconds
    }, 2000); // 2000ms = 2 seconds
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} /> {/* Hides the status bar to match the screenshot */}
      <Text style={styles.logo}>helpr</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C4309', // Dark green from the screenshot
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 72, // Matches the large text size in the screenshot
    color: '#FFFFFF', // White text
    fontWeight: 'bold',
  },
});