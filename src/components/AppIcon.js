import React from 'react';
import { Text } from 'react-native';

const glyphs = {
  home: '⌂',
  'home-outline': '⌂',
  camera: '◉',
  'camera-outline': '◉',
  store: '▣',
  'store-outline': '▣',
  account: '●',
  'account-outline': '○',
  leaf: '♣',
  'shopping-cart': '▰',
  cloud: '☁',
  'message-circle': '◯',
  'message-square': '□',
  'chevron-right': '›',
  sun: '☀',
  'trending-up': '↗',
  'trending-down': '↘',
  droplet: '♢',
  lightbulb: '•',
  upload: '↑',
  image: '▧',
  'alert-triangle': '!',
  'bar-chart-2': '▥',
  info: 'i',
  phone: '☎',
  'map-pin': '●',
  clock: '◷',
  'alert-circle': '!',
  wind: '≈',
  calendar: '□',
  'edit-2': '✎',
  map: '□',
  bookmark: '◆',
  'credit-card': '▭',
  'help-circle': '?',
  'file-text': '≡',
  shield: '◇',
  'log-out': '→',
  send: '➤',
  scissors: '✂',
  package: '□',
};

export default function AppIcon({ name, size = 20, color }) {
  return (
    <Text
      accessibilityLabel={name}
      style={{
        color,
        fontSize: size,
        lineHeight: size + 4,
        fontWeight: '700',
        textAlign: 'center',
        width: size + 6,
      }}
    >
      {glyphs[name] || '•'}
    </Text>
  );
}
