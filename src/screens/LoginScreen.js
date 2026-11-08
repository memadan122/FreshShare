import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { colors, fontSize, radius } from '../constants/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Missing details', 'Please enter your email and password.');
      return;
    }
    navigation.replace('Main');
  };

  const comingSoon = () => {
    Alert.alert('Coming soon', 'This feature is not ready yet.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Logo size={30} />

        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Your next delicious rescue is waiting.</Text>

        <InputField
          label="Email address"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
        />

        <InputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secure
        />

        <TouchableOpacity style={styles.forgot} onPress={comingSoon}>
          <Text style={styles.link}>Forgot password?</Text>
        </TouchableOpacity>

        <PrimaryButton title="Log in" onPress={handleLogin} />

        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.muted}>or continue with</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialRow}>
          <SecondaryButton title="Google" icon="logo-google" onPress={comingSoon} style={styles.socialButton} />
          <SecondaryButton title="Apple" icon="logo-apple" onPress={comingSoon} style={styles.socialButton} />
        </View>

        <View style={styles.signupRow}>
          <Text style={styles.muted}>New to FreshShare? </Text>
          <TouchableOpacity onPress={comingSoon}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.banner}>
          <Ionicons name="leaf-outline" size={24} color={colors.primary} />
          <View>
            <Text style={styles.bannerTitle}>Small saves. Real impact.</Text>
            <Text style={styles.muted}>Join your neighborhood in wasting less.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingTop: 24,
  },
  title: {
    marginTop: 28,
    fontSize: fontSize.title,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 28,
    fontSize: fontSize.body,
    color: colors.textMuted,
  },
  forgot: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  link: {
    fontSize: fontSize.label,
    fontWeight: '600',
    color: colors.primary,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  muted: {
    fontSize: fontSize.small + 1,
    color: colors.textMuted,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: 18,
    marginTop: 40,
  },
  bannerTitle: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
});
