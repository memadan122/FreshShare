import { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DealCard from '../components/DealCard';
import { deals, categories } from '../data/deals';
import { user } from '../data/user';
import { colors, fontSize, radius } from '../constants/theme';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // filter deals by the selected chip and the search text
  const filteredDeals = deals.filter((deal) => {
    const matchesCategory = category === 'All' || deal.category === category;
    const text = search.toLowerCase();
    const matchesSearch =
      deal.shop.toLowerCase().includes(text) || deal.title.toLowerCase().includes(text);
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <View style={styles.greetingRow}>
              <Text style={styles.greeting}>Hello, {user.firstName}</Text>
              <Ionicons name="sunny-outline" size={28} color={colors.text} />
            </View>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={18} color={colors.primary} />
              <Text style={styles.location}>{user.location}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.bell}
            onPress={() => Alert.alert('Notifications', 'You have no new notifications.')}
          >
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={22} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search food or shops"
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          <Ionicons name="options-outline" size={22} color={colors.primary} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.chip, category === item && styles.chipActive]}
              onPress={() => setCategory(item)}
            >
              <Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Fresh finds near you</Text>
          <Text style={styles.count}>{filteredDeals.length} deals</Text>
        </View>

        {filteredDeals.map((deal) => (
          <DealCard
            key={deal.id}
            deal={deal}
            onPress={() => navigation.navigate('DealDetail', { dealId: deal.id })}
          />
        ))}

        {filteredDeals.length === 0 && (
          <Text style={styles.empty}>No deals found. Try another search or category.</Text>
        )}
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
    alignItems: 'flex-start',
    marginTop: 8,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  greeting: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.text,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  location: {
    fontSize: fontSize.body,
    color: colors.text,
  },
  bell: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: 14,
    height: 54,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.body,
    color: colors.text,
  },
  chips: {
    marginTop: 14,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: fontSize.label,
    color: colors.text,
  },
  chipTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  count: {
    fontSize: fontSize.label,
    color: colors.primary,
  },
  empty: {
    textAlign: 'center',
    color: colors.textMuted,
    marginTop: 24,
  },
});
