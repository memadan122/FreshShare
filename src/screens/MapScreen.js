import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { deals } from '../data/deals';
import { user } from '../data/user';
import { colors, fontSize, radius } from '../constants/theme';

// positions of the streets drawn on the map (in %)
const roadsAcross = ['18%', '38%', '58%', '78%'];
const roadsDown = ['22%', '48%', '74%'];

export default function MapScreen({ navigation }) {
  const [selected, setSelected] = useState(deals[0]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Nearby map</Text>
        <Ionicons name="options-outline" size={26} color={colors.text} />
      </View>

      <View style={styles.map}>
        {/* simple drawn map, not a real map */}
        {roadsAcross.map((top) => (
          <View key={top} style={[styles.roadAcross, { top }]} />
        ))}
        {roadsDown.map((left) => (
          <View key={left} style={[styles.roadDown, { left }]} />
        ))}

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={22} color={colors.textMuted} />
          <Text style={styles.searchText}>{user.location}</Text>
          <Ionicons name="chevron-down" size={20} color={colors.text} />
        </View>

        {/* you are here */}
        <View style={styles.userDot}>
          <View style={styles.userDotInner} />
        </View>

        {deals.map((deal) => (
          <TouchableOpacity
            key={deal.id}
            style={[
              styles.pin,
              { top: deal.mapPosition.top, left: deal.mapPosition.left },
              selected.id === deal.id && styles.pinSelected,
            ]}
            onPress={() => setSelected(deal)}
          >
            <Ionicons name="bag-handle-outline" size={16} color={colors.white} />
            <Text style={styles.pinText}>${deal.price.toFixed(2)}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Image source={selected.thumbnail} style={styles.thumbnail} />
            <View style={{ flex: 1 }}>
              <Text style={styles.shop}>{selected.shop}</Text>
              <Text style={styles.muted}>
                ★ {selected.rating} · {selected.distance} · {selected.bagsLeft} bags left
              </Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>${selected.price.toFixed(2)}</Text>
                <Text style={styles.oldPrice}>${selected.originalPrice.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.muted}>Today · {selected.pickupTime}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('DealDetail', { dealId: selected.id })}>
              <Text style={styles.link}>View deal →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: fontSize.title,
    fontWeight: '700',
    color: colors.text,
  },
  map: {
    flex: 1,
    backgroundColor: '#E6E9E1',
    overflow: 'hidden',
  },
  roadAcross: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 22,
    backgroundColor: colors.white,
  },
  roadDown: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 22,
    backgroundColor: colors.white,
  },
  searchBox: {
    position: 'absolute',
    top: 14,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingHorizontal: 14,
    height: 52,
  },
  searchText: {
    flex: 1,
    fontSize: fontSize.body,
    color: colors.text,
  },
  userDot: {
    position: 'absolute',
    top: '44%',
    left: '46%',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(46, 158, 91, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDotInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.white,
  },
  pin: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.pill,
  },
  pinSelected: {
    backgroundColor: '#F08A3C',
  },
  pinText: {
    color: colors.white,
    fontSize: fontSize.label,
    fontWeight: '700',
  },
  card: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 14,
  },
  thumbnail: {
    width: 72,
    height: 72,
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
    marginTop: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 4,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  oldPrice: {
    fontSize: fontSize.label,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  link: {
    fontSize: fontSize.label,
    fontWeight: '600',
    color: colors.primary,
  },
});
