import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';

// leaf icon + app name, shown at the top of onboarding and login
export default function Logo({ size = 28 }) {
  return (
    <View style={styles.row}>
      <Ionicons name="leaf-outline" size={size * 1.1} color={colors.primary} />
      <Text style={[styles.text, { fontSize: size }]}>FreshShare</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontWeight: '700',
    color: colors.text,
  },
});
