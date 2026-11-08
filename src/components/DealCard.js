import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, radius } from '../constants/theme';
import { getDiscount } from '../data/deals';

export default function DealCard({ deal, onPress }) {
  const [liked, setLiked] = useState(false);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View>
        <Image source={deal.image} style={styles.image} />

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{getDiscount(deal)}% off</Text>
        </View>

        <TouchableOpacity style={styles.heart} onPress={() => setLiked(!liked)}>
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.shop}>{deal.shop}</Text>
          <Text style={styles.muted}>{deal.distance}</Text>
        </View>

        <Text style={[styles.muted, styles.title]}>
          {deal.title} · {deal.bagsLeft} left
        </Text>

        <View style={styles.row}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${deal.price.toFixed(2)}</Text>
            <Text style={styles.oldPrice}>${deal.originalPrice.toFixed(2)}</Text>
          </View>

          <View style={styles.timeRow}>
            <Ionicons name="time-outline" size={16} color={colors.textMuted} />
            <Text style={styles.muted}>{deal.pickupTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 140,
  },
  badge: {
    position: 'absolute',
    top: 14,
    left: 14,
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
  heart: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shop: {
    fontSize: fontSize.heading - 2,
    fontWeight: '700',
    color: colors.text,
  },
  title: {
    marginTop: 4,
    marginBottom: 8,
  },
  muted: {
    fontSize: fontSize.small + 1,
    color: colors.textMuted,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  oldPrice: {
    fontSize: fontSize.body,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
