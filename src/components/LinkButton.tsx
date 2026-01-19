import { Pressable, Text, Platform, ViewStyle, TextStyle } from 'react-native';
import { Link, useRouter } from 'expo-router';
import type { Href } from 'expo-router';

interface LinkButtonProps {
  href: Href;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

// Base URL for GitHub Pages deployment
const BASE_URL = '/stack-rush';

export function LinkButton({ href, title, style, textStyle }: LinkButtonProps) {
  const router = useRouter();

  if (Platform.OS === 'web') {
    const path = typeof href === 'string' ? href : (href.pathname || '/');
    const fullPath = `${BASE_URL}${path}`;

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      router.push(href);
    };

    return (
      <a
        href={fullPath}
        onClick={handleClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          cursor: 'pointer',
          ...(style as any),
        }}
      >
        <span style={textStyle as any}>{title}</span>
      </a>
    );
  }

  // On native, use Link with Pressable
  return (
    <Link href={href} asChild>
      <Pressable style={style}>
        <Text style={textStyle}>{title}</Text>
      </Pressable>
    </Link>
  );
}

// Simple back button for modals/screens
interface BackButtonProps {
  style?: ViewStyle;
  textStyle?: TextStyle | TextStyle[];
  label?: string;
  onBeforeBack?: () => void;
}

export function BackButton({ style, textStyle, label = '✕', onBeforeBack }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBeforeBack) {
      onBeforeBack();
    }

    if (Platform.OS === 'web') {
      // Check if we have history to go back to
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // Navigate to home if no history
        window.location.href = `${BASE_URL}/`;
      }
    } else {
      router.back();
    }
  };

  return (
    <Pressable onPress={handleBack} style={style} accessibilityRole="button" accessibilityLabel="Go back">
      <Text style={textStyle}>{label}</Text>
    </Pressable>
  );
}

// Action button for non-navigation actions (like "Play Again")
interface ActionButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export function ActionButton({ title, onPress, style, textStyle, disabled }: ActionButtonProps) {
  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[style, disabled && { opacity: 0.5 }]}
      disabled={disabled}
      accessibilityRole="button"
    >
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
}
