import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fontSize, radius } from '../constants/theme';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fresh finds near you</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DealDetail')}>
        <Text style={styles.buttonText}>View deal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: fontSize.heading,
    fontWeight: '700',
    color: colors.text,
  },
  button: {
    marginTop: 24,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: radius.md,
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.body,
    fontWeight: '600',
  },
});
