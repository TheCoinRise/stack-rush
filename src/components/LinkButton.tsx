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

    return (
      <a
        href={fullPath}
        onClick={(e) => {
          e.preventDefault();
          router.push(href);
        }}
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
}

export function BackButton({ style, textStyle, label = '✕' }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (Platform.OS === 'web') {
      window.history.back();
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
