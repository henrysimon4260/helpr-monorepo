import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />{/* Hides the status bar */}
      <Text style={styles.title}>Landing Screen</Text>
      <Text style={styles.subtitle}>Welcome to Helpr - Start Here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Placeholder white background
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A3C34', // Dark green text to match branding
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
});