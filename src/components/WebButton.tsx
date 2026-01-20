import { Pressable, Text, Platform, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const BASE_URL = '/stack-rush';

interface WebButtonProps {
  title: string;
  onPress?: () => void;
  href?: string;
  style?: ViewStyle | any;
  textStyle?: TextStyle | any;
  disabled?: boolean;
}

export function WebButton({ title, onPress, href, style, textStyle, disabled }: WebButtonProps) {
  const router = useRouter();

  if (Platform.OS === 'web') {
    const handleClick = (e: any) => {
      e.preventDefault();
      e.stopPropagation();

      if (disabled) return;

      if (onPress) {
        onPress();
      }

      if (href) {
        // Use full page navigation for reliability
        window.location.href = `${BASE_URL}${href}`;
      }
    };

    // Convert RN styles to web styles
    const webStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      textDecoration: 'none',
      border: 'none',
      outline: 'none',
      fontFamily: 'inherit',
      ...(style as any),
    };

    const webTextStyle: React.CSSProperties = {
      ...(textStyle as any),
    };

    if (href) {
      return (
        <a href={`${BASE_URL}${href}`} onClick={handleClick} style={webStyle}>
          <span style={webTextStyle}>{title}</span>
        </a>
      );
    }

    return (
      <button onClick={handleClick} disabled={disabled} style={webStyle}>
        <span style={webTextStyle}>{title}</span>
      </button>
    );
  }

  // Native implementation
  const handlePress = () => {
    if (disabled) return;
    if (onPress) onPress();
    if (href) router.push(href as any);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[style, disabled && { opacity: 0.5 }]}
      disabled={disabled}
    >
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
}

// Back button that works on web
export function WebBackButton({ style, textStyle, label = '✕', onBeforeBack }: {
  style?: ViewStyle | any;
  textStyle?: TextStyle | any;
  label?: string;
  onBeforeBack?: () => void;
}) {
  const router = useRouter();

  if (Platform.OS === 'web') {
    const handleClick = (e: any) => {
      e.preventDefault();
      if (onBeforeBack) onBeforeBack();

      // Navigate to home for reliability
      window.location.href = `${BASE_URL}/`;
    };

    return (
      <button
        onClick={handleClick}
        style={{
          cursor: 'pointer',
          border: 'none',
          background: 'transparent',
          ...(style as any),
        }}
      >
        <span style={textStyle as any}>{label}</span>
      </button>
    );
  }

  return (
    <Pressable
      onPress={() => {
        if (onBeforeBack) onBeforeBack();
        router.back();
      }}
      style={style}
    >
      <Text style={textStyle}>{label}</Text>
    </Pressable>
  );
}
