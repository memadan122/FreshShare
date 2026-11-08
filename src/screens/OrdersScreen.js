import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../components/PrimaryButton';
import { activeOrders, pastOrders } from '../data/orders';
import { colors, fontSize, radius } from '../constants/theme';

export default function OrdersScreen({ navigation }) {
  const [tab, setTab] = useState('active');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Your orders</Text>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, tab === 'active' && styles.tabActive]}
            onPress={() => setTab('active')}
          >
            <Text style={[styles.tabText, tab === 'active' && styles.tabTextActive]}>
              Active ({activeOrders.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, tab === 'past' && styles.tabActive]}
            onPress={() => setTab('past')}
          >
            <Text style={[styles.tabText, tab === 'past' && styles.tabTextActive]}>Past</Text>
          </TouchableOpacity>
        </View>

        {tab === 'active' ? (
          <View>
            <Text style={styles.sectionLabel}>TODAY · SUNDAY, OCT 11</Text>

            {activeOrders.map((order) => (
              <View key={order.id} style={styles.card}>
                <View style={styles.orderRow}>
                  <Image source={order.thumbnail} style={styles.thumbnail} />
                  <View>
                    <Text style={styles.shop}>{order.shop}</Text>
                    <Text style={styles.muted}>
                      {order.quantity} × {order.item}
                    </Text>
                    <Text style={styles.small}>
                      {order.id} · Paid ${order.paid.toFixed(2)}
                    </Text>
                  </View>
                </View>

                <View style={styles.pickupRow}>
                  <View>
                    <Text style={styles.small}>PICK UP TODAY</Text>
                    <Text style={styles.time}>{order.pickupTime}</Text>
                  </View>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{order.status}</Text>
                  </View>
                </View>

                <PrimaryButton
                  title="Show pickup code"
                  icon="qr-code-outline"
                  onPress={() => navigation.navigate('Reserved', { dealId: order.dealId })}
                />
              </View>
            ))}

            <View style={styles.tip}>
              <Ionicons name="bag-handle-outline" size={22} color={colors.primary} />
              <Text style={styles.tipText}>
                Bring your own bag if you can. Little habits make a big difference.
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.sectionLabel}>RECENT RESCUES</Text>

            {pastOrders.map((order) => (
              <View key={order.id} style={styles.card}>
                <View style={styles.orderRow}>
                  <Image source={order.thumbnail} style={styles.thumbnail} />
                  <View>
                    <Text style={styles.shop}>{order.shop}</Text>
                    <Text style={styles.muted}>
                      {order.item} · ${order.paid.toFixed(2)}
                    </Text>
                    <Text style={styles.small}>
                      {order.date} · {order.pickupTime}
                    </Text>
                  </View>
                </View>

                <View style={styles.pastRow}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{order.status}</Text>
                  </View>
                  <Text style={styles.small}>{order.id}</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DealDetail', { dealId: order.dealId })}
                  >
                    <Text style={styles.link}>Buy again →</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View style={styles.tip}>
              <Ionicons name="leaf-outline" size={22} color={colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={styles.tipTitle}>12 meals rescued and counting</Text>
                <Text style={styles.tipText}>Thanks for giving good food a second chance.</Text>
              </View>
            </View>
          </View>
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
  title: {
    marginTop: 8,
    fontSize: fontSize.title,
    fontWeight: '700',
    color: colors.text,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#E5E9E4',
    borderRadius: radius.lg,
    padding: 5,
    marginTop: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.card,
  },
  tabText: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.textMuted,
  },
  tabTextActive: {
    color: colors.primaryDark,
  },
  sectionLabel: {
    marginTop: 22,
    marginBottom: 12,
    fontSize: fontSize.label,
    fontWeight: '600',
    color: colors.textMuted,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 14,
  },
  orderRow: {
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
    fontSize: fontSize.label,
    color: colors.textMuted,
    marginTop: 4,
  },
  small: {
    fontSize: fontSize.small,
    color: colors.textMuted,
    marginTop: 4,
  },
  pickupRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 14,
  },
  time: {
    fontSize: fontSize.body + 1,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  badge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  badgeText: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.primaryDark,
  },
  pastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  link: {
    fontSize: fontSize.label,
    fontWeight: '600',
    color: colors.primary,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: 16,
    marginTop: 4,
  },
  tipTitle: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.primaryDark,
  },
  tipText: {
    flex: 1,
    fontSize: fontSize.small + 1,
    color: colors.primaryDark,
    lineHeight: 20,
  },
});
