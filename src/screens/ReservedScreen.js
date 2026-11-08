import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { deals } from '../data/deals';
import { colors, fontSize, radius } from '../constants/theme';

export default function ReservedScreen({ navigation, route }) {
  const { dealId } = route.params;
  const deal = deals.find((item) => item.id === dealId);

  // simple order code for the demo
  const orderCode = 'FS-10482';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.tickCircle}>
          <Ionicons name="checkmark" size={48} color={colors.primary} />
        </View>

        <Text style={styles.title}>Your bag is reserved!</Text>
        <Text style={styles.subtitle}>Good food saved. A little win for the planet.</Text>

        <View style={styles.card}>
          <View style={styles.orderRow}>
            <Image source={deal.thumbnail} style={styles.thumbnail} />
            <View>
              <Text style={styles.shop}>{deal.shop}</Text>
              <Text style={styles.muted}>1 × {deal.title}</Text>
              <Text style={styles.paid}>Paid ${deal.price.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.qrBox}>
            <Ionicons name="qr-code" size={170} color={colors.text} />
            <Text style={styles.code}>{orderCode}</Text>
            <Text style={styles.muted}>Show this code at the counter</Text>
          </View>

          <View style={styles.pickupBox}>
            <Text style={styles.pickupTime}>Today · {deal.pickupTime}</Text>
            <Text style={styles.pickupAddress}>{deal.address}</Text>
          </View>
        </View>

        <PrimaryButton
          title="View orders"
          onPress={() => navigation.navigate('Main', { screen: 'Orders' })}
          style={styles.button}
        />
        <SecondaryButton
          title="Go home"
          onPress={() => navigation.navigate('Main', { screen: 'Home' })}
          style={styles.button}
        />
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
    alignItems: 'center',
  },
  tickCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    marginTop: 8,
    fontSize: fontSize.body,
    color: colors.textMuted,
  },
  card: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginTop: 24,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
  },
  shop: {
    fontSize: fontSize.heading - 2,
    fontWeight: '700',
    color: colors.text,
  },
  muted: {
    fontSize: fontSize.small + 1,
    color: colors.textMuted,
    marginTop: 2,
  },
  paid: {
    fontSize: fontSize.label,
    fontWeight: '600',
    color: colors.primaryDark,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  qrBox: {
    alignItems: 'center',
  },
  code: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  pickupBox: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: 14,
    marginTop: 16,
  },
  pickupTime: {
    fontSize: fontSize.body,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  pickupAddress: {
    fontSize: fontSize.small + 1,
    color: colors.primaryDark,
    marginTop: 4,
  },
  button: {
    width: '100%',
    marginTop: 14,
  },
});
