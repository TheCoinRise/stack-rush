import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSequence,
  withTiming,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface ScoreDisplayProps {
  score: number;
  label?: string;
  color: string;
  labelColor: string;
  size?: 'small' | 'medium' | 'large';
}

export function ScoreDisplay({
  score,
  label,
  color,
  labelColor,
  size = 'medium',
}: ScoreDisplayProps) {
  const scale = useSharedValue(1);

  // Animate on score change
  useEffect(() => {
    if (score > 0) {
      scale.value = withSequence(
        withTiming(1.1, { duration: 50 }),
        withTiming(1, { duration: 100 })
      );
    }
  }, [score, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const fontSizes = {
    small: { label: 10, value: 24 },
    medium: { label: 12, value: 36 },
    large: { label: 14, value: 56 },
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: labelColor, fontSize: fontSizes[size].label }]}>
          {label}
        </Text>
      )}
      <Animated.Text
        style={[
          styles.score,
          { color, fontSize: fontSizes[size].value },
          animatedStyle,
        ]}
      >
        {score}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 2,
  },
  score: {
    fontWeight: '900',
  },
});
