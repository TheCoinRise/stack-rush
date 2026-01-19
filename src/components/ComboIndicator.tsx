import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
  useSharedValue,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface ComboIndicatorProps {
  combo: number;
  color: string;
}

export function ComboIndicator({ combo, color }: ComboIndicatorProps) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (combo > 0) {
      scale.value = withSequence(
        withSpring(1.4, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 10, stiffness: 150 })
      );
      rotation.value = withSequence(
        withTiming(-5, { duration: 50 }),
        withTiming(5, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
  }, [combo, scale, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  if (combo === 0) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(150)}
      exiting={FadeOut.duration(150)}
      style={[styles.container, animatedStyle]}
    >
      <Animated.Text style={[styles.comboText, { color }]}>
        {combo}x
      </Animated.Text>
      <Animated.Text style={[styles.label, { color }]}>
        COMBO
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8,
  },
  comboText: {
    fontSize: 28,
    fontWeight: '900',
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
});
