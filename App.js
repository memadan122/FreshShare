import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, fontWeight } from './src/constants/theme';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FreshShare</Text>
      <Text style={styles.tagline}>Save food. Save money.</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontSize: fontSize.logo,
    fontWeight: fontWeight.bold,
  },
  tagline: {
    color: colors.white,
    fontSize: fontSize.heading,
    marginTop: 8,
  },
});
