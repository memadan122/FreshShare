import { useRef, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';
import { colors, fontSize, radius } from '../constants/theme';

const slides = [
  {
    id: '1',
    image: require('../../assets/images/onboarding-1.jpg'),
    caption: 'Good food, close to home',
    eyebrow: 'LOCAL FINDS. LESS WASTE.',
    title: 'Discover nearby Deals',
    text: 'Find delicious surplus food from your favorite local spots, for a fraction of the price.',
    green: true,
  },
  {
    id: '2',
    image: require('../../assets/images/onboarding-2.jpg'),
    caption: 'A little tap. A big difference.',
    eyebrow: 'LESS WAITING. MORE SAVING.',
    title: 'Reserve in seconds',
    text: 'Choose a surprise bag, reserve your share, and leave the good food out of the bin.',
    green: false,
  },
  {
    id: '3',
    image: require('../../assets/images/onboarding-3.jpg'),
    caption: 'A delicious way to do good',
    eyebrow: 'YOUR BAG. YOUR LITTLE WIN.',
    title: 'Pick up and enjoy',
    text: 'Stop by during your pickup window. Enjoy something tasty and help fight food waste.',
    green: true,
  },
];

export default function OnboardingScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const listRef = useRef(null);

  const goToLogin = () => navigation.replace('Login');

  const handleNext = () => {
    if (index < slides.length - 1) {
      listRef.current.scrollToIndex({ index: index + 1 });
    } else {
      goToLogin();
    }
  };

  // update the dots when the user swipes
  const handleScrollEnd = (e) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndex(newIndex);
  };

  const renderSlide = ({ item }) => (
    <View style={{ width, paddingHorizontal: 16 }}>
      <View>
        <Image source={item.image} style={styles.image} />
        <View style={[styles.caption, !item.green && styles.captionOrange]}>
          <Text style={[styles.captionText, !item.green && styles.captionTextOrange]}>
            {item.caption}
          </Text>
        </View>
      </View>

      <Text style={styles.eyebrow}>{item.eyebrow}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Logo size={24} />
        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={listRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        getItemLayout={(data, i) => ({ length: width, offset: width * i, index: i })}
        style={{ flexGrow: 0 }}
      />

      <View style={styles.dots}>
        {slides.map((slide, i) => (
          <View key={slide.id} style={[styles.dot, i === index && styles.activeDot]} />
        ))}
      </View>

      <View style={styles.footer}>
        <PrimaryButton title={index === slides.length - 1 ? 'Get started' : 'Next'} onPress={handleNext} />
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
  skip: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.textMuted,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: radius.xl,
  },
  caption: {
    position: 'absolute',
    left: 14,
    bottom: 22,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
  },
  captionOrange: {
    backgroundColor: colors.accentLight,
  },
  captionText: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.primaryDark,
  },
  captionTextOrange: {
    color: colors.accent,
  },
  eyebrow: {
    marginTop: 28,
    fontSize: fontSize.small,
    fontWeight: '700',
    color: colors.accent,
    letterSpacing: 0.5,
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: '700',
    color: colors.text,
  },
  text: {
    marginTop: 10,
    fontSize: fontSize.body,
    lineHeight: 24,
    color: colors.textMuted,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primary,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
