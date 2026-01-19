import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useUserStore } from '@/stores/userStore';
import { themes, getThemeById } from '@/themes';
import { colors } from '@/ui/colors';
import type { Theme } from '@/game/types';

function ThemeCard({ theme, isUnlocked, isSelected, coins, isPremium, onSelect, onBuy }: {
  theme: Theme;
  isUnlocked: boolean;
  isSelected: boolean;
  coins: number;
  isPremium: boolean;
  onSelect: () => void;
  onBuy: () => void;
}) {
  const canAfford = coins >= theme.price;
  const showPremiumLock = theme.isPremium && !isPremium;

  return (
    <Pressable
      style={[
        styles.themeCard,
        { backgroundColor: theme.colors.background },
        isSelected && styles.selectedCard,
      ]}
      onPress={isUnlocked && !showPremiumLock ? onSelect : onBuy}
      accessibilityLabel={`${theme.name} theme${isSelected ? ', selected' : ''}`}
      accessibilityRole="button"
    >
      {/* Color Preview */}
      <View style={styles.colorPreview}>
        {theme.colors.blockColors.slice(0, 5).map((color, idx) => (
          <View
            key={idx}
            style={[
              styles.colorBar,
              { backgroundColor: color, height: 20 + idx * 8 },
            ]}
          />
        ))}
      </View>

      {/* Theme Name */}
      <Text style={[styles.themeName, { color: theme.colors.textPrimary }]}>
        {theme.name}
      </Text>

      {/* Status */}
      {isSelected ? (
        <View style={[styles.badge, { backgroundColor: theme.colors.accent }]}>
          <Text style={[styles.badgeText, { color: theme.colors.background }]}>
            SELECTED
          </Text>
        </View>
      ) : showPremiumLock ? (
        <View style={[styles.badge, { backgroundColor: colors.gold }]}>
          <Text style={[styles.badgeText, { color: colors.background }]}>
            PREMIUM
          </Text>
        </View>
      ) : isUnlocked ? (
        <View style={[styles.badge, { backgroundColor: theme.colors.textSecondary }]}>
          <Text style={[styles.badgeText, { color: theme.colors.background }]}>
            OWNED
          </Text>
        </View>
      ) : (
        <View style={[styles.priceBadge, !canAfford && styles.cantAfford]}>
          <Text style={styles.priceText}>
            {theme.price} 🪙
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export default function ShopScreen() {
  const router = useRouter();
  const {
    totalCoins,
    unlockedThemes,
    selectedTheme,
    isPremium,
    hapticEnabled,
    selectTheme,
    unlockTheme,
    spendCoins,
  } = useUserStore();

  const currentTheme = getThemeById(selectedTheme);

  const handleSelectTheme = (themeId: string) => {
    if (hapticEnabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    selectTheme(themeId);
  };

  const handleBuyTheme = (theme: Theme) => {
    if (theme.isPremium && !isPremium) {
      router.push('/paywall');
      return;
    }

    if (totalCoins >= theme.price) {
      if (spendCoins(theme.price)) {
        unlockTheme(theme.id);
        selectTheme(theme.id);
        if (hapticEnabled) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      }
    } else {
      if (hapticEnabled) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }
  };

  const renderTheme = ({ item }: { item: Theme }) => {
    const isUnlocked = unlockedThemes.includes(item.id);
    const isSelected = selectedTheme === item.id;

    return (
      <ThemeCard
        theme={item}
        isUnlocked={isUnlocked}
        isSelected={isSelected}
        coins={totalCoins}
        isPremium={isPremium}
        onSelect={() => handleSelectTheme(item.id)}
        onBuy={() => handleBuyTheme(item)}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: currentTheme.colors.textPrimary }]}>
          Themes
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={styles.closeButton}
          accessibilityLabel="Close shop"
          accessibilityRole="button"
        >
          <Text style={[styles.closeText, { color: currentTheme.colors.textSecondary }]}>
            ✕
          </Text>
        </Pressable>
      </View>

      {/* Coin Balance */}
      <View style={styles.balanceContainer}>
        <Text style={[styles.balanceLabel, { color: currentTheme.colors.textSecondary }]}>
          YOUR BALANCE
        </Text>
        <Text style={[styles.balanceValue, { color: currentTheme.colors.accent }]}>
          {totalCoins} 🪙
        </Text>
      </View>

      {/* Theme Grid */}
      <FlatList
        data={themes}
        renderItem={renderTheme}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 24,
    fontWeight: '300',
  },
  balanceContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  balanceLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: 4,
  },
  grid: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  themeCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    minHeight: 160,
    alignItems: 'center',
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: colors.gold,
  },
  colorPreview: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 60,
    gap: 4,
    marginBottom: 12,
  },
  colorBar: {
    width: 16,
    borderRadius: 4,
  },
  themeName: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  priceBadge: {
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  cantAfford: {
    backgroundColor: colors.textMuted,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.background,
  },
});
