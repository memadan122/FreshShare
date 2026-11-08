import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize } from '../constants/theme';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // go to onboarding after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.center}>
        <View style={styles.logoBox}>
          <Ionicons name="leaf-outline" size={56} color={colors.primary} />
        </View>
        <Text style={styles.title}>FreshShare</Text>
        <Text style={styles.tagline}>Save food. Save money.</Text>
      </View>

      <View style={styles.footer}>
        <Ionicons name="leaf-outline" size={16} color={colors.white} />
        <Text style={styles.footerText}>Good food deserves a second chance.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBox: {
    width: 112,
    height: 112,
    borderRadius: 32,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    color: colors.white,
    fontSize: fontSize.logo,
    fontWeight: '700',
  },
  tagline: {
    color: colors.white,
    fontSize: fontSize.heading,
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingBottom: 48,
  },
  footerText: {
    color: colors.white,
    fontSize: fontSize.body,
  },
});
