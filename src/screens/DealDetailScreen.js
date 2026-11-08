import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../components/PrimaryButton';
import { deals, getDiscount } from '../data/deals';
import { colors, fontSize, radius } from '../constants/theme';

export default function DealDetailScreen({ navigation, route }) {
  const { dealId } = route.params;
  const deal = deals.find((item) => item.id === dealId);
  const [liked, setLiked] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <Image source={deal.largeImage} style={styles.image} />

          <TouchableOpacity style={[styles.circleButton, styles.backButton]} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.circleButton, styles.heartButton]} onPress={() => setLiked(!liked)}>
            <Ionicons name={liked ? 'heart' : 'heart-outline'} size={24} color={colors.primary} />
          </TouchableOpacity>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {getDiscount(deal)}% off · {deal.bagsLeft} bags left
            </Text>
          </View>
        </View>

        <Text style={styles.shop}>{deal.shop}</Text>
        <Text style={styles.title}>{deal.title}</Text>

        <View style={styles.row}>
          <Ionicons name="star-outline" size={18} color="#F08A3C" />
          <Text style={styles.rating}>
            {deal.rating} ({deal.reviews})
          </Text>
          <Text style={styles.muted}>
            · {deal.distance} · {deal.category}
          </Text>
        </View>

        <View style={[styles.row, { marginTop: 8 }]}>
          <Ionicons name="location-outline" size={18} color={colors.primary} />
          <Text style={styles.muted}>{deal.address}</Text>
        </View>

        <Text style={styles.heading}>{deal.heading}</Text>
        <Text style={styles.description}>{deal.description}</Text>

        <View style={styles.pickupBox}>
          <Ionicons name="time-outline" size={30} color={colors.primary} />
          <View>
            <Text style={styles.pickupLabel}>PICK UP TODAY</Text>
            <Text style={styles.pickupTime}>{deal.pickupTime}</Text>
            <Text style={styles.pickupNote}>Show your QR code at the counter.</Text>
          </View>
        </View>

        <View style={styles.allergyRow}>
          <Ionicons name="information-circle-outline" size={20} color={colors.textMuted} />
          <Text style={styles.allergyText}>{deal.allergens}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${deal.price.toFixed(2)}</Text>
            <Text style={styles.oldPrice}>${deal.originalPrice.toFixed(2)}</Text>
          </View>
          <Text style={styles.muted}>per surprise bag</Text>
        </View>

        <PrimaryButton
          title="Reserve"
          style={styles.reserveButton}
          onPress={() => navigation.navigate('Reserved', { dealId: deal.id })}
        />
      </View>
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
    paddingBottom: 32,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: radius.xl,
  },
  circleButton: {
    position: 'absolute',
    top: 14,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    left: 14,
  },
  heartButton: {
    right: 14,
  },
  badge: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    backgroundColor: colors.accentLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  badgeText: {
    color: colors.accent,
    fontSize: fontSize.small,
    fontWeight: '600',
  },
  shop: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: '700',
    color: colors.text,
  },
  title: {
    marginTop: 6,
    marginBottom: 10,
    fontSize: fontSize.heading,
    color: colors.textMuted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rating: {
    fontSize: fontSize.label,
    fontWeight: '600',
    color: colors.text,
  },
  muted: {
    fontSize: fontSize.label,
    color: colors.textMuted,
  },
  heading: {
    marginTop: 24,
    fontSize: fontSize.heading,
    fontWeight: '700',
    color: colors.text,
  },
  description: {
    marginTop: 8,
    fontSize: fontSize.body,
    lineHeight: 24,
    color: colors.textMuted,
  },
  pickupBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: 18,
    marginTop: 20,
  },
  pickupLabel: {
    fontSize: fontSize.small,
    color: colors.primaryDark,
  },
  pickupTime: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primaryDark,
    marginVertical: 4,
  },
  pickupNote: {
    fontSize: fontSize.small + 1,
    color: colors.primaryDark,
  },
  allergyRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 18,
  },
  allergyText: {
    flex: 1,
    fontSize: fontSize.small + 1,
    color: colors.textMuted,
    lineHeight: 20,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  oldPrice: {
    fontSize: fontSize.body,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  reserveButton: {
    width: 170,
  },
});
