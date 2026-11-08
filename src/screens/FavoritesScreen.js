import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { deals } from '../data/deals';
import { colors, fontSize, radius } from '../constants/theme';

export default function FavoritesScreen({ navigation }) {
  // start with the first three shops saved
  const [favorites, setFavorites] = useState(deals.slice(0, 3));

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Your favorites</Text>
          <TouchableOpacity
            onPress={() => Alert.alert('Edit favorites', 'Tap the heart on a shop to remove it.')}
          >
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>
          Your go-to spots, all in one place. {favorites.length} saved shops with fresh deals today.
        </Text>

        {favorites.map((deal) => (
          <TouchableOpacity
            key={deal.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('DealDetail', { dealId: deal.id })}
          >
            <Image source={deal.thumbnail} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.shop}>{deal.shop}</Text>
              <Text style={styles.muted}>
                ★ {deal.rating} · {deal.distance}
              </Text>

              <View style={styles.priceRow}>
                <Text style={styles.price}>${deal.price.toFixed(2)}</Text>
                <Text style={styles.oldPrice}>${deal.originalPrice.toFixed(2)}</Text>
              </View>

              <Text style={styles.muted}>Pickup {deal.pickupTime}</Text>
              <Text style={styles.bags}>{deal.bagsLeft} bags today</Text>
            </View>

            <TouchableOpacity onPress={() => removeFavorite(deal.id)}>
              <Ionicons name="heart" size={24} color={colors.primary} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        {favorites.length === 0 && (
          <Text style={styles.empty}>No favorites yet. Tap the heart on a deal to save it.</Text>
        )}

        <View style={styles.banner}>
          <Ionicons name="notifications-outline" size={24} color={colors.primary} />
          <View>
            <Text style={styles.bannerTitle}>Never miss a fresh drop</Text>
            <Text style={styles.bannerText}>Turn on deal alerts in Settings.</Text>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  title: {
    fontSize: fontSize.title,
    fontWeight: '700',
    color: colors.text,
  },
  edit: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.primary,
  },
  subtitle: {
    marginTop: 16,
    marginBottom: 20,
    fontSize: fontSize.body,
    lineHeight: 24,
    color: colors.textMuted,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 14,
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: radius.md,
  },
  info: {
    flex: 1,
    marginLeft: 14,
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
    marginTop: 6,
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
  bags: {
    fontSize: fontSize.small + 1,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 4,
  },
  empty: {
    textAlign: 'center',
    color: colors.textMuted,
    marginVertical: 24,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: 18,
    marginTop: 4,
  },
  bannerTitle: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.primaryDark,
  },
  bannerText: {
    fontSize: fontSize.small + 1,
    color: colors.primaryDark,
    marginTop: 2,
  },
});
