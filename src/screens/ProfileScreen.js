import { View, Text, ScrollView, TouchableOpacity, Alert, Linking, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { user, supportEmail } from '../data/user';
import { colors, fontSize, radius } from '../constants/theme';

export default function ProfileScreen({ navigation }) {
  // opens the phone's email app with the support address filled in
  const contactSupport = () => {
    Linking.openURL('mailto:' + supportEmail + '?subject=FreshShare%20help').catch(() => {
      Alert.alert('No email app', 'Please email us at ' + supportEmail);
    });
  };

  const comingSoon = () => {
    Alert.alert('Coming soon', 'This feature is not ready yet.');
  };

  const logOut = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: () => navigation.replace('Login') },
    ]);
  };

  const menu = [
    { title: 'Account details', icon: 'person-outline', onPress: comingSoon },
    { title: 'Payment methods', icon: 'card-outline', onPress: comingSoon },
    { title: 'Settings', icon: 'settings-outline', onPress: comingSoon },
    { title: 'Help & support', icon: 'help-circle-outline', onPress: contactSupport },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Your profile</Text>

        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.initials}</Text>
          </View>
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.since}>Food saver since {user.memberSince}</Text>
          </View>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsTitle}>Your little saves add up</Text>
            <Ionicons name="leaf-outline" size={24} color={colors.white} />
          </View>

          <View style={styles.statsRow}>
            <View>
              <Text style={styles.statNumber}>{user.stats.mealsSaved}</Text>
              <Text style={styles.statLabel}>meals saved</Text>
            </View>
            <View>
              <Text style={styles.statNumber}>{user.stats.moneySaved}</Text>
              <Text style={styles.statLabel}>money saved</Text>
            </View>
            <View>
              <Text style={styles.statNumber}>{user.stats.co2Avoided}</Text>
              <Text style={styles.statLabel}>CO₂ avoided</Text>
            </View>
          </View>

          <Text style={styles.statsNote}>A happier planet, one surprise bag at a time.</Text>
        </View>

        <View style={styles.menu}>
          {menu.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              style={[styles.menuItem, index < menu.length - 1 && styles.menuBorder]}
              onPress={item.onPress}
            >
              <Ionicons name={item.icon} size={24} color={colors.primary} />
              <Text style={styles.menuText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logout} onPress={logOut}>
          <Ionicons name="log-out-outline" size={22} color={colors.textMuted} />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
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
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.accent,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  email: {
    fontSize: fontSize.label,
    color: colors.textMuted,
    marginTop: 2,
  },
  since: {
    fontSize: fontSize.small,
    color: colors.primary,
    marginTop: 4,
  },
  statsCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: 20,
    marginTop: 24,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: fontSize.heading - 2,
    fontWeight: '600',
    color: colors.white,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
  },
  statLabel: {
    fontSize: fontSize.small,
    color: colors.white,
    marginTop: 2,
  },
  statsNote: {
    fontSize: fontSize.small,
    color: colors.white,
    marginTop: 16,
  },
  menu: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  menuBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuText: {
    flex: 1,
    fontSize: fontSize.body + 1,
    color: colors.text,
  },
  logout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 28,
    marginBottom: 12,
  },
  logoutText: {
    fontSize: fontSize.body + 1,
    color: colors.textMuted,
  },
});
